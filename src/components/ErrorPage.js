import React from 'react';
import './ErrorPage.css';

const ErrorPage = (props) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-code">{props.status}</h1>
        <p className="error-message">{props.message}</p>
      </div>
    </div>
  );
};

export default ErrorPage;