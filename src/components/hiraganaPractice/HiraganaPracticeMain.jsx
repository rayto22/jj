import { useState, useMemo } from 'react';
import { styled } from 'styled-components';
import { mapA, mapI, mapU, mapE, mapO } from '../../data/Hiragana';
import { shuffle } from '../../utils/utils';

export const HiraganaPracticeMain = () => {
    const getPairs = (obj) => Object.keys(obj).map((key) => [key, obj[key]]);

    const { allMapArray } = useMemo(() => {
        const allMapObs = { ...mapA, ...mapI, ...mapU, ...mapE, ...mapO };
        const allMapArray = shuffle([
            ...getPairs(mapA),
            ...getPairs(mapI),
            ...getPairs(mapU),
            ...getPairs(mapE),
            ...getPairs(mapO),
        ]);

        return { allMapObs, allMapArray };
    }, []);

    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [hasError, setHasError] = useState(false);
    const [errorCount, setErrorCount] = useState(0);
    const [inputValue, setInputValue] = useState();
    const onAnswerInput = (e) => {
        const correctAnswer = allMapArray[currentTaskIndex][0];
        const myAnswer = e.target.value;
        setInputValue(myAnswer);

        if (myAnswer.length === correctAnswer.length) {
            if (myAnswer !== correctAnswer) {
                setHasError(true);
                setErrorCount((state) => state + 1);
            } else {
                setHasError(false);
                setCurrentTaskIndex((state) => state + 1);
                setInputValue('');
            }
        }
    };

    return (
        <>
            {currentTaskIndex + 2 === allMapArray.length ? (
                <>
                    <div>End</div>
                    <div>Errors: {errorCount}</div>
                </>
            ) : (
                <>
                    <HiraganaChar>
                        {allMapArray[currentTaskIndex][1]}
                    </HiraganaChar>
                    <AnswerInput
                        value={inputValue}
                        onInput={onAnswerInput}
                        $hasError={hasError}
                    />
                </>
            )}
        </>
    );
};

const HiraganaChar = styled.div`
    font-size: 50px;
`;

const AnswerInput = styled.input`
    ${(props) => props.$hasError && 'color: red'}
`;
