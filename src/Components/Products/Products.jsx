import axios from "axios"
import { ProgressBar } from "react-loader-spinner"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sliderimage1 from '../../assets/images/blog-img-1.jpeg'
import sliderimage2 from '../../assets/images/blog-img-2.jpeg'
import HomeSlider from "../Slide/HomeSlider";
import CategoriesSlider from "../categoreySlider/CategoriesSlider";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";


export default function Products() {
  const { addProduct,getWishlistUser } = useContext(CartContext);
  const [search, setSearch] = useState('')

async function handlemassege(productId) {
    const resFlag = await addProduct(productId);

    if (resFlag) {
        toast.success("Product ADD Complete", {
            duration: 3000,
            position: 'top-right'
        });
    } else {
        toast.success("Product ADD Complete", {
            duration: 3000,
            position: 'top-right'
        });
    }
}



  
  async function handlemawishlist(cartId) {
  
        
      const resFlag = await getWishlistUser(cartId);

      if (resFlag) {
        toast.success("Product Add Complete To WishList",{
            duration:3000,
            position:'top-right'
        })
    } else {
        toast.success("Product Add Complete To WishList",{
            position:'top-right',
            duration:3000
        })
    }
  }
  

  function getAllProduct() {
      return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  const { data, error, isLoading } = useQuery({
      queryKey: 'getAllProduct',
      queryFn: getAllProduct,
      refetchOnMount: false,
  });

  if (isLoading) {
      return (
          <div className="h-screen bg-violet-800 flex justify-center items-center">
              <ProgressBar visible={true} height="200" width="200" color="#4fa94d" ariaLabel="progress-bar-loading" wrapperStyle={{}} wrapperClass="" />
              <h2 className="text-6xl text-emerald-900">Data Is Loading</h2>
          </div>
      );
  }

  if (error) {
      return <div className="text-red-500">Failed to load data</div>;
  }

  return (
      <>
        
          {data.data.data ? (
              <div>
                  <div>
                      <div className="flex justify-center items-center">
                          <div className="w-[90%]">
                              <HomeSlider />
                          </div>
                          <div className="w-[10%]">
                              <div>
                                  <img className="w-full h-48" src={sliderimage1} alt="" />
                              </div>
                              <div>
                                  <img className="w-full h-48" src={sliderimage2} alt="" />
                              </div>
                          </div>
                      </div>

                      <div className="container">
                          <CategoriesSlider />
                      </div>
                    <div className="container mx-auto grid md:grid-cols-3 lg:grid-cols-1">
                    <input type="search" onChange={(e) => setSearch(e.target.value)} className="px-5 bg-blue-700 h-14 rounded-xl text-white py-10 mt-14 font-extrabold" placeholder="Search In Product"/>
                    </div>

                      <div className="container mx-auto grid md:grid-cols-3 lg:grid-cols-6">
                          {data.data.data
                              .filter((product) => {
                                  return search.toLowerCase() === '' || product.title.toLowerCase().includes(search.toLowerCase());
                              })
                              .map((product) => (
                                  <div key={product._id} className="product p-2">
                                      <Link to={`/ProductDeatails/${product._id}`}>
                                          <img src={product.imageCover} className="w-full" alt={product.title} />
                                      </Link>
                                      <h6 className="text-emerald-400">{product.category.name}</h6>
                                      <h2>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                                      <div className="flex justify-between items-center">
                                          <span className={product.priceAfterDiscount ? 'line-through text-red-500' : ''}>
                                              {product.price}
                                          </span>
                                          <span>{product.priceAfterDiscount}</span>
                                          <p>
                                              <i className="fa-solid fa-star text-yellow-300"></i>{product.ratingsAverage}
                                          </p>
                                      </div>
                                      <div className="flex justify-between items-center text-center ">
                                    <button onClick={() => handlemassege(product._id)} className="w-1/3 bg-yellow-600 rounded-xl py-3 text-white font-bold">
                                        ADD To Cart +
                                      </button>
                                    <button onClick={() => handlemawishlist(product._id)} className="w-1/3 bg-red-600 rounded-xl py-3 text-white font-bold">
                                         ADD To WishList +
                                      </button>
                                      </div>
                                  </div>
                              ))}
                      </div>
                  </div>
              </div>
          ) : (
              ''
          )}
      </>
  );
}
