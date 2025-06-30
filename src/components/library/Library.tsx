import { useState, FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LexUnits, CHILD_ROUTE } from '@/interfaces/types';

import { loadLibrary } from '@/utils/sheetManager';
import { shuffle } from '@/utils/utils';

import { ReorderButton } from './ReorderButton';
import Tomes from './Tomes';

export const Library: FC = () => {
    const navigate = useNavigate();
    const { state: locationState } = useLocation();
    const customLibrary = locationState?.customLibrary;

    const [library, setLibrary] = useState<LexUnits>();
    const [deck, setDeck] = useState<LexUnits>(null);

    useEffect(() => {
        if (customLibrary) {
            setLibrary(customLibrary);
        } else {
            loadLibrary().then((response: LexUnits) => {
                setLibrary(response);
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
            <ReorderButton
                revert={() => setLibrary((state) => [...state.reverse()])}
            />
            <Tomes
                onTomeSelect={(tome) => setDeck(shuffle(tome))}
                library={library}
            ></Tomes>
        </>
    );
};
