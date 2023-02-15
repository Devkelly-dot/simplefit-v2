import FitList from "./fitList";
import FoodCard from "./foodCard";
import { useState } from "react";
import CreateFood from "./createFood";

type Props = {
};

const FoodPage: React.FC<Props> = () => {
    const [creating, setCreating] = useState(false);

    return(
        <>
            {
                creating?<div className="mb-12"><CreateFood onSave={()=>setCreating(false)}/></div>:
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline" 
                    type="button"
                    onClick={()=>setCreating(true)}>
                    Add Food
                </button> 
            }

            <FitList 
            fitType="food"
            cardComponent={(object)=><FoodCard food={object}/>}
            />
        </>
    )
}

export default FoodPage;