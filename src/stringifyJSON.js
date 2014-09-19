// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// very in depth exploration of the JSON.stringify() method
// http://freshbrewedcode.com/jimcowart/2013/01/29/what-you-might-not-know-about-json-stringify/

// but you don't so you're going to write it from scratch:

/* story in a few words:
    imagine the JSON object as a tree, the object itself is the root node
    we will do a depth first traversal of each key, value, number, boolen, or string
    we will have rules for each type of object we encounter through the traversal
    and we will build on a string starting from scratch

    neat trick: string has a function .replace('text', 'newText');
*/

var stringifyJSON = function(obj) {
  var JSON = '';
  
  var traverse = function(obj) {
    if (obj === null) {
      JSON += 'null';
    }
    else if (typeof obj === 'number' || typeof obj === 'boolean') {
      JSON += obj.toString();
    }
    else if (typeof obj === 'string') {
      JSON += '\"' + obj + '\"';
    }
    else if (Array.isArray(obj)) {
      JSON += '[ ';
      _.each(obj, function(item) {
        traverse(item);
        JSON += ',';
      });
      JSON = JSON.slice(0,-1);
      JSON = JSON.replace(' ', '');
      JSON += ']';
    } else { // assume obj is a plain object
      JSON += '{ ';
      _.each(obj, function(val, key) {
        if (!(typeof val === 'function' || val === undefined)) {
          traverse(key);
          JSON += ':';
          traverse(val);
          JSON += ',';
        }
      });
      JSON = JSON.slice(0,-1);
      JSON = JSON.replace(' ', '');
      JSON += '}';
    }
  };
  traverse(obj);
  
  return JSON;
};