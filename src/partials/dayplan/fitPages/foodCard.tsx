import { Card, CardBody } from "@material-tailwind/react";
import { foodType } from "../dayplanSlice";
import { useState } from "react";
import CreateFood from "./createFood";
import DeleteFitCard from "./deleteFitCard";

type Props = {
    food?:foodType;
};

const FoodCard: React.FC<Props> = ({food}) => {
    const [edit, setEdit] = useState(false);
    const [deleting, setDeleting] = useState(false);
    return(
        deleting?<DeleteFitCard type='food' object={food} onCancel={()=>setDeleting(false)}/>:
        food&&!edit?<Card>
            <CardBody>
                <h2>{food.name}</h2>
                <h3>{food.complete} calories</h3>
                <h3>{food.description}</h3>
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
        </Card>:food&&edit?<CreateFood food_to_edit={food} onSave = {()=>{setEdit(false)}}/>:<></>
    )
}

export default FoodCard; 