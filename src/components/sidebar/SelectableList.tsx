import { FC, PropsWithChildren, useState } from 'react';
import { styled } from 'styled-components';
import { VocabularyUnits, VocabularyUnit } from '@/interfaces/types';

interface Props {
    list: VocabularyUnits;
    isSelected: (item: VocabularyUnit) => boolean;
    onSelect: (item: VocabularyUnit) => void;
    isWordReported: (item: VocabularyUnit) => boolean;
    onReport: (item: VocabularyUnit) => void;
}

const SelectableList: FC<Props> = ({
    list,
    isSelected,
    onSelect,
    isWordReported,
    onReport,
}) => {
    return (
        <ListWrap>
            {list.map((item) => (
                <Item key={item.kanamoji + item.eng}>
                    <label>
                        <input
                            type="checkbox"
                            checked={isSelected(item)}
                            onChange={() => onSelect(item)}
                        />
                        <span>{item.kanamoji}</span>
                        <br />
                        <ReportCheckbox
                            type="checkbox"
                            checked={isWordReported(item)}
                            onChange={() => onReport(item)}
                        />
                        <ItemEng>{item.eng}</ItemEng>
                    </label>
                </Item>
            ))}
        </ListWrap>
    );
};

const ListWrap = styled.div`
    height: 100%;
    overflow: auto;
`;

const Item = styled.div`
    margin: 0.25rem;
    border-bottom: 0.5px solid black;
`;

const ReportCheckbox = styled.input`
    accent-color: red;
`;

const ItemEng = styled.span`
    margin-left: 0.5rem;
`;

export default SelectableList;
