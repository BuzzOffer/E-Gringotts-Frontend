import { useState } from 'react';
import DropdownButton from "./DropdownButton/DropdownButton";
import DropdownContent from "./DropdownContent/DropdownContent";
import styles from "./Dropdown.module.css";

export default function Dropdown({ label, options, onOptionClicked }){
    const [visible, setVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(label)

    function handleOptionClick (item) {
        onOptionClicked(item);
        toggleDropdown();
    }

    function toggleDropdown() {
        setVisible(!visible);
    }

    return(
        <div className={styles.dropdownContainer}>
            <DropdownButton toggle={toggleDropdown} label={label} visible={visible}/>
            <DropdownContent options={options} visible={visible} onOptionClicked={handleOptionClick}/>
        </div>
    )
}