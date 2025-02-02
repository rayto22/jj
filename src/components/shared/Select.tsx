import { FC, ChangeEvent } from 'react';

interface Props {
    value: string | number;
    optionsList: Array<string | number>;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: FC<Props> = ({ value, optionsList, onChange }) => {
    return (
        <select value={value} onChange={onChange}>
            {optionsList.map((optionValue) => (
                <option key={optionValue} value={optionValue}>
                    {optionValue}
                </option>
            ))}
        </select>
    );
};
