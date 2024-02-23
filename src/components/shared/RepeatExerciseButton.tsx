import { FC } from 'react';

interface Props {
    onClick: () => void;
}

const RepeatExerciseButton: FC<Props> = ({ onClick }) => {
    return <button onClick={onClick}>Repeat Exercise</button>;
};

export default RepeatExerciseButton;
