import { styled } from 'styled-components';
import { Theme } from '../../../../types/default/types';


export const StyledFooter = styled.footer<{ theme: Theme }>`
    background-color: ${({ theme }) => theme.colors.neutralBlack};
    padding: ${({ theme }) => theme.paddings.mainBlock} ${({ theme }) => theme.paddings.mainInline};
    /* position: absolute;
    bottom: 0;
    left: 0; */
    height: ${({ theme }) => theme.heights.footerHeight};
    width: 100%;
`