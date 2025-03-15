import { FC, useLayoutEffect, useState } from 'react';
import {
    getLocalStorageData,
    LS_RECORD,
    setLocalStorageData,
} from 'utils/localStorageUtils';

interface Props {
    revert: () => void;
}

export const ReorderButton: FC<Props> = ({ revert }) => {
    const [isReverted, setIsReverted] = useState<boolean>(
        // () => getLocalStorageData(LS_RECORD.REVERTED_VOCABULARY_ORDER) || false
        false
    );
    const onOrderButtonClick = () => {
        // setLocalStorageData(LS_RECORD.REVERTED_VOCABULARY_ORDER, !isReverted);
        revert();
        setIsReverted((state) => !state);
    };

    return (
        <div>
            <button onClick={onOrderButtonClick}>
                {isReverted ? 'Reverted' : 'Normal'}
                {' order'}
            </button>
        </div>
    );
};
