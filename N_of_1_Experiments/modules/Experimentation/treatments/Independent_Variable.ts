import {Treatment} from "./Treatment.js";

export class Independent_Variable {
    name: string;
    treatments: Treatment[] = [];

    constructor(name: string, treatments: string[]) {
        this.name = name;
        for (let aString of treatments) {
            this.treatments.push(new Treatment(this, aString));
        }
    }
}