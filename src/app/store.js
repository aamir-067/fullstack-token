import {configureStore} from "@reduxjs/toolkit";
import { web3Reducer, tokenDetailsReducer, peerDetailsReducer } from "../features";

export const store = configureStore({
    reducer : {
        web3Api : web3Reducer,
        tokensDetails : tokenDetailsReducer,
        peerDetails : peerDetailsReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    })
});