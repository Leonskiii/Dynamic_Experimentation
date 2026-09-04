import {Independent_Variable} from "./Independent_Variable.js";
import {all_array_combinations} from "../../utils/arrays/all_array_combinations.js";
import {Treatment_Combination} from "./Treatment_Combination.js";

export class Independent_Variables {
    independent_variables: Independent_Variable[] = [];


    push_variable(n: string, treatments: string[]) {
        this.independent_variables.push(new Independent_Variable(n, treatments));
    }

    print_to_array(result: string[]) {
        for(let variable of this.independent_variables) {
            result.push(variable.name + ";");
        }
    }

    create_treatment_combinations(): Treatment_Combination[] {
        let treatment_combinations = [];
        all_array_combinations(
            this.independent_variables.map(t => t.treatments),
            (treatments) => {
                treatment_combinations.push(new Treatment_Combination([...treatments]));
            });
        return treatment_combinations;
    }

    get_variable_named(var_name: string) {
        for(let v of this.independent_variables) {
            if(v.name === var_name)
                return v;
        }
        throw "Unknown independent variable named: " + var_name;
    }

    static from_layout(
                            layout: {
                                       variable: string,
                                       treatments: string[]
                                           }[]
                            )
    {
        let variables: Independent_Variables = new Independent_Variables();
        for(let aVar of layout) {
            variables.push_variable(aVar.variable, aVar.treatments);
        }
        return variables;
    }
}