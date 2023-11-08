import { ethers } from "ethers";
import { store } from "../../app/store";
import { getPriceInEth } from "./priceInEth";
import { setTokenDetails } from "../../features";
export const getPriceInUSD = async ()=>{
    try{
        const {web3Api, tokensDetails} = store.getState();
        if(web3Api.provider || web3Api.signer){
            const res = await web3Api.presale.getTokenPriceInUSD();  // this will give me price of ether in usd.
            const tokenInEth = await getPriceInEth();
            const tokenPrice = tokenInEth * (ethers.toNumber(res) / 10 ** 8);

            store.dispatch(setTokenDetails({
                ...tokensDetails,
                tokenPrice : {
                    eth : tokensDetails.tokenPrice.eth,
                    usd : tokenPrice,
                }
            }))
        }
    }catch(e){
        console.error(e);
    }
}