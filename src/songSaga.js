import { call, put, takeEvery , takeLatest } from 'redux-saga/effects'
import { getSongsFailure, getSongsFetch, getSongsSuccess } from './songState'
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

// function* workGetSongsFetch() {
//     const song = yield call(() => fetch('https://api.thecatapi.com/v1/breeds'))
//     const formattedSongs = yield song.json()
//     const formattedSongsShortened = formattedSongs.slice(0, 10)
//     yield put(getSongsSuccess(formattedSongsShortened))
// }

// export default function* songSaga() {
//     yield takeEvery('songs/getSongsFetch', workGetSongsFetch)
// } 

export default function* songsSaga() {
  yield takeLatest(getSongsFetch.type, fetchSongsSaga);
}