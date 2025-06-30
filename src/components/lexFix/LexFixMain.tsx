import { FC } from 'react';
import { LexUnit } from '@/interfaces/types';
import { useReportedWords } from '@/hooks/useReportedWords';
import SelectableList from '../sidebar/SelectableList';

export const LexFixMain: FC = () => {
    const { lexToFix, isWordReported, reportWord, resetReport } =
        useReportedWords();
    const reportWordWithConfirmation = (item: LexUnit) => {
        if (confirm('Is this word fixed?')) reportWord(item);
    };
    const resetReportWithConfirmation = () => {
        if (confirm('Reset whole report?')) resetReport();
    };

    return (
        <>
            <div>
                <button onClick={resetReportWithConfirmation}>
                    Reset report
                </button>
            </div>
            <SelectableList
                list={lexToFix}
                isSelected={() => false}
                onSelect={() => null}
                isWordReported={isWordReported}
                onReport={reportWordWithConfirmation}
            />
        </>
    );
};
