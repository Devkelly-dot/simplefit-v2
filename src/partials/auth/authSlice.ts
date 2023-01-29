import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState{
    username: string | null;
    token: string | null;
    userID:string | number;
}

const initialState:AuthState = {
    username: null,
    token: null,
    userID:null
}

export const authSlice = createSlice(
    {
        name:'auth',
        initialState,
        reducers: {
            setAuth: (state, action: PayloadAction<AuthState>) => {
                state.token = action.payload.token;
                state.username = action.payload.username;
                state.userID = action.payload.userID;
            },
            setToken: (state, action: PayloadAction<string>) => {
              state.token = action.payload;
            },
            setUsername: (state, action: PayloadAction<string>) => {
              state.username = action.payload;
            },
            setUserID: (state, action: PayloadAction<string>) => {
                state.userID = action.payload;
              },
        }
    }
);

export default authSlice.reducer;
export const {setAuth, setToken, setUsername} = authSlice.actions;