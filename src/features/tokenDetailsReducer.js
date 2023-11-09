import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    tokenPrice : {eth : null, usd : null},
    tokenSupply : "null",
    tokensSold : "null",
    preSaleStatus : "loading...",
}

const tokensDetail = createSlice({
    name : "tokens details",
    initialState,
    reducers : {
        setTokenDetails : (state, action) => {
            state.tokenPrice.eth = action.payload.tokenPrice.eth;
            state.tokenPrice.usd = action.payload.tokenPrice.usd;
            state.tokenSupply = action.payload.tokenSupply;
            state.tokensSold = action.payload.tokensSold;
            state.preSaleStatus = action.payload.preSaleStatus;

            console.log("Token details updated : ", [state.tokenPrice.eth , state.tokenPrice.usd]);
        }
    }
});

export default tokensDetail.reducer;
export const {setTokenDetails} = tokensDetail.actions;