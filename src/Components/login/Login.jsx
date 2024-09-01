import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Login() {
  const {  setToken } = useContext(authContext);
  const { getCartItem } = useContext(CartContext);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(null);
  const [congrats, setCongrats] = useState(false);
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      getCartItem(); 
      navigate("/Products");
    }
  }, [setToken, getCartItem, navigate]);

  function login(values) {
    setIsClick(true);
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((x) => {
        setToken(x.data.token);
        localStorage.setItem("token", x.data.token);
        getCartItem();
        setCongrats(true);
        setIsClick(false);
        navigate('/Products');
        setTimeout(() => {
          setCongrats(null);
        }, 2000);
      })
      .catch((x) => {
        setIsError(x.response.data.message);
        setIsClick(false);
        setTimeout(() => {
          setIsError(null);
        }, 2000);
      });
  }

  const registerFormik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    onSubmit: login,
    validationSchema: yup.object().shape({
      email: yup.string().email("Invalid email").required(),
      password: yup.string().min(6, "Password should be at least 6 characters").max(12, "Password should be less than 12 characters"),
    }),
  });

  return (
    <>
      {congrats ? (
        <div className="p-6 text-center mb-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          Welcome Back
        </div>
      ) : ''}
      {isError ? (
        <div className="p-6 text-center mb-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
          {isError}
        </div>
      ) : ""}
      <div className="p-5">
        <h2 className="text-center pb-8 pt-10 font-bold">Login Now</h2>
        <form onSubmit={registerFormik.handleSubmit} className="max-w-md mx-auto gap-5">
          <div className="relative z-0 w-full mb-5 group">
            {registerFormik.errors.email && registerFormik.touched.email ? (
              <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                {registerFormik.errors.email}
              </div>
            ) : ""}
            <input type="email" onBlur={registerFormik.handleBlur} value={registerFormik.values.email} onChange={registerFormik.handleChange} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            {registerFormik.errors.password && registerFormik.touched.password ? (
              <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                {registerFormik.errors.password}
              </div>
            ) : ""}
            <input type="password" onBlur={registerFormik.handleBlur} value={registerFormik.values.password} onChange={registerFormik.handleChange} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {!isClick ? 'Login' : (
              <Hourglass
                visible={true}
                height="20"
                width="20"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#fff', '#fff']}
              />
            )}
          </button>
          <Link to='/forgetmypassword'>
            <h1 className="mb-4 text-3xl font-extrabold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Forget My</span> Password?
            </h1>
          </Link>
        </form>
      </div>
    </>
  );
}
