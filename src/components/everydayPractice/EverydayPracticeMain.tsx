import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import {
    LexUnits,
    CHILD_ROUTE,
    SessionData,
    STORAGE_KEY,
} from '@/interfaces/types';
import { loadLibrary } from '@/utils/sheetManager';
import { loadData, saveData } from '@/utils/dataManager';
import { shuffle } from '@/utils/utils';

import { Select } from '../shared/Select';

export const EverydayPracticeMain = () => {
    const navigate = useNavigate();

    const localStorageData = {
        library: loadData(STORAGE_KEY.CENTRAL_LIBRARY) ?? [],
        leftToPractice: loadData(STORAGE_KEY.EVERYDAY_PRACTICE_QUEUE) ?? [],
        sessionHistory: loadData(STORAGE_KEY.SESSION_HISTORY) ?? [],
        cherryPickedWords: loadData(STORAGE_KEY.CHERRY_PICK_LIBRARY) ?? [],
    };

    const [library, setLibrary] = useState<LexUnits>(localStorageData.library);
    const [practiceChunkSize, setPracticeChunkSize] = useState<number>(100);

    const loadLatestLibrary = () => {
        if (!confirm('Load latest?')) return;

        loadLibrary().then((payloadUnshaffled: LexUnits) => {
            const payload = shuffle(payloadUnshaffled);

            saveData(STORAGE_KEY.CENTRAL_LIBRARY, payload);
            saveData(STORAGE_KEY.EVERYDAY_PRACTICE_QUEUE, payload);
            setLibrary(payload);
        });
    };

    const startSession = () => {
        const deck = localStorageData.leftToPractice.slice(
            0,
            practiceChunkSize
        );
        const leftToPractice = localStorageData.leftToPractice[
            practiceChunkSize
        ]
            ? localStorageData.leftToPractice.slice(
                  practiceChunkSize,
                  localStorageData.leftToPractice.length
              )
            : [];

        navigate(CHILD_ROUTE.PRACTICE_SESSION, {
            state: {
                deck,
                leftToPracticeAfterFinishing: leftToPractice,
            },
        });
    };

    const clearAll = () => {
        if (!confirm('Clear all?')) return;

        saveData(STORAGE_KEY.CENTRAL_LIBRARY, []);
        saveData(STORAGE_KEY.EVERYDAY_PRACTICE_QUEUE, []);
        setLibrary([]);
    };

    return (
        <div>
            <div>
                <button onClick={loadLatestLibrary}>Load latest library</button>
            </div>
            <div>
                <button onClick={startSession}>Start Session</button>
            </div>
            <div>
                <button onClick={clearAll}>Clear all</button>
            </div>
            <div>
                <Select
                    value={practiceChunkSize}
                    optionsList={[100, 50, 25, 15, 5]}
                    onChange={(e) => setPracticeChunkSize(+e.target.value)}
                />
            </div>
            <StatusTable>
                <tbody>
                    <tr>
                        <StatusHeading># Total:</StatusHeading>
                        <td>{library.length}</td>
                    </tr>
                    <tr>
                        <StatusHeading># Left:</StatusHeading>
                        <td>{localStorageData.leftToPractice.length}</td>
                    </tr>
                    <tr>
                        <StatusHeading># ChP:</StatusHeading>
                        <td>{localStorageData.cherryPickedWords.length}</td>
                    </tr>
                </tbody>
            </StatusTable>
            {localStorageData.sessionHistory && (
                <StatusTable>
                    <tbody>
                        {localStorageData.sessionHistory.map(
                            (sessionData: SessionData) => (
                                <Fragment key={sessionData.date}>
                                    <tr>
                                        <td>{sessionData.type}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            D:{' '}
                                            {new Date(
                                                sessionData.date
                                            ).toLocaleString()}
                                        </td>
                                        <td>T: {sessionData.duration}</td>
                                        <td>Q: {sessionData.quantity}</td>
                                    </tr>
                                </Fragment>
                            )
                        )}
                    </tbody>
                </StatusTable>
            )}
        </div>
    );
};

const StatusTable = styled.table`
    border: 1px solid black;
    width: 100%;
`;

const StatusHeading = styled.th`
    padding-right: 20px;
    text-align: left;
`;
