import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { loginUser } from "./common/login";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state:RootState)=>state.auth.token);
  useEffect(()=>{

    const authToken = localStorage.getItem('authToken');
    const userName = localStorage.getItem('userName');

    if(authToken&&userName)
    {
      loginUser(userName, authToken, null, true, dispatch);
    }
  },[])

  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
