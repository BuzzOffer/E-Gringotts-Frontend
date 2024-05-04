import DropdownItem from "../DropdownItem/DropdownItem";
import styles from "./DropdownContent.module.css";

export default function DropdownContent({ options, visible }){
    return(
        <div className={`${styles.contentContainer} ${visible? styles.contentContainerOpen : null}`}>
            {options.map((item) => (
                <p className={styles.option} key={item}>
                    <DropdownItem option={item}/>
                </p>
            ))}
        </div>
    )
}