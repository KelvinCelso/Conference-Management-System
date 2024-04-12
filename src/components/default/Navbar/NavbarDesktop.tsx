import { StyledNavbarDesktop } from "../../../styles/components/default/Navbar/NavbarDesktop.styled";
import { navbarLinks } from "../../../data/components/default/Navbar/NavbarLinks";
import { NavLink, Link } from 'react-router-dom';
import SignButton from "./SignButton";
import { NavbarSignButtons } from "../../../data/components/default/Navbar/NavbarSignButtons";

const NavbarDesktop = () => {
  return (
    <StyledNavbarDesktop>
      <div className="logo-container">
        <Link className="logo" to={'/'}>LOGO</Link>
      </div>
      <div className="navbar-links--all">
        <div className="navbar-links--main">
          {
            navbarLinks.map(linkData => {
              return (
                <NavLink to={linkData.path} key={linkData.id} className={'navbar-links--main__link'}>
                  <div className="navbar-links--main__link--circle"></div>
                  <span className="navbar-links--main__link--title">
                    {linkData.title}
                  </span>
                </NavLink>
              )
            })
          }
        </div>
        <div className="navbar-links--register">
          <SignButton type={NavbarSignButtons.register} />
          <SignButton type={NavbarSignButtons.login} />
        </div>
      </div>
    </StyledNavbarDesktop>
  )
}

export default NavbarDesktop;