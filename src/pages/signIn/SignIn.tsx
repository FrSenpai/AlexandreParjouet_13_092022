import { useState } from "react";
import { login } from "../../services/UsersService";
import "./signIn.css";
import { useDispatch } from 'react-redux'
import { setUser } from "../../store/reducers/user/UserReducer";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import store from "../../store/store";
export function SignIn() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({email:"", password:""});
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log(store.getState().user)
    if (store.getState().user.token !== null) {
        navigate("/user")
    }
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <div hidden={!loading} className="lds-ring"><div></div><div></div><div></div><div></div></div>
                <form hidden={loading} action="" method="">
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input onKeyUp={(e) => setForm({...form,email: e.currentTarget.value})} type="text" id="username" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input onKeyUp={(e) => setForm({...form,password: e.currentTarget.value})} type="password" id="password" />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" /><label htmlFor="remember-me"
                        >Remember me</label>
                    </div>
                    <p className="errorSignIn" hidden={error === ""}>{error}</p>
                    <button onClick={async () => {
                        console.log(form)
                        if (isFormValid(form).valid) {
                            setLoading(true);
                            const user = await login(form.email, form.password);
                            console.log(user)
                            setLoading(false)
                            if (user?.body) {
                                dispatch(setUser({token: user.body.token, expiresAt:DateTime.now().plus({days: 1}).toMillis()}))
                                navigate("/user")
                            } else {
                                setError(user?.message)
                            }
                        } else {
                            setError(isFormValid(form).error);
                        }
                    }} type="button" className="sign-in-button">Sign In</button>
                    {/* <a href="./user.html" class="sign-in-button">Sign In</a> */}
                </form>
            </section>
        </main>

    )
}
interface Form {
    email: string;
    password:string;
}
interface FormInfo {
    valid: boolean;
    error:string;
}
function isFormValid(form:Form):FormInfo {
    let formInfo : FormInfo = {
        valid:true,
        error: ""
    }
    if (!isEmailValid(form.email)) {
        formInfo.valid = false;
        formInfo.error = "Email is not valid";
    }
    if (!isPasswordValid(form.password)) {
        formInfo.valid = false;
        formInfo.error = "Password can't be less than 6 characters";
    }
    return formInfo
}

function isEmailValid(email: string) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regex.test(email)
  }

  function isPasswordValid(password: string) { 
    return password.length >= 6
  }