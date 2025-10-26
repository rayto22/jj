import { FC, useContext } from 'react';
import { LexUnits, STORAGE_KEY } from '../../interfaces/types';
import { PracticeSessionContext } from '@/context/PracticeSessionContext';
import styled from 'styled-components';
import { loadData } from '@/utils/dataManager';

interface Props {
    tome: LexUnits;
    tomeIndex: number;
    tomeMaxSize: number;
    onTomeClick: () => void;
}

const Tome: FC<Props> = ({ tome, tomeIndex, tomeMaxSize, onTomeClick }) => {
    const { updateLastTomeRecord } = useContext(PracticeSessionContext);

    const tomeIndexHeadline = `${tomeIndex * tomeMaxSize + 1} - ${
        tomeIndex * tomeMaxSize + tome.length
    }`;
    const tomePortionHeadline1 = tome[0].kanamoji;
    const tomePortionHeadline2 = tome[1] ? `, ${tome[1].kanamoji}` : '';
    const tomePortionHeadline3 =
        tome.length > 3 ? `${tome[tome.length - 2].kanamoji}, ` : '';
    const tomePortionHeadline4 =
        tome.length > 2 ? tome[tome.length - 1].kanamoji : '';
    const assembledHeadline = `${tomeIndex}. ${tomeIndexHeadline} (${tomePortionHeadline1}${tomePortionHeadline2}${
        tomePortionHeadline3 || tomePortionHeadline4 ? ' ... ' : ''
    }${tomePortionHeadline3}${tomePortionHeadline4})`;

    const clickHandler = () => {
        updateLastTomeRecord(assembledHeadline);
        onTomeClick();
    };

    const isLastUsedTome = loadData(STORAGE_KEY.LAST_TOME_RECORD) === assembledHeadline;

    return (
        <li key={tome[0].eng}>
            <SpanLikeLink $lastUsedTome={isLastUsedTome} onClick={clickHandler}>
                {assembledHeadline}
            </SpanLikeLink>
        </li>
    );
};

const SpanLikeLink = styled.span<{ $lastUsedTome: boolean }>`
    cursor: pointer;
    color: ${({ $lastUsedTome }) => $lastUsedTome ? `darkred` :  'black'};
    text-decoration: underline;
`;

export default Tome;
