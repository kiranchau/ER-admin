import React, { useEffect, useState } from "react";
import CommonGrid from "../../CommonGrid/CommonGrid";
import BgCover from "../../UI/BgCover";
import Button from "../../UI/Button";
import UseFormContext from "../../../context/UseFormContext";
import SkeletonLoader from "../../CommonModules/Popup/SkeletonLoader";
import * as FaIcons from "react-icons/fa";

const Masterdata = () => {
  const formContext = UseFormContext();
  const [headings] = useState([
    { Name: "Id No", id: 1 },
    { Name: "Company / Customer Name", id: 2 },
    { Name: "Compnay Mail ID", id: 3 },
    { Name: "Services", id: 4 },
    { Name: "Users", id: 5 },
    { Name: "Phone No", id: 6 },
    { Name: "Status", id: 7 },
    { Name: "Due Date", id: 8 },
  ]);
  const [data, setData] = useState([]);

  // const [data, setData] = useState([
  //   {
  //     "Id No": 1,
  //     "Company / Customer Name": "Kiran Chaudhari",
  //     "Compnay Mail ID": "kiranchaudhari@gmail.com",
  //     Services: 15,
  //     Users: "Kiran Chaudhari",
  //     "Phone No": 7020888369,
  //     Status: "In Progress",
  //     "Due Date": "5th/May/2024",
  //   },
  //   {
  //     "Id No": 2,
  //     "Company / Customer Name": "Kiran Chaudhari",
  //     "Compnay Mail ID": "kiranchaudhari@gmail.com",
  //     Services: 15,
  //     Users: "Kiran Chaudhari",
  //     "Phone No": 7020888369,
  //     Status: "In Progress",
  //     "Due Date": "5th/May/2024",
  //   },
  //   {
  //     "Id No": 3,
  //     "Company / Customer Name": "Kiran Chaudhari",
  //     "Compnay Mail ID": "kiranchaudhari@gmail.com",
  //     Services: 15,
  //     Users: "Kiran Chaudhari",
  //     "Phone No": 7020888369,
  //     Status: "In Progress",
  //     "Due Date": "5th/May/2024",
  //   },
  //   {
  //     "Id No": 4,
  //     "Company / Customer Name": "Kiran Chaudhari",
  //     "Compnay Mail ID": "kiranchaudhari@gmail.com",
  //     Services: 15,
  //     Users: "Kiran Chaudhari",
  //     "Phone No": 7020888369,
  //     Status: "In Progress",
  //     "Due Date": "5th/May/2024",
  //   },
  // ]);

  useEffect(() => {
    formContext.setLoader(true);
    showData();
  }, []);

  const showData = () => {
    setTimeout(() => {
      formContext.setLoader(false);
    }, 2000); // Simulated 2 seconds delay
  };

  return (
    <div className="PageContent">
      <div className="flex justify-between py-2 items-center">
        <div className="PageTitle">MasterData</div>
        <Button className="flex items-center gap-1">
          <FaIcons.FaPlus /> Add Master Data
        </Button>
      </div>
      <BgCover>
        {formContext.loader ? (
          <SkeletonLoader headings={headings} />
        ) : (
          <CommonGrid
            rewardsData={data}
            headings={headings}
            tableName={"Master Data"}
          />
        )}
      </BgCover>
    </div>
  );
};

export default Masterdata;
