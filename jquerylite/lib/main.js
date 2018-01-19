const DOMNodeCollection = require('./dom_node_collection.js');
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
