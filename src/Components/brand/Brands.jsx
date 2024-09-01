import axios from "axios";
import { ProgressBar } from "react-loader-spinner";
import { useQuery } from "react-query";

export default function Brands() {

  const getAllBrands = async () => {
    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
    return response.data.data; // Return only the needed data
  };

  const { data, isLoading, error } = useQuery('getAllBrands', getAllBrands);

  if (isLoading) {
    return (
      <div className="h-screen bg-violet-800 flex justify-center items-center">
        <ProgressBar visible={true} height="200" width="200" color="#4fa94d" ariaLabel="progress-bar-loading" />
        <h2 className="text-6xl text-emerald-900">Data Is Loading...</h2>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Failed to load data</div>;
  }

  return (
    <div className="container mx-auto grid md:grid-cols-3 lg:grid-cols-5 gap-4">
      {data.map((brand) => (
        <div key={brand._id} className="product p-2">
          <img src={brand.image} className="w-full" alt={brand.name} />
          <h2 className="text-lg font-semibold bg-blue-200 rounded-lg p-2">{brand.name}</h2>
        </div>
      ))}
    </div>
  );
}
