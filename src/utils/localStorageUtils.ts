import { STORAGE_KEY } from '@/interfaces/types';

const isComplexData = (data: string) => data[0] === '[' || data[0] === '{';
const isBooleanData = (data: string) =>
    ['true', 'false'].some((boolValue) => data === boolValue);

export const getLocalStorageData = (key: STORAGE_KEY) => {
    const data: string = localStorage.getItem(key);

    if (!data) return null;

    return isComplexData(data) || isBooleanData(data) ? JSON.parse(data) : data;
};

export const setLocalStorageData = (key: STORAGE_KEY, value: unknown) => {
    const isString = typeof value === 'string';

    localStorage.setItem(key, isString ? value : JSON.stringify(value));
};
