import { FC } from 'react';
import { STORAGE_KEY, VocabularyUnits } from '@/interfaces/types';
import { loadData } from '@/utils/dataManager';
import CherryPickWordList from '../sidebar/CherryPickWordList';

interface Props {
    fullSessionVocabulary: VocabularyUnits;
    cherryPickStorageKey?: STORAGE_KEY;
}

export const VocabularyOverview: FC<Props> = ({
    fullSessionVocabulary,
    cherryPickStorageKey,
}) => {
    const isSettingoOn =
        loadData(STORAGE_KEY.VOCABULARY_DISPLAY_SETTING) ?? false;

    return (
        isSettingoOn && (
            <CherryPickWordList
                fullSessionVocabulary={fullSessionVocabulary}
                cherryPickStorageKey={cherryPickStorageKey}
                sidebarIndex={2}
            />
        )
    );
};
