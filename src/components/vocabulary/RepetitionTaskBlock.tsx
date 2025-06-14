import { FC } from 'react';
import { STORAGE_KEY, VocabularyUnit } from '@/interfaces/types';
import { loadData } from '@/utils/dataManager';
import TaskOutput from '../shared/TaskOutput';
import TaskRomaji from '../shared/TaskRomaji';
import TaskHelp from '../shared/TasxHelp';
import { CenteredDiv } from './Repetition';

interface Props {
    task: VocabularyUnit;
    goToNextTask: () => void;
}

const RepetitionTaskBlock: FC<Props> = ({ task, goToNextTask }) => {
    const isModeJpToEng = loadData(STORAGE_KEY.TRANSLATION_MODE_J_TO_E) ?? true;
    const { question, answer } = isModeJpToEng
        ? { question: task.kanamoji, answer: task.eng }
        : { question: task.eng, answer: task.kanamoji };

    return (
        <>
            <TaskOutput task={question} />
            <CenteredDiv>
                <TaskRomaji romaji={task.romaji} />
                <TaskHelp hint={answer} onSecondClick={goToNextTask} />
            </CenteredDiv>
        </>
    );
};

export default RepetitionTaskBlock;
