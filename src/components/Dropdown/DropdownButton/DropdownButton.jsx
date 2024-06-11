import styles from "./DropdownButton.module.css";

const ArrowDown = ({ color }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        height="24" 
        viewBox="0 -960 960 960" 
        width="24"
        fill={color}
    >
        <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/>
    </svg>
)

const ArrowUp = ({ color }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        height="24" 
        viewBox="0 -960 960 960" 
        width="24"
        fill={color}
    >
        <path d="m296-345-56-56 240-240 240 240-56 56-184-184-184 184Z"/>
    </svg>
)

export default function DropdownButton({ toggle, label, visible }){
    return (
        <div 
            onClick={toggle} 
            className={`${styles.dropdownBtn} ${visible? styles.dropdownBtnOpen : null}`}
        >
            <p>
                {label}
            </p>
            <span style={{marginLeft: "0.5rem"}}>
                {visible? <ArrowUp color={"#FFFFFF"} /> : <ArrowDown color={"#FFFFFF"} />}
            </span>
        </div>
    )
}