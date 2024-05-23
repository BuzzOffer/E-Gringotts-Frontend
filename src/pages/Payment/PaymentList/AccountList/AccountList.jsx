import styles from "./AccountList.module.css";

export default function AccountList({ data, onRecipientClicked }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Account Number</th>
                </tr>
            </thead>

            <tbody>
                {data.map(({account}) => {
                    
                    const { myUser: { name, phoneNumber, id: accNum } } = account;
                    
                    return (
                        <tr key={accNum}>
                            <td>{name}</td>
                            <td>{phoneNumber}</td>
                            <td>{accNum}</td>
                            <td>
                                <button className={styles.transferBtn} onClick={() => onRecipientClicked(accNum)}>Transfer</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};