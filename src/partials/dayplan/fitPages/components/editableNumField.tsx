import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { createFitObject } from "@/common/dayplanScripts";
import { updateSelectedDayplan } from "../../dayplanSlice";

type Props = {
    object: any;
    editField: string;
    goalField: string;
    type: string;
    title?:string;
};

const EditableNumField: React.FC<Props> = ({object, editField, goalField, type, title}) => {
    const dispatch = useDispatch();
    const token = useSelector((state:RootState)=>state.auth.token);
    const selectedDayplan = useSelector((state:RootState)=>state.dayplan.selectedDayplan);

    useEffect(()=>{
    },[token, object, selectedDayplan])

    function handleNumChange(e)
    {
        const value = parseInt(e.target.value, 10);
        if (isNaN(value)) 
        {
            return
        }
        
        let new_object = {...object};
        new_object[editField] = value; 

        dispatch(updateSelectedDayplan(
            {
                type: type,
                id: object['id'],
                new_object: new_object
            }
        ));
    }

    async function editNumber(new_value)
    {
        const value = parseInt(new_value, 10);
        if (isNaN(value)) 
        {
            return
        }
        
        let new_object = {...object};
        new_object[editField] = value;

        createFitObject(dispatch, selectedDayplan.id, token, type, new_object)
    }

    function editOnBlur(e)
    {
        editNumber(e.target.value)
    }

    return (
        <div className="flex gap-2 items-center">
            <button 
                className="mx-2 bg-blue-500 hover:bg-blue-300 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline" 
                onClick={(e)=>{editNumber(object[editField]-1)}}>-</button>

            <input value = {object[editField]} 
                className='w-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' 
                onChange={handleNumChange} 
                onBlur={editOnBlur}/> / {object[goalField]} {title&&title}

            <button 
                className="mx-2 bg-blue-500 hover:bg-blue-300 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline" 
                onClick={(e)=>{editNumber(object[editField]+1)}}>+</button>
        </div>
    )
}

export default EditableNumField;