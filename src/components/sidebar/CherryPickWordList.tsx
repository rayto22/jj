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
    const [reportedWords, setReportedWords] = useState<VocabularyUnits>(
        getLocalStorageData('reportedWords') || []
    );
    const findWordInList = (unit: VocabularyUnit, list: VocabularyUnits) => {
        return list.find(
            (wordInList) =>
                wordInList.eng === unit.eng &&
                wordInList.kanamoji === unit.kanamoji
        );
    };
    const isWordCherryPicked = (unit: VocabularyUnit) =>
        !!findWordInList(unit, cherryPickedWords);
    const isWordReported = (unit: VocabularyUnit) =>
        !!findWordInList(unit, reportedWords);

    const onWordSelection = (
        unit: VocabularyUnit,
        list: VocabularyUnits,
        LSName: string,
        setter: (list: VocabularyUnits) => void
    ) => {
        const wordInList = findWordInList(unit, list);
        const newList = wordInList
            ? list.filter((word) => wordInList !== word)
            : [...list, unit];

        setLocalStorageData(LSName, newList);
        setter(newList);
    };

    const onCherryPick = (unit: VocabularyUnit) =>
        onWordSelection(
            unit,
            cherryPickedWords,
            'cherryPickedWords',
            setCherryPickedWords
        );
    const onReport = (unit: VocabularyUnit) =>
        onWordSelection(unit, reportedWords, 'reportedWords', setReportedWords);

    const getProcessedWords = () => {
        const sessionWordsCopy = [...fullSessionVocabulary];

        sessionWordsCopy.length = currentTaskIndex + 1;

        return sessionWordsCopy.reverse();
    };

    return (
        <Sidebar>
            <SelectableList
                list={getProcessedWords()}
                isSelected={isWordCherryPicked}
                onSelect={onCherryPick}
                isWordReported={isWordReported}
                onReport={onReport}
            />
        </Sidebar>
    );
};

export default CherryPickWordList;
