import * as types from '../ActionTypes/actionTypes';

export const loadUsersStart = () => ({
    type: types.LOAD_USERS_START,
});

export const loadUsersSuccess = (users) => ({
    type: types.LOAD_USERS_SUCCESS,
    payload: users,
});
  
export const loadUsersError = (error) => ({
    type: types.LOAD_USERS_ERROR,
    payload: error,
});

export const addNewEmployeeStart = (newEmployee) => ({
    type: types.ADD_NEW_EMPLOYEE_START,
    payload: newEmployee,
});

export const addNewEmployeeSuccess = () => ({
    type: types.ADD_NEW_EMPLOYEE_SUCCESS, 
});

export const addNewEmployeeError = (error) => ({
    type: types.ADD_NEW_EMPLOYEE_ERROR,
    payload: error,
});

export const updateEmployeeStart = (updateEmployee) => ({
    type: types.UPDATE_EMPLOYEE_START,
    payload: updateEmployee,
});

export const updateEmployeeSuccess = () => ({
    type: types.UPDATE_EMPLOYEE_SUCCESS,
});

export const updateEmployeeError = (error) => ({
    type: types.UPDATE_EMPLOYEE_ERROR,
    payload: error,
});

export const getSingleEmployeeStart = (singleEmployee) => ({
    type: types.GET_SINGLE_EMPLOYEE_START,
    payload: singleEmployee,
});

export const getSingleEmployeeSuccess = (singleEmployee) => ({
    type: types.GET_SINGLE_EMPLOYEE_SUCCESS,
    payload: singleEmployee,  
});

export const getSingleEmployeeError = (error) => ({
    type: types.GET_SINGLE_EMPLOYEE_ERROR,
    payload: error,
})


export const deleteEmployeeStart = (employeeId) => ({
    type: types.DELETE_EMPLOYEE_START,
    payload: employeeId,
});

export const deleteEmployeeSuccess = (employeeId) => ({
    type: types.DELETE_EMPLOYEE_SUCCESS,
    payload: employeeId,
});

export const deleteEmployeeError = (error) => ({
    type: types.DELETE_EMPLOYEE_ERROR,
    payload: error,
});

