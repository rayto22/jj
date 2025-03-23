import {
    FC,
    PropsWithChildren,
    createContext,
    useState,
    useMemo,
    useEffect,
} from 'react';
import { useLocation } from 'react-router-dom';

import {
    PARENT_ROUTE,
    SESSION_TYPE,
    SessionData,
    SessionHistory,
    PartialSessionData,
} from '../interfaces/types';
import {
    LS_RECORD,
    getLocalStorageData,
    setLocalStorageData,
} from 'utils/localStorageUtils';

const emptySessionData: PartialSessionData = {
    type: null,
    date: null,
    duration: null,
    quantity: null,
};

const sessionRoutesMap = {
    [PARENT_ROUTE.VOCABULARY_REPETITION]: SESSION_TYPE.VOCABULARY_REPETITION,
    [PARENT_ROUTE.EVERYDAY_REPETITION]: SESSION_TYPE.EVERYDAY_REPETITION,
    [PARENT_ROUTE.CHERRY_PICK_REPETITION]: SESSION_TYPE.CHERRY_PICK_REPETITION,
};

export const SessionContext = createContext({
    ...emptySessionData,
    updateSessionData: (newData: PartialSessionData): void =>
        console.log('Plug. New data received ' + newData),
});

interface Props extends PropsWithChildren {
    isSessionInProgress: boolean;
}

export const SessionContextProvider: FC<Props> = ({
    isSessionInProgress,
    children,
}) => {
    const { pathname } = useLocation();
    const [sessionData, setSessionData] =
        useState<PartialSessionData>(emptySessionData);

    const saveSessionRecord = (sessionData: SessionData) => {
        const savedSessionRecords: SessionHistory =
            getLocalStorageData(LS_RECORD.SESSION_HISTORY) ?? [];

        setLocalStorageData(LS_RECORD.SESSION_HISTORY, [
            sessionData,
            ...savedSessionRecords,
        ]);
        setSessionData(emptySessionData);
    };

    const memorizedValue = useMemo(
        () => ({
            ...sessionData,
            isSessionInProgress,
            updateSessionData: (newData: PartialSessionData) => {
                setSessionData((state) => ({ ...state, ...newData }));
            },
        }),
        [sessionData, isSessionInProgress]
    );

    useEffect(() => {
        if (sessionData.date) {
            const newSessionType =
                sessionRoutesMap[
                    Object.keys(sessionRoutesMap).find((route) =>
                        pathname.includes(route)
                    ) as keyof typeof sessionRoutesMap
                ] ?? SESSION_TYPE.UNKNOWN;

            saveSessionRecord({
                type: newSessionType,
                date: sessionData.date,
                duration: sessionData.duration,
                quantity: sessionData.quantity,
            });
        }
    }, [sessionData]);

    return (
        <SessionContext.Provider value={memorizedValue}>
            {children}
        </SessionContext.Provider>
    );
};
