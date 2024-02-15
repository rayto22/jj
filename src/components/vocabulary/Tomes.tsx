import { FC, useState, useEffect } from 'react';
import { VocabularyUnits } from '../../interfaces/types';
import { shuffle } from '../../utils/utils';

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
    }, [vocabularyCache]);

    return (
        <>
            <select
                value={tomeSize}
                onChange={(e) => setTomeSize(+e.target.value)}
            >
                <option value="100">100</option>
                <option value="50">50</option>
                <option value="25">25</option>
            </select>
            <ul>
                {tomes.map((tome, index) => (
                    <li key={tome[0].eng}>
                        <a
                            href="#"
                            onClick={() => setVocabulary(shuffle(tome))}
                        >{`${index * 100 + 1} - ${index * 100 + tome.length} (${
                            tome[0].kanamoji
                        }, ${tome[1].kanamoji} ... ${
                            tome[tome.length - 2].kanamoji
                        }, ${tome[tome.length - 1].kanamoji})`}</a>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Tomes;
