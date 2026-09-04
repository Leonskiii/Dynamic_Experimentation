import {Task} from "../Experimentation/Task.js";
import {Automata_Configurator} from "../Automata/Automata_Configurator.js";
import {from} from "../Automata/Transitions.js";
import {Experiment_Definition} from "../Experimentation/Experiment_Definition.js";
import { Automata_With_Output_Forwarder } from "./Automata_With_Output_Forwarder.js";
import {Measurement_Type, Output_Command} from "../Experimentation/Experimentation.js";


let SHOW_INTRO=0;
let SHOW_PRE_TASK_INFO = 1;
let SHOW_TASK=2;
let SHOW_PENALTY = 3;
let TASK_FINISHED=4;
let SHOW_OUTRO = 5;
let EVERYTHING_DONE = 6;

let POST_TASK_QUESTION = 7;

export class Experimentation_Forwarder extends  Automata_With_Output_Forwarder{

    current_page_index = -1;
    experiment_definition: Experiment_Definition;

    show_intro() {
        this.empty_screen_and_show_instructions(this.pre_run_instructions);
        this.output_writer().print_experiment_name(this.forwarder_name);
    }

    show_outro() {
        this.empty_screen_and_show_instructions(this.post_run_instructions);
    }

    automata_configurator()  {
        return new Automata_Configurator(
            [SHOW_INTRO, SHOW_PRE_TASK_INFO, SHOW_TASK, TASK_FINISHED, SHOW_OUTRO, EVERYTHING_DONE],
            SHOW_INTRO,
            ()=>{},
            this.transitions(),
            [EVERYTHING_DONE]
        );
    }

    current_task():Task {
        return this.experiment_definition.tasks[this.current_page_index] ;
    };

    constructor(
                experiment_automata_name:string,
                pre_run_instructions: Output_Command,
                post_run_instructions: Output_Command,
                experiment_definition: Experiment_Definition,
                measurement: Measurement_Type
    ) {

        super(  experiment_automata_name,
                measurement, pre_run_instructions, post_run_instructions);

        this.experiment_definition = experiment_definition;
    }



    automata_configuration() {
        return new Automata_Configurator(
            [SHOW_INTRO, SHOW_PRE_TASK_INFO, SHOW_TASK, TASK_FINISHED, SHOW_OUTRO, EVERYTHING_DONE],
            SHOW_INTRO,
            () => {},
            this.transitions(),
            [EVERYTHING_DONE]
        );
    }

    transitions() {
        return [
            from(SHOW_INTRO).to(SHOW_TASK)
                .on("Enter")
                .if((i:string) => !this.first_task().has_pre_task_description)
                .do((i:string) => {
                    this.set_experiment_index(0);
                    this.measurement.start_measurement(this.current_task());
                }),

            from(SHOW_INTRO).to(SHOW_PRE_TASK_INFO)
                .on("Enter")
                .if((i:string) => this.first_task().has_pre_task_description)
                .do((i:string) => {
                    this.set_experiment_index(0);
                    this.show_pre_task_info();
                }),

            from(SHOW_INTRO).to(SHOW_OUTRO) // State=3: Experiment done - just the message afterwards shown
                .on("Delete")
                .do((i:string) => {
                    this.show_outro();
                }),

            from(SHOW_PRE_TASK_INFO).to(SHOW_TASK)
                .on("Enter")
                .do((i:string) => {
                    this.measurement.start_measurement(this.current_task());
                }),

            // Task Shown - Incorrect input => Remain in Task
            from(SHOW_TASK).to(SHOW_TASK)
                .on_any(this.measurement.accepted_responses())
                .if((i:string) =>
                    !this.current_task().accepts_answer(i) &&  !this.measurement.demands_penalty()
                )
                .do((i:string) => {
                    this.measurement.incorrect_response(i, this.current_task());
                }),

            from(SHOW_TASK).to(SHOW_OUTRO)
                .on("?+Control")
                .if((i:string) => true)
                .do((i:string) => {
                    this.measurement.stop_measurement(i, this.current_task());
                    this.show_outro();
                }),

            // STATE 1=Task is shown, 2=Input correct
            from(SHOW_TASK).to(TASK_FINISHED)
                .on_any(this.measurement.accepted_responses())
                .if((i:string) =>   this.current_task().accepts_answer(i) &&
                    this.current_page_index < this.experiment_definition.tasks.length-1)
                .do((i:string) => {
                    this.measurement.stop_measurement(i, this.current_task());
                }),

            from(SHOW_TASK).to(SHOW_PENALTY)
                .on_any(this.measurement.accepted_responses())
                .if((i:string) =>
                    !this.current_task().accepts_answer(i) && this.measurement.demands_penalty()
                )
                .do((i:string) => {
                    this.measurement.incorrect_response(i, this.current_task());
                }),

            from(SHOW_PENALTY).to(SHOW_TASK)
                .on("Enter")
                .if((i:string) =>
                    this.measurement.penalty_is_over())
                .do((i:string) => {
                    this.measurement.start_measurement(this.current_task());
                }),

            // Between Tasks to next task
            // from(TASK_FINISHED).to(SHOW_PRE_TASK_INFO)
            //     .on("Enter")
            //     .if((i:string) => this.current_page_index < this.experiment_definition.tasks.length-1 && this.next_task().has_pre_task_description)
            //     .do((i:string) => {
            //         this.inc_current_experiment();
            //         this.show_pre_task_info();
            //     }),

            // Between Tasks to next task
            from(TASK_FINISHED).to(SHOW_PRE_TASK_INFO)
                .on("Enter")
                .if((i:string) => this.current_page_index < this.experiment_definition.tasks.length-1 && this.next_task().has_pre_task_description)
                .do((i:string) => {
                    this.inc_current_experiment();
                    this.show_pre_task_info();
                }),

            from(TASK_FINISHED).to(SHOW_TASK)
                .on("Enter")
                .if((i:string) => this.current_page_index < this.experiment_definition.tasks.length-1 && !this.next_task().has_pre_task_description)
                .do((i:string) => {
                    this.inc_current_experiment();
                    this.measurement.start_measurement(this.current_task());
                }),

            from(SHOW_TASK).to(SHOW_OUTRO) // State=3: Experiment done - just the message afterwards shown
                .on_any(this.measurement.accepted_responses())
                .if((i:string) => this.current_task().accepts_answer(i) &&
                    this.current_page_index == this.experiment_definition.tasks.length-1)
                .do((i:string) => {
                    this.measurement.stop_measurement(i, this.current_task());
                    this.show_outro();
                }),

            from(SHOW_OUTRO).to(EVERYTHING_DONE)
                .on("Enter")
                .do((i:string) => {
                    let a = 1;
                })
        ];
    }


    set_experiment_index(index:number) {
        this.current_page_index = index;
        this.output_writer().print_string_to_page_number("Task " + (this.current_page_index + 1) + " / " + this.experiment_definition.tasks.length);
    }

    inc_current_experiment() {
        this.set_experiment_index(++this.current_page_index);
    }

    init_experiment() {
        this.experiment_definition.init_experiment(false);
    }

    private show_pre_task_info() {
        this.output_writer().clear_stage();
        this.output_writer().clear_error();
        this.current_task().print_pre_task_info();
    }

    private next_task():Task {
        return this.experiment_definition.tasks[this.current_page_index + 1] ;
    }

    private first_task():Task {
        return this.experiment_definition.tasks[0] ;
    }
}