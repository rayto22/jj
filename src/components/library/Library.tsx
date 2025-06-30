import { useState, FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LexUnits } from '@/interfaces/types';

import Tomes from './Tomes';
import { shuffle } from '@/utils/utils';

import { CachedWordsContextProvider } from '@/context/CachedWordsContext';

import { loadLibrary } from '@/utils/sheetManager';

import { PracticeSession } from '@/components/practiceSession/PracticeSession';
import { ReorderButton } from './ReorderButton';

export const Library: FC = () => {
    const { state: locationState } = useLocation();

    const [library, setLibrary] = useState<LexUnits>();
    const [deck, setDeck] = useState<LexUnits>(() => {
        return locationState?.sessionTask && shuffle(locationState.sessionTask);
    });

    useEffect(() => {
        if (locationState?.customLibrary) {
            setLibrary(locationState.customLibrary);
        } else {
            loadLibrary().then((response: LexUnits) => {
                setLibrary(response);
            });
        }
    }, []);

    return (
        <CachedWordsContextProvider>
            {deck ? (
                <PracticeSession deck={deck} />
            ) : (
                <>
                    <ReorderButton
                        revert={() =>
                            setLibrary((state) => [...state.reverse()])
                        }
                    />
                    <Tomes
                        onTomeSelect={(tome) => setDeck(tome)}
                        library={library}
                    ></Tomes>
                </>
            )}
        </CachedWordsContextProvider>
    );
};
