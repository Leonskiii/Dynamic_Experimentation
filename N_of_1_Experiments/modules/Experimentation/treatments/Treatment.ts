import {Independent_Variable} from "./Independent_Variable.js";

export class Treatment {

    variable: Independent_Variable;
    value: string;

    constructor(variable: Independent_Variable, value: string) {
        this.variable = variable;
        this.value = ""+value;
    }

    clone():Treatment {
        let ret = new Treatment(this. variable, this.value);
        return ret;
    }
}