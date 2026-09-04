import {Measurement_Type, Output_Command} from "../Experimentation.js";
import {Question} from "../../Automata_Forwarders/Questionnaire_Forwarder.js";
import {Task} from "../Task.js";
import {Experiment_Definition} from "../Experiment_Definition.js";
import {Sequential_Forwarder_Forwarder} from "../../Books/Sequential_Forwarder_Forwarder.js";
import {Treatments_Combinator} from "../treatments/Treatments_Combinator.js";
import {Code_Experiment_Definition} from "../Code_Experiment_Definition.js";
import {Training_Configuration} from "../Training_Configuration.js";
import {Independent_Variables} from "../treatments/Independent_Variables.js";

export function create_code_experiment_execution(
                                                    cfg:
                                                         {
                                                             experiment_name     :string,
                                                             seed                :string,
                                                             introduction_pages  :Output_Command[],
                                                             post_questionnaire?: Question[],
                                                             pre_run_training_output: Output_Command,

                                                             training_configuration?         : {
                                                                 fixed_treatments?: string[][],
                                                                 can_be_cancelled: boolean,
                                                                 can_be_repeated: boolean
                                                             },

                                                             pre_run_experiment_output: Output_Command,
                                                             finish_pages        :Output_Command[],

                                                             layout              :{
                                                                 variable: string,
                                                                 treatments: string[]
                                                             }[],

                                                             repetitions         :number,
                                                             task_configuration  :(task:Task) =>void,
                                                             measurement         :Measurement_Type,
                                                             finish_function     :(experiment:Experiment_Definition)=>void
                                                         }
)
    :Sequential_Forwarder_Forwarder
{
    let variables: Independent_Variables = Independent_Variables.from_layout(cfg.layout);

    let all_treatment_combinations: Treatments_Combinator = new Treatments_Combinator(variables, cfg.repetitions);

    let experiment_definition = new Code_Experiment_Definition(
        cfg.experiment_name,
        false,
        all_treatment_combinations,
        variables,
        cfg.repetitions,
        cfg.measurement,
        cfg.task_configuration,

    );

    let training_configuration: Training_Configuration = new Training_Configuration(cfg.training_configuration);

    let experiment_execution = experiment_definition.create_code_all_experiment_automatas(
        {
            seed: cfg.seed,
            introduction_texts: cfg.introduction_pages,
            post_questionnaire: cfg.post_questionnaire,
            pre_run_training_output: cfg.pre_run_training_output,
            training_configuration: training_configuration,
            // post_run_training_output: cfg.post_run_training_output,
            pre_run_experiment_output: cfg.pre_run_experiment_output,
            // post_run_experiment_output: cfg.post_run_experiment_output,
            finish_texts: cfg.finish_pages,
            measurement: cfg.measurement,
            finish_function: cfg.finish_function
        }
    );

    return experiment_execution;
}