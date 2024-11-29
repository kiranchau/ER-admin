import React, { useEffect, useRef, useState } from "react";
import mailIcon from "../../Images/mail_1324171 1.png";
import { useNavigate } from "react-router-dom";
import UseFormContext from "../../context/UseFormContext";
import * as MdIcons from "react-icons/md";
import * as api from "../../API/authCrud";

const OtpVerify = ({ onClick, length = 4, onOtpSubmit = () => {} }) => {
  const formContext = UseFormContext();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(30); // Timer in seconds (3 minutes)
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const [mergeOtp, setMergeOtp] = useState("");
  const [error, setError] = useState(""); // Error state
  const inputRefs = useRef([]);
  const verifyButtonRef = useRef(null); // Ref for the Verify button
  useEffect(() => {
    setTimer(30);
  }, []);

  useEffect(() => {
    // Decrease the timer every second
    const timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    // Clear the interval when the component unmounts
    return () => {
      clearInterval(timerInterval);
    };
  }, [timer]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      setMergeOtp(combinedOtp);
      onOtpSubmit(combinedOtp);
      verifyButtonRef.current.focus(); // Focus on Verify button
      setError(""); // Clear error when OTP is fully entered
    }

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const verification = () => {
    if (mergeOtp.length !== length) {
      setError("Please enter 4 digit verification code.");
      return;
    }
    if (formContext.verificationScreen == "Signup") {
      singUpFunctionality();
    } else if (formContext.verificationScreen == "Login") {
      loginUpFunctionality();
    }
  };

  const singUpFunctionality = () => {
    let data = {
      email: formContext.emailAdd,
      password: formContext.passwordAdd,
      otp: mergeOtp,
    };
    let data1 = {
      email: formContext.emailAdd,
      password: formContext.passwordAdd,
    };
    api
      .verifyOtp(data)
      .then((req) => {
        if (req.status === 200) {
          formContext.setNotifayMessage(req.data.message);
          formContext.setNotifayType("success");
          api
            .registerUser(data1)
            .then((req) => {
              if (req.status === 201) {
                formContext.setNotifayMessage("User Register Successfully");
                formContext.setNotifayType("success");
                formContext.setPopUps(false);
                navigate("/");
              }
            })
            .catch((err) => {
              if (err.response.status === 400) {
                formContext.setNotifayMessage(err.response.data.email[0]);
                formContext.setNotifayType("error");
                // Clear all input boxes
                setOtp(new Array(length).fill(""));
                setMergeOtp("");
                onOtpSubmit("");

                // Focus back on the first input
                if (inputRefs.current[0]) {
                  inputRefs.current[0].focus();
                }
              }
            });
        }
      })
      .catch((err) => {
        if (err.response.status == 400) {
          formContext.setNotifayMessage("OTP has expired");
          formContext.setNotifayType("error");
        }
      });
  };

  const loginUpFunctionality = () => {
    let data = {
      email: formContext.emailAdd,
      otp: mergeOtp,
    };
    api
      .loginVerifyOtp(data)
      .then((req) => {
        if (req.status === 200) {
          formContext.setNotifayMessage(req.data.message);
          formContext.setNotifayType("success");
          formContext.setPopUps(false);
          localStorage.setItem("userId", JSON.stringify(req.data.id));
          localStorage.setItem("token", JSON.stringify(req.data.access_token));
          localStorage.setItem(
            "refreshtoken",
            JSON.stringify(req.data.refresh_token)
          );
          navigate("/home");
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          formContext.setNotifayMessage(err.response.data.detail);
          formContext.setNotifayType("error");
          // Clear all input boxes
          setOtp(new Array(length).fill(""));
          setMergeOtp("");
          onOtpSubmit("");

          // Focus back on the first input
          if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
          }
        } else if (err.response.status === 400) {
          formContext.setNotifayMessage(err.response.data.error);
          formContext.setNotifayType("error");
          // Clear all input boxes
          setOtp(new Array(length).fill(""));
          setMergeOtp("");
          onOtpSubmit("");

          // Focus back on the first input
          if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
          }
        }
      });
  };

  const resendOtp = () => {
    setTimer(30);
    setOtp(new Array(length).fill(""));
    if (formContext.verificationScreen == "Signup") {
      let data = {
        email: formContext.emailAdd,
        password: formContext.passwordAdd,
      };
      api
        .sendOtp(data)
        .then((req) => {
          if (req.status == 200) {
            formContext.setNotifayMessage(req.data.message);
            formContext.setNotifayType("success");
          }
        })
        .catch((err) => {
          formContext.setNotifayMessage("OTP Not Send");
          formContext.setNotifayType("error");
        });
    } else if (formContext.verificationScreen == "Login") {
      let data = {
        email: formContext.emailAdd,
        password: formContext.passwordAdd,
      };
      api
        .loginSendOtp(data)
        .then((res) => {
          if (res.status === 200) {
            formContext.setNotifayMessage(res.data.message);
            formContext.setNotifayType("success");
          }
        })
        .catch((err) => {
          if (err.response.status === 429) {
            formContext.setNotifayMessage(err.response.data.error);
            formContext.setNotifayType("error");
          } else if (err.response.status === 400) {
            formContext.setNotifayMessage(err.response.data.error);
            formContext.setNotifayType("error");
          }
        });
    }
  };

  return (
    <div className="popups flex justify-center items-center w-full">
      <div className="addpopups relative">
        <div
          className="absolute cursor-pointer top-[10px] right-[10px] text-sm border rounded-full w-[25px] h-[25px] flex items-center justify-center hover:bg-indigo-600 hover:text-white"
          type="button"
          onClick={onClick}
        >
          <MdIcons.MdOutlineClose />
        </div>
        <center>
          <div className="px-12">
            <div className="text-2xl">
              <b>Verification Code</b>
            </div>
            <img src={mailIcon} width={"40%"} className="m-6" />
            <p>
              We have sent the code verification to your email<br></br>
              <b>{formContext.emailAdd}</b>
            </p>
            <div className="flex justify-between items-center w-9/12 pt-8">
              {otp.map((value, index) => {
                return (
                  <input
                    key={index}
                    type="text"
                    ref={(input) => (inputRefs.current[index] = input)}
                    value={value}
                    onChange={(e) => handleChange(index, e)}
                    onClick={() => handleClick(index)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength="1"
                    className="otpNumber"
                  />
                );
              })}
            </div>
            <br />
            <p className="text-danger" style={{ color: "red" }}>
              {error}
            </p>
            {timer > 0 && (
              <p>
                Time remaining: <span className="time-text">{timer}</span>{" "}
                seconds{" "}
              </p>
            )}
            {timer < 1 && (
              <p className="send-code-link text-indigo-600" onClick={resendOtp}>
                Resend
              </p>
            )}
            <button
              ref={verifyButtonRef} // Assign ref to the Verify button
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={verification}
            >
              Verify
            </button>
          </div>
        </center>
      </div>
    </div>
  );
};

export default OtpVerify;
