// FormTitle.js
import React from 'react';
import './FormTitle.css'; // Importing CSS specific to FormTitle

function FormTitle({ text }) {
  return (
    <div>
    <h2 className="form-title">{text}</h2>
    </div>
  );
}

export default FormTitle;
