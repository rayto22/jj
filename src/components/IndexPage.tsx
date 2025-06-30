import { Link } from 'react-router-dom';

import { PARENT_ROUTE, STORAGE_KEY } from '../interfaces/types';
import { loadData } from '@/utils/dataManager';

export default function IndexPage() {
    const hasReportedWords = loadData(STORAGE_KEY.LEX_2_FIX)?.length;

    return (
        <div>
            <hr />
            <ul>
                <li>
                    <Link to={PARENT_ROUTE.HIRAGANA}>Hiragana</Link>
                </li>
                <li>
                    <Link to={PARENT_ROUTE.REGULAR_PRACTICE}>
                        Regular Practice
                    </Link>
                </li>
                <li>
                    <Link to={PARENT_ROUTE.EVERYDAY_PRACTICE}>
                        Everyday Practice
                    </Link>
                </li>
                <li>
                    <Link to={PARENT_ROUTE.CHERRY_PICK_PRACTICE}>
                        Cherry Pick Practice
                    </Link>
                </li>
                {hasReportedWords ? (
                    <li>
                        <Link to={PARENT_ROUTE.LEX_2_FIX}>Lex 2 Fix</Link>
                    </li>
                ) : null}
            </ul>
        </div>
    );
}
