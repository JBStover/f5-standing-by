import { configureStore } from "@reduxjs/toolkit";
import  consoleSlice  from "./slices/consoleSlice";
import gpuSlice from "./slices/gpuSlice";
import userSlice from './slices/userSlice';


const store = configureStore({
    reducer: {
        GPUs: gpuSlice.reducer, 
        consoles: consoleSlice.reducer,
        users: userSlice.reducer    
    }
});

export default store;