import { RootState } from "@/app/store";
import { createFitObject } from "@/common/dayplanScripts";
import { Card, CardBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { liftType} from "../dayplanSlice";

type Props = {
    lift_to_edit?:liftType;
    onSave: ()=>any;
};

const CreateLift: React.FC<Props> = ({lift_to_edit, onSave}) => {
    const dispatch = useDispatch();
    const token = useSelector((state:RootState)=>state.auth.token);
    const selectedDayplan = useSelector((state:RootState)=>state.dayplan.selectedDayplan);

    useEffect(()=>{
    },[token, lift_to_edit, selectedDayplan])


    function inputComponent(value, id, changeFunction, index)
    {
        return <input 
            type='text' 
            value={value} 
            id={id}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e)=>changeFunction(e, index)}
        />
    }

    function selectComponent(value, id, changeFunction, options, index)
    {
        return (
            <select
                id={id}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name={id}
                value={value}
                onChange={(e)=>changeFunction(e, index)}
                >
                {
                    options.map((option)=>{
                     return <option value={option} key={option}>{option}</option>   
                    })
                }
            </select>
        )
    }

    const [form, setForm] = useState(
        lift_to_edit?
        [
            {
                alias: 'Name',
                key: 'name',
                value: lift_to_edit.name,
                component: (value,id, index)=>inputComponent(value, id, onTextChange, index)
            },
            {
                alias: 'Description',
                key: 'description',
                value: lift_to_edit.description,
                component: (value, id, index)=>inputComponent(value,id, onTextChange, index)
            },
            {
                alias: 'Goal',
                key: 'goal',
                value: lift_to_edit.goal,
                component: (value, id, index)=>inputComponent(value,id, onNumberChange, index)
            },
            {
                alias: 'Complete',
                key: 'complete',
                value: lift_to_edit.complete,
                component: (value, id, index)=>inputComponent(value,id, onNumberChange, index)
            },
            {
                alias: 'Weight',
                key: 'weight',
                value: lift_to_edit.weight,
                component: (value, id, index)=>inputComponent(value,id, onNumberChange, index)
            },
            {
                alias: 'Reps',
                key: 'reps',
                value: lift_to_edit.reps,
                component: (value, id, index)=>inputComponent(value, id, onNumberChange, index)
            },
            {
                alias: 'Measurement',
                key: 'measurement',
                value: lift_to_edit.measurement,
                component: (value, id, index)=>selectComponent(value, id, onTextChange, ["LB", "KG"], index)
            },
        ]:
        [
            {
                alias: 'Name',
                key: 'name',
                value: 'bench press',
                component: (value,id, index)=>inputComponent(value, id, onTextChange, index)
            },
            {
                alias: 'Description',
                key: 'description',
                value: 'touch your chest',
                component: (value, id, index)=>inputComponent(value,id, onTextChange, index)
            },
            {
                alias: 'Goal',
                key: 'goal',
                value: 5,
                component: (value, id, index)=>inputComponent(value,id, onNumberChange, index)
            },
            {
                alias: 'Complete',
                key: 'complete',
                value: 0,
                component: (value, id, index)=>inputComponent(value,id, onNumberChange, index)
            },
            {
                alias: 'Weight',
                key: 'weight',
                value: 125,
                component: (value, id, index)=>inputComponent(value,id, onNumberChange, index)
            },
            {
                alias: 'Reps',
                key: 'reps',
                value: 10,
                component: (value, id, index)=>inputComponent(value, id, onNumberChange, index)
            },
            {
                alias: 'Measurement',
                key: 'measurement',
                value: 'LB',
                component: (value, id, index)=>selectComponent(value, id, onTextChange, ["LB", "KG"], index)
            },
        ]
    )

    function onTextChange(e, index)
    {
        let new_form = [...form];
        new_form[index].value = e.target.value;
        setForm(new_form);
    }

    function onNumberChange(e, index)
    {
        let value = e.target.value;
        if (value === "") {
            value = 0;
        } else {
            value = parseInt(value);
            if (isNaN(value)) {
            return;
            }
        }
        let newForm = [...form];
        newForm[index].value = value;
        setForm(newForm);
    }

    async function handleSubmit(e)
    {
        e.preventDefault();
        let submit_form = {};

        for(let i in form)
        {
            submit_form[form[i].key] = form[i].value;
        }

        if(lift_to_edit)
            submit_form['id'] = lift_to_edit.id;
        else submit_form['id'] = -1;

        createFitObject(dispatch, selectedDayplan.id, token, 'lift', submit_form)
        onSave();
    }
    return(
        <>
            {
                form.map((form_field, index)=>{
                    return<div key={form_field.key}>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={'lift-'+form_field.key}>{form_field.alias}</label>
                        {
                            form_field.component(form_field.value, 'lift-'+form_field.key, index)
                        }
                    </div>
                })
            }
            <div className="flex gap-4">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline" 
                    type="button"
                    onClick={()=>onSave()}>
                    Cancel
                </button>   
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline" 
                    type="button"
                    onClick={handleSubmit}>
                    Save
                </button> 
            </div>    
        </>
    )
}

export default CreateLift; 