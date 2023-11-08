import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    tokenPrice : {eth : null, usd : null},
    tokenSupply : null,
    tokensSold : null,
    preSaleStatus : null,
}

const tokensDetail = createSlice({
    name : "tokens details",
    initialState,
    reducers : {
        setTokenDetails : (state, action) => {
            state.tokenPrice = action.payload.tokenPrice;
            state.tokenSupply = action.payload.tokenSupply;
            state.tokensSold = action.payload.tokensSold;
            state.preSaleStatus = action.payload.preSaleStatus;
        }
    }
});

export default tokensDetail.reducer;
export const {setTokenDetails} = tokensDetail.actions;