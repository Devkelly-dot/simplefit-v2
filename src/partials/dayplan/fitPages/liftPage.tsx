import { RootState } from "@/app/store";
import { Card, CardBody } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type Props = {
};

const LiftPage: React.FC<Props> = () => {
    const selected_dayplan = useSelector((state:RootState)=>state.dayplan.selectedDayplan);
    const [objects,setObjects] = useState([]);

    useEffect(()=>{
        setObjects(selected_dayplan.lift);
    },[selected_dayplan]);

    return(
        <ul className="flex flex-col gap-4">
           {
                objects.map((object)=>{
                 return(
                    <li key={object.id}>
                        <Card>
                            <CardBody>
                                <h2>{object.name} {object.reps} reps</h2>
                                <h3>{object.weight} {object.measurement}</h3>
                                <h3>{object.complete} / {object.goal} sets</h3>
                                <h3>{object.description}</h3>
                            </CardBody>
                        </Card>
                    </li>
                 )   
                })
           } 
        </ul>
    )
}

export default LiftPage;