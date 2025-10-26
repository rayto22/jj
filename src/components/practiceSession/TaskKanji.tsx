import { FC } from 'react';
import { styled } from 'styled-components';

interface Props {
    kanji: string;
    isAnswerShown: boolean;
}

export const TaskKanji: FC<Props> = ({ kanji, isAnswerShown }) => {
    if (!kanji || kanji.trim() === '-') return null;

    if (!isAnswerShown && kanji.includes('　')) return null;

    return <TaskContainer>{kanji}</TaskContainer>;
};

const TaskContainer = styled.div`
    text-align: center;
    font-size: 50px;
    border-top: 1px solid grey;
`;
