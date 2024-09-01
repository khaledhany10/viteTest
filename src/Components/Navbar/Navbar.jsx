import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { useContext } from 'react'
import { authContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'





export default function Navbar() {
   const navigat = useNavigate()
  function handleLogout(){
    localStorage.removeItem("token")
    setToken(null)
    navigat('/login')
  }
const {token,setToken} = useContext(authContext)
const {hearIcon} = useContext(CartContext)
  return (
    <>
    <div className="bg-emerald-500 py-4">
      <div className="container flex px-5 mx-auto items-center gap-3 py-2 justify-between">
      <div className="rightlinks flex gap-3">
      <Link to='Products'><img src={logo} alt="Fresh Cart" /></Link>
          <ul className='flex items-center gap-3 font-bold'>
            {token?  <>
              <li>
              <NavLink to='/Products'>Products</NavLink>
            </li>
            <li>
              <NavLink to='/Cart'>Cart</NavLink>
            </li>
            <li>
              <NavLink to='/Brand'>Brand</NavLink>
            </li>
            <li>
              <NavLink to='/Categories'>Categories</NavLink>
            </li>
            <li>
            <NavLink to='/Wishlist'>Wishlist : <i className="fa-solid fa-heart fa-bounce text-red-600"></i> {hearIcon}</NavLink>
            </li>
            
            </> 
            
            :   ''}

          </ul>
      </div>

      <div className="leftlinks cursor-pointer flex gap-2">
        <div>
        <i className='mx-3 text-lg fa-brands fa-facebook'></i>
        <i className='mx-3 text-lg fa-brands fa-twitter'></i>
        <i className="mx-3 text-lg fa-brands fa-linkedin"></i>
        <i className='mx-3 text-lg fa-brands fa-behance'></i>
        </div>
      
      <ul className='flex gap-2 font-bold'>
        {token?<li>
          <span className='cursor-pointer' onClick={handleLogout}>Logout</span>
        </li>: <>
        <li>
          <NavLink to='/Login'>Login</NavLink>
        </li>
        <li>
          <NavLink to='/Register'>Register</NavLink>
        </li>
        </>}


      </ul>
      </div>
      </div>
    </div>
    
    
    </>
  )
}
