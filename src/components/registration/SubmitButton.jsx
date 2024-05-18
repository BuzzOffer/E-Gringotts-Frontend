import React from 'react';
import './SubmitButton.css'; // Make sure to import the CSS

function SubmitButton({ text, onClick, position = 'full' }) {
  return (
    <button className={`submit-button ${position}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default SubmitButton;