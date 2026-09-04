export function is_true(exp, aString="", debug=false) {
    if (!exp) {
        console.error(aString);
        throw "Wrong: " + aString;
    }
    if (debug) {
        console.log("Ok: " + aString);
    }
}