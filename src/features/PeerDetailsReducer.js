import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    address : '0x00000000',
    tokenStacked : "null",
    tokensInWallet : "null",
}

const peerDetails = createSlice({
    name : "peer details",
    initialState,
    reducers : {
        setPeerDetails : (state, action) => {
            state.address = action.payload.address;
            state.tokenStacked = action.payload.tokenStacked;
            state.tokensInWallet = action.payload.tokensInWallet;
        }
    }
});

export default peerDetails.reducer;
export const {setPeerDetails} = peerDetails.actions;