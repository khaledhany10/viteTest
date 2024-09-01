import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout/Layout'
import Register from './Components/Rigester/Rigester'
import Login from './Components/login/Login'
import Notfound from './Components/NotFound/Notfound'
import Products from './Components/Products/Products'
import Home from './Components/Home/Home'
import Cart from './Components/cart/Cart'
import Categories from './Components/Categories/Categories'
import AuthContext from './Components/context/AuthContext'
import Brands from './Components/brand/Brands'
import ProtectRoute from './Components/ProtectRoute/ProtectRoute'
import ProductDeatails from './Components/ProductDeatails/ProductDeatails'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import CartContextProvider from './Components/context/CartContext'
import Payment from './Components/payment/Payment'
import Forgetmypassword from './Components/Forgetmypassword/Forgetmypassword'
import Verifycode from './Components/Verifycode/Verifycode'
import ResetPassword from './Components/ResetPassword/ResetPassword'
import Wishlist from './Components/Wishlist/Wishlist'
const reactQueryConfig = new QueryClient()

const router = createBrowserRouter([
  {path:'' , element: <Layout /> , children: [
    {path: '' , element: <ProtectRoute>
      <Login/>
    </ProtectRoute>},
    {path: 'Register' , element: <Register/>},
    {path: 'Login' , element: <Login /> },
    {path: 'forgetmypassword' , element: <Forgetmypassword /> },
    {path: 'Verifycode' , element: <Verifycode /> },
    {path: 'ResetPassword' , element: <ResetPassword /> },
    {path: 'Products' , element: <ProtectRoute>
      <Products /> 
    </ProtectRoute>},
    {path: 'Home' , element: <ProtectRoute>
      <Home />
    </ProtectRoute> },
    {path: 'WishList' , element: <ProtectRoute>
      <Wishlist />
    </ProtectRoute> },
    {path: 'Brand' , element: <ProtectRoute>
      <Brands />
    </ProtectRoute> },
    {path: 'payment' , element: <ProtectRoute>
      <Payment />
    </ProtectRoute> },
    {path:'ProductDeatails/:id' , element:<ProtectRoute>
      <ProductDeatails />
    </ProtectRoute> },
    {path: 'Cart' , element: <ProtectRoute>
      <Cart />
    </ProtectRoute> },
    {path: 'Categories' , element: <ProtectRoute>
      <Categories />
    </ProtectRoute> },
    {path: '*' , element: <Notfound />}
  ]}
])

function App() {
  return(
    <>
    <AuthContext>
    <CartContextProvider>
    <QueryClientProvider client={reactQueryConfig}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
    </CartContextProvider>
    </AuthContext>


    
</>
)

}

export default App
