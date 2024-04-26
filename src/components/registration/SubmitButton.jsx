// SubmitButton.js
import React from 'react';
import './SubmitButton.css'; // Make sure to import the CSS

function SubmitButton({ text, onClick }) {
  return (
    <button className="submit-button" onClick={onClick}>
      {text}
    </button>
  );
}

export default SubmitButton;
