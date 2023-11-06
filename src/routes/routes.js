import {Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom"
import { Home, Error, Stack, UnStack, Transfer, MyAccount , Purchase} from "../components";
import App from "../App";
export const routes = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<App/>}>
        <Route path="" element={<Home/>}/>
        <Route path="/stack" element={<Stack/>}/>
        <Route path="/unstack" element={<UnStack/>}/>
        <Route path="/transfer" element={<Transfer/>}/>
        <Route path="/purchase" element={<Purchase/>}/>
        <Route path="/account" element={<MyAccount/>}/>
        <Route path="*" element={<Error/>}/>
    </Route>
))