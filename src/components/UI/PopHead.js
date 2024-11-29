import React from 'react';
import * as MdIcons from 'react-icons/md'

const PopHead = (props) => {
  return (
    <div className='bg-blue-600 rounded-t-lg py-2 px-4 text-white '>
      <div className='text-2xl'>{props.title}</div>
      <div
          className="absolute cursor-pointer top-[10px] right-[10px] text-sm border rounded-full w-[25px] h-[25px] flex items-center justify-center hover:bg-indigo-600 hover:text-white"
          type="button"
          onClick={props.onClick}
        >
          <MdIcons.MdOutlineClose />
        </div>
      {props.children}
    </div>
  );
}

export default PopHead;
