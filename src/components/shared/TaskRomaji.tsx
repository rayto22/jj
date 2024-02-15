import { FC, useState } from 'react';
import useSideActions from '../../hooks/useSideActions';
import styled from 'styled-components';

interface Props {
    romaji: string;
}

const TaskRomaji: FC<Props> = ({ romaji }) => {
    const [showRomaji, setShowRomaji] = useState<boolean>(false);
    const toggleRomaji = () => setShowRomaji((state) => !state);

    useSideActions({
        leftTapHandler: toggleRomaji,
        leftArrowDownHandler: toggleRomaji,
    });

    return (
        <StyledButton onClick={toggleRomaji} $isVisible={showRomaji}>
            {showRomaji ? romaji : 'Romaji'}
        </StyledButton>
    );
};

const StyledButton = styled.button<{ $isVisible: boolean }>`
    display: block;
    border: 0;
    border-top: 1px solid grey;
    ${({ $isVisible }) => !$isVisible && `display: none;`}
`;

export default TaskRomaji;
