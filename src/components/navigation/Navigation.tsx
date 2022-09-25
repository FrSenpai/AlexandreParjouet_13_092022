import { Link, useLocation } from "react-router-dom"
import logoIcon from "../../assets/img/argentBankLogo.png"
import { useDispatch } from 'react-redux'
import { removeUser } from "../../store/reducers/user/UserReducer"
import store from "../../store/store"
export function Navigation() {
    const pathname: string = useLocation().pathname
    const dispatch = useDispatch()
    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={logoIcon}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                <Link hidden={pathname !== "/" && pathname !== "/login"} className="main-nav-item" to="login">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>
                {/* TODO: Handle redux user */}
                <Link hidden={pathname !== "/user"} className="main-nav-item" to="user">
                    <i className="fa fa-user-circle"></i>
                    Tony
                </Link>
                <Link onClick={() => {
                    dispatch(removeUser())
                    console.log(store.getState().user)
                    }} hidden={pathname !== "/user"} className="main-nav-item" to="/">
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                </Link>
            </div>
        </nav>
    )
}

