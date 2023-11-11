import { store } from "../app/store";
export const stackTokens = async ({amount}) => {
    try {
        const { web3Api, tokensDetails } = store.getState();
        if (web3Api.signer){
            if(tokensDetails.tokenSupply > 80000000){
                console.log("Stacking ended");
                return false;
            }
            
            const res = await web3Api.mytoken.approve(web3Api.stacking.target, amount * 1000);
            await res.wait();
            await web3Api.stacking.stackToken(amount * 1000);

            console.log("Tokens stacked successfully");
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