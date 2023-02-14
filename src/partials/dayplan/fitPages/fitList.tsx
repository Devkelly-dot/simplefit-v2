import { RootState } from "@/app/store";
import { Card, CardBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LiftCard from "./liftCard";

type Props = {
    fitType: string;
    cardComponent: (object:any)=>any;
};

const FitList: React.FC<Props> = ({fitType, cardComponent}) => {
    const selected_dayplan = useSelector((state:RootState)=>state.dayplan.selectedDayplan);
    const [objects,setObjects] = useState([]);
    
    useEffect(()=>{
        setObjects(selected_dayplan[fitType]);
    },[selected_dayplan]);

    return(
        <ul className="flex flex-col gap-4">
           {
                objects.map((object)=>{
                 return(
                    <li key={object.id}>
                        {cardComponent(object)}
                    </li>
                 )   
                })
           } 
        </ul>
    )
}

export default FitList;