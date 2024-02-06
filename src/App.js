import { Routes, Route, Outlet } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import TestForm from './components/TestForm';
import VocabularyRepetition from './components/vocabulary/Repetition';

function App() {
    return (
        <Routes>
            <Route path="/jj" element={<Outlet />}>
                <Route index element={<IndexPage />} />
            </Route>
            <Route path="/hiragana" element={<Outlet />}>
                <Route index element={<TestForm />} />
            </Route>
            <Route path="/vocabularyRepetition" element={<Outlet />}>
                <Route index element={<VocabularyRepetition />} />
            </Route>
        </Routes>
    );
}

export default App;
