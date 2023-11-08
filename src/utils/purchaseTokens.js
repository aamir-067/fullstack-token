import { ethers } from "ethers";
import { store } from "../app/store";
import { getPriceInEth } from "./fetchPrice/priceInEth";
export const purchaseTokens = async ({amount}) => {
    try {

        const { web3Api, tokensDetails } = store.getState();
        if (web3Api.signer) {
            if(tokensDetails.preSaleStatus === "Token Sold"){
                console.log("Tokens are sold already");
                return;
            }
            const tokenPrice = await getPriceInEth();
            const res = await web3Api.presale.purchaseTokens(amount * 1000 , {value : ethers.parseEther(`${amount * tokenPrice}`)});
            
            console.log("Token purcahse in progress ... ");
            await res.wait();

            console.log("Tokens purcahsed successfully");

        }else{
            console.log("please connect wallet first");
        }
    } catch (e) {
        console.error(e);
    }
}