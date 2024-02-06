import { FC, useState, useEffect } from 'react';
import { styled } from 'styled-components';

interface Props {
    hint: string;
    onSecondClick: () => void;
}

const TaskHelp: FC<Props> = ({ hint, onSecondClick }) => {
    const [showHelp, setShowHelp] = useState<boolean>(false);
    const onClickHandler = () => {
        setShowHelp((state) => !state);

        console.log(showHelp);

        if (showHelp) {
            onSecondClick();
        }
    };

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
