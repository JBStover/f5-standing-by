import { CLEAR_GPUS, GET_GPUS } from "../actions/types";

const DEFAULT_STATE = [];

const gpuReducer = function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case GET_GPUS:      
      return action.payload.data;
    case CLEAR_GPUS:
      return DEFAULT_STATE;
    default:
      return state;
  };  
};

export default gpuReducer;