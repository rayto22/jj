import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { VocabularyUnits, VocabularyUnit } from '@/interfaces/types';
import SelectableList from './SelectableList';
import Sidebar from './Sidebar';
import {
    getLocalStorageData,
    setLocalStorageData,
} from 'utils/localStorageUtils';

interface Props {
    fullSessionVocabulary: VocabularyUnits;
    currentTaskIndex: number;
}

const CherryPickWordList: FC<Props> = ({
    fullSessionVocabulary,
    currentTaskIndex,
}) => {
    const [cherryPickedWords, setCherryPickedWords] = useState<VocabularyUnits>(
        getLocalStorageData('cherryPickedWords') || []
    );
    const findCherryPickedWord = (unit: VocabularyUnit) => {
        return cherryPickedWords.find(
            (cherryPickedWord) =>
                cherryPickedWord.eng === unit.eng &&
                cherryPickedWord.kanamoji === unit.kanamoji
        );
    };
    const isWordCherryPicked = (unit: VocabularyUnit) =>
        !!findCherryPickedWord(unit);

    const onCherryPick = (unit: VocabularyUnit) => {
        const cherryPickedWord = findCherryPickedWord(unit);
        const newCherryPickedWords = cherryPickedWord
            ? cherryPickedWords.filter((word) => cherryPickedWord !== word)
            : [...cherryPickedWords, unit];

        setLocalStorageData('cherryPickedWords', newCherryPickedWords);
        setCherryPickedWords(newCherryPickedWords);
    };

    const getProcessedWords = () => {
        const sessionWordsCopy = [...fullSessionVocabulary];

        sessionWordsCopy.length = currentTaskIndex + 1;

        return sessionWordsCopy;
    };

    return (
        <Sidebar>
            <SelectableList
                list={getProcessedWords()}
                isSelected={isWordCherryPicked}
                onSelect={onCherryPick}
            />
        </Sidebar>
    );
};

export default CherryPickWordList;
