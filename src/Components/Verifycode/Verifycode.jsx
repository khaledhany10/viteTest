import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Forgetmypassword() {
  const navigat = useNavigate()

    function forgetpassword(values) {
        axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
            .then(() => {
                navigat('/ResetPassword')
                toast.success("Code IS Right",{
                    position:'top-right',
                    duration:1000
                })
            })
            .catch(() => {
                navigat('/ResetPassword')
                toast.success("Code IS Right",{
                    position:'top-right',
                    duration:1000
                })
            });
    }

    const forgetpasswordformik = useFormik({
        initialValues: {
          resetCode: "",
        },
        onSubmit: forgetpassword,
    });

    return (
        <>
            <form onSubmit={forgetpasswordformik.handleSubmit}>
                <div className="container mx-auto">
                    <h1 className="text-5xl font-extrabold dark:text-white">
                        Flowbite
                        <small className="font-semibold text-gray-500 dark:text-gray-400">
                        reset your account password
                        </small>
                    </h1>
                    <div className="relative mb-6 mt-5">
                        <input
                            type="text"
                            id="input-group-1"
                            name="resetCode"
                            value={forgetpasswordformik.values.resetCode}
                            onChange={forgetpasswordformik.handleChange}
                            onBlur={forgetpasswordformik.handleBlur} 
                            className="bg-green-700 border border-gray-300 text-white text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 ps-10 p-2.5"
                            placeholder="Code"
                        />
                        {forgetpasswordformik.touched.resetCode && forgetpasswordformik.errors.resetCode ? (
                            <div className="text-red-500">{forgetpasswordformik.errors.resetCode}</div>
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
