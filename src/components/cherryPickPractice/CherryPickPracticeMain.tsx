import { useNavigate } from 'react-router-dom';

import { CHILD_ROUTE, STORAGE_KEY } from '../../interfaces/types';
import { loadData, saveData } from '@/utils/dataManager';
import { useForceUpdate } from '@/hooks/useForceUpdate';
import styled from 'styled-components';

export const CherryPickPracticeMain = () => {
    const navigate = useNavigate();
    const forceUpdate = useForceUpdate();

    const cherryPickedWords = loadData(STORAGE_KEY.CHERRY_PICK_LIBRARY) || [];
    const superCherryPickedWords =
        loadData(STORAGE_KEY.SUPER_CHERRY_PICK_LIBRARY) || [];
    const startPractice = ({ isSuper }: { isSuper?: boolean } = {}) => {
        navigate(CHILD_ROUTE.TOME_SELECTION, {
            state: {
                customLibrary: isSuper
                    ? superCherryPickedWords
                    : cherryPickedWords,
                cherryPickStorageKey: STORAGE_KEY.SUPER_CHERRY_PICK_LIBRARY, FIX THIS (use different route and instad and check it where needed)
            },
        });
    };
    const loadSuperCherryPickStorage = () => {
        const result = confirm('Load super cherry pick base?');

        if (result) {
            saveData(STORAGE_KEY.CHERRY_PICK_LIBRARY, superCherryPickedWords);
            saveData(STORAGE_KEY.SUPER_CHERRY_PICK_LIBRARY, []);
            forceUpdate();
        }
    };
    const clearCherryPickStorage = () => {
        const result = confirm('Clear cherry pick?');

        if (result) {
            saveData(STORAGE_KEY.CHERRY_PICK_LIBRARY, []);
            forceUpdate();
        }
    };

    return (
        <>
            <div>
                <Button onClick={() => startPractice()}>
                    Start Cherry Pick Repetion ({cherryPickedWords.length})
                </Button>
            </div>
            <div>
                <Button onClick={() => startPractice({ isSuper: true })}>
                    Start SUPER Cherry Pick Repetion (
                    {superCherryPickedWords.length})
                </Button>
            </div>
            <div>
                <Button onClick={loadSuperCherryPickStorage}>
                    Load Super Cherry Pick Repetion (
                    {superCherryPickedWords.length})
                </Button>
            </div>
            <div>
                <Button onClick={clearCherryPickStorage}>
                    Clear Cherry Pick base
                </Button>
            </div>
        </>
    );
};

const Button = styled.button`
    margin-bottom: 20px;
`;
