import React, { useEffect, useState } from "react";
import CommonGrid from "../../CommonGrid/CommonGrid";
import BgCover from "../../UI/BgCover";
import Button from "../../UI/Button";
import AddCustomer from "./AddCustomer";
import * as api from "../../../API/authCrud";
import SkeletonLoader from "../../CommonModules/Popup/SkeletonLoader";
import UseFormContext from "../../../context/UseFormContext";
import * as FaIcons from 'react-icons/fa'

const Customer = () => {
  const formContext = UseFormContext();
  const [popUps, setPopUps] = useState(false);
  const [data, setData] = useState([]);
  // const [loader, setLoader] = useState(false);
  const [sendId, setSendId] = useState();
  const [headings] = useState([
    { Name: "Organization", id: 1 },
    { Name: "PhoneNo", id: 2 },
    { Name: "Email", id: 3 },
    { Name: "Status", id: 4 },
  ]);

  useEffect(() => {
    DataShow();
  }, []);

  const DataShow = () => {
    formContext.setLoader(true);
    const fetchData = async () => {
      try {
        const res = await api.customerDetails();
        const ids = res.data.map((cust) => ({
          id: cust.id,
          Organization: cust.org_name,
          PhoneNo: cust.phone_number,
          Email: cust.email,
          Status: cust.is_active,
          Address: cust.address,
        }));
        setData(ids);
      } catch (error) {
        console.error("There was an error making the request:", error);
      } finally {
        formContext.setLoader(false);
      }
    };
    fetchData();
  };

  const editRecord = (id) => {
    setPopUps(true);
    setSendId(id);
  };

  const close = () => {
    setPopUps(false);
    setSendId();
  };

  return (
    <div className="PageContent">
      <div className="flex justify-between py-2 items-center">
        <div className="PageTitle">Customer</div>
        <Button
          onClick={() => {
            setPopUps(true);
          }}
        >
          <FaIcons.FaPlus /> Add Customer
        </Button>
      </div>
      <BgCover>
        {formContext.loader ? (
          <SkeletonLoader headings={headings} />
        ) : (
          <CommonGrid
            rewardsData={data}
            headings={headings}
            tableName={"Customer List"}
            parentCallback={editRecord}
          />
        )}
      </BgCover>
      {popUps && (
        <div className="centerpopups">
          <AddCustomer onClose={close} onDataSaved={DataShow} id={sendId} />
          <div className="blurBg"></div>
        </div>
      )}
    </div>
  );
};

export default Customer;
