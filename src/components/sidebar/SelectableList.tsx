import { FC, PropsWithChildren, useState } from 'react';
import { styled } from 'styled-components';
import { VocabularyUnits, VocabularyUnit } from '@/interfaces/types';

interface Props {
    list: VocabularyUnits;
    isSelected: (item: VocabularyUnit) => boolean;
    onSelect: (item: VocabularyUnit) => void;
}

const SelectableList: FC<Props> = ({ list, isSelected, onSelect }) => {
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

const ItemEng = styled.span`
    margin-left: 1rem;
`;

export default SelectableList;
