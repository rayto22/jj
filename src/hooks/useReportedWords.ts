import { LS_RECORD } from 'utils/localStorageUtils';
import { useCachedWords } from './useCachedWords';

export const useReportedWords = ({
    lsKey = LS_RECORD.REPORTED_WORDS,
}: {
    lsKey?: LS_RECORD;
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
