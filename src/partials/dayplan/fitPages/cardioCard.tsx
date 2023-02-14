import { Card, CardBody } from "@material-tailwind/react";
import { cardioType } from "../dayplanSlice";

type Props = {
    cardio?:cardioType;
};

const CardioCard: React.FC<Props> = ({cardio}) => {

    return(
        cardio?<Card>
            <CardBody>
                <h2>{cardio.name}</h2>
                <h3>{cardio.complete} / {cardio.goal} {cardio.measurement}</h3>
                <h3>{cardio.description}</h3>
            </CardBody>
        </Card>:<></>
    )
}

export default CardioCard; 