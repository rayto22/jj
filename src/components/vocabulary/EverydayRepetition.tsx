import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { VocabularyUnits } from 'interfaces/types';
import { getVocabulary } from 'utils/sheetManager';
import {
    getLocalStorageData,
    setLocalStorageData,
} from 'utils/localStorageUtils';
import { shuffle } from 'utils/utils';

const EverydayRepetition = () => {
    const navigate = useNavigate();

    const localStorageData = {
        updateDate:
            getLocalStorageData('vocabularyUpdateDate') ?? 'not loaded yet',
        vocabulary: getLocalStorageData('vocabulary') ?? [],
        leftToRepeat: getLocalStorageData('vocabularyLeftToRepeat') ?? [],
    };

    const [vocabulary, setVocabulary] = useState<VocabularyUnits>(
        localStorageData.vocabulary
    );

    const loadLatestVocabulary = () => {
        getVocabulary().then((payloadUnshaffled: VocabularyUnits) => {
            const payload = shuffle(payloadUnshaffled);

            setLocalStorageData('vocabulary', payload);
            setLocalStorageData('vocabularyLeftToRepeat', payload);
            setLocalStorageData(
                'vocabularyUpdateDate',
                new Date().toLocaleString()
            );
            localStorageData.vocabulary = payload;
            setVocabulary(payload);
        });
    };

    const startSession = () => {
        const sessionTask = localStorageData.leftToRepeat.slice(0, 100);
        const leftToRepeat = localStorageData.leftToRepeat[100]
            ? localStorageData.leftToRepeat.slice(
                  99,
                  localStorageData.leftToRepeat.length - 1
              )
            : [];

        navigate('/everydayRepetition/session', {
            state: {
                sessionTask,
                leftToRepeatAfterFinishing: leftToRepeat,
            },
        });
    };

    const clearAll = () => {
        setLocalStorageData('vocabulary', []);
        setLocalStorageData('vocabularyLeftToRepeat', []);
        setLocalStorageData('vocabularyUpdateDate', '');
        setVocabulary([]);
    };

    return (
        <div>
            <StatusTable>
                <tbody>
                    <tr>
                        <StatusHeading>Update date:</StatusHeading>
                        <td>{localStorageData.updateDate}</td>
                    </tr>
                    <tr>
                        <StatusHeading>Full length:</StatusHeading>
                        <td>{vocabulary.length}</td>
                    </tr>
                    <tr>
                        <StatusHeading>Left to repeat:</StatusHeading>
                        <td>{localStorageData.leftToRepeat.length}</td>
                    </tr>
                </tbody>
            </StatusTable>

            <button onClick={loadLatestVocabulary}>
                Load latest vocabulary
            </button>
            <button onClick={startSession}>Start Session</button>
            <button onClick={clearAll}>Clear all</button>
        </div>
    );
};

const StatusTable = styled.table`
    border: 1px solid black;
`;

const StatusHeading = styled.th`
    padding-right: 20px;
    text-align: left;
`;

export default EverydayRepetition;
