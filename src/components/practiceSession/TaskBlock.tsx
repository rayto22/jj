import { FC } from 'react';
import { STORAGE_KEY, LexUnit } from '@/interfaces/types';
import { loadData } from '@/utils/dataManager';
import TaskOutput from './TaskOutput';
import TaskRomaji from './TaskRomaji';
import TaskHelp from './TasxHelp';
import { styled } from 'styled-components';

interface Props {
    task: LexUnit;
    goToNextTask: () => void;
}

export const TaskBlock: FC<Props> = ({ task, goToNextTask }) => {
    const isModeJpToEng = loadData(STORAGE_KEY.TRANSLATION_MODE_J_TO_E) ?? true;
    const { question, answer } = isModeJpToEng
        ? { question: task.kanamoji, answer: task.eng }
        : { question: task.eng, answer: task.kanamoji };

    return (
        <Container>
            <TaskOutput task={question} />
            <CenteredDiv>
                <TaskRomaji romaji={task.romaji} />
                <TaskHelp hint={answer} onSecondClick={goToNextTask} />
            </CenteredDiv>
        </Container>
    );
};

const Container = styled.div`
    margin: 200px auto;
    width: fit-content;
`;

const CenteredDiv = styled.div`
    margin: 5px auto;
    width: fit-content;
`;
