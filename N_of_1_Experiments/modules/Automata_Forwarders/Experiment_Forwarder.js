import { Experimentation_Forwarder } from "./Experimentation_Forwarder.js";
export class Experiment_Forwarder extends Experimentation_Forwarder {
    constructor(pre_run_instructions, experiment_definition, measurement) {
        super("Main Experiment", () => {
            pre_run_instructions();
            measurement.output_writer().print_html_on_stage("<hr>" +
                "<p>Press [Enter] to start the experiment.</p>");
        }, () => {
            measurement.output_writer().print_html_on_stage("<p>You finished the experiment phase.</p><hr>" +
                "<p>Please, press [Enter] to go to the next phase.</p><br>");
        }, experiment_definition, measurement);
    }
}
//# sourceMappingURL=Experiment_Forwarder.js.map