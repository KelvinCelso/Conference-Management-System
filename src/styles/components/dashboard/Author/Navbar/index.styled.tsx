import { styled } from "styled-components";
import { Theme } from "../../../../../types/default/types";

export const StyledAuthorNavbar = styled.nav<{ theme: Theme }>`
  height: ${({ theme }) => theme.dashboards.author.heights.navbar};
  margin-left: ${({ theme }) => theme.dashboards.author.widths.sidebar};
  position: fixed;
  left: 0;
  background-color: #fff;
  z-index: 10;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  right: 0;
  top: 0;
  padding-inline: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  @media screen and (max-width: 1024px) {
    margin-left: 0;
    height: 50px;
    justify-content: space-between;
  }
  @media screen and (max-width: 400px) {
    padding: 0 6px;
  }

  .author-navbar__left {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;
    font-weight: 550;
    .previous-page-name {
      color: ${({ theme }) => theme.dashboards.author.colors.secondaryText};
    }
    .slash,
    .current-page-name {
      color: ${({ theme }) => theme.dashboards.author.colors.mainText};
    }
  }
  .author-navbar__right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    .search-input-box {
      width: 10rem;
      height: 1.75rem;
      position: relative;
      border-radius: 0.5rem;
      overflow: hidden;
      background-color: #fff;
      #author-navbar-search-input {
        width: 100%;
        height: 100%;
        padding-left: 1.8rem;
        border: none;
        outline: none;
        color: ${({ theme }) => theme.dashboards.author.colors.mainText};
        &::placeholder {
          font-size: 0.8rem;
          color: ${({ theme }) => theme.dashboards.author.colors.secondaryText};
        }
      }
      .search-input-button {
        position: absolute;
        top: 0;
        left: 0;
        width: 1.75rem;
        height: 1.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: none;
        background-color: #fff;
        cursor: pointer;
        svg {
          color: ${({ theme }) => theme.dashboards.author.colors.mainText};
        }
      }
    }
    .author-navbar-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      cursor: pointer;
      color: ${({ theme }) => theme.dashboards.author.colors.mainText};
      background-color: #fff;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 0.5rem;
      svg {
        width: 1rem;
      }
    }
  }
`;
