import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import { getSongsFailure, getSongsFetch, getSongsSuccess, addSongFailure, addSongFetch, addSongSuccess, editSongFailure, editSongSuccess, deleteSongSuccess, deleteSongFailure } from './slice'
import axios from 'axios';


function* fetchSongsSaga(action) {
    try {
        const { page = 1, limit = 10 } = action.payload;
        const response = yield call(
            axios.get,
            `/api/songs?page=${page}&limit=${limit}`
        );
        yield put(getSongsSuccess(response.data));
    } catch (error) {
        yield put(getSongsFailure(error.message));
    }
}

function* addSongSaga(action) {
    try {
        const response = yield call(axios.post, '/api/songs', action.payload);
        yield put(addSongSuccess(response.data));

        const page = yield select((state) => state.songs.page);
        yield put(getSongsFetch({ page })); // re-fetch current page
    } catch (error) {
        yield put(addSongFailure(error.message));
    }
}

function* editSongSaga(action) {
    try {
        const response = yield call(axios.put, `/api/songs/${action.payload.id}`, action.payload);
        yield put(editSongSuccess(response.data));
        const page = yield select((state) => state.songs.page);
        yield put(getSongsFetch({ page }));
    } catch (error) {
        yield put(editSongFailure(error.message));
    }
}

function* deleteSongSaga(action) {
    try {
        yield call(axios.delete, `/api/songs/${action.payload}`);
        yield put(deleteSongSuccess(action.payload));
    } catch (error) {
        yield put(deleteSongFailure(error.message));
    }
}


export default function* songsSaga() {
    yield takeLatest(getSongsFetch.type, fetchSongsSaga);
    yield takeEvery('songs/addSongFetch', addSongSaga);
    yield takeEvery('songs/editSongFetch', editSongSaga);
    yield takeEvery('songs/deleteSongFetch', deleteSongSaga);
}