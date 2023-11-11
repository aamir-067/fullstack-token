import { ethers } from "ethers";
import {MyToken, Stacking, PreSale} from "../../artifacts/index"
import { MYTOKEN_ADDRESS, PRESALE_ADDRESS, STACKING_ADDRESS } from "../../constants";
import { initWeb3 } from "../../features";
import {store} from "../../app/store"
import { checkAccountDetails } from "../checkAccountDetails";
export const initBySigner = async () => {
    try {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const mytoken = new ethers.Contract(MYTOKEN_ADDRESS, MyToken.abi, signer);
            const presale = new ethers.Contract(PRESALE_ADDRESS, PreSale.abi, signer);
            const stacking = new ethers.Contract(STACKING_ADDRESS, Stacking.abi, signer);

            // listen to wallet events
            window.ethereum.on('chainChanged', async () => {
                await initBySigner();
                await checkAccountDetails();
            });
            window.ethereum.on('accountsChanged', async () => {
                await initBySigner();
                await checkAccountDetails();
            });

            // store the web3Api
            store.dispatch(initWeb3({mytoken, presale, stacking, provider, signer}));

        }else{
            console.log("please install wallet first");
        }
    } catch (e) {
        console.error(e);
    }
};