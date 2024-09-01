import axios from "axios"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import { CartContext } from "../context/CartContext"
import toast from "react-hot-toast"

export default function Payment() {
    const [isonline, setIsOnline] = useState(false)
const {cartId,deleteCartUser} = useContext(CartContext)

 function creatCachorder (values){
    const backendRes = {
        shippingAddress : values
    }
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,backendRes,
        {
            headers:{
                token:localStorage.getItem("token")
            }
        }
        )
        .then(()=> {
            deleteCartUser()
            toast.success("Payment Is Succeful",{
                duration:2000,
                position:'top-right'
            })
        })
        .catch(()=> {
            toast.error("Payment Is Failed",{
                duration:2000,
                position:'top-left'
            })
        })

}
function onlinePayment(values){
    const backendRes = {
        shippingAddress : values
    }
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,backendRes,
        {
            headers:{
                token:localStorage.getItem("token")
            },
            params:{
                url:'http://localhost:5173'
            }
        }
        )
        .then((res)=> {
            window.open(res.data.session.url,"self")
        })
        .catch((error)=> {
            console.log("error",error);
        })

}



function detectAndCall(values){
    if(isonline){
        onlinePayment(values)
    }else{
        creatCachorder (values)
    }
}



const paymentFormic = useFormik({
    initialValues:{
        details : '',
        city : '',
        phone : ''
    },
    onSubmit :detectAndCall
})


  return<>
  
  
  
  
  <form onSubmit={paymentFormic.handleSubmit} className="max-w-md mx-auto gap-5">
          <div className="relative z-0 w-full mb-5 group">
            {paymentFormic.errors.details && paymentFormic.touched.details ? <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {paymentFormic.errors.details}</div> :   ""}
            <input type="text" onBlur={paymentFormic.handleBlur} value={paymentFormic.values.details} onChange={paymentFormic.handleChange} name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/><label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            {paymentFormic.errors.phone && paymentFormic.touched.phone?<div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {paymentFormic.errors.phone}</div>:""}
            <input type="tel" onBlur={paymentFormic.handleBlur} value={paymentFormic.values.phone} onChange={paymentFormic.handleChange} name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            {paymentFormic.errors.city && paymentFormic.touched.city?<div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {paymentFormic.errors.city}</div>:""}
            <input type="text" onBlur={paymentFormic.handleBlur} value={paymentFormic.values.city} onChange={paymentFormic.handleChange} name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
            <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password
            </label>
          </div>
          <button onClick={()=> setIsOnline(false)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Pay Your Products
          </button>
          <button onClick={()=> setIsOnline(true)} type="submit" className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
           Online Payment
          </button>
        </form>
  
  
  
  
  
  </>
}
