import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LexUnits,
    SESSION_TYPE,
    PARENT_ROUTE,
    STORAGE_KEY,
} from '@/interfaces/types';
import { saveData } from '@/utils/dataManager';

interface Props {
    sessionType: SESSION_TYPE;
    leftToPracticeAfterFinishing: LexUnits;
}

export const FinishSessionButton: FC<Props> = ({
    sessionType,
    leftToPracticeAfterFinishing,
}) => {
    const navigate = useNavigate();

    const onTaskEnd = () => {
        if (sessionType === SESSION_TYPE.EVERYDAY_PRACTICE) {
            saveData(
                STORAGE_KEY.EVERYDAY_PRACTICE_QUEUE,
                leftToPracticeAfterFinishing
            );
            navigate(PARENT_ROUTE.EVERYDAY_PRACTICE);
        } else if (sessionType === SESSION_TYPE.REGULAR_PRACTICE) {
            navigate(PARENT_ROUTE.REGULAR_PRACTICE);
        }
    };

    return <button onClick={onTaskEnd}>Finish task</button>;
};
