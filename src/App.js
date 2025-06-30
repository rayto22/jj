import { Routes, Route, HashRouter } from 'react-router-dom';

import { PARENT_ROUTE, CHILD_ROUTE } from '@/interfaces/types';

import { EmptyRouteLayout } from './components/shared/EmptyRouteLayout';
import GoHomeButton from './components/settings/GoHomeButton';
import IndexPage from './components/IndexPage';
import { HiraganaPracticeMain } from './components/hiraganaPractice/HiraganaPracticeMain';
import { Library } from './components/library/Library';
import { EverydayPracticeMain } from './components/everydayPractice/EverydayPracticeMain';
import { CherryPickPracticeMain } from './components/cherryPickPractice/CherryPickPracticeMain';
import { ReportedWordsPage } from './components/library/ReportedWordsPage';

import GlobalStyle from './styles/globalStyle';

function App() {
    return (
        <HashRouter>
            <GlobalStyle />
            <GoHomeButton />
            <Routes>
                <Route path={PARENT_ROUTE.HOME} element={<IndexPage />} />
                <Route
                    path={PARENT_ROUTE.HIRAGANA}
                    element={<HiraganaPracticeMain />}
                />
                <Route
                    path={PARENT_ROUTE.REGULAR_PRACTICE}
                    element={<Library />}
                ></Route>

                <Route
                    path={PARENT_ROUTE.EVERYDAY_PRACTICE}
                    element={<EmptyRouteLayout />}
                >
                    <Route index element={<EverydayPracticeMain />} />
                    <Route
                        path={CHILD_ROUTE.PRACTICE_SESSION}
                        element={<Library />}
                    />
                </Route>

                <Route
                    path={PARENT_ROUTE.CHERRY_PICK_PRACTICE}
                    element={<EmptyRouteLayout />}
                >
                    <Route index element={<CherryPickPracticeMain />} />
                    <Route
                        path={CHILD_ROUTE.PRACTICE_SESSION}
                        element={<Library />}
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
