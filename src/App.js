import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { initByProvider } from "./utils";
import React from "react";
function App() {

	React.useEffect(()=>{
		const initWeb3 = async ()=> await initByProvider();
		// initWeb3();  // remove comment only when you deploy the contract.
	},[]);


	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
