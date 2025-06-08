import { STORAGE_KEY } from '@/interfaces/types';
import { FC, PropsWithChildren, createContext, useState, useMemo } from 'react';

export const CachedWordsContext = createContext({
    lastChangedLSRecordKey: null,
    lastChangeOriginID: null,
    onLSRecordUpdate: ({
        lsKey,
        originID,
    }: {
        lsKey: STORAGE_KEY;
        originID: number;
    }) => {
        console.log('plug! Key: ' + lsKey + '; originID: ' + originID);
    },
});

export const CachedWordsContextProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    const [lastChangedLSRecord, setLastChangedLSRecord] = useState<{
        lsKey: STORAGE_KEY;
        originID: number;
    }>({ lsKey: null, originID: null });

    const memorizedValue = useMemo(
        () => ({
            lastChangedLSRecordKey: lastChangedLSRecord.lsKey,
            lastChangeOriginID: lastChangedLSRecord.originID,
            onLSRecordUpdate: ({
                lsKey,
                originID,
            }: {
                lsKey: STORAGE_KEY;
                originID: number;
            }) => {
                setLastChangedLSRecord({ lsKey, originID });
            },
        }),
        [lastChangedLSRecord]
    );

    return (
        <CachedWordsContext.Provider value={memorizedValue}>
            {children}
        </CachedWordsContext.Provider>
    );
};
