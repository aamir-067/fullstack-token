import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { checkAccountDetails, getPriceInUSD, purchaseTokens } from '../utils';
const Purchase = () => {

    const price = useRef(null);
    const {tokensDetails} = useSelector(state => state);

    useEffect(()=>{
        ;(async()=>{
            if(!tokensDetails.tokenPrice.eth){
                await getPriceInUSD()
            }
        }
        )()
    },[]);

    const handlePurchase = async (e) => {
        e?.preventDefault();
        const amount = price.current.value;
        if((amount > 50) && (amount < 10000000) ) {
            const res = await purchaseTokens({amount});
            await checkAccountDetails();
            if(res){
                console.log("done purchasing");
            }
        }else{
            console.log("invalid amount entered retry with correct number");
        }
    }
    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <div className="mb-2 flex justify-center">
                        <span className='w-20'>
                            <img src="https://img.freepik.com/free-vector/flat-design-crypto-mining-logo-template_23-2149409054.jpg?t=st=1698559799~exp=1698560399~hmac=02efc8967937811259bbfea12251e2ebe0e0d7762de1bfd029b10bf6577ef238" alt="this application logo" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Purchase MyTokens
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 ">
                        Become an early bird
                    </p>

                    <div className='flex flex-col lg:flex-row justify-center gap-x-4 items-center mt-4'>
                    <h2 className='font-bold text-lg'>Pre Sale Status : </h2>
                    <h2 className='font-bold text-lg'>{tokensDetails.preSaleStatus}</h2>
                    </div>

                    <form onSubmit={async(e) => { handlePurchase(e) }} className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    Enter myCoin Token Amount
                                </label>
                                <div className="mt-2">
                                    <input
                                        ref={price}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="number"
                                        placeholder="tokens amount"
                                    />
                                    <p className='text-gray-700 text-sm'>* minimum 50 tokens allowed</p>
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={()=>{handlePurchase(undefined)}}
                                    type="button"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    Purchase Tokens
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className='flex flex-col lg:flex-row justify-center gap-x-4 items-center mt-4'>
                    <h2 className='font-bold text-lg'>Price in Eth : </h2>
                    <h2 className='font-bold text-lg'>{tokensDetails.tokenPrice.eth ? `${tokensDetails.tokenPrice.eth} eth` : "loading..."}</h2>
                    </div>
                    <div className='flex flex-col lg:flex-row justify-center gap-x-4 items-center mt-4'>
                    <h2 className='font-bold text-lg'>Price in USD : </h2>
                    <h2 className='font-bold text-lg'>{tokensDetails.tokenPrice.usd ?  `$ ${Number(tokensDetails.tokenPrice.usd).toFixed(4)}` : "loading..."}</h2>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Purchase