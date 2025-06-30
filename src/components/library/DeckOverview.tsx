import { FC } from 'react';
import { STORAGE_KEY, LexUnits } from '@/interfaces/types';
import { loadData } from '@/utils/dataManager';
import CherryPickWordList from '../sidebar/CherryPickWordList';

interface Props {
    deck: LexUnits;
    cherryPickStorageKey?: STORAGE_KEY;
}

export const DeckOverview: FC<Props> = ({ deck, cherryPickStorageKey }) => {
    const isSettingoOn = loadData(STORAGE_KEY.DISPLAY_DECK_OVERVIEW) ?? false;

    return (
        isSettingoOn && (
            <CherryPickWordList
                deck={deck}
                cherryPickStorageKey={cherryPickStorageKey}
                sidebarIndex={2}
            />
        )
    );
};
