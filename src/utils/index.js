import {initBySigner} from "./web3Init/initBySigner";
import {initByProvider} from "./web3Init/initByProvider";
import { getPriceInEth } from "./fetchPrice/priceInEth";
import { getPriceInUSD } from "./fetchPrice/priceInUSD";
import { checkIsPreSale } from "./checkIsPreSale";
import { purchaseTokens } from "./purchaseTokens";
import { checkTokenSupply } from "./checkTokensSupply";
export {initByProvider, initBySigner, getPriceInEth,checkTokenSupply, getPriceInUSD, checkIsPreSale , purchaseTokens}; 