import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import '../SCSS/sidebar.scss';
import Header from "./Header";
import { menuItems } from "../../mockDataFolder/mockData";
import Myprofile from "../Popups/Myprofile";

const Sidebar = () => {
  const [inActive, setInActive] = useState(false);
  const [myprofile, setMyprofile] = useState(false);

  

  return (
  <>
  <Header onClick={() => setInActive(!inActive)} showProfile={() => setMyprofile(true)}/>
    <div className={`${inActive ? 'navigation smallNav':'navigation bigNav'}`}>
        <div style={{paddingTop: "70px"}}>
        <ul>
    {
      menuItems.map((item, index) => (
        <>
        <li className="list" key={index}>
        <NavLink to={item.to} className={({isActive}) => isActive ? "active" : undefined}>
        <b></b>
            <span className="icon myIcon"> {item.icon}</span>
            <span className="title">{item.name}</span>
          </NavLink>
        </li>
      </>
      ))
    }
    </ul>
    </div>
    </div>
    {myprofile &&
    <div className="absolute bottom-0 right-0 z-10">
      <Myprofile onClick={() => setMyprofile(!myprofile)}/>
    </div>
    
  }
    </>
  );
};

export default Sidebar;
