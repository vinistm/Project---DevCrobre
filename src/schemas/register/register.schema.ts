import * as yup from "yup";

const registerSchema = yup.object().shape({
  email: yup.string().required("Email is required.").email("Email is invalid."),
  password: yup
    .string()
    .required("Password is required.")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "The password must contain an uppercase letter, a number and a special character."
    ),
  name: yup
    .string()
    .required("Name is required.")
    .min(3, "Name requires at least 3 characters")
    .max(200, "Name cannot exceed 200 characters"),
  address: yup.string().required("Address is required"),
  telephone: yup
    .string()
    .required("Telephone is required")
    .min(6, "Telephone requires at least 6 characters")
    .max(14, "Telephone cannot exceed 14 characters"),
  position: yup.string().required("You need to declare your position."),
});

export default registerSchema;
