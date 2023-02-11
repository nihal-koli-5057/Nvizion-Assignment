import * as types from '../ActionTypes/roleAction';

export const loadRoleStart = () => ({
    type: types.LOAD_ROLE_START,
});

export const loadRoleSuccess = (users) => ({
    type: types.LOAD_ROLE_SUCCESS,
    payload: users,
});
  
export const loadRoleError = (error) => ({
    type: types.LOAD_ROLE_ERROR,
    payload: error,
});

export const addNewRoleStart = (newRole) => ({
    type: types.ADD_NEW_ROLE_START,
    payload: newRole,
});

export const addNewRoleSuccess = () => ({
    type: types.ADD_NEW_ROLE_SUCCESS, 
});

export const addNewRoleError = (error) => ({
    type: types.ADD_NEW_ROLE_ERROR,
    payload: error,
});

export const updateRoleStart = (updateRole) => ({
    type: types.UPDATE_ROLE_START,
    payload: updateRole,
});

export const updateRoleSuccess = () => ({
    type: types.UPDATE_ROLE_SUCCESS,
});

export const updateRoleError = (error) => ({
    type: types.UPDATE_ROLE_ERROR,
    payload: error,
});

export const getSingleRoleStart = (singleRole) => ({
    type: types.GET_SINGLE_ROLE_START,
    payload: singleRole,
});

export const getSingleRoleSuccess = (singleRole) => ({
    type: types.GET_SINGLE_ROLE_SUCCESS,
    payload: singleRole,  
});

export const getSingleRoleError = (error) => ({
    type: types.GET_SINGLE_ROLE_ERROR,
    payload: error,
})


export const deleteRoleStart = (employeeId) => ({
    type: types.DELETE_ROLE_START,
    payload: employeeId,
});

export const deleteRoleSuccess = (employeeId) => ({
    type: types.DELETE_ROLE_SUCCESS,
    payload: employeeId,
});

export const deleteRoleError = (error) => ({
    type: types.DELETE_ROLE_ERROR,
    payload: error,
});

