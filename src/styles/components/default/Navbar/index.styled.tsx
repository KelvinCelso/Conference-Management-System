import styled from "styled-components";
import { Theme } from "../../../../types/default/types";

export const StyledNavbar = styled.nav<{theme: Theme}>`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    padding-inline: ${({theme})=>theme.paddings.mainInline};
    height: ${({theme})=>theme.heights.navbarHeight};
    background-color: ${({theme})=>theme.colors.primaryWhite};
    z-index: 100;
`