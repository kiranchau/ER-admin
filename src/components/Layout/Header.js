import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Smlllogo from "../../Images/revenue logo.png";
import "../SCSS/header.scss";
import Form from "react-bootstrap/Form";
import * as FiIcons from "react-icons/fi";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as api from "../../API/authCrud";
import person from "../../Images/person.png";
import UseFormContext from "../../context/UseFormContext";

const Header = (props) => {
  const { formContext, userDetails, updateUserDetails } = UseFormContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails.first_name !== "" && userDetails.last_name !== "") {
    } else {
      api
        .userEditRecord(localStorage.getItem("userId").replace(/['"]+/g, ""))
        .then((res) => {
          if (res.status === 200) {
            updateUserDetails({
              first_name: res.data.first_name,
              last_name: res.data.last_name,
            });
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, []);

  const logOutFunctionality = () => {
    let authToken = localStorage.getItem("token");
    let refreshToken = localStorage.getItem("refreshtoken");
    let data = {
      token: {
        access_token: authToken.replace(/['"]+/g, ""),
        refresh_token: refreshToken.replace(/['"]+/g, ""),
      },
    };
    api
      .logOut(data)
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          formContext.setNotifayMessage(res.data.message);
          formContext.setNotifayType("success");
        }
      })
      .catch((err) => {
        console.log("logOut...err", err);
      });
  };

  return (
    <>
      <div className="headbg p-2 flex justify-between items-center">
        <div className="topSection p-2 flex items-center">
          <img
            src={Smlllogo}
            className="smallLogo"
            alt="small Logo"
            onClick={() => {
              navigate("/home");
            }}
          />
          <div type="button" onClick={props.onClick}>
            <RiIcons.RiBarChartHorizontalFill className="myIcon" />
          </div>
        </div>
        <div className="w-1/3">
          <div class="relative rounded-full shadow-sm w-full">
            <div class="absolute pointer-events-auto inset-y-0 left-0 pl-3 flex items-center">
              <svg
                class="absolute text-slate-400 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              class="font-sans block text-sm w-full pl-10 py-2 px-3 ring-1 ring-slate-900/10 text-slate-500 rounded-full dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400"
            />
          </div>
        </div>
        <div className="px-2 flex items-center">
          <div className="float-end px-2">
            <div className="userName">
              {userDetails.first_name + " " + userDetails.last_name}
            </div>
            {/* <div className="userDesig">Marketing Administrator</div> */}
          </div>
          <img
            src={person}
            className="profileIcon"
            alt="Profile Icon"
            onClick={props.showProfile}
          />
          <IoIcons.IoIosNotificationsOutline
            className="myIcon"
            title="Notifications"
          />
          <Link to="/" onClick={logOutFunctionality}>
            {" "}
            <FiIcons.FiPower className="myIcon" title="Log Out" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
