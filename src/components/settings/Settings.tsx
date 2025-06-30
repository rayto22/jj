import { FC } from 'react';
import Sidebar from '../sidebar/Sidebar';
import TranslationMode from './TranslationMode';
import { DeckOverviewCheckbox } from './DeckOverviewCheckbox';
import { styled } from 'styled-components';

const Settings: FC = () => {
    return (
        <Sidebar sidebarIndex={1}>
            <ListWrap>
                <TranslationMode />
                <DeckOverviewCheckbox />
            </ListWrap>
        </Sidebar>
    );
};

const ListWrap = styled.div`
    height: 100%;
    overflow: auto;
    padding: 0 5px;
`;

export default Settings;
