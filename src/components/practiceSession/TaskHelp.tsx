import { FC, useState } from 'react';
import useSideActions from '../../hooks/useSideActions';
import styled from 'styled-components';

interface Props {
    hint: string;
    onSecondClick: () => void;
    onAnswerToggle: (show: boolean) => void;
}

const TaskHelp: FC<Props> = ({ hint, onSecondClick, onAnswerToggle }) => {
    const [showHelp, setShowHelp] = useState<boolean>(false);
    const onClickHandler = () => {
        if (showHelp) {
            onSecondClick();
        }

        onAnswerToggle(!showHelp);
        setShowHelp((state) => !state);
    };

    useSideActions({
        rightSideActionHandler: onClickHandler,
    });

    return (
        <StyledDiv $isVisible={showHelp}>{showHelp ? hint : 'Help'}</StyledDiv>
    );
};

const StyledDiv = styled.div<{ $isVisible: boolean }>`
    display: block;
    text-align: center;
    border: 0;
    border-top: 1px solid grey;
    ${({ $isVisible }) => !$isVisible && `display: none;`}
`;

export default TaskHelp;
