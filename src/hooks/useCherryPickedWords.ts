import { LS_RECORD } from 'utils/localStorageUtils';
import { useCachedWords } from './useCachedWords';

export const useCherryPickedWords = ({
    lsKey = LS_RECORD.CHERRY_PICKED_WORDS,
}: {
    lsKey?: LS_RECORD;
} = {}) => {
    const { cachedWords, setCachedWords, isWordCached, cacheWord } =
        useCachedWords({ lsKey });

    return {
        cherryPickedWords: cachedWords,
        setCherryPickedWords: setCachedWords,
        isWordCherryPicked: isWordCached,
        cherryPickWord: cacheWord,
    };
};
