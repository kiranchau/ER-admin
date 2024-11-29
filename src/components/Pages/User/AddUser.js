import React, { useEffect, useState } from "react";
import Input from "../../UI/Input";
import Checkbox from "../../UI/Checkbox";
import { useFormik } from "formik";
import { addUser } from "../../../Utils/validation";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as api from "../../../API/authCrud";
import UseFormContext from "../../../context/UseFormContext";
import PopHead from "../../UI/PopHead";

const AddUser = ({ onClose, onDataSaved, id }) => {
  const formContext = UseFormContext();

  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    // password: "",
    is_active: false,
  });

  useEffect(() => {
    let isMounted = true; // track if component is mounted

    if (id) {
      api.userEditRecord(id)
        .then((res) => {
          if (isMounted) {
            const userData = res.data;
            setInitialValues({
              first_name: userData.first_name,
              last_name: userData.last_name,
              email: userData.email,
              // password: userData.password,
              is_active: userData.is_active,
            });
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }

    return () => {
      isMounted = false; // cleanup function to set isMounted to false when component unmounts
    };
  }, [id]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: addUser,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const { first_name, last_name, email, is_active } = values;
      const data = {
        first_name,
        last_name,
        email,
        is_active,
        role_id: 2,
      };

      try {
        let res;
        if (id) {
          res = await api.userStatusChange(data, id);
        } else {
          res = await api.userAddRecord(data);
        }

        if (res.status === 200 || res.status === 201) {
          const message = id
            ? "User updated successfully!"
            : "User added successfully!";
          onDataSaved();
          resetForm();
          onClose();
          formContext.setNotifayMessage(message);
          formContext.setNotifayType("success");
        } else {
          formContext.setNotifayMessage(
            "Failed to save user. Please try again."
          );
          formContext.setNotifayType("error");
        }
      } catch (error) {
        resetForm();
        console.error("Error saving user:", error);
        formContext.setNotifayMessage("An error occurred while saving the user.");
        formContext.setNotifayType("error");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="popups flex justify-center items-center w-full">
      <div className="relative bg-white rounded-lg">
      <PopHead  
      title={id ? "Edit User" : "Add User"}
      onClick={onClose}

      />
        
        <center>
          <form
            onSubmit={formik.handleSubmit}
            autoComplete="off"
            className="flex justify-center flex-col addpopups"
          >
            <div className="flex flex-wrap justify-between">
              <div className="flex gap-6 mt-4">
                <div>
                  <Input
                    label="First Name"
                    id="first_name"
                    type="text"
                    name="first_name"
                    access={true}
                    maxLength={50}
                    className="w-[25vw]"
                    {...formik.getFieldProps("first_name")}
                    error={
                      formik.touched.first_name &&
                      formik.errors.first_name && (
                        <p className="text-left">{formik.errors.first_name}</p>
                      )
                    }
                  />
                </div>
                <div>
                  <Input
                    label="Last Name"
                    id="last_name"
                    type="text"
                    name="last_name"
                    className="w-[25vw]"
                    access={true}
                    maxLength={50}
                    {...formik.getFieldProps("last_name")}
                    error={
                      formik.touched.last_name &&
                      formik.errors.last_name && (
                        <p className="text-left">{formik.errors.last_name}</p>
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-6 mt-4">
              <div>
                <Input
                  label="Email"
                  id="email"
                  type="text"
                  name="email"
                  className="w-[25vw]"
                  {...formik.getFieldProps("email")}
                  error={
                    formik.touched.email &&
                    formik.errors.email && (
                      <p className="text-left">{formik.errors.email}</p>
                    )
                  }
                />
              </div>
              <div className="my-6 flex items-center">
              {/* <div className="relative">
                <Input
                  label="Password"
                  id="password"
                  type={formContext.showPassword ? "text" : "password"}
                  name="password"
                  className="w-[25vw] pr-12"
                  {...formik.getFieldProps("password")}
                  error={
                    formik.touched.password &&
                    formik.errors.password && (
                      <p className="text-left">{formik.errors.password}</p>
                    )
                  }
                />
                <div
                  className={`absolute ${
                    formik.errors.password || formik.errors.email
                      ? "top-1/2"
                      : "top-2/3"
                  } transform -translate-y-1/2 right-2 cursor-pointer`}
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
              </div> */}
               <label className="block text-sm font-medium text-gray-700">
                Status :
              </label>
              &nbsp;&nbsp;&nbsp;
              <Checkbox
                label="Active"
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formik.values.is_active}
                {...formik.getFieldProps("is_active")}
                error={
                  formik.touched.is_active &&
                  formik.errors.is_active && (
                    <p className="text-left">{formik.errors.is_active}</p>
                  )
                }
              />
            </div>
            </div>
            {/* <div className="my-4 flex items-center"> */}
             
            {/* </div> */}
            <div className="flex justify-center gap-6">
              <button
                type="button"
                className="inline-block w-full rounded-md text-sm border mt-[50px] hover:bg-indigo-700 hover:text-white"
                onClick={onClose}
              >
                Close
              </button>
              <button
                disabled={formik.isSubmitting}
                type="submit"
                className="inline-block w-full rounded-md text-sm border mt-[50px] bg-blue-600 py-2 text-white hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </form>
        </center>
      </div>
    </div>
  );
};

export default AddUser;
