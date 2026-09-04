import { Automata_Configurator } from "../Automata/Automata_Configurator.js";
import { from } from "../Automata/Transitions.js";
import { Experimentation_Forwarder } from "./Experimentation_Forwarder.js";
let SHOW_INTRO = 0;
let SHOW_PRE_TASK_INFO = 1;
let SHOW_TASK = 2;
let SHOW_PENALTY = 3;
let TASK_FINISHED = 4;
let SHOW_OUTRO = 5;
let EVERYTHING_DONE = 6;
let ESCAPED = 7;
export class Training_Execution_Forwarder extends Experimentation_Forwarder {
    constructor(pre_run_instructions, training_configuration, experiment_definition, measurement) {
        super("Training", () => {
            pre_run_instructions();
            measurement.output_writer().print_html_on_stage("<hr>" +
                "<p>Press [Enter] to start training.</p>");
        }, () => {
            measurement.output_writer().print_html_on_stage("<p>You finished the training phase.</p><hr><p>" +
                (training_configuration.can_be_repeated ? "Please, press [Enter] to run again a training session.<br>" : "") +
                "Please, press [E] (capital E, i.e., [shift] + [e]) to enter the experiment phase.</p>");
        }, experiment_definition, measurement);
        this.training_configuration = training_configuration;
    }
    print_cancel_text() {
        this.output_writer().clear_stage();
        this.output_writer().print_string_to_page_number("Cancelled");
        let navigation_string = "<p>You cancelled this training session.</p><hr>" +
            "<p>Press [Enter] if you want to start another training session.</p>" +
            "<p>Press [E] (capital E!) if you want to start with the experiment.</p>";
        this.output_writer().print_html_on_stage(navigation_string);
    }
    automata_configurator() {
        return new Automata_Configurator([SHOW_INTRO, SHOW_PRE_TASK_INFO, SHOW_TASK, SHOW_PENALTY, TASK_FINISHED, SHOW_OUTRO, EVERYTHING_DONE, ESCAPED], SHOW_INTRO, () => { }, this.transitions(), [EVERYTHING_DONE]);
    }
    transitions() {
        let experiment_transitions = super.transitions();
        let this_transitions = [
            from(SHOW_INTRO).to(ESCAPED)
                .on("Escape")
                .if(() => this.training_configuration.can_be_cancelled)
                .do((i) => {
                this.print_cancel_text();
            }),
            from(SHOW_TASK).to(ESCAPED)
                .on("Escape")
                .if(() => this.training_configuration.can_be_cancelled)
                .do((i) => {
                this.print_cancel_text();
            }),
            from(TASK_FINISHED).to(ESCAPED)
                .on("Escape")
                .if(() => this.current_page_index < this.experiment_definition.tasks.length - 1 && this.training_configuration.can_be_cancelled)
                .do((i) => {
                this.print_cancel_text();
            }),
            from(ESCAPED).to(EVERYTHING_DONE)
                .on("E").do(() => {
                let dummy = 1;
            }),
            from(ESCAPED).to(SHOW_INTRO)
                .on("Enter").do(() => {
                this.training_configuration.init_experiment(this.experiment_definition); // ← auch hier fixen
                this.show_intro();
            }),
            from(SHOW_OUTRO).to(SHOW_INTRO)
                .on("Enter")
                .if(() => this.training_configuration.can_be_repeated)
                .do(() => {
                this.training_configuration.init_experiment(this.experiment_definition); // ← fix
                this.show_intro();
            }),
            from(SHOW_OUTRO).to(EVERYTHING_DONE)
                .on("E")
                .do((i) => {
                let dummy = 1;
            })
        ];
        experiment_transitions.splice(experiment_transitions.length - 1);
        this_transitions.forEach((e) => experiment_transitions.push(e));
        return experiment_transitions;
    }
    input(s) {
        if (!["a", "b", "c"].includes(s) && this.automata.current_state != 0)
            return super.input(s);
        super.input(s);
    }
    init_experiment() {
        this.experiment_definition.is_training = true;
        this.training_configuration.init_experiment(this.experiment_definition);
    }
}
//# sourceMappingURL=Training_Execution_Forwarder.js.map