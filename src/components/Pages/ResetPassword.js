import React, { useEffect, useState } from "react";
import Logo from "../../Images/elevatedRevenue Logo.png";
import { useFormik } from "formik";
import Input from "../UI/Input";
import { resetSchema } from "../../Utils/validation";
import { useNavigate } from "react-router-dom";
import UseFormContext from "../../context/UseFormContext";
import * as AiIcons from "react-icons/ai";
import * as api from "../../API/authCrud";

const initialValues = { password: "", confirmPassword: "" };

const ResetPassword = () => {
  const formContext = UseFormContext();
  const navigate = useNavigate();
  const [initialLiveUrlPath1, setInitialLiveUrlPath1] = useState(
    formContext.liveUrlPath1
  );
  const [initialLiveUrlPath2, setInitialLiveUrlPath2] = useState(
    formContext.liveUrlPath2
  );
  const {
    errors,
    resetForm,
    getFieldProps,
    handleSubmit,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: resetSchema,
    onSubmit: (values, { setSubmitting }) => {
      ResetPass(values, setSubmitting);
    },
  });

  useEffect(() => {
    if (
      formContext.liveUrlPath1 !== initialLiveUrlPath1 ||
      formContext.liveUrlPath2 !== initialLiveUrlPath2
    ) {
      formContext.setShowPassword(false);
      formContext.setShowConfirmPassword(false);
    }
  }, [formContext.liveUrlPath1, formContext.liveUrlPath2]);

  async function ResetPass(values, setSubmitting) {
    let data = {
      password: values.password,
    };

    api
      .resetPass(data, initialLiveUrlPath1, initialLiveUrlPath2)
      .then((res) => {
        if (res.status === 200) {
          formContext.setNotifayMessage(res.data.message);
          formContext.setNotifayType("success");
          resetForm();
          navigate("/");
        }
      })
      .catch((err) => {
        resetForm();
        if (err.response.status === 400) {
          formContext.setNotifayMessage(err.response.data.error);
          formContext.setNotifayType("error");
        }
      });
  }

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <div className="flex justify-center mb-4">
          <img src={Logo} width="50%" alt="Logo" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-4">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="space-y-4">
            <div className="input-container relative">
              <Input
                label="Enter Password"
                id="password"
                type={formContext.showPassword ? "text" : "password"}
                name="passwprd"
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
              className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
