import { FC, useEffect, useState, useMemo } from 'react';
import { convertSecToMinSec } from './../../utils';

interface Props {
    taskLength: number;
    taskIndex: number;
}

const ProgressSection: FC<Props> = ({ taskLength, taskIndex }) => {
    const [timeSpentSec, setTimeSpentSec] = useState<number>(0);
    const spentIntervalID = useMemo(
        () =>
            setInterval(() => {
                setTimeSpentSec((state) => state + 1);
            }, 1000),
        []
    );

    useEffect(() => {
        if (taskLength !== 0 && taskIndex === taskLength) {
            clearInterval(spentIntervalID);
        }
    }, [taskIndex, taskLength]);

    return (
        <>
            <div>
                {taskIndex} out of {taskLength}
            </div>
            <div>{convertSecToMinSec(timeSpentSec)}</div>
        </>
    );
};

export default ProgressSection;
