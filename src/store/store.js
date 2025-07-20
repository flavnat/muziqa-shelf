// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import songsReducer from '../features/songs/slice';
import songsSaga from '../features/songs/saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(songsSaga);

export default store;
