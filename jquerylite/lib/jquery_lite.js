/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);
  const funcArray = [];
  let ready = false;
  
window.$l = function(selector) {
  let result;
  let array = [];
  
  
  if (selector instanceof Function ){
    if (ready) {
      selector();
    } else {
      funcArray.push(selector);    
    }
  }
  
  if (typeof selector === 'string') {
    result = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(result));
  }
  if (selector instanceof HTMLElement) {
    array.push(selector);
    result = new DOMNodeCollection(array);
  }
  
  
};

window.$l.extend = (...args) =>{
let firstObject = args[0];
for (let i = 1; i < args.length; i++) {
  for (let j = 0 ; j < Object.keys(args[i]); j++) {
    firstObject[Object.keys(args[i])[j]] = args[i][Object.keys(args[i])[j]];
  }
}
return firstObject;
};

document.addEventListener("DOMContentLoaded", event => {
  ready = true;
  while (funcArray.length > 0) {
    let func = funcArray.shift();
    func();
  }
});



let newDiv = window.document.createElement("div");
newDiv.innerHTML = 'hi';
// window.$l('ul').append('<li>something</li>');
window.$l('ul').append(newDiv);
window.$l( () => { 
  console.log("something");
  
  console.log("something else");
});
window.$l( () => { 
  console.log("hi");
  
  console.log("hi again");
});

for(var i=0; i<1000000000; i++)
{} // this synchronous script is going to delay parsing of the DOM. So the DOMContentLoaded event is going to launch later.


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);