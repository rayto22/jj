import { useNavigate } from 'react-router-dom';

import { CHILD_ROUTE } from '../../interfaces/types';
import {
    getLocalStorageData,
    setLocalStorageData,
    LS_RECORD,
} from 'utils/localStorageUtils';
import { useForceUpdate } from 'hooks/useForceUpdate';
import styled from 'styled-components';

export const CherryPickRepetitionMain = () => {
    const navigate = useNavigate();
    const forceUpdate = useForceUpdate();

    const cherryPickedWords =
        getLocalStorageData(LS_RECORD.CHERRY_PICKED_WORDS) || [];
    const superCherryPickedWords =
        getLocalStorageData(LS_RECORD.SUPER_CHERRY_PICKED_WORDS) || [];
    const startRepetition = ({ isSuper }: { isSuper?: boolean } = {}) => {
        navigate(CHILD_ROUTE.SESSION, {
            state: {
                customVocabularyCache: isSuper
                    ? superCherryPickedWords
                    : cherryPickedWords,
                cherryPickStorageKey: LS_RECORD.SUPER_CHERRY_PICKED_WORDS,
            },
        });
    };
    const loadSuperCherryPickStorage = () => {
        const result = confirm('Load super cherry pick base?');

        if (result) {
            setLocalStorageData(
                LS_RECORD.CHERRY_PICKED_WORDS,
                superCherryPickedWords
            );
            setLocalStorageData(LS_RECORD.SUPER_CHERRY_PICKED_WORDS, []);
            forceUpdate();
        }
    };
    const clearCherryPickStorage = () => {
        const result = confirm('Clear cherry pick?');

        if (result) {
            setLocalStorageData(LS_RECORD.CHERRY_PICKED_WORDS, []);
            forceUpdate();
        }
    };

    return (
        <>
            <div>
                <Button onClick={() => startRepetition()}>
                    Start Cherry Pick Repetion ({cherryPickedWords.length})
                </Button>
            </div>
            <div>
                <Button onClick={() => startRepetition({ isSuper: true })}>
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
