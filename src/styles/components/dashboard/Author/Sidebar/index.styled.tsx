import { styled } from "styled-components";
import { Theme } from "../../../../../types/default/types";

export const StyledAuthorSidebar = styled.nav<{ theme: Theme }>`
  width: ${({ theme }) => theme.dashboards.author.widths.sidebar};
  height: 100%;
  overflow: hidden; /* Change this line */
  display: flex;
  background-color: #002e25;
  position: fixed;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto; /* Change this line */
  &::-webkit-scrollbar {
    width: 0; /* Hide the scrollbar */
  }

  .author-sidebar__top-wrapper {
    display: flex;
    flex-direction: column;
    .author-sidebar__top {
      padding-bottom: 1rem;
      border-bottom: 0.1rem solid rgba(0, 0, 0, 0.2);
      .author-profile-link {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme.dashboards.author.gaps.mainLinks};
        text-decoration: none;
        .author-profile-picture {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
        }
        .author-name {
        }
      }
    }
    .author-sidebar__middle {
      padding-top: 1rem;
      .links {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;
        a {
          display: flex;
          align-items: center;
          gap: ${({ theme }) => theme.dashboards.author.gaps.mainLinks};
          height: 3.375rem;
          border-radius: 0.938rem;
          padding-inline: 1rem;
          text-decoration: none;
          &.active {
            background-color: #fff;
            box-shadow: 0px 3.5px 5.5px 0px rgba(0, 0, 0, 0.02);
            .link-img-wrapper {
              background-color: ${({ theme }) =>
                theme.dashboards.author.colors.mainLinkImgWrapper};
              svg {
                color: #fff;
              }
            }
            .link-title {
              color: ${({ theme }) => theme.dashboards.author.colors.mainText};
            }
          }
          .link-img-wrapper {
            padding: 0.469rem;
            background-color: #fff;
            border-radius: 0.75rem;
            svg {
              color: ${({ theme }) =>
                theme.dashboards.author.colors.mainLinkImgWrapper};
              font-size: 0.9rem;
            }
          }
          .link-title {
            font-size: 0.8rem;
            font-style: normal;
            font-weight: 700;
            color: ${({ theme }) =>
              theme.dashboards.author.colors.secondaryText};
          }
        }
      }
      &--main-links {
      }
      &--account-links {
        h4 {
          margin: 1rem;
          font-weight: 700;
          font-size: 0.9rem;
          color: ${({ theme }) => theme.dashboards.author.colors.mainText};
        }
      }
    }
  }
`;
