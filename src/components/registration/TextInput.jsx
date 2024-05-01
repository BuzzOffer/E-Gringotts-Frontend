// TextInput.js
import React from 'react';
import './TextInput.css'; // Importing CSS specific to TextInput

function TextInput({ label, type, placeholder, name, value, onChange }) {
  return (
    <div className="text-input">
      <label className="label">{label}</label>
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextInput;