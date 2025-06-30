import { FC } from 'react';
import { STORAGE_KEY, LexUnits } from '@/interfaces/types';
import SelectableList from './SelectableList';
import Sidebar from './Sidebar';
import { useCherryPickedWords } from '@/hooks/useCherryPickedWords';
import { useReportedWords } from '@/hooks/useReportedWords';

interface Props {
    deck: LexUnits;
    currentTaskIndex?: number;
    cherryPickStorageKey?: STORAGE_KEY;
    sidebarIndex?: number;
}

const CherryPickWordList: FC<Props> = ({
    deck,
    currentTaskIndex,
    cherryPickStorageKey = STORAGE_KEY.CHERRY_PICK_LIBRARY,
    sidebarIndex = 0,
}) => {
    const { isWordCherryPicked, cherryPickWord } = useCherryPickedWords({
        lsKey: cherryPickStorageKey,
    });
    const { isWordReported, reportWord } = useReportedWords();

    const getProcessedWords = () => {
        const sessionWordsCopy = [...deck];

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
