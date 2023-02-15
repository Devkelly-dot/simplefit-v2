import { Card, CardBody } from "@material-tailwind/react";
import { cardioType } from "../dayplanSlice";
import { useState } from "react";
import CreateCardio from "./createCardio";

type Props = {
    cardio?:cardioType;
};

const CardioCard: React.FC<Props> = ({cardio}) => {
    const [edit, setEdit] = useState(false);

    return(
        cardio&&!edit?<Card>
            <CardBody>
                <h2>{cardio.name}</h2>
                <h3>{cardio.complete} / {cardio.goal} {cardio.measurement}</h3>
                <h3>{cardio.description}</h3>
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline" 
                    type="button"
                    onClick={()=>{setEdit(!edit)}}>
                    Edit
                </button>  
            </CardBody>
        </Card>:cardio&&edit?<CreateCardio cardio_to_edit={cardio} onSave = {()=>{setEdit(false)}}/>:<></>
    )
}

export default CardioCard; 