import { FC, useState, useEffect } from 'react';
import useSideActions from '../../hooks/useSideActions';
import styled from 'styled-components';

interface Props {
    hint: string;
    onSecondClick: () => void;
}

const TaskHelp: FC<Props> = ({ hint, onSecondClick }) => {
    const [showHelp, setShowHelp] = useState<boolean>(false);
    const onClickHandler = () => {
        if (showHelp) {
            onSecondClick();
        }

        setShowHelp((state) => !state);
    };

    useSideActions({
        rightSideActionHandler: onClickHandler,
    });

    useEffect(() => {
        setShowHelp(false);
    }, [hint]);

    return (
        <StyledButton $isVisible={showHelp}>
            {showHelp ? hint : 'Help'}
        </StyledButton>
    );
};

const StyledButton = styled.button<{ $isVisible: boolean }>`
    display: block;
    border: 0;
    border-top: 1px solid grey;
    ${({ $isVisible }) => !$isVisible && `display: none;`}
`;

export default TaskHelp;
