class Tree_Node {
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
    }

    /**
     * add children node to this node
     * @param {Tree_Node} childnode
     */
    addchild(childnode: Tree_Node) {
        this.childrenArray.push(childnode);
        childnode.depth = this.depth + 1;
        childnode.parent = this;
    }

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
    }
}

// make Sample Tree
function makeSampleTree() {
    const root: Tree_Node = new Tree_Node('Root');

    const group_A: Tree_Node = new Tree_Node('GROUP_A');
    const group_B: Tree_Node = new Tree_Node('GROUP_B');

    root.addchild(group_A);
    root.addchild(group_B);

    const group_A_1: Tree_Node = new Tree_Node('GROUP_A_1');
    const group_A_2: Tree_Node = new Tree_Node('GROUP_A_2');

    group_A.addchild(group_A_1);
    group_A.addchild(group_A_2);
    return root;
};