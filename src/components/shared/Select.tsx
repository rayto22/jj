import { FC, ChangeEvent, useLayoutEffect } from 'react';
import { STORAGE_KEY } from '@/interfaces/types';
import { loadData, saveData } from '@/utils/dataManager';

interface Props {
    value: string | number;
    optionsList: Array<string | number>;
    storageKey?: STORAGE_KEY;
    onChange: (newValue: number) => void;
}

export const Select: FC<Props> = ({
    value,
    optionsList,
    storageKey,
    onChange,
}) => {
    useLayoutEffect(() => {
        if (storageKey) {
            const savedSelectValue = +(loadData(storageKey) ?? optionsList[0]);
            onChange(savedSelectValue);
        }
    }, []);

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newSelectValue = +e.target.value;

        onChange(newSelectValue);

        if (storageKey) {
            saveData(storageKey, e.target.value);
        }
    };

    return (
        <select value={value} onChange={onSelectChange}>
            {optionsList.map((optionValue) => (
                <option key={optionValue} value={optionValue}>
                    {optionValue}
                </option>
            ))}
        </select>
    );
};
