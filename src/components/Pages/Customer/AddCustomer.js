import React, { useEffect, useState } from "react";
import Input from "../../UI/Input";
import TextArea from "../../UI/Textarea";
import Checkbox from "../../UI/Checkbox";
import { useFormik } from "formik";
import { addCustomer } from "../../../Utils/validation";
import * as api from "../../../API/authCrud";
import UseFormContext from "../../../context/UseFormContext";
import * as MdIcons from "react-icons/md";
import PopHead from "../../UI/PopHead";

const AddCustomer = (props) => {
  const { onClose, onDataSaved, id } = props;
  const formContext = UseFormContext();
  const [initialValues, setInitialValues] = useState({
    org_name: "",
    address: "",
    phone_number: "",
    email: "",
    is_active: false,
  });

  useEffect(() => {
    if (id) {
      api
        .custEditRecord(id)
        .then((res) => {
          const custData = res.data;
          setInitialValues({
            org_name: custData.org_name,
            address: custData.address,
            phone_number: custData.phone_number,
            email: custData.email,
            is_active: custData.is_active,
          });
        })
        .catch((err) => {
          console.error("Error fetching customer data:", err);
        });
    }
  }, [id]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: addCustomer,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      addCustomerSave(values, setSubmitting, resetForm);
    },
  });

  const addCustomerSave = async (values, setSubmitting, resetForm) => {
    const { org_name, address, phone_number, email, is_active } = values;
    let data = {
      org_name,
      address,
      phone_number,
      email,
      is_active,
    };

    try {
      let res;
      if (id) {
        res = await api.custStatusChange(data, id);
      } else {
        res = await api.custAddRecord(data);
      }

      if (res.status === 200 || res.status === 201) {
        const message = id
          ? "Customer updated successfully!"
          : "Customer saved successfully!";
        formContext.setNotifayMessage(message);
        formContext.setNotifayType("success");
        onDataSaved();
        resetForm();
        onClose();
      } else {
        formContext.setNotifayMessage(
          "Failed to save customer. Please try again."
        );
        formContext.setNotifayType("error");
      }
    } catch (error) {
      resetForm();
      console.error("Error saving customer:", error);
      formContext.setNotifayMessage(
        "An error occurred while saving the customer."
      );
      formContext.setNotifayType("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="popups flex justify-center items-center w-full">
      <div className="relative bg-white rounded-lg">
        <PopHead
          title={id ? "Edit Customer" : "Add Customer"}
          onClick={onClose}
        />
        <center>
          <div className="flex justify-between items-center">
            <form
              onSubmit={formik.handleSubmit}
              autoComplete="off"
              className="flex justify-center flex-col addpopups"
            >
              <div>
                <div className="flex gap-6 mt-4">
                  <div>
                    <Input
                      label="Organization Name"
                      id="org_name"
                      type="text"
                      name="org_name"
                      className="w-[25vw]"
                      maxLength={100}
                      {...formik.getFieldProps("org_name")}
                      access={true}
                      error={
                        formik.touched.org_name &&
                        formik.errors.org_name && (
                          <p className="text-left">{formik.errors.org_name}</p>
                        )
                      }
                    />
                  </div>
                  <div>
                    <TextArea
                      label="Address"
                      rows="3"
                      cols="50"
                      id="address"
                      type="text"
                      name="address"
                      maxLength={250}
                      {...formik.getFieldProps("address")}
                      error={
                        formik.touched.address &&
                        formik.errors.address && (
                          <p className="text-left">{formik.errors.address}</p>
                        )
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-6 mt-4">
                  <div>
                    <Input
                      label="Phone No"
                      id="phone_number"
                      type="number"
                      name="phone_number"
                      className="w-[25vw]"
                      maxLength={10}
                      access={true}
                      {...formik.getFieldProps("phone_number")}
                      error={
                        formik.touched.phone_number &&
                        formik.errors.phone_number && (
                          <p className="text-left">
                            {formik.errors.phone_number}
                          </p>
                        )
                      }
                    />
                  </div>
                  <div>
                    <Input
                      label="Email"
                      id="email"
                      type="email"
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
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <label>Status</label>
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
                />{" "}
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="inline-block w-full rounded-md text-sm border mt-[50px] hover:bg-blue-600 hover:text-white"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  disabled={formik.isSubmitting}
                  type="submit"
                  className="inline-block w-full rounded-md text-sm border mt-[50px]  bg-blue-600 py-2 text-white hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
          <br />
        </center>
      </div>
    </div>
  );
};

export default AddCustomer;
