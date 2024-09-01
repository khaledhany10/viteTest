import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { ProgressBar } from "react-loader-spinner";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const { addProduct } = useContext(CartContext);

  async function handleAddProduct(cardOwnerUser) {
    const resFlag = await addProduct(cardOwnerUser);
    
    
    if (resFlag) {
      toast.success("Product added to cart successfully",{
        duration:2000,
        position:'top-right'
      }
    );
  } else {
    toast.success("Product added to cart successfully",{
      duration:2000,
      position:'top-right'
    });
  }
}

function fetchProductDetails() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
}
console.log(id);
const { data, error, isLoading } = useQuery({
    queryKey: 'productDetails',
    queryFn: fetchProductDetails
  });

  if (isLoading) {
    return (
      <div className="h-screen bg-violet-800 flex flex-col justify-center items-center">
        <ProgressBar visible={true} height="200" width="200" color="#4fa94d" ariaLabel="progress-bar-loading" />
        <h2 className="text-6xl text-emerald-900 mt-4">Loading Data...</h2>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Failed to load data</div>;
  }

  const objectData = data.data.data;

  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center my-8">
      <div className="w-full md:w-1/4 mb-4 md:mb-0">
        <img src={objectData.imageCover} className="rounded-xl w-full" alt={objectData.title} />
      </div>
      <div className="w-full md:w-[70%]">
        <p className="font-bold mb-2">Title: {objectData.title}</p>
        <p className="font-bold mb-2">Description: {objectData.description}</p>
        <p className="font-bold mb-2">Category: {objectData.category.name}</p>
        <p className="font-bold mb-2">Price: ${objectData.price}</p>

        <Link to="/Cart">
          <button
            onClick={() => handleAddProduct(objectData._id)}
            className="w-full bg-emerald-600 rounded-xl py-3 text-white text-2xl"
          >
            + Add To Cart
          </button>
        </Link>
      </div>
    </div>
  );
}
