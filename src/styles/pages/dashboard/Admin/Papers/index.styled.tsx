import styled from "styled-components";
import { Theme } from "../../../../../types/default/types";

export const StyledPapers = styled.article<{ theme: Theme }>`
  flex: 1;
  margin-top: ${({ theme }) => theme.dashboards.author.heights.navbar};
  background-color: antiquewhite;
  padding: 1rem;
  table {
    width: 100%;
  }
  table,
  th,
  td {
    border: 0.1rem solid black;
    border-collapse: collapse;
    text-align: center;
  }
  th,
  td {
    padding: 0.4rem;
  }
`;
