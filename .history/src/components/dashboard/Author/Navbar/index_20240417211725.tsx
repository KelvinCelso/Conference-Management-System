import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledAuthorNavbar } from "../../../../styles/components/dashboard/Author/Navbar/index.styled";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
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

const AuthorNavbar = () => {
  const handleClick = () => {
    window.location.reload();
  };

  const [opens, setOpens] = useRecoilState(MenuState);

  return (
    <StyledAuthorNavbar>
      <div className="flex center">
        <button
          className="p-2 bg-gray-100 rounded-full lg:hidden mr-3 max-sm:mr-2"
          onClick={() => setOpens(!opens)}
        >
          <MenuIcon className="w-5 h-5 max-lg:w-4 max-lg:h-4" />
        </button>
        <button className="author-navbar-button darkmode-button mr-3 max-sm:mr-2">
          <SearchIcon className="w-5 h-5 max-lg:w-4 max-lg:h-4" />
        </button>
        <input
          type="text"
          placeholder="Type to search"
          id="author-navbar-search-input"
          className="max-lg:text-sm w-28"
        />
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
          <Tooltip>
            <TooltipTrigger className="sm:hidden">
              <Link
                to="/"
                className=" w-[33px] h-[33px] flex items-center justify-center bg-gray-100 rounded-full"
              >
                <span className="text-base font-semibold -mt-[2px]">I</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ibadet Ismayilov</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Link to="/" className="max-sm:hidden">
          <span className=" text-base font-semibold">Ibadet Ismayilov</span>
        </Link>
      </div>
    </StyledAuthorNavbar>
  );
};

export default AuthorNavbar;
