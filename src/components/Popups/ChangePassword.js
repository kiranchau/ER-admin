import React, { useEffect } from "react";
import * as MdIcons from "react-icons/md";
import Input from "../UI/Input";
import { useFormik } from "formik";
import * as api from "../../API/authCrud";
import { passChangeSchema } from "../../Utils/validation";
import UseFormContext from "../../context/UseFormContext";
import * as AiIcons from "react-icons/ai";
import PopHead from "../UI/PopHead";

const initialValues = { email: "", old_password: "", new_password: "" };

const ChangePassword = (props) => {
  const formContext = UseFormContext();

  useEffect(() => {
    formContext.setShowPassword(false);
    formContext.setShowConfirmPassword(false);
  }, []);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: passChangeSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const data = {
        email: values.email,
        old_password: values.old_password,
        new_password: values.new_password,
      };
      props.onClose();
      api
        .passwordChange(data)
        .then((res) => {
          if (res.status === 200) {
            formContext.setNotifayMessage(res.data.message);
            formContext.setNotifayType("success");
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            formContext.setNotifayMessage(err.response.data.error);
            formContext.setNotifayType("error");
          } else if (err.response.status === 400) {
            formContext.setNotifayMessage(err.response.data.error);
            formContext.setNotifayType("error");
          } else {
            formContext.setNotifayType("error");
          }
        });
    },
  });

  return (
    <div className="flex justify-center items-center h-full w-full ">
      <div className="bg-white w-1/3 rounded-lg relative">
        <PopHead 
          title="Change Password"
          onClick={props.onClose}
        />
        <center>
       

          <div className="px-10 py-5">
            <Input
              label="Email ID"
              id="email"
              name="email"
              {...formik.getFieldProps("email")}
              error={
                formik.touched.email &&
                formik.errors.email && (
                  <p className="text-left">{formik.errors.email}</p>
                )
              }
            />
          </div>
          <div className="mx-10 my-0 relative">
            <Input
              label="Old Password"
              id="old_password"
              type={formContext.showPassword ? "text" : "password"}
              name="old_password"
              access={false}
              {...formik.getFieldProps("old_password")}
              error={
                formik.touched.old_password &&
                formik.errors.old_password && (
                  <p className="text-left">{formik.errors.old_password}</p>
                )
              }
            />
            <div
              className="absolute top-[37px] transform -translate-y-1/2 right-3 cursor-pointer"
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
          <div className="mx-10 my-5 relative">
            <Input
              label="New Password"
              id="new_password"
              name="new_password"
              access={false}
              type={formContext.showConfirmPassword ? "text" : "password"}
              {...formik.getFieldProps("new_password")}
              error={
                formik.touched.new_password &&
                formik.errors.new_password && (
                  <p className="text-left">{formik.errors.new_password}</p>
                )
              }
            />
            <div
              className="absolute top-[37px] transform -translate-y-1/2 right-3 cursor-pointer"
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
          <div className="flex gap-3 w-1/2 my-8">
            <button
              type="button"
              className="inline-block w-full rounded-md text-sm border hover:bg-blue-600 hover:text-white"
              onClick={props.onClose}
            >
              Close
            </button>
            <button
              disabled={formik.isSubmitting}
              onClick={formik.handleSubmit}
              className="inline-block w-full rounded-md text-sm border bg-blue-600 py-2 text-white hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </center>
      </div>
    </div>
  );
};

export default ChangePassword;
