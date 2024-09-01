import { createContext, useState } from "react"

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext()

// eslint-disable-next-line react/prop-types
export default function AuthContext({children}) {

const [token, setToken] = useState(localStorage.getItem("token"))




  return <authContext.Provider value={{token,setToken}}>
    {children}
  </authContext.Provider>


    
}
