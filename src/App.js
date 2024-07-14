import { Routes, Route } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import TestForm from './components/TestForm';
import VocabularyRepetition from './components/vocabulary/Repetition';
import EverydayRepetition from 'components/vocabulary/EverydayRepetition';
import CherryPickRepetition from 'components/vocabulary/CherryPickRepetition';
import GlobalStyle from './styles/globalStyle';

function App() {
    return (
        <>
            <GlobalStyle />
            <Routes>
                <Route path="/jj" element={<IndexPage />} />
                <Route path="/hiragana" element={<TestForm />} />
                <Route
                    path="/vocabularyRepetition"
                    element={<VocabularyRepetition />}
                />
                <Route
                    path="/everydayRepetition"
                    element={<EverydayRepetition />}
                />
                <Route
                    path="/everydayRepetition/session"
                    element={<VocabularyRepetition />}
                />
                <Route
                    path="/cherryPickRepetition"
                    element={<CherryPickRepetition />}
                />
                <Route
                    path="/cherryPickRepetition/start"
                    element={<VocabularyRepetition />}
                />
            </Routes>
        </>
    );
}

export default App;
