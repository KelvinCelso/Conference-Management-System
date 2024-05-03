type AuthorSidebarLinkType = {
  path: string;
  title: string;
  image: JSX.Element;
  id: number;
};

export type AuthorSidebarLinksType = [
  {
    className: string;
    links: AuthorSidebarLinkType[];
    id: 0;
  },
  {
    className: string;
    links: AuthorSidebarLinkType[];
    id: 1;
  }
];

export type PaperSubmissionDataType = {
  authorNames: string[];
  abstract: string;
  file: File | null;
  authors: string[];
  correspondingAuthor: string;
  projectId: string;
};
