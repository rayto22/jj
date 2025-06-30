import { FC } from 'react';

interface Props {
    onClick: () => void;
}

export const RestartExerciseButton: FC<Props> = ({ onClick }) => {
    return <button onClick={onClick}>Restart Exercise</button>;
};
