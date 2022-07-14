import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ROOT_URL = 'http://localhost:7000';

const initialState = {
    searchedGPUs: [],
    status: 'Idle'
};

export const getGPUs = createAsyncThunk('gpu/getGPUs', async (searchedGPU) => {        

    try {        
        const response = await axios.get(`${ROOT_URL}/getGPUs/${searchedGPU}`);    
        console.log(response.data)    
        return response.data;
    } catch (err) {
        return err.message;
    }
});

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
    extraReducers(builder) {
        builder
            .addCase(getGPUs.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getGPUs.fulfilled, (state, action) => {
                state.status = 'action successful'
                state.searchedGpus = action.payload;    
                console.log(state.searchedGpus);  
                console.log(state.status);          
            })
            .addCase(getGPUs.rejected, (state, action) => {
                state.status = 'action failed';               
            });
            
    }
})

export const selectAllGPUResults = (state) => state.GPUs.searchedGPUs;
export const getGPUStatus = (state) => state.GPUs.status;

console.log(selectAllGPUResults);


export default gpuSlice;