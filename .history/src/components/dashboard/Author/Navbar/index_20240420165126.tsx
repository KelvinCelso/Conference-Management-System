import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledAuthorNavbar } from "../../../../styles/components/dashboard/Author/Navbar/index.styled";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import {
  BellIcon,
  LogOut,
  MenuIcon,
  RefreshCwIcon,
  SearchIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRecoilState } from "recoil";
import { MenuState } from "@/lib/recoil";
import useUserData from "@/hooks/useUserData";
import { useState } from "react";

const AuthorNavbar = () => {
  const handleClick = () => {
    window.location.reload();
  };
  const navigate = useNavigate();
  const dashboardRole: any = {
    "admin-dashboard": "admin",
    "author-dashboard": "author",
    "reviewer-dashboard": "reviewer",
  };

  const [opens, setOpens] = useRecoilState(MenuState);
  const { userData, role } = useUserData();
  const pathname = window.location.pathname;
  useState(() => {
    if (userData) {
      if (role) {
        if (!pathname.includes(role))
          return navigate("/signin", {
            replace: true,
          });
      }
    }
  }, []);
  return (
    <StyledAuthorNavbar>
      <div className="flex center">
        <button
          className="p-2 bg-gray-blue rounded-full lg:hidden mr-3 max-sm:mr-2"
          onClick={() => setOpens(!opens)}
        >
          <MenuIcon className="w-5 h-5 max-lg:w-4 max-lg:h-4" />
        </button>
      </div>
      <div className="flex items-center space-x-3 max-sm:space-x-2  transition-all">
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger>
              <div
                className="p-2 bg-gray-100 rounded-full "
                onClick={handleClick}
              >
                <RefreshCwIcon className="w-5 h-5 max-lg:w-4 max-lg:h-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh page</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div className="p-2 bg-gray-100 rounded-full lg:hidden">
                <BellIcon className="w-5 h-5 max-lg:w-4 max-lg:h-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div className="p-2 bg-gray-100 rounded-full">
                <LogOut className="w-5 h-5 max-lg:w-4 max-lg:h-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Log Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {userData.firstName && (
          <Link to="/" className="max-sm:hidden">
            <p className=" text-base font-semibold">{`${
              userData.firstName + " " + userData.lastName
            }`}</p>
          </Link>
        )}
      </div>
    </StyledAuthorNavbar>
  );
};

export default AuthorNavbar;
