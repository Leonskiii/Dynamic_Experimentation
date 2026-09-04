// import {Code_Experiment_Definition, create_code_experiment_execution} from "../Code_Experiment_Definition.js";
// import {Task} from "./../Task.js";
// import {add_upload_push_button, key_event_string, save_file_in_html, upload_experiment_to_server} from "../../Utils.js";
// import {Browser_IO, AUTOMATA_OUTPUT_OBJECT_FORMAT} from "../../Books/Automata_IO.js";
// import {Measurement_Type, Output_Command} from "../Experimentation";
//
// let THIS_IS_THE_EXECUTION_IF_WHICH_IS_REPLACED_ON_LOAD =0;
//
// export function create_browser_text_experiment(cfg:
//                                                     {
//                                                         experiment_name     :string,
//                                                         seed                :string,
//                                                         introduction_pages  :Output_Command[],
//                                                         // questionnaire?: Input_Object[],
//                                                         pre_run_instruction: Output_Command,
//                                                         finish_pages        :Output_Command[],
//                                                         layout              :{
//                                                             variable: string,
//                                                             treatments: string[]
//                                                         }[],
//                                                         measurement: Measurement_Type,
//                                                         repetitions         :number,
//                                                         // accepted_responses  :string[],
//                                                         task_configuration  :(task:Task) =>void
//                                                     }
// ) {
//
//     let example_code_reading_experiment = create_code_experiment_execution({
//         experiment_name: cfg.experiment_name,
//         seed: cfg.seed,
//         introduction_pages: cfg.introduction_pages,
//         // questionnaire: cfg.questionnaire,
//         pre_run_instructions: cfg.pre_run_instruction,
//         finish_pages: cfg.finish_pages,
//         layout: cfg.layout,
//         repetitions: cfg.repetitions,
//         task_configuration: cfg.task_configuration,
//         output_object: new Browser_IO(),
//
//         measurement: cfg.measurement,
//         finish_function:  (exp: Code_Experiment_Definition) => {
//                                                                     let experiment_data = exp.generate_csv_data();
//                                                                     save_file_in_html(cfg.experiment_name + "_results.csv", experiment_data);
//                                                                     // upload_experiment_to_server(exp);
//                                                                 }
//     });
//
//     let key_forwarder = (e)=> {
//         let key_string = key_event_string(e);
//         example_code_reading_experiment.input(key_string);
//     }
//
//     document.addEventListener("keydown", key_forwarder, false);
//
// }
//
//
//
