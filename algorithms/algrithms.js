const mergeSort = arr => {
  if (arr.length < 2) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);

  const right = arr.slice(0, middle);
  const left = arr.slice(middle, arr.length);
  return merge(mergeSort(left), mergeSort(right));
};

const merge = (left, right) => {
  const result = [];

  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }

  return result.concat(left, right);
};
mergeSort([1, 2, 3, 9, 3, 2, 9, 4, 8, 5]);

////////////////////////////////// quicksort

const quicksort = arr => {
  if (arr.length <= 1) {
    return arr;
  }
  const pivote = arr[arr.length - 1];
  const right = [];
  const left = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivote) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return [...quicksort(left), pivote, ...quicksort(right)];
};
quicksort([1, 2, 4, 3, 2, 21, 1, 1, 15, 2, 3, 4]);

//////////// .  binarySearch/////////////////
let a = [1, 8, 4, 5, 9];

//////////////////////////// . sorting arr

function BS(l, h, arr, key) {
  let sArr = arr.sort((a, b) => {
    return a > b;
  });

  let middle = Math.floor(l + h + 1 / 2);

  ///////////////////////////// only 1 item in arr
  if (l === h) {
    if (sArr[l] === key) {
      return true;
    }
  } else {
    if (sArr[middle] === key) {
      return true;
    } else if (key < sArr[middle]) {
      return BS(l, middle - 1, sArr, key);
    } else if (key > sArr[middle]) {
      return BS(middle + 1, h, sArr, key);
    }
    return false;
  }
}
console.log(bs(0, a.length - 1, a, 8));

//////////////////////////////// . queue

class Queue {
  constructor() {
    this.storage = {};
    this.size = 0;
  }

  enqueue(value) {
    this.storage[this.size++] = value;
  }

  dequeue() {
    this.size--;

    let deleted = delete this.storage[0];
    for (let key in this.storage) {
      this.storage[key - 1] = this.storage[key];
      delete this.storage[key];
    }
    return deleted;
  }

  getSize() {
    return this.size;
  }
}

const copy = new Queue();
copy.enqueue("hilal");
copy.enqueue("filal");
copy.enqueue("bilal");
copy.dequeue();

console.log(copy.getSize());

///////////////////////////////// stack

class Stack {
  constructor() {
    this.storage = {};
    this.size = 0;
  }

  add(value) {
    this.storage[this.size++] = value;
  }

  remove() {
    this.size && this.size--;

    let deleted = delete this.storage[this.size];

    return deleted;
  }

  getSize() {
    return this.size;
  }
}

const copy = new Stack();
copy.add("hilal");
copy.add("filal");
copy.add("bilal");
copy.remove();
copy.add("kilal");

console.log(copy);

////////////////////////////// binary tree

class BT {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(x) {
    if (x < this.value && !this.left) {
      this.left = new BT(x);
    }

    if (x < this.value && this.left) {
      this.left.insert(x);
    }

    if (x > this.value && !this.right) {
      this.right = new BT(x);
    }

    if (x > this.value && this.right) {
      this.right.insert(x);
    }
  }

  contains(x) {
    if (this.value === x) {
      return true;
    }
    return (
      !!(this.left && this.left.contains(x)) ||
      !!(this.right && this.right.contains(x))
    );
  }
}

///////////////////////

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /////////////////

  add(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
      return;
    }
    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
    return;
  }

  //////////////////

  returnHead() {
    if (!this.head) {
      return null;
    }

    const head = this.head.value;
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size--;
      return head;
    }

    this.head = this.head.next;
    this.size--;
    return head;
  }
}

const copy = new LinkedList();

copy.add(6);
console.log(copy.returnHead());

console.log(copy);

/////////////////////////// possibilities

const pro = rounds => {
  const result = [];
  let combination;
  let possibilities = ["r", "s", "z"];

  const helper = (str, rounds) => {
    if (rounds === 0) {
      result.push(str);
      return;
    }

    for (let i = 0; i < possibilities.length; i++) {
      combination = str + possibilities[i];
      helper(combination, rounds - 1);
    }
  };

  helper("", rounds);
  return result;
};

console.log(pro(3));

//////////////////////// combinations

let string = "alfo";

let arr = string.split("");
console.log(arr);

const pro = arr => {
  const result = [];
  let combination;

  const helper = (str, newArr) => {
    for (let i = 0; i < newArr.length; i++) {
      combination = str + newArr[i];
      result.push(combination);
      helper(combination, newArr.slice(i + 1));
    }
  };

  helper("", arr);
  return result;
};

console.log(pro(arr));

////////// fibonacci

let result;
function naivefib(n) {
  if (n < 3) {
    return 1;
  }
  result = naivefib(n - 1) + naivefib(n - 2);
  return result;
}
console.log(naivefib(20));

// memorized solution

let result;
let arr = [];

function fib(n) {
  if (arr[n] !== null && arr[n] !== undefined) {
    return arr[n];
  }
  if (n < 3) {
    return 1;
  }

  result = fib(n - 1) + fib(n - 2);
  arr[n] = result;
  return result;
}
console.log(fib(1000));

//////// buttom up

let newarr = [];
function newfib(n) {
  newarr[1] = 1;
  newarr[2] = 1;
  for (let i = 3; i <= n; i++) {
    newarr[i] = newarr[i - 1] + newarr[i - 2];
  }

  return newarr[n];
}
console.log(newfib(1000));

///////////////////////////////////

//////////////// .

class Heap {
  constructor() {
    this.storage = [];
  }

  insert(x) {
    if (this.storage.length > 0) {
      if (x > this.storage[0]) {
        this.storage.unshift(x);
      } else {
        this.storage.push(x);
        this.bubleup(this.storage.length - 1);
      }
    } else {
      this.storage.push(x);
    }
  }

  delete() {
    if (this.storage.length === 0) {
      return null;
    }

    const max = this.storage.shift();
    this.siftdown(0);
    return max;
  }

  bubleup(childIndex) {
    const parentIndex = Math.floor((childIndex - 1) / 2);
    if (this.storage[parentIndex] < this.storage[childIndex]) {
      [this.storage[parentIndex], this.storage[childIndex]] = [
        this.storage[childIndex],
        this.storage[parentIndex]
      ];
      this.bubleup(parentIndex);
    }
  }

  siftdown(parentIndex) {
    const rightChildIndex = parentIndex * 2 + 1;
    const leftChildIndex = parentIndex * 2 + 2;
    let maxIndex;

    if (this.storage[rightChildIndex] && this.storage[leftChildIndex]) {
      maxIndex =
        this.storage[rightChildIndex] > this.storage[leftChildIndex]
          ? rightChildIndex
          : leftChildIndex;

      if (this.storage[maxIndex] > this.storage[parentIndex]) {
        [this.storage[maxIndex], storage[parentIndex]] = [
          this.storage[parentIndex],
          this.storage[maxIndex]
        ];
        this.siftdown(maxIndex);
      }
    }

    if (this.storage[rightChildIndex]) {
      maxIndex = rightChildIndex;
      if (this.storage[maxIndex] > this.storage[parentIndex]) {
        [this.storage[maxIndex], storage[parentIndex]] = [
          this.storage[parentIndex],
          this.storage[maxIndex]
        ];
        this.siftdown(maxIndex);
      }
    }
    if (this.storage[leftChildIndex]) {
      maxIndex = leftChildIndex;
      if (this.storage[maxIndex] > this.storage[parentIndex]) {
        [this.storage[maxIndex], storage[parentIndex]] = [
          this.storage[parentIndex],
          this.storage[maxIndex]
        ];
        this.siftdown(maxIndex);
      }
    }
  }

  arr() {
    return this.storage;
  }
}

const a = new Heap();

a.insert(3);
a.insert(6);
a.insert(9);
a.insert(20);
a.insert(7);
a.insert(8);
console.log(a.delete());

console.log(a.arr());

///////// graph////////////////////
class Graph {
  constructor() {
    this.storage = {};
    this.size = 0;
  }

  add(value) {
    this.storage[value] = {};
    this.size++;
  }

  addConnection(from, to) {
    this.storage[from][to] = true;
    this.storage[to][from] = true;
  }
  removeConnection(from, to) {
    delete this.storage[from][to];
    delete this.storage[to][from];
  }
  contains(value) {
    if (this.storage[value]) {
      return true;
    }
  }

  hasConnection(from, to) {
    if (this.storage[from][to] === true) {
      return true;
    }
  }
  remove(value) {
    delete this.storage[value];
    this.size--;
    for (let key in this.storage) {
      delete key[value];
    }
  }
}

const copy = new Graph();
copy.add("bilal");
copy.add("amin");
copy.add("lahacen");
copy.add("yamin");
copy.add("rafik");
copy.add("mohemed");

console.log(copy);
copy.addConnection("bilal", "lahacen");
copy.addConnection("amin", "yamin");
copy.addConnection("rafik", "bilal");
copy.addConnection("mohemed", "amin");

/////////////breadthFirstSearch
const tree = {
  x: 1,
  y: 1,
  z: {
    x: 1,
    y: 1,
    z: 1
  },
  a: 2
};

function breadthFirstSearch(tree, searchTerm) {
  let que = Object.values(tree);

  while (que.length > 0) {
    let val = que.shift();
    if (val === searchTerm) return true;
    if (typeof val === "object") que = que.concat(Object.values(val));
  }

  return false;
}

console.log(breadthFirstSearch(tree, 2));
