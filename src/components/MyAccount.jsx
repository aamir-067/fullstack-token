import React from 'react'
import { NavLink } from 'react-router-dom'

const MyAccount = () => {
	return (
		<div className='flex justify-center items-center'>
			<div className='w-11/12 md:w-8/12 my-6'>
				<h2 className='text-2xl font-bold text-center'>My Account Details</h2>
				<div className='my-4 md:my-6'>
				<div className='flex md:flex-row flex-col justify-evenly items-center'>
					<h2>Account Address</h2>
					<p>0x000000000000000</p>
				</div>
				<div className='flex md:flex-row flex-col justify-evenly items-center'>
					<h2>Tokens Stacked</h2>
					<p>67876</p>
				</div>
				<div className='flex md:flex-row flex-col justify-evenly items-center'>
					<h2>Tokens Available</h2>
					<p>786</p>
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