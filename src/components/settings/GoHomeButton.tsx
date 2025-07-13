import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { PARENT_ROUTE, CHILD_ROUTE } from '@/interfaces/types';

const GoHomeButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const onClick = () => {
        if (location.pathname.includes(CHILD_ROUTE.PRACTICE_SESSION)) {
            confirm('Go Home?') && navigate(PARENT_ROUTE.HOME);
        } else {
            navigate(PARENT_ROUTE.HOME);
        }
    };

    return <RoundButton onClick={onClick}>⌂</RoundButton>;
};

const RoundButton = styled.button`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: end;
    justify-content: center;
    opacity: 0.1;
`;

export default GoHomeButton;
