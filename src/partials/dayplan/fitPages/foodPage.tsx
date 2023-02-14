import FitList from "./fitList";
import FoodCard from "./foodCard";

type Props = {
};

const FoodPage: React.FC<Props> = () => {
    return(
        <FitList 
        fitType="food"
        cardComponent={(object)=><FoodCard food={object}/>}
        />
    )
}

export default FoodPage;