import { FC, useState, useEffect } from 'react';
import { VocabularyUnits } from '../../interfaces/types';
import { shuffle } from '../../utils/utils';

interface Props {
    setVocabulary: (vocabulary: VocabularyUnits) => void;
    vocabularyCache: VocabularyUnits;
}

const Toms: FC<Props> = ({ setVocabulary, vocabularyCache }) => {
    const createToms = () => {
        if (!vocabularyCache) return [];

        const tomeSize = 100;
        const tomsCache = [];

        for (let i = 0; i < vocabularyCache.length; i += tomeSize) {
            tomsCache.push(vocabularyCache.slice(i, i + tomeSize));
        }

        return tomsCache;
    };
    const [toms, setToms] = useState<Array<VocabularyUnits>>(createToms());

    useEffect(() => {
        setToms(createToms());
    }, [vocabularyCache]);

    return (
        <ul>
            {toms.map((tom, index) => (
                <li key={tom[0].eng}>
                    <a href="#" onClick={() => setVocabulary(shuffle(tom))}>{`${
                        index * 100 + 1
                    } - ${index * 100 + tom.length}`}</a>
                </li>
            ))}
        </ul>
    );
};

export default Toms;
