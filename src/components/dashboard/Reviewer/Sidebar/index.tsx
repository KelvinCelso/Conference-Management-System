import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import company_logo from "../../../../assets/images/company-logo.webp";
import { StyledAuthorSidebar } from "@/styles/components/dashboard/Author/Sidebar/index.styled";

const ReviewerSidebar = () => {
  const location = useLocation();
  return (
    <StyledAuthorSidebar>
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
                    location.pathname === `/reviewer-dashboard`
                      ? "bg-[#0D3930]"
                      : ""
                  }`}
                  to={"/reviewer-dashboard"}
                >
                  Submitted Conferences
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </StyledAuthorSidebar>
  );
};

export default ReviewerSidebar;