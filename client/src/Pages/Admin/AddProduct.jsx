import Sidenav from "../../Components/SideNavigation/Sidenav";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    quantity: "",
    category: "",
    image: null,
    description: "",
  });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Product added successfully!");
        // window.location.reload();
        // navigate("admin/dashboard");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  return (
    <section className="flex bg-[#161B21] h-screen">
      <Sidenav />
  
      <div className="flex flex-col w-full m-12">
        <h1 className="text-white text-3xl">Add Product</h1>
  
        <section className="flex justify-between mt-8">
          <div className="bg-gray-800 w-[60%] rounded-md p-4 h-[80vh] overflow-y-auto">
            <h1 className="text-white text-2xl m-3 text-center">Base Information</h1>
  
            <h1 className="text-white text-xl mt-10 ml-3">Book Title</h1>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Book Title..."
              className="w-96 m-4 p-2 border border-gray-500 rounded-md bg-zinc-700 outline-none text-gray-200"
            />
  
            <h1 className="text-white text-xl ml-3">Author Name</h1>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author Name..."
              className="w-96 m-4 p-2 border border-gray-500 rounded-md bg-zinc-700 outline-none text-gray-200"
            />
  
            <h1 className="text-white text-xl ml-3">Book Price</h1>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Book Price..."
              className="w-96 m-4 p-2 border border-gray-500 rounded-md bg-zinc-700 outline-none text-gray-200"
            />
  
            <h1 className="text-white text-xl ml-3">Book Quantity</h1>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Book Quantity..."
              className="w-96 m-4 p-2 border border-gray-500 rounded-md bg-zinc-700 outline-none text-gray-200"
            />
  
            <h1 className="text-white text-xl ml-3">Category</h1>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-96 m-4 p-2 border border-gray-500 rounded-md bg-zinc-700 outline-none text-gray-200"
            >
              <option value="" disabled>Select a category</option>
              <option value="Fictional">Fictional</option>
              <option value="Novel">Novel</option>
              <option value="Scientific">Scientific</option>
              <option value="Education">Education</option>
            </select>
  
            <h1 className="text-white text-xl ml-3">Upload Image</h1>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-96 m-4 p-2 border border-gray-500 rounded-md bg-zinc-700 outline-none text-gray-200"
            />
  
            <div className="flex flex-col ">
              <h1 className="text-white text-xl ml-3">Description</h1>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                style={{
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                }}
                placeholder="Book Description..."
                className="w-96 m-4 p-2 rounded-md border border-gray-500 resize-none bg-zinc-700 outline-none text-gray-200"
              />
  
              <button
                onClick={handleSubmit}
                className="text-white py-2 ml-5 px-3 w-fit mt-5 bg-gray-700 rounded-md"
              >
                Add Product
              </button>
            </div>
          </div>
          <div className="bg-black-800">hello</div>
        </section>
      </div>
    </section>
  );
  
};

export default AddProduct;
