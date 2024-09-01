import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { allProducts, totalCartPrice, numOfCartItems, plusProduct, removProduct } = useContext(CartContext);
  
  function hanldeIpdateCount(productId, newCount) {
      plusProduct(productId, newCount);
  }
  function handleRemoveItem(productId) {
    removProduct(productId);
  }
  

  useEffect(() => {
    const pageLoaded = localStorage.getItem('cartPageLoaded');

    if (!pageLoaded) {
      localStorage.setItem('cartPageLoaded', 'true');
      window.location.reload();
    }

    return () => {
      localStorage.removeItem('cartPageLoaded');
    };
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-center text-teal-900 font-bold">Total Price: {totalCartPrice}</h2>
        <p className="text-center text-black font-bold">Your Cart Includes: {numOfCartItems} Different Items</p>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xl text-black uppercase bg-white">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3">Qty</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {allProducts ? allProducts.map((product) => (
                <tr key={product._id} className="border-b bg-white hover:bg-gray-50 hover:transition-all dark:hover:bg-emerald-600 text-xl">
                  <td className="p-4">
                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title} />
                  </td>
                  <td className="px-6 py-4 font-bold text-black">{product.product.title}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button onClick={() => hanldeIpdateCount(product.product._id,product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100" type="button">
                        <span className="sr-only">Decrease Quantity</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                      </button> 

                      <input type="number" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg text-center font-extrabold block px-2.5 py-1" value={product.count} />

                      <button onClick={() => hanldeIpdateCount(product.product._id,product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100" type="button">
                        <span className="sr-only">Increase Quantity</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>

                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-black">{product.price}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => handleRemoveItem(product.product._id)} className="font-medium text-red-600 hover:underline">
                      Remove
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">No products in the cart</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Link to="/payment">
          <button className="bg-blue-900 text-white text-center w-full py-5 p-4 rounded-xl">Pay Your Product</button>
        </Link>
      </div>
    </>
  );
}
