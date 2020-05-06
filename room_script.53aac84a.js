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
})({"ZDet":[function(require,module,exports) {
//window.jQuery = window.$ = require('jquery');
$(document).ready(function () {
  $('[class^=room-]').height($('[class^=room-]').width() / 1.05);
  $(window).resize(function () {
    $('[class^=room-]').height($('[class^=room-]').width() / 1.05);
  });
  $('[class^=room-] .slider__image-container').height($('[class^=room-] .slider__image-container').width() / 1.78);
  $(window).resize(function () {
    $('[class^=room-] .slider__image-container').height($('[class^=room-] .slider__image-container').width() / 1.78);
  });
  $('[class^=room-] .room__description-container').height($('[class^=room-]').height() - $('[class^=room-] .slider__image-container').height());
  $(window).resize(function () {
    $('[class^=room-] .room__description-container').height($('[class^=room-]').height() - $('[class^=room-] .slider__image-container').height());
  });
  var ivs = document.getElementsByTagName("i"); //alert(ivs.length);

  for (var a = 0; a < ivs.length; a++) {
    var i = ivs[a];

    if (0 == i.id.indexOf("slider__right-button")) {
      //alert(i.id)
      i.addEventListener('click', function (e) {
        right_button_click(e.target);
      });
    }

    if (0 == i.id.indexOf("slider__left-button")) {
      //alert(i.id)
      i.addEventListener('click', function (e) {
        left_button_click(e.target);
      });
    }
  }

  var divs = document.getElementsByTagName("div");

  for (var i = 0; i < divs.length; i++) {
    var div = divs[i]; //комнаты

    if (div.classList.length != 0 && 0 == div.classList[0].indexOf("room")) {
      div.addEventListener('click', function (e) {
        rootElem = div.classList[0];
      });
    }

    if (0 == div.id.indexOf("slider__right-area-button")) {
      div.addEventListener('click', function (e) {
        right_button_click(e.target);
      });
    }

    if (0 == div.id.indexOf("slider__left-area-button")) {
      div.addEventListener('click', function (e) {
        left_button_click(e.target);
      });
    }
  }
});

function left_button_click(currElement) {
  rootElem = currElement.parentNode.parentNode;
  var numberOfSlide = Number.parseInt(rootElem.dataset.numberOfSlide);

  if (numberOfSlide != 1) {
    numberOfSlide -= 1;
    $("." + rootElem.classList[0] + ' .slider__image-container :nth-child(' + numberOfSlide + ')').fadeIn();
  }

  $("." + rootElem.classList[0] + ' .slider__legend :nth-child(' + numberOfSlide + ')').css({
    background: "white"
  });

  if (numberOfSlide != 4) {
    $("." + rootElem.classList[0] + ' .slider__legend :nth-child(' + (numberOfSlide + 1) + ')').css({
      background: "none"
    });
  }

  rootElem.dataset.numberOfSlide = numberOfSlide;
}

function right_button_click(currElement) {
  rootElem = currElement.parentNode.parentNode;
  var numberOfSlide = Number.parseInt(rootElem.dataset.numberOfSlide);

  if (numberOfSlide != 4) {
    $("." + rootElem.classList[0] + ' .slider__image-container :nth-child(' + numberOfSlide + ')').fadeOut();
    numberOfSlide += 1;
  }

  $("." + rootElem.classList[0] + ' .slider__legend :nth-child(' + numberOfSlide + ')').css({
    background: "white"
  });

  if (numberOfSlide != 1) {
    $("." + rootElem.classList[0] + ' .slider__legend :nth-child(' + (numberOfSlide - 1) + ')').css({
      background: "none"
    });
  }

  rootElem.dataset.numberOfSlide = numberOfSlide;
}
},{}]},{},["ZDet"], null)
//# sourceMappingURL=/room_script.53aac84a.js.map