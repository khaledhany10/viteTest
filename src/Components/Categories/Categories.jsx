import { ProgressBar } from "react-loader-spinner"
import useAllCatrgories from "../../CustomHook/useAllCatrgories"

export default function Categories() {


const {data,error,isLoading} = useAllCatrgories()

if(isLoading){
  return <div className="h-screen bg-violet-800 flex justify-center items-center">
    <ProgressBar visible={true} height="200" width="200" color="#4fa94d" ariaLabel="progress-bar-loading" 
    wrapperStyle={{}} wrapperClass=""/>
  <h2 className="text-6xl text-emerald-900">Data Is Loadding</h2></div>
  }
  
  if(error){
    return <div className="text-red-500">Failed to load data</div>;
  }
  


  return <>

    <div className="container py-5 mx-auto">

        <div className="grid grid-cols-4 gap-5">


          {data.data.data.map(categ => <div key={categ._id} className="brand rounded-xl bg-blue-200">
<img src={categ.image} alt={categ.name} />
<h5>{categ.name}</h5>
</div>
 )}

        </div>
  </div>
  </>
    
  
}


