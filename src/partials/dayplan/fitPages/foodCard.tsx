import { Card, CardBody } from "@material-tailwind/react";
import { foodType } from "../dayplanSlice";

type Props = {
    food?:foodType;
};

const FoodCard: React.FC<Props> = ({food}) => {

    return(
        food?<Card>
            <CardBody>
                <h2>{food.name}</h2>
                <h3>{food.complete} calories</h3>
                <h3>{food.description}</h3>
            </CardBody>
        </Card>:<></>
    )
}

export default FoodCard; 