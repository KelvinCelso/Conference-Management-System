import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledAuthorNavbar } from "../../../../styles/components/dashboard/Author/Navbar/index.styled";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { BellIcon, RefreshCwIcon, SearchIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AuthorNavbar = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <StyledAuthorNavbar>
      <div className="flex center space-x-5">
        <button className="author-navbar-button darkmode-button">
          <SearchIcon />
        </button>
        <input
          type="text"
          placeholder="Type to search"
          id="author-navbar-search-input"
        />
      </div>
      <div className="author-navbar__right space-x-3">
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger>
              <div
                className="p-2 bg-gray-100 rounded-full"
                onClick={handleClick}
              >
                <RefreshCwIcon size={20} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh page</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div className="p-2 bg-gray-100 rounded-full">
                <BellIcon size={20} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Link to="/">
          <span className=" text-lg font-semibold">Ibadet Ismayilov</span>
        </Link>
      </div>
    </StyledAuthorNavbar>
  );
};

export default AuthorNavbar;
