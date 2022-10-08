import { IReadAccount } from "../../../models/Accounts"
import PropTypes from 'prop-types'; 
/**
 * 
 * @param index {Number} - Index of the account to handle react keys
 * @param account {IReadAccount} - Account details to display
 * @returns HTML code for a bank account details
 */
export function BankAccount({ index, account}: { index: number, account: IReadAccount}) {
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
}

BankAccount.propsType = {
    index: PropTypes.number.isRequired,
    account: PropTypes.object.isRequired
}