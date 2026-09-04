import { BROWSER_EXPERIMENT } from "../../../../N_of_1_Experiments/modules/Experimentation/Browser_Output_Writer.js";
import { keys, Reaction_Time, SET_SEED, Standard_Post_Questionnaire } from "../../../../N_of_1_Experiments/modules/Experimentation/Experimentation.js";
import { generate_if_statement_noise, generate_if_statement_no_noise } from "./Generate_Code.js";
import { convert_string_to_html_string } from "../../../../N_of_1_Experiments/modules/utils/Utils.js";
import { finish_pages, intro_pages, pre_run_experiment_instructions, pre_run_training_instructions } from "./Indentation_Length_Vertical_Jumps_Text.js";
let SEED = "67";
SET_SEED(SEED);
function generate_training_treatments(n) {
    const noises = ["Noise", "No_Noise"];
    const lengths = ["6", "10", "14", "Dynamic"];
    const levels = ["2", "3", "4", "5", "6"];
    const result = [];
    for (let i = 0; i < n; i++) {
        const noise = noises[Math.floor(Math.random() * noises.length)];
        const length = lengths[Math.floor(Math.random() * lengths.length)];
        const level = levels[Math.floor(Math.random() * levels.length)];
        result.push([noise, length, level, "_", "_", "_", "_"]);
    }
    return result;
}
let experiment_configuration_function = (writer) => {
    return {
        experiment_name: "Noise_Experiment",
        seed: SEED,
        introduction_pages: [writer.string_page_command(intro_pages())],
        pre_run_training_instructions: writer.string_page_command(pre_run_training_instructions()),
        pre_run_experiment_instructions: writer.string_page_command(pre_run_experiment_instructions()),
        post_questionnaire: Standard_Post_Questionnaire(),
        training_configuration: {
            can_be_cancelled: true,
            can_be_repeated: true,
            fixed_treatments: generate_training_treatments(40),
        },
        finish_pages: [writer.string_page_command(finish_pages())],
        layout: [
            { variable: "Noise", treatments: ["Noise", "No_Noise"] },
            { variable: "Length", treatments: ["6", "10", "14", "Dynamic"] }, //, "10", "14", "Dynamic"]
            { variable: "Level", treatments: ["2", "3", "4", "5", "6"] },
            { variable: "Distance_from_Center", treatments: ["_computed_"] },
            { variable: "Overlap_Above_Percent", treatments: ["_computed_"] },
            { variable: "Overlap_Below_Percent", treatments: ["_computed_"] },
            { variable: "Correct", treatments: ["_computed_"] },
        ],
        repetitions: 10,
        measurement: Reaction_Time(keys(["1", "2", "3", "4", "5", "6", "7", "8", "9"])),
        task_configuration: (t) => {
            const center = 4;
            const nesting_depth = center * 2 - 1;
            const noise = t.treatment_value("Noise");
            const length_str = t.treatment_value("Length");
            const level = parseInt(t.treatment_value("Level"));
            const is_dynamic = length_str === "Dynamic";
            const length = is_dynamic ? 4 : parseInt(length_str);
            const is_noise = noise === "Noise";
            t.set_computed_variable_value("Distance_from_Center", Math.abs(center - level).toString());
            const { if_statement, marked_word } = is_noise
                ? generate_if_statement_noise(nesting_depth, level)
                : generate_if_statement_no_noise(nesting_depth, level);
            const correct_answer = if_statement.return_string(level);
            // Overlap berechnen
            const marked_start = (level - 1) * 14 + 3;
            const marked_len = marked_word.length;
            const above_word = level > 1
                ? if_statement.target_condition_string(level - 1)
                : "";
            const below_word = level < nesting_depth
                ? if_statement.target_condition_string(level + 1)
                : "";
            // Oben: ab Spalte marked_start bis Ende der Zeile darüber (inkl. ))
            const above_end_col = (level - 2) * 14 + 3 + above_word.length + 1;
            const overlap_above = Math.max(0, above_end_col - marked_start);
            // Unten: Zeile darunter beginnt bei (level)*14, if( = 3 Zeichen, dann Wort
            const below_start_col = (level - 1) * 14;
            const below_content = 3 + below_word.length;
            const overlap_below = Math.max(0, below_content - (marked_start - below_start_col));
            const overlap_above_p = Math.round(overlap_above / marked_len * 100);
            const overlap_below_p = Math.round(overlap_below / marked_len * 100);
            t.set_computed_variable_value("Overlap_Above_Percent", overlap_above_p.toString());
            t.set_computed_variable_value("Overlap_Below_Percent", overlap_below_p.toString());
            let raw_string;
            if (is_dynamic) {
                const arr = [];
                if_statement.print_into_continuation(arr, 0);
                raw_string = arr.join("");
            }
            else {
                raw_string = if_statement.print_string(length);
            }
            const escaped = marked_word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            let html_string = convert_string_to_html_string(raw_string);
            html_string = html_string.replace(`(${marked_word})`, `(<span style="background-color:red">${marked_word}</span>)`);
            t.expected_answer = correct_answer;
            t.do_print_after_task_information = () => {
                const expected_digit = correct_answer.trim().replace(/\D/g, "");
                const given_digit = t.given_answer.trim().replace(/\D/g, "");
                const is_correct = given_digit === expected_digit;
                t.set_computed_variable_value("Correct", is_correct ? "1" : "0");
                writer.clear_stage();
                writer.print_error_string_on_stage(writer.convert_string_to_html_string("The correct answer was: " + t.expected_answer + "\n\n" +
                    "In case you feel not concentrated enough, make a short break.\n\n" +
                    "Press [Enter] to go on."));
            };
            t.do_print_task = () => {
                writer.clear_stage();
                const randomLeft = 5 + Math.floor(Math.random() * 10);
                const randomTop = 10 + Math.floor(Math.random() * 40);
                writer.print_string_on_stage(`<div class='sourcecode' style='position:absolute;left:${randomLeft}%;top:${randomTop}%;'>${html_string}</div>`);
            };
            t.accepts_answer = (s) => true;
        }
    };
};
BROWSER_EXPERIMENT(experiment_configuration_function);
//# sourceMappingURL=Indentation_Length_Vertical_Jumps.js.map