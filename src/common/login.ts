import { getSummaries } from "./dayplanScripts";
import { setAuth } from "@/partials/auth/authSlice";
import { setSummary } from "@/partials/dayplan/dayplanSlice";

export async function loginUser(username, token, id, remember, dispatch)
{
    dispatch(setAuth(
        {
            username: username,
            token: token,
            userID: id
        }
    ))

    if(remember)
    {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userName', username);
    }

    const summaries = await getSummaries(token);
    summaries.forEach(summary => {
        dispatch(setSummary(
            {
                day: summary.day,
                summary:{
                    id: summary.id,
                    goal:summary.goal,
                    eaten:summary.eaten
                }
            }
        ))
      });
}

export async function logoutUser()
{
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    location.reload();
}