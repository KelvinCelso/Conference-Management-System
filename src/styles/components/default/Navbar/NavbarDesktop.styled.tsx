import styled from "styled-components";

const circleSize: string = '.5rem';

export const StyledNavbarDesktop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    .logo-container{

    }
    .navbar-links--all{
        display: flex;
        align-items: center;
        gap: 2rem;
        .navbar-links--main{
            display: flex;
            align-items: center;
            gap: 1rem;
            &__link{
                display: flex;
                align-items: center;
                gap: .3rem;
                text-decoration: none;
                border: .08rem solid #d3d2d2;
                padding: .3rem .5rem;
                border-radius: 1rem;
                font-size: 1rem;
                font-style: normal;
                font-weight: 400;
                color: #000;
                &.active{
                    .navbar-links--main__link--circle{
                        background-color: #000;
                    }
                }
                &--circle{
                    width: ${circleSize};
                    height: ${circleSize};
                    border-radius: 50%;
                    border: .1rem solid #000;
                }
                &--title{

                }
            }
        }
        .navbar-links--register{
            display: flex;
            align-items: center;
            gap: 1rem;
        }
    }
`