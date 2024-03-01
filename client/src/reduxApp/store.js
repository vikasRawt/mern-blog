import { configureStore } from "@reduxjs/toolkit";
import useReducer from '../reduxApp/User/userSlice';

export const store = configureStore({
    reducer:{
        user: useReducer
    }
})