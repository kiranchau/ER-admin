import { redirect } from "react-router-dom";
import axios from "./setupAxios.js";

export const User = `${process.env.REACT_APP_API_URL}users/`;
export const Customer = `${process.env.REACT_APP_API_URL}customer/`;
export const Send_Otp = `${process.env.REACT_APP_API_URL}send-otp/`;
export const Verify_Otp = `${process.env.REACT_APP_API_URL}verify-otp-register/`;
export const Register = `${process.env.REACT_APP_API_URL}register/`;
export const Login_Send_Otp = `${process.env.REACT_APP_API_URL}login/`;
export const Login_Verify_Otp = `${process.env.REACT_APP_API_URL}verify-otp/`;
export const LogOut = `${process.env.REACT_APP_API_URL}logout/`;
export const Forgot_Pass = `${process.env.REACT_APP_API_URL}password-reset/`;
export const Reset_Pass = `${process.env.REACT_APP_API_URL}password-reset-confirm/`;
export const Token_Update = `${process.env.REACT_APP_API_URL}token/refresh/`;
export const Password_Change = `${process.env.REACT_APP_API_URL}password-change/`;

//-------------Registration Collection------------------------

export function sendOtp(req) {
  return axios.post(Send_Otp, req);
}

export function verifyOtp(req) {
  return axios.post(Verify_Otp, req);
}

export function registerUser(req) {
  return axios.post(Register, req);
}

//------------------ Log Out Collection -----------------------

export function logOut(req) {
  return axios.post(LogOut, req);
}

//------------------ Forgot Password --------------------------

export function forgotPass(req) {
  return axios.post(Forgot_Pass, req);
}

//----------------- Reset Password -----------------------------

export function resetPass(req, liveUrlPath1, liveUrlPath2) {
  return axios.post(Reset_Pass + liveUrlPath1 + "/" + liveUrlPath2 + "/", req);
}

//------------- Login Collection ------------------------------

export function loginSendOtp(req) {
  return axios.post(Login_Send_Otp, req);
}

export function loginVerifyOtp(req) {
  return axios.post(Login_Verify_Otp, req);
}

//------------------ Token Updation ---------------------------

export function tokenUpdate(req) {
  return axios.post(Token_Update, req);
}

//----------------- Password Change ----------------------------

export function passwordChange(req) {
  return axios.post(Password_Change, req);
}

//------------- User Collection --------------------------------

export function userDetails() {
  return axios.get(User);
}

export function userDeleteRecord(id) {
  return axios.delete(User + `${id}`);
}

export function userStatusChange(req, id) {
  return axios.put(User + `${id}/`, req);
}

export function userAddRecord(req) {
  return axios.post(User, req);
}

export function userEditRecord(id) {
  return axios.get(User + `${id}/`);
}

// ------------------- Customer Collection -------------------

export function customerDetails() {
  return axios.get(Customer);
}

export function custDeleteRecord(id) {
  return axios.delete(Customer + `${id}`);
}

export function custStatusChange(req, id) {
  return axios.put(Customer + `${id}/`, req);
}

export function custAddRecord(req) {
  return axios.post(Customer, req);
}

export function custEditRecord(id) {
  return axios.get(Customer + `${id}/`);
}

// ------------------------------------------------------------
export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

const token = localStorage.getItem("token");

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/");
  }
  return null;
}
