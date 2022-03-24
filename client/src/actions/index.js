import { getByTitle } from '@testing-library/react';
import axios from 'axios';
import { GET_CONSOLES } from './types';
import { GET_GPUS } from './types';
import { USER_LOGIN } from './types';
import { USER_LOGOUT } from './types';

const ROOT_URL = 'http://localhost:7000';

export async function userLogin (usernameTest, passwordTest) {
  const url = `${ROOT_URL}/login`;

  console.log("Login action username " + usernameTest);
  console.log("Login action password " + passwordTest);

  const data = {
    username: usernameTest,
    password: passwordTest
  }

  console.log(data);
  
  const request = await axios.post(url, data);

  return {
    type: USER_LOGIN,
    payload: request
  };
};


export async function userLogout () {
  return {
    type: USER_LOGOUT    
  };
};





export async function getGPUs (searchText) {     
  const url = "http://localhost:7000/getGPUs/" + searchText;      
  const request = await axios.get(url);

  return {
    type: GET_GPUS,
    payload: request
  }       
};

export async function getConsoles (searchText) {
  const url = "http://localhost:7000/getConsoles/" + searchText;   
  const request = await axios.get(url);

  return {
    type: GET_CONSOLES,
    payload: request
  };
};

  /*
      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
  */