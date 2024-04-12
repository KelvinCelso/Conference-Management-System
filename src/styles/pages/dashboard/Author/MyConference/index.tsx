import styled from "styled-components";
import { Theme } from "../../../../../types/default/types";

export const StyledMyConference = styled.article<{theme: Theme}>`
    /* width: 100%;
    height: 100%; */
    flex: 1;
    margin-top: ${({theme})=>theme.dashboards.author.heights.navbar};
    background-color: antiquewhite;
`