import React, { useState } from 'react';
import * as VscIcons from 'react-icons/vsc';
import * as FaIcons from 'react-icons/fa';

const ValueCard = (props) => {
    const [growth, setgrowth] = useState(false);
  return (
    <div className='w-full rounded-md overflow-hidden border-gray-300 border-2'>
    <div className='p-5'>
    {/* <div className='flex mb-3'><div className='border-2 rounded-md  p-2 text-2xl shadow'><VscIcons.VscOutput /></div></div> */}
    <div className='text-lg text-slate-400'>{props.title}</div>
    <div className='text-2xl text-slate-700 font-semibold'>{props.titleValue}</div>
    </div>
    {props.children}
    <div className='bg-gray-200 px-5 py-3 flex justify-between border-t-2 border-gray-300 text-slate-500'>
        <div className='flex items-center gap-1'>{growth ? <FaIcons.FaArrowDown /> : <FaIcons.FaArrowUp /> } {props.growth}</div>
        <div>{props.period}</div>
    </div>
      
    </div>
  );
}

export default ValueCard;
