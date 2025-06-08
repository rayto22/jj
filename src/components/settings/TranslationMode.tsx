import { FC, useState } from 'react';
import { loadData, saveData } from '@/utils/dataManager';
import { STORAGE_KEY } from '@/interfaces/types';

const TranslationMode: FC = () => {
    const [isJpToEn, setIsJpToEn] = useState<boolean>(
        () => loadData(STORAGE_KEY.TRANSLATION_MODE_J_TO_E) ?? true
    );
    const onModeChange = () => {
        setIsJpToEn((state) => {
            saveData(STORAGE_KEY.TRANSLATION_MODE_J_TO_E, !state);
            return !state;
        });
    };

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={isJpToEn}
                    onChange={onModeChange}
                />
                <span>Translate JP to EN?</span>
            </label>
        </div>
    );
};

export default TranslationMode;
