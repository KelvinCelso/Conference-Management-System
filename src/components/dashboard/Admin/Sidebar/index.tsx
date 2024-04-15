import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import company_logo from "../../../../assets/images/company-logo.webp";

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  return (
    <aside
      className={`absolute left-0 top-0 z-9999 flex h-screen w-[250px] flex-col overflow-y-hidden bg-[#002E25] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col gap-2  py-5 lg:py-6">
        <div className="w-32 px-6">
          <Link to="/">
            <img src={company_logo} alt="author" />
          </Link>
        </div>
        <div className="mt-10">
          <div className="admin-sidebar__bottom">
            <ul>
              <li>
                <NavLink
                  className={`text-bodydark2 text-[#b4ceca] flex items-center px-6  hover:bg-[#0D3930] py-4 ${
                    location.pathname === `/admin-dashboard`
                      ? "bg-[#0D3930]"
                      : ""
                  }`}
                  to={"/admin-dashboard"}
                >
                  Create Conference
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`text-bodydark2 text-[#b4ceca] flex items-center px-6  hover:bg-[#0D3930] py-4 ${
                    location.pathname === `/admin-dashboard/papers`
                      ? "bg-[#0D3930]"
                      : ""
                  }`}
                  to={"/admin-dashboard/papers"}
                >
                  Papers
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={`text-bodydark2 text-[#b4ceca] flex items-center px-6  hover:bg-[#0D3930] py-4 ${
                    location.pathname === `/admin-dashboard/confirm-review`
                      ? "bg-[#0D3930]"
                      : ""
                  }`}
                  to={"/admin-dashboard/confirm-review"}
                >
                  Confirm Review
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
