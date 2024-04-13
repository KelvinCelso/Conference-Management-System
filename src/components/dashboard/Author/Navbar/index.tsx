import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledAuthorNavbar } from "../../../../styles/components/dashboard/Author/Navbar/index.styled";
import {
  faBell,
  faMagnifyingGlass,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import SunSVG from "../../../../assets/images/SunSVG";
import { Link } from "react-router-dom";
import student4 from "../../../../assets/images/student4.jpg";
import { BellIcon, SearchIcon } from "lucide-react";

const AuthorNavbar = () => {
  return (
    <StyledAuthorNavbar>
      <div className="flex center space-x-5">
        <button className="search-input-button">
          <SearchIcon />
        </button>
        <input
          type="text"
          placeholder="Type to search"
          id="author-navbar-search-input"
        />
      </div>
      <div className="author-navbar__right">
        <button className="author-navbar-button darkmode-button">
          <SunSVG />
        </button>
        <button className="author-navbar-button reload-button">
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
        <button className="author-navbar-button darkmode-button">
          <BellIcon size={20} />
        </button>
        <div className="px-6">
          <Link to="/" className="flex items-center space-x-3">
            <span className="author-name text-lg font-semibold">
              Ibadet Ismayilov
            </span>
            <img
              className="w-10 h-10 rounded-full"
              src={student4}
              alt="author"
            />
          </Link>
        </div>
      </div>
    </StyledAuthorNavbar>
  );
};

export default AuthorNavbar;
