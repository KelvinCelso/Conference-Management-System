import { Link, NavLink } from "react-router-dom";

import company_logo from "../../../../assets/images/company-logo.webp";
import { authorSidebarLinks } from "../../../../data/components/dashboard/Author/Sidebar/AuthorSidebarLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const AuthorSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  return (
    <aside
      className={`absolute left-0 top-0 z-9999 flex h-screen w-[300px] flex-col overflow-y-hidden bg-[#002E25] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
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
          {authorSidebarLinks.map((linkBox) => {
            return (
              <div key={linkBox.id} className="mb-7">
                {linkBox.heading && (
                  <h4 className="text-[#829491]  text-lg px-6 mb-2">
                    {linkBox.heading}
                  </h4>
                )}
                <div className="links">
                  {linkBox.links.map((link) => {
                    return (
                      <NavLink
                        key={link.id}
                        className={`text-bodydark2 text-[#b4ceca] flex px-6  hover:bg-[#0D3930] py-4 ${
                          location.pathname === `/author-dashboard${link.path}`
                            ? "bg-[#0D3930]"
                            : ""
                        }`}
                        to={`/author-dashboard${link.path} `}
                      >
                        <div className="link-img-wrapper w-10">
                          {link.image}
                        </div>

                        <span className="link-title text-lg">{link.title}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="author-sidebar__bottom">
        <Link className="auhtor-sidebar-link" to="">
          <FontAwesomeIcon icon={faPowerOff} />
          <span className="link-title">Log Out</span>
        </Link>
      </div>
    </aside>
  );
};

export default AuthorSidebar;
