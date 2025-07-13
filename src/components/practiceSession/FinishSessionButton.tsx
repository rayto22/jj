import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    onFinish?: () => void;
}

export const FinishSessionButton: FC<Props> = ({ onFinish }) => {
    const navigate = useNavigate();

    const onTaskEnd = () => {
        onFinish();
        navigate(-1);
    };

    return <button onClick={onTaskEnd}>Finish task</button>;
};
