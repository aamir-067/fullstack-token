import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    address : '',
    tokenStacked : "please wait...",
    stackingTime : 'please wait...',
    tokensInWallet : "please wait...",
}

const peerDetails = createSlice({
    name : "peer details",
    initialState,
    reducers : {
        setPeerDetails : (state, action) => {
            state.address = action.payload.address;
            state.tokenStacked = action.payload.tokenStacked + ' MTK';
            state.stackingTime = action.payload.stackingTime;
            state.tokensInWallet = action.payload.tokensInWallet + ' MTK';

            console.log("details set successfully : ", [state.address, state.tokenStacked , state.tokensInWallet, state.stackingTime]);
        },
        resetPeerDetails: (state)=>{
            state.address = '';
            state.tokenStacked = "please wait...";
            state.stackingTime = 'please wait...';
            state.tokensInWallet = "please wait...";
        }
    }
});

export default peerDetails.reducer;
export const {setPeerDetails , resetPeerDetails} = peerDetails.actions;