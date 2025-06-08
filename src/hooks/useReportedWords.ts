import { STORAGE_KEY } from '@/interfaces/types';
import { useCachedWords } from './useCachedWords';

export const useReportedWords = ({
    lsKey = STORAGE_KEY.REPORTED_WORDS,
}: {
    lsKey?: STORAGE_KEY;
} = {}) => {
    const { cachedWords, isWordCached, cacheWord, resetCache } = useCachedWords(
        { lsKey }
    );

    return {
        reportedWords: cachedWords,
        isWordReported: isWordCached,
        reportWord: cacheWord,
        resetReport: resetCache,
    };
};
