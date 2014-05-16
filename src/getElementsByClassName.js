// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  var elements = [];
  var body = document.body;
  var classRegExp = new RegExp(className);
  
  var dive = function(node) {
    var classMatch = node.className.match(classRegExp);
    if (classMatch != null && classMatch[0] === className) {
      elements.push(node);
    }
    
    if (node.hasChildNodes()) {
      _.each(node.childNodes, function(child) {
        // node type 1 means it is an element (not text, attribute, etc)
        if (child.nodeType === 1) { 
          dive(child);
        }
      });
    }
  }
  dive(body);
  
  return elements;
};