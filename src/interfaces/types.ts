export interface VocabularyUnit {
    kanamoji: string;
    romaji: string;
    eng: string;
    tags?: string | Array<string>;
}

export type VocabularyUnits = Array<VocabularyUnit>;
