import React, { useEffect, useState } from "react";
import CommonGrid from "../../CommonGrid/CommonGrid";
import UseFormContext from "../../../context/UseFormContext";
import * as api from "../../../API/authCrud";
import SkeletonLoader from "../../CommonModules/Popup/SkeletonLoader";
import { Link } from "react-router-dom";

const DashServ = () => {
  const formContext = UseFormContext();
  const [popUps, setPopUps] = useState(false);
  const [data, setData] = useState([]);
  const [sendId, setSendId] = useState(null);
  const [hasFetched, setHasFetched] = useState(false); // Flag to track if data has been fetched
  const headings = [
    { Name: "UserName", id: 1 },
    { Name: "Email", id: 2 },
    { Name: "Status", id: 3 },
  ];

  useEffect(() => {
    if (!hasFetched) {
      // Only fetch if not already fetched
      const fetchData = async () => {
        formContext.setLoader(true);
        try {
          const res = await api.userDetails();
          const ids = res.data
            .map((user) => ({
              id: user.id,
              UserName: `${user.first_name} ${user.last_name}`,
              Email: user.email,
              Status: user.is_active,
            }))
            .slice(0, 10); // Keep only the first 10 records
          setData(ids);
          setHasFetched(true); // Set flag to true once data is fetched
        } catch (error) {
          console.error("There was an error making the request:", error);
        } finally {
          formContext.setLoader(false);
        }
      };

      fetchData();
    }
  }, [hasFetched, formContext]); // Dependency on hasFetched ensures API is not called multiple times

  return (
    <div className="w-full">
      <div className="flex justify-between p-1">
        <div className="text-xl">User List</div>
        <Link
          className="text-blue-500 pointer hover:underline-offset-2 hover:underline"
          to="/user"
        >
          View All
        </Link>
      </div>
      <div className="border rounded w-full">
        {formContext.loader ? (
          <SkeletonLoader headings={headings} />
        ) : (
          <CommonGrid
            rewardsData={data}
            headings={headings}
            tableName={"DashServ"}
          />
        )}
      </div>
    </div>
  );
};

export default DashServ;
