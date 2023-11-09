import { ethers } from "ethers";
import { store } from "../../app/store";
// import { getPriceInEth } from "./priceInEth";
import { setTokenDetails } from "../../features";
export const getPriceInUSD = async ()=>{
    try{
        const {web3Api, tokensDetails} = store.getState();
        if(web3Api.provider || web3Api.signer){
            const res = await web3Api.presale.getTokenPriceInUSD();  // this will give me price of ether in usd.
            let res2 = await web3Api.presale.getTokenPriceInEth();
            const tokenInEth = Number(ethers.formatEther(res2))
            const tokenPrice = tokenInEth * (ethers.toNumber(res) / 10 ** 8);

            console.log("Price in USD : ", tokenPrice);
            store.dispatch(setTokenDetails({
                ...tokensDetails,
                tokenPrice : {
                    eth : tokenInEth,
                    usd : tokenPrice,
                }
            }))
        }
    }catch(e){
        console.error(e);
    }
}