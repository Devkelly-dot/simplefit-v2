import { Card, CardBody } from "@material-tailwind/react";
import { liftType } from "../dayplanSlice";
import { useState } from "react";
import CreateLift from "./createLift";
import DeleteFitCard from "./deleteFitCard";

type Props = {
    lift?:liftType;
};

const LiftCard: React.FC<Props> = ({lift}) => {
    const [edit, setEdit] = useState(false);
    const [deleting, setDeleting] = useState(false);
    
    return(
        deleting?<DeleteFitCard type='lift' object={lift} onCancel={()=>setDeleting(false)}/>:
        lift&&!edit?<Card>
            <CardBody>
                <h2>{lift.name} {lift.reps} reps</h2>
                <h3>{lift.weight} {lift.measurement}</h3>
                <h3>{lift.complete} / {lift.goal} sets</h3>
                <h3>{lift.description}</h3>
                <div className="flex gap-2">
                    <button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline" 
                        type="button"
                        onClick={()=>{setEdit(!edit)}}>
                        Edit
                    </button>
                    <button 
                        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline" 
                        type="button"
                        onClick={()=>{setDeleting(true)}}>
                        Delete
                    </button>   
                </div>
            </CardBody>
        </Card>:lift&&edit?<CreateLift lift_to_edit={lift} onSave = {()=>{setEdit(false)}}/>:<></>
    )
}

export default LiftCard; 