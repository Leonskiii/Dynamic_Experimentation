import {Experiment_Definition} from "./Experiment_Definition.js";
import {Treatment_Combination} from "./treatments/Treatment_Combination.js";

export class Task {

    treatment_combination: Treatment_Combination;
    expected_answer: string = "";
    given_answer: string = "";
    required_milliseconds = null;
    task_number_in_execution: number = -1;
    experiment_definition: Experiment_Definition;
    invalid_answers = [];
    is_training:boolean = false;
    has_pre_task_description: boolean = false;
    has_post_task_question: boolean = false;
    drop = false;

    constructor(tc: Treatment_Combination, experiment_definition: Experiment_Definition, text: string) {
        this.treatment_combination = tc;
        this.experiment_definition = experiment_definition;
        // this.code_string(text);
    }

    do_print_task: ()=>void = () => {
        throw new Error("Method not implemented.");
    }

    do_print_post_task: ()=>void = () => {
        throw new Error("Method not implemented.");
    }

    do_print_pre_task: ()=>void = () => {
        throw new Error("Method not implemented.");
    }

    do_print_error_message:(input:string)=>void = () => {
        throw new Error("Method not implemented.");
    }

    accepts_answer_function = (answer:string) => true;
    accepts_answer(input:string) {
        let answer = this.experiment_definition.measurement.get_given_answer(input);
        return this.accepts_answer_function(answer);
    }

    next_task():Task {
        if(this.task_number_in_execution<this.experiment_definition.tasks.length)
            return this.experiment_definition.tasks[this.task_number_in_execution];
        else
            return null;
    }

    html_string_with_cmd(html_string: string, cmd: ()=>void) {
        // this.write_action = (writer: Automata_IO) => {
        //     writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_line(html_string));
        //     cmd();
        // }
    }

    html_node_with_cmd(element: any, cmd: ()=>void) {
        // this.write_action = (writer: Automata_IO) => {
        //     writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, html_node(element));
        //     cmd();
        // }
    }
    after_task_string_constructor(a_string_constructor: () => string) {
        // this.after_task_write_action = () => (writer: Automata_IO) =>writer.write(AUTOMATA_OUTPUT_WRITER_ACTION.APPEND, AUTOMATA_OUTPUT_WRITER_TAGS.STAGE, text_line(a_string_constructor()));
    }

    do_print_after_task_information: ()=>void = () => {
        throw new Error("Method not implemented.");
    }

    print_task() {
        this.do_print_task();
        this.print_input_request();
    }

    print_pre_task_info() {
        this.do_print_pre_task();
    }

    private print_input_request() {
        this.experiment_definition.measurement.input_type.print_input_request();
    }

    treatment_value(treatment_name: string) {

        for(let treatment of this.treatment_combination.treatment_combination)
            if(treatment.variable.name===treatment_name)
                return treatment.value;

        throw "Unknown treatment: " + treatment_name;
    }

    set_computed_variable_value(variable_name: string, value: string) {

        for(let treatment of this.treatment_combination.treatment_combination)
            if(treatment.variable.name===variable_name) {
                treatment.value = value;
                return;
            }

        throw "Unknown treatment: " + variable_name;
    }
}
