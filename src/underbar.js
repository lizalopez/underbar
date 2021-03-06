

(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    return n === undefined ? array[array.length-1] : (n === 0 ? [] : array.slice(-n));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i=0; i<collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var k in collection) {
        iterator(collection[k], k, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(val) {
      if (test(val)) {
        result.push(val);
      }
    })
    return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(val) {
      return !test(val);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    //create object with elements as keys, so that if we come across an element
    //that already exists as a key, we just move on the the  next element
    //after we have a object of uniqe values as keys, we map out the keys into 
    //an array, because map is defined below, I used each and placed map solution in
    //comments
    var uniqueElements = {};
    var uniqueArray = []; //not necessary when using map()
    _.each(array, function(val){
        uniqueElements[val] = 0;
    })
    _.each(uniqueElements, function(val,key){
      uniqueArray.push(Number(key));
    });
    return uniqueArray;
    /*
    instead of the each() function and returned value above, a solution wtih map would be:
    return _.map(uniqueElements, function(val, key) {
      return Number(key);
    });
    */
   
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    _.each(collection, function(val) {
      result.push(iterator(val));
    });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  _.reduce = function(collection, iterator, accumulator) {
    //initially attempted to use the each() callback, but a lack of initialValue
    //argument requires the iterator to skip over the first element in the collection
    //realized previosu solution was only funcitoning correclty for arrays
    //Object.keys() works on both arrays and objects
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    var counter;
    var memo;
    //several ways of testing for accumulator input, including:
    //if (arguments.length < 3) {}
    //if (arguments.length === 2) {}
    //memo = accumulator || collection[0]
    //memo = arguments[2] || collection[0] 
    //I chose this method to specifically test for accumulator (in case a user entered another 
    //arrangment of arguments that were invalid) and to set counter to 1 if accumulator was undefined or null
    if (accumulator === undefined || accumulator === null) {
      counter = 1;   
      memo = collection[Object.keys(collection)[0]];
    } else {
      counter = 0;
      memo = accumulator;
    }
    // = arguments[2] || collection[0];
    while (counter < Object.keys(collection).length) {
      memo = iterator(memo, collection[Object.keys(collection)[counter]]);
      counter ++;
    }
    return memo;
  };


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here
      
    return _.reduce(collection, function(remainsTrue, item) {
      if (iterator == null || iterator == undefined) {
        return true ? _.identity(item) === true : false;
      }
      else {
        if (!remainsTrue) {
          return false;
        } else  {
          return (iterator(item)) ? true : false;
        }
      }
    }, true); 
  };
  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

    //if we use !_.every and test if elements match a truth test, it would return
    //false when all elements are true and none are false, and vice versa
    //if we test if elements don't match a true test (returning true for falsy
    //items and false for truthy items), every() would return return false as soon
    //as it encounters a truthy element, and since we're returning !every(),
    //the function would return as true

    return !_.every(collection, function(value) {
      if (iterator == null || iterator == undefined) {
        iterator = _.identity;
      }
      return !(iterator(value)) ? true : false;
    });

  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    //The arguments object is not an Array. It is similar to an Array, 
    //but does not have any Array properties except length.  
    //However it can be converted to a real Array:
    //var args = Array.prototype.slice.call(arguments);
    var propertiesArr = Array.prototype.slice.call(arguments, 1);
    _.each(propertiesArr, function(properties) {
      _.each(properties, function(value,key) {
        obj[key] = properties[key];
      })
    })
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var propertiesArr = Array.prototype.slice.call(arguments, 1);
    _.each(propertiesArr, function(properties) {
      _.each(properties, function(value, key) {
        if (!(key.toString() in obj)) {
          obj[key] = properties[key];
        }
      })
    })
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    //was attempting to create the memo object in which to store arguments passed 
    // but instead am adding a ['memo'] property to the function being passed, since
    //that information will retain passed new function invocations with different inputs
    //then, upon calling a duplicate, the code will check the function's memo for the 
    //arguments array, and if its found, it will return the values stored in the property
    //from previous invocations. If it's not found, the result of the invocation will be stored
    //under that current property in memo
    return function() {
      var argArray = Array.prototype.slice.call(arguments);
      //if the function does not have an existing memo obj, create one; otherwise, don nothing;
      func.memo = (func.memo || {});
      if (!(argArray in func.memo)) {
        func.memo[argArray] = func.apply(this, argArray);
      }
      return func.memo[argArray];
    };
  };
  
  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var propertiesArr = Array.prototype.slice.call(arguments, 2);
    //call all arguments
      setTimeout(function() {
        return func.apply(this, propertiesArr)
      }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
  //Fisher-Yates (aka Knuth) Shuffle
    var shuffledArr = array.slice(0);

    for (var i = shuffledArr.length-1; i>=0; i--) {
      //use Math.floor to round down, and Math.random() * i, to get numbers 0 through i(not inclusive)
      //store the value of the random indiex in randomIndex
      var randomIndex = Math.floor(Math.random() * i);
      //copy the value currently in the randomly chosen index into itemAtIndex
      var itemAtIndex = shuffledArr[randomIndex];
      //swap the value at the randomly chosen index with the one at current index i
      shuffledArr[randomIndex] = shuffledArr[i];
      //at the moment, the value at current index (shuffledArr[i]) is in both the current
      //index, and in the random index, but we have a copy of the value originally
      //in the random index stored inside itemAtIndex, so we swap the current
      //index's value with itemAtIndex's, which completed the swap between the current
      //eleement and the randomly selected element, and we move on to the next iteration,
      //working our way closer to the beginning of the array until shuffling is complete
      shuffledArr[i] = itemAtIndex;
    }
    return shuffledArr;
  };





  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
 /*
    var flattened = []:
    var array= nestedArr.slice(0);
    var i = 0;
    var flattener = function(array) {
    var current = array[i];
    while (i < array.length) {
    if (!Array.isArray(current)) {
      flattened.push(current);
      array = array.slice(i+1);
      return flattener(array);
    } else {
      current = flattener(current);
    }
    }
      return flattened;
    }
    flattener(array);
  return flattened;*/
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
