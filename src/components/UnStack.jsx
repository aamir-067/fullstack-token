import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import { unstackTokens , checkAccountDetails} from '../utils';
const UnStack = () => {
    const tokenRef = useRef(null);
    const peerDetails = useSelector(state => state.peerDetails);

    const handleUnstack = async (e) => {
        e?.preventDefault();
        const amount = Number(tokenRef.current.value) || 0;
        const tokenStacked = Number(peerDetails.tokenStacked.split(" ")[0])
        console.log(tokenStacked, amount);
        if(tokenStacked >= amount && amount > 0) {
            const res = await unstackTokens({amount});
            
            tokenRef.current.value = "";
            if(res){
                console.log("Unstacked done with reward");
                await res.wait();
                await checkAccountDetails();
            }
        }else{ 
            console.log("Please enter a valid number.");
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
                        UnStack Your MyToken
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 ">
                        reword tokens will automatically transfer to your account
                    </p>

                    <div className='flex flex-col lg:flex-row justify-center gap-x-4 items-center mt-4'>
                        <h2 className='font-bold text-lg'>Stacked tokens : </h2>
                        <h2 className='font-bold text-lg'>
                            {peerDetails.tokenStacked === "please wait..." ? "connect wallet" : peerDetails.tokenStacked}
                        </h2>
                    </div>

                    <form onSubmit={(e) => {handleUnstack(e) }} className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="" className="text-base font-medium text-gray-900">
                                    Enter MyToken Token Amount
                                </label>
                                <div className="mt-2">
                                    <input
                                        ref={tokenRef}
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="number"
                                        placeholder="tokens amount"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                onClick={()=>handleUnstack(undefined)}
                                    type="button"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    UnStack
                                </button>
                            </div>
                        </div>
                    </form>


                </div>
            </div>
        </section>
    )
}

export default UnStack