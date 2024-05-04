import { useState } from 'react';
import DropdownButton from "./DropdownButton/DropdownButton";
import DropdownContent from "./DropdownContent/DropdownContent";

export default function Dropdown({ label, options }){
    const [visible, setVisible] = useState(false);

    function toggleDropdown() {
        setVisible(!visible);
    }

    return(
        <div>
            <DropdownButton toggle={toggleDropdown} label={label} visible={visible}/>
            <DropdownContent options={options} visible={visible}/>
        </div>
    )
}