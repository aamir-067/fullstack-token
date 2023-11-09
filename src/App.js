import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { initByProvider, checkIsPreSale,checkTokenSupply } from "./utils";
import React from "react";
function App() {

	React.useEffect(() => {
		const initWeb3 = async () => {
			await initByProvider();
			await checkIsPreSale();
			await checkTokenSupply();
		}
		initWeb3();
	}, []);


	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
