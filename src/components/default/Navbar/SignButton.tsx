import { Link } from 'react-router-dom';
import { StyledSignButton } from '../../../styles/components/default/Navbar/SignButton.styled';
import { SignButtonProps } from '../../../types/default/props';


const SignButton: React.FC<SignButtonProps> = ({ type }) => {
    return (
        <StyledSignButton>
            <div className='button-content-wrapper'>
                <button className='button'>
                    <span className='button--title'>
                        {type.title}
                    </span>
                </button>
                <ul>
                    {
                        type.types.map(linkData => {
                            return (
                                <li key={linkData.id}>
                                    <Link to={linkData.path}>{linkData.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </StyledSignButton>
    )
}

export default SignButton;