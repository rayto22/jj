import { useState, useContext, useEffect, useMemo } from 'react';
import { LexUnits, LexUnit, STORAGE_KEY } from '@/interfaces/types';
import { loadData, saveData } from '@/utils/dataManager';
import { CachedWordsContext } from '@/context/CachedWordsContext';

export const useCachedWords = ({ lsKey }: { lsKey: STORAGE_KEY }) => {
    const [cachedWords, setCachedWords] = useState<LexUnits>(
        () => loadData(lsKey) || []
    );
    const cachedWordsContextValue = useContext(CachedWordsContext);
    const originID = useMemo(() => Math.random(), []);
    const isWordCached = (unit: LexUnit) => !!findWordInCache(unit);
    const findWordInCache = (unit: LexUnit) => {
        return cachedWords.find(
            (wordInCache) =>
                wordInCache.eng === unit.eng &&
                wordInCache.kanamoji === unit.kanamoji
        );
    };
    const updateCache = (units: LexUnits) => {
        saveData(lsKey, units);
        setCachedWords(units);
        cachedWordsContextValue.onLSRecordUpdate({ lsKey, originID });
    };
    const cacheWord = (unit: LexUnit) => {
        const wordInCache = findWordInCache(unit);
        const newCache = wordInCache
            ? cachedWords.filter((word) => wordInCache !== word)
            : [...cachedWords, unit];

        updateCache(newCache);
    };
    const resetCache = () => updateCache([]);

    useEffect(() => {
        if (
            lsKey === cachedWordsContextValue.lastChangedLSRecordKey &&
            originID !== cachedWordsContextValue.lastChangeOriginID
        ) {
            setCachedWords(() => loadData(lsKey));
        }
    }, [cachedWordsContextValue]);

    return { cachedWords, isWordCached, cacheWord, updateCache, resetCache };
};
