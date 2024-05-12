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
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.phone_num}</td>
                        <td>{item.acc_num}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};