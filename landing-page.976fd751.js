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
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"ui_kit/fonts/Material_Icons/material-icons.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./MaterialIcons-Regular.eot":[["MaterialIcons-Regular.40c9c4a3.eot","ui_kit/fonts/Material_Icons/MaterialIcons-Regular.eot"],"ui_kit/fonts/Material_Icons/MaterialIcons-Regular.eot"],"./MaterialIcons-Regular.woff2":[["MaterialIcons-Regular.96fa388b.woff2","ui_kit/fonts/Material_Icons/MaterialIcons-Regular.woff2"],"ui_kit/fonts/Material_Icons/MaterialIcons-Regular.woff2"],"./MaterialIcons-Regular.woff":[["MaterialIcons-Regular.3429dfd3.woff","ui_kit/fonts/Material_Icons/MaterialIcons-Regular.woff"],"ui_kit/fonts/Material_Icons/MaterialIcons-Regular.woff"],"./MaterialIcons-Regular.ttf":[["MaterialIcons-Regular.1df9cb43.ttf","ui_kit/fonts/Material_Icons/MaterialIcons-Regular.ttf"],"ui_kit/fonts/Material_Icons/MaterialIcons-Regular.ttf"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"ui_kit/fonts/montserrat/montserrat.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./montserrat-100-normal.woff2":[["montserrat-100-normal.528e37a6.woff2","ui_kit/fonts/montserrat/montserrat-100-normal.woff2"],"ui_kit/fonts/montserrat/montserrat-100-normal.woff2"],"./montserrat-100-normal.woff":[["montserrat-100-normal.aa6d81e9.woff","ui_kit/fonts/montserrat/montserrat-100-normal.woff"],"ui_kit/fonts/montserrat/montserrat-100-normal.woff"],"./montserrat-100-normal.ttf":[["montserrat-100-normal.9778cfe2.ttf","ui_kit/fonts/montserrat/montserrat-100-normal.ttf"],"ui_kit/fonts/montserrat/montserrat-100-normal.ttf"],"./montserrat-300-normal.woff2":[["montserrat-300-normal.9b3e66cd.woff2","ui_kit/fonts/montserrat/montserrat-300-normal.woff2"],"ui_kit/fonts/montserrat/montserrat-300-normal.woff2"],"./montserrat-300-normal.woff":[["montserrat-300-normal.a556932b.woff","ui_kit/fonts/montserrat/montserrat-300-normal.woff"],"ui_kit/fonts/montserrat/montserrat-300-normal.woff"],"./montserrat-300-normal.ttf":[["montserrat-300-normal.27df2654.ttf","ui_kit/fonts/montserrat/montserrat-300-normal.ttf"],"ui_kit/fonts/montserrat/montserrat-300-normal.ttf"],"./montserrat-400-normal.woff2":[["montserrat-400-normal.c939c284.woff2","ui_kit/fonts/montserrat/montserrat-400-normal.woff2"],"ui_kit/fonts/montserrat/montserrat-400-normal.woff2"],"./montserrat-400-normal.woff":[["montserrat-400-normal.61bfeb48.woff","ui_kit/fonts/montserrat/montserrat-400-normal.woff"],"ui_kit/fonts/montserrat/montserrat-400-normal.woff"],"./montserrat-400-normal.ttf":[["montserrat-400-normal.77702bcf.ttf","ui_kit/fonts/montserrat/montserrat-400-normal.ttf"],"ui_kit/fonts/montserrat/montserrat-400-normal.ttf"],"./montserrat-700-normal.woff2":[["montserrat-700-normal.044a811f.woff2","ui_kit/fonts/montserrat/montserrat-700-normal.woff2"],"ui_kit/fonts/montserrat/montserrat-700-normal.woff2"],"./montserrat-700-normal.woff":[["montserrat-700-normal.dd4cc21d.woff","ui_kit/fonts/montserrat/montserrat-700-normal.woff"],"ui_kit/fonts/montserrat/montserrat-700-normal.woff"],"./montserrat-700-normal.ttf":[["montserrat-700-normal.2775c4d1.ttf","ui_kit/fonts/montserrat/montserrat-700-normal.ttf"],"ui_kit/fonts/montserrat/montserrat-700-normal.ttf"],"./montserrat-900-normal.woff2":[["montserrat-900-normal.a18c7f4a.woff2","ui_kit/fonts/montserrat/montserrat-900-normal.woff2"],"ui_kit/fonts/montserrat/montserrat-900-normal.woff2"],"./montserrat-900-normal.woff":[["montserrat-900-normal.ec3dd98a.woff","ui_kit/fonts/montserrat/montserrat-900-normal.woff"],"ui_kit/fonts/montserrat/montserrat-900-normal.woff"],"./montserrat-900-normal.ttf":[["montserrat-900-normal.9ad3baf3.ttf","ui_kit/fonts/montserrat/montserrat-900-normal.ttf"],"ui_kit/fonts/montserrat/montserrat-900-normal.ttf"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"ui_kit/fonts/openSans/opensans.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./opensanslight.woff2":[["opensanslight.fb75cfb0.woff2","ui_kit/fonts/openSans/opensanslight.woff2"],"ui_kit/fonts/openSans/opensanslight.woff2"],"./opensanslight.woff":[["opensanslight.f01884c5.woff","ui_kit/fonts/openSans/opensanslight.woff"],"ui_kit/fonts/openSans/opensanslight.woff"],"./opensanslight.ttf":[["opensanslight.432a31e1.ttf","ui_kit/fonts/openSans/opensanslight.ttf"],"ui_kit/fonts/openSans/opensanslight.ttf"],"./opensanslightitalic.woff2":[["opensanslightitalic.897c8e7c.woff2","ui_kit/fonts/openSans/opensanslightitalic.woff2"],"ui_kit/fonts/openSans/opensanslightitalic.woff2"],"./opensanslightitalic.woff":[["opensanslightitalic.8ec78c76.woff","ui_kit/fonts/openSans/opensanslightitalic.woff"],"ui_kit/fonts/openSans/opensanslightitalic.woff"],"./opensanslightitalic.ttf":[["opensanslightitalic.e85f68e7.ttf","ui_kit/fonts/openSans/opensanslightitalic.ttf"],"ui_kit/fonts/openSans/opensanslightitalic.ttf"],"./opensans.woff2":[["opensans.dc7d3fed.woff2","ui_kit/fonts/openSans/opensans.woff2"],"ui_kit/fonts/openSans/opensans.woff2"],"./opensans.woff":[["opensans.be5ea09f.woff","ui_kit/fonts/openSans/opensans.woff"],"ui_kit/fonts/openSans/opensans.woff"],"./opensans.ttf":[["opensans.a01bf4e7.ttf","ui_kit/fonts/openSans/opensans.ttf"],"ui_kit/fonts/openSans/opensans.ttf"],"./opensansitalic.woff2":[["opensansitalic.8272c2df.woff2","ui_kit/fonts/openSans/opensansitalic.woff2"],"ui_kit/fonts/openSans/opensansitalic.woff2"],"./opensansitalic.woff":[["opensansitalic.ae48a9a4.woff","ui_kit/fonts/openSans/opensansitalic.woff"],"ui_kit/fonts/openSans/opensansitalic.woff"],"./opensansitalic.ttf":[["opensansitalic.b2f5dc8a.ttf","ui_kit/fonts/openSans/opensansitalic.ttf"],"ui_kit/fonts/openSans/opensansitalic.ttf"],"./opensanssemibold.woff2":[["opensanssemibold.cc7ac8c4.woff2","ui_kit/fonts/openSans/opensanssemibold.woff2"],"ui_kit/fonts/openSans/opensanssemibold.woff2"],"./opensanssemibold.woff":[["opensanssemibold.359c77dd.woff","ui_kit/fonts/openSans/opensanssemibold.woff"],"ui_kit/fonts/openSans/opensanssemibold.woff"],"./opensanssemibold.ttf":[["opensanssemibold.424c4e02.ttf","ui_kit/fonts/openSans/opensanssemibold.ttf"],"ui_kit/fonts/openSans/opensanssemibold.ttf"],"./opensanssemibolditalic.woff2":[["opensanssemibolditalic.7582f75e.woff2","ui_kit/fonts/openSans/opensanssemibolditalic.woff2"],"ui_kit/fonts/openSans/opensanssemibolditalic.woff2"],"./opensanssemibolditalic.woff":[["opensanssemibolditalic.cfca99fb.woff","ui_kit/fonts/openSans/opensanssemibolditalic.woff"],"ui_kit/fonts/openSans/opensanssemibolditalic.woff"],"./opensanssemibolditalic.ttf":[["opensanssemibolditalic.e08cb90c.ttf","ui_kit/fonts/openSans/opensanssemibolditalic.ttf"],"ui_kit/fonts/openSans/opensanssemibolditalic.ttf"],"./opensansbold.woff2":[["opensansbold.458a7ff3.woff2","ui_kit/fonts/openSans/opensansbold.woff2"],"ui_kit/fonts/openSans/opensansbold.woff2"],"./opensansbold.woff":[["opensansbold.4eab38b0.woff","ui_kit/fonts/openSans/opensansbold.woff"],"ui_kit/fonts/openSans/opensansbold.woff"],"./opensansbold.ttf":[["opensansbold.32ea57ad.ttf","ui_kit/fonts/openSans/opensansbold.ttf"],"ui_kit/fonts/openSans/opensansbold.ttf"],"./opensansbolditalic.woff2":[["opensansbolditalic.4aac5a2f.woff2","ui_kit/fonts/openSans/opensansbolditalic.woff2"],"ui_kit/fonts/openSans/opensansbolditalic.woff2"],"./opensansbolditalic.woff":[["opensansbolditalic.063280f9.woff","ui_kit/fonts/openSans/opensansbolditalic.woff"],"ui_kit/fonts/openSans/opensansbolditalic.woff"],"./opensansbolditalic.ttf":[["opensansbolditalic.36a3e146.ttf","ui_kit/fonts/openSans/opensansbolditalic.ttf"],"ui_kit/fonts/openSans/opensansbolditalic.ttf"],"./opensansextrabold.woff2":[["opensansextrabold.eb663802.woff2","ui_kit/fonts/openSans/opensansextrabold.woff2"],"ui_kit/fonts/openSans/opensansextrabold.woff2"],"./opensansextrabold.woff":[["opensansextrabold.738552a6.woff","ui_kit/fonts/openSans/opensansextrabold.woff"],"ui_kit/fonts/openSans/opensansextrabold.woff"],"./opensansextrabold.ttf":[["opensansextrabold.647cb3e1.ttf","ui_kit/fonts/openSans/opensansextrabold.ttf"],"ui_kit/fonts/openSans/opensansextrabold.ttf"],"./opensansextrabolditalic.woff2":[["opensansextrabolditalic.8d751357.woff2","ui_kit/fonts/openSans/opensansextrabolditalic.woff2"],"ui_kit/fonts/openSans/opensansextrabolditalic.woff2"],"./opensansextrabolditalic.woff":[["opensansextrabolditalic.1dff4a22.woff","ui_kit/fonts/openSans/opensansextrabolditalic.woff"],"ui_kit/fonts/openSans/opensansextrabolditalic.woff"],"./opensansextrabolditalic.ttf":[["opensansextrabolditalic.b804895b.ttf","ui_kit/fonts/openSans/opensansextrabolditalic.ttf"],"ui_kit/fonts/openSans/opensansextrabolditalic.ttf"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"landing_page/landing-page.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"../ui_kit/fonts/Material_Icons/material-icons.css":"ui_kit/fonts/Material_Icons/material-icons.css","../ui_kit/fonts/montserrat/montserrat.css":"ui_kit/fonts/montserrat/montserrat.css","../ui_kit/fonts/openSans/opensans.css":"ui_kit/fonts/openSans/opensans.css","./..\\ui_kit\\images\\FoneImage.svg":[["FoneImage.5fc8bdd0.svg","ui_kit/images/FoneImage.svg"],"ui_kit/images/FoneImage.svg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57357" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/landing-page.976fd751.js.map