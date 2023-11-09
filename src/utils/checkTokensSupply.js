import { ethers } from "ethers";
import { store } from "../app/store";
import { setTokenDetails } from "../features";
export const checkTokenSupply = async () => { 
    try {
        const { web3Api, tokensDetails } = store.getState();
        if (web3Api.provider || web3Api.signer) {
            const res = await web3Api.mytoken.totalSupply(); 
            
            store.dispatch(setTokenDetails({
                ...tokensDetails,
                tokenSupply : ethers.toNumber(res),
            }))
        
            console.log("supply response is  : ", ethers.toNumber(res));



        }else{
            console.log("please connect wallet first");
        }
    } catch (e) {
        console.error(e);
    }
}