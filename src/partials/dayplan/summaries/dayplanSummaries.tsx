import { RootState } from "@/app/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SummaryComponent from "./summaryComponent";

type Props = {
};

const DayplanSummaries: React.FC<Props> = ({}) => {
    const dayplans = useSelector((state:RootState)=>state.dayplan.dayplanSummaries);

    useEffect(()=>{
    },[dayplans])

    return (
        <div>
            {dayplans.length>0&&dayplans.map((dayplan)=>{
                return <SummaryComponent key={dayplan.id} dayplan={dayplan}/>
            })
            }
        </div>
    );
};

export default DayplanSummaries;