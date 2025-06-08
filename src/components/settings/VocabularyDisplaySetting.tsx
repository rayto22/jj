import { FC, useState } from 'react';
import { loadData, saveData } from '@/utils/dataManager';
import { STORAGE_KEY } from '@/interfaces/types';

const VocabularyDisplaySetting: FC = () => {
    const [showVocabulary, setShowVocabulary] = useState<boolean>(
        () => loadData(STORAGE_KEY.VOCABULARY_DISPLAY_SETTING) ?? false
    );
    const onModeChange = () => {
        setShowVocabulary((state) => {
            saveData(STORAGE_KEY.VOCABULARY_DISPLAY_SETTING, !state);
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
