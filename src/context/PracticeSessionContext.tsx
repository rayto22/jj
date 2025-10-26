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
    updateLastTomeRecord: (tomeTitle: string): void =>
        console.log('Plug. Tome title received ' + tomeTitle),
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
            updateLastTomeRecord: (tomeTitle: string) => {
                if (getSessionTypeFromPath() === SESSION_TYPE.REGULAR_PRACTICE) {
                    saveData(STORAGE_KEY.LAST_TOME_RECORD, tomeTitle);
                }
            }
        }),
        [sessionData, isSessionInProgress]
    );

    const getSessionTypeFromPath = (): SESSION_TYPE => {
        return sessionRoutesMap[
            Object.keys(sessionRoutesMap).find((route) =>
                pathname.includes(route)
            ) as keyof typeof sessionRoutesMap
        ] ?? SESSION_TYPE.UNKNOWN;
    };

    useEffect(() => {
        if (sessionData.date) {
            const newSessionType = getSessionTypeFromPath();

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
