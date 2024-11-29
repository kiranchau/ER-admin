import React, { useState } from 'react'
import CommonGrid from '../../CommonGrid/CommonGrid';
import BgCover from '../../UI/BgCover';
import Button from '../../UI/Button';

const Reports = () => {
  const [headings] = useState([
    { Name: "No", id: 1 },
    { Name: "Report Name", id: 2 },
    { Name: "Customer Name", id: 3 },
    { Name: "Contact", id: 4 },
    { Name: "Status", id: 5 },
    { Name: "Generate", id: 6 },
  ]);

  const [data, setData] = useState([
    {
      "No": 1,
      "Report Name": "Report Name",
      "Customer Name": "Kiran Chaudhari",
      "Contact": 7020888369,
      "Status": "In Progress",
      "Generate": "5th/May/2023",
    },
    {
      "No": 2,
      "Report Name": "Report Name",
      "Customer Name": "Manoj Shirke",
      "Contact": 7020888369,
      "Status": "In Progress",
      "Generate": "5th/May/2023",
    },
    {
      "No": 3,
      "Report Name": "Report Name",
      "Customer Name": "Indranil Rathod",
      "Contact": 7020888369,
      "Status": "In Progress",
      "Generate": "5th/May/2023",
    },
    {
      "No": 4,
      "Report Name": "Report Name",
      "Customer Name": "Rajesh Satpute",
      "Contact": 7020888369,
      "Status": "In Progress",
      "Generate": "5th/May/2023",
    },
    {
      "No": 5,
      "Report Name": "Report Name",
      "Customer Name": "Indranil Rathod",
      "Contact": 7020888369,
      "Status": "In Progress",
      "Generate": "5th/May/2023",
    },
  ]);
  return (
    <div className='PageContent'>
    <div className='flex justify-between py-2 items-center'>
    <div className='PageTitle'>Reports</div>
    <Button>+ Add Reports</Button>
    </div>
    <BgCover>
    <CommonGrid
        rewardsData={data}
        headings={headings}
        tableName={"Report List"}
      />
    </BgCover>
    </div>
    
  );
};

export default Reports