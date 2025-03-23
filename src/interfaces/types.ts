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
