import { ethers } from "ethers";
import { store } from "../app/store";
import { setTokenDetails } from "../features";
export const checkTokenSupply = async () => {
    try {
        const { web3Api, tokensDetails } = store.getState();
        if (web3Api.provider || web3Api.signer) {
            const res = ethers.toNumber(await web3Api.mytoken.totalSoldAmount()) / 1000; // so that the decimals are deducted.
            
            store.dispatch(setTokenDetails({
                ...tokensDetails,
                tokenSupply : res,
            }))



        }else{
            console.log("please connect wallet first");
        }
    } catch (e) {
        console.error(e);
    }
}