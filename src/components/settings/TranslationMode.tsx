import { FC, useState } from 'react';
import { styled } from 'styled-components';
import {
    getLocalStorageData,
    setLocalStorageData,
    LS_RECORD,
} from 'utils/localStorageUtils';

const TranslationMode: FC = () => {
    const [isJpToEn, setIsJpToEn] = useState<boolean>(
        () => getLocalStorageData(LS_RECORD.TRANSLATION_MODE_J_TO_E) ?? true
    );
    const onModeChange = () => {
        setIsJpToEn((state) => {
            setLocalStorageData(LS_RECORD.TRANSLATION_MODE_J_TO_E, !state);
            return !state;
        });
    };

    console.log(isJpToEn);

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
