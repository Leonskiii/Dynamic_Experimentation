import {is_true} from '../utils/Testing.js';

export class BinaryBidirectionalTree {
    content = null;
    left: BinaryBidirectionalTree = null;
    right: BinaryBidirectionalTree = null;
    parent: BinaryBidirectionalTree = null;
    constructor(left: BinaryBidirectionalTree, right: BinaryBidirectionalTree) {
        this.left = left;
        if(left!=null)
            this.left.parent = this;
        this.right = right;
        if(right!=null)
            this.right.parent = this;
    }

    is_left_child() {
        if(this.parent==null)
            return false;

        return this.parent.left == this;
    }

    is_right_child() {
        if(this.parent==null)
            return false;

        return this.parent.right == this;
    }

    number_of_nodes() {
        return 1 + (this.left!=null? this.left.number_of_nodes(): 0) + (this.right!=null? this.right.number_of_nodes(): 0);
    }

    number_of_inner_nodes() {
        if(this.is_leave())
            return 0;

        // console.log("num_inner_nodes: " + this.source_string());
        return 1 + (this.left!=null? this.left.number_of_inner_nodes(): 0) + (this.right!=null? this.right.number_of_inner_nodes(): 0);
    }


    source_string() {
        let arr = [];
        this.source_string_writer(arr);
        return arr.join("");
    }

    source_string_writer(arr) {
        if (this.is_leave()) {
            arr.push(this.content);
            return;
        }

        arr.push("(");
        if(this.left!=null)
            this.left.source_string_writer(arr);

        arr.push(this.content);

        if(this.right!=null)
            this.right.source_string_writer(arr);
        arr.push(")");
    }

    clone():BinaryBidirectionalTree {
        let left_child:BinaryBidirectionalTree = (this.left!=null)?this.left.clone(): this.left;
        let right_child = (this.right!=null)?this.right.clone(): this.right;
        let ret = new BinaryBidirectionalTree(left_child, right_child);
        ret.content = (this.content==null)?null:this.content.clone();
        return ret;
    }

    push_leaves() {
        if(this.left!=null)
            this.left.push_leaves();
        else {
            this.left = new BinaryBidirectionalTree(null, null);
            this.left.parent = this;
        }

        if(this.right!=null)
            this.right.push_leaves();
        else {
            this.right = new BinaryBidirectionalTree(null, null);
            this.right.parent = this;
        }
    }

    as_in_order_array():BinaryBidirectionalTree[] {
        let arr = [];
        this.as_in_order_array_writer(arr);
        return arr;
    }

    as_in_order_array_writer(arr) {
        if(this.left!=null)
            this.left.as_in_order_array_writer(arr);

        arr.push(this);

        if(this.right!=null)
            this.right.as_in_order_array_writer(arr);
    }

    set_all_operator_values(operator_value:string) {
        let arr:BinaryBidirectionalTree[] = this.as_in_order_array();
        arr = arr.filter((e)=>!e.is_leave());
        arr.forEach(e => e.content=operator_value);
    }

    set_all_leave_values(leave_value:string) {
        let arr:BinaryBidirectionalTree[] = this.as_in_order_array();
        arr = arr.filter((e)=>e.is_leave());
        arr.forEach(e => e.content=leave_value);
    }

    is_leave() {
        return this.left==null && this.right == null;
    }

    call_by_value_order():BinaryBidirectionalTree[] {
        let arr = [];
        this.call_by_value_order_writer(arr);
        return arr;
    }

    call_by_value_order_writer(arr:BinaryBidirectionalTree[]) {
        if(this.is_leave()) {
            arr.push(this);
            return;
        }

        if(this.left!=null) {
            this.left.call_by_value_order_writer(arr);
        }

        if(this.right!=null) {
            this.right.call_by_value_order_writer(arr);
        }

        arr.push(this);
    }

    has_child(child:BinaryBidirectionalTree) {
        if(this===child)
            return true;
        else
            if(this.left!=null)
                if(this.left.has_child(child))
                    return true;
        if(this.right!=null)
            if(this.right.has_child(child))
                return true;

        return false;
    }
}

export function create_catalan_graphs(number_of_nodes): BinaryBidirectionalTree[] {
    let nodes: BinaryBidirectionalTree[] = [];
    _catalan_graphs(number_of_nodes, nodes);
    return nodes;
}
function _catalan_graphs(number_of_nodes, results): BinaryBidirectionalTree[] {
    if (number_of_nodes==0) {
        results.push(null);
        return;
    } else if (number_of_nodes==1) {
        results.push(new BinaryBidirectionalTree( null, null));
        return;
    } else {
        for(let left_counter= 0; left_counter < number_of_nodes; left_counter++) {
            let diff = number_of_nodes - left_counter - 1;
            let left_children = [];
            let right_children = [];
            _catalan_graphs(left_counter, left_children);
            _catalan_graphs(diff, right_children);
            for(let then_branch=  0;  then_branch < left_children.length; then_branch++) {
                for(let else_branch=0;  else_branch < right_children.length; else_branch++) {
                    results.push(new BinaryBidirectionalTree(left_children[then_branch], right_children[else_branch]));
                }
            }
        }
    }
}

function test_catalan_graphs() {
    let nodes: BinaryBidirectionalTree[] = [];

    nodes = create_catalan_graphs(1);
    is_true(nodes.length==1, "Catalan number 1 = 1");

    nodes = create_catalan_graphs(2);
    is_true(nodes.length==2, "Catalan number 2 = 2");

    nodes = create_catalan_graphs(3);
    is_true(nodes.length==5, "Catalan number 3 = 5");

    nodes = create_catalan_graphs(4);
    is_true(nodes.length==14, "Catalan number 4 = 14");

    nodes = create_catalan_graphs(5);
    is_true(nodes.length==42, "Catalan number");

    nodes = create_catalan_graphs(6);
    is_true(nodes.length==132, "Catalan number");

    nodes = create_catalan_graphs(7);
    is_true(nodes.length==429, "Catalan number");

    nodes = create_catalan_graphs(8);
    is_true(nodes.length==1430, "Catalan number");

    nodes = create_catalan_graphs(9);
    is_true(nodes.length==4862, "Incorrect Catalan number");

    console.log("Catalan numbers seem ok.")
}

test_catalan_graphs();