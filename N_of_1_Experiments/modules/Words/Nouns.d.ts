import { Words } from "./Words.js";
export declare class Nouns extends Words {
    static static_words: string[];
    get_word_of_length(target_length: number): string;
    constructor();
}
