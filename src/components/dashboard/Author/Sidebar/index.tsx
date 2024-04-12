import { Link, NavLink } from "react-router-dom";
import { StyledAuthorSidebar } from "../../../../styles/components/dashboard/Author/Sidebar/index.styled";
import student4 from '../../../../assets/images/student4.jpg';
import { authorSidebarLinks } from "../../../../data/components/dashboard/Author/Sidebar/AuthorSidebarLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const AuthorSidebar = () => {
  return (
    <StyledAuthorSidebar>
      <div className="author-sidebar__top-wrapper">
        <div className="author-sidebar__top">
          <Link to='/' className="author-profile-link">
            <img className="author-profile-picture" src={student4} alt="author" />
            <span className="author-name">Ibadet Ismayilov</span>
          </Link>
        </div>
        <div className="author-sidebar__middle">
          {
            authorSidebarLinks.map(linkBox => {
              return (
                <div key={linkBox.id} className={linkBox.className}>
                  {linkBox.heading && <h4>{linkBox.heading}</h4>}
                  <div className="links">
                    {
                      linkBox.links.map(link => {
                        return (
                          <NavLink key={link.id} className="auhtor-sidebar-link" to={`/author-dashboard${link.path}`}>
                            <div className="link-img-wrapper">
                              {link.image}
                            </div>
                            <span className="link-title">{link.title}</span>
                          </NavLink>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="author-sidebar__bottom">
        <Link className="auhtor-sidebar-link" to=''>
          <FontAwesomeIcon icon={faPowerOff} />
          <span className="link-title">Log Out</span>
        </Link>
      </div>
    </StyledAuthorSidebar>
  )
}

export default AuthorSidebar;