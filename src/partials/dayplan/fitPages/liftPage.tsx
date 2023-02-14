import CreateLift from "./createLift";
import FitList from "./fitList";
import LiftCard from "./liftCard";

type Props = {
};

const LiftPage: React.FC<Props> = () => {
    return(
        <>
            <CreateLift/>
            <FitList 
            fitType="lift"
            cardComponent={(object)=><LiftCard lift={object}/>}
            />
        </> 
    )
}

export default LiftPage;