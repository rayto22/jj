import { useState, useContext, useEffect, useMemo } from 'react';
import {
    VocabularyUnits,
    VocabularyUnit,
    STORAGE_KEY,
} from '@/interfaces/types';
import { loadData, saveData } from '@/utils/dataManager';
import { CachedWordsContext } from '@/context/CachedWordsContext';

export const useCachedWords = ({ lsKey }: { lsKey: STORAGE_KEY }) => {
    const [cachedWords, setCachedWords] = useState<VocabularyUnits>(
        () => loadData(lsKey) || []
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
    const updateCache = (units: VocabularyUnits) => {
        saveData(lsKey, units);
        setCachedWords(units);
        cachedWordsContextValue.onLSRecordUpdate({ lsKey, originID });
    };
    const cacheWord = (unit: VocabularyUnit) => {
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
