import { styled } from 'styled-components';
import { Theme } from '../../../../types/default/types';

export const StyledManagement = styled.section<{ theme: Theme }>`
    background-color: ${({ theme }) => theme.colors.neutralSilver};
    padding: ${({theme})=>theme.paddings.mainBlock} ${({theme})=>theme.paddings.mainInline};
    .management-container{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        &__top{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: .7rem;
            &--heading{
                color: ${({ theme }) => theme.colors.neutralGrey};
                font-size: 2.25rem;
                font-weight: 600;
                text-align: center;
                width: 40rem;
            }
            &--description{
                color: ${({ theme }) => theme.colors.description};
                font-size: 1rem;
                font-weight: 400;
            }
        }
        &__bottom{
            &--grid{
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
            }
        }
    }
`