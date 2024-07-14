import { useNavigate } from 'react-router-dom';
import { getLocalStorageData } from 'utils/localStorageUtils';

const CherryPickRepetition = () => {
    const navigate = useNavigate();

    const cherryPickedWords = getLocalStorageData('cherryPickedWords') || [];
    const startRepetition = () => {
        navigate('/cherryPickRepetition/start', {
            state: {
                customVocabularyCache: cherryPickedWords,
            },
        });
    };

    return (
        <button onClick={startRepetition}>
            Start Cherry Pick Repetion ({cherryPickedWords.length})
        </button>
    );
};

export default CherryPickRepetition;
