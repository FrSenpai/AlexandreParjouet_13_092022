import { Link, useLocation, useParams, useRoutes } from "react-router-dom"
import logoIcon from "../../assets/img/argentBankLogo.png"
export function Navigation() {
    const pathname: string = useLocation().pathname
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
                <Link hidden={pathname !== "/user"} className="main-nav-item" to="signOut">
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                </Link>
            </div>
        </nav>
    )
}

