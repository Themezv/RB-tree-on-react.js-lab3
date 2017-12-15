let arr =[];
const black = '#000';
const red = '#f00';

class Tree {
    constructor(data) {
        const {skey, left, right, parent, empty, color} = data;
        this.skey = skey;
        this.left = left;
        this.right = right;
        this.parent = parent;
        this.empty = empty || false;
        this.color = color;
    }

    preorderTravelsal(index) {
        if(index === 0){
            arr = [];
            arr[0] = this;
        } else {
            arr[index] = this;
        }
        if (this.left) {
            this.left.preorderTravelsal(index*2+1);
        }
        if (this.right) {
            this.right.preorderTravelsal(index*2+2);
        }

        return arr;
    };

    rotateLeft(){
        console.log('rotate left');
        const pivot = this.right;
        pivot.parent = this.parent;
        if(this.parent){
            if(this === this.parent.left){
                this.parent.left = pivot;
            } else {
                this.parent.right = pivot;
            }
        }
        this.right = pivot.left;
        if (pivot.left){
            pivot.left.parent = this;
        }
        this.parent = pivot;
        pivot.left = this;
    }

    rotateRight(){
        console.log('rotate right');
        const pivot = this.left;
        pivot.parent = this.parent;
        if(this.parent){
            if(this === this.parent.left){
                this.parent.left = pivot;
            } else {
                this.parent.right = pivot;
            }
        }
        this.left = pivot.right;
        if (pivot.right){
            pivot.right.parent = this;
        }
        this.parent = pivot;
        pivot.right = this;
    }

    insertCase1(){
        console.log('insert1', this);
        if(!this.parent){
            this.color = black;
        } else {
            this.insertCase2()
        }
    }

    insertCase2(){
        if(this.parent.color !== black){
            this.insertCase3()
        }
    }

    insertCase3(){
        const u = this.uncle();
        const p = this.parent;
        const g = this.grandParent();

        if(u && u.color === red) {
            p.color = black;
            u.color = black;
            g.color = red;
            g.insertCase1();
        } else {
            this.insertCase4();
        }
    }

    insertCase4(){
        console.log('insert4', this);
        let g = this.grandParent();
        let n = this;
        if(this === this.parent.right && this.parent === g.left){
            this.parent.rotateLeft();
            n = this.left;
        } else {
            if(this === this.parent.left && this.parent === g.right){
                this.parent.rotateLeft();
                n = this.right;
            }
        }
        n.insertCase5();
    }

    insertCase5(){
        console.log('insert5');
        let g = this.grandParent();

        this.parent.color = black;
        g.color = red;
        if (this === this.parent.left && this.parent === g.left) {
            g.rotateRight();
        } else {
            g.rotateLeft();
        }
    }

    findRoot(){
        if(this.parent){
            return this.parent.findRoot();
        } else {
            return this;
        }
    }

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

    grandParent() {
        if(this.parent){
            return this.parent.parent;
        }
        else {
            return undefined;
        }
    }

    uncle() {
        const gp = this.grandParent();
        if(!gp){
            return undefined;
        }
        if(this.parent === gp.left){
            return gp.right;
        }
        else {
            return gp.left;
        }
    }

    insert(data) {
        const newNode = new Tree(data);
        console.log(this, newNode);
        if (this.empty) {
            this.skey = newNode.skey;
            this.value = newNode.value;
            this.color = black;
            this.empty = false;
            newNode.insertCase1();
            const mainTree = this.findRoot();
            return {mainTree, tree: mainTree.preorderTravelsal(0)};
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
        newNode.insertCase1();
        const mainTree = this.findRoot();
        return {mainTree, tree: mainTree.preorderTravelsal(0)};
    }
}

export default Tree;
