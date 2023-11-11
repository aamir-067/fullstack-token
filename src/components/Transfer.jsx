import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import { checkAccountDetails, transferTokens } from '../utils';
const Transfer = () => {
    const toRef = useRef(null);
    const amountRef = useRef(null);

    const peerDetails = useSelector(state => state.peerDetails);

    const handleTransfer = async (e) => {
        e?.preventDefault();
        const to = toRef.current.value;
        const amount = Number(amountRef.current.value);

        if(to && amount){
            const tokensInWallet = Number(peerDetails.tokensInWallet.split(" ")[0]);
            // console.log(tokensInWallet, amount);
            if(tokensInWallet >= amount && amount > 0) {
                const res = await transferTokens({to , amount});
                toRef.current.value = "";
                amountRef.current.value = "";
                await checkAccountDetails();
                if(res){
                    console.log("Token Send successfully");
                }
            }else{
                console.log("Not enough tokens in your account");
            }
        }else{
            console.log("Enter valid inputs");
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
                        Transfer MyToken
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 ">
                        Transfer you tokens to other address
                    </p>
                    <form onSubmit={(e) => { handleTransfer(e) }} className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    Enter Receiver address
                                </label>
                                <div className="mt-2">
                                    <input
                                        ref={toRef}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="address"
                                    />

                                </div>
                            </div>

                            <div>
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    Enter MyToken Amount
                                </label>
                                <div className="mt-2">
                                    <input
                                        ref={amountRef}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="number"
                                        placeholder="tokens amount"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                onClick={()=>handleTransfer(undefined)}
                                    type="button"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    Stack Tokens
                                </button>
                            </div>
                        </div>
                    </form>


                </div>
            </div>
        </section>
    )
}

export default Transfer