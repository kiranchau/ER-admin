import React from "react";
import "../SCSS/popups.scss";

const Checkbox = ({ label, id, error, ...props }) => {
  return (
    <>
      <div style={{ display: "grid" }}>
        <label htmlFor={id}>
        <input
          type="checkbox" // Change input type to checkbox
          id={id}
          {...props}
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: "5px",
            padding: "5px",
          }}
        />{" "}{label}</label>
      </div>
      <p className="text-danger" style={{ color: 'red' }}>{error}</p>
    </>
  );
};

export default Checkbox;
