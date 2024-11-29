import React, { useState } from "react";
import CommonGrid from "../../CommonGrid/CommonGrid";
import Button from "../../UI/Button";
import BgCover from "../../UI/BgCover";

const Connections = () => {
  const [headings] = useState([
    { Name: "Logo", id: 1 },
    { Name: "Brand Name", id: 2 },
    { Name: "Connection Type", id: 3 },
    { Name: "Data", id: 4 },
    { Name: "Categories", id: 5 },
  ]);

  const [data, setData] = useState([
    {
      "Logo": "Logo",
      "Brand Name": "Green House",
      "Connection Type": "Finance & Ops",
      "Data" : 1234322,
      "Categories": "CRM",
    },
    {
      "Logo": "Logo",
      "Brand Name": "Green House",
      "Connection Type": "Finance & Ops",
      "Data" : 1234322,
      "Categories": "CRM",
    },
    {
      "Logo": "Logo",
      "Brand Name": "Green House",
      "Connection Type": "Finance & Ops",
      "Data" : 1234322,
      "Categories": "CRM",
    },
    {
      "Logo": "Logo",
      "Brand Name": "Green House",
      "Connection Type": "Finance & Ops",
      "Data" : 1234322,
      "Categories": "CRM",
    },
    {
      "Logo": "Logo",
      "Brand Name": "Green House",
      "Connection Type": "Finance & Ops",
      "Data" : 1234322,
      "Categories": "CRM",
    },
    {
      "Logo": "Logo",
      "Brand Name": "Green House",
      "Connection Type": "Finance & Ops",
      "Data" : 1234322,
      "Categories": "CRM",
    },
  ]);
  return (

    <div className='PageContent'>
    <div className='flex justify-between py-2 items-center'>
    <div className='PageTitle'>Connections</div>
    <Button>+ Add Connections</Button>
    </div>
    <BgCover>
    <CommonGrid
        rewardsData={data}
        headings={headings}
        tableName={"Connections"}
      />
    </BgCover>
    </div>
    
  );
};

export default Connections;
