import React from 'react';
import './SubmitButton.css'; // Make sure to import the CSS

function SubmitButton({ text, onClick, position = 'full', type }) {
  return (
    <button className={`submit-button ${position}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
}

export default SubmitButton;