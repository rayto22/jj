import { FC, useState, useEffect } from 'react';
import { VocabularyUnits } from '../../interfaces/types';
import { shuffle } from '../../utils/utils';
import { Select } from '../shared/Select';
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
            <Select
                value={tomeSize}
                optionsList={[100, 50, 25, 5]}
                onChange={(e) => setTomeSize(+e.target.value)}
            />
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
