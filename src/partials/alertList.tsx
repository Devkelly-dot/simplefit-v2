import {
    Alert,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

type alert = {
    text: string,
    className: string,
    show: boolean,
}

interface Props {
    alerts: alert[];
    removeAlert: (index:number)=>void;
}

const AlertList: React.FC<Props> = ({alerts, removeAlert}) => {
    useEffect(()=>{
        console.log(alerts)
        console.log(alerts[0]?.text)
    }, [alerts])

    return (
    <>
    {
        alerts?.map((alert, index)=>{
            return <>
            {
                alert.show?
                <Alert 
                className={alert.className}
                key = {`${index}:${alert.text}`}
                dismissible={{
                    onClose: () =>
                      removeAlert(index),
                  }}>
                    {alert.text}
                </Alert>:<></>
            }
            </>
        })
    }
    </>
    )
}

export default AlertList;