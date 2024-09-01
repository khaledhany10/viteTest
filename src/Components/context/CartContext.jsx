import { createContext, useEffect, useState } from "react";
import axios from "axios";

// import { useParams } from "react-router-dom";



export const CartContext = createContext()

// eslint-disable-next-line react/prop-types
export default function CartContextProvider({children}) {
  const [allProducts, setAllProduct] = useState(null)
  const [totalCartPrice, setTotalCartPrice] = useState(0)
  const [numOfCartItems, setNumOfCartItems] = useState(0)
  const [cardOwnerUser, setCardOwnerUser] = useState(null)
  const [cartId, setCartId] = useState(null)
  const [hearIcon, setHearIcon] = useState(0)
  const [removeitem, setRemoveitem] = useState(null)


  function getWishlistUser(productId){
    axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{
        headers:{
            token:localStorage.getItem("token")
        }
    })
    .then(()=> {
      setHearIcon(hearIcon + 1)
    })
    }

  function revomeWIshlist(productId){
    axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
    headers:{
      token:localStorage.getItem("token")
    }
  })
  .then( (resp)=> {
    setRemoveitem(resp.data.data)
    window.location.reload()
      setHearIcon(hearIcon - 1)
  })
  .catch( (error)=> {
  console.log("error",error);
  })
  }


  function removProduct(productId){
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
    headers:{
      token:localStorage.getItem("token")
    }
  })
  .then( (resp)=> {
    setNumOfCartItems(resp.data.numOfCartItems)
    setAllProduct(resp.data.data.products)
    setTotalCartPrice(resp.data.data.totalCartPrice)
  })
  .catch( (error)=> {
  console.log("error",error);
  
  })
  }



function deleteCartUser(){
  setAllProduct(null)
  setTotalCartPrice(0)
  setNumOfCartItems(0)
  setCartId(null)
}

async function plusProduct(productId,newCount){
  await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
    "count": newCount
  },{
    headers:{
      token:localStorage.getItem("token")
    }
  })
  .then( (resp)=> {
  setNumOfCartItems(resp.data.numOfCartItems)
  setAllProduct(resp.data.data.products)
  setTotalCartPrice(resp.data.data.totalCartPrice)

})
.catch( (error)=> {
console.log("error",error);
})
}



async function addProduct(cartId){
  await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
      "productId": cartId
  },
      {
        headers:{
          token:localStorage.getItem("token")
        }
      }
    )
    .then( (resp)=>{
      setNumOfCartItems(resp.data.numOfCartItems)
      setAllProduct(resp.data.data.products)
      setTotalCartPrice(resp.data.data.totalCartPrice)
      setCardOwnerUser(resp.data.data.cartOwner)
      setCartId(resp.data.data.cardId)
    } )
    .catch( (error)=>{
      console.log("error",error);
    } )
}





async function getCartItem(){
    await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers:{
        token:localStorage.getItem("token")
      }
    })
    .then( (resp)=> {
      setCardOwnerUser(resp.data.data.cartOwner)
      setNumOfCartItems(resp.data.numOfCartItems)
      setAllProduct(resp.data.data.products)
      setTotalCartPrice(resp.data.data.totalCartPrice)
      setCartId(resp.data.data._id)
    })
    .catch( (error)=> {
      console.log("error",error);
    })
  }

  useEffect(()=>{
    getCartItem()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return <>
  <CartContext.Provider value={{removeitem,hearIcon,revomeWIshlist
    ,getWishlistUser,deleteCartUser,addProduct,allProducts,totalCartPrice,
    numOfCartItems,getCartItem,plusProduct,removProduct,cartId,cardOwnerUser}}>
  {children}
  </CartContext.Provider>
  
  </>
}
