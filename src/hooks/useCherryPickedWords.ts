import { STORAGE_KEY } from '@/interfaces/types';
import { useCachedWords } from './useCachedWords';

export const useCherryPickedWords = ({
    lsKey = STORAGE_KEY.CHERRY_PICK_LIBRARY,
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
