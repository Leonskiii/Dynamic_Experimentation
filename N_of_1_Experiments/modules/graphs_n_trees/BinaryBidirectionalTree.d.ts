export declare class BinaryBidirectionalTree {
    content: any;
    left: BinaryBidirectionalTree;
    right: BinaryBidirectionalTree;
    parent: BinaryBidirectionalTree;
    constructor(left: BinaryBidirectionalTree, right: BinaryBidirectionalTree);
    is_left_child(): boolean;
    is_right_child(): boolean;
    number_of_nodes(): any;
    number_of_inner_nodes(): any;
    source_string(): string;
    source_string_writer(arr: any): void;
    clone(): BinaryBidirectionalTree;
    push_leaves(): void;
    as_in_order_array(): BinaryBidirectionalTree[];
    as_in_order_array_writer(arr: any): void;
    set_all_operator_values(operator_value: string): void;
    set_all_leave_values(leave_value: string): void;
    is_leave(): boolean;
    call_by_value_order(): BinaryBidirectionalTree[];
    call_by_value_order_writer(arr: BinaryBidirectionalTree[]): void;
    has_child(child: BinaryBidirectionalTree): boolean;
}
export declare function create_catalan_graphs(number_of_nodes: any): BinaryBidirectionalTree[];
