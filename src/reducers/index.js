import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import boardReducer from "./board.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  board: boardReducer,
});
export default rootReducer;
