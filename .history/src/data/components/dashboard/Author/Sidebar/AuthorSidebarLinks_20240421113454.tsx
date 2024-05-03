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
        path: "",
        title: "My Conference",
        image: <HomeIcon size={20} />,
        id: 0,
      },
      {
        path: "/all-conferences",
        title: "All Conferences",
        image: <BookIcon size={20} />,
        id: 1,
      },
      {
        path: "/reviewer-response",
        title: "Results",
        image: <SearchIcon size={20} />,
        id: 2,
      },
    ],
    id: 0,
  },
];
