import Slider from "react-slick";
import sliderimage1 from '../../assets/images/slider-2.jpeg'
import sliderimage2 from '../../assets/images/slider-image-2.jpeg'
import sliderimage3 from '../../assets/images/blog-img-1.jpeg'
import sliderimage4 from '../../assets/images/slider-image-2.jpeg'
import sliderimage5 from '../../assets/images/blog-img-1.jpeg'
import sliderimage6 from '../../assets/images/slider-image-3.jpeg'

export default function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings} arrows={false}>
      <div>
        <img className="w-full h-96" src={sliderimage1} alt="" />
      </div>
      <div>
        <img className="w-full h-96" src={sliderimage2} alt="" />
      </div>
      <div>
        <img className="w-full h-96" src={sliderimage3} alt="" />
      </div>
      <div>
        <img className="w-full h-96" src={sliderimage4} alt="" />
      </div>
      <div>
        <img className="w-full h-96" src={sliderimage5} alt="" />
      </div>
      <div>
        <img className="w-full h-96" src={sliderimage6} alt="" />
      </div>
    </Slider>
  );
}