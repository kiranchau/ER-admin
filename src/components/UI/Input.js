import React from "react";
import "../SCSS/popups.scss";

const Input = ({
  label,
  id,
  type,
  name,
  error,
  className,
  showPassword,
  access,
  maxLength,
  ...props
}) => {
  // Function to allow only numeric input
  const handleNumericKeyPress = (event) => {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  // Function to allow only text input
  const handleTextKeyPress = (event) => {
    const charCode = event.charCode;
    if (
      (charCode < 65 || charCode > 90) && // Uppercase letters
      (charCode < 97 || charCode > 122) && // Lowercase letters
      charCode !== 32 // Space character
    ) {
      event.preventDefault();
    }
  };

  // Function to allow specific characters for password input
  const handlePasswordKeyPress = (event) => {
    const charCode = event.charCode;
    const char = String.fromCharCode(charCode);
    const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;

    if (!regex.test(char)) {
      event.preventDefault();
    }
  };

  const handleKeyPress = (event) => {
    if(access === true){
      if (type === "number") {
        handleNumericKeyPress(event);
      } else if (type === "text") {
        handleTextKeyPress(event);
      }
    }
    if (access === false){
      handlePasswordKeyPress(event);
    }    
  };

   // Function to handle input change and enforce max length
   const handleChange = (event) => {
    const { value } = event.target;
    if (maxLength && value.length > maxLength) {
      event.target.value = value.slice(0, maxLength);
    }
    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <div className="input-container">
      <div className="grid text-left">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          name={name}
          maxLength={maxLength}
          {...props}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          placeholder={label}
          className={`${className} ${type === "number" ? "no-spinners" : ""}`}
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: "5px",
            padding: "5px",
          }}
        />
      </div>
      {error && (
        <p className="text-danger" style={{ color: "red" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
