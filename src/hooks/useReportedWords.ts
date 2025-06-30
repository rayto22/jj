import { STORAGE_KEY } from '@/interfaces/types';
import { useCachedWords } from './useCachedWords';

export const useReportedWords = ({
    lsKey = STORAGE_KEY.LEX_2_FIX,
}: {
    lsKey?: STORAGE_KEY;
} = {}) => {
    const { cachedWords, isWordCached, cacheWord, resetCache } = useCachedWords(
        { lsKey }
    );

    return {
        lexToFix: cachedWords,
        isWordReported: isWordCached,
        reportWord: cacheWord,
        resetReport: resetCache,
    };
};
