import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type dayplanSummary = {
    id: number,
    day: string,
    goal: number,
    eaten: number
}

export type foodType = {
    id: number,
    name: string,
    description: string,
    complete: number 
}

export type liftType = {
    id: number,
    name: string,
    description: string,
    complete: number,
    goal: number,
    weight: number,
    reps: number,
    measurement: string
}

export type cardioType = {
    id: number,
    name: string,
    description: string,
    goal: number,
    measurement: string 
}

type dayplanDetail = {
    id: number,
    day: string,
    goal: number,
    food: foodType[],
    lift: liftType[],
    cardio: cardioType[]
}

interface DayplanState{
    dayplanSummaries: dayplanSummary[],
    selectedDayplan: dayplanDetail
}

const initialDayplan = {
    id: -1,
    day: "MO",
    goal: 0,
    food: [],
    lift: [],
    cardio: []
}
const initialState:DayplanState = {
    dayplanSummaries: [
        {
            id: -1,
            day: "SU",
            goal: 0,
            eaten: 0
        },
        {
            id: -2,
            day: "MO",
            goal: 0,
            eaten: 0
        },
        {
            id: -3,
            day: "TU",
            goal: 0,
            eaten: 0
        },
        {
            id: -4,
            day: "WE",
            goal: 0,
            eaten: 0
        },
        {
            id: -5,
            day: "TH",
            goal: 0,
            eaten: 0
        },
        {
            id: -6,
            day: "FR",
            goal: 0,
            eaten: 0
        },
        {
            id: -7,
            day: "SA",
            goal: 0,
            eaten: 0
        }
    ],
    selectedDayplan: initialDayplan
}

export const dayplanSlice = createSlice(
    {
        name:'dayplan',
        initialState,
        reducers: {
            setSummary: (state, action: PayloadAction<{ day: string, summary: {id?:number, goal?: number, eaten?: number} }>) => {
                const { day, summary } = action.payload;
                const dayplanSummaries = state.dayplanSummaries.map(dpSummary => {
                  if (dpSummary.day === day) {
                    return { ...dpSummary, ...summary };
                  }
                  return dpSummary;
                });
                state.dayplanSummaries = dayplanSummaries;
            }
        }
    }
);

export default dayplanSlice.reducer;
export const {setSummary} = dayplanSlice.actions;