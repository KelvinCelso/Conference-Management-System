import styled from "styled-components";

export const StyledRoleRadio = styled.div`
  input {
    appearance: none;
    opacity: 0;
    position: absolute;
    &:checked + label {
      background: #ebefff;
      outline: solid .15rem #0037fc;
      &::after {
        background: #0037fc;
      }
    }
    &:focus + label {
      outline-offset: .15rem;
    }
  }
  label {
    cursor: pointer;
    position: relative;
    padding: 2rem 1.5rem;
    border-radius: .5rem;
    box-shadow: 2px 2px 6px 0px #ededed;
    &::after {
      content: "";
      position: absolute;
      width: .8rem;
      height: .8rem;
      border-radius: 50%;
      right: .4rem;
      top: .5rem;
      background: #ededed;
    }
  }
`;
