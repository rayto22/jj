import { Link } from 'react-router-dom';
import { getLocalStorageData } from 'utils/localStorageUtils';

export default function IndexPage() {
    const hasReportedWords = getLocalStorageData('reportedWords')?.length;

    return (
        <div>
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
