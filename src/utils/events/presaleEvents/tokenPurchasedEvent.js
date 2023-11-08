import { ethers } from "ethers";
import { store } from "../../../app/store";
import { checkIsPreSale } from "../../checkIsPreSale";
export const purchaseTokens = async ({amount}) => {
    try {

        const { web3Api, tokensDetails } = store.getState();
        if (web3Api.presale) {
            
            presale.on("tokenSold", async (address, token) => {
                console.log("Tokens Sold", address, token);
                await checkIsPreSale();
                // call get Totla Tokens Sold and totalSupply.
            })

        }else{
            console.log("please connect wallet first");
        }
    } catch (e) {
        console.error(e);
    }
}