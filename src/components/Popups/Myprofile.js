import React, { useEffect, useState } from "react";
import * as MdIcons from "react-icons/md";
import * as TiIcons from "react-icons/ti";
import Input from "../UI/Input";
import { useFormik } from "formik";
import { myProfileSchema } from "../../Utils/validation";
import * as api from "../../API/authCrud";
import UseFormContext from "../../context/UseFormContext";
import ChangePassword from "./ChangePassword";
import PopHead from "../UI/PopHead";

// Form Initial Values

const Myprofile = ({ onClick }) => {
  const { formContext, userDetails, updateUserDetails } = UseFormContext();
  const [id, setId] = useState(
    localStorage.getItem("userId").replace(/['"]+/g, "")
  );
  const [pschange, setPsChange] = useState(false);
  const [initialValues, setInitialValues] = useState(userDetails);

  useEffect(() => {
    api
      .userEditRecord(id)
      .then((res) => {
        if (res.status === 200) {
          setInitialValues({
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            email: res.data.email,
            is_active: res.data.is_active,
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [id]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: myProfileSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const { first_name, last_name, email } = values;
      const data = {
        first_name,
        last_name,
        email,
        is_active: initialValues.is_active,
        role_id: 2,
      };
      if (id) {
        api
          .userStatusChange(data, id)
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem("email", JSON.stringify(res.data.email));
              formContext?.setNotifayMessage(
                "User Profile updated successfully!"
              );
              formContext?.setNotifayType("success");
              updateUserDetails({ first_name, last_name });
              onClick();
            }
          })
          .catch((err) => {
            formContext.setNotifayMessage(
              "Failed to update the user profile. Please try again."
            );
            formContext.setNotifayType("error");
          });
      }
    },
  });

  return (
    <>
      <div className="w-screen h-screen blrBG">
        <div className="flex justify-center items-center h-full w-full ">
          <div className="bg-white w-1/2 relative rounded-lg ">
            <PopHead title="My Profile" onClick={onClick} />
            {/* <div className="flex items-end -mt-28">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-blue-200 shadow-xl"></div>
                <div className="bg-white absolute bottom-1 right-2 p-1 rounded-full font-md">
                  <TiIcons.TiEdit />
                </div>
              </div>
              <div>
                <b>
                  {userDetails.first_name + " " + userDetails.last_name}
                </b>
              </div>
            </div> */}
            <div className="p-10 rounded">
              <div className="grid lg:grid-cols-2 sm:grid-cols-1  gap-10">
                <div>
                  <Input
                    label="First Name"
                    id="firstname"
                    name="first_name"
                    maxLength={50}
                    access={true}
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
                    id="lastname"
                    name="last_name"
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
              <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-10 mt-3">
                <div>
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
                <div className="flex items-end">
                  <button
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => setPsChange(!pschange)}
                  >
                    Change Password
                  </button>
                </div>
                {/* <div>
                  <Input label="Phone Number" id="firstname" />
                </div> */}
              </div>
              {/* <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-10 mt-3">
                <div className="">
                  <label>Adress</label>
                  <br></br>
                  <textarea
                    placeholder="Address"
                    style={{
                      border: "1px solid #D9D9D9",
                      borderRadius: "5px",
                      padding: "5px",
                      marginTop: "0px",
                      width: "100%",
                      height: "80%",
                    }}
                  />
                </div>
                <div>
                  <Input label="City" id="firstname" />
                  <div className="mt-5">
                    <Input label="Country" id="firstname" />
                  </div>
                </div>
              </div> */}
              {/* <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-10 mt-3">
                <div>
                  <Input label="Reference" id="firstname" />
                </div>
                
              </div> */}
              <div className="mt-3">
                <h1>Privacy Policy</h1>
                <p className="text-xs">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="flex gap-3 w-1/2 mt-8">
                  <button
                    type="button"
                    onClick={onClick}
                    className="inline-block w-full rounded-md text-sm border hover:bg-blue-600 hover:text-white"
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {pschange && (
        <div className="w-screen h-screen blrBG">
          <ChangePassword onClose={() => setPsChange(!pschange)} />
        </div>
      )}
    </>
  );
};

export default Myprofile;
