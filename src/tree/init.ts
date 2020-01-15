class Tree_Node {
    name: string;
    parent: Tree_Node;
    childrenArray: Tree_Node[];

    /**
     * constructor
     * @param {string} nodeName
     */
    constructor(nodeName: string) {
        this.name = nodeName;
        this.parent = null;
        this.childrenArray = [];
    }

    /**
     * add children node to this node
     * @param {Tree_Node} childnode
     */
    addchild(childnode: Tree_Node) {
        this.childrenArray.push(childnode);
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
            }else{
                count += node.countleaf();
            }
        });
        return count;
    }
}