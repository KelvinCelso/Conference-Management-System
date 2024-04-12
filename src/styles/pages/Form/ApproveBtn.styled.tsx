import styled from "styled-components";
import rightArrow from "../../../assets/images/rightArrow.svg";
export const StyledApproveBtn = styled.a`
  position: relative;
  cursor: pointer;
  color: #0037fc;
  background: none;
  font-size: 1em;
  display: inline-block;
  text-transform: uppercase;
  padding: 0.5em 2em;
  border: 2px solid #0037fc;
  border-radius: .4rem;
  transition: 0.02s 0.2s cubic-bezier(0.1, 0, 0.1, 1);
  &::before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    right: 100%;
    bottom: 0;
    background-color: #0037fc;
    transition: 0.3s 0.2s cubic-bezier(0.1, 0, 0.1, 1),
      left 0.3s cubic-bezier(0.1, 0, 0.1, 1);
    z-index: -1;
  }
  &::after {
    content: "";
    display: inline-block;
    background-image: url(${rightArrow});
    position: absolute;
    top: 0;
    left: calc(100% - 3em);
    right: 3em;
    bottom: 0;
    background-size: 1.5em;
    background-repeat: no-repeat;
    background-position: center;
    transition: right 0.3s cubic-bezier(0.1, 0, 0.1, 1);
  }
  &:hover {
    padding: 0.5em 3.5em 0.5em 0.5em; /* Adjust padding values for desired effect */

    &::before {
      left: calc(100% - 3em);
      right: 0;
      transition: 0.3s cubic-bezier(0.1, 0, 0.1, 1),
        left 0.3s 0.2s cubic-bezier(0.1, 0, 0.1, 1); /* Fine-tune transition */
    }

    &::after {
      right: 0;
      transition: right 0.3s 0.2s cubic-bezier(0.1, 0, 0.1, 1); /* Fine-tune transition */
    }
  }
`;
