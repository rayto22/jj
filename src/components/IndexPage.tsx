import { Link } from 'react-router-dom';

import { PARENT_ROUTE, STORAGE_KEY } from '../interfaces/types';
import { loadData } from '@/utils/dataManager';

export default function IndexPage() {
    const hasReportedWords = loadData(STORAGE_KEY.REPORTED_WORDS)?.length;

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
