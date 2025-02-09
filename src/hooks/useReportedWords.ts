import { LS_RECORD } from 'utils/localStorageUtils';
import { useCachedWords } from './useCachedWords';

export const useReportedWords = ({
    lsKey = LS_RECORD.REPORTED_WORDS,
}: {
    lsKey?: LS_RECORD;
} = {}) => {
    const { cachedWords, setCachedWords, isWordCached, cacheWord } =
        useCachedWords({ lsKey });

    return {
        reportedWords: cachedWords,
        setReportedWords: setCachedWords,
        isWordReported: isWordCached,
        reportWord: cacheWord,
    };
};
