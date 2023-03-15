import { Card, CardHeader, Typography, Input, CardBody, Checkbox, CardFooter, Button, IconButton } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { authFetch } from "@/common/authFetch";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "./authSlice";
import AlertList from "../alertList";
import { loginUser } from "@/common/login";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

interface Props {
}

type alert = {
  id: number
  text: string,
  className: string,
}

const SigninComponent: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [alerts, setAlerts] = useState<alert[]>([]);
    const [showPass, setShowPass] = useState(false);

    const [form, setForm] = useState(
        {
            username_or_email:'',
            password:'',
        }
    )

    const [rememberMe, setRememberMe] = useState(false);

    async function loginAttempt()
    {
        try {
          const res = await authFetch('POST',{},'dayplan/users/login/',form);
          const authToken = res[0]?.token;

          if(res.Error)
          {
              console.log(res.Error)
              setAlerts([
                {
                  id: Math.random(),
                  text: res.Error,
                  className: 'bg-red-400'
                }
              ])
              return;
          }

          loginUser(form['username_or_email'], authToken, null, rememberMe, dispatch);

          navigate('/dashboard/home');
        } catch (error) {
          console.error("something wrong with request: ",error)
          setAlerts([
            {
              id: Math.random(),
              text: "Couldn't login with provided credentials",
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
              Sign In
            </Typography>
          </CardHeader>

          <CardBody className="flex flex-col gap-4">
            <AlertList alerts = {alerts} removeAlert={removeAlert}/>
            <Input type="username" label="Username or Email" size="lg" value={form['username_or_email']} onChange={(e)=>handleFormChange(e,'username_or_email')}/>
            <div className="relative">
              <Input type={showPass?`password`:'text'} label="Password" size="lg" value={form['password']} onChange={(e)=>handleFormChange(e,'password')} className="pr-10"/>

              <div
                  color="blue-gray"
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={()=>{setShowPass(!showPass)}}
                >
                  {showPass?<EyeSlashIcon className="w-5 h-5 text-black"/>:<EyeIcon className="w-5 h-5 text-black"/>}
              </div>

            </div>
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" checked={rememberMe} onChange={(e)=>setRememberMe(e.target.checked)}/>
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={loginAttempt}>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
    )
}

export default SigninComponent;