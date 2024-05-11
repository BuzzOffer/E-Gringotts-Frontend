import { useState } from 'react';
import DropdownButton from "./DropdownButton/DropdownButton";
import DropdownContent from "./DropdownContent/DropdownContent";
import styles from "./Dropdown.module.css";

export default function Dropdown({ label, options }){
    const [visible, setVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(label)

    function toggleDropdown() {
        setVisible(!visible);
    }

    return(
        <div className={styles.dropdownContainer}>
            <DropdownButton toggle={toggleDropdown} label={selectedOption} visible={visible}/>
            <DropdownContent options={options} visible={visible} setSelectedOption={setSelectedOption} toggle={toggleDropdown}/>
        </div>
    )
}