export enum PARENT_ROUTE {
    HOME = '/',
    HIRAGANA = '/hiragana',
    REGULAR_PRACTICE = '/regularPractice',
    EVERYDAY_PRACTICE = '/everydayPractice',
    CHERRY_PICK_PRACTICE = '/cherryPickPractice',
    REPORTED_WORDS = '/reportedWords',
}

export enum CHILD_ROUTE {
    PRACTICE_SESSION = 'play',
}

export enum STORAGE_KEY {
    MAIN_VOCABULARY = 'vocabulary',
    MAIN_VOCABULARY_LEFT_TO_REPEAT = 'vocabularyLeftToPractice',
    CHERRY_PICKED_WORDS = 'cherryPickedWords',
    SUPER_CHERRY_PICKED_WORDS = 'superCherryPickedWords',
    REPORTED_WORDS = 'reportedWords',
    TRANSLATION_MODE_J_TO_E = 'translationModeJpToEn',
    VOCABULARY_DISPLAY_SETTING = 'vocabularyDisplaySetting',
    REVERTED_VOCABULARY_ORDER = 'revertedVocabularyOrder',
    SESSION_HISTORY = 'sessionHistory',
}

export interface LexUnit {
    kanamoji: string;
    romaji: string;
    eng: string;
    tags?: string | Array<string>;
}

export type LexUnits = Array<LexUnit>;

export enum SESSION_TYPE {
    REGULAR_PRACTICE = 'Regular practice',
    EVERYDAY_PRACTICE = 'Everyday practice',
    CHERRY_PICK_PRACTICE = 'Cherry pick practice',
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
