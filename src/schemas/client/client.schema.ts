import * as yup from "yup";

const createClientSchema = yup.object().shape({
  document: yup
    .string()
    .required()
    .matches(/^[0-9]*$/, "Please enter numbers only, no spaces or characters!")
    .min(11, "Document needs at least 11 digits!")
    .max(14, "Document needs 14 digits maximum!"),

  name: yup.string().required(),
  type: yup
    .string()
    .required()
    .min(6, "Must be 'Físico' or 'Jurídico'!")
    .max(8, "Must be 'Físico' or 'Jurídico'!"),
});

export default createClientSchema;
