import { Card, CardBody } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { deleteFitObject } from "@/common/dayplanScripts";

type Props = {
    type: string;
    object: any;
    onCancel: ()=>any;
};

const DeleteFitCard: React.FC<Props> = ({type, object, onCancel}) => {
    const dispatch = useDispatch();
    const token = useSelector((state:RootState)=>state.auth.token);
    const selectedDayplan = useSelector((state:RootState)=>state.dayplan.selectedDayplan);

    useEffect(()=>{
    },[token, object, selectedDayplan])

    async function handleDelete()
    {
        await deleteFitObject(dispatch, token, type, object);
    }

    return(
        <Card className="h-44">
            <CardBody>
                <h2>Are you sure you want to Delete this {type}? ({object.name})</h2>
                <div className="flex gap-2">
                    <button 
                        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline" 
                        type="button"
                        onClick={handleDelete}>
                        Yes Delete it
                    </button> 
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline" 
                        type="button"
                        onClick={onCancel}>
                        Cancel
                    </button> 
                </div>
            </CardBody>
        </Card>
    )
}

export default DeleteFitCard