import React from 'react';
import './TextInput.css'; // Importing CSS specific to TextInput

function TextInput({ label, type, placeholder, name, value, onChange, className = 'text-input', required = true }) {
  return (
    <div className={className}>
      <label className="label">{label}</label>
      <input
        className="input"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required} // Add the required attribute based on the prop
      />
    </div>
  );
}

export default TextInput;