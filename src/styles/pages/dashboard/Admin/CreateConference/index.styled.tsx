import styled from "styled-components";
import { Theme } from "../../../../../types/default/types";


export const StyledCreateConference = styled.article<{theme: Theme}>`
    flex: 1;
    margin-top: ${({ theme }) => theme.dashboards.author.heights.navbar};
    background-color: antiquewhite;
    padding: 1rem;
`