import { FC } from 'react';
import { VocabularyUnits } from '@/interfaces/types';
import SelectableList from './SelectableList';
import Sidebar from './Sidebar';
import { LS_RECORD } from 'utils/localStorageUtils';
import { useCherryPickedWords } from 'hooks/useCherryPickedWords';
import { useReportedWords } from 'hooks/useReportedWords';

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
    const { isWordCherryPicked, cherryPickWord } = useCherryPickedWords({
        lsKey: cherryPickStorageKey,
    });
    const { isWordReported, reportWord } = useReportedWords();

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
                onSelect={cherryPickWord}
                isWordReported={isWordReported}
                onReport={reportWord}
            />
        </Sidebar>
    );
};

export default CherryPickWordList;
