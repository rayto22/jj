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

    const savedData = {
        library: loadData(STORAGE_KEY.CENTRAL_LIBRARY) ?? [],
        leftToPractice: loadData(STORAGE_KEY.EVERYDAY_PRACTICE_QUEUE) ?? [],
        sessionHistory: loadData(STORAGE_KEY.SESSION_HISTORY) ?? [],
        cherryPickedWords: loadData(STORAGE_KEY.CHERRY_PICK_LIBRARY) ?? [],
        deckSizeValue: loadData(STORAGE_KEY.EVERYDAY_PRACTICE_DECK_SIZE) ?? 100,
    };

    const [library, setLibrary] = useState<LexUnits>(savedData.library);
    const [deckSize, setDeckSize] = useState<number>(savedData.deckSizeValue);

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
        const deck = savedData.leftToPractice.slice(0, deckSize);
        const leftToPractice = savedData.leftToPractice[deckSize]
            ? savedData.leftToPractice.slice(
                  deckSize,
                  savedData.leftToPractice.length
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

    const onDeckSizeSelectChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newDeckSize = +e.target.value;

        setDeckSize(newDeckSize);
        saveData(STORAGE_KEY.EVERYDAY_PRACTICE_DECK_SIZE, newDeckSize);
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
                    value={deckSize}
                    optionsList={[100, 50, 25, 15, 5]}
                    onChange={onDeckSizeSelectChange}
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
                        <td>{savedData.leftToPractice.length}</td>
                    </tr>
                    <tr>
                        <StatusHeading># ChP:</StatusHeading>
                        <td>{savedData.cherryPickedWords.length}</td>
                    </tr>
                </tbody>
            </StatusTable>
            {savedData.sessionHistory && (
                <StatusTable>
                    <tbody>
                        {savedData.sessionHistory.map(
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
