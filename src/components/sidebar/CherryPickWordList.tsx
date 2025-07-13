import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { STORAGE_KEY, CHILD_ROUTE, LexUnits } from '@/interfaces/types';
import SelectableList from './SelectableList';
import Sidebar from './Sidebar';
import { useCherryPickedWords } from '@/hooks/useCherryPickedWords';
import { useReportedWords } from '@/hooks/useReportedWords';

interface Props {
    deck: LexUnits;
    currentTaskIndex?: number;
    sidebarIndex?: number;
}

const CherryPickWordList: FC<Props> = ({
    deck,
    currentTaskIndex,
    sidebarIndex = 0,
}) => {
    const { pathname } = useLocation();
    const { isWordCherryPicked, cherryPickWord } = useCherryPickedWords({
        lsKey: pathname.includes(CHILD_ROUTE.CHERRY_PICK_LIBRARY)
            ? STORAGE_KEY.SUPER_CHERRY_PICK_LIBRARY
            : STORAGE_KEY.CHERRY_PICK_LIBRARY,
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
