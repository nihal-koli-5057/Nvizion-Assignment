import { all } from 'redux-saga/effects';
import userSaga from './usersagas';
import roleSaga from './rolesagas';

export default function* rootSaga() {
   yield all([
    userSaga(),
    roleSaga(),
   ]);
}