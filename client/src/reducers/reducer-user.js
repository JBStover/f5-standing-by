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
      return { ...action.payload.data, isLoggedIn: true }
      
    case USER_LOGOUT:      
      return {...state, DEFAULT_STATE, isLoggedIn: false}
    
    default:
      return state;
  }
};

export default userReducer;