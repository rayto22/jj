export const getLocalStorageData = (key: string) => {
    const data: string = localStorage.getItem(key);

    if (!data) return null;

    const isComplexData = data[0] === '[' || data[0] === '{';

    return isComplexData ? JSON.parse(data) : data;
};

export const setLocalStorageData = (key: string, value: unknown) => {
    const isString = typeof value === 'string';

    localStorage.setItem(key, isString ? value : JSON.stringify(value));
};
