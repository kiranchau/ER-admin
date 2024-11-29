import "../SCSS/Login.scss";
import React, { useState } from "react";
import Logo from "../../Images/elevatedRevenue Logo.png";
import { forgotPassword } from "../../Utils/validation";
import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "../UI/Input";
import * as api from "../../API/authCrud";
import UseFormContext from "../../context/UseFormContext";
// import OtpVerify from "../Popups/OtpVerify";

const initialValues = { email: "" };

const ForgotPassword = () => {
  const formContext = UseFormContext();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPassword,
    onSubmit: (values, { setSubmitting }) => {
      ForgotPass(values, setSubmitting);
    },
  });

  const {
    errors,
    resetForm,
    getFieldProps,
    handleSubmit,
    touched,
    isSubmitting,
  } = formik;

  async function ForgotPass(values, setSubmitting) {
    let data = {
      email: values.email,
    };
    api
      .forgotPass(data)
      .then((res) => {
        if (res.status === 200) {
          formContext.setNotifayMessage(res.data.message);
          formContext.setNotifayType("success");
          resetForm();
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          formContext.setNotifayMessage(err.response.data.error);
          formContext.setNotifayType("error");
          resetForm();
        } else {
          resetForm();
        }
      });
  }

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center mb-4">
          <img src={Logo} width="50%" alt="Logo" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
          Forgot Password
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
          </div>
          <div className="mt-6">
            <button
              disabled={isSubmitting}
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </div>
          <div className="text-center mt-1">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <NavLink
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
