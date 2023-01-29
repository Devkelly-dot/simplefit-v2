import { Card, CardHeader, Typography, Input, CardBody, Checkbox, CardFooter, Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { authFetch } from "@/common/authFetch";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "./authSlice";

interface Props {
}

const RegisterComponent: React.FC<Props> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState(
        {
            username:'',
            password:'',
            email:''
        }
    )
    async function registerAttempt()
    {
        const res = await authFetch('POST',{},'dayplan/users/register/',form);
        const loginForm = {
            username:res[0]?.username,
            password:form?.password
        }
        if(res.Error)
        {
            console.log(res.Error)
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
                    Sign Up
                </Typography>
            </CardHeader>


            <CardBody className="flex flex-col gap-4">
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