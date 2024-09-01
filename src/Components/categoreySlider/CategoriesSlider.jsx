import { FallingLines, ProgressBar } from "react-loader-spinner";
import Slider from "react-slick";
import useAllCatrgories from "../../CustomHook/useAllCatrgories"



function CategoriesSlider() {

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
    
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 10,
    cssEase: "linear"
  };
  return <>
        {data.data.data? <div className="slider-container">
            <Slider {...settings}> {data.data.data.map( (categ)=> <div key={categ._id}>
          <img className="w-full h-40" src={categ.image} alt={categ.name} />
          <h6>{categ.name} </h6>
        </div> )}
      </Slider></div>: (<FallingLines
  color="#f00"
  width="100"
  visible={true}
  ariaLabel="falling-circles-loading"
  />)  }

  </>
}

export default CategoriesSlider;
