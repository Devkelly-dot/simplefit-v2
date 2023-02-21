import { getDayName } from "@/common/dayplanScripts";
import { Card, CardBody } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { dayplanSummary } from "../dayplanSlice";

type Props = {
    dayplan:dayplanSummary;
};

const SummaryComponent: React.FC<Props> = ({dayplan}) => {
    const day_name = getDayName(dayplan.day);
    return (
        <Link to={`/dashboard/${dayplan.day}/lift`}>
            <Card  className="hover:bg-blue-300 hover:text-white ease-in-out duration-200 hover:-translate-y-1">
                <CardBody>
                    <h2 className="text-lg">{day_name}</h2>
                    <h3>{dayplan.eaten} calories</h3>
                </CardBody>
            </Card>
        </Link>
    );
};

export default SummaryComponent;