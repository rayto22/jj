import { FC, useState, useEffect } from 'react';
import { VocabularyUnits } from '../../interfaces/types';
import { shuffle } from '../../utils/utils';
import Tome from './Tome';

interface Props {
    setVocabulary: (vocabulary: VocabularyUnits) => void;
    vocabularyCache: VocabularyUnits;
}

const Tomes: FC<Props> = ({ setVocabulary, vocabularyCache }) => {
    const [tomeSize, setTomeSize] = useState<number>(100);
    const createTomes = () => {
        if (!vocabularyCache) return [];

        const tomesCache = [];

        for (let i = 0; i < vocabularyCache.length; i += tomeSize) {
            tomesCache.push(vocabularyCache.slice(i, i + tomeSize));
        }

        return tomesCache;
    };
    const [tomes, setToms] = useState<Array<VocabularyUnits>>(createTomes());

    useEffect(() => {
        setToms(createTomes());
    }, [vocabularyCache, tomeSize]);

    return (
        <>
            <select
                value={tomeSize}
                onChange={(e) => setTomeSize(+e.target.value)}
            >
                <option value="9999999999">All</option>
                <option value="100">100</option>
                <option value="50">50</option>
                <option value="25">25</option>
                <option value="5">5</option>
            </select>
            <ul>
                {tomes.map((tome, index) => (
                    <Tome
                        key={tome[0].kanamoji + index + tomeSize}
                        tome={tome}
                        tomeIndex={index}
                        tomeMaxSize={tomeSize}
                        onTomeClick={() => setVocabulary(shuffle(tome))}
                    />
                ))}
            </ul>
        </>
    );
};

export default Tomes;
