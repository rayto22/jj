import { useState, FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { VocabularyUnit, VocabularyUnits } from 'interfaces/types';

import ProgressSection from 'components/shared/ProgressSection';
import Tomes from './Tomes';
import RepeatExerciseButton from 'components/shared/RepeatExerciseButton';
import { shuffle } from 'utils/utils';

import { CachedWordsContextWrap } from 'context/CachedWordsContext';
import { getVocabulary } from 'utils/sheetManager';
import CherryPickWordList from 'components/sidebar/CherryPickWordList';
import Settings from 'components/settings/Settings';
import FinishEverydayRepetition from './FinishEverydayRepetition';
import RepetitionTaskBlock from './RepetitionTaskBlock';
import { VocabularyOverview } from './VocabularyOverview';
import { ReorderButton } from './ReorderButton';

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
        if (state?.customVocabularyCache) {
            setVocabularyCache(state.customVocabularyCache);
        } else {
            getVocabulary().then((vocabulary: VocabularyUnits) => {
                setVocabularyCache(vocabulary);
            });
        }
    }, []);

    return (
        <CachedWordsContextWrap>
            {vocabulary ? (
                <>
                    <ProgressSection
                        taskLength={vocabulary.length}
                        taskIndex={currentTaskIndex}
                    />
                    <CherryPickWordList
                        fullSessionVocabulary={vocabulary}
                        currentTaskIndex={currentTaskIndex}
                        cherryPickStorageKey={state?.cherryPickStorageKey}
                    />
                    <Settings />
                    <VocabularyOverview
                        fullSessionVocabulary={vocabulary}
                        cherryPickStorageKey={state?.cherryPickStorageKey}
                    />
                    {!currentTask ? (
                        <>
                            <div>End</div>
                            <RepeatExerciseButton
                                onClick={shuffleAndRepeat}
                            ></RepeatExerciseButton>
                            {state?.leftToRepeatAfterFinishing ? (
                                <FinishEverydayRepetition
                                    leftToRepeatAfterFinishing={
                                        state.leftToRepeatAfterFinishing
                                    }
                                />
                            ) : null}
                        </>
                    ) : (
                        <Container>
                            <RepetitionTaskBlock
                                task={currentTask}
                                goToNextTask={goToNextTask}
                            />
                        </Container>
                    )}
                </>
            ) : (
                <>
                    <ReorderButton
                        revert={() =>
                            setVocabularyCache((state) => [...state.reverse()])
                        }
                    />
                    <Tomes
                        setVocabulary={(data) => setVocabulary(data)}
                        vocabularyCache={vocabularyCache}
                    ></Tomes>
                </>
            )}
        </CachedWordsContextWrap>
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
