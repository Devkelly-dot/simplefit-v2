import FitList from "./fitList";
import CardioCard from "./cardioCard";

type Props = {
};

const CardioPage: React.FC<Props> = () => {
    return(
        <FitList 
        fitType="cardio"
        cardComponent={(object)=><CardioCard cardio={object}/>}
        />
    )
}

export default CardioPage;