import { Link } from 'react-router-dom';

export default function IndexPage() {
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
            </ul>
        </div>
    );
}
