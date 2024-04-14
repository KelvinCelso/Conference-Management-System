import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledAuthorNavbar } from "../../../../styles/components/dashboard/Author/Navbar/index.styled";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { BellIcon, SearchIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const AuthorNavbar = () => {
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
      <div className="author-navbar__right">
        {/* <button className="author-navbar-button darkmode-button">
          <SunSVG />
        </button> */}

        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger>
              <button className="author-navbar-button reload-button">
                <FontAwesomeIcon icon={faRotateRight} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Refresh page</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <button className="author-navbar-button darkmode-button">
                <BellIcon size={200} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="px-6">
          <Link to="/" className="flex items-center space-x-3">
            <span className="author-name text-lg font-semibold">
              Ibadet Ismayilov
            </span>
          </Link>
        </div>
      </div>
    </StyledAuthorNavbar>
  );
};

export default AuthorNavbar;
