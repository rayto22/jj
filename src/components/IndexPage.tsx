import { Link } from 'react-router-dom';

import { PARENT_ROUTE } from '../interfaces/types';
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
                    <Link to={PARENT_ROUTE.HIRAGANA}>Hiragana</Link>
                </li>
                <li>
                    <Link to={PARENT_ROUTE.VOCABULARY_REPETITION}>
                        Vocabulary Repetition
                    </Link>
                </li>
                <li>
                    <Link to={PARENT_ROUTE.EVERYDAY_REPETITION}>
                        Everyday Repetition
                    </Link>
                </li>
                <li>
                    <Link to={PARENT_ROUTE.CHERRY_PICK_REPETITION}>
                        Cherry Pick Repetition
                    </Link>
                </li>
                {hasReportedWords ? (
                    <li>
                        <Link to={PARENT_ROUTE.REPORTED_WORDS}>
                            Reported Words
                        </Link>
                    </li>
                ) : null}
            </ul>
        </div>
    );
}
