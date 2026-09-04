import {do_random_array_sort} from "../../../../N_of_1_Experiments/modules/Experimentation/Experimentation.js";
import {Nouns} from "../../../../N_of_1_Experiments/modules/Words/Nouns.js";

const nouns_instance = new Nouns();

function random_noun(used: Set<string>): string {
    let word     = nouns_instance.get_random_word();
    let attempts = 0;
    while (used.has(word) && attempts < 100) {
        word = nouns_instance.get_random_word();
        attempts++;
    }
    used.add(word);
    return word;
}

function noun_of_length(len: number, used: Set<string>): string {
    let result = "";
    while (result.length < len) {
        let word = nouns_instance.get_random_word();
        let attempts = 0;
        while (used.has(word) && attempts < 100) {
            word = nouns_instance.get_random_word();
            attempts++;
        }
        used.add(word);
        result += word;
    }
    return result.slice(0, len);
}

export abstract class Term {
    abstract print_into(array: string[], indentation_depth: number, indentation_size: number): void;
    abstract print_into_with_extra_lines(array: string[], indentation_depth: number, indentation_size: number): void;

    print_string(indentation_size: number): string {
        let arr = [];
        this.print_into(arr, 0, indentation_size);
        return arr.join("");
    }

    print_string_with_extra_lines(indentation_size: number): string {
        let arr = [];
        this.print_into_with_extra_lines(arr, 0, indentation_size);
        return arr.join("");
    }
}

export class Return extends Term {
    return_value: number;
    constructor(return_value: number) { super(); this.return_value = return_value; }
    print_into(array: string[], _depth: number, _length: number): void                { array.push(" " + this.return_value + "\n"); }
    print_into_with_extra_lines(array: string[], _depth: number, _size: number): void { array.push(" " + this.return_value + "\n"); }
}

export class Nested_Ifs extends Term {
    condition_string: string;
    then_branch: Term;
    else_branch: Term;

    print_into(array: string[], indentation_depth: number, indentation_length: number): void {
        array.push(" ".repeat(indentation_length * indentation_depth) + "if(" + this.condition_string + ") {\n");
        if (!(this.then_branch instanceof Return))
            this.then_branch.print_into(array, indentation_depth + 1, indentation_length);
        array.push(" ".repeat(indentation_length * indentation_depth) + "}");
        this.else_branch.print_into(array, indentation_depth + 1, indentation_length);
    }

    print_into_with_extra_lines(array: string[], indentation_depth: number, indentation_length: number): void {
        array.push(" ".repeat(indentation_length * indentation_depth) + "if(" + this.condition_string + ") {\n");
        if (!(this.then_branch instanceof Return))
            this.then_branch.print_into_with_extra_lines(array, indentation_depth + 1, indentation_length);
        array.push(" ".repeat(indentation_length * indentation_depth) + "}");
        this.else_branch.print_into_with_extra_lines(array, indentation_depth + 1, indentation_length);
    }

    print_into_continuation(array: string[], col: number): void {
        const if_str   = "if(" + this.condition_string + ") {";
        const next_col = col + if_str.length + 1;
        array.push(" ".repeat(col) + if_str + "\n");
        if (!(this.then_branch instanceof Return))
            (this.then_branch as Nested_Ifs).print_into_continuation(array, next_col);
        array.push(" ".repeat(col) + "}");
        this.else_branch.print_into(array, 0, 0);
    }

    target_condition_string(target_number: number): string {
        if (target_number == 1) return this.condition_string;
        if (this.then_branch instanceof Return) throw "Invalid target number";
        return (this.then_branch as Nested_Ifs).target_condition_string(target_number - 1);
    }

    target_word(target_number: number): string {
        return this.target_condition_string(target_number);
    }

    return_string(target_number: number): string {
        if (target_number == 1) return (this.else_branch as Return).return_value.toString();
        return (this.then_branch as Nested_Ifs).return_string(target_number - 1);
    }

    set_condition_at_level(target_level: number, condition: string): void {
        if (target_level == 1) { this.condition_string = condition; return; }
        if (this.then_branch instanceof Return) throw "Invalid level";
        (this.then_branch as Nested_Ifs).set_condition_at_level(target_level - 1, condition);
    }
}

// Wortlängen für Noise-Baseline (Länge 14, 65% Overlap):
// Markiertes Wort:  37 Zeichen
// Wort darüber:     37 Zeichen
// Wort darunter:    35 Zeichen
// → Overlap oben = unten = 24/37 = 64.9%
export const NOISE_MARKED_LEN = 37;
export const NOISE_ABOVE_LEN  = 37;
export const NOISE_BELOW_LEN  = 35;

// No-Noise-Baseline: Länge 6, kurze Wörter
export const NO_NOISE_WORD_LEN = 2;

export function generate_if_statement_noise(
    nesting_depth: number,
    level: number
): { if_statement: Nested_Ifs, marked_word: string } {

    const used = new Set<string>();

    let returns = [];
    for (let i = 1; i <= nesting_depth; i++) returns.push(i);
    returns = do_random_array_sort(returns);

    // Alle anderen Levels: mittellange Wörter
    let deepest_if              = new Nested_Ifs();
    deepest_if.condition_string = noun_of_length(10, used);
    deepest_if.then_branch      = new Return(0);
    deepest_if.else_branch      = new Return(returns.pop());

    let then_if = deepest_if;
    for (let counter = 1; counter < nesting_depth; counter++) {
        let new_if              = new Nested_Ifs();
        new_if.condition_string = noun_of_length(10, used);
        new_if.then_branch      = then_if;
        new_if.else_branch      = new Return(returns.pop());
        then_if                 = new_if;
    }

    // Markiertes Wort, Nachbarn setzen
    const marked_word  = noun_of_length(NOISE_MARKED_LEN, used);
    const above_word   = noun_of_length(NOISE_ABOVE_LEN,  used);
    const below_word   = noun_of_length(NOISE_BELOW_LEN,  used);

    then_if.set_condition_at_level(level,     marked_word);
    then_if.set_condition_at_level(level - 1, above_word);
    then_if.set_condition_at_level(level + 1, below_word);

    return { if_statement: then_if, marked_word };
}

export function generate_if_statement_no_noise(
    nesting_depth: number,
    level: number
): { if_statement: Nested_Ifs, marked_word: string } {

    const used = new Set<string>();

    let returns = [];
    for (let i = 1; i <= nesting_depth; i++) returns.push(i);
    returns = do_random_array_sort(returns);

    let deepest_if              = new Nested_Ifs();
    deepest_if.condition_string = noun_of_length(NO_NOISE_WORD_LEN, used);
    deepest_if.then_branch      = new Return(0);
    deepest_if.else_branch      = new Return(returns.pop());

    let then_if = deepest_if;
    for (let counter = 1; counter < nesting_depth; counter++) {
        let new_if              = new Nested_Ifs();
        new_if.condition_string = noun_of_length(NO_NOISE_WORD_LEN, used);
        new_if.then_branch      = then_if;
        new_if.else_branch      = new Return(returns.pop());
        then_if                 = new_if;
    }

    // Alle bestehenden condition strings sammeln
    const existing = new Set<string>();
    let current: Term = then_if;
    while (current instanceof Nested_Ifs) {
        existing.add(current.condition_string);
        current = current.then_branch;
    }


    let marked_word = noun_of_length(NO_NOISE_WORD_LEN, used);
    let attempts = 0;
    while (existing.has(marked_word) && attempts < 100) {
        marked_word = noun_of_length(NO_NOISE_WORD_LEN, used);
        attempts++;
    }
    then_if.set_condition_at_level(level, marked_word);

    return { if_statement: then_if, marked_word };
}