import PeerDetailsReducer ,{ setPeerDetails } from "./PeerDetailsReducer";
import tokenDetailsReducer, { setTokenDetails } from "./tokenDetailsReducer";
import web3Reducer, { initWeb3 } from "./web3Reducer";
export {
    initWeb3,
    web3Reducer,
    tokenDetailsReducer,
    setTokenDetails,
    PeerDetailsReducer as peerDetailsReducer,
    setPeerDetails
};