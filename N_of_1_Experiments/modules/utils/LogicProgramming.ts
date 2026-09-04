import {is_true} from './Testing.js';
import {random_array_element} from "../Experimentation/Experimentation.js";

export class Binding {
    number_of_variables: number;
    values = [];

    constructor(number_of_variables: number) {
        this.values = new Array(number_of_variables).fill(null);
    }

    do_matching(that:Binding, this_positions:number[], other_positions:number[]):{matches: boolean, left: Binding, has_left_variable_replacements: boolean, right: Binding, has_right_variable_replacements: boolean} {

        let result_left = this.clone();
        let result_right = that.clone();

        let has_left_variable_replacements = false;
        let has_right_variable_replacements = false;


        for(let variable_position = 0; variable_position < this_positions.length; variable_position++) {
            let this_value = this.values[this_positions[variable_position]];
            let that_value = that.values[other_positions[variable_position]];
            if(this_value !== that_value) {
                // WAIT - it could mean that one of them is unbound!
                if(this_value===null) {
                    result_left.values[this_positions[variable_position]] = that_value;
                    has_left_variable_replacements = true;
                } else if (that_value === null) {
                    result_right.values[other_positions[variable_position]] = this_value;
                    has_right_variable_replacements = true;
                } else {
                    // console.log(this.values[this_positions[variable_position]]  + " === " + binding.values[other_positions[variable_position]] + ": false");
                    return {matches: false, left: null, has_left_variable_replacements: false, right: null, has_right_variable_replacements: false};
                }

            } else {
                // console.log(this.values[this_positions[variable_position]]  + " === " + binding.values[other_positions[variable_position]] + ": true");
            }
        }
        // console.log("x..............true");
        return {matches: true, left: result_left, has_left_variable_replacements: has_left_variable_replacements, right: result_right, has_right_variable_replacements: has_right_variable_replacements};
    }

    clone(): Binding {
        let ret = new Binding(this.number_of_variables);
        let vs = [];
        for(let v of this.values) {
            vs.push(v);
        }
        ret.values = vs;
        return ret;
    }

    do_print() {
        console.log(this.values.join(", "));
    }
}
export class Logical_Results {

    static Empty_Logical_Results(num_params:number) {
        let ret = new Logical_Results(num_params);
        ret.rows = [];
        return ret;
    }

    static Logical_Results_FROM_SOLUTION_ARRAY(num_params:number, array:any[]) {
        let ret = Logical_Results.Empty_Logical_Results(num_params);
        for(let row of array ) {
            ret.add_solution_array(row);
        }
        return ret;
    }

    number_of_variables: number;
    rows:Binding[] = [];

    constructor(number_of_variables: number) {
        this.rows.push(new Binding(number_of_variables));
    }

    has_contradiction() {
        return this.rows.length===0;
    }

    add_solution_array(solution_array:[]) {
        let binding = new Binding(this.number_of_variables);
        binding.values = [...solution_array];
        this.rows.push(binding);
    }

    unify_results(that: Logical_Results, this_positions: number[], other_positions: number[]) {
        if (this.rows.length == 1 && this.rows[0]==undefined)
            console.log("stop");
        let this_remaining_rows:Binding[] = [];
        let that_remaining_rows:Binding[] = [];
        let this_handled_rows_no = [];
        let that_handled_rows_no = [];

        let this_row_counter = 0;
        for(let this_row of this.rows) {
            this_row_counter++;
            let that_row_counter=0;
            for(let that_row of that.rows) {
                that_row_counter++;
                let matching = null;
                try {
                matching = this_row.do_matching(that_row, this_positions, other_positions);
                } catch (ex) {
                    matching = this_row.do_matching(that_row, this_positions, other_positions);
                    throw "something is wrong";
                }
                if(matching.matches) {
                    if(!this_handled_rows_no.includes(this_row_counter)) {
                        this_remaining_rows.push(matching.left);
                        if(!matching.has_left_variable_replacements)
                            this_handled_rows_no.push(this_row_counter);
                    }
                    if(!that_handled_rows_no.includes(that_row_counter)) {
                        that_remaining_rows.push(matching.right);
                        if(!matching.has_right_variable_replacements) {
                            if (!matching.has_right_variable_replacements)
                                that_handled_rows_no.push(that_row_counter);
                        }
                    }
                }
            }
        }

        this.rows = this_remaining_rows;
        that.rows = that_remaining_rows;
    }

    do_print() {
        for(let r of this.rows) {
            r.do_print();
        }
    }

    solutions() {
        return this.rows;
    }

    random_result_for_column(column: number): Logical_Results {
        let ret = new Logical_Results(this.number_of_variables);
        ret.rows = [this.random_row_for_random_column_value(2)];
        return ret;
    }

    random_row_for_random_column_value(column: number): Binding {
        let arr = this.elements_of_column_with_unique_results(column);
        let random_value = random_array_element(arr);
        let possible_row_nos:any[] = this.rows_with_value_matching(column, random_value);
        let random_row_no = random_array_element(possible_row_nos);
        return this.rows[random_row_no];
    }

    elements_of_column_with_unique_results(column:number) {
        let ret = [];
        this.rows.forEach((binding:Binding) => {
            let value = binding.values[column];
            if(!ret.includes(value))
               ret.push(value)
        });
        return ret;
    }

    rows_with_value_matching(column, value) {
        let ret = [];
        for(let i=0; i < this.rows.length; i++) {
            if(this.rows[i].values[column] == value) {
                ret.push(i);
            }
        }
        return ret;
    }

}

export function array_of_rows_to_logical_result(number_of_columns, array_of_rows): Logical_Results {
    let ret = new Logical_Results(number_of_columns);
    ret.rows = [];
    for(let row of array_of_rows) {
        let new_binding = new Binding(number_of_columns);
        new_binding.values = [];
        for(let column in row) {
            let new_value = row[column];
            new_binding.values.push(new_value);
        }
        ret.rows.push(new_binding);
    }
    return ret;
}

export function array_of_values_to_logical_result(number_of_columns, array_of_values): Logical_Results {
    let ret = new Logical_Results(number_of_columns);
    ret.rows = [];
    for(let row of array_of_values) {
        let new_binding = new Binding(number_of_columns);
        new_binding.values = [];
        for(let value of row) {
            new_binding.values.push(value);
        }
        ret.rows.push(new_binding);
    }
    return ret;
}

export function array_of_array_of_values_to_logical_result(number_of_columns, array_of_arrays_of_values): Logical_Results {
    let ret = new Logical_Results(number_of_columns);
    ret.rows = [];
    for(let row of array_of_arrays_of_values) {
        let new_binding = new Binding(number_of_columns);
        new_binding.values = [];
        for(let value of row) {
            new_binding.values.push(value);
        }
        ret.rows.push(new_binding);
    }
    return ret;
}

function test_logic_programming() {
    let binding_1:Logical_Results;
    let binding_2:Logical_Results;

    binding_1 = array_of_rows_to_logical_result(6, [
        {a: 1, b: 2, c: 3, d: 4, e: 5, f: 1},
        {a: 1, b: 2, c: 3, d: 4, e: 5, f: 2},
        {a: 1, b: 3, c: 3, d: 4, e: 5, f: 3},
        {a: 1, b: 3, c: 3, d: 4, e: 5, f: 4}
    ]);

    binding_2 = array_of_rows_to_logical_result(2, [
        {x: 2, y: 3}
    ]);

    binding_1.unify_results(binding_2, [1, 2], [0, 1]);
    is_true(binding_1.rows.length==2 && binding_2.rows.length==1, "Unify 1 (all right): with possibly double entries right " + binding_1.rows.length + " -- " + binding_2.rows.length);

    binding_1 = array_of_rows_to_logical_result(6, [
        {a: 1, b: 2, c: 3, d: 4, e: 5, f: 1},
        {a: 1, b: 2, c: 3, d: 4, e: 5, f: 2},
        {a: 1, b: 3, c: 3, d: 4, e: 5, f: 3},
        {a: 1, b: 3, c: 3, d: 4, e: 5, f: 4}
    ]);

    binding_2 = array_of_rows_to_logical_result(2, [
        {x: 2, y: 3},
        {x: 3, y: 3}
    ]);

    binding_1.unify_results(binding_2, [1, 2], [0, 1]);
    is_true(binding_1.rows.length==4 && binding_2.rows.length==2, "Unify 2 (all right): with possibly double entries right " + binding_1.rows.length + " -- " + binding_2.rows.length);

    binding_1 = array_of_rows_to_logical_result(6, [
        {a: 1, b: 2, c: 3, d: 4, e: 5, f: 1},
        {a: 1, b: 2, c: 3, d: 4, e: 5, f: 2},
        {a: 1, b: 3, c: 3, d: 4, e: 5, f: 3},
        {a: 1, b: 3, c: 3, d: 4, e: 5, f: 4}
    ]);

    binding_2 = array_of_rows_to_logical_result(2, [
        {x: 2, y: 3}
    ]);

    binding_1.unify_results(binding_2, [1], [0]);
    is_true(binding_1.rows.length==2 && binding_2.rows.length==1, "Unify 3 (only subset right): with possibly double entries right " + binding_1.rows.length + " -- " + binding_2.rows.length);

    binding_2 = array_of_rows_to_logical_result(6, [
        {x: 2, y: 3}
    ]);

    binding_1 = array_of_rows_to_logical_result(6, [
        {a: 1, b: null, c: 3, d: 4, e: 5, f: 6},
        {a: 1, b: null, c: 3, d: 4, e: 5, f: 6},
    ]);

    binding_2 = array_of_rows_to_logical_result(6, [
        {x: 2}
    ]);
    binding_1.unify_results(binding_2, [1], [0]);
    is_true(binding_1.rows.length==2 && binding_2.rows.length==1, "Unify 4 (on unbound variable left) " + binding_1.rows.length + " -- " + binding_2.rows.length);
    is_true(binding_1.rows[0].values[1]===2, "Unify 3 (unbounded becomes bounded) " + binding_1.rows.length + " -- " + binding_2.rows.length);

    binding_1 = array_of_rows_to_logical_result(2, [
        {a: 1, b: null, c: 3, d: 4, e: 5, f: 6},
        {a: 1, b: null, c: 3, d: 4, e: 5, f: 6},
    ]);

    binding_2 = array_of_rows_to_logical_result(2, [
        {x: 2},
        {x: 3}
    ]);
    binding_1.unify_results(binding_2, [1], [0]);
    is_true(binding_1.rows.length===4 && binding_2.rows.length==2, "Unify 5 (multiple variable bindings) " + binding_1.rows.length + " -- " + binding_2.rows.length);
    is_true(binding_1.rows[0].values[1]===2, "Unify 5 (multiple variable bindings - unbounded variable is now bounded" );

    binding_1 = array_of_rows_to_logical_result(2, [
        {a: 1, b: null, c: 3, d: 4, e: 5, f: 6},
        {a: 1, b: null, c: 3, d: 4, e: 5, f: 6},
    ]);

    binding_2 = array_of_rows_to_logical_result(1, [
        {x: null}
    ]);
    binding_1.unify_results(binding_2, [1], [0]);

    is_true(binding_1.rows.length==2 && binding_2.rows.length==1, "Unify 6 (unifying unbounded variables) " + binding_1.rows.length + " -- " + binding_2.rows.length);
    is_true(binding_1.rows[0].values[1]===null, "Unify 6 (multiple variable bindings - unbounded variable is now bounded - 1st" );
    is_true(binding_2.rows[0].values[0]===null, "Unify 6 (multiple variable bindings - unbounded variable is now bounded - 2nd" );

    binding_1 = new Logical_Results(3);

    binding_2 = array_of_rows_to_logical_result(1, [
        {x: 1},
        {x: 2},
        {x: 3}
    ]);
    binding_1.unify_results(binding_2, [1], [0]);
    is_true(binding_1.rows.length==3 && binding_2.rows.length==3, "Unify 7 " + binding_1.rows.length + " -- " + binding_2.rows.length);

    binding_1 = array_of_array_of_values_to_logical_result(6, [
        [1, 2, 3, 4, 5, 6],
        [1, 3, 3, 4, 5, 6],
    ]);
    binding_2 = new Logical_Results(3);

    binding_1.unify_results(binding_2, [1], [0]);
    is_true(binding_1.rows.length==2 && binding_2.rows.length==2, "Unify 8 " + binding_1.rows.length + " -- " + binding_2.rows.length);
    is_true(binding_1.rows[0].values[1]===2, "Unify 8 (multiple variable bindings - unbounded variable is now bounded - 1st" );
    is_true(binding_1.rows[1].values[1]===3, "Unify 8 (multiple variable bindings - unbounded variable is now bounded - 2nd" );

}


test_logic_programming();
console.log("ok, logic programming seems to work.");