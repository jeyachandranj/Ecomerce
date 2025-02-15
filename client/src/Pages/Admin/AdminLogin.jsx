import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "admin@123") {
      navigate("/admin/addproduct");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <section className="flex bg-[#2B2738] h-screen justify-center">
        <div className="flex flex-col bg-[#26283b] w-full mt-20 text-center items-center ">
          <h1 className="text-white text-4xl text-center">Admin Login</h1>

          <div className="flex flex-col items-center justify-center bg-[#2b2738b] h-96 w-[30vw] rounded-lg mt-5 p-4 drop-shadow-md">
            <div className="flex flex-col items-start justify-center w-[25vw]">
              <h1 className="text-white ml-10">UserName</h1>
              <input
                required
                type="text"
                placeholder="Username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-10 py-4 w-[22vw] mt-1 ml-10 h-fit text-white bg-[#3B364C] focus:ring focus:ring-gray-800 outline-none rounded-md"
              />

              <h1 className="text-white mt-5 ml-10">Password</h1>
              <input
                required
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-10 py-4 w-[22vw] mt-1 ml-10 h-fit text-white bg-[#3B364C] focus:ring focus:ring-gray-800 outline-none rounded-md"
              />

              {error && <p className="text-red-500 ml-10 mt-2">{error}</p>}

              <button
                onClick={handleLogin}
                className="text-white rounded-md mt-7 px-10 ml-[18vh] py-3 w-[23vh] bg-blue-900 "
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
