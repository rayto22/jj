import { FC } from 'react';
import { styled } from 'styled-components';

interface Props {
    task: string;
}

const TaskOutput: FC<Props> = ({ task }) => {
    return <TaskContainer>{task}</TaskContainer>;
};

const TaskContainer = styled.div`
    text-align: center;
    font-size: 50px;
`;

export default TaskOutput;
