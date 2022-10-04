import { DateTime } from "luxon";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import { Error } from "../../pages/error/Error";
import { Home } from "../../pages/home/Home";
import { SignIn } from "../../pages/signIn/SignIn";
import { User } from "../../pages/user/User";
import { removeUser, setUser } from "../../store/reducers/user/UserReducer";
export function Navigation() {
    //handling user loggin state
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.user)
    useEffect(() => {
        if (user.auth.token === null || !(DateTime.now().toMillis() < user.auth.expiresAt)) {
            dispatch(removeUser())
        }
    }, [])
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<SignIn />} />
            <Route path="profile" element={<User />} />
            {/* <Route path="profile"  >
                <Route path="/profile" element={<Error />} />
                <Route path=":id" element={<Profile />} />
            </Route>
            <Route path="error" element={<Error />}></Route> */}
            <Route path="*" element={<Error />}></Route>
        </Routes>
    )

}