import { FC, useEffect, useState, useContext } from 'react';
import { styled } from 'styled-components';
import { convertSecToMinSec } from '@/utils/utils';
import { PracticeSessionContext } from '@/context/PracticeSessionContext';

interface Props {
    taskLength: number;
    taskIndex: number;
}

export const SessionProgressBlock: FC<Props> = ({ taskLength, taskIndex }) => {
    const [timeSpentSec, setTimeSpentSec] = useState<number>(0);
    const { updateSessionData } = useContext(PracticeSessionContext);
    const tasksFinished = taskLength === taskIndex;
    const formattedTime = convertSecToMinSec(timeSpentSec);

    const onSessionEnd = () => {
        updateSessionData({
            duration: formattedTime,
            date: new Date().getTime(),
            quantity: taskIndex,
        });
    };

    useEffect(() => {
        let spentIntervalID: number;

        if (taskIndex === 0) {
            spentIntervalID = window.setInterval(() => {
                setTimeSpentSec((state) => state + 1);
            }, 1000);
            setTimeSpentSec(0);
        } else if (tasksFinished) {
            onSessionEnd();
        }

        return () => {
            clearInterval(spentIntervalID);
        };
    }, [tasksFinished]);

    return (
        <Wrap>
            <div>
                {taskIndex}/{taskLength}
            </div>
            <div>{formattedTime}</div>
        </Wrap>
    );
};

const Wrap = styled.div`
    margin-left: 0.5rem;
`;
