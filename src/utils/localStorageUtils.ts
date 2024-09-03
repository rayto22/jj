export enum LS_RECORD {
    MAIN_VOCABULARY = 'vocabulary',
    MAIN_VOCABULARY_UPDATE_DATE = 'vocabularyUpdateDate',
    MAIN_VOCABULARY_LEFT_TO_REPEAT = 'vocabularyLeftToRepeat',
    CHERRY_PICKED_WORDS = 'cherryPickedWords',
    REPORTED_WORDS = 'reportedWords',
    TRANSLATION_MODE_J_TO_E = 'translationModeJToE',
}

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
