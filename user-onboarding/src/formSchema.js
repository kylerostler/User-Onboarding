import * as yup from 'yup';

const formSchema = yup.object().shape({
    first_name: yup
    .string()
    .trim()
    .required('username is required')
    .min(5, 'username must be at least 5 characters'),

    email: yup
    .string()
    .email('must be a valid email')
    .required('you must enter an email'),

    password: yup
    .string()
    .required('please enter a password')
    .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
    "Password must contain at least 8 characters, one uppercase, one number and one special case character"
  ),

  terms: yup.boolean()
  .oneOf([true], 'you must accept terms')

})
export default formSchema;