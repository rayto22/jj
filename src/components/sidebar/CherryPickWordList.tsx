import { FC, useState } from 'react';
import { VocabularyUnits, VocabularyUnit } from '@/interfaces/types';
import SelectableList from './SelectableList';
import Sidebar from './Sidebar';
import {
    getLocalStorageData,
    setLocalStorageData,
    LS_RECORD,
} from 'utils/localStorageUtils';

interface Props {
    fullSessionVocabulary: VocabularyUnits;
    currentTaskIndex?: number;
    cherryPickStorageKey?: LS_RECORD;
    sidebarIndex?: number;
}

const CherryPickWordList: FC<Props> = ({
    fullSessionVocabulary,
    currentTaskIndex,
    cherryPickStorageKey = LS_RECORD.CHERRY_PICKED_WORDS,
    sidebarIndex = 0,
}) => {
    const [cherryPickedWords, setCherryPickedWords] = useState<VocabularyUnits>(
        () => getLocalStorageData(cherryPickStorageKey) || []
    );
    const [reportedWords, setReportedWords] = useState<VocabularyUnits>(
        () => getLocalStorageData(LS_RECORD.REPORTED_WORDS) || []
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
        LSRecord: LS_RECORD,
        setter: (list: VocabularyUnits) => void
    ) => {
        const wordInList = findWordInList(unit, list);
        const newList = wordInList
            ? list.filter((word) => wordInList !== word)
            : [...list, unit];

        setLocalStorageData(LSRecord, newList);
        setter(newList);
    };

    const onCherryPick = (unit: VocabularyUnit) =>
        onWordSelection(
            unit,
            cherryPickedWords,
            cherryPickStorageKey,
            setCherryPickedWords
        );
    const onReport = (unit: VocabularyUnit) =>
        onWordSelection(
            unit,
            reportedWords,
            LS_RECORD.REPORTED_WORDS,
            setReportedWords
        );

    const getProcessedWords = () => {
        const sessionWordsCopy = [...fullSessionVocabulary];

        if (Number.isInteger(currentTaskIndex)) {
            sessionWordsCopy.length = currentTaskIndex + 1;
        }

        return sessionWordsCopy.reverse();
    };

    return (
        <Sidebar sidebarIndex={sidebarIndex}>
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
