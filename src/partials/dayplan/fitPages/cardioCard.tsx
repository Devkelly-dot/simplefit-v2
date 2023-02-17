import { Card, CardBody } from "@material-tailwind/react";
import { cardioType } from "../dayplanSlice";
import { useState } from "react";
import CreateCardio from "./createCardio";
import DeleteFitCard from "./deleteFitCard";

type Props = {
    cardio?:cardioType;
};

const CardioCard: React.FC<Props> = ({cardio}) => {
    const [edit, setEdit] = useState(false);
    const [deleting, setDeleting] = useState(false);

    return(
        deleting?<DeleteFitCard type='cardio' object={cardio} onCancel={()=>setDeleting(false)}/>:
        cardio&&!edit?<Card>
            <CardBody>
                <h2>{cardio.name}</h2>
                <h3>{cardio.complete} / {cardio.goal} {cardio.measurement}</h3>
                <h3>{cardio.description}</h3>
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
        </Card>:cardio&&edit?<CreateCardio cardio_to_edit={cardio} onSave = {()=>{setEdit(false)}}/>:<></>
    )
}

export default CardioCard; 