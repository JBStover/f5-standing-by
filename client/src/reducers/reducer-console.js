import { GET_CONSOLES } from "../actions/types";

const DEFAULT_STATE = [];

const consoleReducer = function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case GET_CONSOLES:
      console.log(action.payload.data);
      return action.payload.data;
    default:
      return state;
  }
};

export default consoleReducer;



