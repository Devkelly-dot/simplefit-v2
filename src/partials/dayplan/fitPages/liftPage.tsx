import FitList from "./fitList";
import LiftCard from "./liftCard";

type Props = {
};

const LiftPage: React.FC<Props> = () => {
    return(
        <FitList 
        fitType="lift"
        cardComponent={(object)=><LiftCard lift={object}/>}
        />
    )
}

export default LiftPage;