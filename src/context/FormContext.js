import React, { useState, createContext, useEffect } from "react";
import * as api from "../API/authCrud";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const [popUps, setPopUps] = useState(false);
  const [emailAdd, setEmailAdd] = useState("");
  const [passwordAdd, setPasswordAdd] = useState("");
  const [verificationScreen, setVerificationScreen] = useState("");
  const [notifayMessage, setNotifayMessage] = useState("");
  const [notifayType, setNotifayType] = useState("");
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [liveUrlPath1, setLiveUrlPath1] = useState();
  const [liveUrlPath2, setLiveUrlPath2] = useState();
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
  });

  const updateUserDetails = (details) => {
    setUserDetails(details);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const refreshToken = {
        refresh: localStorage.getItem("refreshtoken").replace(/['"]+/g, ""),
      };
      api.tokenUpdate(refreshToken)
        .then((res) => {
          if(res.status === 200){
            localStorage.setItem("token", JSON.stringify(res.data.access))
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }, 50 * 60 * 1000); 
    return () => clearInterval(interval); 
  }, []); 

  const contextValue = {
    setPopUps,
    popUps,
    setEmailAdd,
    emailAdd,
    setVerificationScreen,
    verificationScreen,
    notifayMessage,
    setNotifayMessage,
    notifayType,
    setNotifayType,
    setLoader,
    loader,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    passwordAdd,
    setPasswordAdd,
    liveUrlPath1,
    setLiveUrlPath1,
    liveUrlPath2,
    setLiveUrlPath2,
    userDetails,
    updateUserDetails,
  };

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};

export default FormContext;
