import { FC, useState } from 'react';
import { styled } from 'styled-components';
import {
    getLocalStorageData,
    setLocalStorageData,
    LS_RECORD,
} from 'utils/localStorageUtils';

const VocabularyDisplaySetting: FC = () => {
    const [showVocabulary, setShowVocabulary] = useState<boolean>(
        () => getLocalStorageData(LS_RECORD.VOCABULARY_DISPLAY_SETTING) ?? false
    );
    const onModeChange = () => {
        setShowVocabulary((state) => {
            setLocalStorageData(LS_RECORD.VOCABULARY_DISPLAY_SETTING, !state);
            return !state;
        });
    };

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={showVocabulary}
                    onChange={onModeChange}
                />
                <span>Display vocabulary</span>
            </label>
        </div>
    );
};

export default VocabularyDisplaySetting;
