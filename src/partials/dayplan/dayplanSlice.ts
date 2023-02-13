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
    dayplanSummaries: [],
    selectedDayplan: initialDayplan
}

export const dayplanSlice = createSlice(
    {
        name:'dayplan',
        initialState,
        reducers: {
            setSummary: (state, action: PayloadAction<{ id: number, summary: {goal?: number, eaten?: number} }>) => {
                const { id, summary } = action.payload;
                const dayplanSummaries = state.dayplanSummaries.map(dpSummary => {
                  if (dpSummary.id === id) {
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