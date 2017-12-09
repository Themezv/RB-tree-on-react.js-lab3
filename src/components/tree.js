class Tree {
    constructor(data) {
        const {skey, left, right, parent, empty} = data;
        this.skey = skey;
        this.left = left;
        this.right = right;
        this.parent = parent;
        this.empty = empty || false;
    }

    preorderTravelsal() {
        console.log('trav', this.skey);
        let subtrees = [];
        if (this.left) {
            this.left.preorderTravelsal();
        }
        if (this.right) {
            this.right.preorderTravelsal();
        }
        return [this];
    };

    search(key) {
        if (this.skey === key) {
            return this;
        }
        if (key < this.skey) {
            return this.left.search(key);
        }
        else {
            return this.right.search(key);
        }
    }

    minimum() {
        if (this.left === undefined) {
            return this;
        }
        return this.left.minimum();
    }

    maximum() {
        if (this.right === undefined) {
            return this;
        }
        return this.right.maximum();
    }

    next() {
        if (this.right) {
            return this.right.minimum();
        }
        let y = this.parent;
        let x = this;
        while (y && x === y.right) {
            x = y;
            y = y.parent;
        }
        return y;
    }

    prev() {
        if (this.left) {
            return this.left.maximum();
        }
        let y = this.parent;
        let x = this;
        while (y && x === y.left) {
            x = y;
            y = y.parent;
        }
        return y;
    }

    insert(data) {
        const newNode = new Tree(data);
        console.log(this, newNode);
        if (this.empty) {
            this.skey = newNode.skey;
            this.value = newNode.value;
            this.empty = false;
            return;
        }
        if (newNode.skey > this.skey) {
            if (this.right) {
                this.right.insert(newNode);
            }
            else {
                newNode.parent = this;
                this.right = newNode;
            }
        } else {
            if (newNode.skey < this.skey) {
                if (this.left) {
                    this.left.insert(newNode);
                }
                else {
                    newNode.parent = this;
                    this.left = newNode;
                }
            }
        }
        this.preorderTravelsal();
    }
}

export default Tree;
