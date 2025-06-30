import { FC, useState } from 'react';
import { loadData, saveData } from '@/utils/dataManager';
import { STORAGE_KEY } from '@/interfaces/types';

export const DeckOverviewCheckbox: FC = () => {
    const [showDeckOverview, setShowDeckOverview] = useState<boolean>(
        () => loadData(STORAGE_KEY.DISPLAY_DECK_OVERVIEW) ?? false
    );
    const onModeChange = () => {
        setShowDeckOverview((state) => {
            saveData(STORAGE_KEY.DISPLAY_DECK_OVERVIEW, !state);
            return !state;
        });
    };

    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={showDeckOverview}
                    onChange={onModeChange}
                />
                <span>Display deck</span>
            </label>
        </div>
    );
};
