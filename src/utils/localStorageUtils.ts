export enum LS_RECORD {
    MAIN_VOCABULARY = 'vocabulary',
    MAIN_VOCABULARY_UPDATE_DATE = 'vocabularyUpdateDate',
    MAIN_VOCABULARY_LEFT_TO_REPEAT = 'vocabularyLeftToRepeat',
    CHERRY_PICKED_WORDS = 'cherryPickedWords',
    SUPER_CHERRY_PICKED_WORDS = 'superCherryPickedWords',
    REPORTED_WORDS = 'reportedWords',
    TRANSLATION_MODE_J_TO_E = 'translationModeJpToEn',
}

const isComplexData = (data: string) => data[0] === '[' || data[0] === '{';
const isBooleanData = (data: string) =>
    ['true', 'false'].some((boolValue) => data === boolValue);

export const getLocalStorageData = (key: string) => {
    const data: string = localStorage.getItem(key);

    if (!data) return null;

    return isComplexData(data) || isBooleanData(data) ? JSON.parse(data) : data;
};

export const setLocalStorageData = (key: string, value: unknown) => {
    const isString = typeof value === 'string';

    localStorage.setItem(key, isString ? value : JSON.stringify(value));
};
