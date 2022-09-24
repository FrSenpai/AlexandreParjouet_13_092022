import React from "react";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Home } from "../../pages/home/Home";
export function Navigation() {
    return (
        
        <Routes>
            <Route path="/" element={<Home  />} />
            {/* <Route path="profile"  >
                <Route path="/profile" element={<Error />} />
                <Route path=":id" element={<Profile />} />
            </Route>
            <Route path="error" element={<Error />}></Route>
            <Route path="*" element={<Error />}></Route> */}
        </Routes>
    )

        // <nav className="main-nav" >
        //     <a className="main-nav-logo" href="./index.html" >
        //         <img
        //             className="main-nav-logo-image"
        //             src="./img/argentBankLogo.png"
        //             alt="Argent Bank Logo"
        //         />
        //         <h1 className="sr-only">Argent Bank</h1>
        //     </a>
        //     <div>
        //         <a className="main-nav-item" href="./sign-in.html" >
        //             <i className="fa fa-user-circle" > </i>
        //             Sign In
        //         </a>
        //     </div>
        // </nav>

}