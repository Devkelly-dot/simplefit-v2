import { RootState } from "@/app/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import CreateLift from "./createLift";
import FitList from "./fitList";
import LiftCard from "./liftCard";

type Props = {
};

const LiftPage: React.FC<Props> = () => {
    const [creating, setCreating] = useState(false);

    return(
        <>
            {
                creating?<CreateLift onSave={()=>setCreating(false)}/>:
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded focus:outline-none focus:shadow-outline" 
                    type="button"
                    onClick={()=>setCreating(true)}>
                    New Lift
                </button> 
            }
            <FitList 
            fitType="lift"
            cardComponent={(object)=><LiftCard lift={object}/>}
            />
        </> 
    )
}

export default LiftPage;