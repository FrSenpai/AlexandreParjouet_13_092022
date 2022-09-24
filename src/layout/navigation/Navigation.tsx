import React from "react";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import { Error } from "../../pages/error/Error";
import { Home } from "../../pages/home/Home";
import { SignIn } from "../../pages/signIn/SignIn";
import { User } from "../../pages/user/User";
export function Navigation() {
    return (
        
        <Routes>
            <Route path="/" element={<Home  />} />
            <Route path="login" element={<SignIn  />} />
            <Route path="user" element={<User  />} />
            {/* <Route path="profile"  >
                <Route path="/profile" element={<Error />} />
                <Route path=":id" element={<Profile />} />
            </Route>
            <Route path="error" element={<Error />}></Route> */}
            <Route path="*" element={<Error />}></Route>
        </Routes>
    )

}