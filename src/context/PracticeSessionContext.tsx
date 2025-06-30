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
    STORAGE_KEY,
} from '../interfaces/types';
import { loadData, saveData } from '@/utils/dataManager';

const emptySessionData: PartialSessionData = {
    type: null,
    date: null,
    duration: null,
    quantity: null,
};

const sessionRoutesMap = {
    [PARENT_ROUTE.REGULAR_PRACTICE]: SESSION_TYPE.REGULAR_PRACTICE,
    [PARENT_ROUTE.EVERYDAY_PRACTICE]: SESSION_TYPE.EVERYDAY_PRACTICE,
    [PARENT_ROUTE.CHERRY_PICK_PRACTICE]: SESSION_TYPE.CHERRY_PICK_PRACTICE,
};

export const PracticeSessionContext = createContext({
    ...emptySessionData,
    updateSessionData: (newData: PartialSessionData): void =>
        console.log('Plug. New data received ' + newData),
});

interface Props extends PropsWithChildren {
    isSessionInProgress: boolean;
}

export const PracticeSessionContextProvider: FC<Props> = ({
    isSessionInProgress,
    children,
}) => {
    const { pathname } = useLocation();
    const [sessionData, setSessionData] =
        useState<PartialSessionData>(emptySessionData);

    const saveSessionRecord = (sessionData: SessionData) => {
        const savedSessionRecords: SessionHistory =
            loadData(STORAGE_KEY.SESSION_HISTORY) ?? [];

        saveData(STORAGE_KEY.SESSION_HISTORY, [
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
        <PracticeSessionContext.Provider value={memorizedValue}>
            {children}
        </PracticeSessionContext.Provider>
    );
};
