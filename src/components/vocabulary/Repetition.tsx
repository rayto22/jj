import { useState, FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { VocabularyUnit, VocabularyUnits } from 'interfaces/types';

import TaskOutput from 'components/shared/TaskOutput';
import TaskRomaji from 'components/shared/TaskRomaji';
import TaskHelp from 'components/shared/TasxHelp';
import ProgressSection from 'components/shared/ProgressSection';
import Tomes from './Tomes';
import RepeatExerciseButton from 'components/shared/RepeatExerciseButton';
import { shuffle } from 'utils/utils';

import { getVocabulary } from 'utils/sheetManager';
import FinishEverydayRepetition from './FinishEverydayRepetition';

const Repetition: FC = () => {
    const { state } = useLocation();

    const [vocabularyCache, setVocabularyCache] = useState<VocabularyUnits>();
    const [vocabulary, setVocabulary] = useState<VocabularyUnits>(() => {
        return state?.sessionTask && shuffle(state.sessionTask);
    });
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const currentTask: VocabularyUnit =
        vocabulary && vocabulary[currentTaskIndex];

    const goToNextTask = () => {
        setCurrentTaskIndex((state) => state + 1);
    };

    const shuffleAndRepeat = () => {
        setVocabulary((state) => shuffle(state));
        setCurrentTaskIndex(0);
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
                        <>
                            <div>End</div>
                            <RepeatExerciseButton
                                onClick={shuffleAndRepeat}
                            ></RepeatExerciseButton>
                            {state.leftToRepeatAfterFinishing ? (
                                <FinishEverydayRepetition
                                    leftToRepeatAfterFinishing={
                                        state.leftToRepeatAfterFinishing
                                    }
                                />
                            ) : null}
                        </>
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
                        </Container>
                    )}
                </>
            ) : (
                <>
                    <Tomes
                        setVocabulary={(data) => setVocabulary(data)}
                        vocabularyCache={vocabularyCache}
                    ></Tomes>
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
