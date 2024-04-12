import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledAuthorNavbar } from "../../../../styles/components/dashboard/Author/Navbar/index.styled";
import { faBell, faMagnifyingGlass, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import SunSVG from "../../../../assets/images/SunSVG";

const AuthorNavbar = () => {
  return (
    <StyledAuthorNavbar>
      <div className="author-navbar__left">
        <span className="previous-page-name">Author Dashboard</span>
        <span className="slash">/</span>
        <span className="current-page-name">My Conference</span>
      </div>
      <div className="author-navbar__right">
        <label className="search-input-box" htmlFor="author-navbar-search-input">
          <input type="text" placeholder="Search" id="author-navbar-search-input"/>
          <button className="search-input-button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </label>
        <button className="author-navbar-button darkmode-button">
          <SunSVG />
        </button>
        <button className="author-navbar-button reload-button">
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
        <button className="author-navbar-button notifications-button">
          <FontAwesomeIcon icon={faBell} />
        </button>
      </div>
    </StyledAuthorNavbar>
  )
}

export default AuthorNavbar;