import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// const saveToLocalStorage = (state) => {
//   const serializedUid = JSON.stringify(state.accounts);
//   localStorage.setItem("accounts", serializedUid);
// };
// const checkLocalStorage = () => {
//   const serializedUid = localStorage.getItem("accounts");
//   console.log(serializedUid);
//   if (serializedUid === null) return undefined;
//   return {
//     accounts: JSON.parse(serializedUid),
//   };
// };
const comp = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  // checkLocalStorage(),
  comp(applyMiddleware(thunk))
);

// store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;
