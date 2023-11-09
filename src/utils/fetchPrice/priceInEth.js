import { ethers } from "ethers";
import { store } from "../../app/store";
import { setTokenDetails } from "../../features";
export const getPriceInEth = async ()=>{
    try{
        const {web3Api, tokensDetails} = store.getState();
        if(web3Api.provider || web3Api.signer){
            let res = await web3Api.presale.getTokenPriceInEth();
            console.log("Price in Eth : ", Number(ethers.formatEther(res)));

            // store.dispatch(setTokenDetails({
            //     ...tokensDetails,
            //     tokenPrice : {
            //         ...tokensDetails.tokenPrice,
            //         eth : Number(ethers.formatEther(res))
            //     }
            // }))
            
            return Number(ethers.formatEther(res));
        }
    }catch(e){
        console.error(e);
    }
}