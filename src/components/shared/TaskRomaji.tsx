import { FC, useState, useEffect } from 'react';
import useSideTaps from '../../hooks/useSideTaps';

interface Props {
    romaji: string;
}

const TaskRomaji: FC<Props> = ({ romaji }) => {
    const [showRomaji, setShowRomaji] = useState<boolean>(false);
    const toggleRomaji = () => setShowRomaji((state) => !state);

    useSideTaps({ leftTapHandler: toggleRomaji });

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.code === 'ArrowLeft') {
            toggleRomaji();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    return (
        <button onClick={toggleRomaji}>{showRomaji ? romaji : 'Romaji'}</button>
    );
};

export default TaskRomaji;
