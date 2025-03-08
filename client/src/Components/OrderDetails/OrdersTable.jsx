import React from "react";

const OrdersTable = ({ response }) => {
  return (
    <section className="min-h-full w-full rounded-md">
      <div className="bg-[#1F272F] p-4 rounded-md">
        <div className="max-h-[70vh] overflow-y-auto">
          <table className="w-full rounded-md">
            <thead className="w-full justify-evenly bg-gray-700 sticky top-0">
              <tr className="text-white text-center">
                <th className="p-2 rounded-l-md" scope="col">
                  Product Name
                </th>
                <th className="p-2" scope="col">
                  Category
                </th>
                <th className="p-2" scope="col">
                  Price
                </th>
                <th className="p-2" scope="col">
                  Qty
                </th>
                <th className="p-2" scope="col">
                  User Name
                </th>
                <th className="p-2 rounded-tr-md rounded-r-md" scope="col">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {response && response.length > 0 ? (
                response.map((order, index) => (
                  order.products.map((product, productIndex) => (
                    <tr
                      key={`${index}-${productIndex}`}
                      className="text-white text-center mt-10 border-b border-gray-700"
                    >
                      <td className="p-2 truncate max-w-[200px]">
                        {product.BookTitle || "N/A"}
                      </td>
                      <td className="p-2">{product.category || "Education"}</td>
                      <td className="p-2">₹{product.Price || "0.00"}</td>
                      <td className="p-2 w-[50px]">{product.quantity || 1}</td>
                      <td className="p-2">
                        {order.address?.firstName || "First Name"}{" "}
                        {order.address?.lastName || "Last Name"}
                      </td>
                      <td className="p-2 truncate max-w-[200px]">
                        {order.address?.streetAddress || "Street"}{" "}
                        {order.address?.landmark || ""}{" "}
                        {order.address?.pincode || "Pincode"}
                      </td>
                    </tr>
                  ))
                ))
              ) : (
                <tr className="text-white text-center">
                  <td colSpan="6" className="p-4">
                    No Orders Yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default OrdersTable;