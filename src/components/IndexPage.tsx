import { Link } from 'react-router-dom';
import { getLocalStorageData, LS_RECORD } from 'utils/localStorageUtils';

export default function IndexPage() {
    const hasReportedWords = getLocalStorageData(
        LS_RECORD.REPORTED_WORDS
    )?.length;

    return (
        <div>
            <hr />
            <ul>
                <li>
                    <Link to="/hiragana">Hiragana</Link>
                </li>
                <li>
                    <Link to="/vocabularyRepetition">
                        Vocabulary Repetition
                    </Link>
                </li>
                <li>
                    <Link to="/everydayRepetition">Everyday Repetition</Link>
                </li>
                <li>
                    <Link to="/cherryPickRepetition">
                        Cherry Pick Repetition
                    </Link>
                </li>
                {hasReportedWords ? (
                    <li>
                        <Link to="/reportedWords">Reported Words</Link>
                    </li>
                ) : null}
            </ul>
        </div>
    );
}
