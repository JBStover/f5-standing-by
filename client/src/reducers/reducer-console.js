import { GET_CONSOLES, CLEAR_CONSOLES } from "../actions/types";

const DEFAULT_STATE = [];

const consoleReducer = function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case GET_CONSOLES:
      console.log(action.payload.data);
      return action.payload.data;
    case CLEAR_CONSOLES:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

export default consoleReducer;



