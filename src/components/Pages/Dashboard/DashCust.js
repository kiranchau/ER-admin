import React, { useEffect, useState } from "react";
import CommonGrid from "../../CommonGrid/CommonGrid";
import UseFormContext from "../../../context/UseFormContext";
import * as api from "../../../API/authCrud";
import SkeletonLoader from "../../CommonModules/Popup/SkeletonLoader";
import { Link } from "react-router-dom";

const DashCust = () => {
  const formContext = UseFormContext();
  const [popUps, setPopUps] = useState(false);
  const [data, setData] = useState([]);
  const [sendId, setSendId] = useState(null);
  const headings = [
    { Name: "Organization", id: 1 },
    { Name: "PhoneNo", id: 2 },
    { Name: "Email", id: 3 },
    { Name: "Status", id: 4 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      formContext.setLoader(true);
      try {
        const res = await api.customerDetails();
        const ids = res.data
          .map((cust) => ({
            id: cust.id,
            Organization: cust.org_name,
            PhoneNo: cust.phone_number,
            Email: cust.email,
            Status: cust.is_active,
            Address: cust.address,
          }))
          .slice(0, 10); // Select only the first 10 records
        setData(ids);
      } catch (error) {
        console.error("There was an error making the request:", error);
      } finally {
        formContext.setLoader(false);
      }
    };
  
    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="w-full">
      <div className="flex justify-between p-1">
        <div className="text-xl">Customer List</div>
        <Link className="text-blue-500 pointer hover:underline-offset-2 hover:underline" to="/customer">
          View All
        </Link>
      </div>
      <div className="border rounded">
        {formContext.loader ? (
          <SkeletonLoader headings={headings} />
        ) : (
          <CommonGrid
            rewardsData={data}
            headings={headings}
            tableName={"DashCust"}
          />
        )}
      </div>
    </div>
  );
};

export default DashCust;
