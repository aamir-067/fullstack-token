import {configureStore} from "@reduxjs/toolkit";
import { web3Reducer, tokenDetailsReducer } from "../features";

export const store = configureStore({
    reducer : {
        web3Api : web3Reducer,
        tokensDetails : tokenDetailsReducer
    }
});