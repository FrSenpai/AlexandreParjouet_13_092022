import { DateTime } from "luxon"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {  useSWRConfig } from "swr"
import { updateUserProfile, useUserProfile } from "../../services/UsersService"
import "./user.css"
export function User() {
    //handling unlogged users and redirect them
    //TODO better handling of unlogged users
    const navigate = useNavigate()
    useEffect(() => {
        if (user.token === null || !(DateTime.now().toMillis() < user.expiresAt)) {
            console.log("redirect")
            
            navigate("/")
            return
        }
    }, [])
    const accounts = [{ title: "Argent Bank Checking (x8349)", amount: "$2,082.79", description: "Available Balance" }, { title: "Argent Bank Savings (x6712)", amount: "$10,928.42", description: "Available Balance" }, { title: "Argent Bank Credit Card (x8349)", amount: "$184.30", description: "Current Balance" }]
    
    const user = useSelector((state: any) => state.user)
    // -- Get and handling potential errors of profile data --
    const userProfile = useUserProfile()
    const [editMode, setEditMode] = useState(false)
    const { mutate } = useSWRConfig()
    const [form, setForm] = useState({ firstName: "", lastName: "" })
    const [formError, setFormError] = useState("")
    if (userProfile.isError) return <div>failed to load</div>
    if (userProfile.isLoading) return <div>loading...</div>
    return (
        <main className="main bg-dark">
            <div className="header">
                <h1 style={{ marginTop: 0, paddingTop: "0.67em" }}>Welcome back<br /><span hidden={editMode}>{userProfile.data.body.firstName} {userProfile.data.body.lastName}!</span></h1>
                <div className="ctnInput">
                    <input className="editProfileNameInput" onChange={(e) => setForm({ ...form, firstName: e.currentTarget.value })} hidden={!editMode} type="text" placeholder="First name" defaultValue={userProfile.data.body.firstName} />
                    <input className="editProfileNameInput" onChange={(e) => setForm({ ...form, lastName: e.currentTarget.value })} hidden={!editMode} type="text" placeholder="Last name" defaultValue={userProfile.data.body.lastName} />
                </div>
                <span className="formError" hidden={formError===""}>{formError}</span>
                <div className="ctnInput">
                    <button onClick={async () => {
                        if (editMode) {
                            if (!isFormValid(form.firstName, form.lastName)) {
                                setFormError("First name and last name must have at least 2 characters")
                                return
                            }
                            setFormError("")
                            const updatedUser = await updateUserProfile(form.firstName, form.lastName)
                            if (updatedUser.body) {
                                mutate('http://localhost:3001/api/v1/user/profile')
                                setEditMode(false)
                            } else {
                                setFormError("Error while updating profile")
                            }
                        } else {
                            setEditMode(true)
                        }
                    }} className={editMode ? "edit-button editBtnMode" : "edit-button"}>{editMode ? "Save" : "Edit Name"}</button>
                    <button hidden={!editMode} onClick={() => {
                        //CANCEL
                        setForm({ firstName: userProfile.data.body.firstName, lastName: userProfile.data.body.lastName })
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
function isFormValid(firstName: string, lastName: string):boolean {
    return firstName.length > 1 && lastName.length > 1
}