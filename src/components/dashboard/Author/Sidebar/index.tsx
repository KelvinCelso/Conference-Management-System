import { Link, NavLink } from "react-router-dom";

import company_logo from "../../../../assets/images/company-logo.webp";
import { authorSidebarLinks } from "../../../../data/components/dashboard/Author/Sidebar/AuthorSidebarLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { StyledAuthorSidebar } from "@/styles/components/dashboard/Author/Sidebar/index.styled";

const AuthorSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  return (
    <StyledAuthorSidebar>
      <div className="flex flex-col gap-2  pb-5 lg:pb-6">
        <div className="fixed bg-[#002e25] w-sidebar">
          <div className="w-32 px-6 py-6">
            <Link to="/">
              <img src={company_logo} alt="author" />
            </Link>
          </div>
        </div>

        <div className="mt-[150px]">
          {authorSidebarLinks.map((linkBox) => {
            return (
              <div key={linkBox.id} className="mb-7">
                {linkBox.heading && (
                  <h4 className="text-[#829491]  text-sm px-6 mb-2">
                    {linkBox.heading}
                  </h4>
                )}
                <div className="links">
                  {linkBox.links.map((link) => {
                    return (
                      <NavLink
                        key={link.id}
                        className={`text-bodydark2 text-[#b4ceca] flex items-center px-6  hover:bg-[#0D3930] py-4 ${
                          location.pathname === `/author-dashboard${link.path}`
                            ? "bg-[#0D3930]"
                            : ""
                        }`}
                        to={`/author-dashboard${link.path} `}
                      >
                        <div className="link-img-wrapper w-10">
                          {link.image}
                        </div>

                        <span className="link-title text-base">
                          {link.title}
                        </span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="author-sidebar__bottom">
        <Link className="auhtor-sidebar-link" to="">
          <FontAwesomeIcon icon={faPowerOff} />
          <span className="link-title">Log Out</span>
        </Link>
      </div> */}
    </StyledAuthorSidebar>
  );
};

export default AuthorSidebar;
