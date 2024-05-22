import styles from "./AccountList.module.css";

export default function AccountList({ data }) {
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
                {data.map(({id, account}) => {
                    
                    const { accId } = id;
                    const { myUser: { name, phoneNumber, id: accNum } } = account;
                    
                    return (
                        <tr key={accId}>
                            <td>{name}</td>
                            <td>{phoneNumber}</td>
                            <td>{accNum}</td>
                            <td>
                                <button className={styles.transferBtn}>Transfer</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};