import React, { useEffect, useState } from "react";
import "../SCSS/Login.scss";
import Logo from "../../Images/elevatedRevenue Logo.png";
import Input from "../UI/Input";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useFormik, useFormikContext } from "formik";
import { loginSchema } from "../../Utils/validation";
import UseFormContext from "../../context/UseFormContext";
import OtpVerify from "../Popups/OtpVerify";
import * as AiIcons from "react-icons/ai";
import * as api from "../../API/authCrud";

// Form Initial Values
const initialValues = { email: "", password: "" };

const Login = () => {
  const formContext = UseFormContext();
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const {
    errors,
    resetForm,
    getFieldProps,
    handleSubmit,
    touched,
    isSubmitting,
    values,
  } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting }) => {
      login(values, setSubmitting);
    },
  });

  useEffect(() => {
    formContext.setShowPassword(false);
  }, []);

  async function login(values, setSubmitting) {
    if (values.email !== "" && values.password !== "") {
      let data = {
        email: values.email,
        password: values.password,
      };
      api
        .loginSendOtp(data)
        .then((res) => {
          if (res.status === 200) {
            formContext.setNotifayMessage(res.data.message);
            formContext.setNotifayType("success");
            formContext.setPopUps(true);
            formContext.setEmailAdd(values.email);
            formContext.setPasswordAdd(values.password);
            formContext.setVerificationScreen("Login");
            resetForm();
          }
        })
        .catch((err) => {
          resetForm();
          if (err.response.status === 429) {
            formContext.setNotifayMessage(err.response.data.error);
            formContext.setNotifayType("error");
          } else if (err.response.status === 400) {
            formContext.setNotifayMessage(err.response.data.error);
            formContext.setNotifayType("error");
          }
        });
    }
  }

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center my-8">
          <img src={Logo} width="50%" alt="Logo" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit} autoComplete="off" className="p-6">
          <div className="space-y-4">
            <div className="input-container">
              <Input
                label="Email ID / User Name"
                id="email"
                type="email"
                name="email"
                {...getFieldProps("email")}
                error={touched.email && errors.email && <p>{errors.email}</p>}
              />
            </div>
            <div className="input-container relative">
              <Input
                label="Enter Password"
                id="password"
                type={formContext.showPassword ? "text" : "password"}
                name="password"
                access={false}
                {...getFieldProps("password")}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                error={
                  touched.password &&
                  errors.password && <p>{errors.password}</p>
                }
              />
              <div
                className={`absolute top-[38px] transform -translate-y-1/2 right-2 cursor-pointer`}
                onClick={() =>
                  formContext.setShowPassword(!formContext.showPassword)
                }
              >
                {formContext.showPassword ? (
                  <AiIcons.AiFillEyeInvisible className="text-indigo-500" />
                ) : (
                  <AiIcons.AiFillEye className="text-indigo-500" />
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="text-sm text-gray-600">
              <NavLink
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Don't have an account?{" "}
              </NavLink>
            </p>
            <p className="text-sm text-gray-600">
              <NavLink
                to="/forgotPassword"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot Password?
              </NavLink>
            </p>
          </div>
          <div className="mt-6">
            <button
              disabled={isSubmitting}
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      {formContext.popUps && (
        <div className="centerpopups">
          <OtpVerify
            onClick={() => formContext.setPopUps(!formContext.popUps)}
          />
          <div className="blurBg"></div>
        </div>
      )}
    </div>
  );
};

export default Login;
