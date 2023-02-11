import { combineReducers } from "redux";

import usersReducer from "./Reducers/reducer";
import RoleReducer from "./Reducers/rolereducer";

const rootReducer = combineReducers({
    loginData: usersReducer,
    data: usersReducer,
    employeeDetails: usersReducer,
    changePass: usersReducer,
    singleUserAssignment : usersReducer,
    role: RoleReducer,
    
})

export default rootReducer;