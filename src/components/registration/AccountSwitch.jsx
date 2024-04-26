import React from 'react';
import './AccountSwitch.css';

function AccountSwitch({ text, linkText, linkHref }) {
  return (
    <div className="account-switch">
      <span>{text}</span>
      <a href={linkHref} className="login-link">{linkText}</a>
    </div>
  );
}

export default AccountSwitch;