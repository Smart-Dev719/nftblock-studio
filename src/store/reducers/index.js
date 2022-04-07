import { combineReducers } from "redux";
import accountReducer from "./accountReducer";

export let rootReducer = combineReducers({
  accounts: accountReducer,
});

export default rootReducer;
