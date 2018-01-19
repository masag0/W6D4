class DOMNodeCollection {
  constructor (elements) {
    this.elements = elements; //array
  }

  html(string) {
    if (arguments.length === 0) return this.elements[0].innerHTML;
    this.elements.forEach ( (el) => {
      el.innerHTML = string;
    });
  }

  empty() {
    this.elements.forEach ( (el) => {
      el.innerHTML = "";
    });
  }

  append(arg) {
    if (typeof arg === 'string' ) {
      this.elements.forEach ( (el) => {
        el.innerHTML = arg;
      });
    } else if (arg instanceof HTMLElement) {
      this.elements.forEach ( (el) => {
        el.innerHTML = arg.outerHTML;
      });
    } else if (arg instanceof DOMNodeCollection) {
      this.elements.forEach (el =>{
        arg.forEach(e =>{
          el.innerHTML += e.outerHTML;
        });
      });
    }
  }

  attr(...args) {
    if (args.length === 1) {
      // for (let i = 0; i < this.elements.length; i++) {
        return this.elements[0].getAttribute(args[0]);
      // }
    } else if (args.length >= 2) {
      for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].setAttribute(args[0], args[1]);
      }
    }
  }

  addClass (classname) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(classname);
    }
  }

  removeClass (classname) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.remove(classname);
    }
  }

  children () {
    // return this.elements[0].childNodes;
    // let result = [];
    // if (this.elements.length === 0) return new DOMNodeCollection([]);
    // // console.log('here');
    // for (let i = 0; i < this.elements.length; i++) {
    //   let children = this.elements[i].children;
    //   console.log(children);
    //   // let obj = new DOMNodeCollection(children);
    //   result = result.concat(Array.from(children));
    //   console.log(result);
    // }
    // // console.log(result.children);
    // return new DOMNodeCollection(result);

    let result = [];
    let childArray = [1];
    let array = this.elements;
    while (childArray.length !== 0) {
      for (let i = 0; i < array.length; i++) {
        childArray = array[i].children;
        if (childArray.length) result = result.concat(childArray);
      }
      array = childArray;
    }
    return new DOMNodeCollection(result);
  }

  parent() {
    let result = [];
    let parent = this.elements[0].parentElement;
    let prev = parent;
    result.push(prev);

    while (parent) {
      parent = prev.parentElement;
      result.push(parent);
      prev = parent;
    }

    return new DOMNodeCollection(result.slice(0,result.length-1));
  }

  find(selector) {
    const children = this.children().elements;
    const result = [];
    for (let i = 0; i < children.length; i++) {
      for (let j = 0; j < children[i].length; j++) {
        if (children[i][j].tagName === selector.toUpperCase()) {
          result.push(children[i][j]);
        }
      }
    }
    return new DOMNodeCollection(result);
  }

  remove() {
    this.elements[0].remove();
    this.empty();
    this.elements = [];
  }

  on(action, callback) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].addEventListener(action, callback);
      this.elements[i].callback = callback;
    }
  }
  
  off (action) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].removeEventListener(action, this.elements[i].callback);
    }
  }

  








  
}

module.exports = DOMNodeCollection;
