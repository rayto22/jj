import { FC } from 'react';
import { VocabularyUnits } from '../../interfaces/types';
import styled from 'styled-components';

interface Props {
    tome: VocabularyUnits;
    tomeIndex: number;
    tomeMaxSize: number;
    onTomeClick: () => void;
}

const Tome: FC<Props> = ({ tome, tomeIndex, tomeMaxSize, onTomeClick }) => {
    const tomeIndexHeadline = `${tomeIndex * tomeMaxSize + 1} - ${
        tomeIndex * tomeMaxSize + tome.length
    }`;
    const tomePortionHeadline1 = tome[0].kanamoji;
    const tomePortionHeadline2 = tome[1] ? `, ${tome[1].kanamoji}` : '';
    const tomePortionHeadline3 =
        tome.length > 3 ? `${tome[tome.length - 2].kanamoji}, ` : '';
    const tomePortionHeadline4 =
        tome.length > 2 ? tome[tome.length - 1].kanamoji : '';
    const assembledHeadline = `${tomeIndexHeadline} (${tomePortionHeadline1}${tomePortionHeadline2}${
        tomePortionHeadline3 || tomePortionHeadline4 ? ' ... ' : ''
    }${tomePortionHeadline3}${tomePortionHeadline4})`;

    return (
        <li key={tome[0].eng}>
            <SpanLikeLink onClick={onTomeClick}>
                {assembledHeadline}
            </SpanLikeLink>
        </li>
    );
};

const SpanLikeLink = styled.span`
    cursor: pointer;
    color: black;
    text-decoration: underline;
`;

export default Tome;
