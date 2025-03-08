import Sidenav from "../../Components/SideNavigation/Sidenav"
import OrdersTable from "../../Components/OrderDetails/OrdersTable"
import { useEffect, useState } from "react"
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
// Import the plugin correctly
import autoTable from "jspdf-autotable";

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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title to the PDF
    doc.setFontSize(20);
    doc.text("Orders Report", 14, 22);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    
    // Create table data structure
    const tableData = [];
    
    order.forEach(orderItem => {
      orderItem.products.forEach(product => {
        tableData.push([
          product.BookTitle || "N/A",
          product.category || "Education",
          `₹${product.Price || "0.00"}`,
          product.quantity || 0,
          `${orderItem.address?.firstName || "First Name"} ${orderItem.address?.lastName || "Last Name"}`,
          `${orderItem.address?.streetAddress || "Street"} ${orderItem.address?.landmark || ""} ${orderItem.address?.pincode || "Pincode"}`
        ]);
      });
    });
    
    // Add the table to the PDF using the plugin
    autoTable(doc, {
      startY: 40,
      head: [["Product Name", "Category", "Price", "Qty", "User Name", "Address"]],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [31, 39, 47], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] }
    });
    
    // Save the PDF
    doc.save("orders-report.pdf");
  };

  return (
    <section className="flex bg-[#161B21] h-screen">
      <Sidenav />

      <div className="flex flex-col w-full m-12">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-3xl">Orders Page</h1>
          <button 
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            <FaDownload /> Download PDF
          </button>
        </div>

        <div className="mt-10">
          <OrdersTable response={order}/>
        </div>
      </div>
    </section>
  );
}

export default Orders