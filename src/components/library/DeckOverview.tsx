import { FC } from 'react';
import { STORAGE_KEY, LexUnits } from '@/interfaces/types';
import { loadData } from '@/utils/dataManager';
import CherryPickWordList from '../sidebar/CherryPickWordList';

interface Props {
    deck: LexUnits;
}

export const DeckOverview: FC<Props> = ({ deck }) => {
    const isSettingoOn = loadData(STORAGE_KEY.DISPLAY_DECK_OVERVIEW) ?? false;

    return isSettingoOn && <CherryPickWordList deck={deck} sidebarIndex={2} />;
};
