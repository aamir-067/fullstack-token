import { ethers } from "ethers";
import { store } from "../app/store";
import { setTokenDetails } from "../features";
export const checkIsPreSale = async () => {
    try {
        const { web3Api, tokensDetails } = store.getState();
        if (web3Api.provider || web3Api.signer) {
            // if  supply < 10M means presale started
            // if supply < 10M and >80M the presale is ended
            // if supply is greater the 80M then you can't purcahse or stack tokens anymore.
            const res = ethers.toNumber(await web3Api.presale.totalSoldAmount()) / 1000; // so that the decimals are deducted.
            let status;
            if (res < 10000000) {
                status =  "Started";
            } else if (res > 10000000 && res < 80000000) {
                status = "Ended";
            }
            else {
                status = "Token Sold";
            }

            store.dispatch(setTokenDetails({
                ...tokensDetails,
                preSaleStatus : status,
                tokensSold : res
            }))



        }else{
            console.log("please connect wallet first");
        }
    } catch (e) {
        console.error(e);
    }
}