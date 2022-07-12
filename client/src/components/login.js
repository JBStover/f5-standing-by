import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'; 
import { React, useEffect, useState } from 'react';
import {userLogin, userLogout} from '../slices/userSlice';



const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassWord] = useState("");
    const dispatch = useDispatch();

    
    useEffect(() => {                                          
    }, [userName, password, userLogin, dispatch]);
    
    async function handleButtonClick (name, pw) {            
        event.preventDefault();
        console.log(name, pw)
        const credentials = {
            username: name,
            password: pw
        }
        await dispatch(userLogin(credentials));                                  
    };   



return (
    <QuartContainer>
        <form>
        <h3>Sign In</h3>
        <div className="form-group">
            <label>Username</label>
            <input onChange={event => setUserName(event.target.value)} type="username" className="form-control" placeholder="Enter username" />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input onChange={event => setPassWord(event.target.value)} type="password" className="form-control" placeholder="Enter password" />
        </div>
        
        <button onClick={() => handleButtonClick(userName, password)} type="submit" className="btn btn-primary btn-block">Submit</button>      
        </form>  
    </QuartContainer>
);

};

export default Login;


const QuartContainer = styled.div`
display: flex;
justify-content: center;
margin: 30px;
max-width: 25%;
`