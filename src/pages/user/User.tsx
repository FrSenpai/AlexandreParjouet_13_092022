import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useSWR from "swr"
import { useUserProfile } from "../../services/UsersService"
import { get, post } from "../../utils/http-methods"
import "./user.css"
export function User() {
    useEffect(() => {
        if (user.token === null) {
            navigate("/")
            return
        }
    }, [])
    const accounts = [{ title: "Argent Bank Checking (x8349)", amount: "$2,082.79", description: "Available Balance" }, { title: "Argent Bank Savings (x6712)", amount: "$10,928.42", description: "Available Balance" }, { title: "Argent Bank Credit Card (x8349)", amount: "$184.30", description: "Current Balance" }]
    const navigate = useNavigate()
    const user = useSelector((state: any) => state.user)
    //Get and handling potential errors of profile data
    const userProfile = useUserProfile()
    const [editMode, setEditMode] = useState(false)
    console.log(userProfile)
    const [form, setForm] = useState({ firstName: "", lastName: "" })
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
                <div className="ctnInput">
                    <button onClick={() => {
                        if (editMode) {
                            //TODO: save data to db
                            setEditMode(false)
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