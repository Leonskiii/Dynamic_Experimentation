// import {Code_Experiment_Definition, create_code_experiment_execution} from "./../Code_Experiment_Definition.js";
// import {Task} from "./../Task.js";
// import {key_event_string, save_file_in_html} from "../../Utils.js";
// import {Input_Object, IO_Object} from "../../Books/IO_Object.js";
// import {Browser_IO, AUTOMATA_OUTPUT_OBJECT_FORMAT} from "../../Books/Automata_IO.js";
//
// export function create_browser_text_experiment(cfg:
//                                                     {
//                                                         experiment_name     :string,
//                                                         seed                :string,
//                                                         introduction_pages  :string[],
//                                                         questionnaire?: Input_Object[],
//                                                         pre_run_instructions:string,
//                                                         finish_pages        :string[],
//                                                         layout              :{
//                                                             variable: string,
//                                                             treatments: string[]
//                                                         }[],
//                                                         repetitions         :number,
//                                                         task_configuration  :(task:Task) =>void,
//                                                         accepted_responses  :string[]
//                                                     }
// ) {
//
//     let example_code_reading_experiment
//         = create_code_experiment_execution(
//             {
//                     experiment_name: cfg.experiment_name,
//                     seed: cfg.seed,
//                     introduction_pages: cfg.introduction_pages.map((t:string)=> new IO_Object([{text:t, format:AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT}])),
//                     questionnaire: cfg.questionnaire,
//                     pre_run_instructions: new IO_Object([{text:cfg.pre_run_instructions, format:AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT}]),
//                     finish_pages: cfg.finish_pages.map((t:string)=> new IO_Object([{text:t, format:AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT}])),
//                     layout: cfg.layout,
//                     repetitions: cfg.repetitions,
//                     task_configuration: cfg.task_configuration,
//                     output_object: new Browser_IO(),
//                     // accepted_responses: cfg.accepted_responses,
//                     finish_function:  (exp: Code_Experiment_Definition) => {
//                                                                                 document.removeEventListener("keydown", key_forwarder);
//                                                                                 save_file_in_html("experimentdata", exp.generate_csv_data());
//                                                                             }
//             }
//         );
//
//     let key_forwarder = (e)=> {
//                                     let key_string = key_event_string(e);
//                                     example_code_reading_experiment.input(key_string);     }
//
//     document.addEventListener("keydown", key_forwarder, false);
// }
//
//
//
