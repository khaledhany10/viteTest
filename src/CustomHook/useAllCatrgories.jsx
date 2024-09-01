import axios from "axios"
import { useQuery } from "react-query"

export default function useAllCatrgories() {
  
  
    function getAllCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      }
      
      const res = useQuery({
        queryKey:'getAllCategories',
        queryFn:getAllCategories,
        refetchOnMount:false
      })
  
  
  
  
  
  
  
  
  
    return res
}
