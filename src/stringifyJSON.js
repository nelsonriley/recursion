// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// very in depth exploration of the JSON.stringify() method
// http://freshbrewedcode.com/jimcowart/2013/01/29/what-you-might-not-know-about-json-stringify/

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  var JSON = '';
  
  var recurse = function(obj) {
    if (typeof obj === 'function' || obj === undefined) {
      return undefined;
    }
    else if (obj === null) {
      JSON += 'null';
    }
    else if (typeof obj === 'number' || typeof obj === 'boolean') {
      JSON += obj.toString();
    }
    else if (typeof obj === 'string') {
      JSON += '\"' + obj + '\"';
    }
    else if (Array.isArray(obj)) {
      if (obj.length === 0) {
        JSON += '[]';
      } else {
        JSON += '[';
        _.each(obj, function(item, index) {
          recurse(item);
          JSON += ',';
        });
        JSON = JSON.slice(0,-1);
        JSON += ']';
      }
    } else {
      if (_.isEmpty(obj)) {
        JSON += '{}';
      } else {
        JSON += '{ ';
        _.each(obj, function(val, key) {
          if (typeof val === 'function' || val === undefined) {
            // skip
          } else {
            recurse(key);
            JSON += ':'
            recurse(val);
            JSON += ',';
          }        
        });
        JSON = JSON.slice(0,-1);
        JSON = JSON.replace(' ', '');
        JSON += '}';
      }
    }
  }
  recurse(obj);
  
  return JSON;
};