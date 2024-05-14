import DropdownItem from "../DropdownItem/DropdownItem";
import styles from "./DropdownContent.module.css";

export default function DropdownContent({ options, visible, onOptionClicked}){

    return(
        <div className={`${styles.contentContainer} ${visible? styles.contentContainerOpen : null}`}>
            {options.map((item) => (
                <p onClick={() => onOptionClicked(item)} className={styles.option} key={item}>
                    <DropdownItem option={item}/>
                </p>
            ))}
        </div>
    )
}