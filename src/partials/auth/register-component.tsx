import { Card, CardHeader, Typography, Input, CardBody, Checkbox, CardFooter, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { authFetch } from "@/common/authFetch";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "./authSlice";
import AlertList from "../alertList";

interface Props {
}

type alert = {
  id: number
  text: string,
  className: string,
}

const RegisterComponent: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [alerts, setAlerts] = useState<alert[]>([]);

    const [form, setForm] = useState(
        {
            username:'',
            password:'',
            email:''
        }
    )
    async function registerAttempt()
    {
      try{
        const submit_form = {}

        for (const key in form) {
          if (form[key] !== '') {
          submit_form[key] = form[key];
          }
        }

        const res = await authFetch('POST',{},'dayplan/users/register/',submit_form);
        const loginForm = {
            username_or_email:res[0]?.username,
            password:form?.password
        }
        if(res.Error)
        {
            setAlerts([
              {
                id: Math.random(),
                text: res.Error,
                className: 'bg-red-400'
              }
            ])

            return;
        }

        const loginRes = await authFetch('POST',{},'dayplan/users/login/',loginForm);
        const authToken = loginRes?.token;

        dispatch(setAuth(
            {
                username: res[0]?.username,
                token: authToken,
                userID: res[0]?.id
            }
        ))
        
        navigate('/dashboard/home')
      } catch (error) {
        console.error("something wrong with request: ",error)
          setAlerts([
          {
            id: Math.random(),
            text: "Something went wrong with registration, please try different credentials",
            className: 'bg-red-400'
          }
          ])
      }
    }

    function handleFormChange(e,key:string)
    {
        let new_input = {};
        new_input[key] = e.target.value;
        setForm({...form,...new_input});
    }

    function removeAlert(index)
    {
        setAlerts((prevAlerts)=>prevAlerts.filter((_,i)=>i!==index));
    }

    return(
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
            <CardHeader
                variant="gradient"
                color="blue"
                className="mb-4 grid h-28 place-items-center"
                >
                <Typography variant="h3" color="white">
                    Sign Up
                </Typography>
            </CardHeader>


            <CardBody className="flex flex-col gap-4">
                <AlertList alerts = {alerts} removeAlert={removeAlert}/>
                <Input label="Username" size="lg" value={form['username']} onChange={(e)=>handleFormChange(e,'username')} required={true}/>
                <Input type="email" label="Email" size="lg" value = {form['email']} onChange={(e)=>handleFormChange(e,'email')} required={true}/>
                <Input type="password" label="Password" size="lg" value={form['password']} onChange={(e)=>handleFormChange(e,'password')} required={true}/>
            </CardBody>


          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={registerAttempt}>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Link to="/auth/sign-in">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign in
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
    )
}

export default RegisterComponent;