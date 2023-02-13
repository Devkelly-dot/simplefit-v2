import { RootState } from "@/app/store";
import { getSummaries } from "@/common/dayplanScripts";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
};

const DayplanSummaries: React.FC<Props> = ({}) => {
    const dayplans = useSelector((state:RootState)=>state.dayplan.dayplanSummaries);

    useEffect(()=>{
        console.log(dayplans)
    },[dayplans])

    return (
        <div>
        </div>
    );
};

export default DayplanSummaries;