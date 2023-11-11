import { ethers } from "ethers";
import { store } from "../app/store";
export const transferTokens = async ({to,amount}) => {
    try {
        const { web3Api } = store.getState();
        if (web3Api.signer){
            if(!ethers.isAddress(to)){
                console.log("Wallet address is not valid");
                return false;
            }
            
            await web3Api.mytoken.transfer(to, amount * 1000);

            console.log("Tokens Transferred successfully");
            return true;

        }else{
            console.log("please connect wallet first");
            return false;
        }
    } catch (e) {
        console.error(e);
        return false;
    }
}