import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/global.css"
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import songsReducer from './songState'
import songsSaga from './songSaga';


const { makeServer } = require('./mirage/server');
makeServer();

const saga = createSagaMiddleware()
const store = configureStore({
    reducer: {
        songs: songsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saga)

})

saga.run(songsSaga)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);