import {
    Alert,
} from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";

type alert = {
    id: number
    text: string,
    className: string,
  }

interface Props {
    alerts: alert[];
    removeAlert: (index:number)=>void;
}

const AlertList: React.FC<Props> = ({alerts, removeAlert}) => {
    return (
    <>
    {
        alerts?.map((alert, index)=>{
            return <>
            {
                <Alert 
                className={alert.className}
                key = {`${index}alert:${alert.id}`}
                dismissible={{
                    onClose: () =>
                      removeAlert(index),
                  }}>
                    {alert.text}
                </Alert>
            }
            </>
        })
    }
    </>
    )
}

export default AlertList;