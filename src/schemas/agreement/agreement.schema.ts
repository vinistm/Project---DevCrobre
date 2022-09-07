import * as yup from "yup";

const agreementRegisterSchema = yup.object().shape({
  agreedValue: yup.number().required("Agreed value required."),
  dateAgree: yup.date().required("Date required"),
  status: yup.boolean().required("Status required."),
  debts: yup.number().required("Debt id required."),
  bank: yup.number().required("Bank ID required."),
  client: yup.string().required("Client document required."),
  user: yup.number().required("Bank ID required."),
  formOfPayment: yup.number().required("Payment id required."),
});

export default agreementRegisterSchema;
