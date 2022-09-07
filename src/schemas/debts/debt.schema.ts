import * as yup from "yup";

const debtRegisterSchema = yup.object().shape({
  bankId: yup.number().required("Bank ID required."),
  documentClient: yup.string().required("Document required."),
  ipoc: yup.string().required("Ipoc required."),
  debtValue: yup.number().required("Value required."),
  debtOrigin: yup.number().required("Value required."),
  dateDebt: yup.date().required("Date required"),
});

export default debtRegisterSchema;
