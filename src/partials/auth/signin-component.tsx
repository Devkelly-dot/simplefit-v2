import { Card, CardHeader, Typography, Input, CardBody, Checkbox, CardFooter, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { authFetch } from "@/common/authFetch";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "./authSlice";

interface Props {
}

const SigninComponent: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState(
        {
            username:'',
            password:'',
        }
    )

    const [rememberMe, setRememberMe] = useState(false);

    async function loginAttempt()
    {
        const res = await authFetch('POST',{},'dayplan/users/login/',form);
        const authToken = res?.token;

        if(res.Error)
        {
            console.log(res.Error)
            return;
        }


        dispatch(setAuth(
            {
                username: res[0]?.username,
                token: authToken,
                userID: null
            }
        ))

        if(rememberMe)
        {
            localStorage.setItem('authToken', authToken);
        }

        navigate('/dashboard/home');
    }

    function handleFormChange(e,key:string)
    {
        let new_input = {};
        new_input[key] = e.target.value;
        setForm({...form,...new_input});
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
            <Input type="email" label="Email" size="lg" value={form['username']} onChange={(e)=>handleFormChange(e,'username')}/>
            <Input type="password" label="Password" size="lg" value={form['password']} onChange={(e)=>handleFormChange(e,'password')}/>
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