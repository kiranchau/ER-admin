import React, { useEffect } from "react";
import Input from "../UI/Input";
import "../SCSS/Login.scss";
import Logo from "../../Images/elevatedRevenue Logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "../../Utils/validation";
import UseFormContext from "../../context/UseFormContext";
import OtpVerify from "../Popups/OtpVerify";
import * as AiIcons from "react-icons/ai";
import * as api from "../../API/authCrud";

const initialValues = { email: "", password: "", confirmPassword: "" };

const Signup = () => {
  const formContext = UseFormContext();
  const navigate = useNavigate();

  useEffect(() => {
    formContext.setShowPassword(false);
    formContext.setShowConfirmPassword(false);
  }, []);

  const {
    errors,
    resetForm,
    getFieldProps,
    handleSubmit,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: signupSchema,
    onSubmit: (values, { setSubmitting }) => {
      Signup(values, setSubmitting);
    },
  });

  async function Signup(values, setSubmitting) {
    const { email, password, confirmPassword } = values;
    if (email !== "" && password !== "" && confirmPassword !== "") {
      let data = { email, password };
      api
        .sendOtp(data)
        .then((req) => {
          if (req.status === 200) {
            formContext.setNotifayMessage(req.data.message);
            formContext.setNotifayType("success");
            formContext.setPopUps(true);
            formContext.setEmailAdd(email);
            formContext.setPasswordAdd(password);
            formContext.setVerificationScreen("Signup");
            resetForm();
          }
        })
        .catch((err) => {
          resetForm();
          formContext.setNotifayMessage("OTP Not Send");
          formContext.setNotifayType("error");
        });
    }
  }

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center mb-4">
          <img src={Logo} width="50%" alt="Logo" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
          Registration
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
            <div className="input-container relative">
              <Input
                label="Confirm Password"
                id="confirmPassword"
                type={formContext.showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                access={false}
                {...getFieldProps("confirmPassword")}
                error={
                  touched.confirmPassword &&
                  errors.confirmPassword && <p>{errors.confirmPassword}</p>
                }
              />
              <div
                className={`absolute top-[38px] transform -translate-y-1/2 right-2 cursor-pointer`}
                onClick={() =>
                  formContext.setShowConfirmPassword(
                    !formContext.showConfirmPassword
                  )
                }
              >
                {formContext.showConfirmPassword ? (
                  <AiIcons.AiFillEyeInvisible className="text-indigo-500" />
                ) : (
                  <AiIcons.AiFillEye className="text-indigo-500" />
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              disabled={isSubmitting}
              type="submit"
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </div>
          <div className="text-center mt-1">
            <p className="text-sm text-gray-600">
              Already have an account?{"  "}
              <NavLink
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </NavLink>
            </p>
            <div className="mt-4">
              <hr className="hr-text" data-content="or Sign up using" />
            </div>
            <button
              type="button"
              className="flex justify-center w-full mt-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <img
                src="https://img.icons8.com/color/16/000000/google-logo.png"
                alt="Google"
                className="mr-2"
              />
              Google
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

export default Signup;
