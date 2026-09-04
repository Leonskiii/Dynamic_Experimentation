import { Experiment_Definition } from "./Experiment_Definition.js";
export declare class Training_Configuration {
    fixed_treatments: any[];
    can_be_cancelled: boolean;
    can_be_repeated: boolean;
    constructor(training_configuration: {
        fixed_treatments?: string[][];
        can_be_cancelled: boolean;
        can_be_repeated: boolean;
    });
    init_experiment(experiment_definition: Experiment_Definition): void;
}
