import React from 'react'
import { NavLink } from 'react-router-dom'
import {initByProvider, initBySigner, checkAccountDetails} from "../utils";
import {useDispatch, useSelector} from "react-redux";
import { resetPeerDetails } from '../features';
const Navbar = () => {
  const {signer} = useSelector((state) => state.web3Api);
  const dispatch = useDispatch();
  const handleConnect = async ()=>{

    if(!signer){
      await initBySigner();
      await checkAccountDetails();
    }else{
      await initByProvider();
      dispatch(resetPeerDetails());
    }
}

const paths = [
  {path : "" , text : "Home"},
  {path : "purchase" , text : "Purchase"},
  {path : "/stack", text : "Stack"},
  {path : "/unstack", text : "UnStack"},
  {path : "/transfer", text : "Transfer"},
  {path : "/account", text : "My Account"},
]

return (
  <div className="relative w-full bg-white">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
      <NavLink to={"/"} className="inline-flex items-center space-x-2">
        <span className='overflow-hidden w-10'>
          <img src="https://img.freepik.com/free-vector/flat-design-crypto-mining-logo-template_23-2149409054.jpg?t=st=1698559799~exp=1698560399~hmac=02efc8967937811259bbfea12251e2ebe0e0d7762de1bfd029b10bf6577ef238" alt="this application logo" />
        </span>
        <span className="font-bold">DeBank</span>
      </NavLink>

      <div className="lg:block hidden">
        <ul className="inline-flex space-x-8">


          {paths.map((item , id)=>{
            return <li key={id}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `text-sm font-semibold  ${isActive ? "text-blue-700" : "text-gray-800"} hover:text-blue-900`}
            >
              {item.text  }
            </NavLink>
          </li>
          })}
          
        </ul>
      </div>

      <div className=" lg:block flex gap-3">
        <div className=' flex justify-between items-center gap-3'>
          <button
            onClick={async () => { await handleConnect() }}
            type="button"
            className={`rounded-md order-2 border-2 border-black  ${`${signer ? "text-black bg-white" : "bg-black text-white"}`} px-2 py-1 text-sm font-semibold shadow-sm hover:bg-black hover:text-white ease-in-out duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
          >
            {signer ? "Log out" : "connect wallet"}
          </button>
          <p className='order-1 text-sm font-sans font-bold hidden lg:block'>{signer ? `${[...signer.address].slice(0, 5).join("")}...${[...signer.address].slice(37, 42).join("")}` : "" }</p>
        </div>

        <button className="lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6 cursor-pointer"
        >
          <line x1="4" y1="12" x2="20" y2="12"></line>
          <line x1="4" y1="6" x2="20" y2="6"></line>
          <line x1="4" y1="18" x2="20" y2="18"></line>
        </svg>
      </button>
      </div>

      
    </div>
  </div>

)
}

export default Navbar