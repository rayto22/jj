import { STORAGE_KEY } from '@/interfaces/types';
import { getLocalStorageData, setLocalStorageData } from './localStorageUtils';

export const loadData = (storageKey: STORAGE_KEY) => {
    return getLocalStorageData(storageKey);
};

export const saveData = (storageKey: STORAGE_KEY, data: unknown) => {
    setLocalStorageData(storageKey, data);
};
