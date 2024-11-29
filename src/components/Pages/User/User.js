import React, { useEffect, useState } from "react";
import CommonGrid from "../../CommonGrid/CommonGrid";
import BgCover from "../../UI/BgCover";
import Button from "../../UI/Button";
import * as api from "../../../API/authCrud";
import AddUser from "./AddUser";
import UseFormContext from "../../../context/UseFormContext";
import SkeletonLoader from "../../CommonModules/Popup/SkeletonLoader";
import * as FaIcons from 'react-icons/fa'

const User = () => {
  const formContext = UseFormContext();
  const [popUps, setPopUps] = useState(false);
  const [data, setData] = useState([]);
  const [sendId, setSendId] = useState();
  const [headings] = useState([
    { Name: "UserName", id: 1 },
    { Name: "Email", id: 2 },
    { Name: "Status", id: 3 },
  ]);

  useEffect(() => {
    DataShow();
  }, []);

  const DataShow = () => {
    formContext.setLoader(true);
    const fetchData = async () => {
      try {
        const res = await api.userDetails();
        const ids = res.data.map((user) => ({
          id: user.id,
          UserName: `${user.first_name} ${user.last_name}`,
          Email: user.email,
          Status: user.is_active,
          Password: user.password,
          role_id: user.role_id,
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
        <div className="PageTitle">User</div>
        {/* <Button
          onClick={() => {
            setPopUps(true);
          }}
        >
          <FaIcons.FaPlus /> Add User
        </Button> */}
      </div>
      <BgCover>
        {formContext.loader ? (
          <SkeletonLoader headings={headings}/>
        ) : (
          <CommonGrid
            rewardsData={data}
            headings={headings}
            tableName={"User List"}
            parentCallback={editRecord}
          />
        )}
      </BgCover>
       {popUps && (
        <div className="centerpopups">
          <AddUser onClose={close} onDataSaved={DataShow} id={sendId} onClick={close} />
          <div className="blurBg"></div>
        </div>
      )}
    </div>
  );
};

export default User;
