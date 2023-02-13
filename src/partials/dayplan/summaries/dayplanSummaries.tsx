import { RootState } from "@/app/store";
import { getSummaries } from "@/common/dayplanScripts";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type Props = {
};

const DayplanSummaries: React.FC<Props> = ({}) => {
    const token = useSelector((state:RootState)=>state.auth.token);

    useEffect(()=>{
        async function fetchDayplans()
        {
            let summaries = await getSummaries(token);
            console.log(summaries);
        }
        if(token)
            fetchDayplans();
    },[token])
    return (
        <div>
        </div>
    );
};

export default DayplanSummaries;