import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { VocabularyUnits } from 'interfaces/types';
import styled from 'styled-components';
import { setLocalStorageData } from 'utils/localStorageUtils';

interface Props {
    leftToRepeatAfterFinishing: VocabularyUnits;
}

const FinishEverydayRepetition: FC<Props> = ({
    leftToRepeatAfterFinishing,
}) => {
    const navigate = useNavigate();

    const onTaskEnd = () => {
        setLocalStorageData(
            'vocabularyLeftToRepeat',
            leftToRepeatAfterFinishing
        );
        navigate('/everydayRepetition');
    };

    return <button onClick={onTaskEnd}>Finish task</button>;
};

export default FinishEverydayRepetition;
