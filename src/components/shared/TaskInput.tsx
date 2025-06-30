import { FC, useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';

interface Props {
    correctAnswer: string;
    onCorrectAnswer: () => void;
}

const TaskInput: FC<Props> = ({ correctAnswer, onCorrectAnswer }) => {
    const [inputValue, setInputValue] = useState('');
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(false);
        setInputValue('');
    }, [correctAnswer]);

    const onAnswerInput = (e: ChangeEvent<HTMLInputElement>) => {
        const myAnswer = e.target.value;

        setInputValue(myAnswer);

        if (myAnswer.length === correctAnswer.length) {
            if (myAnswer !== correctAnswer) {
                setHasError(true);
            } else {
                onCorrectAnswer();
            }
        }
    };

    return (
        <StyledInput
            value={inputValue}
            $hasError={hasError}
            onChange={onAnswerInput}
        />
    );
};

const StyledInput = styled.input<{ $hasError?: boolean }>`
    font-size: 24px;
    ${(props) => props.$hasError && 'color: red'}
`;

export default TaskInput;
