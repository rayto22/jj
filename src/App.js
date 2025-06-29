import { Routes, Route, HashRouter } from 'react-router-dom';

import { PARENT_ROUTE, CHILD_ROUTE } from '@/interfaces/types';

import GoHomeButton from './components/settings/GoHomeButton';
import IndexPage from './components/IndexPage';
import TestForm from './components/TestForm';
import VocabularyRepetition from './components/vocabulary/Repetition';
import {
    EverydayRepetitionLayout,
    EverydayRepetitionMain,
} from './components/EverydayRepetition';
import {
    CherryPickRepetitionLayout,
    CherryPickRepetitionMain,
} from './components/CherryPickRepetition';
import { ReportedWordsPage } from './components/vocabulary/ReportedWordsPage';

import GlobalStyle from './styles/globalStyle';

function App() {
    return (
        <HashRouter>
            <GlobalStyle />
            <GoHomeButton />
            <Routes>
                <Route path={PARENT_ROUTE.HOME} element={<IndexPage />} />
                <Route path={PARENT_ROUTE.HIRAGANA} element={<TestForm />} />
                <Route
                    path={PARENT_ROUTE.VOCABULARY_REPETITION}
                    element={<VocabularyRepetition />}
                />

                <Route
                    path={PARENT_ROUTE.EVERYDAY_REPETITION}
                    element={<EverydayRepetitionLayout />}
                >
                    <Route index element={<EverydayRepetitionMain />} />
                    <Route
                        path={CHILD_ROUTE.SESSION}
                        element={<VocabularyRepetition />}
                    />
                </Route>

                <Route
                    path={PARENT_ROUTE.CHERRY_PICK_REPETITION}
                    element={<CherryPickRepetitionLayout />}
                >
                    <Route index element={<CherryPickRepetitionMain />} />
                    <Route
                        path={CHILD_ROUTE.SESSION}
                        element={<VocabularyRepetition />}
                    />
                </Route>

                <Route
                    path={PARENT_ROUTE.REPORTED_WORDS}
                    element={<ReportedWordsPage />}
                />
            </Routes>
        </HashRouter>
    );
}

export default App;
