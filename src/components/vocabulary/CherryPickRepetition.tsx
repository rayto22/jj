import { useNavigate } from 'react-router-dom';
import { getLocalStorageData, LS_RECORD } from 'utils/localStorageUtils';

const CherryPickRepetition = () => {
    const navigate = useNavigate();

    const cherryPickedWords =
        getLocalStorageData(LS_RECORD.CHERRY_PICKED_WORDS) || [];
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
