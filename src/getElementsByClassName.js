// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  var elements = [];
  var body = document.body;

  var dive = function(node) {
    if (node.nodeType === 1 && node.classList.contains(className)) {
      elements.push(node);
    }
    _.each(node.childNodes, function(child) {
      dive(child);
    });
  }
  dive(body);
  
  return elements;
};