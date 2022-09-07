import * as yup from "yup";

const historySchema = yup.object().shape({
  date_contact: yup.string().required("Date is required."),
  agreement: yup.boolean().required("Agreement status is required."),
  note: yup.string().required("Note is required."),
  debtId: yup.number().required("Report the debt correctly."),
  userId: yup.number().required("Report the user correctly."),
});

export default historySchema;
