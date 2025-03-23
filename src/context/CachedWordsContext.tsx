import { FC, PropsWithChildren, createContext, useState, useMemo } from 'react';
import { LS_RECORD } from 'utils/localStorageUtils';

export const CachedWordsContext = createContext({
    lastChangedLSRecordKey: null,
    lastChangeOriginID: null,
    onLSRecordUpdate: ({
        lsKey,
        originID,
    }: {
        lsKey: LS_RECORD;
        originID: number;
    }) => {
        console.log('plug! Key: ' + lsKey + '; originID: ' + originID);
    },
});

export const CachedWordsContextProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    const [lastChangedLSRecord, setLastChangedLSRecord] = useState<{
        lsKey: LS_RECORD;
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
                lsKey: LS_RECORD;
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
