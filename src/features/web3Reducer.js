import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     mytoken: null,
     presale: null,
     stacking: null,
     provider: null,
     signer: null 
}

const web3Api = createSlice({
    name: 'web3Api',
    initialState,
    reducers: {
        initWeb3: (state, action) => {
            state.mytoken = action.payload.mytoken;
            state.presale = action.payload.presale;
            state.stacking = action.payload.stacking;
            state.signer = action.payload.signer;
            state.provider = action.payload.provider;
        }
    }
})
export const { initWeb3 } = web3Api.actions;
export default web3Api.reducer;