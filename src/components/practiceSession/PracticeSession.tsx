import { useState, FC } from 'react';
import { LexUnits, LexUnit, SESSION_TYPE } from '@/interfaces/types';

import { PracticeSessionContextProvider } from '@/context/PracticeSessionContext';

import CherryPickWordList from '@/components/sidebar/CherryPickWordList';
import Settings from '@/components/settings/Settings';
import { DeckOverview } from '@/components/library/DeckOverview';
import { SessionProgressBlock } from './SessionProgressBlock';
import { RestartExerciseButton } from './RestartExerciseButton';
import { FinishSessionButton } from './FinishSessionButton';
import { TaskBlock } from './TaskBlock';
import { useLocation } from 'react-router-dom';

interface Props {
    deck: LexUnits;
}

export const PracticeSession: FC<Props> = ({ deck }) => {
    const { state: locationState } = useLocation();

    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const currentTask: LexUnit = deck[currentTaskIndex];
    const goToNextTask = () => {
        setCurrentTaskIndex((state) => state + 1);
    };
    const shuffleAndPractice = () => {
        // setVocabulary((state) => shuffle(state));
        setCurrentTaskIndex(0);
    };

    return (
        <PracticeSessionContextProvider isSessionInProgress={true}>
            <SessionProgressBlock
                taskLength={deck.length}
                taskIndex={currentTaskIndex}
            />
            <CherryPickWordList
                fullSessionVocabulary={deck}
                currentTaskIndex={currentTaskIndex}
                cherryPickStorageKey={locationState?.cherryPickStorageKey}
            />
            <Settings />
            <DeckOverview
                fullSessionVocabulary={deck}
                cherryPickStorageKey={locationState?.cherryPickStorageKey}
            />
            {!currentTask ? (
                <>
                    <div>End</div>
                    <RestartExerciseButton onClick={shuffleAndPractice} />
                    <FinishSessionButton
                        sessionType={
                            locationState?.leftToPracticeAfterFinishing
                                ? SESSION_TYPE.EVERYDAY_PRACTICE
                                : SESSION_TYPE.REGULAR_PRACTICE
                        }
                        leftToPracticeAfterFinishing={
                            locationState?.leftToPracticeAfterFinishing
                        }
                    />
                </>
            ) : (
                <TaskBlock task={currentTask} goToNextTask={goToNextTask} />
            )}
        </PracticeSessionContextProvider>
    );
};
