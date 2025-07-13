import { Routes, Route, HashRouter } from 'react-router-dom';

import { PARENT_ROUTE, CHILD_ROUTE } from './interfaces/types';

import { EmptyRouteLayout } from './components/shared/EmptyRouteLayout';
import GoHomeButton from './components/settings/GoHomeButton';
import IndexPage from './components/IndexPage';
import { HiraganaPracticeMain } from './components/hiraganaPractice/HiraganaPracticeMain';
import { Library } from './components/library/Library';
import { EverydayPracticeMain } from './components/everydayPractice/EverydayPracticeMain';
import { CherryPickPracticeMain } from './components/cherryPickPractice/CherryPickPracticeMain';
import { LexFixMain } from './components/lexFix/LexFixMain';
import { PracticeSession } from './components/practiceSession/PracticeSession';

import GlobalStyle from './styles/globalStyle';

// eslint-disable-next-line react/prop-types
function getLibraryAndPracticeSessionRoots({ libraryPath }) {
    return (
        <Route path={libraryPath} element={<EmptyRouteLayout />}>
            <Route index element={<Library />} />
            <Route
                path={CHILD_ROUTE.PRACTICE_SESSION}
                element={<PracticeSession />}
            />
        </Route>
    );
}

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

                {getLibraryAndPracticeSessionRoots({
                    libraryPath: PARENT_ROUTE.REGULAR_PRACTICE,
                })}

                <Route
                    path={PARENT_ROUTE.EVERYDAY_PRACTICE}
                    element={<EmptyRouteLayout />}
                >
                    <Route index element={<EverydayPracticeMain />} />
                    <Route
                        path={CHILD_ROUTE.PRACTICE_SESSION}
                        element={<PracticeSession />}
                    />
                </Route>

                <Route
                    path={PARENT_ROUTE.CHERRY_PICK_PRACTICE}
                    element={<EmptyRouteLayout />}
                >
                    <Route index element={<CherryPickPracticeMain />} />
                    {getLibraryAndPracticeSessionRoots({
                        libraryPath: CHILD_ROUTE.CHERRY_PICK_LIBRARY,
                    })}
                    {getLibraryAndPracticeSessionRoots({
                        libraryPath: CHILD_ROUTE.SUPER_CHERRY_PICK_LIBRARY,
                    })}
                </Route>

                <Route path={PARENT_ROUTE.LEX_2_FIX} element={<LexFixMain />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
