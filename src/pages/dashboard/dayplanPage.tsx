import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LiftPage from "@/partials/dayplan/fitPages/liftPage";
import CardioPage from "@/partials/dayplan/fitPages/cardioPage";
import { getDayName, getDayplanDetails } from "@/common/dayplanScripts";
import { Card, CardBody } from "@material-tailwind/react";
import FoodPage from "@/partials/dayplan/fitPages/foodPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setSelectedDayplan } from "@/partials/dayplan/dayplanSlice";

type Props = {
    day: string
};

const DayplanPage: React.FC<Props> = ({day}) => {
    const dispatch = useDispatch();

    const {type} = useParams();
    const dayPlanSummaries = useSelector((state:RootState)=>state.dayplan.dayplanSummaries);
    const token = useSelector((state:RootState)=>state.auth.token);

    const [displayComponent,setDisplayComponent] = useState(<LiftPage/>);
    const [dayName, setDayName] = useState(getDayName(day));
    
    useEffect(()=>{
        switch(type)
        {
            case 'lift':
            case ':type':
                setDisplayComponent(<LiftPage/>)
                break;
            
            case 'cardio':
                setDisplayComponent(<CardioPage/>)
                break;
            
            case 'food':
                setDisplayComponent(<FoodPage/>)
                break;
        }
        setDayName(getDayName(day));

    },[type, day]);
    
    useEffect(()=>{
        async function setDayplanDetails(token, id)
        {
            const res = await getDayplanDetails(token, id);
            dispatch(setSelectedDayplan(
                res
            ))
            console.log(res);
        }

        let id = null;
        for(let i in dayPlanSummaries)
        {
            let current_dayplan = dayPlanSummaries[i];
            if(current_dayplan.day === day)
            {
                id = current_dayplan.id;
                break;
            }
        }

        if(token && id>=0)
        {
            setDayplanDetails(token, id);
        }

    },[dayPlanSummaries, day, token]);

    return(
        <>
            <h1>{dayName}</h1>
            <div className="grid grid-cols-3">        
                <Link to={`/dashboard/${day}/lift`}>
                    <Card className={(type==='lift' || type===':type')?'bg-light-blue-500 text-white':""}>
                        <CardBody className="text-center">
                            Lifts
                        </CardBody>
                    </Card>
                </Link>
                <Link to={`/dashboard/${day}/cardio`}>
                    <Card className={(type==='cardio')?'bg-light-blue-500 text-white':""}>
                        <CardBody className="text-center">
                            Cardio
                        </CardBody>
                    </Card>
                </Link>
                <Link to={`/dashboard/${day}/food`}>
                    <Card  className={(type==='food')?'bg-light-blue-500 text-white':""}>
                        <CardBody className="text-center">
                            Food
                        </CardBody>
                    </Card>
                </Link>
            </div>    
            {displayComponent}
        </>
    )
}

export default DayplanPage;