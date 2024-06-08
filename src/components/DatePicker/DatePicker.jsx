import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import styles from "./DatePicker.module.css";

export default function DatePicker({ range, setRange }) {
    return (
        <DayPicker 
            mode="range" 
            selected={range} 
            onSelect={setRange} 
        />
    );
}