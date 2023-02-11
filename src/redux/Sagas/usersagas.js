import * as types from "../ActionTypes/actionTypes";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import {
    loadUsersSuccess,
    loadUsersError, 
    addNewEmployeeSuccess,
    addNewEmployeeError,
    updateEmployeeSuccess,
    updateEmployeeError,
    deleteEmployeeSuccess,
    deleteEmployeeError,
    getSingleEmployeeSuccess,
    getSingleEmployeeError,
} from "../Actions/actions";

import { 
    loadUsersApi, 
    addEmployeeApi, 
    updateEmployeeApi, 
    deleteEmployeeApi, 
    getSingleEmployeeApi} from "../APIs/api";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});

export function* onLoadUsersStartAsync() {
    try {
        const response = yield call(loadUsersApi);
        if (response.data) { 
            yield put(loadUsersSuccess(response.data));
        }

    } catch (error) {
        yield put(loadUsersError(error.response));
    }
}


export function* onAddNewEmployeeStartAsync({ payload }) {
    try {
        const response = yield call(addEmployeeApi, payload); 
            yield put(addNewEmployeeSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: 'user created successfully',
        })
    } catch (error) {
        yield put(addNewEmployeeError(error.response));
                Toast.fire({
                    icon: "error",
                    title: "error",
            })
    }
}

export function* onUpdateEmployeeStartAsync({ payload }) {
        try {
            const response = yield call(updateEmployeeApi, payload);
            yield put(updateEmployeeSuccess(response.data));
            Toast.fire({
                icon: "success",
                title: "User updated successfully.",
            });
        } catch (error) {
            yield put(updateEmployeeError(error.response));
            Toast.fire({
                icon: "error",
                title: error.response.data.errors.email,
            });
        }
    }
    

export function* onDeleteEmployeeStartAsync(employeeId) {
    try {
         yield call(deleteEmployeeApi, employeeId.payload.id);
            yield put(deleteEmployeeSuccess(employeeId));
            Toast.fire({
                icon: "success",
                title: "User deleted successfully.",
            });
    } catch (error) {
        yield put(deleteEmployeeError(error.response));
    }
}

export function* onSigleEmployeeStartAsync({ payload }) {
    try {
        const response = yield call(getSingleEmployeeApi, payload)   
            yield put(getSingleEmployeeSuccess(response.data));
    } catch (error) {
        yield put(getSingleEmployeeError(error.response));
    }
}

export function* onLoadUsers() {
    yield takeLatest(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

export function* onAddNewEmployee() {
    yield takeLatest(types.ADD_NEW_EMPLOYEE_START, onAddNewEmployeeStartAsync);
}

export function* onUpdateEmployee() {
    yield takeLatest(types.UPDATE_EMPLOYEE_START, onUpdateEmployeeStartAsync);
}

export function* onGetSingleEmployee() {
    yield takeLatest(types.GET_SINGLE_EMPLOYEE_START, onSigleEmployeeStartAsync);
}

export function* onDeleteEmployee() {
    yield takeLatest(types.DELETE_EMPLOYEE_START, onDeleteEmployeeStartAsync);
}

const userSagas = [fork(onLoadUsers), fork(onAddNewEmployee), fork(onUpdateEmployee), fork(onGetSingleEmployee), fork(onDeleteEmployee)];

export default function* userSaga() {
    yield all([...userSagas]);
}
