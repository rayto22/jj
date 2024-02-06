import { useState, useMemo, FC, useEffect } from 'react';
import { styled } from 'styled-components';
import { VocabularyUnit, VocabularyUnits } from '../../interfaces/types';
// import TaskOutput from '@/components/shared/TaskOutput';
// import TaskInput from '@/components/shared/TaskInput';
// import TaskRomaji from '@/components/shared/TaskRomaji';
// import TaskHelp from '@/components/shared/TasxHelp';

import TaskOutput from '../shared/TaskOutput';
import TaskInput from '../shared/TaskInput';
import TaskRomaji from '../shared/TaskRomaji';
import TaskHelp from '../shared/TasxHelp';
import ProgressSection from '../shared/ProgressSection';
import Mode from './Mode';
import Toms from './Toms';

import { getVocabulary } from '../../utils/sheetManager';

const Repetition: FC = () => {
    const [vocabularyCache, setVocabularyCache] = useState<VocabularyUnits>();
    const [vocabulary, setVocabulary] = useState<VocabularyUnits>(null);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const currentTask: VocabularyUnit =
        vocabulary && vocabulary[currentTaskIndex];

    const goToNextTask = () => {
        setCurrentTaskIndex((state) => state + 1);
    };

    useEffect(() => {
        getVocabulary().then((vocabulary: VocabularyUnits) => {
            setVocabularyCache(vocabulary);
        });
    }, []);

    return (
        <>
            {vocabulary ? (
                <>
                    <ProgressSection
                        taskLength={vocabulary.length}
                        taskIndex={currentTaskIndex}
                    />
                    {!currentTask ? (
                        <div>End</div>
                    ) : (
                        <Container>
                            <TaskOutput task={currentTask.kanamoji} />
                            <CenteredDiv>
                                <TaskRomaji romaji={currentTask.romaji} />
                                <TaskHelp
                                    hint={currentTask.eng}
                                    onSecondClick={goToNextTask}
                                />
                            </CenteredDiv>

                            {/* <TaskInput
                        correctAnswer={currentTask.eng}
                        onCorrectAnswer={goToNextTask}
                    /> */}
                        </Container>
                    )}
                </>
            ) : (
                <>
                    <Mode
                        setVocabulary={(data) => setVocabulary(data)}
                        vocabularyCache={vocabularyCache}
                    ></Mode>
                    <Toms
                        setVocabulary={(data) => setVocabulary(data)}
                        vocabularyCache={vocabularyCache}
                    ></Toms>
                </>
            )}
        </>
    );
};

const Container = styled.div`
    margin: 200px auto;
    width: fit-content;
`;

export const CenteredDiv = styled.div`
    margin: 5px auto;
    width: fit-content;
`;

export default Repetition;
