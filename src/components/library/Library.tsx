import { useState, FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LexUnits, CHILD_ROUTE, STORAGE_KEY, SORT } from '@/interfaces/types';

import { loadLibrary } from '@/utils/sheetManager';
import { shuffle } from '@/utils/utils';

import { SortByDateButton } from './SortByDateButton';
import Tomes from './Tomes';
import { loadData } from '@/utils/dataManager';

export const Library: FC = () => {
    const navigate = useNavigate();
    const { state: locationState } = useLocation();
    const customLibrary = locationState?.customLibrary;

    const [library, setLibrary] = useState<LexUnits>();
    const [deck, setDeck] = useState<LexUnits>(null);

    useEffect(() => {
        const isDescSorted = loadData(STORAGE_KEY.TOME_SORT) === SORT.DESC;

        if (customLibrary) {
            setLibrary(
                isDescSorted ? [...customLibrary].reverse() : customLibrary
            );
        } else {
            loadLibrary().then((response: LexUnits) => {
                setLibrary(isDescSorted ? [...response].reverse() : response);
            });
        }
    }, []);

    useEffect(() => {
        if (deck) {
            navigate(CHILD_ROUTE.PRACTICE_SESSION, {
                state: { deck },
            });
        }
    }, [deck]);

    return (
        <>
            <SortByDateButton
                sort={() => setLibrary((state) => [...state].reverse())}
            />
            <Tomes
                onTomeSelect={(tome) => setDeck(shuffle(tome))}
                library={library}
            ></Tomes>
        </>
    );
};
