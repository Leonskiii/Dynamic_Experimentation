import { do_random_array_sort } from "../../../../N_of_1_Experiments/modules/Experimentation/Experimentation.js";
import { Nouns } from "../../../../N_of_1_Experiments/modules/Words/Nouns.js";
const TWO_LETTER_WORDS = ["at", "be", "by", "do", "go", "he", "if", "in", "is", "it",
    "me", "my", "no", "of", "on", "or", "so", "to", "up", "us",
    "we", "an", "as", "ox", "ax"];
export class Term {
    print_string(indentation_size) {
        let arr = [];
        this.print_into(arr, 0, indentation_size);
        return arr.join("");
    }
    print_string_with_extra_lines(indentation_size) {
        let arr = [];
        this.print_into_with_extra_lines(arr, 0, indentation_size);
        return arr.join("");
    }
    print_string_continuation() {
        let arr = [];
        this.print_into_continuation(arr, 0);
        return arr.join("");
    }
}
export class Return extends Term {
    constructor(return_value) {
        super();
        this.return_value = return_value;
    }
    print_into(array, indentation_depth, indentation_length) {
        array.push(" " + this.return_value + "\n");
    }
    print_into_with_extra_lines(array, indentation_depth, indentation_size) {
        array.push(" " + this.return_value + "\n");
    }
}
export class Nested_Ifs extends Term {
    print_into(array, indentation_depth, indentation_length) {
        array.push(" ".repeat(indentation_length * indentation_depth) + "if(" + this.condition_string + ") {\n");
        if (this.then_branch instanceof Return) {
            array.push(" ".repeat(indentation_length * indentation_depth + indentation_length) + "\n" + this.then_branch.return_value + "\n");
        }
        else {
            this.then_branch.print_into(array, indentation_depth + 1, indentation_length);
        }
        array.push(" ".repeat(indentation_length * indentation_depth) + "}");
        this.else_branch.print_into(array, indentation_depth + 1, indentation_length);
    }
    print_into_with_extra_lines(array, indentation_depth, indentation_length) {
        array.push(" ".repeat(indentation_length * indentation_depth) + "if(" + this.condition_string + ") {\n");
        if (this.then_branch instanceof Return) {
            array.push(" ".repeat(indentation_length * indentation_depth + indentation_length) + "\n");
        }
        else {
            this.then_branch.print_into_with_extra_lines(array, indentation_depth + 1, indentation_length);
        }
        array.push(" ".repeat(indentation_length * indentation_depth) + "}");
        this.else_branch.print_into_with_extra_lines(array, indentation_depth + 1, indentation_length);
    }
    // ← neue Methode für Continuation-Style
    print_into_continuation(array, col) {
        const if_str = "if(" + this.condition_string + ") {";
        const next_col = col + if_str.length + 2;
        array.push(" ".repeat(col) + if_str + "\n");
        if (this.then_branch instanceof Return) {
            array.push("\n");
        }
        else {
            this.then_branch.print_into_continuation(array, next_col);
        }
        array.push(" ".repeat(col) + "}");
        this.else_branch.print_into(array, 0, 0);
    }
    target_condition_string(target_number) {
        if (target_number == 1) {
            return this.condition_string;
        }
        else {
            if (this.then_branch instanceof Return)
                throw "ASDASD";
            return this.then_branch.target_condition_string(target_number - 1);
        }
    }
    return_string(target_number) {
        if (target_number == 1) {
            return this.else_branch.return_value.toString();
        }
        else {
            return this.then_branch.return_string(target_number - 1);
        }
    }
}
export function generate_If_Statement(indentation_depth, nesting_depth) {
    let returns = [];
    let conditions = [];
    for (let i = 1; i <= nesting_depth; i++) {
        returns.push(i);
        conditions.push(String.fromCharCode("a".charCodeAt(0) + i - 1));
    }
    returns.push(nesting_depth + 1);
    returns = do_random_array_sort(returns);
    conditions = do_random_array_sort(conditions);
    let deepest_if = new Nested_Ifs();
    deepest_if.condition_string = conditions.pop();
    deepest_if.then_branch = new Return(0);
    deepest_if.else_branch = new Return(returns.pop());
    let then_if = deepest_if;
    for (let counter = 1; counter < nesting_depth; counter++) {
        let new_if = new Nested_Ifs();
        new_if.condition_string = conditions.pop();
        new_if.then_branch = then_if;
        new_if.else_branch = new Return(returns.pop());
        then_if = new_if;
    }
    return then_if;
}
export function set_if_conditions_by_length(if_statement, condition_length) {
    let starting_letters = [];
    let nouns = new Nouns();
    while (if_statement instanceof Nested_Ifs) {
        let word;
        if (condition_length === 2) {
            // Eigene Liste für 2-Buchstaben-Wörter
            let candidates = TWO_LETTER_WORDS.filter(w => !starting_letters.includes(w[0]));
            word = candidates[Math.floor(Math.random() * candidates.length)];
        }
        else {
            // Nomen mit passender Länge (±2) und einzigartigem Anfangsbuchstaben
            word = nouns.get_random_word();
            let attempts = 0;
            while (starting_letters.includes(word[0]) ||
                word.length < condition_length ||
                word.length > condition_length + 2) {
                word = nouns.get_random_word();
                attempts++;
                if (attempts > 10000)
                    break; // Endlosschleife verhindern
            }
        }
        starting_letters.push(word[0]);
        if_statement.condition_string = word;
        if_statement = if_statement.then_branch;
    }
}
//# sourceMappingURL=Generate_Code.js.map