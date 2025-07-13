import { useState, FC } from 'react';
import { LexUnits, LexUnit, STORAGE_KEY } from '@/interfaces/types';
import { saveData } from '@/utils/dataManager';
import { shuffle } from '@/utils/utils';

import { CachedWordsContextProvider } from '@/context/CachedWordsContext';
import { PracticeSessionContextProvider } from '@/context/PracticeSessionContext';

import CherryPickWordList from '@/components/sidebar/CherryPickWordList';
import Settings from '@/components/settings/Settings';
import { DeckOverview } from '@/components/library/DeckOverview';
import { SessionProgressBlock } from './SessionProgressBlock';
import { FinishSessionButton } from './FinishSessionButton';
import { TaskBlock } from './TaskBlock';
import { useLocation } from 'react-router-dom';

export const PracticeSession: FC = () => {
    const { state: locationState } = useLocation();
    const [deck, setDeck] = useState<LexUnits>(locationState?.deck ?? []);

    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const currentTask: LexUnit = deck[currentTaskIndex];
    const goToNextTask = () => {
        setCurrentTaskIndex((state) => state + 1);
    };
    const shuffleAndPractice = () => {
        setDeck((state) => shuffle(state));
        setCurrentTaskIndex(0);
    };

    return (
        <CachedWordsContextProvider>
            <PracticeSessionContextProvider isSessionInProgress={true}>
                <SessionProgressBlock
                    taskLength={deck.length}
                    taskIndex={currentTaskIndex}
                />
                <CherryPickWordList
                    deck={deck}
                    currentTaskIndex={currentTaskIndex}
                />
                <Settings />
                <DeckOverview deck={deck} />
                {!currentTask ? (
                    <>
                        <div>End</div>
                        <button onClick={shuffleAndPractice}>
                            Restart Exercise
                        </button>

                        <FinishSessionButton
                            onFinish={() => {
                                if (
                                    locationState?.leftToPracticeAfterFinishing
                                ) {
                                    saveData(
                                        STORAGE_KEY.EVERYDAY_PRACTICE_QUEUE,
                                        locationState.leftToPracticeAfterFinishing
                                    );
                                }
                            }}
                        />
                    </>
                ) : (
                    <TaskBlock task={currentTask} goToNextTask={goToNextTask} />
                )}
            </PracticeSessionContextProvider>
        </CachedWordsContextProvider>
    );
};
