import * as yup from "yup";

const paymentSchema = yup.object().shape({
  cash_payment: yup
    .boolean()
    .required("Specify whether the payment method is true or false."),
  installments: yup
    .boolean()
    .required("Specify whether the payment method is true or false."),
  entry_installments: yup
    .boolean()
    .required("Specify whether the payment method is true or false."),
  entry: yup
    .number()
    .required("If you have entry, specify, otherwise put the number zero."),
  installments_times: yup
    .number()
    .required(
      "If you have installment times, specify, otherwise put the number zero."
    ),
  values_installments: yup
    .number()
    .required(
      "If you have values_installments, specify, otherwise put the number zero"
    ),
  debtsId: yup.number().required(),
});

export default paymentSchema;
