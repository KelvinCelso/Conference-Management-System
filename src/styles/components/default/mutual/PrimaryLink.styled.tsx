import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { Theme } from '../../../../types/default/types';


export const StyledPrimaryLink = styled(Link)<{$doesarrowexist: boolean, theme: Theme}>`
    width: 8rem;
    height: 2.5rem;
    background-color: ${({theme})=>theme.colors.primaryLink};
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({$doesarrowexist})=>$doesarrowexist ? '.7rem' : '0'};
    font-size: .9rem;
    font-weight: 500;
    border-radius: .25rem;
    border: .1rem solid ${({theme})=>theme.colors.primaryLink};
    transition: background, color 200ms;
    .arrow{
        transition: transform 200ms;
        font-size: .9rem;
    }
    &:hover{
        background-color: #fff;
        color: ${({theme})=>theme.colors.primaryLink};
    }
    &:active{
        .arrow{
            transform: translateX(-0.3rem);
        }
    }
`