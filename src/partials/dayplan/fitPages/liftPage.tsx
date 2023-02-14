import { RootState } from "@/app/store";
import { Card, CardBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FitList from "./fitList";
import LiftCard from "./liftCard";

type Props = {
};

const LiftPage: React.FC<Props> = () => {
    const selected_dayplan = useSelector((state:RootState)=>state.dayplan.selectedDayplan);
    const [objects,setObjects] = useState([]);

    useEffect(()=>{
        setObjects(selected_dayplan.lift);
    },[selected_dayplan]);

    return(
        <FitList 
        fitType="lift"
        cardComponent={(object)=><LiftCard lift={object}/>}
        />
    )
}

export default LiftPage;