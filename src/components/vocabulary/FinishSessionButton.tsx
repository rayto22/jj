import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { VocabularyUnits, SESSION_TYPE, PARENT_ROUTE } from 'interfaces/types';
import { LS_RECORD, setLocalStorageData } from 'utils/localStorageUtils';

interface Props {
    sessionType: SESSION_TYPE;
    leftToRepeatAfterFinishing: VocabularyUnits;
}

export const FinishSessionButton: FC<Props> = ({
    sessionType,
    leftToRepeatAfterFinishing,
}) => {
    const navigate = useNavigate();

    const onTaskEnd = () => {
        if (sessionType === SESSION_TYPE.EVERYDAY_REPETITION) {
            setLocalStorageData(
                LS_RECORD.MAIN_VOCABULARY_LEFT_TO_REPEAT,
                leftToRepeatAfterFinishing
            );
            navigate(PARENT_ROUTE.EVERYDAY_REPETITION);
        } else if (sessionType === SESSION_TYPE.VOCABULARY_REPETITION) {
            navigate(PARENT_ROUTE.VOCABULARY_REPETITION);
        }
    };

    return <button onClick={onTaskEnd}>Finish task</button>;
};
