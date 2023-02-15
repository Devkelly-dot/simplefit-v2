import FitList from "./fitList";
import CardioCard from "./cardioCard";
import { useState } from "react";
import CreateCardio from "./createCardio";

type Props = {
};

const CardioPage: React.FC<Props> = () => {
    const [creating, setCreating] = useState(false);

    return(
        <>
            {
                creating?<div className="mb-12"><CreateCardio onSave={()=>setCreating(false)}/></div>:
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline" 
                    type="button"
                    onClick={()=>setCreating(true)}>
                    New Cardio
                </button> 
            }

            <FitList 
            fitType="cardio"
            cardComponent={(object)=><CardioCard cardio={object}/>}
            />
        </>
    )
}

export default CardioPage;