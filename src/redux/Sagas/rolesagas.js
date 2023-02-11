import * as types from "../ActionTypes/roleAction";
import { takeLatest, put, all, fork, call } from "redux-saga/effects";
import Swal from "sweetalert2";

import { loadRoleSuccess, loadRoleError, getSingleRoleSuccess, getSingleRoleError, deleteRoleSuccess,
     deleteRoleError, addNewRoleSuccess, addNewRoleError, updateRoleError, updateRoleSuccess } from "../Actions/roleAction";

import { loadRolesApi, getSingleRoleApi, deleteRoleApi, addRoleApi ,updateRoleApi} from "../APIs/roleApi";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
});

export function* onLoadUsersStartAsync() {
    try {
        const response = yield call(loadRolesApi);
        if (response.data) {
            yield put(loadRoleSuccess(response.data));
        }
    } catch (error) {
        yield put(loadRoleError(error.response));
    }
}

export function* onSigleRoleStartAsync({ payload }) {
    try {
        const response = yield call(getSingleRoleApi, payload);
        yield put(getSingleRoleSuccess(response.data));
    } catch (error) {
        yield put(getSingleRoleError(error.response));
    }
}
export function* onDeleteRoleStartAsync(employeeId) {
    try {
        yield call(deleteRoleApi, employeeId.payload.id);
        yield put(deleteRoleSuccess(employeeId));
        Toast.fire({
            icon: "success",
            title: "role deleted successfully.",
        });
    } catch (error) {
        yield put(deleteRoleError(error.response));
    }
}
export function* onAddNewRoleStartAsync({ payload }) {
    try {
        const response = yield call(addRoleApi, payload);
        yield put(addNewRoleSuccess(response.data));
        Toast.fire({
            icon: "success",
            title: "role created successfully",
        });
    } catch (error) {
        yield put(addNewRoleError(error.response));
        Toast.fire({
            icon: "error",
            title: "error",
        });
    }
}

export function* onUpdateRoleStartAsync({ payload }) {
    try {
        const response = yield call(updateRoleApi, payload);
        yield put(updateRoleSuccess(response.data));
        Toast.fire({
            icon: "success",
            title: "role updated successfully.",
        });
    } catch (error) {
        yield put(updateRoleError(error.response));
        Toast.fire({
            icon: "error",
            title: error.response.data.errors.email,
        });
    }
}

export function* onUpdateSingleRole() {
    yield takeLatest(types.UPDATE_ROLE_START, onUpdateRoleStartAsync);
}
export function* onAddSingleEmployee() {
    yield takeLatest(types.ADD_NEW_ROLE_START, onAddNewRoleStartAsync);
}
export function* onLoadUsers() {
    yield takeLatest(types.LOAD_ROLE_START, onLoadUsersStartAsync);
}
export function* onGetSingleEmployee() {
    yield takeLatest(types.GET_SINGLE_ROLE_START, onSigleRoleStartAsync);
}
export function* onDeleteSingleEmployee() {
    yield takeLatest(types.DELETE_ROLE_START, onDeleteRoleStartAsync);
}
const userSagas = [fork(onLoadUsers), fork(onGetSingleEmployee), fork(onDeleteSingleEmployee), fork(onAddSingleEmployee), fork(onUpdateSingleRole)];

export default function* userSaga() {
    yield all([...userSagas]);
}
