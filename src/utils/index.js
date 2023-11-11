import {initBySigner} from "./web3Init/initBySigner";
import {initByProvider} from "./web3Init/initByProvider";
import { getPriceInEth } from "./fetchPrice/priceInEth";
import { getPriceInUSD } from "./fetchPrice/priceInUSD";
import { checkIsPreSale } from "./checkIsPreSale";
import { purchaseTokens } from "./purchaseTokens";
import { checkTokenSupply } from "./checkTokensSupply";
import { checkAccountDetails } from "./checkAccountDetails";
import { stackTokens } from "./stackTokens";
import { unstackTokens } from "./unstackTokens";
import { transferTokens } from "./transferTokens";

export {initByProvider, initBySigner,stackTokens , unstackTokens,
    getPriceInEth,checkTokenSupply, transferTokens,
    checkAccountDetails,getPriceInUSD, checkIsPreSale , purchaseTokens}; 