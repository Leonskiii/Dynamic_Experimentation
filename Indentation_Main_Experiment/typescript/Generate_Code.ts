import {do_random_array_sort} from "../../../../N_of_1_Experiments/modules/Experimentation/Experimentation.js";
import {Nouns} from "../../../../N_of_1_Experiments/modules/Words/Nouns.js";

const nouns_instance = new Nouns();
const used_nouns     = new Set<string>();

function random_noun_of_length(len: number): string {
    let word     = nouns_instance.get_word_of_length(len);
    let attempts = 0;
    while (used_nouns.has(word) && attempts < 100) {
        word = nouns_instance.get_word_of_length(len);
        attempts++;
    }
    used_nouns.add(word);
    return word;
}

export abstract class Term {
    abstract print_into(array: string[], indentation_depth: number, indentation_size: number);
    abstract print_into_with_extra_lines(array: string[], indentation_depth: number, indentation_size: number);

    print_string(indentation_size: number) {
        let arr = [];
        this.print_into(arr, 0, indentation_size);
        return arr.join("");
    }
}

export class Return extends Term {
    return_value: number;
    constructor(return_value: number) { super(); this.return_value = return_value; }
    print_into(array: string[], _depth: number, _length: number)                { array.push(" " + this.return_value + "\n"); }
    print_into_with_extra_lines(array: string[], _depth: number, _size: number) { array.push(" " + this.return_value + "\n"); }
}

export class Nested_Ifs extends Term {
    condition_string: string;
    then_branch:      Term;
    else_branch:      Term;

    print_into(array: string[], indentation_depth: number, indentation_length: number) {
        array.push(" ".repeat(indentation_length * indentation_depth) + "if(" + this.condition_string + ") {\n");
        if (!(this.then_branch instanceof Return))
            this.then_branch.print_into(array, indentation_depth + 1, indentation_length);
        array.push(" ".repeat(indentation_length * indentation_depth) + "}");
        this.else_branch.print_into(array, indentation_depth + 1, indentation_length);
    }

    print_into_with_extra_lines(array: string[], indentation_depth: number, indentation_length: number) {
        array.push(" ".repeat(indentation_length * indentation_depth) + "if(" + this.condition_string + ") {\n");
        if (!(this.then_branch instanceof Return))
            this.then_branch.print_into_with_extra_lines(array, indentation_depth + 1, indentation_length);
        array.push(" ".repeat(indentation_length * indentation_depth) + "}");
        this.else_branch.print_into_with_extra_lines(array, indentation_depth + 1, indentation_length);
    }

    // Dynamische Einrückung: jede Ebene beginnt 1 Zeichen nach dem "{" der Elternebene
    print_into_continuation(array: string[], col: number) {
        const if_str   = "if(" + this.condition_string + ") {";
        const next_col = col + if_str.length + 1;
        array.push(" ".repeat(col) + if_str + "\n");
        if (!(this.then_branch instanceof Return))
            (this.then_branch as Nested_Ifs).print_into_continuation(array, next_col);
        array.push(" ".repeat(col) + "}");  // ← col statt close_col
        this.else_branch.print_into(array, 0, 0);
    }

    target_condition_string(target_number: number): string {
        if (target_number == 1) return this.condition_string;
        if (this.then_branch instanceof Return) throw "Invalid target number";
        return (this.then_branch as Nested_Ifs).target_condition_string(target_number - 1);
    }

    return_string(target_number: number): string {
        if (target_number == 1) return (this.else_branch as Return).return_value.toString();
        return (this.then_branch as Nested_Ifs).return_string(target_number - 1);
    }
}

// Jede Condition: genau 2 Wörter à 4 Zeichen → "word && word" = 12 Zeichen
export function generate_If_Statement(nesting_depth: number): Nested_Ifs {
    used_nouns.clear();

    let returns = [];
    for (let i = 1; i <= nesting_depth; i++) returns.push(i);
    returns = do_random_array_sort(returns);

    function make_condition(): string {
        return random_noun_of_length(4) + " && " + random_noun_of_length(4);
    }

    let deepest_if              = new Nested_Ifs();
    deepest_if.condition_string = make_condition();
    deepest_if.then_branch      = new Return(0);
    deepest_if.else_branch      = new Return(returns.pop());

    let then_if = deepest_if;
    for (let counter = 1; counter < nesting_depth; counter++) {
        let new_if              = new Nested_Ifs();
        new_if.condition_string = make_condition();
        new_if.then_branch      = then_if;
        new_if.else_branch      = new Return(returns.pop());
        then_if                 = new_if;
    }
    return then_if;
}