import React, { useEffect, useState } from 'react'
import { NavLink, useLoaderData } from 'react-router-dom'
// import { fetchTotalTokens } from '../utils';
import {useSelector} from "react-redux";

const Home = () => {
  const {tokensSold} = useSelector(state => state.tokensDetails);

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
          <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-gray-100 p-1">
            <div className="rounded-full bg-white p-1 px-2">
              <p className="text-sm font-medium">Purchase <strong>MTK</strong></p>
            </div>
            <p className="text-sm font-medium pr-1">Become an Early Bird</p>
          </div>
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
            People who care about your future
          </h1>
          <p className="mt-8 text-lg text-gray-700">
            Purchase MyToken right now and stack your tokens to earn a daily reward at <strong>5% daily</strong> of the total tokens stacked in the Bank
          </p>
          <h2 className='my-4 font-bold text-lg'>MyToken Sold : {tokensSold ? tokensSold : 0}</h2>
          <div className='my-6'>
              <NavLink
                to={"/purchase"}
                className="rounded-md bg-black px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Get MTK Now
              </NavLink>
            </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
          <img
            className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] w-full lg:h-[700px] xl:aspect-[16/9]"
            src="https://shorturl.at/jnDM5"
            alt=""
          />
        </div>
      </div>
    </div>

  )
}

export default Home