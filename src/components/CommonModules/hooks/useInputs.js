import React, { useState } from 'react';

const useInputs = (defaultValue, validationFn) => {
const [enteredValue, setEnteredValue] = useState(defaultValue);
const [didEdit, setDidEdit] = useState(false);

const valueIsValid = validationFn(enteredValue);

function handleInputChange(event){
    setEnteredValue(event.target.value);
    setDidEdit(false);
}

function handleInputBlur(event){
    setDidEdit(true);
}

  return {
    value: enteredValue,
    handleInputBlur,
    handleInputChange,
    hasError: didEdit && !valueIsValid
  }
}

export default useInputs;
