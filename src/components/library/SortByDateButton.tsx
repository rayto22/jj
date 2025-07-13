import { FC, useState } from 'react';
import { loadData, saveData } from '@/utils/dataManager';
import { STORAGE_KEY, SORT } from '@/interfaces/types';
import { SortByDateAsc } from '../shared/icons/SortByDateAsc';
import { SortByDateDesc } from '../shared/icons/SortByDateDesc';

interface Props {
    sort: () => void;
}

export const SortByDateButton: FC<Props> = ({ sort }) => {
    const [isDesc, setIsDesc] = useState<boolean>(
        () => loadData(STORAGE_KEY.TOME_SORT) === SORT.DESC
    );
    const Icon = isDesc ? SortByDateDesc : SortByDateAsc;

    const onSortButtonClick = () => {
        saveData(STORAGE_KEY.TOME_SORT, isDesc ? SORT.ASC : SORT.DESC);
        setIsDesc((state) => !state);
        sort();
    };

    return (
        <div onClick={onSortButtonClick}>
            <Icon />
        </div>
    );
};
