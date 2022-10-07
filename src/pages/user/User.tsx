import { DateTime } from "luxon"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserProfile, updateUserProfile } from "../../services/UsersService"
import { setUser } from "../../store/reducers/user/UserReducer"
import "./user.css"
export function User() {
    const navigate = useNavigate()
    const user = useSelector((state: any) => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        //handling unlogged users and redirect them
        if (user.auth.token === null || !(DateTime.now().toMillis() < user.auth.expiresAt)) {
            navigate("/")
            return
        }
        // -- Get and handling potential errors of profile data --
        getUserProfile().then((profile) => {
            if (profile.status === 200) {
                dispatch(setUser({ ...user, profile: profile.body }))
                setForm({...form,data: {firstName: profile.body.firstName, lastName: profile.body.lastName} })
            }
        })

    }, [])
    const accounts = [{ title: "Argent Bank Checking (x8349)", amount: "$2,082.79", description: "Available Balance" }, { title: "Argent Bank Savings (x6712)", amount: "$10,928.42", description: "Available Balance" }, { title: "Argent Bank Credit Card (x8349)", amount: "$184.30", description: "Current Balance" }]
    const [editMode, setEditMode] = useState(false)
    const [form, setForm] = useState({data: {firstName: "", lastName: ""}, error:"", loading:false })
    if (!user?.profile) return <div>failed to load</div>
    return (
        <main className="main bg-dark">
            <div className="header">
                <h1 style={{ marginTop: 0, paddingTop: "0.67em" }}>Welcome back<br /><span hidden={editMode}>{user.profile.firstName} {user.profile.lastName}!</span></h1>
                <div>
                    <input className="editProfileNameInput" onChange={(e) => setForm({ ...form, data: {...form.data,firstName: e.currentTarget.value} })} hidden={!editMode} type="text" placeholder="First name" value={form.data.firstName} />
                    <input className="editProfileNameInput" onChange={(e) => setForm({ ...form, data: {...form.data,lastName: e.currentTarget.value} })} hidden={!editMode} type="text" placeholder="Last name" value={form.data.lastName} />
                </div>
                <span className={form.error === "" ? "formError disabled" : "formError"} hidden={form.error === ""}>{form.error}</span>
                <div className="ctnInput">
                    <button onClick={async () => {
                        if (editMode) {
                            
                            if (!isFormValid(form.data.firstName, form.data.lastName)) {
                                setForm({ ...form, loading: false, error: "First name and last name must have at least 2 characters" })
                                return
                            }
                            setForm({ ...form, error: "" })
                            const updatedUser = await updateUserProfile(form.data.firstName, form.data.lastName)
                            if (updatedUser.body) {
                                setForm({ ...form, loading: true })
                                dispatch(setUser({ ...user, profile: updatedUser.body }))
                                setEditMode(false)
                            } else {
                                setForm({ ...form, loading: false, error: "Error while updating profile" })
                            }
                        } else {
                            setForm({ ...form, data:{firstName: user.profile.firstName, lastName: user.profile.lastName} })
                            setEditMode(true)
                            
                        }
                    }} className={editMode ? "edit-button editBtnMode" : "edit-button"}>{editMode ? "Save" : "Edit Name"}</button>
                    <button hidden={!editMode} onClick={() => {
                        //CANCEL
                        setForm({ ...form, data: {firstName: user.profile.firstName, lastName: user.profile.lastName }, error: "" })
                        setEditMode(false)
                    }} className="edit-button editBtnMode">Cancel</button>
                </div>

            </div>
            <h2 className="sr-only">Accounts</h2>
            {accounts.map((account, index: number) => {
                return (
                    <section key={"acc" + index} className="account">
                        <div className="account-content-wrapper">
                            <h3 className="account-title">{account.title}</h3>
                            <p className="account-amount">{account.amount}</p>
                            <p className="account-amount-description">{account.description}</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                )
            })}
        </main>
    )
}
/**
 * 
 * @param firstName {String} - First name of the user
 * @param lastName {String} - Last name of the user
 * @returns boolean - true if the form is valid, false otherwise
 */
function isFormValid(firstName: string, lastName: string): boolean {
    return firstName.length > 1 && lastName.length > 1
}