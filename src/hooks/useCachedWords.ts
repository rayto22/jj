import { useState, useContext, useEffect, useMemo } from 'react';
import { VocabularyUnits, VocabularyUnit } from '@/interfaces/types';
import {
    getLocalStorageData,
    setLocalStorageData,
    LS_RECORD,
} from 'utils/localStorageUtils';
import { CachedWordsContext } from 'context/CachedWordsContext';

export const useCachedWords = ({ lsKey }: { lsKey: LS_RECORD }) => {
    const [cachedWords, setCachedWords] = useState<VocabularyUnits>(
        () => getLocalStorageData(lsKey) || []
    );
    const cachedWordsContextValue = useContext(CachedWordsContext);
    const originID = useMemo(() => Math.random(), []);
    const isWordCached = (unit: VocabularyUnit) => !!findWordInCache(unit);
    const findWordInCache = (unit: VocabularyUnit) => {
        return cachedWords.find(
            (wordInCache) =>
                wordInCache.eng === unit.eng &&
                wordInCache.kanamoji === unit.kanamoji
        );
    };
    const cacheWord = (unit: VocabularyUnit) => {
        const wordInCache = findWordInCache(unit);
        const newCache = wordInCache
            ? cachedWords.filter((word) => wordInCache !== word)
            : [...cachedWords, unit];

        setLocalStorageData(lsKey, newCache);
        setCachedWords(newCache);
        cachedWordsContextValue.onLSRecordUpdate({ lsKey, originID });
    };

    useEffect(() => {
        if (
            lsKey === cachedWordsContextValue.lastChangedLSRecordKey &&
            originID !== cachedWordsContextValue.lastChangeOriginID
        ) {
            setCachedWords(() => getLocalStorageData(lsKey));
        }
    }, [cachedWordsContextValue]);

    return { cachedWords, setCachedWords, isWordCached, cacheWord };
};
