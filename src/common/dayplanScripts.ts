import { authFetch } from "./authFetch"

export async function getDayplans(token:string)
{
    const apiURL = 'dayplan/dayplans/mydayplans/'
    const res = await authFetch('GET', {'Authorization':'Token '+token}, apiURL, {});
    return res; 
}

export async function getSummaries(token:string)
{
    let dayplans = await getDayplans(token);
    let summaries = [];
    const extra = dayplans[dayplans?.length-1];
    if(dayplans)
    {
        for(let i =0; i<dayplans.length - 1; i++)
        {
            const summary = dayplans[i]; 
            summaries.push(
                {
                    id: summary.id,
                    day: summary.day,
                    goal: summary.goal,
                    eaten: extra.extra[summary.day]
                }
            )
        }
    }

    return summaries;
}

export function getDayName(day:string)
{
    const dict = {
        "SU": "Sunday",
        "MO": "Monday",
        "TU": "Tuesday",
        "WE": "Wednesday",
        "TH": "Thursday",
        "FR": "Friday",
        "SA": "Saturday"
    }

    return dict[day];
}