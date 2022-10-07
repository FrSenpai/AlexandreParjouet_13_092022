import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Routes,Route} from "react-router-dom";
import { Error } from "../../pages/error/Error";
import { Home } from "../../pages/home/Home";
import { SignIn } from "../../pages/signIn/SignIn";
import { User } from "../../pages/user/Profile";
import { isLogged } from "../../services/UsersService";
import { removeUser } from "../../store/reducers/user/UserReducer";
export function Navigation() {
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.user)
    //handling user loggin state
    useEffect(() => {
        if (!isLogged(user.auth.token, user.auth.expiresAt)) {
            dispatch(removeUser())
        }
    }, [])
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<SignIn />} />
            <Route path="profile" element={<User />} />
            <Route path="*" element={<Error />}></Route>
        </Routes>
    )

}