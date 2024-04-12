import { styled } from 'styled-components';
import { Theme } from '../../../../types/default/types';

export const StyledBanner = styled.section<{ theme: Theme }>`
    padding: 4rem ${({ theme }) => theme.paddings.mainInline};
    padding-top: ${({ theme }) => theme.heights.navbarHeight};
    background-color: ${({ theme }) => theme.colors.neutralSilver};
    .banner-container{
        display: flex;
        align-items: center;
        gap: 1rem;
        &__left{
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            .welcome{
                font-size: 4rem;
                font-style: normal;
                font-weight: 600;
                color: ${({ theme }) => theme.colors.primaryLink};
            }
            .description{
                color: ${({ theme }) => theme.colors.description};
                font-size: 1rem;
                font-style: normal;
                font-weight: 400;
            }
            .registration-login{
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-top: 1rem;
            }
        }
        &__right{
            height: 100%;
            .banner-image-ring--wrapper{
                position: relative;
                z-index: 99;
            }
        }
    }
`