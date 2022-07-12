import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ROOT_URL = 'http://localhost:7000';

const initialState = {
    consoles: [],
    status: null
};

//router.get("/character/:firstName/:lastName"

export const getConsoles = createAsyncThunk('console/getConsoles', async (searchedConsole) => {
    try {        
        const response = await axios.get(`${ROOT_URL}/getConsoles/${searchedConsole}`);
        console.log(response)
        return response.data;
    } catch (err) {
        return err.message;
    }
});

export const clearConsoles = createAsyncThunk('console/clearConsoles', async () => {
    try {
        return initialState;
    } catch (err) {
        return err.message;
    }
});


const consoleSlice = createSlice({
    name: 'console',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getConsoles.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getConsoles.fulfilled, (state, action) => {
                state.status = 'action successful'
                //console.log(action.payload)
                state.consoles = action.payload;
                
            })
            .addCase(getConsoles.rejected, (state, action) => {
                state.status = 'action failed'   
                return action.payload;
            })
            
    }
})



export default consoleSlice;