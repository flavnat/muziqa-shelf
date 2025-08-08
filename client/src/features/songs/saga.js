import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { getSongsFailure, getSongsFetch, getSongsSuccess, addSongFailure, addSongFetch, addSongSuccess, editSongFailure, editSongSuccess, deleteSongSuccess, deleteSongFailure, editSongFetch, deleteSongFetch } from './slice'
import axios from 'axios';


function* fetchSongsSaga(action) {
    try {
        const { page = 1, limit = 5 } = action.payload;
        const response = yield call(
            axios.get,
            `http://localhost:4000/songs?limit=${limit}&page=${page}`
        );
        yield put(getSongsSuccess(response.data.data));
        console.log("saga return",response.data.data)
    } catch (error) {
        yield put(getSongsFailure(error.message));
    }
}

function* addSongSaga(action) {
    try {
        const response = yield call(axios.post, 'http://localhost:4000/song', action.payload);
        yield put(addSongSuccess(response.data));

        const page = yield select((state) => state.songs.page);
        yield put(getSongsFetch({ page })); // re-fetch current page
    } catch (error) {
        yield put(addSongFailure(error.message));
    }
}

function* editSongSaga(action) {
    try {
        const response = yield call(axios.put, `http://localhost:4000/song/${action.payload._id}`, action.payload);
        yield put(editSongSuccess(response.data));
        yield put(getSongsFetch({ page }));
    } catch (error) {
        yield put(editSongFailure(error.message));
    }
}

function* deleteSongSaga(action) {
    try {
        yield call(axios.delete, `http://localhost:4000/song/${action.payload}`);
        yield put(deleteSongSuccess(action.payload));
    } catch (error) {
        yield put(deleteSongFailure(error.message));
    }
}


export default function* songsSaga() {
    yield takeLatest(getSongsFetch.type, fetchSongsSaga);
    yield takeEvery(addSongFetch.type, addSongSaga);
    yield takeEvery(editSongFetch.type, editSongSaga);
    yield takeEvery(deleteSongFetch.type, deleteSongSaga);
}