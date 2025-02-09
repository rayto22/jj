import { useState } from 'react';
import { VocabularyUnits, VocabularyUnit } from '@/interfaces/types';
import {
    getLocalStorageData,
    setLocalStorageData,
    LS_RECORD,
} from 'utils/localStorageUtils';

export const useCachedWords = ({ lsKey }: { lsKey: LS_RECORD }) => {
    const [cachedWords, setCachedWords] = useState<VocabularyUnits>(
        () => getLocalStorageData(lsKey) || []
    );
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
    };

    return { cachedWords, setCachedWords, isWordCached, cacheWord };
};
