import { Link, useLocation } from "react-router-dom";

const Sidenav = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <section className="flex px-10 flex-col bg-[#1F272F] text-white h-screen w-64 items-center justify-start">
        <h1 className="mt-10 text-4xl text-white">Dashboard</h1>
        <ul className="mt-10 text-xl space-y-3">
        <Link to="/dashboard">
            <li
              className={`p-2 rounded-md px-10 mb-4 ${isActive("/dashboard") ? "bg-[#2E3A46]" : ""}`}
            >
              DashBoard
            </li>
          </Link>
          <Link to="/admin/dashboard">
            <li
              className={`p-2 rounded-md px-10 mb-4 ${isActive("/admin/dashboard") ? "bg-[#2E3A46]" : ""}`}
            >
              Products
            </li>
          </Link>
          <Link to="/admin/orders">
            <li
              className={`p-2 rounded-md px-10 mb-4 ${isActive("/admin/orders") ? "bg-[#2E3A46]" : ""}`}
            >
              Orders
            </li>
          </Link>
        </ul>
      </section>
    </>
  );
};

export default Sidenav;
