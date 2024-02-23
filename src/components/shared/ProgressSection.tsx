import { FC, useEffect, useState, useMemo } from 'react';
import { convertSecToMinSec } from './../../utils';

interface Props {
    taskLength: number;
    taskIndex: number;
}

const ProgressSection: FC<Props> = ({ taskLength, taskIndex }) => {
    const [timeSpentSec, setTimeSpentSec] = useState<number>(0);
    const tasksFinished = taskLength === taskIndex;

    useEffect(() => {
        let spentIntervalID: number;

        if (taskIndex === 0) {
            spentIntervalID = window.setInterval(() => {
                setTimeSpentSec((state) => state + 1);
            }, 1000);
            setTimeSpentSec(0);
        }

        return () => {
            clearInterval(spentIntervalID);
        };
    }, [tasksFinished]);

    return (
        <>
            <div>
                {taskIndex}/{taskLength}
            </div>
            <div>{convertSecToMinSec(timeSpentSec)}</div>
        </>
    );
};

export default ProgressSection;
