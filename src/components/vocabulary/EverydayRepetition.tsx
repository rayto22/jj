import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { VocabularyUnits } from 'interfaces/types';
import { getVocabulary } from 'utils/sheetManager';
import {
    getLocalStorageData,
    setLocalStorageData,
    LS_RECORD,
} from 'utils/localStorageUtils';
import { Select } from '../shared/Select';
import { shuffle } from 'utils/utils';

const EverydayRepetition = () => {
    const navigate = useNavigate();

    const localStorageData = {
        updateDate:
            getLocalStorageData(LS_RECORD.MAIN_VOCABULARY_UPDATE_DATE) ??
            'not loaded yet',
        vocabulary: getLocalStorageData(LS_RECORD.MAIN_VOCABULARY) ?? [],
        leftToRepeat:
            getLocalStorageData(LS_RECORD.MAIN_VOCABULARY_LEFT_TO_REPEAT) ?? [],
    };

    const [vocabulary, setVocabulary] = useState<VocabularyUnits>(
        localStorageData.vocabulary
    );
    const [repetitionChunkSize, setRepetitionChunkSize] = useState<number>(100);

    const loadLatestVocabulary = () => {
        if (!confirm('Load latest?')) return;

        getVocabulary().then((payloadUnshaffled: VocabularyUnits) => {
            const payload = shuffle(payloadUnshaffled);

            setLocalStorageData(LS_RECORD.MAIN_VOCABULARY, payload);
            setLocalStorageData(
                LS_RECORD.MAIN_VOCABULARY_LEFT_TO_REPEAT,
                payload
            );
            setLocalStorageData(
                LS_RECORD.MAIN_VOCABULARY_UPDATE_DATE,
                new Date().toLocaleString()
            );
            localStorageData.vocabulary = payload;
            setVocabulary(payload);
        });
    };

    const startSession = () => {
        const sessionTask = localStorageData.leftToRepeat.slice(
            0,
            repetitionChunkSize
        );
        const leftToRepeat = localStorageData.leftToRepeat[repetitionChunkSize]
            ? localStorageData.leftToRepeat.slice(
                  repetitionChunkSize,
                  localStorageData.leftToRepeat.length
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
        if (!confirm('Clear all?')) return;

        setLocalStorageData(LS_RECORD.MAIN_VOCABULARY, []);
        setLocalStorageData(LS_RECORD.MAIN_VOCABULARY_LEFT_TO_REPEAT, []);
        setLocalStorageData(LS_RECORD.MAIN_VOCABULARY_UPDATE_DATE, '');
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

            <div>
                <button onClick={loadLatestVocabulary}>
                    Load latest vocabulary
                </button>
            </div>
            <div>
                <button onClick={startSession}>Start Session</button>
            </div>
            <div>
                <button onClick={clearAll}>Clear all</button>
            </div>
            <div>
                <Select
                    value={repetitionChunkSize}
                    optionsList={[100, 50, 25, 15, 5]}
                    onChange={(e) => setRepetitionChunkSize(+e.target.value)}
                />
            </div>
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
