import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { AuthorSidebarLinksType } from "../../../../../types/dashboard/Author/types";
import { BookIcon, HomeIcon, SearchIcon } from "lucide-react";

export const authorSidebarLinks: AuthorSidebarLinksType = [
  {
    heading: "MENU",
    className: "author-sidebar__middle--main-links",
    links: [
      {
        path: "/",
        title: "My Conference",
        image: <HomeIcon />,
        id: 0,
      },
      {
        path: "/all-conferences",
        title: "All Conferences",
        image: <BookIcon />,
        id: 1,
      },
      {
        path: "/reviewer-response",
        title: "Results",
        image: <SearchIcon />,
        id: 2,
      },
      {
        path: "/x",
        title: "Ipsum Lorem",
        image: <FontAwesomeIcon icon={faHouse} />,
        id: 3,
      },
    ],
    id: 0,
  },
  {
    heading: "ACCOUNT PAGES",
    className: "author-sidebar__middle--account-links",
    links: [
      {
        path: "/x",
        title: "Profile",
        image: <FontAwesomeIcon icon={faHouse} />,
        id: 0,
      },
      {
        path: "/x",
        title: "Settings",
        image: <FontAwesomeIcon icon={faHouse} />,
        id: 1,
      },
      {
        path: "x",
        title: "Lorem",
        image: <FontAwesomeIcon icon={faHouse} />,
        id: 2,
      },
      {
        path: "/x",
        title: "Ipsum",
        image: <FontAwesomeIcon icon={faHouse} />,
        id: 3,
      },
    ],
    id: 1,
  },
];
