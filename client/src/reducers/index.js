import { combineReducers } from "redux";
import gpuReducer from "./reducer-gpu";
import consoleReducer from "./reducer-console";
import userReducer from "./reducer-user";

const rootReducer = combineReducers({
  gpus: gpuReducer,
  consoles: consoleReducer,
  users: userReducer
});

export default rootReducer;











