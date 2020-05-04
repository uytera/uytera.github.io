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
})({"ui_kit/calendar/js/calendar-main.js":[function(require,module,exports) {
//window.jQuery = window.$ = require('jquery');
//Календарь должен прогреваться, т.е. при загрузке страницы быть открытым, дальше вы можете его закрыть в конце html скриптом!!!!!!!!!!!!!!!!!!!!
var months = {
  0: "Январь",
  1: "Февраль",
  2: "Март",
  3: "Апрель",
  4: "Май",
  5: "Июнь",
  6: "Июль",
  7: "Август",
  8: "Сентябрь",
  9: "Октябрь",
  10: "Ноябрь",
  11: "Декабрь"
};
var pushedElementsCount = 0;
var startElement = document.createElement("div");
var endElement = document.createElement("div");
var pushedElementDate = "";
var startDate = "";
var endDate = "";
var currDate = new Date();

function day_resize() {
  $('.day').height($('.day').width());
  $('.day').css('line-height', $('.day').height() + "px");
}

$(document).ready(function () {
  fill_calendar(currDate);
  add_elements_event();
  document.getElementById('calendar-forward-btn').addEventListener("click", function (e) {
    currDate.setMonth(currDate.getMonth() + 1);
    fill_calendar(currDate);
    add_elements_event();
  });
  document.getElementById('calendar-backward-btn').addEventListener("click", function (e) {
    currDate.setMonth(currDate.getMonth() - 1);
    fill_calendar(currDate);
    add_elements_event();
  });
  document.getElementById('calendar__clean-button').addEventListener("click", function (e) {
    pushedElementsCount = 0;
    CalendarStartDate = startDate = "";
    CalendarEndDate = endDate = "";
    pushedElementDate = "";
    fillDate();
    fill_calendar(currDate);
    add_elements_event();
  });
  document.getElementById('calendar__save-button').addEventListener("click", function (e) {
    CalendarStartDate = startDate;
    CalendarEndDate = endDate;
    fillDate();
    fill_calendar(currDate);
  });
});

function add_elements_event() {
  var massOfDays = document.getElementsByClassName('day');
  var pushed_day = document.createElement("div");
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var item = _step.value;
      item.addEventListener("mouseover", function (e) {
        item.classList.add("mouse-on");
      });
      item.addEventListener("mouseout", function (e) {
        item.classList.remove("pushed-down");
        item.classList.remove("mouse-on");
      });
      item.addEventListener("mouseup", function (e) {
        pushedElementsCount += 1;
        pushed_day.classList.remove("pushed-down");
        item.classList.add("selected-day");
        pushed_day = item;
        pushedElementDate = new Date(pushed_day.getAttribute('data-year'), pushed_day.getAttribute('data-month'), pushed_day.innerHTML);
        if (pushedElementsCount == 1) startElement = pushed_day;else {
          endElement = pushed_day;
        }

        if (pushedElementsCount == 2) {
          startElementDate = new Date(startElement.getAttribute('data-year'), startElement.getAttribute('data-month'), startElement.innerHTML);
          endElementDate = new Date(endElement.getAttribute('data-year'), endElement.getAttribute('data-month'), endElement.innerHTML);

          if (startElementDate < endElementDate) {
            startDate = startElementDate;
            endDate = endElementDate;
          } else {
            startDate = endElementDate;
            endDate = startElementDate;
          }

          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(0, 0, 0, 0);
          fill_days_in_calendar(currDate.getMonth(), currDate.getFullYear());
        }
      });
      item.addEventListener("mousedown", function (e) {
        item.classList.remove("mouse-on");
        pushed_day.classList.remove("pushed-up");
        pushed_day.classList.remove("pushed-down");
        item.classList.add("pushed-down");
        pushed_day = item;
      });
    };

    for (var _iterator = massOfDays[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
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
}

function fill_calendar(date) {
  fill_date_in_calendar(date.getMonth(), date.getFullYear());
  fill_days_in_calendar(date.getMonth(), date.getFullYear());
}

function fill_date_in_calendar(month, year) {
  var string_month = months[month];
  $('.calendar__date').text(string_month + " " + year);
}

function fill_days_in_calendar(month, year) {
  var lastDateOfLastMonth = new Date(new Date(year, month, 1) - 1);
  var lastDateOfCurrMonth = new Date(new Date(year, month + 1, 1) - 1);
  var weekdayOfFirstDayOfMonth = new Date(year, month, 1).getDay() == 0 ? 7 : new Date(year, month, 1).getDay();
  var weekdayOfLastDayOfMonth = lastDateOfCurrMonth.getDay() == 0 ? 7 : lastDateOfCurrMonth.getDay();
  var html = "";
  var startDay = new Date(lastDateOfLastMonth.getFullYear(), lastDateOfLastMonth.getMonth(), lastDateOfLastMonth.getDate() - weekdayOfFirstDayOfMonth + 2);
  var modificator;

  while (startDay < lastDateOfCurrMonth) {
    modificator = "";
    startDay.setHours(0, 0, 0, 0);

    if (pushedElementDate != "" && startDay.getTime() == pushedElementDate.getTime()) {
      modificator = "selected-day";
    }

    if (startDate != "" && endDate != "") {
      if (startDay.getTime() == startDate.getTime()) {
        modificator = "selected-day-in-period start";
      }

      if (startDay.getTime() == endDate.getTime()) {
        modificator = "selected-day-in-period end";
      }
    }

    if (startDate != "" && endDate != "" && startDay.getTime() > startDate.getTime() && startDay.getTime() < endDate.getTime()) {
      modificator = "day-in-period";
    }

    if (startDay.getMonth() != month) html += '<div class="day other-month-day ' + modificator + '" data-year=' + startDay.getFullYear() + ' data-month=' + startDay.getMonth() + '>' + startDay.getDate() + '</div>';else html += '<div class="day curr-month-day ' + modificator + '" data-year=' + startDay.getFullYear() + ' data-month=' + startDay.getMonth() + '>' + startDay.getDate() + '</div>';
    startDay.setDate(startDay.getDate() + 1);
  }

  for (weekdayOfLastDayOfMonth; weekdayOfLastDayOfMonth < 7; weekdayOfLastDayOfMonth++) {
    modificator = "";
    startDay.setHours(0, 0, 0, 0);

    if (pushedElementDate != "" && startDay.getTime() == pushedElementDate.getTime()) {
      modificator = "selected-day";
    }

    if (startDate != "" && endDate != "") {
      if (startDay.getTime() == startDate.getTime()) {
        modificator = "selected-day-in-period start";
      }

      if (startDay.getTime() == endDate.getTime()) {
        modificator = "selected-day-in-period end";
      }
    }

    if (startDate != "" && endDate != "" && startDay.getTime() > startDate.getTime() && startDay.getTime() < endDate.getTime()) {
      modificator = "day-in-period";
    }

    html += '<div class="day other-month-day ' + modificator + '" data-year=' + startDay.getFullYear() + ' data-month=' + startDay.getMonth() + '>' + startDay.getDate() + '</div>';
    startDay.setDate(startDay.getDate() + 1);
  }

  document.getElementsByClassName('calendar__days')[0].innerHTML = html;
  day_resize();
}
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54238" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","ui_kit/calendar/js/calendar-main.js"], null)
//# sourceMappingURL=/calendar-main.9e5953e4.js.map