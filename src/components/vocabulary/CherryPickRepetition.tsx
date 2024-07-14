import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorageData } from 'utils/localStorageUtils';

const CherryPickRepetition = () => {
    const navigate = useNavigate();

    const cherryPickedWords = getLocalStorageData('cherryPickedWords') || [];

    useEffect(() => {
        navigate('/cherryPickRepetition/start', {
            state: {
                customVocabularyCache: cherryPickedWords,
            },
        });
    }, []);

    return <></>;
};

export default CherryPickRepetition;
