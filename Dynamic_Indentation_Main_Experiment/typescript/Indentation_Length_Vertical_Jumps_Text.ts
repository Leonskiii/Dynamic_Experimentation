export function intro_pages() {
    return "<p>Hi, thanks for participating!</p>" +
        "<p>You will be shown a number of nested if-statements where one condition is highlighted in red.</p>" +
        "<p>Your task is to find the closing bracket <b>}</b> of the highlighted if-statement and type the number shown next to it.</p>" +
        "<p>Just type the correct number to proceed.</p>";
}

export function pre_run_training_instructions(): string {
    return "<p>You entered the training phase. You can skip the training by pressing [Esc].</p>";
}

export function pre_run_experiment_instructions(): string {
    return "<p>You entered the experiment phase.</p>";
}

export function finish_pages(): string {
    return "<p>Almost done. Next, the experiment data will be downloaded (after pressing [Enter]).</p>" +
        "<p>Many thanks for your participation.</p>" +
        "<p>Please send your results to leonimming2001@gmail.com</p>" +
        "<p>-Leon Imming</p>";
}