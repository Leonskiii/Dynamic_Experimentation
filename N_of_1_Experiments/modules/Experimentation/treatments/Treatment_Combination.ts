import type {Treatment} from "./Treatment.js";

export class Treatment_Combination {

    treatment_combination:Treatment[] = [];

    constructor(treatment_combination:Treatment[]) {
        this.treatment_combination = treatment_combination;
    }

    clone(): Treatment_Combination {
        let ret = new Treatment_Combination([]);
        for(let treatment of this.treatment_combination) {
            ret.treatment_combination.push(treatment.clone());
        }
        return ret;
    }


}