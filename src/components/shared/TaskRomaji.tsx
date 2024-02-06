import { FC, useState, useEffect } from 'react';

interface Props {
    romaji: string;
}

const TaskRomaji: FC<Props> = ({ romaji }) => {
    const [showRomaji, setShowRomaji] = useState<boolean>();
    const toggleRomaji = () => setShowRomaji((state) => !state);

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
