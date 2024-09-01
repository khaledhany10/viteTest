import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export default function Forgetmypassword() {
    const navigat = useNavigate()
    function forgetpassword(values) {
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
            .then(() => {
                navigat('/Verifycode')
                toast.success("accepet your Email",{
                    position:'top-right',
                    duration:1000
                })
            })
            .catch(() => {
                toast.success("accepet your Email",{
                    position:'top-right',
                duration:1000
                })
                navigat('/Verifycode')
            });
    }

    const forgetpasswordformik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: yup.object({
            email: yup.string().email("Invalid Email").required("Invalid Email"),
        }),
        onSubmit: forgetpassword,
    });

    return (
        <>
            <form onSubmit={forgetpasswordformik.handleSubmit}>
                <div className="container mx-auto">
                    <h1 className="text-5xl font-extrabold dark:text-white">
                        Flowbite
                        <small className="font-semibold text-gray-500 dark:text-gray-400">
                        please enter your verification code
                        </small>
                    </h1>
                    <div className="relative mb-6 mt-5">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 16"
                            >
                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                            </svg>
                        </div>
                        <input
                            type="email"
                            id="input-group-1"
                            name="email"
                            value={forgetpasswordformik.values.email}
                            onChange={forgetpasswordformik.handleChange}
                            onBlur={forgetpasswordformik.handleBlur} 
                            className="bg-green-700 border border-gray-300 text-white text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 ps-10 p-2.5"
                            placeholder="Email"
                        />
                        {forgetpasswordformik.touched.email && forgetpasswordformik.errors.email ? (
                            <div className="text-red-500">{forgetpasswordformik.errors.email}</div>
                        ) : null}
                    </div>
                    <button
                        type="submit"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                    >
                        Verify
                    </button>
                </div>
            </form>
        </>
    );
}
