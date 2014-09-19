// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

/*
Story in a few words:

return an array of nodes in the dom
traverse the entire document with a depth first search
see the code
      
*/

var getElementsByClassName = function(className){
  var elements = [];

  var traverse = function(node) {
    if (node.nodeType === 1 && node.classList.contains(className)) {
      elements.push(node);
    }
    _.each(node.childNodes, function(child) {
      traverse(child);
    });
  };
  traverse(document.body);
  
  return elements;
};