import { NavLink } from "react-router-dom";
import { StyledAdminSidebar } from "../../../../styles/components/dashboard/Admin/Sidebar";

const AdminSidebar = () => {
  return (
    <StyledAdminSidebar>
      <div className="admin-sidebar__top">
        <h3>Admin</h3>
      </div>
      <div className="admin-sidebar__bottom">
        <ul>
          <li>
            <NavLink to={"/admin-dashboard"}>Create Conference</NavLink>
          </li>
          <li>
            <NavLink to={"/admin-dashboard/papers"}>Papers</NavLink>
          </li>
          <li>
            <NavLink to={"/admin-dashboard/confirm-review"}>
              Confirm Review
            </NavLink>
          </li>
        </ul>
      </div>
    </StyledAdminSidebar>
  );
};

export default AdminSidebar;
