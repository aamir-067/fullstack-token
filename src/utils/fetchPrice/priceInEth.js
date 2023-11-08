import { ethers } from "ethers";
import { store } from "../../app/store";
import { setTokenDetails } from "../../features";
export const getPriceInEth = async ()=>{
    try{
        const {web3Api, tokensDetails} = store.getState();
        if(web3Api.provider || web3Api.signer){
            const res = await web3Api.presale.getTokenPriceInEth();

            store.dispatch(setTokenDetails({
                ...tokensDetails,
                tokenPrice : {
                    eth : Number(ethers.formatEther(res)),
                    usd : tokensDetails.tokenPrice.usd
                }
            }))
        }
    }catch(e){
        console.error(e);
    }
}