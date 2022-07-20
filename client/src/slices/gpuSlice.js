import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ROOT_URL = 'http://localhost:7000';

const initialState = {
    searchedGPUs: [],
    status: 'idle' 
};

export const getGPUs = createAsyncThunk('gpu/getGPUs', async (searchedGPU) => { 
    try {        
        const response = await axios.get(`${ROOT_URL}/getGPUs/${searchedGPU}`); 
        return [...response.data];
    } catch (err) {
        return err.message;
    }
});

//Not currently being used
export const clearGPUs = createAsyncThunk('gpu/clearGPUs', async () => {
    try {
        return initialState;
    } catch (err) {
        return err.message;
    }
});


const gpuSlice = createSlice({
    name: 'gpu',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGPUs.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(getGPUs.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.searchedGPUs = [];
                state.searchedGPUs.push(...action.payload)
                
            })
            .addCase(getGPUs.rejected, (state, action) => {
                state.status = 'failed';
                               
            });
            
    }
})

export default gpuSlice;