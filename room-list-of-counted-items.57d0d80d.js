// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"OHPI":[function(require,module,exports) {
//window.jQuery = window.$ = require('jquery');
var mapOfRoomStrings = new Map();
var mapOfRoomConjugations = new Map([["СПАЛЬНИ", ["спальня", "спальни", "спален"]], ["КРОВАТИ", ["кровать", "кровати", "кроватей"]], ["ВАННЫЕ КОМНАТЫ", ["ванная комната", "ванных комнаты", "ванных комнат"]]]);
var roomRootElement;
$(document).ready(function () {
  roomRootElement = document.getElementsByClassName("navigation-bar__room-list")[0];
  fillMapRoom();
  add_elements_event_room();
  document.getElementById("navigation-bar__room-list__clean-button").addEventListener("click", function (e) {
    var massOflistRoomItems = roomRootElement.getElementsByClassName("list-of-counted-items__item");
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = massOflistRoomItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;
        var massOfRoomElements = item.closest(".list-of-counted-items__item").querySelectorAll('*');
        $(massOfRoomElements[2]).text(0);
        mapOfRoomStrings.set(massOfRoomElements[0].innerHTML, $(massOfRoomElements[2]).text());
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    fillTextFieldRoom();
  }); //document.getElementById("list-of-counted-items__save-button").addEventListener()
});

function add_elements_event_room() {
  var massOfRoomButtons = roomRootElement.getElementsByClassName('button');
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    var _loop = function _loop() {
      var item = _step2.value;
      item.addEventListener("mousedown", function (e) {
        item.classList.add("pushed-up");

        if (item.classList.contains("button_minus")) {
          decrementRoom(item);
        }

        if (item.classList.contains("button_plus")) {
          incrementRoom(item);
        }
      });
      item.addEventListener("mouseup", function (e) {
        item.classList.remove("pushed-up");
      });
    };

    for (var _iterator2 = massOfRoomButtons[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function fillMapRoom() {
  var massOfRoomItems = roomRootElement.getElementsByClassName('list-of-counted-items__item');
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = massOfRoomItems[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var key = _step3.value;
      mapOfRoomStrings.set(key.children[0].innerHTML, 0); //alert(mapOfStrings.get(key.children[0].innerHTML));
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }
}

function incrementRoom(item) {
  var massOfRoomItems = item.closest(".list-of-counted-items__item").querySelectorAll('*');
  $(massOfRoomItems[2]).text(Number.parseInt($(massOfRoomItems[2]).text()) + 1);
  mapOfRoomStrings.set(massOfRoomItems[0].innerHTML, $(massOfRoomItems[2]).text());
  fillTextFieldRoom();
}

function decrementRoom(item) {
  var massOfRoomItems = item.closest(".list-of-counted-items__item").querySelectorAll('*');
  var count = Number.parseInt($(massOfRoomItems[2]).text());

  if (count != 0) {
    $(massOfRoomItems[2]).text(count - 1);
  } else {
    $(massOfRoomItems[2]).text(0);
  }

  mapOfRoomStrings.set(massOfRoomItems[0].innerHTML, $(massOfRoomItems[2]).text());
  fillTextFieldRoom();
}

function fillTextFieldRoom() {
  var resultString = "";
  var count = 0;
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = mapOfRoomStrings[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var string = _step4.value;

      if (string[1] != 0) {
        if (resultString.length != 0) {
          resultString += ", ";
        }

        try {
          resultString += string[1] + " " + conjugation(string[1], mapOfRoomConjugations.get(string[0]));
        } catch (e) {
          resultString += string[1] + " " + string[0].toLowerCase();
        }

        count += Number.parseInt(string[1]);
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  if (count != 0) {
    $(".navigation-bar__room-input-field").val(resultString);
  } else {
    $(".navigation-bar__room-input-field").val("");
  }
}

function conjugation(number, txt) {
  var cases = [2, 0, 1, 1, 1, 2];
  return txt[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}
},{}]},{},["OHPI"], null)
//# sourceMappingURL=/room-list-of-counted-items.57d0d80d.js.map