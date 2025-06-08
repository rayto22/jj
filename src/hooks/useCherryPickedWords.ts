import { STORAGE_KEY } from '@/interfaces/types';
import { useCachedWords } from './useCachedWords';

export const useCherryPickedWords = ({
    lsKey = STORAGE_KEY.CHERRY_PICKED_WORDS,
}: {
    lsKey?: STORAGE_KEY;
} = {}) => {
    const { cachedWords, isWordCached, cacheWord } = useCachedWords({ lsKey });

    return {
        cherryPickedWords: cachedWords,
        isWordCherryPicked: isWordCached,
        cherryPickWord: cacheWord,
    };
};
