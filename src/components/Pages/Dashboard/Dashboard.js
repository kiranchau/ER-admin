import React from 'react';
import ValueCard from './ValueCard';
import DashCust from './DashCust';
import DashServ from './DashServ';

const Dashboard = () => {
  return (
    <>
      <div className='flex justify-between gap-8 sm:flex-row md:flex-row flex-col sm:flex-nowrap md:flex-nowrap flex-wrap'>
        <ValueCard title="Total Value" titleValue="$34,44,876" growth="15%" period="From Latest Period" />
        <ValueCard title="Total Sale" titleValue="$54,44,876" growth="13%" period="From 1 Week Period" />
        <ValueCard title="Total Average Sale" titleValue="$4,44,876" growth="11%" period="From 1 Month Period" />
      </div>
      <div className='flex justify-between gap-8 sm:flex-row md:flex-row flex-col sm:flex-nowrap md:flex-nowrap flex-wrap pt-5'>
        <DashCust />
        <DashServ />
      </div>
    </>
  );
};

export default Dashboard;
