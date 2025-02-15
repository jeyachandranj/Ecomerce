import Sidenav from "../../Components/SideNavigation/Sidenav";
import ProductTable from "../../Components/ProductDetails/ProductTable";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const AdminDashbaord = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch the data from your backend API
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <section className="flex bg-[#161B21] h-screen">
      <Sidenav />

      <div className="flex flex-col w-full m-12">
        <h1 className="text-white text-3xl">Products</h1>
        <div className="mt-10">
          <div className="flex justify-end w-[61vw]">
            <Link to={'/admin/addproduct'}>
              <button className="text-white py-2 px-3 mb-5 bg-gray-700 rounded-md ">
                <FontAwesomeIcon icon={faAdd} className="mr-2" />
                Add Product
              </button>
            </Link>
          </div>

          <ProductTable response={products}/>
        </div>
      </div>
    </section>
  );
};

export default AdminDashbaord;
