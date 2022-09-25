import { Link, useLocation } from "react-router-dom"
import logoIcon from "../../assets/img/argentBankLogo.png"
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from "../../store/reducers/user/UserReducer"
export function Navigation() {
    const dispatch = useDispatch()
    const user = useSelector((state:any) => state.user)
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
                <Link hidden={user.token !== null} className="main-nav-item" to="login">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </Link>
                <Link hidden={user.token === null} className="main-nav-item" to="user">
                    <i className="fa fa-user-circle"></i>
                    Tony
                </Link>
                <Link onClick={() => dispatch(removeUser())} hidden={user.token === null} className="main-nav-item" to="/">
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                </Link>
            </div>
        </nav>
    )
}

