let SEED = "666";
Nof1.SET_SEED(SEED);


    let experiment_configuration_function = (writer) => { return {

        experiment_name: "TestExperiment",
        seed: SEED,

        introduction_pages: writer.stage_string_pages_commands([
            writer.convert_string_to_html_string(
                "Please, just do this experiment only, when you have enough time, are concentrated enough, and motivated enough.\n\nPlease, open the browser in fullscreen mode (probably by pressing [F11])."),
            writer.convert_string_to_html_string(
                "In this experiment, you will be asked to manually compute the result of an mathematical term.\n\nDon't worry, the terms are not too complex.")
        ]),

        pre_run_training_instructions: writer.string_page_command(
            writer.convert_string_to_html_string(
                "You entered the training phase."
            )),

        pre_run_experiment_instructions: writer.string_page_command(
            writer.convert_string_to_html_string(
                "You entered the experiment phase.\n\n"
        )),

        post_questionnaire: [
            Nof1.free_text("Name","What's your name?"),
            Nof1.free_text("Age","How old are you?"),
            Nof1.alternatives("Status","What is your current working status?",
                ["Undergraduate student (BSc not yet finished)", "Graduate student (at least BSc finished)", "PhD student", "Professional software developer", "Teacher", "Other"]),
            Nof1.free_text("Experience","How many years of working experience in software industry to you have?"),
            Nof1.free_text("LoC","How many lines of code do you think you write each day on average?"),
        ],

        finish_pages: [
            writer.string_page_command(
                writer.convert_string_to_html_string(
                "Almost done. Next, the experiment data will be downloaded. Please, send the " +
                "downloaded file to the experimenter.\n\nAfter sending your email, you can close this window.\n\nMany thanks for participating in the experiment."
                )
            )
        ],

        layout: [
            { variable: "Dummy",  treatments: ["X"]},
        ],

        repetitions: 1,

        measurement: Nof1.Time_to_finish_with_penality(Nof1.text_input_experiment, 3),

        task_configuration:    (t) => {

            t.do_print_task = () => {
                writer.clear_stage();
                writer.print_html_on_stage("<div class='sourcecode'>Hi, this is some source code, enter abc </div>");
            };

            t.expected_answer = "abc";

            t.accepts_answer_function = (given_answer) => {
                return given_answer===t.expected_answer;
            };

            t.do_print_error_message = (given_answer) => {
                writer.clear_stage();
                writer.clear_error();
                writer.print_html_on_error("<h1>Invalid answer: " + given_answer + " You can press [Enter] after 3 seconds and redo the task.");
            };

            t.do_print_after_task_information = () => {
                writer.clear_error();
                writer.print_string_on_stage(writer.convert_string_to_html_string(
                    "Correct.\n\n" +
                    "In case, you feel not concentrated enough, make a short break.\n\n" +
                    "Press [Enter] to go on. "));
            }
        }
    }};

    Nof1.BROWSER_EXPERIMENT(experiment_configuration_function);
