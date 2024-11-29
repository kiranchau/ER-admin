import React, { useState } from 'react'
import CommonGrid from '../../CommonGrid/CommonGrid';
import BgCover from '../../UI/BgCover';
import Button from '../../UI/Button';

const Services = () => {
  const [headings] = useState([
    { Name: "No", id: 1 },
    { Name: "Services Name", id: 2 },
    { Name: "Customer Name", id: 3 },
    { Name: "Contact", id: 4 },
    { Name: "Status", id: 5 },
    { Name: "Services", id: 6 },
  ]);

  const [data, setData] = useState([
    {
      "No": 1,
      "Services Name": "Services Name",
      "Customer Name": "Kiran Chaudhari",
      "Contact": 7020888369,
      "Status": "In Progress",
      "Services": 12,
    },
    {
      "No": 2,
      "Services Name": "Services Name",
      "Customer Name": "Manoj Shirke",
      "Contact": 7020888369,
      "Status": "In Progress",
      "Services": 15,
    },
    {
      "No": 3,
      "Services Name": "Services Name",
      "Customer Name": "Rajesh Satpute",
      "Contact": 7020888369,
      "Status": "In Progress",
      "Services": 23,
    },
    {
      "No": 4,
      "Services Name": "Services Name",
      "Customer Name": "Indranil Rathod",
      "Contact": 7020888369,
      "Status": "In Progress",
      "Services": 9,
    },
  ]);
  return (
    <div className='PageContent'>
    <div className='flex justify-between py-2 items-center'>
    <div className='PageTitle'>Services</div>
    <Button>+ Add Services</Button>
    </div>
    <BgCover>
    <CommonGrid
        rewardsData={data}
        headings={headings}
        tableName={"Services List"}
      />
    </BgCover>
    </div>
   
  );
};

export default Services