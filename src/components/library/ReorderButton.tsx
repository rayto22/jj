import { FC, useState } from 'react';
// import {
//     loadData,
//     saveData,
// } from '@/utils/dataManager';

interface Props {
    revert: () => void;
}

export const ReorderButton: FC<Props> = ({ revert }) => {
    const [isReverted, setIsReverted] = useState<boolean>(
        // () => loadData(STORAGE_KEY.REVERTED_VOCABULARY_ORDER) || false
        false
    );
    const onOrderButtonClick = () => {
        // saveData(STORAGE_KEY.REVERTED_VOCABULARY_ORDER, !isReverted);
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
