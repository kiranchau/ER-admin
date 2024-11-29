import React from 'react';

const BgCover = (props) => {
  return (
    <div className={`${'bgCover'} ${props.className}`}>
      {props.children}
    </div>
  );
}

export default BgCover; 
