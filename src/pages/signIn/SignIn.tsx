import { useEffect, useState } from "react";
import { isLogged, login } from "../../services/UsersService";
import "./SignIn.css";
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from "../../store/reducers/user/UserReducer";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
export function SignIn() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({data:{ email: "", password: "" }, error:""});
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state: any) => state.user)
    /**
     * @description handle the form submit, will send the login data to the server and handle the response
     */
    const submitForm = async () => {
        if (isFormValid(form.data).valid) {
            setLoading(true);
            const userLogin = await login(form.data.email, form.data.password);
            setLoading(false)
            if (userLogin?.body) {
                dispatch(setUser({...user,auth:{ token: userLogin.body.token, expiresAt: DateTime.now().plus({ days: 1 }).toMillis()} }))
                navigate("/profile")
            } else {
                setForm({...form, error:userLogin?.message})
            }
        } else {
            setForm({...form, error:isFormValid(form.data).error})
        }
    }
    useEffect(() => {
        //handling user loggin state
        if (isLogged(user.auth.token, user.auth.expiresAt)) {
            navigate("/profile")
            return
        }
    }, [])
    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <div hidden={!loading} className="lds-ring"><div></div><div></div><div></div><div></div></div>
                <form hidden={loading} action="" method="">
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input onKeyUp={(e) => setForm({ ...form, data:{...form.data,email: e.currentTarget.value} })} type="text" id="username" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input onKeyUp={(e) => setForm({ ...form, data:{...form.data,password: e.currentTarget.value} })} type="password" id="password" />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" /><label htmlFor="remember-me"
                        >Remember me</label>
                    </div>
                    <p className="errorSignIn" hidden={form.error === ""}>{form.error}</p>
                    <button onClick={() =>submitForm()} type="button" className="sign-in-button">Sign In</button>
                </form>
            </section>
        </main>

    )
}

interface Form {
    email: string;
    password: string;
}
interface FormInfo {
    valid: boolean;
    error: string;
}
function isFormValid(form: Form): FormInfo {
    let formInfo: FormInfo = {
        valid: true,
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