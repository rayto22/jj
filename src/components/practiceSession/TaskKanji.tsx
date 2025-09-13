import { FC } from 'react';
import { styled } from 'styled-components';

interface Props {
    kanji: string;
}

export const TaskKanji: FC<Props> = ({ kanji }) => {
    if (!kanji || kanji.trim() === '-') return null;

    return <TaskContainer>{kanji}</TaskContainer>;
};

const TaskContainer = styled.div`
    text-align: center;
    font-size: 40px;
    border-top: 1px solid grey;
`;
