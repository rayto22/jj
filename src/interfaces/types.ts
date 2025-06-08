export enum PARENT_ROUTE {
    HOME = '/',
    HIRAGANA = '/hiragana',
    VOCABULARY_REPETITION = '/vocabularyRepetition',
    EVERYDAY_REPETITION = '/everydayRepetition',
    CHERRY_PICK_REPETITION = '/cherryPickRepetition',
    REPORTED_WORDS = '/reportedWords',
}

export enum CHILD_ROUTE {
    SESSION = 'session',
}

export enum STORAGE_KEY {
    MAIN_VOCABULARY = 'vocabulary',
    MAIN_VOCABULARY_UPDATE_DATE = 'vocabularyUpdateDate',
    MAIN_VOCABULARY_LEFT_TO_REPEAT = 'vocabularyLeftToRepeat',
    CHERRY_PICKED_WORDS = 'cherryPickedWords',
    SUPER_CHERRY_PICKED_WORDS = 'superCherryPickedWords',
    REPORTED_WORDS = 'reportedWords',
    TRANSLATION_MODE_J_TO_E = 'translationModeJpToEn',
    VOCABULARY_DISPLAY_SETTING = 'vocabularyDisplaySetting',
    REVERTED_VOCABULARY_ORDER = 'revertedVocabularyOrder',
    SESSION_HISTORY = 'sessionHistory',
}

export interface VocabularyUnit {
    kanamoji: string;
    romaji: string;
    eng: string;
    tags?: string | Array<string>;
}

export type VocabularyUnits = Array<VocabularyUnit>;

export enum SESSION_TYPE {
    VOCABULARY_REPETITION = 'Vocabulary rep',
    EVERYDAY_REPETITION = 'Everyday rep',
    CHERRY_PICK_REPETITION = 'Cherry pick rep',
    UNKNOWN = 'Unknown',
}

export interface SessionData {
    type: SESSION_TYPE;
    date: number;
    duration: string;
    quantity: number;
}

export type SessionHistory = Array<SessionData>;

export type PartialSessionData = Partial<SessionData>;
