import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../partials/auth/authSlice';
import dayplanReducer from '../partials/dayplan/dayplanSlice';

export const store = configureStore({
  reducer: {
    auth:authReducer,
    dayplan:dayplanReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
