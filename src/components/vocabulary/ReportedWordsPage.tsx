import { FC } from 'react';
import { VocabularyUnit } from 'interfaces/types';
import { useReportedWords } from 'hooks/useReportedWords';
import SelectableList from '../sidebar/SelectableList';

export const ReportedWordsPage: FC = () => {
    const { reportedWords, isWordReported, reportWord, resetReport } =
        useReportedWords();
    const reportWordWithConfirmation = (item: VocabularyUnit) => {
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
                list={reportedWords}
                isSelected={() => false}
                onSelect={() => null}
                isWordReported={isWordReported}
                onReport={reportWordWithConfirmation}
            />
        </>
    );
};
