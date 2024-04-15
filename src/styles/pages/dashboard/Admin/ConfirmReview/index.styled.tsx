import styled from "styled-components";
import { Theme } from "../../../../../types/default/types";

export const StyledConfirmReview = styled.article<{ theme: Theme }>`
  flex: 1;
  margin-top: ${({ theme }) => theme.dashboards.author.heights.navbar};
  margin-left: ${({ theme }) => theme.dashboards.author.widths.sidebar};
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
