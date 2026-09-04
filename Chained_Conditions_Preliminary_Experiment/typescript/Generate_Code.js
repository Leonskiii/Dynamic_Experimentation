import { do_random_array_sort } from "../../../../N_of_1_Experiments/modules/Experimentation/Experimentation.js";
import { Nouns } from "../../../../N_of_1_Experiments/modules/Words/Nouns.js";
const nouns_instance = new Nouns();
const used_nouns = new Set();
function random_noun() {
    let word = nouns_instance.get_random_word();
    let attempts = 0;
    while (used_nouns.has(word) && attempts < 100) {
        word = nouns_instance.get_random_word();
        attempts++;
    }
    used_nouns.add(word);
    return word;
}
export class Term {
    print_string(indentation_size) { let arr = []; this.print_into(arr, 0, indentation_size); return arr.join(""); }
    print_string_with_extra_lines(indentation_size) { let arr = []; this.print_into_with_extra_lines(arr, 0, indentation_size); return arr.join(""); }
}
export class Return extends Term {
    constructor(return_value) { super(); this.return_value = return_value; }
    print_into(array, indentation_depth, indentation_length) { array.push(" " + this.return_value + "\n"); }
    print_into_with_extra_lines(array, indentation_depth, indentation_size) { array.push(" " + this.return_value + "\n"); }
}
export class Nested_Ifs extends Term {
    constructor() {
        super(...arguments);
        this.marked_term = "";
    }
    print_into(array, indentation_depth, indentation_length) {
        array.push(" ".repeat(indentation_length * indentation_depth) + "if(" + this.condition_string + ") {\n");
        if (this.then_branch instanceof Return) {
            array.push(" ".repeat(indentation_length * indentation_depth + indentation_length) + "\n");
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
    return_string(target_number) {
        if (target_number == 1)
            return this.else_branch.return_value.toString();
        return this.then_branch.return_string(target_number - 1);
    }
    marked_term_at(target_number) {
        if (target_number == 1)
            return this.marked_term;
        return this.then_branch.marked_term_at(target_number - 1);
    }
}
export function generate_If_Statement(indentation_depth, nesting_depth, chain_length) {
    used_nouns.clear();
    let returns = [];
    let conditions = [];
    for (let i = 1; i <= nesting_depth; i++) {
        returns.push(i);
        conditions.push(String.fromCharCode("a".charCodeAt(0) + i - 1));
    }
    returns.push(nesting_depth + 1);
    returns = do_random_array_sort(returns);
    conditions = do_random_array_sort(conditions);
    function make_chain() {
        let terms = [];
        for (let i = 0; i < chain_length; i++)
            terms.push(random_noun());
        return {
            condition_string: terms.join(" && "),
            marked_term: terms[terms.length - 1]
        };
    }
    let deepest_if = new Nested_Ifs();
    let c1 = make_chain();
    deepest_if.condition_string = c1.condition_string;
    deepest_if.marked_term = c1.marked_term;
    deepest_if.then_branch = new Return(0);
    deepest_if.else_branch = new Return(returns.pop());
    let then_if = deepest_if;
    for (let counter = 1; counter < nesting_depth; counter++) {
        let new_if = new Nested_Ifs();
        let c = make_chain();
        new_if.condition_string = c.condition_string;
        new_if.marked_term = c.marked_term;
        new_if.then_branch = then_if;
        new_if.else_branch = new Return(returns.pop());
        then_if = new_if;
    }
    return then_if;
}
//# sourceMappingURL=Generate_Code.js.map