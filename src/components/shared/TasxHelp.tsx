import { FC, useState, useEffect } from 'react';
import useSideTaps from '../../hooks/useSideTaps';

interface Props {
    hint: string;
    onSecondClick: () => void;
}

const TaskHelp: FC<Props> = ({ hint, onSecondClick }) => {
    const [showHelp, setShowHelp] = useState<boolean>(false);
    const onClickHandler = () => {
        setShowHelp((state) => {
            if (state) {
                onSecondClick();
            }

            return !state;
        });
    };

    useSideTaps({ rightTapHandler: onClickHandler });

    useEffect(() => {
        setShowHelp(false);
    }, [hint]);

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.code === 'ArrowRight') {
            onClickHandler();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onClickHandler]);

    return <button onClick={onClickHandler}>{showHelp ? hint : 'Help'}</button>;
};

export default TaskHelp;
