// FormTitle.js
import React from 'react';
import './FormTitle.css'; // Importing CSS specific to FormTitle

function FormTitle({ text, align = 'center'}) {
  const cssClass = align === 'center' ? 'form-title-center' : align === 'left' ? 'form-title-left' : 'form-title-right';
  return (
    <div>
    <h2 className={cssClass}>{text}</h2>
    </div>
  );
}

export default FormTitle;
