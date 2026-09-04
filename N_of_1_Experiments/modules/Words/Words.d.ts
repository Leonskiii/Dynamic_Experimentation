export type StringList_Formatter = (list: string[]) => string;
export declare function camel_case_formatter(list: string[]): string;
export declare function snake_case_formatter(list: string[]): string;
export declare abstract class Words {
    words: string[];
    pull_random_word(): string;
    pull_n_random_words(number_of_words: number): string[];
    pull_n_random_formatted_words(number_of_words: number, formatter: ((string: any) => string)): string[];
    max_word_length(): any;
    min_word_length(): any;
    static capitalizeFirstLetter_formatter: (aString: string) => string;
    static lowerCaseFirstLetter_formatter: (aString: string) => string;
    generate_composite_identifier_of_length(length: number): any;
    get_random_word(): string;
    get_random_word_with_filter(f: any): string;
    pull_random_word_with_filter(f: any): string;
    get_random_word_of_length(length: number): string;
    get_random_word_list(list_length: any, line_length: number): any[];
    generate_formatted_composite_identifier_from_number_of_words(number_of_words: number, formatter: StringList_Formatter): string;
    generate_camelcase_identifier(number_of_words: number): void;
    generate_random_word_list(list_length: number): any[];
    replace_letters_starting_at(word: string, num_letters_to_replace: any, first_change_position: number): string[];
    replace_letters(word: string, num_letters: any): string[];
}
