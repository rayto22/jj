import { Routes, Route } from 'react-router-dom';
import IndexPage from './components/IndexPage';
import TestForm from './components/TestForm';
import VocabularyRepetition from './components/vocabulary/Repetition';
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
            </Routes>
        </>
    );
}

export default App;
