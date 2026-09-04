import {BROWSER_EXPERIMENT} from "../../../../N_of_1_Experiments/modules/Experimentation/Browser_Output_Writer.js";
import {
    Experiment_Output_Writer, keys, Reaction_Time, SET_SEED, Standard_Post_Questionnaire
} from "../../../../N_of_1_Experiments/modules/Experimentation/Experimentation.js";
import {Task} from "../../../../N_of_1_Experiments/modules/Experimentation/Task.js";
import {generate_If_Statement, Nested_Ifs} from "./Generate_Code.js";
import {convert_string_to_html_string} from "../../../../N_of_1_Experiments/modules/utils/Utils.js";
import {
    finish_pages, intro_pages, pre_run_experiment_instructions, pre_run_training_instructions
} from "./Indentation_Length_Vertical_Jumps_Text.js";

let SEED = "67";
SET_SEED(SEED);

function generate_training_treatments(n: number): string[][] {
    const lengths = ["2", "4", "6", "8", "10", "Dynamic"];
    const levels  = ["1", "2", "3", "4", "5", "6", "7"];
    const result: string[][] = [];
    for (let i = 0; i < n; i++) {
        const length = lengths[Math.floor(Math.random() * lengths.length)];
        const level  = levels [Math.floor(Math.random() * levels.length)];
        result.push([length, level, "_", "_"]);
    }
    return result;
}

let experiment_configuration_function = (writer: Experiment_Output_Writer) => { return {

    experiment_name:                 "Final_Experiment_Indentation",
    seed:                            SEED,
    introduction_pages:              [writer.string_page_command(intro_pages())],
    pre_run_training_instructions:   writer.string_page_command(pre_run_training_instructions()),
    pre_run_experiment_instructions: writer.string_page_command(pre_run_experiment_instructions()),
    post_questionnaire:              Standard_Post_Questionnaire(),
    training_configuration: {
        can_be_cancelled: true,
        can_be_repeated:  true,
        fixed_treatments: generate_training_treatments(40),
    },
    finish_pages:                    [writer.string_page_command(finish_pages())],

    layout: [
        { variable: "Length",               treatments: ["2", "4", "6", "8","10", "Dynamic"] },
        { variable: "Level",                treatments: ["1", "2", "3", "4", "5", "6", "7"]  },
        { variable: "Distance_from_Center", treatments: ["_computed_"]                        },
        { variable: "Correct",              treatments: ["_computed_"]                        },
    ],

    repetitions: 5,
    measurement: Reaction_Time(keys(["1","2","3","4","5","6","7","8","9"])),


    task_configuration: (t: Task) => {
        const center        = 4;
        const nesting_depth = center * 2 - 1;
        const length_str    = t.treatment_value("Length");
        const level         = parseInt(t.treatment_value("Level"));
        const is_dynamic    = length_str === "Dynamic";
        const length        = is_dynamic ? 0 : parseInt(length_str);

        t.set_computed_variable_value("Distance_from_Center", Math.abs(center - level).toString());

        const if_statement            = generate_If_Statement(nesting_depth);
        const target_condition_string = if_statement.target_condition_string(level);
        const correct_answer          = if_statement.return_string(level);

        let raw_string: string;
        if (is_dynamic) {
            const arr: string[] = [];
            if_statement.print_into_continuation(arr, 0);
            raw_string = arr.join("");
        } else {
            raw_string = if_statement.print_string(length);
        }


        raw_string = raw_string.replace(
            "(" + target_condition_string + ")",
            "(___MARK___" + target_condition_string + "___END___)"
        );

        let html_string = convert_string_to_html_string(raw_string);
        html_string = html_string
            .replace("___MARK___", `<span style="background-color:red">`)
            .replace("___END___",  `</span>`);

        t.expected_answer = correct_answer;

        t.do_print_task = () => {
            writer.clear_stage();
            const randomLeft = 5  + Math.floor(Math.random() * 10);
            const randomTop  = 10 + Math.floor(Math.random() * 40);
            writer.print_string_on_stage(
                `<div class='sourcecode' style='position:absolute;left:${randomLeft}%;top:${randomTop}%;'>${html_string}</div>`
            );
        };

        t.accepts_answer = (s) => true;

        t.do_print_after_task_information = () => {
            const expected_digit = correct_answer.trim().replace(/\D/g, "");
            const given_digit    = t.given_answer.trim().replace(/\D/g, "");
            const is_correct     = given_digit === expected_digit;
            t.set_computed_variable_value("Correct", is_correct ? "1" : "0");

            writer.clear_stage();
            writer.print_error_string_on_stage(writer.convert_string_to_html_string(
                "The correct answer was: " + t.expected_answer + "\n\n" +
                "In case you feel not concentrated enough, make a short break.\n\n" +
                "Press [Enter] to go on."
            ));
        };
    }
}};

BROWSER_EXPERIMENT(experiment_configuration_function);