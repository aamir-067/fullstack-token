import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const MyAccount = () => {

	function formatTimestamp(unixTimestamp) {
		const date = new Date(unixTimestamp * 1000);
		const hours = ('0' + date.getHours()).slice(-2);
		const minutes = ('0' + date.getMinutes()).slice(-2);
		const day = ('0' + date.getDate()).slice(-2);
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const year = date.getFullYear();
		return `${hours}:${minutes} ${day}/${month}/${year}`;
	}

	const peerDetails = useSelector(state => state.peerDetails); 
	return (
		<div className='flex justify-center mt-20 h-5/6 mb-40'>
			<div className='w-11/12 md:w-8/12 my-6'>
				<h2 className='text-2xl font-bold text-center'>My Account Details</h2>
				<div className='my-4 md:my-6'>
				<div className='flex md:flex-row flex-col justify-evenly items-center'>
					<h2 className='font-bold text-lg'>Account Address</h2>
					<p>{peerDetails.address ? `${[...peerDetails.address].slice(0, 5).join("")}...${[...peerDetails.address].slice(37, 42).join("")}` : "not connected"}
					</p>
				</div>
				<div className='flex md:flex-row flex-col justify-evenly items-center'>
					<h2 className='font-bold text-lg'>Tokens Stacked</h2>
					<p>{peerDetails.tokenStacked === "0 MTK" ? "Not Stacked Yet" : peerDetails.tokenStacked}</p>
				</div>
				<div className='flex md:flex-row flex-col justify-evenly items-center'>
					<h2 className='font-bold text-lg'>Stacking Time</h2>
					<p>{peerDetails.tokenStacked !== "0 MTK" ? formatTimestamp(Number(peerDetails.stackingTime)): "Not Stacked Yet"}</p>
				</div>
				<div className='flex md:flex-row flex-col justify-evenly items-center'>
					<h2 className='font-bold text-lg'>Tokens in wallet</h2>
					<p>{peerDetails.tokensInWallet}</p>
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