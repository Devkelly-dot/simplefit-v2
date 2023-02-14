import { Card, CardBody } from "@material-tailwind/react";
import { liftType } from "../dayplanSlice";

type Props = {
    lift:liftType;
};

const LiftCard: React.FC<Props> = ({lift}) => {

    return(
        <Card>
            <CardBody>
                <h2>{lift.name} {lift.reps} reps</h2>
                <h3>{lift.weight} {lift.measurement}</h3>
                <h3>{lift.complete} / {lift.goal} sets</h3>
                <h3>{lift.description}</h3>
            </CardBody>
        </Card> 
    )
}

export default LiftCard; 