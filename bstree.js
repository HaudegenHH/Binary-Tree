/*

                   5
                /     \
              3         6
          /   \       /   \
        2    null    4      9
      /  \         / \     /  \  
  null   null  null  null null null

  etc.

*/

function Node(value) {
  this.value = value
  this.left = null
  this.right = null
}

class Tree {
  constructor() {
    this.root = null
  }
  add(value) {
    const node = new Node(value)
   
    if(!this.root) {
      this.root = node
    } else {
      this.insertNode(node) // figures out the place where the node has to be stored
    } 
  }
  insertNode(node){
    let current = this.root
    
    while(current) {
      if(node.value < current.value) {
        if(!current.left) {
          current.left = node
          break
        } 
        current = current.left
      } else if (node.data > current.data) {
        if (!current.right) {
          current.right = node
          break
        }
        current = current.right
      } else {
         break
      }  
    }
  }
  remove(value) {
    this.root = this.removeNode(this.root, value)
  }
  removeNode(node, value) {
    if(!node) {
      return null
    }
    if (value === node.value) {
      if (!node.left && !node.right) {  // no node, not on the left and not on the right, then..
         return null
      } 
      if (!node.left) {   // if there is no node jst on the left
         return node.right
      }
      if (!node.right) {   // if there is no node jst on the left
         return node.left
      }
      const tmp = this.getMin(node.right)
      node.value = tmp

      node.right = this.removeNode(node.right, tmp) // recursive call with node.right
      return node
    } else if (value < node.value) {
      node.left = this.removeNode(node.left, value)
      return node
    } else {
      node.right = this.removeNode(node.right, value)
      return node
    }
  }
  getMin(node) {
    if (!node) {
      node = this.root
    }
    // getting the minimum in the tree
    while (node.left) {
      node = node.left
    }
    return value
  }

  preOrder(node, cb) {
    if (node) {
      if (cb) {
         cb(node)
      }
      this.preOrder(node.left, cb)
      this.preOrder(node.right, cb)
    }
  }

  traverseDFS(cb, method) {      // depth first search algorithm
    const current = this.root
    if (method) {
      this[`${method}`](current, cb)
    } else {
      this.preOrder(current, cb)
    }
  }
  printDFS() {
    this.traverseDFS((node) => {
      console.log(
        `Node.value ${node.value}`,
        `Node.left: ${node.left ? node.left.value : null}`,
        `Node.right: ${node.right ? node.right.value : null} `
      )
    })
  }
}


(function test() {
  let tree = new Tree()
  tree.add(5)
  tree.add(3)
  tree.add(2)   
  
  tree.printDFS()

  console.log("remove 5")  
  tree.remove(5) 

  tree.printDFS()
  
})()