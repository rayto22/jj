import { FC, useState, useEffect } from 'react';
import { LexUnits } from '../../interfaces/types';
import { Select } from '../shared/Select';
import Tome from './Tome';

interface Props {
    onTomeSelect: (tome: LexUnits) => void;
    library: LexUnits;
}

const Tomes: FC<Props> = ({ onTomeSelect, library }) => {
    const [tomeSize, setTomeSize] = useState<number>(100);
    const createTomes = () => {
        if (!library) return [];

        const tomesCache = [];

        for (let i = 0; i < library.length; i += tomeSize) {
            tomesCache.push(library.slice(i, i + tomeSize));
        }

        return tomesCache;
    };
    const [tomes, setToms] = useState<Array<LexUnits>>(createTomes());

    useEffect(() => {
        setToms(createTomes());
    }, [library, tomeSize]);

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
                        onTomeClick={() => onTomeSelect(tome)}
                    />
                ))}
            </ul>
        </>
    );
};

export default Tomes;
