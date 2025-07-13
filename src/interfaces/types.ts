export enum PARENT_ROUTE {
    HOME = '/',
    HIRAGANA = '/hiragana',
    REGULAR_PRACTICE = '/regularPractice',
    EVERYDAY_PRACTICE = '/everydayPractice',
    CHERRY_PICK_PRACTICE = '/cherryPickPractice',
    LEX_2_FIX = '/lex2Fix',
}

export enum CHILD_ROUTE {
    PRACTICE_SESSION = 'play',
    TOME_SELECTION = 'tome',
    CHERRY_PICK_LIBRARY = 'cherryPickLibrary',
    SUPER_CHERRY_PICK_LIBRARY = 'superCherryPickLibrary',
}

export enum STORAGE_KEY {
    CENTRAL_LIBRARY = 'centralLibrary',
    EVERYDAY_PRACTICE_QUEUE = 'everydayPracticeQueue',
    CHERRY_PICK_LIBRARY = 'cherryPickLibrary',
    SUPER_CHERRY_PICK_LIBRARY = 'superCherryPickLibrary',
    LEX_2_FIX = 'lex2Fix',

    SESSION_HISTORY = 'sessionHistory',

    DISPLAY_DECK_OVERVIEW = 'displayDeckOverview',
    REVERT_ORDER = 'revertOrder',
    JP_2_EN_MODE = 'translationModeJpToEn',
    EVERYDAY_PRACTICE_DECK_SIZE = 'everydayPracticeDeckSize',
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
