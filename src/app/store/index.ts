import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from 'redux-logger'
import createSagaMiddleware from "@redux-saga/core";
import storage from 'redux-persist/lib/storage'
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { routerMiddleware } from "connected-react-router";
import { history } from "app/utils";


const sagaMiddleware = createSagaMiddleware();

// const persistConfig = {
//     key: `${process.env.REACT_APP_NAME}_persist_store`,
//     storage,
//     whitelist: ['layout']
// }
export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history))
});


sagaMiddleware.run(rootSaga);


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;