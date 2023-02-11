import * as types from '../ActionTypes/roleAction';

const initialState = {
    role: [],
    singleRole: [],
}

const 

RoleReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case types.LOAD_ROLE_START:
        case types.ADD_NEW_ROLE_START:
        case types.UPDATE_ROLE_START:
        case types.GET_SINGLE_ROLE_START:
        case types.DELETE_ROLE_START:
            return {
                ...state,
            };
        case types.LOAD_ROLE_SUCCESS:
            return {
                ...state,
                role: action.payload,
            }
        case types.GET_SINGLE_ROLE_SUCCESS:
            return {
                ...state,
                singleRole: action.payload,
            }
        case types.ADD_NEW_ROLE_SUCCESS:
        case types.UPDATE_ROLE_SUCCESS:
        case types.DELETE_ROLE_SUCCESS:
            return {
                ...state,
            }
        case types.LOAD_ROLE_ERROR:
        case types.ADD_NEW_ROLE_ERROR:
        case types.UPDATE_ROLE_ERROR:
        case types.GET_SINGLE_ROLE_ERROR:
        case types.DELETE_ROLE_ERROR:
            return {
                ...state,
                error: action.payload,
            };
         default:
            return state;
    }
}

export default RoleReducer;