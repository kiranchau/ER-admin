import React from 'react';

const ErrorPopup = (props) => {
  return (
    <section className='quickpopup d-flex justify-content-center align-items-center'>
          <div className='quickpopupDesign p-5 rounded'>
          <h3> {props.title}</h3>
          <br></br>
            <button className='OkBtn rounded' onClick={props.onClick}> ok </button>
            </div>
          </section>
  );
}

export default ErrorPopup;
