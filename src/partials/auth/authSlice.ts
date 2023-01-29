import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState{
    username: string | null;
    token: string | null;
    company_id: number | null | string;
}

const initialState:AuthState = {
    username: null,
    token: null,
    company_id: null,
}
export const authSlice = createSlice(
    {
        name:'auth',
        initialState,
        reducers: {
            setAuth: (state, action: PayloadAction<AuthState>) => {
                state.token = action.payload.token;
                state.username = action.payload.username;
            },
            setToken: (state, action: PayloadAction<string>) => {
              state.token = action.payload;
            },
            setUsername: (state, action: PayloadAction<string>) => {
              state.username = action.payload;
            },
        }
    }
);

export default authSlice.reducer;
export const {setAuth, setToken, setUsername} = authSlice.actions;