import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { loginUser } from "./common/login";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const token = useSelector((state:RootState)=>state.auth.token);
  const loggedInUser = useSelector((state:RootState)=>state.auth.username);

  useEffect(()=>{
    const authToken = localStorage.getItem('authToken');
    const userName = localStorage.getItem('userName');

    if(authToken&&userName)
    {
      loginUser(userName, authToken, null, true, dispatch);
    }
    else if(token && loggedInUser)
    {
      loginUser(loggedInUser, token, null, true, dispatch);
    }
    else if(location.pathname!=='/auth/sign-up' && location.pathname!=='/auth/sign-in' && !token)
    {
      navigate('/auth/sign-in');
    }
    
  },[location, token, loggedInUser]);

  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
