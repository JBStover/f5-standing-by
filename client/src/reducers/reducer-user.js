import { USER_LOGIN } from "../actions/types";
import { USER_LOGOUT } from "../actions/types";

const DEFAULT_STATE = {
  _id: null,
  username: null,
  isLoggedIn: false 
};

const userReducer = function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case USER_LOGIN:      
        console.log({ ...action.payload.data, isLoggedIn: true }) 
       // debugger  
      return { ...action.payload.data, isLoggedIn: true }

      /*
    case USER_LOGOUT:
      console.log('The user is logged out!' + action.payload);
      return {...state, DEFAULT_STATE, isLoggedIn: false}
    */
    default:
      return state;
  }
};

export default userReducer;