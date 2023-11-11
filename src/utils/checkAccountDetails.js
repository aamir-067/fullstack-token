import { ethers } from "ethers";
import { store } from "../app/store";
import { setPeerDetails } from "../features";


export const checkAccountDetails = async () => {
    try {
        const { web3Api } = store.getState();
        if (web3Api.signer) {
            const stackingHistory = await web3Api.stacking.stackers(web3Api.signer.address) ; // so that the decimals are deducted.
            const balanceAvailable = await web3Api.mytoken.balanceOf(web3Api.signer.address);
            
            store.dispatch(setPeerDetails({
                address : web3Api.signer.address,
                tokenStacked : ethers.toNumber(stackingHistory[0]) / 1000,
                stackingTime : ethers.toNumber(stackingHistory[1]),
                tokensInWallet : ethers.toNumber(balanceAvailable)/1000,
            }))

        }else{
            console.log("please connect wallet first");
        }
    } catch (e) {
        console.error(e);
    }
}