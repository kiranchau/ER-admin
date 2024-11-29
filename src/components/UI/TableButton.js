import React from 'react';

const TableButton = (props) => {
  return (
    <button 
    className={`${'tableBtn'} ${props.className}`} 
    type={props.type}
    onClick={props.onClick}
    >
        {props.children}
    </button>
  );
}

export default TableButton;
