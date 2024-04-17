import { Link, NavLink } from "react-router-dom";

import company_logo from "../../../../assets/images/company-logo.webp";
import { authorSidebarLinks } from "../../../../data/components/dashboard/Author/Sidebar/AuthorSidebarLinks";
import { useLocation } from "react-router-dom";
import { StyledAuthorSidebar } from "@/styles/components/dashboard/Author/Sidebar/index.styled";
import { useRecoilState } from "recoil";
import { MenuState } from "@/lib/recoil";
import { ChevronLeft, StepBackIcon } from "lucide-react";
import { useEffect } from "react";

const AuthorSidebar = () => {
  const [opens, setOpens] = useRecoilState(MenuState);
  const location = useLocation();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setOpens(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setOpens]);

  return (
    <StyledAuthorSidebar opens={opens}>
      <div className="flex flex-col gap-2  pb-5 lg:pb-6">
        <div className="fixed bg-[#002e25] w-sidebar flex justify-between ">
          <div className="w-32 px-6 py-6">
            <Link to="/">
              <img src={company_logo} alt="author" />
            </Link>
          </div>
          <button
            className="h-10 w-10 bg-[#0D3930] rounded-lg mt-6 mr-6 flex items-center justify-center"
            onClick={() => setOpens(false)}
          >
            <ChevronLeft size={20} color="white" />
          </button>
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
                        onClick={() => setOpens(false)}
                      >
                        <div className="link-img-wrapper w-10">
                          {link.image}
                        </div>

                        <span className="link-title text-sm">{link.title}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="  ">
        <Link to="/" className="sm:hidden">
          <span className=" text-base font-semibold text-white text-[#b4ceca]">
            Ibadet Ismayilov
          </span>
        </Link>
      </div> */}
    </StyledAuthorSidebar>
  );
};

export default AuthorSidebar;
