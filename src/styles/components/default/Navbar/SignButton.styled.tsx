import { styled, keyframes } from 'styled-components';

const signButtonSize = {
    width: '9rem',
    height: '2.6rem'
}

const signLinksFadeIn = keyframes`
    from{
        transform: scaleY(0);
        opacity: 0;
    }
    to{
        transform: scaleY(1);
        opacity: 1;
    }
`

export const StyledSignButton = styled.div`
    .button-content-wrapper{
        position: relative;
        &:hover{
            ul{
                animation: ${signLinksFadeIn} 200ms forwards ease-in-out;
            }
        }
        .button{
            display: flex;
            align-items: center;
            justify-content: center;
            width: ${signButtonSize.width};
            height: ${signButtonSize.height};
            cursor: pointer;
            background: none;
            border: none;
            background-color: #000;
            &--title{
                color: #fff;
            }
        }
        ul{
            width: 100%;
            position: absolute;
            opacity: 0;
            transform: scaleY(0);
            transform-origin: top;
            li{
                list-style-type: none;
                a{
                    width: ${signButtonSize.width};
                    height: ${signButtonSize.height};
                    background-color: #000;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-decoration: none;
                    &:hover{
                        background-color: #fff;
                        color: #000;
                    }
                }
            }
        }
    }
`