/**
 * Node of Task Tree
 */
export class Tree_Node {
    name: string;
    depth: number;
    parent: Tree_Node;
    childrenArray: Tree_Node[];

    /**
     * constructor
     * @param {string} nodeName
     */
    constructor(nodeName: string) {
        this.name = nodeName;
        this.depth = 0;
        this.parent = null;
        this.childrenArray = [];
    };

    /**
     * add children node to this node
     * @param {Tree_Node} childnode
     */
    addchild(childnode: Tree_Node) {
        this.childrenArray.push(childnode);
        childnode.depth = this.depth + 1;
        childnode.parent = this;
    };

    /**
     * count leaf node from this node
     */
    countleaf() {
        let count: number = 0;
        Array.prototype.forEach.call(this.childrenArray, (node: Tree_Node) => {
            if (node.childrenArray.length == 0) {
                count += 1;
            } else {
                count += node.countleaf();
            }
        });
        return count;
    };
};

/**
 * make sample Task Tree
 */
export function makeSampleTree() {
    const root: Tree_Node = new Tree_Node('Root');

    const group_A: Tree_Node = new Tree_Node('GROUP_A');
    const group_B: Tree_Node = new Tree_Node('GROUP_B');

    root.addchild(group_A);
    root.addchild(group_B);

    const group_A_1: Tree_Node = new Tree_Node('GROUP_A_1');
    const group_A_2: Tree_Node = new Tree_Node('GROUP_A_2');
    const group_A_3: Tree_Node = new Tree_Node('GROUP_A_3');
    const group_A_4: Tree_Node = new Tree_Node('GROUP_A_4');
    const group_A_5: Tree_Node = new Tree_Node('GROUP_A_5');

    group_A.addchild(group_A_1);
    group_A.addchild(group_A_2);
    group_A.addchild(group_A_3);
    group_A.addchild(group_A_4);
    group_A.addchild(group_A_5);
    return root;
};

/**
 * search node in tree using name, depth
 * @param {Tree_Node} tree 
 * @param {string} elem_name 
 * @param {number} elem_depth 
 */
export function search_node(tree: Tree_Node, elem_name: string, elem_depth: number) {
    let queue: Tree_Node[] = [tree];
    let node: Tree_Node = null;
    while (queue.length > 0) {
        node = queue.shift();
        if (node.name == elem_name && node.depth == elem_depth) {
            break;
        }
        queue = queue.concat(node.childrenArray);
    }
    return node;
};

/**
 * insert task node to tree
 * @param {Tree_Node} tree 
 * @param {HTMLElement} selected_elem 
 * @param {{ name :string, progress: string }} inputForm 
 */
export function insert_task2tree(tree: Tree_Node, selected_elem: HTMLElement, inputForm: { name: string, progress: string }) {
    let elem_name: string = selected_elem.innerHTML;
    let elem_depth: number = Number(selected_elem.id.split('_')[0].split('d')[1]);
    let selected_node: Tree_Node = search_node(tree, elem_name, elem_depth);
    if (inputForm['name'] != "") {
        const new_task_node: Tree_Node = new Tree_Node(inputForm['name']);
        selected_node.addchild(new_task_node);
    }
};