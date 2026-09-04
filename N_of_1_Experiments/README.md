# N-of-1 Experiments

This repo contains code for running N-of-1 experiments. In case you are interested in N-of-1 experiments in programming and software science, you might be interested in the following paper (available via public access)

[Hanenberg, Mehlhorn, "Two N-of-1 self-trials on readability differences between anonymous inner classes (AICs) and lambda expressions (LEs) on Java code snippets", Empir. Softw. Eng. 27(2): 33 (2022)](https://doi.org/10.1007/s10664-021-10077-3)

Experiments that use the present code (probably older versions) can be found here:
[https://github.com/shanenbe/Experiments](https://github.com/shanenbe/Experiments)

In case you just want to use the code for doing an N-of-1, you probably just want to download the most recent template. 


The template of an N-of-1 experiment consists of three files that can be downloaded from here:
[https://github.com/shanenbe/N-of-1-Experimentation/tree/main/___BUILD_LIB_FILE_TestExperiment](https://github.com/shanenbe/N-of-1-Experimentation/tree/main/___BUILD_LIB_FILE_TestExperiment)
- index.html: the starting page for the experiment. This html-file loads the following two files.
- lib.js: the library (the present repo packed via webpack). You will probably not want to take a look into it (because it is generated).
- exp_trial02.js: the code of the experiment you want to run (the downloaded file contains just a mock).

For running an experiment, you need to edit exp_trial02.js and then run the html-page.

Probably the easiest way to get into the code is to take a look into __Examples. 
