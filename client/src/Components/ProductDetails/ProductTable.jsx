const ProductTable = ({ response }) => {
  return (
    <section className="min-h-full w-fit rounded-md">
      <div className="mb-10 g-[#1F272F] p-4 rounded-md">
        <div className="max-h-[55vh] overflow-y-auto">
          <table className="w-[70vw] rounded-md">
            <thead
              className="w-full justify-evenly bg-gray-700 sticky top-0"
              style={{ borderRadius: "10px" }}
            >
              <tr className="text-white text-center">
                <th className="w-1/4 p-2 rounded-l-md">Product Name</th>
                <th className="w-1/4 p-2">Price</th>
                <th className="w-1/4 p-2">Quantity</th>
                <th className="w-1/4 p-2 rounded-tr-md rounded-r-md">Category</th>
              </tr>
            </thead>
            <tbody>
              {response && response.length > 0 ? (
                response.map((product, index) => (
                  <tr
                    key={index}
                    className="text-white text-center mt-10 border-b border-gray-700"
                  >
                    <td className="p-4 truncate max-w-[200px]">{product.title}</td>
                    <td className="p-2">₹{product.price}</td>
                    <td className="p-2">{product.quantity}</td>
                    <td className="p-2">{product.category}</td>
                  </tr>
                ))
              ) : (
                <tr className="text-white text-center">
                  <td colSpan="4" className="p-4">
                    No products found.
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

export default ProductTable;