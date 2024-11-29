import React from "react";
import "../SCSS/popups.scss";

const TextArea = ({ label, id, error, ...props }) => {
  return (
    <>
      <div className="grid text-left">
        <label htmlFor={id}>{label}</label>
        <textarea
          id={id}
          {...props}
          placeholder={label}
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: "5px",
            padding: "5px",
            marginTop: "0px",
            width:"25vw",
          }}
        />
      </div>
      <p className="text-danger" style={{ color: 'red' }}>{error}</p>
    </>
  );
};

export default TextArea;
