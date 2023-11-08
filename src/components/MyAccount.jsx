import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const MyAccount = () => {
	const {peerDetails} = useSelector(state => state);
	return (
		<div className='flex justify-center mt-20 h-5/6 mb-40'>
			<div className='w-11/12 md:w-8/12 my-6'>
				<h2 className='text-2xl font-bold text-center'>My Account Details</h2>
				<div className='my-4 md:my-6'>
				<div className='flex md:flex-row flex-col justify-evenly items-center'>
					<h2 className='font-bold text-lg'>Account Address</h2>
					<p>{peerDetails.address}
					</p>
				</div>
				<div className='flex md:flex-row flex-col justify-evenly items-center'>
					<h2 className='font-bold text-lg'>Tokens Stacked</h2>
					<p>{peerDetails.tokenStacked} MTK</p>
				</div>
				<div className='flex md:flex-row flex-col justify-evenly items-center'>
					<h2 className='font-bold text-lg'>Tokens in wallet</h2>
					<p>{peerDetails.tokensInWallet} MTK</p>
				</div>
				</div>
				
				<div className='flex justify-center items-center'>	
					<NavLink className="rounded-md bg-black px-3.5 py-2 font-semibold leading-7 text-white hover:bg-black/80"
					to={"/"} 
					>Back To Home</NavLink>
				</div>
			</div>
		</div>
	)
}

export default MyAccount