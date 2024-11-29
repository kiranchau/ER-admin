import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email address."
    )
    .required("Email is required."),
  password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long.")
    .max(25, "Password must not exceed 25 characters.")
    .required("Password is required.")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?([^\w\s]|[_]))(?!.* ).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
});

export const signupSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email address."
    )
    .required("Email is required."),
  password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long.")
    .max(25, "Password must not exceed 25 characters.")
    .required("Password is required.")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?([^\w\s]|[_]))(?!.* ).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Please confirm your password."),
});

export const addCustomer = yup.object().shape({
  org_name: yup
    .string()
    .required("Organization Name is required."),
  address: yup.string().required("Address is required."),
  phone_number: yup
    .string()
    .required("Phone No is required."),
  email: yup
    .string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email address."
    )
    .required("Email is required."),
});

export const forgotPassword = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email address."
    )
    .required("Email is required."),
});

export const resetSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long.")
    .max(25, "Password must not exceed 25 characters.")
    .required("Password is required.")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?([^\w\s]|[_]))(?!.* ).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Please confirm your password."),
});

export const addUser = yup.object().shape({
  first_name: yup
    .string()
    .required("First Name is required.")
    .max(50, "Minimium 50 characters are allowed."),
  last_name: yup
    .string()
    .required("Last Name is required.")
    .max(50, "Minimium 50 characters are allowed."),
  email: yup
    .string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email address."
    )
    .required("Email is required."),
  // password: yup
  //   .string()
  //   .trim()
  //   .min(8, "Password must be at least 8 characters long.")
  //   .max(25, "Password must not exceed 25 characters.")
  //   .required("Password is required.")
  //   .matches(
  //     /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?([^\w\s]|[_]))(?!.* ).{8,}$/,
  //     "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
  // ),
  is_active: yup.bool().oneOf([true], "Status must be active."),
});

export const myProfileSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("First Name is required.")
    .max(50, "Minimium 50 characters are allowed."),
  last_name: yup
    .string()
    .required("Last Name is required.")
    .max(50, "Minimium 50 characters are allowed."),
  email: yup
    .string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email address."
    )
    .required("Email is required."),
});

export const passChangeSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Please enter a valid email address."
    )
    .required("Email is required."),
  old_password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long.")
    .max(25, "Password must not exceed 25 characters.")
    .required("Password is required.")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?([^\w\s]|[_]))(?!.* ).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  new_password: yup
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters long.")
    .max(25, "Password must not exceed 25 characters.")
    .required("Password is required.")
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?([^\w\s]|[_]))(?!.* ).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
});
