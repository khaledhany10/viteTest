import axios from "axios"
import {  useContext, useState } from "react"
import { ProgressBar } from "react-loader-spinner";
import { useQuery } from "react-query";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";



export default function Wishlist() {
const [wishlist, setWishlist] = useState(null)
const {revomeWIshlist} = useContext(CartContext)





function handlebutton(productId){
      revomeWIshlist(productId)
}

function getWishlist(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
    headers:{
      token:localStorage.getItem("token")
    }
  })
  .then((resp)=> {
    setWishlist(resp.data.data)
 
  })
  .catch((error)=> {
    console.log("eroor",error);
    
  })
}

const { error } = useQuery({
  queryKey: 'getAllProductwishList',
  queryFn: getWishlist,
});

if (error) {
  return <div className="text-red-500">Failed to load data</div>;
}



  return<>


<section className="antialiased bg-gray-100 text-gray-600 px-4 overflow-auto">
  <div className="flex flex-col justify-center h-full">
    <div className="container mx-auto">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-gray-800 font-extrabold">WishList</h2>
      </header>
      <div className="overflow-hidden rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <tr>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Image</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Title</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">ratingsQuantity</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Price</div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {wishlist ? (
              wishlist.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="w-16 h-16 object-cover rounded mr-4"
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <div className="font-medium text-gray-800">{product.title}</div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">{product.title}</div>
                  </td>
                  <td className="p-2 pe-36 whitespace-nowrap">
                    <p className="text-center">{product.ratingsQuantity}</p>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium text-green-600">${product.price.toFixed(2)}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <Link>
                    <button onClick={()=> handlebutton (product._id)} className="bg-red-500 rounded-xl p-2 text-black font-extrabold">Remove</button>
                    </Link>
                  </td>
                </tr>
              ))
            )
            : (
              <tr>
                <td colSpan="4" className="p-4 text-center bg-gray-100">
                  <div className="flex flex-col items-center justify-center">
                    <ProgressBar
                      height="80"
                      width="80"
                      color="#4fa94d"
                      ariaLabel="progress-bar-loading"
                    />
                    <h2 className="text-2xl text-emerald-900 mt-4">Data Is Loading</h2>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>



  </>
}
