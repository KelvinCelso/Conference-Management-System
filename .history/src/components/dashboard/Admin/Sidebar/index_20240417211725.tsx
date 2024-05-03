import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import company_logo from "../../../../assets/images/company-logo.webp";
import { StyledAuthorSidebar } from "@/styles/components/dashboard/Author/Sidebar/index.styled";
import { MenuState } from "@/lib/recoil";
import { ChevronLeft } from "lucide-react";
import { useRecoilState } from "recoil";

const AdminSidebar = () => {
  const [opens, setOpens] = useRecoilState(MenuState);
  const location = useLocation();
  return (
    <StyledAuthorSidebar opens={opens}>
      <div className="flex flex-col gap-2  py-5 lg:py-6">
        <div className=" flex justify-between ">
          <div className="w-32 px-6">
            <Link to="/">
              <img src={company_logo} alt="author" />
            </Link>
          </div>
          <button
            className="h-10 w-10 bg-[#0D3930] rounded-lg lg:hidden mt-6 mr-6 flex items-center justify-center"
            onClick={() => setOpens(false)}
          >
            <ChevronLeft size={20} color="white" />
          </button>
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
                  onClick={() => setOpens(false)}
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
                  onClick={() => setOpens(false)}
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
                  onClick={() => setOpens(false)}
                >
                  Confirm Review
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </StyledAuthorSidebar>
  );
};

export default AdminSidebar;
