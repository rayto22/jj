import { FC, useState } from 'react';
import { VocabularyUnits } from 'interfaces/types';
import {
    getLocalStorageData,
    setLocalStorageData,
    LS_RECORD,
} from 'utils/localStorageUtils';
import CherryPickWordList from '../sidebar/CherryPickWordList';

interface Props {
    fullSessionVocabulary: VocabularyUnits;
    cherryPickStorageKey?: LS_RECORD;
}

export const VocabularyOverview: FC<Props> = ({
    fullSessionVocabulary,
    cherryPickStorageKey,
}) => {
    const isSettingoOn =
        getLocalStorageData(LS_RECORD.VOCABULARY_DISPLAY_SETTING) ?? false;

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
