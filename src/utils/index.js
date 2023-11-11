import {initBySigner} from "./web3Init/initBySigner";
import {initByProvider} from "./web3Init/initByProvider";
import { getPriceInEth } from "./fetchPrice/priceInEth";
import { getPriceInUSD } from "./fetchPrice/priceInUSD";
import { checkIsPreSale } from "./checkIsPreSale";
import { purchaseTokens } from "./purchaseTokens";
import { checkTokenSupply } from "./checkTokensSupply";
import { checkAccountDetails } from "./checkAccountDetails";

export {initByProvider, initBySigner, getPriceInEth,checkTokenSupply, 
    checkAccountDetails,getPriceInUSD, checkIsPreSale , purchaseTokens}; 