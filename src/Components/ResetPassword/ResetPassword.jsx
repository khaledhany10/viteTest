import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useState } from "react"; 

export default function ResetPassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

   async function resetPassword(values) {
        setLoading(true);
        axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
            .then(() => {
                navigate('/Verifycode');
                toast.success("Email accepted. Verification code sent!", {
                    position: 'top-right',
                    duration: 2000
                });
            })
            .catch(() => {
                navigate('/login');
                toast.success("Email accepted. Verification code sent!", {
                    position: 'top-right',
                    duration: 2000
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }



    const ResetPasswordformik = useFormik({
        initialValues: {
            email: "",
            newPassword: ""
        },
        validationSchema: yup.object({
            email: yup.string().email("Invalid email format").required("Email is required"),
            newPassword: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
        }),
        onSubmit: resetPassword,
    });

    return (
        <div className="container mx-auto">
            <form onSubmit={ResetPasswordformik.handleSubmit}>
                <label htmlFor="email" className="block mb-2 text-xl font-extrabold text-gray-900">
                    Your email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={ResetPasswordformik.values.email}
                    onChange={ResetPasswordformik.handleChange}
                    onBlur={ResetPasswordformik.handleBlur}
                    className="bg-green-700 border border-gray-300 text-white text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 ps-10 p-2.5"
                    placeholder="Email"
                />
                {ResetPasswordformik.touched.email && ResetPasswordformik.errors.email ? (
                    <div className="text-red-500">{ResetPasswordformik.errors.email}</div>
                ) : null}

                <label htmlFor="newPassword" className="block mb-2 text-xl font-extrabold text-gray-900">
                    Password
                </label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={ResetPasswordformik.values.newPassword}
                    onChange={ResetPasswordformik.handleChange}
                    onBlur={ResetPasswordformik.handleBlur}
                    className="bg-green-700 border border-gray-300 text-white text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 ps-10 p-2.5"
                    placeholder="New Password"
                />
                {ResetPasswordformik.touched.newPassword && ResetPasswordformik.errors.newPassword ? (
                    <div className="text-red-500">{ResetPasswordformik.errors.newPassword}</div>
                ) : null}

                <button
                    type="submit"
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium mt-10 rounded-lg text-xl px-5 py-4 mb-8"
                    disabled={loading}
                >
                    {loading ? "Processing..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
}
