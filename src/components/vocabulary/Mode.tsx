import { FC, useState } from 'react';
import { VocabularyUnits } from '../../interfaces/types';
import { shuffle } from '../../utils/utils';

interface Props {
    setVocabulary: (vocabulary: VocabularyUnits) => void;
    vocabularyCache: VocabularyUnits;
}

const Mode: FC<Props> = ({ setVocabulary, vocabularyCache }) => {
    const [mode, setMode] = useState<string>('all');
    const selectMode = () => {
        let list;

        switch (mode) {
            case 'last100': {
                list = vocabularyCache.slice(-100);

                break;
            }
            default: {
                list = vocabularyCache;

                break;
            }
        }

        setVocabulary(shuffle(list));
    };

    return (
        <>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="all">Full Repetition</option>
                <option value="last100" selected>
                    Last 100 words
                </option>
            </select>
            <button onClick={selectMode}>Select Repetition mode</button>
        </>
    );
};

export default Mode;
