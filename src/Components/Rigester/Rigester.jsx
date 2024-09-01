import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Hourglass } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Register() {
  const navigat = useNavigate()
  const [iserror, setIserror] = useState(null)
  const [congrat, setCongrat] = useState(false)
  const [isclikc, setIsclikc] = useState(false)
  function register(values) {
    setIsclikc(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then(function () {
        setCongrat(true)
        setIsclikc(false)
        console.log(values)
        navigat('/login')
        setTimeout(() => {
          setCongrat(null)
        }, 2000);
      })
      .catch(function (x) {
        setIserror(x.response.data.message)
        setIsclikc(false)
        setTimeout(() => {
          setIserror(null)
        }, 2000);
      });
  }
  const registerformik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      password: "",
      rePassword: "",
      email: "",
    },
    onSubmit: register,
    validationSchema: yup.object().shape({
      name: yup.string().min(3, "dont less 3 char").max(12,"dont more").required(),
      email: yup.string().email("Invalid email").required(),
      phone: yup.string().required("phone req.").matches(/01[0125][0-9]{8}/),
      password: yup.string().min(6, "dont less 6 ").max(12, "more than 12 char"),
      rePassword: yup.string().oneOf([yup.ref("password")], "dont match with password"),
    }),
  });
  return (
    <>

    {  congrat  ?<div className="p-6 text-center mb-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
      Congratulations
    </div>:''}
      {  iserror  ? <div className="p-6 text-center mb-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
        {iserror}
      </div>:  ""}
      <div className="p-5">
        <h2 className="text-center pb-8 pt-10 font-bold">Register Now</h2>
        <form onSubmit={registerformik.handleSubmit} className="max-w-md mx-auto gap-5">
          <div className="relative z-0 w-full mb-5 group">
            <input type="text" onBlur={registerformik.handleBlur} value={registerformik.values.name} onChange={registerformik.handleChange} name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/><label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            {registerformik.errors.name && registerformik.touched.name? <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {registerformik.errors.name}</div>  :  "" }
          </div>
          <div className="relative z-0 w-full mb-5 group">
            {registerformik.errors.email && registerformik.touched.email ? <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {registerformik.errors.email}</div> :   ""}
            <input type="email" onBlur={registerformik.handleBlur} value={registerformik.values.email} onChange={registerformik.handleChange} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/><label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            {registerformik.errors.phone && registerformik.touched.phone?<div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {registerformik.errors.phone}</div>:""}
            <input type="tel" onBlur={registerformik.handleBlur} value={registerformik.values.phone} onChange={registerformik.handleChange} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/><label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            {registerformik.errors.password && registerformik.touched.password?<div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {registerformik.errors.password}</div>:""}
            <input type="password" onBlur={registerformik.handleBlur} value={registerformik.values.password} onChange={registerformik.handleChange} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            {registerformik.errors.rePassword && registerformik.touched.rePassword?<div className="p-2 mb-2text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {registerformik.errors.rePassword}</div>:''}
            <input type="password" onBlur={registerformik.handleBlur} value={registerformik.values.rePassword} onChange={registerformik.handleChange} name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
            <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword
            </label>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {!isclikc ?  'Submit':(<Hourglass
  visible={true}
  height="20"
  width="20"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass=""
  colors={['#fff', '#fff']}
  />)}
          </button>
        </form>
      </div>
    </>
  );
}
