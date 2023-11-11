import { store } from "../app/store";
export const unstackTokens = async ({amount}) => {
    try {
        const { web3Api } = store.getState();
        if (web3Api.signer){

            await web3Api.stacking.unStackToken(amount * 1000);

            // console.log("Tokens unStacked successfully");
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