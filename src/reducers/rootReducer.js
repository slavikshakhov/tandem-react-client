import { combineReducers } from "redux";

import userStatus from "./userStatus";
import languagesReducer from "./languagesReducer";
import chatReducer from "./chatReducer";

const rootReducer = combineReducers({
  userStatus,
  languagesReducer,
  chatReducer,
});

export default rootReducer;
