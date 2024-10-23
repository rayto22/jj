import { FC } from 'react';
import Sidebar from '../sidebar/Sidebar';
import TranslationMode from './TranslationMode';

const Settings: FC = () => {
    return (
        <Sidebar sidebarIndex={1}>
            <TranslationMode />
        </Sidebar>
    );
};

export default Settings;
