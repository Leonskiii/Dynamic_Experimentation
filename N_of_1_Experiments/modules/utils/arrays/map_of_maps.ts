export function map_of_maps_of_array(arr, function_array, last_function) {

    let result = {};

    for(let element of arr) {

        let current_map = result;
        let function_values = [];

        for(let f of function_array) {
            let function_value = f(element);
            function_values.push(function_value);
            if(current_map["" + function_value] == undefined) {
                current_map["" + function_value] = {};
            }
            current_map = current_map["" + function_value];
        }
        if(current_map[last_function(element)] == undefined) {
            current_map[last_function(element)] = [];
        }
        current_map[last_function(element)].push(element);
    }
    return result;
}