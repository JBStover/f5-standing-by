import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ROOT_URL = 'http://localhost:7000';

const initialState = {
    _id: null,
    username: null,
    isLoggedIn: false,
    status: null
};

export const userLogin = createAsyncThunk('user/userLogin', async (username, password) => {        
    const credentials = {
        username: username,
        password: password
    };

    console.log(credentials);
    try {        
        const response = await axios.post(`${ROOT_URL}/login`, credentials);
        console.log(response)
        return response.data;
    } catch (err) {
        return err.message;
    }
});

export const userLogout = createAsyncThunk('user/userLogout', async () => {
    return {...state, initialState, isLoggedIn: false};
});



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(userLogin.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.status = 'action successful'
                state.books = action.payload;
                
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = 'action failed'   
                return action.payload;
            })
            
    }
})



export default userSlice;