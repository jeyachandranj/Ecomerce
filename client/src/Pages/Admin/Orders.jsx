import Sidenav from "../../Components/SideNavigation/Sidenav"
import OrdersTable from "../../Components/OrderDetails/OrdersTable"
import { useEffect, useState } from "react"

const Orders = () => {
  const [order, setOrder] = useState([]);
  
  useEffect(() => {
      // Fetch the data from your backend API
      const fetchProducts = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/orders");
          const data = await response.json();
          setOrder(data);
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
          <h1 className="text-white text-3xl">Orders Page</h1>

          <div className="mt-10">
            <OrdersTable  response={order}/>
          </div>
        </div>
      </section>
    );
}

export default Orders