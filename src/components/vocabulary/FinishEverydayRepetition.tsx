import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { VocabularyUnits } from 'interfaces/types';
import styled from 'styled-components';
import { LS_RECORD, setLocalStorageData } from 'utils/localStorageUtils';

interface Props {
    leftToRepeatAfterFinishing: VocabularyUnits;
}

const FinishEverydayRepetition: FC<Props> = ({
    leftToRepeatAfterFinishing,
}) => {
    const navigate = useNavigate();

    const onTaskEnd = () => {
        setLocalStorageData(
            LS_RECORD.MAIN_VOCABULARY_LEFT_TO_REPEAT,
            leftToRepeatAfterFinishing
        );
        navigate('/everydayRepetition');
    };

    return <button onClick={onTaskEnd}>Finish task</button>;
};

export default FinishEverydayRepetition;
