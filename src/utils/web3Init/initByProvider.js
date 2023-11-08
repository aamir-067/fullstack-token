import { ethers } from "ethers";
import {MyToken, Stacking, PreSale} from "../../artifacts/index"
import { MYTOKEN_ADDRESS, PRESALE_ADDRESS, STACKING_ADDRESS } from "../../constants";
import { initWeb3 } from "../../features";
import {store} from "../../app/store"
export const initByProvider = async ()=>{
    try {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const mytoken = new ethers.Contract(MYTOKEN_ADDRESS, MyToken.abi, provider);
            const presale = new ethers.Contract(PRESALE_ADDRESS, PreSale.abi, provider);
            const stacking = new ethers.Contract(STACKING_ADDRESS, Stacking.abi, provider);

            // listen to wallet events
            window.ethereum.on('chainChanged', async () => {
                await initByProvider()
            });
            window.ethereum.on('accountsChanged', async () => {
                await initByProvider()
            });

            // store the web3Api
            store.dispatch(initWeb3({mytoken, presale, stacking, provider, signer : null}));

        }else{
            console.log("please connect wallet first");
        }
    } catch (e) {
        console.error(e);
    }
}