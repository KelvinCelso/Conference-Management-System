import styled from "styled-components";

export const StyledDashboardPageLayout = styled.article`
  flex: 1;
  margin-top: ${({ theme }) => theme.dashboards.author.heights.navbar};
  margin-left: ${({ theme }) => theme.dashboards.author.widths.sidebar};
  background-color: antiquewhite;
`;
