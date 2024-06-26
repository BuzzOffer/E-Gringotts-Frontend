import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const features = [
    {filepath: "/transaction", d: "M240-120q-33.846 0-56.923-23.077Q160-166.154 160-199.638V-280h120v-544.616l50.769 35.385 52.308-35.385 52.308 35.385 52.307-35.385L540-789.231l52.308-35.385 52.307 35.385 52.308-35.385 52.308 35.385L800-824.616V-200q0 33.846-23.077 56.923Q753.846-120 720-120H240Zm480-40q17 0 28.5-11.5T760-200v-560H320v480h360v80q0 17 11.5 28.5T720-160ZM375.385-620v-40h213.846v40H375.385Zm0 120v-40h213.846v40H375.385Zm300-109.231q-12.385 0-21.577-9.192-9.193-9.192-9.193-21.577 0-12.385 9.193-21.577 9.192-9.192 21.577-9.192 12.384 0 21.577 9.192 9.192 9.192 9.192 21.577 0 12.385-9.192 21.577-9.193 9.192-21.577 9.192Zm0 120q-12.385 0-21.577-9.192-9.193-9.192-9.193-21.577 0-12.385 9.193-21.577 9.192-9.192 21.577-9.192 12.384 0 21.577 9.192 9.192 9.192 9.192 21.577 0 12.385-9.192 21.577-9.193 9.192-21.577 9.192ZM240-160h400v-80H200v40q0 17 11.5 28.5T240-160Zm-40 0v-80 80Z", label: "View Transactions"},
    {filepath: "/payment/new-transfer", d: "M540-463.077q-33.846 0-56.923-23.077Q460-509.231 460-543.077q0-33.846 23.077-56.923 23.077-23.077 56.923-23.077 33.846 0 56.923 23.077Q620-576.923 620-543.077q0 33.846-23.077 56.923-23.077 23.077-56.923 23.077ZM292.308-335.385q-26.654 0-45.635-18.98-18.981-18.981-18.981-45.635v-286.154q0-26.654 18.981-45.635 18.981-18.981 45.635-18.981h495.385q26.653 0 45.634 18.981t18.981 45.635V-400q0 26.654-18.981 45.635-18.981 18.98-45.634 18.98H292.308Zm40-40h415.384q0-26.846 18.981-45.731Q785.654-440 812.308-440v-206.154q-26.846 0-45.731-18.981-18.885-18.98-18.885-45.634H332.308q0 26.846-18.981 45.731-18.981 18.884-45.635 18.884V-440q26.847 0 45.731 18.981 18.885 18.98 18.885 45.634Zm401.539 160.001h-561.54q-26.654 0-45.634-18.981-18.981-18.981-18.981-45.635v-352.308h40V-280q0 9.231 7.692 16.923 7.693 7.692 16.923 7.692h561.54v40.001ZM292.308-375.385h-24.616v-335.384h24.616q-10 0-17.308 7.307-7.308 7.308-7.308 17.308V-400q0 10 7.308 17.308 7.308 7.307 17.308 7.307Z", label: "New Transaction"},
    {filepath: "/statistics", d: "M640-200v-192.308h120V-200H640Zm-220 0v-560h120v560H420Zm-220 0v-367.693h120V-200H200Z", label: "Statistics"},
]

function Navbuttons() {
    const { user } = useAuth();
    const navigate = useNavigate();
    return (
        <div className="navButtons">
            {features.map((item) => (
                <button onClick={() => {
                    // navigate(item.filepath)
                    if(item.filepath === "/payment/new-transfer") {
                        navigate(item.filepath, { state: { account: "", userId: user.id } })
                    } else {
                        navigate(item.filepath);
                    }
                }} 
                
                    className="navbutton" key={item.label}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d={item.d}/>
                    </svg>
                    <h3 className="navLabel">{item.label}</h3>
                </button>
            ))}

        </div>
    );
}

export default Navbuttons;