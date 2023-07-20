"use strict";
const require$$3 = require("electron");
const path$3 = require("path");
const require$$0 = require("events");
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var check = function(it) {
  return it && it.Math == Math && it;
};
var global$_ = (
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == "object" && self) || check(typeof commonjsGlobal == "object" && commonjsGlobal) || // eslint-disable-next-line no-new-func -- fallback
  function() {
    return this;
  }() || commonjsGlobal || Function("return this")()
);
var objectGetOwnPropertyDescriptor = {};
var fails$1p = function(exec2) {
  try {
    return !!exec2();
  } catch (error) {
    return true;
  }
};
var fails$1o = fails$1p;
var descriptors = !fails$1o(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] != 7;
});
var fails$1n = fails$1p;
var functionBindNative = !fails$1n(function() {
  var test2 = function() {
  }.bind();
  return typeof test2 != "function" || test2.hasOwnProperty("prototype");
});
var NATIVE_BIND$4 = functionBindNative;
var call$F = Function.prototype.call;
var functionCall = NATIVE_BIND$4 ? call$F.bind(call$F) : function() {
  return call$F.apply(call$F, arguments);
};
var objectPropertyIsEnumerable = {};
var $propertyIsEnumerable$2 = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor$a = Object.getOwnPropertyDescriptor;
var NASHORN_BUG = getOwnPropertyDescriptor$a && !$propertyIsEnumerable$2.call({ 1: 2 }, 1);
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$a(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable$2;
var createPropertyDescriptor$c = function(bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value
  };
};
var NATIVE_BIND$3 = functionBindNative;
var FunctionPrototype$4 = Function.prototype;
var call$E = FunctionPrototype$4.call;
var uncurryThisWithBind = NATIVE_BIND$3 && FunctionPrototype$4.bind.bind(call$E, call$E);
var functionUncurryThis = NATIVE_BIND$3 ? uncurryThisWithBind : function(fn) {
  return function() {
    return call$E.apply(fn, arguments);
  };
};
var uncurryThis$1n = functionUncurryThis;
var toString$E = uncurryThis$1n({}.toString);
var stringSlice$i = uncurryThis$1n("".slice);
var classofRaw$2 = function(it) {
  return stringSlice$i(toString$E(it), 8, -1);
};
var uncurryThis$1m = functionUncurryThis;
var fails$1m = fails$1p;
var classof$n = classofRaw$2;
var $Object$5 = Object;
var split$3 = uncurryThis$1m("".split);
var indexedObject = fails$1m(function() {
  return !$Object$5("z").propertyIsEnumerable(0);
}) ? function(it) {
  return classof$n(it) == "String" ? split$3(it, "") : $Object$5(it);
} : $Object$5;
var isNullOrUndefined$e = function(it) {
  return it === null || it === void 0;
};
var isNullOrUndefined$d = isNullOrUndefined$e;
var $TypeError$p = TypeError;
var requireObjectCoercible$l = function(it) {
  if (isNullOrUndefined$d(it))
    throw $TypeError$p("Can't call method on " + it);
  return it;
};
var IndexedObject$5 = indexedObject;
var requireObjectCoercible$k = requireObjectCoercible$l;
var toIndexedObject$j = function(it) {
  return IndexedObject$5(requireObjectCoercible$k(it));
};
var documentAll$2 = typeof document == "object" && document.all;
var IS_HTMLDDA = typeof documentAll$2 == "undefined" && documentAll$2 !== void 0;
var documentAll_1 = {
  all: documentAll$2,
  IS_HTMLDDA
};
var $documentAll$1 = documentAll_1;
var documentAll$1 = $documentAll$1.all;
var isCallable$z = $documentAll$1.IS_HTMLDDA ? function(argument) {
  return typeof argument == "function" || argument === documentAll$1;
} : function(argument) {
  return typeof argument == "function";
};
var isCallable$y = isCallable$z;
var $documentAll = documentAll_1;
var documentAll = $documentAll.all;
var isObject$z = $documentAll.IS_HTMLDDA ? function(it) {
  return typeof it == "object" ? it !== null : isCallable$y(it) || it === documentAll;
} : function(it) {
  return typeof it == "object" ? it !== null : isCallable$y(it);
};
var global$Z = global$_;
var isCallable$x = isCallable$z;
var aFunction = function(argument) {
  return isCallable$x(argument) ? argument : void 0;
};
var getBuiltIn$n = function(namespace, method) {
  return arguments.length < 2 ? aFunction(global$Z[namespace]) : global$Z[namespace] && global$Z[namespace][method];
};
var uncurryThis$1l = functionUncurryThis;
var objectIsPrototypeOf = uncurryThis$1l({}.isPrototypeOf);
var engineUserAgent = typeof navigator != "undefined" && String(navigator.userAgent) || "";
var global$Y = global$_;
var userAgent$6 = engineUserAgent;
var process$5 = global$Y.process;
var Deno$1 = global$Y.Deno;
var versions = process$5 && process$5.versions || Deno$1 && Deno$1.version;
var v8 = versions && versions.v8;
var match, version;
if (v8) {
  match = v8.split(".");
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}
if (!version && userAgent$6) {
  match = userAgent$6.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent$6.match(/Chrome\/(\d+)/);
    if (match)
      version = +match[1];
  }
}
var engineV8Version = version;
var V8_VERSION$3 = engineV8Version;
var fails$1l = fails$1p;
var global$X = global$_;
var $String$8 = global$X.String;
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$1l(function() {
  var symbol = Symbol();
  return !$String$8(symbol) || !(Object(symbol) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && V8_VERSION$3 && V8_VERSION$3 < 41;
});
var NATIVE_SYMBOL$6 = symbolConstructorDetection;
var useSymbolAsUid = NATIVE_SYMBOL$6 && !Symbol.sham && typeof Symbol.iterator == "symbol";
var getBuiltIn$m = getBuiltIn$n;
var isCallable$w = isCallable$z;
var isPrototypeOf$b = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;
var $Object$4 = Object;
var isSymbol$7 = USE_SYMBOL_AS_UID$1 ? function(it) {
  return typeof it == "symbol";
} : function(it) {
  var $Symbol2 = getBuiltIn$m("Symbol");
  return isCallable$w($Symbol2) && isPrototypeOf$b($Symbol2.prototype, $Object$4(it));
};
var $String$7 = String;
var tryToString$7 = function(argument) {
  try {
    return $String$7(argument);
  } catch (error) {
    return "Object";
  }
};
var isCallable$v = isCallable$z;
var tryToString$6 = tryToString$7;
var $TypeError$o = TypeError;
var aCallable$l = function(argument) {
  if (isCallable$v(argument))
    return argument;
  throw $TypeError$o(tryToString$6(argument) + " is not a function");
};
var aCallable$k = aCallable$l;
var isNullOrUndefined$c = isNullOrUndefined$e;
var getMethod$9 = function(V, P) {
  var func = V[P];
  return isNullOrUndefined$c(func) ? void 0 : aCallable$k(func);
};
var call$D = functionCall;
var isCallable$u = isCallable$z;
var isObject$y = isObject$z;
var $TypeError$n = TypeError;
var ordinaryToPrimitive$2 = function(input, pref) {
  var fn, val;
  if (pref === "string" && isCallable$u(fn = input.toString) && !isObject$y(val = call$D(fn, input)))
    return val;
  if (isCallable$u(fn = input.valueOf) && !isObject$y(val = call$D(fn, input)))
    return val;
  if (pref !== "string" && isCallable$u(fn = input.toString) && !isObject$y(val = call$D(fn, input)))
    return val;
  throw $TypeError$n("Can't convert object to primitive value");
};
var shared$7 = { exports: {} };
var isPure = false;
var global$W = global$_;
var defineProperty$e = Object.defineProperty;
var defineGlobalProperty$3 = function(key, value) {
  try {
    defineProperty$e(global$W, key, { value, configurable: true, writable: true });
  } catch (error) {
    global$W[key] = value;
  }
  return value;
};
var global$V = global$_;
var defineGlobalProperty$2 = defineGlobalProperty$3;
var SHARED = "__core-js_shared__";
var store$3 = global$V[SHARED] || defineGlobalProperty$2(SHARED, {});
var sharedStore = store$3;
var store$2 = sharedStore;
(shared$7.exports = function(key, value) {
  return store$2[key] || (store$2[key] = value !== void 0 ? value : {});
})("versions", []).push({
  version: "3.31.1",
  mode: "global",
  copyright: "© 2014-2023 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.31.1/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var sharedExports = shared$7.exports;
var requireObjectCoercible$j = requireObjectCoercible$l;
var $Object$3 = Object;
var toObject$t = function(argument) {
  return $Object$3(requireObjectCoercible$j(argument));
};
var uncurryThis$1k = functionUncurryThis;
var toObject$s = toObject$t;
var hasOwnProperty = uncurryThis$1k({}.hasOwnProperty);
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$s(it), key);
};
var uncurryThis$1j = functionUncurryThis;
var id$2 = 0;
var postfix = Math.random();
var toString$D = uncurryThis$1j(1 .toString);
var uid$6 = function(key) {
  return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString$D(++id$2 + postfix, 36);
};
var global$U = global$_;
var shared$6 = sharedExports;
var hasOwn$w = hasOwnProperty_1;
var uid$5 = uid$6;
var NATIVE_SYMBOL$5 = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;
var Symbol$3 = global$U.Symbol;
var WellKnownSymbolsStore$1 = shared$6("wks");
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$3["for"] || Symbol$3 : Symbol$3 && Symbol$3.withoutSetter || uid$5;
var wellKnownSymbol$z = function(name) {
  if (!hasOwn$w(WellKnownSymbolsStore$1, name)) {
    WellKnownSymbolsStore$1[name] = NATIVE_SYMBOL$5 && hasOwn$w(Symbol$3, name) ? Symbol$3[name] : createWellKnownSymbol("Symbol." + name);
  }
  return WellKnownSymbolsStore$1[name];
};
var call$C = functionCall;
var isObject$x = isObject$z;
var isSymbol$6 = isSymbol$7;
var getMethod$8 = getMethod$9;
var ordinaryToPrimitive$1 = ordinaryToPrimitive$2;
var wellKnownSymbol$y = wellKnownSymbol$z;
var $TypeError$m = TypeError;
var TO_PRIMITIVE$1 = wellKnownSymbol$y("toPrimitive");
var toPrimitive$4 = function(input, pref) {
  if (!isObject$x(input) || isSymbol$6(input))
    return input;
  var exoticToPrim = getMethod$8(input, TO_PRIMITIVE$1);
  var result;
  if (exoticToPrim) {
    if (pref === void 0)
      pref = "default";
    result = call$C(exoticToPrim, input, pref);
    if (!isObject$x(result) || isSymbol$6(result))
      return result;
    throw $TypeError$m("Can't convert object to primitive value");
  }
  if (pref === void 0)
    pref = "number";
  return ordinaryToPrimitive$1(input, pref);
};
var toPrimitive$3 = toPrimitive$4;
var isSymbol$5 = isSymbol$7;
var toPropertyKey$8 = function(argument) {
  var key = toPrimitive$3(argument, "string");
  return isSymbol$5(key) ? key : key + "";
};
var global$T = global$_;
var isObject$w = isObject$z;
var document$3 = global$T.document;
var EXISTS$1 = isObject$w(document$3) && isObject$w(document$3.createElement);
var documentCreateElement$2 = function(it) {
  return EXISTS$1 ? document$3.createElement(it) : {};
};
var DESCRIPTORS$J = descriptors;
var fails$1k = fails$1p;
var createElement$1 = documentCreateElement$2;
var ie8DomDefine = !DESCRIPTORS$J && !fails$1k(function() {
  return Object.defineProperty(createElement$1("div"), "a", {
    get: function() {
      return 7;
    }
  }).a != 7;
});
var DESCRIPTORS$I = descriptors;
var call$B = functionCall;
var propertyIsEnumerableModule$2 = objectPropertyIsEnumerable;
var createPropertyDescriptor$b = createPropertyDescriptor$c;
var toIndexedObject$i = toIndexedObject$j;
var toPropertyKey$7 = toPropertyKey$8;
var hasOwn$v = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;
var $getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$I ? $getOwnPropertyDescriptor$2 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$i(O);
  P = toPropertyKey$7(P);
  if (IE8_DOM_DEFINE$1)
    try {
      return $getOwnPropertyDescriptor$2(O, P);
    } catch (error) {
    }
  if (hasOwn$v(O, P))
    return createPropertyDescriptor$b(!call$B(propertyIsEnumerableModule$2.f, O, P), O[P]);
};
var objectDefineProperty = {};
var DESCRIPTORS$H = descriptors;
var fails$1j = fails$1p;
var v8PrototypeDefineBug = DESCRIPTORS$H && fails$1j(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: false
  }).prototype != 42;
});
var isObject$v = isObject$z;
var $String$6 = String;
var $TypeError$l = TypeError;
var anObject$D = function(argument) {
  if (isObject$v(argument))
    return argument;
  throw $TypeError$l($String$6(argument) + " is not an object");
};
var DESCRIPTORS$G = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$C = anObject$D;
var toPropertyKey$6 = toPropertyKey$8;
var $TypeError$k = TypeError;
var $defineProperty$1 = Object.defineProperty;
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
var ENUMERABLE = "enumerable";
var CONFIGURABLE$1 = "configurable";
var WRITABLE = "writable";
objectDefineProperty.f = DESCRIPTORS$G ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$C(O);
  P = toPropertyKey$6(P);
  anObject$C(Attributes);
  if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor$1(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  }
  return $defineProperty$1(O, P, Attributes);
} : $defineProperty$1 : function defineProperty2(O, P, Attributes) {
  anObject$C(O);
  P = toPropertyKey$6(P);
  anObject$C(Attributes);
  if (IE8_DOM_DEFINE)
    try {
      return $defineProperty$1(O, P, Attributes);
    } catch (error) {
    }
  if ("get" in Attributes || "set" in Attributes)
    throw $TypeError$k("Accessors not supported");
  if ("value" in Attributes)
    O[P] = Attributes.value;
  return O;
};
var DESCRIPTORS$F = descriptors;
var definePropertyModule$b = objectDefineProperty;
var createPropertyDescriptor$a = createPropertyDescriptor$c;
var createNonEnumerableProperty$f = DESCRIPTORS$F ? function(object, key, value) {
  return definePropertyModule$b.f(object, key, createPropertyDescriptor$a(1, value));
} : function(object, key, value) {
  object[key] = value;
  return object;
};
var makeBuiltIn$4 = { exports: {} };
var DESCRIPTORS$E = descriptors;
var hasOwn$u = hasOwnProperty_1;
var FunctionPrototype$3 = Function.prototype;
var getDescriptor = DESCRIPTORS$E && Object.getOwnPropertyDescriptor;
var EXISTS = hasOwn$u(FunctionPrototype$3, "name");
var PROPER = EXISTS && function something() {
}.name === "something";
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$E || DESCRIPTORS$E && getDescriptor(FunctionPrototype$3, "name").configurable);
var functionName = {
  EXISTS,
  PROPER,
  CONFIGURABLE
};
var uncurryThis$1i = functionUncurryThis;
var isCallable$t = isCallable$z;
var store$1 = sharedStore;
var functionToString$1 = uncurryThis$1i(Function.toString);
if (!isCallable$t(store$1.inspectSource)) {
  store$1.inspectSource = function(it) {
    return functionToString$1(it);
  };
}
var inspectSource$3 = store$1.inspectSource;
var global$S = global$_;
var isCallable$s = isCallable$z;
var WeakMap$2 = global$S.WeakMap;
var weakMapBasicDetection = isCallable$s(WeakMap$2) && /native code/.test(String(WeakMap$2));
var shared$5 = sharedExports;
var uid$4 = uid$6;
var keys$2 = shared$5("keys");
var sharedKey$4 = function(key) {
  return keys$2[key] || (keys$2[key] = uid$4(key));
};
var hiddenKeys$6 = {};
var NATIVE_WEAK_MAP$1 = weakMapBasicDetection;
var global$R = global$_;
var isObject$u = isObject$z;
var createNonEnumerableProperty$e = createNonEnumerableProperty$f;
var hasOwn$t = hasOwnProperty_1;
var shared$4 = sharedStore;
var sharedKey$3 = sharedKey$4;
var hiddenKeys$5 = hiddenKeys$6;
var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
var TypeError$8 = global$R.TypeError;
var WeakMap$1 = global$R.WeakMap;
var set$3, get$2, has;
var enforce = function(it) {
  return has(it) ? get$2(it) : set$3(it, {});
};
var getterFor$1 = function(TYPE) {
  return function(it) {
    var state;
    if (!isObject$u(it) || (state = get$2(it)).type !== TYPE) {
      throw TypeError$8("Incompatible receiver, " + TYPE + " required");
    }
    return state;
  };
};
if (NATIVE_WEAK_MAP$1 || shared$4.state) {
  var store = shared$4.state || (shared$4.state = new WeakMap$1());
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  set$3 = function(it, metadata) {
    if (store.has(it))
      throw TypeError$8(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get$2 = function(it) {
    return store.get(it) || {};
  };
  has = function(it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey$3("state");
  hiddenKeys$5[STATE] = true;
  set$3 = function(it, metadata) {
    if (hasOwn$t(it, STATE))
      throw TypeError$8(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$e(it, STATE, metadata);
    return metadata;
  };
  get$2 = function(it) {
    return hasOwn$t(it, STATE) ? it[STATE] : {};
  };
  has = function(it) {
    return hasOwn$t(it, STATE);
  };
}
var internalState = {
  set: set$3,
  get: get$2,
  has,
  enforce,
  getterFor: getterFor$1
};
var uncurryThis$1h = functionUncurryThis;
var fails$1i = fails$1p;
var isCallable$r = isCallable$z;
var hasOwn$s = hasOwnProperty_1;
var DESCRIPTORS$D = descriptors;
var CONFIGURABLE_FUNCTION_NAME$2 = functionName.CONFIGURABLE;
var inspectSource$2 = inspectSource$3;
var InternalStateModule$d = internalState;
var enforceInternalState$4 = InternalStateModule$d.enforce;
var getInternalState$a = InternalStateModule$d.get;
var $String$5 = String;
var defineProperty$d = Object.defineProperty;
var stringSlice$h = uncurryThis$1h("".slice);
var replace$c = uncurryThis$1h("".replace);
var join$8 = uncurryThis$1h([].join);
var CONFIGURABLE_LENGTH = DESCRIPTORS$D && !fails$1i(function() {
  return defineProperty$d(function() {
  }, "length", { value: 8 }).length !== 8;
});
var TEMPLATE = String(String).split("String");
var makeBuiltIn$3 = makeBuiltIn$4.exports = function(value, name, options) {
  if (stringSlice$h($String$5(name), 0, 7) === "Symbol(") {
    name = "[" + replace$c($String$5(name), /^Symbol\(([^)]*)\)/, "$1") + "]";
  }
  if (options && options.getter)
    name = "get " + name;
  if (options && options.setter)
    name = "set " + name;
  if (!hasOwn$s(value, "name") || CONFIGURABLE_FUNCTION_NAME$2 && value.name !== name) {
    if (DESCRIPTORS$D)
      defineProperty$d(value, "name", { value: name, configurable: true });
    else
      value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$s(options, "arity") && value.length !== options.arity) {
    defineProperty$d(value, "length", { value: options.arity });
  }
  try {
    if (options && hasOwn$s(options, "constructor") && options.constructor) {
      if (DESCRIPTORS$D)
        defineProperty$d(value, "prototype", { writable: false });
    } else if (value.prototype)
      value.prototype = void 0;
  } catch (error) {
  }
  var state = enforceInternalState$4(value);
  if (!hasOwn$s(state, "source")) {
    state.source = join$8(TEMPLATE, typeof name == "string" ? name : "");
  }
  return value;
};
Function.prototype.toString = makeBuiltIn$3(function toString() {
  return isCallable$r(this) && getInternalState$a(this).source || inspectSource$2(this);
}, "toString");
var makeBuiltInExports = makeBuiltIn$4.exports;
var isCallable$q = isCallable$z;
var definePropertyModule$a = objectDefineProperty;
var makeBuiltIn$2 = makeBuiltInExports;
var defineGlobalProperty$1 = defineGlobalProperty$3;
var defineBuiltIn$o = function(O, key, value, options) {
  if (!options)
    options = {};
  var simple = options.enumerable;
  var name = options.name !== void 0 ? options.name : key;
  if (isCallable$q(value))
    makeBuiltIn$2(value, name, options);
  if (options.global) {
    if (simple)
      O[key] = value;
    else
      defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe)
        delete O[key];
      else if (O[key])
        simple = true;
    } catch (error) {
    }
    if (simple)
      O[key] = value;
    else
      definePropertyModule$a.f(O, key, {
        value,
        enumerable: false,
        configurable: !options.nonConfigurable,
        writable: !options.nonWritable
      });
  }
  return O;
};
var objectGetOwnPropertyNames = {};
var ceil$1 = Math.ceil;
var floor$a = Math.floor;
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor$a : ceil$1)(n);
};
var trunc$1 = mathTrunc;
var toIntegerOrInfinity$l = function(argument) {
  var number = +argument;
  return number !== number || number === 0 ? 0 : trunc$1(number);
};
var toIntegerOrInfinity$k = toIntegerOrInfinity$l;
var max$7 = Math.max;
var min$a = Math.min;
var toAbsoluteIndex$a = function(index, length) {
  var integer = toIntegerOrInfinity$k(index);
  return integer < 0 ? max$7(integer + length, 0) : min$a(integer, length);
};
var toIntegerOrInfinity$j = toIntegerOrInfinity$l;
var min$9 = Math.min;
var toLength$d = function(argument) {
  return argument > 0 ? min$9(toIntegerOrInfinity$j(argument), 9007199254740991) : 0;
};
var toLength$c = toLength$d;
var lengthOfArrayLike$t = function(obj) {
  return toLength$c(obj.length);
};
var toIndexedObject$h = toIndexedObject$j;
var toAbsoluteIndex$9 = toAbsoluteIndex$a;
var lengthOfArrayLike$s = lengthOfArrayLike$t;
var createMethod$7 = function(IS_INCLUDES) {
  return function($this, el, fromIndex) {
    var O = toIndexedObject$h($this);
    var length = lengthOfArrayLike$s(O);
    var index = toAbsoluteIndex$9(fromIndex, length);
    var value;
    if (IS_INCLUDES && el != el)
      while (length > index) {
        value = O[index++];
        if (value != value)
          return true;
      }
    else
      for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el)
          return IS_INCLUDES || index || 0;
      }
    return !IS_INCLUDES && -1;
  };
};
var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$7(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$7(false)
};
var uncurryThis$1g = functionUncurryThis;
var hasOwn$r = hasOwnProperty_1;
var toIndexedObject$g = toIndexedObject$j;
var indexOf$2 = arrayIncludes.indexOf;
var hiddenKeys$4 = hiddenKeys$6;
var push$f = uncurryThis$1g([].push);
var objectKeysInternal = function(object, names) {
  var O = toIndexedObject$g(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O)
    !hasOwn$r(hiddenKeys$4, key) && hasOwn$r(O, key) && push$f(result, key);
  while (names.length > i)
    if (hasOwn$r(O, key = names[i++])) {
      ~indexOf$2(result, key) || push$f(result, key);
    }
  return result;
};
var enumBugKeys$3 = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
];
var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;
var hiddenKeys$3 = enumBugKeys$2.concat("length", "prototype");
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$3);
};
var objectGetOwnPropertySymbols = {};
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
var getBuiltIn$l = getBuiltIn$n;
var uncurryThis$1f = functionUncurryThis;
var getOwnPropertyNamesModule$2 = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$3 = objectGetOwnPropertySymbols;
var anObject$B = anObject$D;
var concat$3 = uncurryThis$1f([].concat);
var ownKeys$3 = getBuiltIn$l("Reflect", "ownKeys") || function ownKeys(it) {
  var keys5 = getOwnPropertyNamesModule$2.f(anObject$B(it));
  var getOwnPropertySymbols2 = getOwnPropertySymbolsModule$3.f;
  return getOwnPropertySymbols2 ? concat$3(keys5, getOwnPropertySymbols2(it)) : keys5;
};
var hasOwn$q = hasOwnProperty_1;
var ownKeys$2 = ownKeys$3;
var getOwnPropertyDescriptorModule$6 = objectGetOwnPropertyDescriptor;
var definePropertyModule$9 = objectDefineProperty;
var copyConstructorProperties$5 = function(target, source, exceptions) {
  var keys5 = ownKeys$2(source);
  var defineProperty7 = definePropertyModule$9.f;
  var getOwnPropertyDescriptor7 = getOwnPropertyDescriptorModule$6.f;
  for (var i = 0; i < keys5.length; i++) {
    var key = keys5[i];
    if (!hasOwn$q(target, key) && !(exceptions && hasOwn$q(exceptions, key))) {
      defineProperty7(target, key, getOwnPropertyDescriptor7(source, key));
    }
  }
};
var fails$1h = fails$1p;
var isCallable$p = isCallable$z;
var replacement = /#|\.prototype\./;
var isForced$5 = function(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : isCallable$p(detection) ? fails$1h(detection) : !!detection;
};
var normalize = isForced$5.normalize = function(string) {
  return String(string).replace(replacement, ".").toLowerCase();
};
var data = isForced$5.data = {};
var NATIVE = isForced$5.NATIVE = "N";
var POLYFILL = isForced$5.POLYFILL = "P";
var isForced_1 = isForced$5;
var global$Q = global$_;
var getOwnPropertyDescriptor$9 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$d = createNonEnumerableProperty$f;
var defineBuiltIn$n = defineBuiltIn$o;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties$4 = copyConstructorProperties$5;
var isForced$4 = isForced_1;
var _export = function(options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED2, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$Q;
  } else if (STATIC) {
    target = global$Q[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$Q[TARGET] || {}).prototype;
  }
  if (target)
    for (key in source) {
      sourceProperty = source[key];
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor$9(target, key);
        targetProperty = descriptor && descriptor.value;
      } else
        targetProperty = target[key];
      FORCED2 = isForced$4(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
      if (!FORCED2 && targetProperty !== void 0) {
        if (typeof sourceProperty == typeof targetProperty)
          continue;
        copyConstructorProperties$4(sourceProperty, targetProperty);
      }
      if (options.sham || targetProperty && targetProperty.sham) {
        createNonEnumerableProperty$d(sourceProperty, "sham", true);
      }
      defineBuiltIn$n(target, key, sourceProperty, options);
    }
};
var wellKnownSymbol$x = wellKnownSymbol$z;
var TO_STRING_TAG$5 = wellKnownSymbol$x("toStringTag");
var test$2 = {};
test$2[TO_STRING_TAG$5] = "z";
var toStringTagSupport = String(test$2) === "[object z]";
var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var isCallable$o = isCallable$z;
var classofRaw$1 = classofRaw$2;
var wellKnownSymbol$w = wellKnownSymbol$z;
var TO_STRING_TAG$4 = wellKnownSymbol$w("toStringTag");
var $Object$2 = Object;
var CORRECT_ARGUMENTS = classofRaw$1(function() {
  return arguments;
}()) == "Arguments";
var tryGet = function(it, key) {
  try {
    return it[key];
  } catch (error) {
  }
};
var classof$m = TO_STRING_TAG_SUPPORT$2 ? classofRaw$1 : function(it) {
  var O, tag, result;
  return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object$2(it), TO_STRING_TAG$4)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw$1(O) : (result = classofRaw$1(O)) == "Object" && isCallable$o(O.callee) ? "Arguments" : result;
};
var classof$l = classof$m;
var $String$4 = String;
var toString$C = function(argument) {
  if (classof$l(argument) === "Symbol")
    throw TypeError("Cannot convert a Symbol value to a string");
  return $String$4(argument);
};
var objectDefineProperties = {};
var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;
var objectKeys$5 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};
var DESCRIPTORS$C = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$8 = objectDefineProperty;
var anObject$A = anObject$D;
var toIndexedObject$f = toIndexedObject$j;
var objectKeys$4 = objectKeys$5;
objectDefineProperties.f = DESCRIPTORS$C && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$A(O);
  var props = toIndexedObject$f(Properties);
  var keys5 = objectKeys$4(Properties);
  var length = keys5.length;
  var index = 0;
  var key;
  while (length > index)
    definePropertyModule$8.f(O, key = keys5[index++], props[key]);
  return O;
};
var getBuiltIn$k = getBuiltIn$n;
var html$2 = getBuiltIn$k("document", "documentElement");
var anObject$z = anObject$D;
var definePropertiesModule$1 = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys$2 = hiddenKeys$6;
var html$1 = html$2;
var documentCreateElement$1 = documentCreateElement$2;
var sharedKey$2 = sharedKey$4;
var GT = ">";
var LT = "<";
var PROTOTYPE$2 = "prototype";
var SCRIPT = "script";
var IE_PROTO$1 = sharedKey$2("IE_PROTO");
var EmptyConstructor = function() {
};
var scriptTag = function(content) {
  return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
};
var NullProtoObjectViaActiveX = function(activeXDocument2) {
  activeXDocument2.write(scriptTag(""));
  activeXDocument2.close();
  var temp = activeXDocument2.parentWindow.Object;
  activeXDocument2 = null;
  return temp;
};
var NullProtoObjectViaIFrame = function() {
  var iframe = documentCreateElement$1("iframe");
  var JS = "java" + SCRIPT + ":";
  var iframeDocument;
  iframe.style.display = "none";
  html$1.appendChild(iframe);
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag("document.F=Object"));
  iframeDocument.close();
  return iframeDocument.F;
};
var activeXDocument;
var NullProtoObject = function() {
  try {
    activeXDocument = new ActiveXObject("htmlfile");
  } catch (error) {
  }
  NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
  var length = enumBugKeys.length;
  while (length--)
    delete NullProtoObject[PROTOTYPE$2][enumBugKeys[length]];
  return NullProtoObject();
};
hiddenKeys$2[IE_PROTO$1] = true;
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE$2] = anObject$z(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE$2] = null;
    result[IE_PROTO$1] = O;
  } else
    result = NullProtoObject();
  return Properties === void 0 ? result : definePropertiesModule$1.f(result, Properties);
};
var objectGetOwnPropertyNamesExternal = {};
var toPropertyKey$5 = toPropertyKey$8;
var definePropertyModule$7 = objectDefineProperty;
var createPropertyDescriptor$9 = createPropertyDescriptor$c;
var createProperty$9 = function(object, key, value) {
  var propertyKey = toPropertyKey$5(key);
  if (propertyKey in object)
    definePropertyModule$7.f(object, propertyKey, createPropertyDescriptor$9(0, value));
  else
    object[propertyKey] = value;
};
var toAbsoluteIndex$8 = toAbsoluteIndex$a;
var lengthOfArrayLike$r = lengthOfArrayLike$t;
var createProperty$8 = createProperty$9;
var $Array$a = Array;
var max$6 = Math.max;
var arraySliceSimple = function(O, start, end) {
  var length = lengthOfArrayLike$r(O);
  var k = toAbsoluteIndex$8(start, length);
  var fin = toAbsoluteIndex$8(end === void 0 ? length : end, length);
  var result = $Array$a(max$6(fin - k, 0));
  for (var n = 0; k < fin; k++, n++)
    createProperty$8(result, n, O[k]);
  result.length = n;
  return result;
};
var classof$k = classofRaw$2;
var toIndexedObject$e = toIndexedObject$j;
var $getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var arraySlice$b = arraySliceSimple;
var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
var getWindowNames = function(it) {
  try {
    return $getOwnPropertyNames$1(it);
  } catch (error) {
    return arraySlice$b(windowNames);
  }
};
objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames2(it) {
  return windowNames && classof$k(it) == "Window" ? getWindowNames(it) : $getOwnPropertyNames$1(toIndexedObject$e(it));
};
var makeBuiltIn$1 = makeBuiltInExports;
var defineProperty$c = objectDefineProperty;
var defineBuiltInAccessor$h = function(target, name, descriptor) {
  if (descriptor.get)
    makeBuiltIn$1(descriptor.get, name, { getter: true });
  if (descriptor.set)
    makeBuiltIn$1(descriptor.set, name, { setter: true });
  return defineProperty$c.f(target, name, descriptor);
};
var wellKnownSymbolWrapped = {};
var wellKnownSymbol$v = wellKnownSymbol$z;
wellKnownSymbolWrapped.f = wellKnownSymbol$v;
var global$P = global$_;
var path$2 = global$P;
var path$1 = path$2;
var hasOwn$p = hasOwnProperty_1;
var wrappedWellKnownSymbolModule$1 = wellKnownSymbolWrapped;
var defineProperty$b = objectDefineProperty.f;
var wellKnownSymbolDefine = function(NAME2) {
  var Symbol2 = path$1.Symbol || (path$1.Symbol = {});
  if (!hasOwn$p(Symbol2, NAME2))
    defineProperty$b(Symbol2, NAME2, {
      value: wrappedWellKnownSymbolModule$1.f(NAME2)
    });
};
var call$A = functionCall;
var getBuiltIn$j = getBuiltIn$n;
var wellKnownSymbol$u = wellKnownSymbol$z;
var defineBuiltIn$m = defineBuiltIn$o;
var symbolDefineToPrimitive = function() {
  var Symbol2 = getBuiltIn$j("Symbol");
  var SymbolPrototype2 = Symbol2 && Symbol2.prototype;
  var valueOf = SymbolPrototype2 && SymbolPrototype2.valueOf;
  var TO_PRIMITIVE2 = wellKnownSymbol$u("toPrimitive");
  if (SymbolPrototype2 && !SymbolPrototype2[TO_PRIMITIVE2]) {
    defineBuiltIn$m(SymbolPrototype2, TO_PRIMITIVE2, function(hint) {
      return call$A(valueOf, this);
    }, { arity: 1 });
  }
};
var defineProperty$a = objectDefineProperty.f;
var hasOwn$o = hasOwnProperty_1;
var wellKnownSymbol$t = wellKnownSymbol$z;
var TO_STRING_TAG$3 = wellKnownSymbol$t("toStringTag");
var setToStringTag$d = function(target, TAG, STATIC) {
  if (target && !STATIC)
    target = target.prototype;
  if (target && !hasOwn$o(target, TO_STRING_TAG$3)) {
    defineProperty$a(target, TO_STRING_TAG$3, { configurable: true, value: TAG });
  }
};
var classofRaw = classofRaw$2;
var uncurryThis$1e = functionUncurryThis;
var functionUncurryThisClause = function(fn) {
  if (classofRaw(fn) === "Function")
    return uncurryThis$1e(fn);
};
var uncurryThis$1d = functionUncurryThisClause;
var aCallable$j = aCallable$l;
var NATIVE_BIND$2 = functionBindNative;
var bind$e = uncurryThis$1d(uncurryThis$1d.bind);
var functionBindContext = function(fn, that) {
  aCallable$j(fn);
  return that === void 0 ? fn : NATIVE_BIND$2 ? bind$e(fn, that) : function() {
    return fn.apply(that, arguments);
  };
};
var classof$j = classofRaw$2;
var isArray$9 = Array.isArray || function isArray(argument) {
  return classof$j(argument) == "Array";
};
var uncurryThis$1c = functionUncurryThis;
var fails$1g = fails$1p;
var isCallable$n = isCallable$z;
var classof$i = classof$m;
var getBuiltIn$i = getBuiltIn$n;
var inspectSource$1 = inspectSource$3;
var noop = function() {
};
var empty = [];
var construct$1 = getBuiltIn$i("Reflect", "construct");
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$a = uncurryThis$1c(constructorRegExp.exec);
var INCORRECT_TO_STRING$2 = !constructorRegExp.exec(noop);
var isConstructorModern = function isConstructor(argument) {
  if (!isCallable$n(argument))
    return false;
  try {
    construct$1(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};
var isConstructorLegacy = function isConstructor2(argument) {
  if (!isCallable$n(argument))
    return false;
  switch (classof$i(argument)) {
    case "AsyncFunction":
    case "GeneratorFunction":
    case "AsyncGeneratorFunction":
      return false;
  }
  try {
    return INCORRECT_TO_STRING$2 || !!exec$a(constructorRegExp, inspectSource$1(argument));
  } catch (error) {
    return true;
  }
};
isConstructorLegacy.sham = true;
var isConstructor$6 = !construct$1 || fails$1g(function() {
  var called;
  return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function() {
    called = true;
  }) || called;
}) ? isConstructorLegacy : isConstructorModern;
var isArray$8 = isArray$9;
var isConstructor$5 = isConstructor$6;
var isObject$t = isObject$z;
var wellKnownSymbol$s = wellKnownSymbol$z;
var SPECIES$6 = wellKnownSymbol$s("species");
var $Array$9 = Array;
var arraySpeciesConstructor$1 = function(originalArray) {
  var C;
  if (isArray$8(originalArray)) {
    C = originalArray.constructor;
    if (isConstructor$5(C) && (C === $Array$9 || isArray$8(C.prototype)))
      C = void 0;
    else if (isObject$t(C)) {
      C = C[SPECIES$6];
      if (C === null)
        C = void 0;
    }
  }
  return C === void 0 ? $Array$9 : C;
};
var arraySpeciesConstructor = arraySpeciesConstructor$1;
var arraySpeciesCreate$5 = function(originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};
var bind$d = functionBindContext;
var uncurryThis$1b = functionUncurryThis;
var IndexedObject$4 = indexedObject;
var toObject$r = toObject$t;
var lengthOfArrayLike$q = lengthOfArrayLike$t;
var arraySpeciesCreate$4 = arraySpeciesCreate$5;
var push$e = uncurryThis$1b([].push);
var createMethod$6 = function(TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function($this, callbackfn, that, specificCreate) {
    var O = toObject$r($this);
    var self2 = IndexedObject$4(O);
    var boundFunction = bind$d(callbackfn, that);
    var length = lengthOfArrayLike$q(self2);
    var index = 0;
    var create4 = specificCreate || arraySpeciesCreate$4;
    var target = IS_MAP ? create4($this, length) : IS_FILTER || IS_FILTER_REJECT ? create4($this, 0) : void 0;
    var value, result;
    for (; length > index; index++)
      if (NO_HOLES || index in self2) {
        value = self2[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP)
            target[index] = result;
          else if (result)
            switch (TYPE) {
              case 3:
                return true;
              case 5:
                return value;
              case 6:
                return index;
              case 2:
                push$e(target, value);
            }
          else
            switch (TYPE) {
              case 4:
                return false;
              case 7:
                push$e(target, value);
            }
        }
      }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};
var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$6(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$6(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$6(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$6(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$6(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$6(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$6(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod$6(7)
};
var $$2_ = _export;
var global$O = global$_;
var call$z = functionCall;
var uncurryThis$1a = functionUncurryThis;
var DESCRIPTORS$B = descriptors;
var NATIVE_SYMBOL$4 = symbolConstructorDetection;
var fails$1f = fails$1p;
var hasOwn$n = hasOwnProperty_1;
var isPrototypeOf$a = objectIsPrototypeOf;
var anObject$y = anObject$D;
var toIndexedObject$d = toIndexedObject$j;
var toPropertyKey$4 = toPropertyKey$8;
var $toString$3 = toString$C;
var createPropertyDescriptor$8 = createPropertyDescriptor$c;
var nativeObjectCreate = objectCreate;
var objectKeys$3 = objectKeys$5;
var getOwnPropertyNamesModule$1 = objectGetOwnPropertyNames;
var getOwnPropertyNamesExternal = objectGetOwnPropertyNamesExternal;
var getOwnPropertySymbolsModule$2 = objectGetOwnPropertySymbols;
var getOwnPropertyDescriptorModule$5 = objectGetOwnPropertyDescriptor;
var definePropertyModule$6 = objectDefineProperty;
var definePropertiesModule = objectDefineProperties;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var defineBuiltIn$l = defineBuiltIn$o;
var defineBuiltInAccessor$g = defineBuiltInAccessor$h;
var shared$3 = sharedExports;
var sharedKey$1 = sharedKey$4;
var hiddenKeys$1 = hiddenKeys$6;
var uid$3 = uid$6;
var wellKnownSymbol$r = wellKnownSymbol$z;
var wrappedWellKnownSymbolModule = wellKnownSymbolWrapped;
var defineWellKnownSymbol$d = wellKnownSymbolDefine;
var defineSymbolToPrimitive$1 = symbolDefineToPrimitive;
var setToStringTag$c = setToStringTag$d;
var InternalStateModule$c = internalState;
var $forEach$2 = arrayIteration.forEach;
var HIDDEN = sharedKey$1("hidden");
var SYMBOL = "Symbol";
var PROTOTYPE$1 = "prototype";
var setInternalState$b = InternalStateModule$c.set;
var getInternalState$9 = InternalStateModule$c.getterFor(SYMBOL);
var ObjectPrototype$5 = Object[PROTOTYPE$1];
var $Symbol = global$O.Symbol;
var SymbolPrototype$1 = $Symbol && $Symbol[PROTOTYPE$1];
var TypeError$7 = global$O.TypeError;
var QObject = global$O.QObject;
var nativeGetOwnPropertyDescriptor$2 = getOwnPropertyDescriptorModule$5.f;
var nativeDefineProperty$1 = definePropertyModule$6.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule$1.f;
var push$d = uncurryThis$1a([].push);
var AllSymbols = shared$3("symbols");
var ObjectPrototypeSymbols = shared$3("op-symbols");
var WellKnownSymbolsStore = shared$3("wks");
var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;
var setSymbolDescriptor = DESCRIPTORS$B && fails$1f(function() {
  return nativeObjectCreate(nativeDefineProperty$1({}, "a", {
    get: function() {
      return nativeDefineProperty$1(this, "a", { value: 7 }).a;
    }
  })).a != 7;
}) ? function(O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$2(ObjectPrototype$5, P);
  if (ObjectPrototypeDescriptor)
    delete ObjectPrototype$5[P];
  nativeDefineProperty$1(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$5) {
    nativeDefineProperty$1(ObjectPrototype$5, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty$1;
var wrap = function(tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype$1);
  setInternalState$b(symbol, {
    type: SYMBOL,
    tag,
    description
  });
  if (!DESCRIPTORS$B)
    symbol.description = description;
  return symbol;
};
var $defineProperty = function defineProperty3(O, P, Attributes) {
  if (O === ObjectPrototype$5)
    $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject$y(O);
  var key = toPropertyKey$4(P);
  anObject$y(Attributes);
  if (hasOwn$n(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!hasOwn$n(O, HIDDEN))
        nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor$8(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (hasOwn$n(O, HIDDEN) && O[HIDDEN][key])
        O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor$8(0, false) });
    }
    return setSymbolDescriptor(O, key, Attributes);
  }
  return nativeDefineProperty$1(O, key, Attributes);
};
var $defineProperties = function defineProperties2(O, Properties) {
  anObject$y(O);
  var properties = toIndexedObject$d(Properties);
  var keys5 = objectKeys$3(properties).concat($getOwnPropertySymbols(properties));
  $forEach$2(keys5, function(key) {
    if (!DESCRIPTORS$B || call$z($propertyIsEnumerable$1, properties, key))
      $defineProperty(O, key, properties[key]);
  });
  return O;
};
var $create = function create2(O, Properties) {
  return Properties === void 0 ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};
var $propertyIsEnumerable$1 = function propertyIsEnumerable2(V) {
  var P = toPropertyKey$4(V);
  var enumerable = call$z(nativePropertyIsEnumerable, this, P);
  if (this === ObjectPrototype$5 && hasOwn$n(AllSymbols, P) && !hasOwn$n(ObjectPrototypeSymbols, P))
    return false;
  return enumerable || !hasOwn$n(this, P) || !hasOwn$n(AllSymbols, P) || hasOwn$n(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor2(O, P) {
  var it = toIndexedObject$d(O);
  var key = toPropertyKey$4(P);
  if (it === ObjectPrototype$5 && hasOwn$n(AllSymbols, key) && !hasOwn$n(ObjectPrototypeSymbols, key))
    return;
  var descriptor = nativeGetOwnPropertyDescriptor$2(it, key);
  if (descriptor && hasOwn$n(AllSymbols, key) && !(hasOwn$n(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};
var $getOwnPropertyNames = function getOwnPropertyNames3(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject$d(O));
  var result = [];
  $forEach$2(names, function(key) {
    if (!hasOwn$n(AllSymbols, key) && !hasOwn$n(hiddenKeys$1, key))
      push$d(result, key);
  });
  return result;
};
var $getOwnPropertySymbols = function(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$5;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject$d(O));
  var result = [];
  $forEach$2(names, function(key) {
    if (hasOwn$n(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn$n(ObjectPrototype$5, key))) {
      push$d(result, AllSymbols[key]);
    }
  });
  return result;
};
if (!NATIVE_SYMBOL$4) {
  $Symbol = function Symbol2() {
    if (isPrototypeOf$a(SymbolPrototype$1, this))
      throw TypeError$7("Symbol is not a constructor");
    var description = !arguments.length || arguments[0] === void 0 ? void 0 : $toString$3(arguments[0]);
    var tag = uid$3(description);
    var setter = function(value) {
      if (this === ObjectPrototype$5)
        call$z(setter, ObjectPrototypeSymbols, value);
      if (hasOwn$n(this, HIDDEN) && hasOwn$n(this[HIDDEN], tag))
        this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor$8(1, value));
    };
    if (DESCRIPTORS$B && USE_SETTER)
      setSymbolDescriptor(ObjectPrototype$5, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };
  SymbolPrototype$1 = $Symbol[PROTOTYPE$1];
  defineBuiltIn$l(SymbolPrototype$1, "toString", function toString7() {
    return getInternalState$9(this).tag;
  });
  defineBuiltIn$l($Symbol, "withoutSetter", function(description) {
    return wrap(uid$3(description), description);
  });
  propertyIsEnumerableModule$1.f = $propertyIsEnumerable$1;
  definePropertyModule$6.f = $defineProperty;
  definePropertiesModule.f = $defineProperties;
  getOwnPropertyDescriptorModule$5.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule$1.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule$2.f = $getOwnPropertySymbols;
  wrappedWellKnownSymbolModule.f = function(name) {
    return wrap(wellKnownSymbol$r(name), name);
  };
  if (DESCRIPTORS$B) {
    defineBuiltInAccessor$g(SymbolPrototype$1, "description", {
      configurable: true,
      get: function description() {
        return getInternalState$9(this).description;
      }
    });
    {
      defineBuiltIn$l(ObjectPrototype$5, "propertyIsEnumerable", $propertyIsEnumerable$1, { unsafe: true });
    }
  }
}
$$2_({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL$4, sham: !NATIVE_SYMBOL$4 }, {
  Symbol: $Symbol
});
$forEach$2(objectKeys$3(WellKnownSymbolsStore), function(name) {
  defineWellKnownSymbol$d(name);
});
$$2_({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL$4 }, {
  useSetter: function() {
    USE_SETTER = true;
  },
  useSimple: function() {
    USE_SETTER = false;
  }
});
$$2_({ target: "Object", stat: true, forced: !NATIVE_SYMBOL$4, sham: !DESCRIPTORS$B }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});
$$2_({ target: "Object", stat: true, forced: !NATIVE_SYMBOL$4 }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames
});
defineSymbolToPrimitive$1();
setToStringTag$c($Symbol, SYMBOL);
hiddenKeys$1[HIDDEN] = true;
var NATIVE_SYMBOL$3 = symbolConstructorDetection;
var symbolRegistryDetection = NATIVE_SYMBOL$3 && !!Symbol["for"] && !!Symbol.keyFor;
var $$2Z = _export;
var getBuiltIn$h = getBuiltIn$n;
var hasOwn$m = hasOwnProperty_1;
var toString$B = toString$C;
var shared$2 = sharedExports;
var NATIVE_SYMBOL_REGISTRY$1 = symbolRegistryDetection;
var StringToSymbolRegistry = shared$2("string-to-symbol-registry");
var SymbolToStringRegistry$1 = shared$2("symbol-to-string-registry");
$$2Z({ target: "Symbol", stat: true, forced: !NATIVE_SYMBOL_REGISTRY$1 }, {
  "for": function(key) {
    var string = toString$B(key);
    if (hasOwn$m(StringToSymbolRegistry, string))
      return StringToSymbolRegistry[string];
    var symbol = getBuiltIn$h("Symbol")(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry$1[symbol] = string;
    return symbol;
  }
});
var $$2Y = _export;
var hasOwn$l = hasOwnProperty_1;
var isSymbol$4 = isSymbol$7;
var tryToString$5 = tryToString$7;
var shared$1 = sharedExports;
var NATIVE_SYMBOL_REGISTRY = symbolRegistryDetection;
var SymbolToStringRegistry = shared$1("symbol-to-string-registry");
$$2Y({ target: "Symbol", stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
  keyFor: function keyFor(sym) {
    if (!isSymbol$4(sym))
      throw TypeError(tryToString$5(sym) + " is not a symbol");
    if (hasOwn$l(SymbolToStringRegistry, sym))
      return SymbolToStringRegistry[sym];
  }
});
var NATIVE_BIND$1 = functionBindNative;
var FunctionPrototype$2 = Function.prototype;
var apply$b = FunctionPrototype$2.apply;
var call$y = FunctionPrototype$2.call;
var functionApply$1 = typeof Reflect == "object" && Reflect.apply || (NATIVE_BIND$1 ? call$y.bind(apply$b) : function() {
  return call$y.apply(apply$b, arguments);
});
var uncurryThis$19 = functionUncurryThis;
var arraySlice$a = uncurryThis$19([].slice);
var uncurryThis$18 = functionUncurryThis;
var isArray$7 = isArray$9;
var isCallable$m = isCallable$z;
var classof$h = classofRaw$2;
var toString$A = toString$C;
var push$c = uncurryThis$18([].push);
var getJsonReplacerFunction = function(replacer2) {
  if (isCallable$m(replacer2))
    return replacer2;
  if (!isArray$7(replacer2))
    return;
  var rawLength = replacer2.length;
  var keys5 = [];
  for (var i = 0; i < rawLength; i++) {
    var element = replacer2[i];
    if (typeof element == "string")
      push$c(keys5, element);
    else if (typeof element == "number" || classof$h(element) == "Number" || classof$h(element) == "String")
      push$c(keys5, toString$A(element));
  }
  var keysLength = keys5.length;
  var root = true;
  return function(key, value) {
    if (root) {
      root = false;
      return value;
    }
    if (isArray$7(this))
      return value;
    for (var j = 0; j < keysLength; j++)
      if (keys5[j] === key)
        return value;
  };
};
var $$2X = _export;
var getBuiltIn$g = getBuiltIn$n;
var apply$a = functionApply$1;
var call$x = functionCall;
var uncurryThis$17 = functionUncurryThis;
var fails$1e = fails$1p;
var isCallable$l = isCallable$z;
var isSymbol$3 = isSymbol$7;
var arraySlice$9 = arraySlice$a;
var getReplacerFunction = getJsonReplacerFunction;
var NATIVE_SYMBOL$2 = symbolConstructorDetection;
var $String$3 = String;
var $stringify = getBuiltIn$g("JSON", "stringify");
var exec$9 = uncurryThis$17(/./.exec);
var charAt$f = uncurryThis$17("".charAt);
var charCodeAt$7 = uncurryThis$17("".charCodeAt);
var replace$b = uncurryThis$17("".replace);
var numberToString$2 = uncurryThis$17(1 .toString);
var tester = /[\uD800-\uDFFF]/g;
var low = /^[\uD800-\uDBFF]$/;
var hi = /^[\uDC00-\uDFFF]$/;
var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL$2 || fails$1e(function() {
  var symbol = getBuiltIn$g("Symbol")();
  return $stringify([symbol]) != "[null]" || $stringify({ a: symbol }) != "{}" || $stringify(Object(symbol)) != "{}";
});
var ILL_FORMED_UNICODE = fails$1e(function() {
  return $stringify("\uDF06\uD834") !== '"\\udf06\\ud834"' || $stringify("\uDEAD") !== '"\\udead"';
});
var stringifyWithSymbolsFix = function(it, replacer2) {
  var args = arraySlice$9(arguments);
  var $replacer = getReplacerFunction(replacer2);
  if (!isCallable$l($replacer) && (it === void 0 || isSymbol$3(it)))
    return;
  args[1] = function(key, value) {
    if (isCallable$l($replacer))
      value = call$x($replacer, this, $String$3(key), value);
    if (!isSymbol$3(value))
      return value;
  };
  return apply$a($stringify, null, args);
};
var fixIllFormed = function(match2, offset, string) {
  var prev = charAt$f(string, offset - 1);
  var next4 = charAt$f(string, offset + 1);
  if (exec$9(low, match2) && !exec$9(hi, next4) || exec$9(hi, match2) && !exec$9(low, prev)) {
    return "\\u" + numberToString$2(charCodeAt$7(match2, 0), 16);
  }
  return match2;
};
if ($stringify) {
  $$2X({ target: "JSON", stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer2, space) {
      var args = arraySlice$9(arguments);
      var result = apply$a(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args);
      return ILL_FORMED_UNICODE && typeof result == "string" ? replace$b(result, tester, fixIllFormed) : result;
    }
  });
}
var $$2W = _export;
var NATIVE_SYMBOL$1 = symbolConstructorDetection;
var fails$1d = fails$1p;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var toObject$q = toObject$t;
var FORCED$D = !NATIVE_SYMBOL$1 || fails$1d(function() {
  getOwnPropertySymbolsModule$1.f(1);
});
$$2W({ target: "Object", stat: true, forced: FORCED$D }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    var $getOwnPropertySymbols2 = getOwnPropertySymbolsModule$1.f;
    return $getOwnPropertySymbols2 ? $getOwnPropertySymbols2(toObject$q(it)) : [];
  }
});
var $$2V = _export;
var DESCRIPTORS$A = descriptors;
var global$N = global$_;
var uncurryThis$16 = functionUncurryThis;
var hasOwn$k = hasOwnProperty_1;
var isCallable$k = isCallable$z;
var isPrototypeOf$9 = objectIsPrototypeOf;
var toString$z = toString$C;
var defineBuiltInAccessor$f = defineBuiltInAccessor$h;
var copyConstructorProperties$3 = copyConstructorProperties$5;
var NativeSymbol = global$N.Symbol;
var SymbolPrototype = NativeSymbol && NativeSymbol.prototype;
if (DESCRIPTORS$A && isCallable$k(NativeSymbol) && (!("description" in SymbolPrototype) || // Safari 12 bug
NativeSymbol().description !== void 0)) {
  var EmptyStringDescriptionStore = {};
  var SymbolWrapper = function Symbol2() {
    var description = arguments.length < 1 || arguments[0] === void 0 ? void 0 : toString$z(arguments[0]);
    var result = isPrototypeOf$9(SymbolPrototype, this) ? new NativeSymbol(description) : description === void 0 ? NativeSymbol() : NativeSymbol(description);
    if (description === "")
      EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties$3(SymbolWrapper, NativeSymbol);
  SymbolWrapper.prototype = SymbolPrototype;
  SymbolPrototype.constructor = SymbolWrapper;
  var NATIVE_SYMBOL = String(NativeSymbol("test")) == "Symbol(test)";
  var thisSymbolValue = uncurryThis$16(SymbolPrototype.valueOf);
  var symbolDescriptiveString = uncurryThis$16(SymbolPrototype.toString);
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  var replace$a = uncurryThis$16("".replace);
  var stringSlice$g = uncurryThis$16("".slice);
  defineBuiltInAccessor$f(SymbolPrototype, "description", {
    configurable: true,
    get: function description() {
      var symbol = thisSymbolValue(this);
      if (hasOwn$k(EmptyStringDescriptionStore, symbol))
        return "";
      var string = symbolDescriptiveString(symbol);
      var desc = NATIVE_SYMBOL ? stringSlice$g(string, 7, -1) : replace$a(string, regexp, "$1");
      return desc === "" ? void 0 : desc;
    }
  });
  $$2V({ global: true, constructor: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}
var defineWellKnownSymbol$c = wellKnownSymbolDefine;
defineWellKnownSymbol$c("asyncIterator");
var defineWellKnownSymbol$b = wellKnownSymbolDefine;
defineWellKnownSymbol$b("hasInstance");
var defineWellKnownSymbol$a = wellKnownSymbolDefine;
defineWellKnownSymbol$a("isConcatSpreadable");
var defineWellKnownSymbol$9 = wellKnownSymbolDefine;
defineWellKnownSymbol$9("iterator");
var defineWellKnownSymbol$8 = wellKnownSymbolDefine;
defineWellKnownSymbol$8("match");
var defineWellKnownSymbol$7 = wellKnownSymbolDefine;
defineWellKnownSymbol$7("matchAll");
var defineWellKnownSymbol$6 = wellKnownSymbolDefine;
defineWellKnownSymbol$6("replace");
var defineWellKnownSymbol$5 = wellKnownSymbolDefine;
defineWellKnownSymbol$5("search");
var defineWellKnownSymbol$4 = wellKnownSymbolDefine;
defineWellKnownSymbol$4("species");
var defineWellKnownSymbol$3 = wellKnownSymbolDefine;
defineWellKnownSymbol$3("split");
var defineWellKnownSymbol$2 = wellKnownSymbolDefine;
var defineSymbolToPrimitive = symbolDefineToPrimitive;
defineWellKnownSymbol$2("toPrimitive");
defineSymbolToPrimitive();
var getBuiltIn$f = getBuiltIn$n;
var defineWellKnownSymbol$1 = wellKnownSymbolDefine;
var setToStringTag$b = setToStringTag$d;
defineWellKnownSymbol$1("toStringTag");
setToStringTag$b(getBuiltIn$f("Symbol"), "Symbol");
var defineWellKnownSymbol = wellKnownSymbolDefine;
defineWellKnownSymbol("unscopables");
var uncurryThis$15 = functionUncurryThis;
var aCallable$i = aCallable$l;
var functionUncurryThisAccessor = function(object, key, method) {
  try {
    return uncurryThis$15(aCallable$i(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) {
  }
};
var isCallable$j = isCallable$z;
var $String$2 = String;
var $TypeError$j = TypeError;
var aPossiblePrototype$2 = function(argument) {
  if (typeof argument == "object" || isCallable$j(argument))
    return argument;
  throw $TypeError$j("Can't set " + $String$2(argument) + " as a prototype");
};
var uncurryThisAccessor = functionUncurryThisAccessor;
var anObject$x = anObject$D;
var aPossiblePrototype$1 = aPossiblePrototype$2;
var objectSetPrototypeOf$1 = Object.setPrototypeOf || ("__proto__" in {} ? function() {
  var CORRECT_SETTER = false;
  var test2 = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, "__proto__", "set");
    setter(test2, []);
    CORRECT_SETTER = test2 instanceof Array;
  } catch (error) {
  }
  return function setPrototypeOf3(O, proto) {
    anObject$x(O);
    aPossiblePrototype$1(proto);
    if (CORRECT_SETTER)
      setter(O, proto);
    else
      O.__proto__ = proto;
    return O;
  };
}() : void 0);
var defineProperty$9 = objectDefineProperty.f;
var proxyAccessor$2 = function(Target, Source, key) {
  key in Target || defineProperty$9(Target, key, {
    configurable: true,
    get: function() {
      return Source[key];
    },
    set: function(it) {
      Source[key] = it;
    }
  });
};
var isCallable$i = isCallable$z;
var isObject$s = isObject$z;
var setPrototypeOf$9 = objectSetPrototypeOf$1;
var inheritIfRequired$6 = function($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf$9 && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable$i(NewTarget = dummy.constructor) && NewTarget !== Wrapper && isObject$s(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype
  )
    setPrototypeOf$9($this, NewTargetPrototype);
  return $this;
};
var toString$y = toString$C;
var normalizeStringArgument$5 = function(argument, $default) {
  return argument === void 0 ? arguments.length < 2 ? "" : $default : toString$y(argument);
};
var isObject$r = isObject$z;
var createNonEnumerableProperty$c = createNonEnumerableProperty$f;
var installErrorCause$2 = function(O, options) {
  if (isObject$r(options) && "cause" in options) {
    createNonEnumerableProperty$c(O, "cause", options.cause);
  }
};
var uncurryThis$14 = functionUncurryThis;
var $Error$1 = Error;
var replace$9 = uncurryThis$14("".replace);
var TEST = function(arg) {
  return String($Error$1(arg).stack);
}("zxcasd");
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);
var errorStackClear = function(stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == "string" && !$Error$1.prepareStackTrace) {
    while (dropEntries--)
      stack = replace$9(stack, V8_OR_CHAKRA_STACK_ENTRY, "");
  }
  return stack;
};
var fails$1c = fails$1p;
var createPropertyDescriptor$7 = createPropertyDescriptor$c;
var errorStackInstallable = !fails$1c(function() {
  var error = Error("a");
  if (!("stack" in error))
    return true;
  Object.defineProperty(error, "stack", createPropertyDescriptor$7(1, 7));
  return error.stack !== 7;
});
var createNonEnumerableProperty$b = createNonEnumerableProperty$f;
var clearErrorStack$2 = errorStackClear;
var ERROR_STACK_INSTALLABLE$1 = errorStackInstallable;
var captureStackTrace = Error.captureStackTrace;
var errorStackInstall = function(error, C, stack, dropEntries) {
  if (ERROR_STACK_INSTALLABLE$1) {
    if (captureStackTrace)
      captureStackTrace(error, C);
    else
      createNonEnumerableProperty$b(error, "stack", clearErrorStack$2(stack, dropEntries));
  }
};
var getBuiltIn$e = getBuiltIn$n;
var hasOwn$j = hasOwnProperty_1;
var createNonEnumerableProperty$a = createNonEnumerableProperty$f;
var isPrototypeOf$8 = objectIsPrototypeOf;
var setPrototypeOf$8 = objectSetPrototypeOf$1;
var copyConstructorProperties$2 = copyConstructorProperties$5;
var proxyAccessor$1 = proxyAccessor$2;
var inheritIfRequired$5 = inheritIfRequired$6;
var normalizeStringArgument$4 = normalizeStringArgument$5;
var installErrorCause$1 = installErrorCause$2;
var installErrorStack$1 = errorStackInstall;
var DESCRIPTORS$z = descriptors;
var wrapErrorConstructorWithCause$2 = function(FULL_NAME, wrapper2, FORCED2, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = "stackTraceLimit";
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path2 = FULL_NAME.split(".");
  var ERROR_NAME = path2[path2.length - 1];
  var OriginalError = getBuiltIn$e.apply(null, path2);
  if (!OriginalError)
    return;
  var OriginalErrorPrototype = OriginalError.prototype;
  if (hasOwn$j(OriginalErrorPrototype, "cause"))
    delete OriginalErrorPrototype.cause;
  if (!FORCED2)
    return OriginalError;
  var BaseError = getBuiltIn$e("Error");
  var WrappedError = wrapper2(function(a, b) {
    var message = normalizeStringArgument$4(IS_AGGREGATE_ERROR ? b : a, void 0);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== void 0)
      createNonEnumerableProperty$a(result, "message", message);
    installErrorStack$1(result, WrappedError, result.stack, 2);
    if (this && isPrototypeOf$8(OriginalErrorPrototype, this))
      inheritIfRequired$5(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION)
      installErrorCause$1(result, arguments[OPTIONS_POSITION]);
    return result;
  });
  WrappedError.prototype = OriginalErrorPrototype;
  if (ERROR_NAME !== "Error") {
    if (setPrototypeOf$8)
      setPrototypeOf$8(WrappedError, BaseError);
    else
      copyConstructorProperties$2(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS$z && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor$1(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor$1(WrappedError, OriginalError, "prepareStackTrace");
  }
  copyConstructorProperties$2(WrappedError, OriginalError);
  try {
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty$a(OriginalErrorPrototype, "name", ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) {
  }
  return WrappedError;
};
var $$2U = _export;
var global$M = global$_;
var apply$9 = functionApply$1;
var wrapErrorConstructorWithCause$1 = wrapErrorConstructorWithCause$2;
var WEB_ASSEMBLY = "WebAssembly";
var WebAssembly$1 = global$M[WEB_ASSEMBLY];
var FORCED$C = Error("e", { cause: 7 }).cause !== 7;
var exportGlobalErrorCauseWrapper = function(ERROR_NAME, wrapper2) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause$1(ERROR_NAME, wrapper2, FORCED$C);
  $$2U({ global: true, constructor: true, arity: 1, forced: FORCED$C }, O);
};
var exportWebAssemblyErrorCauseWrapper = function(ERROR_NAME, wrapper2) {
  if (WebAssembly$1 && WebAssembly$1[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause$1(WEB_ASSEMBLY + "." + ERROR_NAME, wrapper2, FORCED$C);
    $$2U({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED$C }, O);
  }
};
exportGlobalErrorCauseWrapper("Error", function(init) {
  return function Error2(message) {
    return apply$9(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper("EvalError", function(init) {
  return function EvalError2(message) {
    return apply$9(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper("RangeError", function(init) {
  return function RangeError2(message) {
    return apply$9(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper("ReferenceError", function(init) {
  return function ReferenceError2(message) {
    return apply$9(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper("SyntaxError", function(init) {
  return function SyntaxError2(message) {
    return apply$9(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper("TypeError", function(init) {
  return function TypeError2(message) {
    return apply$9(init, this, arguments);
  };
});
exportGlobalErrorCauseWrapper("URIError", function(init) {
  return function URIError2(message) {
    return apply$9(init, this, arguments);
  };
});
exportWebAssemblyErrorCauseWrapper("CompileError", function(init) {
  return function CompileError2(message) {
    return apply$9(init, this, arguments);
  };
});
exportWebAssemblyErrorCauseWrapper("LinkError", function(init) {
  return function LinkError2(message) {
    return apply$9(init, this, arguments);
  };
});
exportWebAssemblyErrorCauseWrapper("RuntimeError", function(init) {
  return function RuntimeError2(message) {
    return apply$9(init, this, arguments);
  };
});
var DESCRIPTORS$y = descriptors;
var fails$1b = fails$1p;
var anObject$w = anObject$D;
var create$a = objectCreate;
var normalizeStringArgument$3 = normalizeStringArgument$5;
var nativeErrorToString = Error.prototype.toString;
var INCORRECT_TO_STRING$1 = fails$1b(function() {
  if (DESCRIPTORS$y) {
    var object = create$a(Object.defineProperty({}, "name", { get: function() {
      return this === object;
    } }));
    if (nativeErrorToString.call(object) !== "true")
      return true;
  }
  return nativeErrorToString.call({ message: 1, name: 2 }) !== "2: 1" || nativeErrorToString.call({}) !== "Error";
});
var errorToString$2 = INCORRECT_TO_STRING$1 ? function toString2() {
  var O = anObject$w(this);
  var name = normalizeStringArgument$3(O.name, "Error");
  var message = normalizeStringArgument$3(O.message);
  return !name ? message : !message ? name : name + ": " + message;
} : nativeErrorToString;
var defineBuiltIn$k = defineBuiltIn$o;
var errorToString$1 = errorToString$2;
var ErrorPrototype$1 = Error.prototype;
if (ErrorPrototype$1.toString !== errorToString$1) {
  defineBuiltIn$k(ErrorPrototype$1, "toString", errorToString$1);
}
var fails$1a = fails$1p;
var correctPrototypeGetter = !fails$1a(function() {
  function F() {
  }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});
var hasOwn$i = hasOwnProperty_1;
var isCallable$h = isCallable$z;
var toObject$p = toObject$t;
var sharedKey = sharedKey$4;
var CORRECT_PROTOTYPE_GETTER$2 = correctPrototypeGetter;
var IE_PROTO = sharedKey("IE_PROTO");
var $Object$1 = Object;
var ObjectPrototype$4 = $Object$1.prototype;
var objectGetPrototypeOf$2 = CORRECT_PROTOTYPE_GETTER$2 ? $Object$1.getPrototypeOf : function(O) {
  var object = toObject$p(O);
  if (hasOwn$i(object, IE_PROTO))
    return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable$h(constructor) && object instanceof constructor) {
    return constructor.prototype;
  }
  return object instanceof $Object$1 ? ObjectPrototype$4 : null;
};
var iterators = {};
var wellKnownSymbol$q = wellKnownSymbol$z;
var Iterators$4 = iterators;
var ITERATOR$a = wellKnownSymbol$q("iterator");
var ArrayPrototype$1 = Array.prototype;
var isArrayIteratorMethod$3 = function(it) {
  return it !== void 0 && (Iterators$4.Array === it || ArrayPrototype$1[ITERATOR$a] === it);
};
var classof$g = classof$m;
var getMethod$7 = getMethod$9;
var isNullOrUndefined$b = isNullOrUndefined$e;
var Iterators$3 = iterators;
var wellKnownSymbol$p = wellKnownSymbol$z;
var ITERATOR$9 = wellKnownSymbol$p("iterator");
var getIteratorMethod$5 = function(it) {
  if (!isNullOrUndefined$b(it))
    return getMethod$7(it, ITERATOR$9) || getMethod$7(it, "@@iterator") || Iterators$3[classof$g(it)];
};
var call$w = functionCall;
var aCallable$h = aCallable$l;
var anObject$v = anObject$D;
var tryToString$4 = tryToString$7;
var getIteratorMethod$4 = getIteratorMethod$5;
var $TypeError$i = TypeError;
var getIterator$4 = function(argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$4(argument) : usingIterator;
  if (aCallable$h(iteratorMethod))
    return anObject$v(call$w(iteratorMethod, argument));
  throw $TypeError$i(tryToString$4(argument) + " is not iterable");
};
var call$v = functionCall;
var anObject$u = anObject$D;
var getMethod$6 = getMethod$9;
var iteratorClose$2 = function(iterator, kind, value) {
  var innerResult, innerError;
  anObject$u(iterator);
  try {
    innerResult = getMethod$6(iterator, "return");
    if (!innerResult) {
      if (kind === "throw")
        throw value;
      return value;
    }
    innerResult = call$v(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === "throw")
    throw value;
  if (innerError)
    throw innerResult;
  anObject$u(innerResult);
  return value;
};
var bind$c = functionBindContext;
var call$u = functionCall;
var anObject$t = anObject$D;
var tryToString$3 = tryToString$7;
var isArrayIteratorMethod$2 = isArrayIteratorMethod$3;
var lengthOfArrayLike$p = lengthOfArrayLike$t;
var isPrototypeOf$7 = objectIsPrototypeOf;
var getIterator$3 = getIterator$4;
var getIteratorMethod$3 = getIteratorMethod$5;
var iteratorClose$1 = iteratorClose$2;
var $TypeError$h = TypeError;
var Result = function(stopped, result) {
  this.stopped = stopped;
  this.result = result;
};
var ResultPrototype = Result.prototype;
var iterate$a = function(iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind$c(unboundFunction, that);
  var iterator, iterFn, index, length, result, next4, step;
  var stop = function(condition) {
    if (iterator)
      iteratorClose$1(iterator, "normal", condition);
    return new Result(true, condition);
  };
  var callFn = function(value) {
    if (AS_ENTRIES) {
      anObject$t(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    }
    return INTERRUPTED ? fn(value, stop) : fn(value);
  };
  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod$3(iterable);
    if (!iterFn)
      throw $TypeError$h(tryToString$3(iterable) + " is not iterable");
    if (isArrayIteratorMethod$2(iterFn)) {
      for (index = 0, length = lengthOfArrayLike$p(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf$7(ResultPrototype, result))
          return result;
      }
      return new Result(false);
    }
    iterator = getIterator$3(iterable, iterFn);
  }
  next4 = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call$u(next4, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose$1(iterator, "throw", error);
    }
    if (typeof result == "object" && result && isPrototypeOf$7(ResultPrototype, result))
      return result;
  }
  return new Result(false);
};
var $$2T = _export;
var isPrototypeOf$6 = objectIsPrototypeOf;
var getPrototypeOf$a = objectGetPrototypeOf$2;
var setPrototypeOf$7 = objectSetPrototypeOf$1;
var copyConstructorProperties$1 = copyConstructorProperties$5;
var create$9 = objectCreate;
var createNonEnumerableProperty$9 = createNonEnumerableProperty$f;
var createPropertyDescriptor$6 = createPropertyDescriptor$c;
var installErrorCause = installErrorCause$2;
var installErrorStack = errorStackInstall;
var iterate$9 = iterate$a;
var normalizeStringArgument$2 = normalizeStringArgument$5;
var wellKnownSymbol$o = wellKnownSymbol$z;
var TO_STRING_TAG$2 = wellKnownSymbol$o("toStringTag");
var $Error = Error;
var push$b = [].push;
var $AggregateError$1 = function AggregateError(errors, message) {
  var isInstance = isPrototypeOf$6(AggregateErrorPrototype, this);
  var that;
  if (setPrototypeOf$7) {
    that = setPrototypeOf$7($Error(), isInstance ? getPrototypeOf$a(this) : AggregateErrorPrototype);
  } else {
    that = isInstance ? this : create$9(AggregateErrorPrototype);
    createNonEnumerableProperty$9(that, TO_STRING_TAG$2, "Error");
  }
  if (message !== void 0)
    createNonEnumerableProperty$9(that, "message", normalizeStringArgument$2(message));
  installErrorStack(that, $AggregateError$1, that.stack, 1);
  if (arguments.length > 2)
    installErrorCause(that, arguments[2]);
  var errorsArray = [];
  iterate$9(errors, push$b, { that: errorsArray });
  createNonEnumerableProperty$9(that, "errors", errorsArray);
  return that;
};
if (setPrototypeOf$7)
  setPrototypeOf$7($AggregateError$1, $Error);
else
  copyConstructorProperties$1($AggregateError$1, $Error, { name: true });
var AggregateErrorPrototype = $AggregateError$1.prototype = create$9($Error.prototype, {
  constructor: createPropertyDescriptor$6(1, $AggregateError$1),
  message: createPropertyDescriptor$6(1, ""),
  name: createPropertyDescriptor$6(1, "AggregateError")
});
$$2T({ global: true, constructor: true, arity: 2 }, {
  AggregateError: $AggregateError$1
});
var $$2S = _export;
var getBuiltIn$d = getBuiltIn$n;
var apply$8 = functionApply$1;
var fails$19 = fails$1p;
var wrapErrorConstructorWithCause = wrapErrorConstructorWithCause$2;
var AGGREGATE_ERROR = "AggregateError";
var $AggregateError = getBuiltIn$d(AGGREGATE_ERROR);
var FORCED$B = !fails$19(function() {
  return $AggregateError([1]).errors[0] !== 1;
}) && fails$19(function() {
  return $AggregateError([1], AGGREGATE_ERROR, { cause: 7 }).cause !== 7;
});
$$2S({ global: true, constructor: true, arity: 2, forced: FORCED$B }, {
  AggregateError: wrapErrorConstructorWithCause(AGGREGATE_ERROR, function(init) {
    return function AggregateError2(errors, message) {
      return apply$8(init, this, arguments);
    };
  }, FORCED$B, true)
});
var wellKnownSymbol$n = wellKnownSymbol$z;
var create$8 = objectCreate;
var defineProperty$8 = objectDefineProperty.f;
var UNSCOPABLES = wellKnownSymbol$n("unscopables");
var ArrayPrototype = Array.prototype;
if (ArrayPrototype[UNSCOPABLES] == void 0) {
  defineProperty$8(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create$8(null)
  });
}
var addToUnscopables$e = function(key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};
var $$2R = _export;
var toObject$o = toObject$t;
var lengthOfArrayLike$o = lengthOfArrayLike$t;
var toIntegerOrInfinity$i = toIntegerOrInfinity$l;
var addToUnscopables$d = addToUnscopables$e;
$$2R({ target: "Array", proto: true }, {
  at: function at(index) {
    var O = toObject$o(this);
    var len = lengthOfArrayLike$o(O);
    var relativeIndex = toIntegerOrInfinity$i(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return k < 0 || k >= len ? void 0 : O[k];
  }
});
addToUnscopables$d("at");
var $TypeError$g = TypeError;
var MAX_SAFE_INTEGER = 9007199254740991;
var doesNotExceedSafeInteger$6 = function(it) {
  if (it > MAX_SAFE_INTEGER)
    throw $TypeError$g("Maximum allowed index exceeded");
  return it;
};
var fails$18 = fails$1p;
var wellKnownSymbol$m = wellKnownSymbol$z;
var V8_VERSION$2 = engineV8Version;
var SPECIES$5 = wellKnownSymbol$m("species");
var arrayMethodHasSpeciesSupport$5 = function(METHOD_NAME) {
  return V8_VERSION$2 >= 51 || !fails$18(function() {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES$5] = function() {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};
var $$2Q = _export;
var fails$17 = fails$1p;
var isArray$6 = isArray$9;
var isObject$q = isObject$z;
var toObject$n = toObject$t;
var lengthOfArrayLike$n = lengthOfArrayLike$t;
var doesNotExceedSafeInteger$5 = doesNotExceedSafeInteger$6;
var createProperty$7 = createProperty$9;
var arraySpeciesCreate$3 = arraySpeciesCreate$5;
var arrayMethodHasSpeciesSupport$4 = arrayMethodHasSpeciesSupport$5;
var wellKnownSymbol$l = wellKnownSymbol$z;
var V8_VERSION$1 = engineV8Version;
var IS_CONCAT_SPREADABLE = wellKnownSymbol$l("isConcatSpreadable");
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION$1 >= 51 || !fails$17(function() {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var isConcatSpreadable = function(O) {
  if (!isObject$q(O))
    return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== void 0 ? !!spreadable : isArray$6(O);
};
var FORCED$A = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport$4("concat");
$$2Q({ target: "Array", proto: true, arity: 1, forced: FORCED$A }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject$n(this);
    var A = arraySpeciesCreate$3(O, 0);
    var n = 0;
    var i, k, length, len, E2;
    for (i = -1, length = arguments.length; i < length; i++) {
      E2 = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E2)) {
        len = lengthOfArrayLike$n(E2);
        doesNotExceedSafeInteger$5(n + len);
        for (k = 0; k < len; k++, n++)
          if (k in E2)
            createProperty$7(A, n, E2[k]);
      } else {
        doesNotExceedSafeInteger$5(n + 1);
        createProperty$7(A, n++, E2);
      }
    }
    A.length = n;
    return A;
  }
});
var tryToString$2 = tryToString$7;
var $TypeError$f = TypeError;
var deletePropertyOrThrow$4 = function(O, P) {
  if (!delete O[P])
    throw $TypeError$f("Cannot delete property " + tryToString$2(P) + " of " + tryToString$2(O));
};
var toObject$m = toObject$t;
var toAbsoluteIndex$7 = toAbsoluteIndex$a;
var lengthOfArrayLike$m = lengthOfArrayLike$t;
var deletePropertyOrThrow$3 = deletePropertyOrThrow$4;
var min$8 = Math.min;
var arrayCopyWithin = [].copyWithin || function copyWithin(target, start) {
  var O = toObject$m(this);
  var len = lengthOfArrayLike$m(O);
  var to = toAbsoluteIndex$7(target, len);
  var from4 = toAbsoluteIndex$7(start, len);
  var end = arguments.length > 2 ? arguments[2] : void 0;
  var count = min$8((end === void 0 ? len : toAbsoluteIndex$7(end, len)) - from4, len - to);
  var inc = 1;
  if (from4 < to && to < from4 + count) {
    inc = -1;
    from4 += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from4 in O)
      O[to] = O[from4];
    else
      deletePropertyOrThrow$3(O, to);
    to += inc;
    from4 += inc;
  }
  return O;
};
var $$2P = _export;
var copyWithin2 = arrayCopyWithin;
var addToUnscopables$c = addToUnscopables$e;
$$2P({ target: "Array", proto: true }, {
  copyWithin: copyWithin2
});
addToUnscopables$c("copyWithin");
var fails$16 = fails$1p;
var arrayMethodIsStrict$9 = function(METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$16(function() {
    method.call(null, argument || function() {
      return 1;
    }, 1);
  });
};
var $$2O = _export;
var $every$1 = arrayIteration.every;
var arrayMethodIsStrict$8 = arrayMethodIsStrict$9;
var STRICT_METHOD$4 = arrayMethodIsStrict$8("every");
$$2O({ target: "Array", proto: true, forced: !STRICT_METHOD$4 }, {
  every: function every(callbackfn) {
    return $every$1(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var toObject$l = toObject$t;
var toAbsoluteIndex$6 = toAbsoluteIndex$a;
var lengthOfArrayLike$l = lengthOfArrayLike$t;
var arrayFill$1 = function fill(value) {
  var O = toObject$l(this);
  var length = lengthOfArrayLike$l(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex$6(argumentsLength > 1 ? arguments[1] : void 0, length);
  var end = argumentsLength > 2 ? arguments[2] : void 0;
  var endPos = end === void 0 ? length : toAbsoluteIndex$6(end, length);
  while (endPos > index)
    O[index++] = value;
  return O;
};
var $$2N = _export;
var fill$1 = arrayFill$1;
var addToUnscopables$b = addToUnscopables$e;
$$2N({ target: "Array", proto: true }, {
  fill: fill$1
});
addToUnscopables$b("fill");
var $$2M = _export;
var $filter$1 = arrayIteration.filter;
var arrayMethodHasSpeciesSupport$3 = arrayMethodHasSpeciesSupport$5;
var HAS_SPECIES_SUPPORT$3 = arrayMethodHasSpeciesSupport$3("filter");
$$2M({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT$3 }, {
  filter: function filter(callbackfn) {
    return $filter$1(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var $$2L = _export;
var $find$1 = arrayIteration.find;
var addToUnscopables$a = addToUnscopables$e;
var FIND = "find";
var SKIPS_HOLES$1 = true;
if (FIND in [])
  Array(1)[FIND](function() {
    SKIPS_HOLES$1 = false;
  });
$$2L({ target: "Array", proto: true, forced: SKIPS_HOLES$1 }, {
  find: function find(callbackfn) {
    return $find$1(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  }
});
addToUnscopables$a(FIND);
var $$2K = _export;
var $findIndex$1 = arrayIteration.findIndex;
var addToUnscopables$9 = addToUnscopables$e;
var FIND_INDEX = "findIndex";
var SKIPS_HOLES = true;
if (FIND_INDEX in [])
  Array(1)[FIND_INDEX](function() {
    SKIPS_HOLES = false;
  });
$$2K({ target: "Array", proto: true, forced: SKIPS_HOLES }, {
  findIndex: function findIndex(callbackfn) {
    return $findIndex$1(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  }
});
addToUnscopables$9(FIND_INDEX);
var bind$b = functionBindContext;
var IndexedObject$3 = indexedObject;
var toObject$k = toObject$t;
var lengthOfArrayLike$k = lengthOfArrayLike$t;
var createMethod$5 = function(TYPE) {
  var IS_FIND_LAST_INDEX = TYPE == 1;
  return function($this, callbackfn, that) {
    var O = toObject$k($this);
    var self2 = IndexedObject$3(O);
    var boundFunction = bind$b(callbackfn, that);
    var index = lengthOfArrayLike$k(self2);
    var value, result;
    while (index-- > 0) {
      value = self2[index];
      result = boundFunction(value, index, O);
      if (result)
        switch (TYPE) {
          case 0:
            return value;
          case 1:
            return index;
        }
    }
    return IS_FIND_LAST_INDEX ? -1 : void 0;
  };
};
var arrayIterationFromLast = {
  // `Array.prototype.findLast` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLast: createMethod$5(0),
  // `Array.prototype.findLastIndex` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLastIndex: createMethod$5(1)
};
var $$2J = _export;
var $findLast$1 = arrayIterationFromLast.findLast;
var addToUnscopables$8 = addToUnscopables$e;
$$2J({ target: "Array", proto: true }, {
  findLast: function findLast(callbackfn) {
    return $findLast$1(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  }
});
addToUnscopables$8("findLast");
var $$2I = _export;
var $findLastIndex$1 = arrayIterationFromLast.findLastIndex;
var addToUnscopables$7 = addToUnscopables$e;
$$2I({ target: "Array", proto: true }, {
  findLastIndex: function findLastIndex(callbackfn) {
    return $findLastIndex$1(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  }
});
addToUnscopables$7("findLastIndex");
var isArray$5 = isArray$9;
var lengthOfArrayLike$j = lengthOfArrayLike$t;
var doesNotExceedSafeInteger$4 = doesNotExceedSafeInteger$6;
var bind$a = functionBindContext;
var flattenIntoArray$2 = function(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind$a(mapper, thisArg) : false;
  var element, elementLen;
  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];
      if (depth > 0 && isArray$5(element)) {
        elementLen = lengthOfArrayLike$j(element);
        targetIndex = flattenIntoArray$2(target, original, element, elementLen, targetIndex, depth - 1) - 1;
      } else {
        doesNotExceedSafeInteger$4(targetIndex + 1);
        target[targetIndex] = element;
      }
      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
};
var flattenIntoArray_1 = flattenIntoArray$2;
var $$2H = _export;
var flattenIntoArray$1 = flattenIntoArray_1;
var toObject$j = toObject$t;
var lengthOfArrayLike$i = lengthOfArrayLike$t;
var toIntegerOrInfinity$h = toIntegerOrInfinity$l;
var arraySpeciesCreate$2 = arraySpeciesCreate$5;
$$2H({ target: "Array", proto: true }, {
  flat: function flat() {
    var depthArg = arguments.length ? arguments[0] : void 0;
    var O = toObject$j(this);
    var sourceLen = lengthOfArrayLike$i(O);
    var A = arraySpeciesCreate$2(O, 0);
    A.length = flattenIntoArray$1(A, O, O, sourceLen, 0, depthArg === void 0 ? 1 : toIntegerOrInfinity$h(depthArg));
    return A;
  }
});
var $$2G = _export;
var flattenIntoArray = flattenIntoArray_1;
var aCallable$g = aCallable$l;
var toObject$i = toObject$t;
var lengthOfArrayLike$h = lengthOfArrayLike$t;
var arraySpeciesCreate$1 = arraySpeciesCreate$5;
$$2G({ target: "Array", proto: true }, {
  flatMap: function flatMap(callbackfn) {
    var O = toObject$i(this);
    var sourceLen = lengthOfArrayLike$h(O);
    var A;
    aCallable$g(callbackfn);
    A = arraySpeciesCreate$1(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
    return A;
  }
});
var $forEach$1 = arrayIteration.forEach;
var arrayMethodIsStrict$7 = arrayMethodIsStrict$9;
var STRICT_METHOD$3 = arrayMethodIsStrict$7("forEach");
var arrayForEach = !STRICT_METHOD$3 ? function forEach(callbackfn) {
  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
} : [].forEach;
var $$2F = _export;
var forEach$4 = arrayForEach;
$$2F({ target: "Array", proto: true, forced: [].forEach != forEach$4 }, {
  forEach: forEach$4
});
var anObject$s = anObject$D;
var iteratorClose = iteratorClose$2;
var callWithSafeIterationClosing$1 = function(iterator, fn, value, ENTRIES2) {
  try {
    return ENTRIES2 ? fn(anObject$s(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, "throw", error);
  }
};
var bind$9 = functionBindContext;
var call$t = functionCall;
var toObject$h = toObject$t;
var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
var isArrayIteratorMethod$1 = isArrayIteratorMethod$3;
var isConstructor$4 = isConstructor$6;
var lengthOfArrayLike$g = lengthOfArrayLike$t;
var createProperty$6 = createProperty$9;
var getIterator$2 = getIterator$4;
var getIteratorMethod$2 = getIteratorMethod$5;
var $Array$8 = Array;
var arrayFrom$1 = function from(arrayLike) {
  var O = toObject$h(arrayLike);
  var IS_CONSTRUCTOR = isConstructor$4(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : void 0;
  var mapping = mapfn !== void 0;
  if (mapping)
    mapfn = bind$9(mapfn, argumentsLength > 2 ? arguments[2] : void 0);
  var iteratorMethod = getIteratorMethod$2(O);
  var index = 0;
  var length, result, step, iterator, next4, value;
  if (iteratorMethod && !(this === $Array$8 && isArrayIteratorMethod$1(iteratorMethod))) {
    iterator = getIterator$2(O, iteratorMethod);
    next4 = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (; !(step = call$t(next4, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty$6(result, index, value);
    }
  } else {
    length = lengthOfArrayLike$g(O);
    result = IS_CONSTRUCTOR ? new this(length) : $Array$8(length);
    for (; length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty$6(result, index, value);
    }
  }
  result.length = index;
  return result;
};
var wellKnownSymbol$k = wellKnownSymbol$z;
var ITERATOR$8 = wellKnownSymbol$k("iterator");
var SAFE_CLOSING = false;
try {
  var called = 0;
  var iteratorWithReturn = {
    next: function() {
      return { done: !!called++ };
    },
    "return": function() {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$8] = function() {
    return this;
  };
  Array.from(iteratorWithReturn, function() {
    throw 2;
  });
} catch (error) {
}
var checkCorrectnessOfIteration$4 = function(exec2, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING)
    return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$8] = function() {
      return {
        next: function() {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec2(object);
  } catch (error) {
  }
  return ITERATION_SUPPORT;
};
var $$2E = _export;
var from2 = arrayFrom$1;
var checkCorrectnessOfIteration$3 = checkCorrectnessOfIteration$4;
var INCORRECT_ITERATION = !checkCorrectnessOfIteration$3(function(iterable) {
  Array.from(iterable);
});
$$2E({ target: "Array", stat: true, forced: INCORRECT_ITERATION }, {
  from: from2
});
var $$2D = _export;
var $includes$1 = arrayIncludes.includes;
var fails$15 = fails$1p;
var addToUnscopables$6 = addToUnscopables$e;
var BROKEN_ON_SPARSE = fails$15(function() {
  return !Array(1).includes();
});
$$2D({ target: "Array", proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el) {
    return $includes$1(this, el, arguments.length > 1 ? arguments[1] : void 0);
  }
});
addToUnscopables$6("includes");
var $$2C = _export;
var uncurryThis$13 = functionUncurryThisClause;
var $indexOf$1 = arrayIncludes.indexOf;
var arrayMethodIsStrict$6 = arrayMethodIsStrict$9;
var nativeIndexOf = uncurryThis$13([].indexOf);
var NEGATIVE_ZERO$1 = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
var FORCED$z = NEGATIVE_ZERO$1 || !arrayMethodIsStrict$6("indexOf");
$$2C({ target: "Array", proto: true, forced: FORCED$z }, {
  indexOf: function indexOf(searchElement) {
    var fromIndex = arguments.length > 1 ? arguments[1] : void 0;
    return NEGATIVE_ZERO$1 ? nativeIndexOf(this, searchElement, fromIndex) || 0 : $indexOf$1(this, searchElement, fromIndex);
  }
});
var $$2B = _export;
var isArray$4 = isArray$9;
$$2B({ target: "Array", stat: true }, {
  isArray: isArray$4
});
var fails$14 = fails$1p;
var isCallable$g = isCallable$z;
var isObject$p = isObject$z;
var getPrototypeOf$9 = objectGetPrototypeOf$2;
var defineBuiltIn$j = defineBuiltIn$o;
var wellKnownSymbol$j = wellKnownSymbol$z;
var ITERATOR$7 = wellKnownSymbol$j("iterator");
var BUGGY_SAFARI_ITERATORS$1 = false;
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;
if ([].keys) {
  arrayIterator = [].keys();
  if (!("next" in arrayIterator))
    BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$9(getPrototypeOf$9(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
      IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}
var NEW_ITERATOR_PROTOTYPE = !isObject$p(IteratorPrototype$2) || fails$14(function() {
  var test2 = {};
  return IteratorPrototype$2[ITERATOR$7].call(test2) !== test2;
});
if (NEW_ITERATOR_PROTOTYPE)
  IteratorPrototype$2 = {};
if (!isCallable$g(IteratorPrototype$2[ITERATOR$7])) {
  defineBuiltIn$j(IteratorPrototype$2, ITERATOR$7, function() {
    return this;
  });
}
var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};
var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create$7 = objectCreate;
var createPropertyDescriptor$5 = createPropertyDescriptor$c;
var setToStringTag$a = setToStringTag$d;
var Iterators$2 = iterators;
var returnThis$1 = function() {
  return this;
};
var iteratorCreateConstructor = function(IteratorConstructor, NAME2, next4, ENUMERABLE_NEXT) {
  var TO_STRING_TAG2 = NAME2 + " Iterator";
  IteratorConstructor.prototype = create$7(IteratorPrototype$1, { next: createPropertyDescriptor$5(+!ENUMERABLE_NEXT, next4) });
  setToStringTag$a(IteratorConstructor, TO_STRING_TAG2, false);
  Iterators$2[TO_STRING_TAG2] = returnThis$1;
  return IteratorConstructor;
};
var $$2A = _export;
var call$s = functionCall;
var FunctionName$1 = functionName;
var isCallable$f = isCallable$z;
var createIteratorConstructor$2 = iteratorCreateConstructor;
var getPrototypeOf$8 = objectGetPrototypeOf$2;
var setPrototypeOf$6 = objectSetPrototypeOf$1;
var setToStringTag$9 = setToStringTag$d;
var createNonEnumerableProperty$8 = createNonEnumerableProperty$f;
var defineBuiltIn$i = defineBuiltIn$o;
var wellKnownSymbol$i = wellKnownSymbol$z;
var Iterators$1 = iterators;
var IteratorsCore = iteratorsCore;
var PROPER_FUNCTION_NAME$3 = FunctionName$1.PROPER;
var CONFIGURABLE_FUNCTION_NAME$1 = FunctionName$1.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$6 = wellKnownSymbol$i("iterator");
var KEYS = "keys";
var VALUES = "values";
var ENTRIES = "entries";
var returnThis = function() {
  return this;
};
var iteratorDefine = function(Iterable, NAME2, IteratorConstructor, next4, DEFAULT, IS_SET, FORCED2) {
  createIteratorConstructor$2(IteratorConstructor, NAME2, next4);
  var getIterationMethod = function(KIND) {
    if (KIND === DEFAULT && defaultIterator)
      return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
      return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS:
        return function keys5() {
          return new IteratorConstructor(this, KIND);
        };
      case VALUES:
        return function values5() {
          return new IteratorConstructor(this, KIND);
        };
      case ENTRIES:
        return function entries4() {
          return new IteratorConstructor(this, KIND);
        };
    }
    return function() {
      return new IteratorConstructor(this);
    };
  };
  var TO_STRING_TAG2 = NAME2 + " Iterator";
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$6] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME2 == "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf$8(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (getPrototypeOf$8(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf$6) {
          setPrototypeOf$6(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable$f(CurrentIteratorPrototype[ITERATOR$6])) {
          defineBuiltIn$i(CurrentIteratorPrototype, ITERATOR$6, returnThis);
        }
      }
      setToStringTag$9(CurrentIteratorPrototype, TO_STRING_TAG2, true);
    }
  }
  if (PROPER_FUNCTION_NAME$3 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (CONFIGURABLE_FUNCTION_NAME$1) {
      createNonEnumerableProperty$8(IterablePrototype, "name", VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values5() {
        return call$s(nativeIterator, this);
      };
    }
  }
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED2)
      for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          defineBuiltIn$i(IterablePrototype, KEY, methods[KEY]);
        }
      }
    else
      $$2A({ target: NAME2, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }
  if (IterablePrototype[ITERATOR$6] !== defaultIterator) {
    defineBuiltIn$i(IterablePrototype, ITERATOR$6, defaultIterator, { name: DEFAULT });
  }
  Iterators$1[NAME2] = defaultIterator;
  return methods;
};
var createIterResultObject$4 = function(value, done) {
  return { value, done };
};
var toIndexedObject$c = toIndexedObject$j;
var addToUnscopables$5 = addToUnscopables$e;
var Iterators = iterators;
var InternalStateModule$b = internalState;
var defineProperty$7 = objectDefineProperty.f;
var defineIterator$2 = iteratorDefine;
var createIterResultObject$3 = createIterResultObject$4;
var DESCRIPTORS$x = descriptors;
var ARRAY_ITERATOR = "Array Iterator";
var setInternalState$a = InternalStateModule$b.set;
var getInternalState$8 = InternalStateModule$b.getterFor(ARRAY_ITERATOR);
var es_array_iterator = defineIterator$2(Array, "Array", function(iterated, kind) {
  setInternalState$a(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject$c(iterated),
    // target
    index: 0,
    // next index
    kind
    // kind
  });
}, function() {
  var state = getInternalState$8(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = void 0;
    return createIterResultObject$3(void 0, true);
  }
  if (kind == "keys")
    return createIterResultObject$3(index, false);
  if (kind == "values")
    return createIterResultObject$3(target[index], false);
  return createIterResultObject$3([index, target[index]], false);
}, "values");
var values = Iterators.Arguments = Iterators.Array;
addToUnscopables$5("keys");
addToUnscopables$5("values");
addToUnscopables$5("entries");
if (DESCRIPTORS$x && values.name !== "values")
  try {
    defineProperty$7(values, "name", { value: "values" });
  } catch (error) {
  }
var $$2z = _export;
var uncurryThis$12 = functionUncurryThis;
var IndexedObject$2 = indexedObject;
var toIndexedObject$b = toIndexedObject$j;
var arrayMethodIsStrict$5 = arrayMethodIsStrict$9;
var nativeJoin = uncurryThis$12([].join);
var ES3_STRINGS = IndexedObject$2 != Object;
var FORCED$y = ES3_STRINGS || !arrayMethodIsStrict$5("join", ",");
$$2z({ target: "Array", proto: true, forced: FORCED$y }, {
  join: function join(separator) {
    return nativeJoin(toIndexedObject$b(this), separator === void 0 ? "," : separator);
  }
});
var apply$7 = functionApply$1;
var toIndexedObject$a = toIndexedObject$j;
var toIntegerOrInfinity$g = toIntegerOrInfinity$l;
var lengthOfArrayLike$f = lengthOfArrayLike$t;
var arrayMethodIsStrict$4 = arrayMethodIsStrict$9;
var min$7 = Math.min;
var $lastIndexOf$1 = [].lastIndexOf;
var NEGATIVE_ZERO = !!$lastIndexOf$1 && 1 / [1].lastIndexOf(1, -0) < 0;
var STRICT_METHOD$2 = arrayMethodIsStrict$4("lastIndexOf");
var FORCED$x = NEGATIVE_ZERO || !STRICT_METHOD$2;
var arrayLastIndexOf = FORCED$x ? function lastIndexOf(searchElement) {
  if (NEGATIVE_ZERO)
    return apply$7($lastIndexOf$1, this, arguments) || 0;
  var O = toIndexedObject$a(this);
  var length = lengthOfArrayLike$f(O);
  var index = length - 1;
  if (arguments.length > 1)
    index = min$7(index, toIntegerOrInfinity$g(arguments[1]));
  if (index < 0)
    index = length + index;
  for (; index >= 0; index--)
    if (index in O && O[index] === searchElement)
      return index || 0;
  return -1;
} : $lastIndexOf$1;
var $$2y = _export;
var lastIndexOf2 = arrayLastIndexOf;
$$2y({ target: "Array", proto: true, forced: lastIndexOf2 !== [].lastIndexOf }, {
  lastIndexOf: lastIndexOf2
});
var $$2x = _export;
var $map$1 = arrayIteration.map;
var arrayMethodHasSpeciesSupport$2 = arrayMethodHasSpeciesSupport$5;
var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport$2("map");
$$2x({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT$2 }, {
  map: function map(callbackfn) {
    return $map$1(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var $$2w = _export;
var fails$13 = fails$1p;
var isConstructor$3 = isConstructor$6;
var createProperty$5 = createProperty$9;
var $Array$7 = Array;
var ISNT_GENERIC = fails$13(function() {
  function F() {
  }
  return !($Array$7.of.call(F) instanceof F);
});
$$2w({ target: "Array", stat: true, forced: ISNT_GENERIC }, {
  of: function of() {
    var index = 0;
    var argumentsLength = arguments.length;
    var result = new (isConstructor$3(this) ? this : $Array$7)(argumentsLength);
    while (argumentsLength > index)
      createProperty$5(result, index, arguments[index++]);
    result.length = argumentsLength;
    return result;
  }
});
var DESCRIPTORS$w = descriptors;
var isArray$3 = isArray$9;
var $TypeError$e = TypeError;
var getOwnPropertyDescriptor$8 = Object.getOwnPropertyDescriptor;
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS$w && !function() {
  if (this !== void 0)
    return true;
  try {
    Object.defineProperty([], "length", { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();
var arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function(O, length) {
  if (isArray$3(O) && !getOwnPropertyDescriptor$8(O, "length").writable) {
    throw $TypeError$e("Cannot set read only .length");
  }
  return O.length = length;
} : function(O, length) {
  return O.length = length;
};
var $$2v = _export;
var toObject$g = toObject$t;
var lengthOfArrayLike$e = lengthOfArrayLike$t;
var setArrayLength$2 = arraySetLength;
var doesNotExceedSafeInteger$3 = doesNotExceedSafeInteger$6;
var fails$12 = fails$1p;
var INCORRECT_TO_LENGTH = fails$12(function() {
  return [].push.call({ length: 4294967296 }, 1) !== 4294967297;
});
var properErrorOnNonWritableLength$1 = function() {
  try {
    Object.defineProperty([], "length", { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};
var FORCED$w = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength$1();
$$2v({ target: "Array", proto: true, arity: 1, forced: FORCED$w }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject$g(this);
    var len = lengthOfArrayLike$e(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger$3(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength$2(O, len);
    return len;
  }
});
var aCallable$f = aCallable$l;
var toObject$f = toObject$t;
var IndexedObject$1 = indexedObject;
var lengthOfArrayLike$d = lengthOfArrayLike$t;
var $TypeError$d = TypeError;
var createMethod$4 = function(IS_RIGHT) {
  return function(that, callbackfn, argumentsLength, memo) {
    aCallable$f(callbackfn);
    var O = toObject$f(that);
    var self2 = IndexedObject$1(O);
    var length = lengthOfArrayLike$d(O);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2)
      while (true) {
        if (index in self2) {
          memo = self2[index];
          index += i;
          break;
        }
        index += i;
        if (IS_RIGHT ? index < 0 : length <= index) {
          throw $TypeError$d("Reduce of empty array with no initial value");
        }
      }
    for (; IS_RIGHT ? index >= 0 : length > index; index += i)
      if (index in self2) {
        memo = callbackfn(memo, self2[index], index, O);
      }
    return memo;
  };
};
var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod$4(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod$4(true)
};
var classof$f = classofRaw$2;
var engineIsNode = typeof process != "undefined" && classof$f(process) == "process";
var $$2u = _export;
var $reduce$1 = arrayReduce.left;
var arrayMethodIsStrict$3 = arrayMethodIsStrict$9;
var CHROME_VERSION$1 = engineV8Version;
var IS_NODE$8 = engineIsNode;
var CHROME_BUG$1 = !IS_NODE$8 && CHROME_VERSION$1 > 79 && CHROME_VERSION$1 < 83;
var FORCED$v = CHROME_BUG$1 || !arrayMethodIsStrict$3("reduce");
$$2u({ target: "Array", proto: true, forced: FORCED$v }, {
  reduce: function reduce(callbackfn) {
    var length = arguments.length;
    return $reduce$1(this, callbackfn, length, length > 1 ? arguments[1] : void 0);
  }
});
var $$2t = _export;
var $reduceRight$1 = arrayReduce.right;
var arrayMethodIsStrict$2 = arrayMethodIsStrict$9;
var CHROME_VERSION = engineV8Version;
var IS_NODE$7 = engineIsNode;
var CHROME_BUG = !IS_NODE$7 && CHROME_VERSION > 79 && CHROME_VERSION < 83;
var FORCED$u = CHROME_BUG || !arrayMethodIsStrict$2("reduceRight");
$$2t({ target: "Array", proto: true, forced: FORCED$u }, {
  reduceRight: function reduceRight(callbackfn) {
    return $reduceRight$1(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var $$2s = _export;
var uncurryThis$11 = functionUncurryThis;
var isArray$2 = isArray$9;
var nativeReverse = uncurryThis$11([].reverse);
var test$1 = [1, 2];
$$2s({ target: "Array", proto: true, forced: String(test$1) === String(test$1.reverse()) }, {
  reverse: function reverse() {
    if (isArray$2(this))
      this.length = this.length;
    return nativeReverse(this);
  }
});
var $$2r = _export;
var isArray$1 = isArray$9;
var isConstructor$2 = isConstructor$6;
var isObject$o = isObject$z;
var toAbsoluteIndex$5 = toAbsoluteIndex$a;
var lengthOfArrayLike$c = lengthOfArrayLike$t;
var toIndexedObject$9 = toIndexedObject$j;
var createProperty$4 = createProperty$9;
var wellKnownSymbol$h = wellKnownSymbol$z;
var arrayMethodHasSpeciesSupport$1 = arrayMethodHasSpeciesSupport$5;
var nativeSlice = arraySlice$a;
var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport$1("slice");
var SPECIES$4 = wellKnownSymbol$h("species");
var $Array$6 = Array;
var max$5 = Math.max;
$$2r({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT$1 }, {
  slice: function slice(start, end) {
    var O = toIndexedObject$9(this);
    var length = lengthOfArrayLike$c(O);
    var k = toAbsoluteIndex$5(start, length);
    var fin = toAbsoluteIndex$5(end === void 0 ? length : end, length);
    var Constructor2, result, n;
    if (isArray$1(O)) {
      Constructor2 = O.constructor;
      if (isConstructor$2(Constructor2) && (Constructor2 === $Array$6 || isArray$1(Constructor2.prototype))) {
        Constructor2 = void 0;
      } else if (isObject$o(Constructor2)) {
        Constructor2 = Constructor2[SPECIES$4];
        if (Constructor2 === null)
          Constructor2 = void 0;
      }
      if (Constructor2 === $Array$6 || Constructor2 === void 0) {
        return nativeSlice(O, k, fin);
      }
    }
    result = new (Constructor2 === void 0 ? $Array$6 : Constructor2)(max$5(fin - k, 0));
    for (n = 0; k < fin; k++, n++)
      if (k in O)
        createProperty$4(result, n, O[k]);
    result.length = n;
    return result;
  }
});
var $$2q = _export;
var $some$1 = arrayIteration.some;
var arrayMethodIsStrict$1 = arrayMethodIsStrict$9;
var STRICT_METHOD$1 = arrayMethodIsStrict$1("some");
$$2q({ target: "Array", proto: true, forced: !STRICT_METHOD$1 }, {
  some: function some(callbackfn) {
    return $some$1(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var arraySlice$8 = arraySliceSimple;
var floor$9 = Math.floor;
var mergeSort = function(array, comparefn) {
  var length = array.length;
  var middle = floor$9(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice$8(array, 0, middle), comparefn),
    mergeSort(arraySlice$8(array, middle), comparefn),
    comparefn
  );
};
var insertionSort = function(array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;
  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++)
      array[j] = element;
  }
  return array;
};
var merge = function(array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;
  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = lindex < llength && rindex < rlength ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++] : lindex < llength ? left[lindex++] : right[rindex++];
  }
  return array;
};
var arraySort$1 = mergeSort;
var userAgent$5 = engineUserAgent;
var firefox = userAgent$5.match(/firefox\/(\d+)/i);
var engineFfVersion = !!firefox && +firefox[1];
var UA = engineUserAgent;
var engineIsIeOrEdge = /MSIE|Trident/.test(UA);
var userAgent$4 = engineUserAgent;
var webkit = userAgent$4.match(/AppleWebKit\/(\d+)\./);
var engineWebkitVersion = !!webkit && +webkit[1];
var $$2p = _export;
var uncurryThis$10 = functionUncurryThis;
var aCallable$e = aCallable$l;
var toObject$e = toObject$t;
var lengthOfArrayLike$b = lengthOfArrayLike$t;
var deletePropertyOrThrow$2 = deletePropertyOrThrow$4;
var toString$x = toString$C;
var fails$11 = fails$1p;
var internalSort$1 = arraySort$1;
var arrayMethodIsStrict = arrayMethodIsStrict$9;
var FF$1 = engineFfVersion;
var IE_OR_EDGE$1 = engineIsIeOrEdge;
var V8$2 = engineV8Version;
var WEBKIT$2 = engineWebkitVersion;
var test = [];
var nativeSort$1 = uncurryThis$10(test.sort);
var push$a = uncurryThis$10(test.push);
var FAILS_ON_UNDEFINED = fails$11(function() {
  test.sort(void 0);
});
var FAILS_ON_NULL = fails$11(function() {
  test.sort(null);
});
var STRICT_METHOD = arrayMethodIsStrict("sort");
var STABLE_SORT$1 = !fails$11(function() {
  if (V8$2)
    return V8$2 < 70;
  if (FF$1 && FF$1 > 3)
    return;
  if (IE_OR_EDGE$1)
    return true;
  if (WEBKIT$2)
    return WEBKIT$2 < 603;
  var result = "";
  var code, chr, value, index;
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);
    switch (code) {
      case 66:
      case 69:
      case 70:
      case 72:
        value = 3;
        break;
      case 68:
      case 71:
        value = 4;
        break;
      default:
        value = 2;
    }
    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }
  test.sort(function(a, b) {
    return b.v - a.v;
  });
  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr)
      result += chr;
  }
  return result !== "DGBEFHACIJK";
});
var FORCED$t = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT$1;
var getSortCompare$1 = function(comparefn) {
  return function(x, y) {
    if (y === void 0)
      return -1;
    if (x === void 0)
      return 1;
    if (comparefn !== void 0)
      return +comparefn(x, y) || 0;
    return toString$x(x) > toString$x(y) ? 1 : -1;
  };
};
$$2p({ target: "Array", proto: true, forced: FORCED$t }, {
  sort: function sort(comparefn) {
    if (comparefn !== void 0)
      aCallable$e(comparefn);
    var array = toObject$e(this);
    if (STABLE_SORT$1)
      return comparefn === void 0 ? nativeSort$1(array) : nativeSort$1(array, comparefn);
    var items = [];
    var arrayLength = lengthOfArrayLike$b(array);
    var itemsLength, index;
    for (index = 0; index < arrayLength; index++) {
      if (index in array)
        push$a(items, array[index]);
    }
    internalSort$1(items, getSortCompare$1(comparefn));
    itemsLength = lengthOfArrayLike$b(items);
    index = 0;
    while (index < itemsLength)
      array[index] = items[index++];
    while (index < arrayLength)
      deletePropertyOrThrow$2(array, index++);
    return array;
  }
});
var getBuiltIn$c = getBuiltIn$n;
var defineBuiltInAccessor$e = defineBuiltInAccessor$h;
var wellKnownSymbol$g = wellKnownSymbol$z;
var DESCRIPTORS$v = descriptors;
var SPECIES$3 = wellKnownSymbol$g("species");
var setSpecies$6 = function(CONSTRUCTOR_NAME) {
  var Constructor2 = getBuiltIn$c(CONSTRUCTOR_NAME);
  if (DESCRIPTORS$v && Constructor2 && !Constructor2[SPECIES$3]) {
    defineBuiltInAccessor$e(Constructor2, SPECIES$3, {
      configurable: true,
      get: function() {
        return this;
      }
    });
  }
};
var setSpecies$5 = setSpecies$6;
setSpecies$5("Array");
var $$2o = _export;
var toObject$d = toObject$t;
var toAbsoluteIndex$4 = toAbsoluteIndex$a;
var toIntegerOrInfinity$f = toIntegerOrInfinity$l;
var lengthOfArrayLike$a = lengthOfArrayLike$t;
var setArrayLength$1 = arraySetLength;
var doesNotExceedSafeInteger$2 = doesNotExceedSafeInteger$6;
var arraySpeciesCreate = arraySpeciesCreate$5;
var createProperty$3 = createProperty$9;
var deletePropertyOrThrow$1 = deletePropertyOrThrow$4;
var arrayMethodHasSpeciesSupport = arrayMethodHasSpeciesSupport$5;
var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("splice");
var max$4 = Math.max;
var min$6 = Math.min;
$$2o({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount) {
    var O = toObject$d(this);
    var len = lengthOfArrayLike$a(O);
    var actualStart = toAbsoluteIndex$4(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from4, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min$6(max$4(toIntegerOrInfinity$f(deleteCount), 0), len - actualStart);
    }
    doesNotExceedSafeInteger$2(len + insertCount - actualDeleteCount);
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from4 = actualStart + k;
      if (from4 in O)
        createProperty$3(A, k, O[from4]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from4 = k + actualDeleteCount;
        to = k + insertCount;
        if (from4 in O)
          O[to] = O[from4];
        else
          deletePropertyOrThrow$1(O, to);
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--)
        deletePropertyOrThrow$1(O, k - 1);
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from4 = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from4 in O)
          O[to] = O[from4];
        else
          deletePropertyOrThrow$1(O, to);
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    setArrayLength$1(O, len - actualDeleteCount + insertCount);
    return A;
  }
});
var lengthOfArrayLike$9 = lengthOfArrayLike$t;
var arrayToReversed$2 = function(O, C) {
  var len = lengthOfArrayLike$9(O);
  var A = new C(len);
  var k = 0;
  for (; k < len; k++)
    A[k] = O[len - k - 1];
  return A;
};
var $$2n = _export;
var arrayToReversed$1 = arrayToReversed$2;
var toIndexedObject$8 = toIndexedObject$j;
var addToUnscopables$4 = addToUnscopables$e;
var $Array$5 = Array;
$$2n({ target: "Array", proto: true }, {
  toReversed: function toReversed() {
    return arrayToReversed$1(toIndexedObject$8(this), $Array$5);
  }
});
addToUnscopables$4("toReversed");
var lengthOfArrayLike$8 = lengthOfArrayLike$t;
var arrayFromConstructorAndList$3 = function(Constructor2, list) {
  var index = 0;
  var length = lengthOfArrayLike$8(list);
  var result = new Constructor2(length);
  while (length > index)
    result[index] = list[index++];
  return result;
};
var global$L = global$_;
var entryVirtual = function(CONSTRUCTOR) {
  return global$L[CONSTRUCTOR].prototype;
};
var $$2m = _export;
var uncurryThis$$ = functionUncurryThis;
var aCallable$d = aCallable$l;
var toIndexedObject$7 = toIndexedObject$j;
var arrayFromConstructorAndList$2 = arrayFromConstructorAndList$3;
var getVirtual = entryVirtual;
var addToUnscopables$3 = addToUnscopables$e;
var $Array$4 = Array;
var sort$1 = uncurryThis$$(getVirtual("Array").sort);
$$2m({ target: "Array", proto: true }, {
  toSorted: function toSorted(compareFn) {
    if (compareFn !== void 0)
      aCallable$d(compareFn);
    var O = toIndexedObject$7(this);
    var A = arrayFromConstructorAndList$2($Array$4, O);
    return sort$1(A, compareFn);
  }
});
addToUnscopables$3("toSorted");
var $$2l = _export;
var addToUnscopables$2 = addToUnscopables$e;
var doesNotExceedSafeInteger$1 = doesNotExceedSafeInteger$6;
var lengthOfArrayLike$7 = lengthOfArrayLike$t;
var toAbsoluteIndex$3 = toAbsoluteIndex$a;
var toIndexedObject$6 = toIndexedObject$j;
var toIntegerOrInfinity$e = toIntegerOrInfinity$l;
var $Array$3 = Array;
var max$3 = Math.max;
var min$5 = Math.min;
$$2l({ target: "Array", proto: true }, {
  toSpliced: function toSpliced(start, deleteCount) {
    var O = toIndexedObject$6(this);
    var len = lengthOfArrayLike$7(O);
    var actualStart = toAbsoluteIndex$3(start, len);
    var argumentsLength = arguments.length;
    var k = 0;
    var insertCount, actualDeleteCount, newLen, A;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min$5(max$3(toIntegerOrInfinity$e(deleteCount), 0), len - actualStart);
    }
    newLen = doesNotExceedSafeInteger$1(len + insertCount - actualDeleteCount);
    A = $Array$3(newLen);
    for (; k < actualStart; k++)
      A[k] = O[k];
    for (; k < actualStart + insertCount; k++)
      A[k] = arguments[k - actualStart + 2];
    for (; k < newLen; k++)
      A[k] = O[k + actualDeleteCount - insertCount];
    return A;
  }
});
addToUnscopables$2("toSpliced");
var addToUnscopables$1 = addToUnscopables$e;
addToUnscopables$1("flat");
var addToUnscopables = addToUnscopables$e;
addToUnscopables("flatMap");
var $$2k = _export;
var toObject$c = toObject$t;
var lengthOfArrayLike$6 = lengthOfArrayLike$t;
var setArrayLength = arraySetLength;
var deletePropertyOrThrow = deletePropertyOrThrow$4;
var doesNotExceedSafeInteger = doesNotExceedSafeInteger$6;
var INCORRECT_RESULT = [].unshift(0) !== 1;
var properErrorOnNonWritableLength = function() {
  try {
    Object.defineProperty([], "length", { writable: false }).unshift();
  } catch (error) {
    return error instanceof TypeError;
  }
};
var FORCED$s = INCORRECT_RESULT || !properErrorOnNonWritableLength();
$$2k({ target: "Array", proto: true, arity: 1, forced: FORCED$s }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  unshift: function unshift(item) {
    var O = toObject$c(this);
    var len = lengthOfArrayLike$6(O);
    var argCount = arguments.length;
    if (argCount) {
      doesNotExceedSafeInteger(len + argCount);
      var k = len;
      while (k--) {
        var to = k + argCount;
        if (k in O)
          O[to] = O[k];
        else
          deletePropertyOrThrow(O, to);
      }
      for (var j = 0; j < argCount; j++) {
        O[j] = arguments[j];
      }
    }
    return setArrayLength(O, len + argCount);
  }
});
var lengthOfArrayLike$5 = lengthOfArrayLike$t;
var toIntegerOrInfinity$d = toIntegerOrInfinity$l;
var $RangeError$9 = RangeError;
var arrayWith$2 = function(O, C, index, value) {
  var len = lengthOfArrayLike$5(O);
  var relativeIndex = toIntegerOrInfinity$d(index);
  var actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
  if (actualIndex >= len || actualIndex < 0)
    throw $RangeError$9("Incorrect index");
  var A = new C(len);
  var k = 0;
  for (; k < len; k++)
    A[k] = k === actualIndex ? value : O[k];
  return A;
};
var $$2j = _export;
var arrayWith$1 = arrayWith$2;
var toIndexedObject$5 = toIndexedObject$j;
var $Array$2 = Array;
$$2j({ target: "Array", proto: true }, {
  "with": function(index, value) {
    return arrayWith$1(toIndexedObject$5(this), $Array$2, index, value);
  }
});
var arrayBufferBasicDetection = typeof ArrayBuffer != "undefined" && typeof DataView != "undefined";
var defineBuiltIn$h = defineBuiltIn$o;
var defineBuiltIns$5 = function(target, src, options) {
  for (var key in src)
    defineBuiltIn$h(target, key, src[key], options);
  return target;
};
var isPrototypeOf$5 = objectIsPrototypeOf;
var $TypeError$c = TypeError;
var anInstance$a = function(it, Prototype2) {
  if (isPrototypeOf$5(Prototype2, it))
    return it;
  throw $TypeError$c("Incorrect invocation");
};
var toIntegerOrInfinity$c = toIntegerOrInfinity$l;
var toLength$b = toLength$d;
var $RangeError$8 = RangeError;
var toIndex$2 = function(it) {
  if (it === void 0)
    return 0;
  var number = toIntegerOrInfinity$c(it);
  var length = toLength$b(number);
  if (number !== length)
    throw $RangeError$8("Wrong length or index");
  return length;
};
var $Array$1 = Array;
var abs$8 = Math.abs;
var pow$5 = Math.pow;
var floor$8 = Math.floor;
var log$8 = Math.log;
var LN2$2 = Math.LN2;
var pack = function(number, mantissaLength, bytes) {
  var buffer = $Array$1(bytes);
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var rt = mantissaLength === 23 ? pow$5(2, -24) - pow$5(2, -77) : 0;
  var sign3 = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
  var index = 0;
  var exponent, mantissa, c;
  number = abs$8(number);
  if (number != number || number === Infinity) {
    mantissa = number != number ? 1 : 0;
    exponent = eMax;
  } else {
    exponent = floor$8(log$8(number) / LN2$2);
    c = pow$5(2, -exponent);
    if (number * c < 1) {
      exponent--;
      c *= 2;
    }
    if (exponent + eBias >= 1) {
      number += rt / c;
    } else {
      number += rt * pow$5(2, 1 - eBias);
    }
    if (number * c >= 2) {
      exponent++;
      c /= 2;
    }
    if (exponent + eBias >= eMax) {
      mantissa = 0;
      exponent = eMax;
    } else if (exponent + eBias >= 1) {
      mantissa = (number * c - 1) * pow$5(2, mantissaLength);
      exponent = exponent + eBias;
    } else {
      mantissa = number * pow$5(2, eBias - 1) * pow$5(2, mantissaLength);
      exponent = 0;
    }
  }
  while (mantissaLength >= 8) {
    buffer[index++] = mantissa & 255;
    mantissa /= 256;
    mantissaLength -= 8;
  }
  exponent = exponent << mantissaLength | mantissa;
  exponentLength += mantissaLength;
  while (exponentLength > 0) {
    buffer[index++] = exponent & 255;
    exponent /= 256;
    exponentLength -= 8;
  }
  buffer[--index] |= sign3 * 128;
  return buffer;
};
var unpack = function(buffer, mantissaLength) {
  var bytes = buffer.length;
  var exponentLength = bytes * 8 - mantissaLength - 1;
  var eMax = (1 << exponentLength) - 1;
  var eBias = eMax >> 1;
  var nBits = exponentLength - 7;
  var index = bytes - 1;
  var sign3 = buffer[index--];
  var exponent = sign3 & 127;
  var mantissa;
  sign3 >>= 7;
  while (nBits > 0) {
    exponent = exponent * 256 + buffer[index--];
    nBits -= 8;
  }
  mantissa = exponent & (1 << -nBits) - 1;
  exponent >>= -nBits;
  nBits += mantissaLength;
  while (nBits > 0) {
    mantissa = mantissa * 256 + buffer[index--];
    nBits -= 8;
  }
  if (exponent === 0) {
    exponent = 1 - eBias;
  } else if (exponent === eMax) {
    return mantissa ? NaN : sign3 ? -Infinity : Infinity;
  } else {
    mantissa = mantissa + pow$5(2, mantissaLength);
    exponent = exponent - eBias;
  }
  return (sign3 ? -1 : 1) * mantissa * pow$5(2, exponent - mantissaLength);
};
var ieee754 = {
  pack,
  unpack
};
var global$K = global$_;
var uncurryThis$_ = functionUncurryThis;
var DESCRIPTORS$u = descriptors;
var NATIVE_ARRAY_BUFFER$2 = arrayBufferBasicDetection;
var FunctionName = functionName;
var createNonEnumerableProperty$7 = createNonEnumerableProperty$f;
var defineBuiltInAccessor$d = defineBuiltInAccessor$h;
var defineBuiltIns$4 = defineBuiltIns$5;
var fails$10 = fails$1p;
var anInstance$9 = anInstance$a;
var toIntegerOrInfinity$b = toIntegerOrInfinity$l;
var toLength$a = toLength$d;
var toIndex$1 = toIndex$2;
var IEEE754 = ieee754;
var getPrototypeOf$7 = objectGetPrototypeOf$2;
var setPrototypeOf$5 = objectSetPrototypeOf$1;
var getOwnPropertyNames$4 = objectGetOwnPropertyNames.f;
var arrayFill = arrayFill$1;
var arraySlice$7 = arraySliceSimple;
var setToStringTag$8 = setToStringTag$d;
var InternalStateModule$a = internalState;
var PROPER_FUNCTION_NAME$2 = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var ARRAY_BUFFER$1 = "ArrayBuffer";
var DATA_VIEW = "DataView";
var PROTOTYPE = "prototype";
var WRONG_LENGTH$1 = "Wrong length";
var WRONG_INDEX = "Wrong index";
var getInternalArrayBufferState = InternalStateModule$a.getterFor(ARRAY_BUFFER$1);
var getInternalDataViewState = InternalStateModule$a.getterFor(DATA_VIEW);
var setInternalState$9 = InternalStateModule$a.set;
var NativeArrayBuffer$1 = global$K[ARRAY_BUFFER$1];
var $ArrayBuffer = NativeArrayBuffer$1;
var ArrayBufferPrototype$1 = $ArrayBuffer && $ArrayBuffer[PROTOTYPE];
var $DataView = global$K[DATA_VIEW];
var DataViewPrototype$1 = $DataView && $DataView[PROTOTYPE];
var ObjectPrototype$3 = Object.prototype;
var Array$2 = global$K.Array;
var RangeError$4 = global$K.RangeError;
var fill2 = uncurryThis$_(arrayFill);
var reverse2 = uncurryThis$_([].reverse);
var packIEEE754 = IEEE754.pack;
var unpackIEEE754 = IEEE754.unpack;
var packInt8 = function(number) {
  return [number & 255];
};
var packInt16 = function(number) {
  return [number & 255, number >> 8 & 255];
};
var packInt32 = function(number) {
  return [number & 255, number >> 8 & 255, number >> 16 & 255, number >> 24 & 255];
};
var unpackInt32 = function(buffer) {
  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
};
var packFloat32 = function(number) {
  return packIEEE754(number, 23, 4);
};
var packFloat64 = function(number) {
  return packIEEE754(number, 52, 8);
};
var addGetter$1 = function(Constructor2, key, getInternalState2) {
  defineBuiltInAccessor$d(Constructor2[PROTOTYPE], key, {
    configurable: true,
    get: function() {
      return getInternalState2(this)[key];
    }
  });
};
var get$1 = function(view, count, index, isLittleEndian) {
  var store = getInternalDataViewState(view);
  var intIndex = toIndex$1(index);
  var boolIsLittleEndian = !!isLittleEndian;
  if (intIndex + count > store.byteLength)
    throw RangeError$4(WRONG_INDEX);
  var bytes = store.bytes;
  var start = intIndex + store.byteOffset;
  var pack2 = arraySlice$7(bytes, start, start + count);
  return boolIsLittleEndian ? pack2 : reverse2(pack2);
};
var set$2 = function(view, count, index, conversion, value, isLittleEndian) {
  var store = getInternalDataViewState(view);
  var intIndex = toIndex$1(index);
  var pack2 = conversion(+value);
  var boolIsLittleEndian = !!isLittleEndian;
  if (intIndex + count > store.byteLength)
    throw RangeError$4(WRONG_INDEX);
  var bytes = store.bytes;
  var start = intIndex + store.byteOffset;
  for (var i = 0; i < count; i++)
    bytes[start + i] = pack2[boolIsLittleEndian ? i : count - i - 1];
};
if (!NATIVE_ARRAY_BUFFER$2) {
  $ArrayBuffer = function ArrayBuffer2(length) {
    anInstance$9(this, ArrayBufferPrototype$1);
    var byteLength = toIndex$1(length);
    setInternalState$9(this, {
      type: ARRAY_BUFFER$1,
      bytes: fill2(Array$2(byteLength), 0),
      byteLength
    });
    if (!DESCRIPTORS$u) {
      this.byteLength = byteLength;
      this.detached = false;
    }
  };
  ArrayBufferPrototype$1 = $ArrayBuffer[PROTOTYPE];
  $DataView = function DataView2(buffer, byteOffset, byteLength) {
    anInstance$9(this, DataViewPrototype$1);
    anInstance$9(buffer, ArrayBufferPrototype$1);
    var bufferState = getInternalArrayBufferState(buffer);
    var bufferLength = bufferState.byteLength;
    var offset = toIntegerOrInfinity$b(byteOffset);
    if (offset < 0 || offset > bufferLength)
      throw RangeError$4("Wrong offset");
    byteLength = byteLength === void 0 ? bufferLength - offset : toLength$a(byteLength);
    if (offset + byteLength > bufferLength)
      throw RangeError$4(WRONG_LENGTH$1);
    setInternalState$9(this, {
      type: DATA_VIEW,
      buffer,
      byteLength,
      byteOffset: offset,
      bytes: bufferState.bytes
    });
    if (!DESCRIPTORS$u) {
      this.buffer = buffer;
      this.byteLength = byteLength;
      this.byteOffset = offset;
    }
  };
  DataViewPrototype$1 = $DataView[PROTOTYPE];
  if (DESCRIPTORS$u) {
    addGetter$1($ArrayBuffer, "byteLength", getInternalArrayBufferState);
    addGetter$1($DataView, "buffer", getInternalDataViewState);
    addGetter$1($DataView, "byteLength", getInternalDataViewState);
    addGetter$1($DataView, "byteOffset", getInternalDataViewState);
  }
  defineBuiltIns$4(DataViewPrototype$1, {
    getInt8: function getInt8(byteOffset) {
      return get$1(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint82(byteOffset) {
      return get$1(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset) {
      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset) {
      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset) {
      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false));
    },
    getUint32: function getUint32(byteOffset) {
      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false)) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset) {
      return unpackIEEE754(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false), 23);
    },
    getFloat64: function getFloat64(byteOffset) {
      return unpackIEEE754(get$1(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : false), 52);
    },
    setInt8: function setInt8(byteOffset, value) {
      set$2(this, 1, byteOffset, packInt8, value);
    },
    setUint8: function setUint82(byteOffset, value) {
      set$2(this, 1, byteOffset, packInt8, value);
    },
    setInt16: function setInt16(byteOffset, value) {
      set$2(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false);
    },
    setUint16: function setUint16(byteOffset, value) {
      set$2(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false);
    },
    setInt32: function setInt32(byteOffset, value) {
      set$2(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false);
    },
    setUint32: function setUint32(byteOffset, value) {
      set$2(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false);
    },
    setFloat32: function setFloat32(byteOffset, value) {
      set$2(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : false);
    },
    setFloat64: function setFloat64(byteOffset, value) {
      set$2(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : false);
    }
  });
} else {
  var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME$2 && NativeArrayBuffer$1.name !== ARRAY_BUFFER$1;
  if (!fails$10(function() {
    NativeArrayBuffer$1(1);
  }) || !fails$10(function() {
    new NativeArrayBuffer$1(-1);
  }) || fails$10(function() {
    new NativeArrayBuffer$1();
    new NativeArrayBuffer$1(1.5);
    new NativeArrayBuffer$1(NaN);
    return NativeArrayBuffer$1.length != 1 || INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME;
  })) {
    $ArrayBuffer = function ArrayBuffer2(length) {
      anInstance$9(this, ArrayBufferPrototype$1);
      return new NativeArrayBuffer$1(toIndex$1(length));
    };
    $ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype$1;
    for (var keys$1 = getOwnPropertyNames$4(NativeArrayBuffer$1), j = 0, key$2; keys$1.length > j; ) {
      if (!((key$2 = keys$1[j++]) in $ArrayBuffer)) {
        createNonEnumerableProperty$7($ArrayBuffer, key$2, NativeArrayBuffer$1[key$2]);
      }
    }
    ArrayBufferPrototype$1.constructor = $ArrayBuffer;
  } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
    createNonEnumerableProperty$7(NativeArrayBuffer$1, "name", ARRAY_BUFFER$1);
  }
  if (setPrototypeOf$5 && getPrototypeOf$7(DataViewPrototype$1) !== ObjectPrototype$3) {
    setPrototypeOf$5(DataViewPrototype$1, ObjectPrototype$3);
  }
  var testView = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = uncurryThis$_(DataViewPrototype$1.setInt8);
  testView.setInt8(0, 2147483648);
  testView.setInt8(1, 2147483649);
  if (testView.getInt8(0) || !testView.getInt8(1))
    defineBuiltIns$4(DataViewPrototype$1, {
      setInt8: function setInt8(byteOffset, value) {
        $setInt8(this, byteOffset, value << 24 >> 24);
      },
      setUint8: function setUint82(byteOffset, value) {
        $setInt8(this, byteOffset, value << 24 >> 24);
      }
    }, { unsafe: true });
}
setToStringTag$8($ArrayBuffer, ARRAY_BUFFER$1);
setToStringTag$8($DataView, DATA_VIEW);
var arrayBuffer = {
  ArrayBuffer: $ArrayBuffer,
  DataView: $DataView
};
var $$2i = _export;
var global$J = global$_;
var arrayBufferModule = arrayBuffer;
var setSpecies$4 = setSpecies$6;
var ARRAY_BUFFER = "ArrayBuffer";
var ArrayBuffer$4 = arrayBufferModule[ARRAY_BUFFER];
var NativeArrayBuffer = global$J[ARRAY_BUFFER];
$$2i({ global: true, constructor: true, forced: NativeArrayBuffer !== ArrayBuffer$4 }, {
  ArrayBuffer: ArrayBuffer$4
});
setSpecies$4(ARRAY_BUFFER);
var NATIVE_ARRAY_BUFFER$1 = arrayBufferBasicDetection;
var DESCRIPTORS$t = descriptors;
var global$I = global$_;
var isCallable$e = isCallable$z;
var isObject$n = isObject$z;
var hasOwn$h = hasOwnProperty_1;
var classof$e = classof$m;
var tryToString$1 = tryToString$7;
var createNonEnumerableProperty$6 = createNonEnumerableProperty$f;
var defineBuiltIn$g = defineBuiltIn$o;
var defineBuiltInAccessor$c = defineBuiltInAccessor$h;
var isPrototypeOf$4 = objectIsPrototypeOf;
var getPrototypeOf$6 = objectGetPrototypeOf$2;
var setPrototypeOf$4 = objectSetPrototypeOf$1;
var wellKnownSymbol$f = wellKnownSymbol$z;
var uid$2 = uid$6;
var InternalStateModule$9 = internalState;
var enforceInternalState$3 = InternalStateModule$9.enforce;
var getInternalState$7 = InternalStateModule$9.get;
var Int8Array$4 = global$I.Int8Array;
var Int8ArrayPrototype$1 = Int8Array$4 && Int8Array$4.prototype;
var Uint8ClampedArray$1 = global$I.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray$1 && Uint8ClampedArray$1.prototype;
var TypedArray$1 = Int8Array$4 && getPrototypeOf$6(Int8Array$4);
var TypedArrayPrototype$2 = Int8ArrayPrototype$1 && getPrototypeOf$6(Int8ArrayPrototype$1);
var ObjectPrototype$2 = Object.prototype;
var TypeError$6 = global$I.TypeError;
var TO_STRING_TAG$1 = wellKnownSymbol$f("toStringTag");
var TYPED_ARRAY_TAG$1 = uid$2("TYPED_ARRAY_TAG");
var TYPED_ARRAY_CONSTRUCTOR = "TypedArrayConstructor";
var NATIVE_ARRAY_BUFFER_VIEWS$3 = NATIVE_ARRAY_BUFFER$1 && !!setPrototypeOf$4 && classof$e(global$I.opera) !== "Opera";
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME$1, Constructor, Prototype;
var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};
var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};
var isView = function isView2(it) {
  if (!isObject$n(it))
    return false;
  var klass = classof$e(it);
  return klass === "DataView" || hasOwn$h(TypedArrayConstructorsList, klass) || hasOwn$h(BigIntArrayConstructorsList, klass);
};
var getTypedArrayConstructor$4 = function(it) {
  var proto = getPrototypeOf$6(it);
  if (!isObject$n(proto))
    return;
  var state = getInternalState$7(proto);
  return state && hasOwn$h(state, TYPED_ARRAY_CONSTRUCTOR) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor$4(proto);
};
var isTypedArray$1 = function(it) {
  if (!isObject$n(it))
    return false;
  var klass = classof$e(it);
  return hasOwn$h(TypedArrayConstructorsList, klass) || hasOwn$h(BigIntArrayConstructorsList, klass);
};
var aTypedArray$s = function(it) {
  if (isTypedArray$1(it))
    return it;
  throw TypeError$6("Target is not a typed array");
};
var aTypedArrayConstructor$4 = function(C) {
  if (isCallable$e(C) && (!setPrototypeOf$4 || isPrototypeOf$4(TypedArray$1, C)))
    return C;
  throw TypeError$6(tryToString$1(C) + " is not a typed array constructor");
};
var exportTypedArrayMethod$t = function(KEY, property, forced, options) {
  if (!DESCRIPTORS$t)
    return;
  if (forced)
    for (var ARRAY in TypedArrayConstructorsList) {
      var TypedArrayConstructor = global$I[ARRAY];
      if (TypedArrayConstructor && hasOwn$h(TypedArrayConstructor.prototype, KEY))
        try {
          delete TypedArrayConstructor.prototype[KEY];
        } catch (error) {
          try {
            TypedArrayConstructor.prototype[KEY] = property;
          } catch (error2) {
          }
        }
    }
  if (!TypedArrayPrototype$2[KEY] || forced) {
    defineBuiltIn$g(TypedArrayPrototype$2, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$3 && Int8ArrayPrototype$1[KEY] || property, options);
  }
};
var exportTypedArrayStaticMethod$2 = function(KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS$t)
    return;
  if (setPrototypeOf$4) {
    if (forced)
      for (ARRAY in TypedArrayConstructorsList) {
        TypedArrayConstructor = global$I[ARRAY];
        if (TypedArrayConstructor && hasOwn$h(TypedArrayConstructor, KEY))
          try {
            delete TypedArrayConstructor[KEY];
          } catch (error) {
          }
      }
    if (!TypedArray$1[KEY] || forced) {
      try {
        return defineBuiltIn$g(TypedArray$1, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS$3 && TypedArray$1[KEY] || property);
      } catch (error) {
      }
    } else
      return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global$I[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      defineBuiltIn$g(TypedArrayConstructor, KEY, property);
    }
  }
};
for (NAME$1 in TypedArrayConstructorsList) {
  Constructor = global$I[NAME$1];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype)
    enforceInternalState$3(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
  else
    NATIVE_ARRAY_BUFFER_VIEWS$3 = false;
}
for (NAME$1 in BigIntArrayConstructorsList) {
  Constructor = global$I[NAME$1];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype)
    enforceInternalState$3(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
}
if (!NATIVE_ARRAY_BUFFER_VIEWS$3 || !isCallable$e(TypedArray$1) || TypedArray$1 === Function.prototype) {
  TypedArray$1 = function TypedArray2() {
    throw TypeError$6("Incorrect invocation");
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS$3)
    for (NAME$1 in TypedArrayConstructorsList) {
      if (global$I[NAME$1])
        setPrototypeOf$4(global$I[NAME$1], TypedArray$1);
    }
}
if (!NATIVE_ARRAY_BUFFER_VIEWS$3 || !TypedArrayPrototype$2 || TypedArrayPrototype$2 === ObjectPrototype$2) {
  TypedArrayPrototype$2 = TypedArray$1.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS$3)
    for (NAME$1 in TypedArrayConstructorsList) {
      if (global$I[NAME$1])
        setPrototypeOf$4(global$I[NAME$1].prototype, TypedArrayPrototype$2);
    }
}
if (NATIVE_ARRAY_BUFFER_VIEWS$3 && getPrototypeOf$6(Uint8ClampedArrayPrototype) !== TypedArrayPrototype$2) {
  setPrototypeOf$4(Uint8ClampedArrayPrototype, TypedArrayPrototype$2);
}
if (DESCRIPTORS$t && !hasOwn$h(TypedArrayPrototype$2, TO_STRING_TAG$1)) {
  TYPED_ARRAY_TAG_REQUIRED = true;
  defineBuiltInAccessor$c(TypedArrayPrototype$2, TO_STRING_TAG$1, {
    configurable: true,
    get: function() {
      return isObject$n(this) ? this[TYPED_ARRAY_TAG$1] : void 0;
    }
  });
  for (NAME$1 in TypedArrayConstructorsList)
    if (global$I[NAME$1]) {
      createNonEnumerableProperty$6(global$I[NAME$1], TYPED_ARRAY_TAG$1, NAME$1);
    }
}
var arrayBufferViewCore = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS$3,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG$1,
  aTypedArray: aTypedArray$s,
  aTypedArrayConstructor: aTypedArrayConstructor$4,
  exportTypedArrayMethod: exportTypedArrayMethod$t,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod$2,
  getTypedArrayConstructor: getTypedArrayConstructor$4,
  isView,
  isTypedArray: isTypedArray$1,
  TypedArray: TypedArray$1,
  TypedArrayPrototype: TypedArrayPrototype$2
};
var $$2h = _export;
var ArrayBufferViewCore$v = arrayBufferViewCore;
var NATIVE_ARRAY_BUFFER_VIEWS$2 = ArrayBufferViewCore$v.NATIVE_ARRAY_BUFFER_VIEWS;
$$2h({ target: "ArrayBuffer", stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS$2 }, {
  isView: ArrayBufferViewCore$v.isView
});
var isConstructor$1 = isConstructor$6;
var tryToString = tryToString$7;
var $TypeError$b = TypeError;
var aConstructor$3 = function(argument) {
  if (isConstructor$1(argument))
    return argument;
  throw $TypeError$b(tryToString(argument) + " is not a constructor");
};
var anObject$r = anObject$D;
var aConstructor$2 = aConstructor$3;
var isNullOrUndefined$a = isNullOrUndefined$e;
var wellKnownSymbol$e = wellKnownSymbol$z;
var SPECIES$2 = wellKnownSymbol$e("species");
var speciesConstructor$6 = function(O, defaultConstructor) {
  var C = anObject$r(O).constructor;
  var S;
  return C === void 0 || isNullOrUndefined$a(S = anObject$r(C)[SPECIES$2]) ? defaultConstructor : aConstructor$2(S);
};
var $$2g = _export;
var uncurryThis$Z = functionUncurryThisClause;
var fails$$ = fails$1p;
var ArrayBufferModule$2 = arrayBuffer;
var anObject$q = anObject$D;
var toAbsoluteIndex$2 = toAbsoluteIndex$a;
var toLength$9 = toLength$d;
var speciesConstructor$5 = speciesConstructor$6;
var ArrayBuffer$3 = ArrayBufferModule$2.ArrayBuffer;
var DataView$2 = ArrayBufferModule$2.DataView;
var DataViewPrototype = DataView$2.prototype;
var nativeArrayBufferSlice = uncurryThis$Z(ArrayBuffer$3.prototype.slice);
var getUint8 = uncurryThis$Z(DataViewPrototype.getUint8);
var setUint8 = uncurryThis$Z(DataViewPrototype.setUint8);
var INCORRECT_SLICE = fails$$(function() {
  return !new ArrayBuffer$3(2).slice(1, void 0).byteLength;
});
$$2g({ target: "ArrayBuffer", proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
  slice: function slice2(start, end) {
    if (nativeArrayBufferSlice && end === void 0) {
      return nativeArrayBufferSlice(anObject$q(this), start);
    }
    var length = anObject$q(this).byteLength;
    var first = toAbsoluteIndex$2(start, length);
    var fin = toAbsoluteIndex$2(end === void 0 ? length : end, length);
    var result = new (speciesConstructor$5(this, ArrayBuffer$3))(toLength$9(fin - first));
    var viewSource = new DataView$2(this);
    var viewTarget = new DataView$2(result);
    var index = 0;
    while (first < fin) {
      setUint8(viewTarget, index++, getUint8(viewSource, first++));
    }
    return result;
  }
});
var $$2f = _export;
var ArrayBufferModule$1 = arrayBuffer;
var NATIVE_ARRAY_BUFFER = arrayBufferBasicDetection;
$$2f({ global: true, constructor: true, forced: !NATIVE_ARRAY_BUFFER }, {
  DataView: ArrayBufferModule$1.DataView
});
var $$2e = _export;
var uncurryThis$Y = functionUncurryThis;
var fails$_ = fails$1p;
var FORCED$r = fails$_(function() {
  return (/* @__PURE__ */ new Date(16e11)).getYear() !== 120;
});
var getFullYear = uncurryThis$Y(Date.prototype.getFullYear);
$$2e({ target: "Date", proto: true, forced: FORCED$r }, {
  getYear: function getYear() {
    return getFullYear(this) - 1900;
  }
});
var $$2d = _export;
var uncurryThis$X = functionUncurryThis;
var $Date = Date;
var thisTimeValue$4 = uncurryThis$X($Date.prototype.getTime);
$$2d({ target: "Date", stat: true }, {
  now: function now() {
    return thisTimeValue$4(new $Date());
  }
});
var $$2c = _export;
var uncurryThis$W = functionUncurryThis;
var toIntegerOrInfinity$a = toIntegerOrInfinity$l;
var DatePrototype$3 = Date.prototype;
var thisTimeValue$3 = uncurryThis$W(DatePrototype$3.getTime);
var setFullYear = uncurryThis$W(DatePrototype$3.setFullYear);
$$2c({ target: "Date", proto: true }, {
  setYear: function setYear(year) {
    thisTimeValue$3(this);
    var yi = toIntegerOrInfinity$a(year);
    var yyyy = 0 <= yi && yi <= 99 ? yi + 1900 : yi;
    return setFullYear(this, yyyy);
  }
});
var $$2b = _export;
$$2b({ target: "Date", proto: true }, {
  toGMTString: Date.prototype.toUTCString
});
var toIntegerOrInfinity$9 = toIntegerOrInfinity$l;
var toString$w = toString$C;
var requireObjectCoercible$i = requireObjectCoercible$l;
var $RangeError$7 = RangeError;
var stringRepeat = function repeat(count) {
  var str = toString$w(requireObjectCoercible$i(this));
  var result = "";
  var n = toIntegerOrInfinity$9(count);
  if (n < 0 || n == Infinity)
    throw $RangeError$7("Wrong number of repetitions");
  for (; n > 0; (n >>>= 1) && (str += str))
    if (n & 1)
      result += str;
  return result;
};
var uncurryThis$V = functionUncurryThis;
var toLength$8 = toLength$d;
var toString$v = toString$C;
var $repeat$2 = stringRepeat;
var requireObjectCoercible$h = requireObjectCoercible$l;
var repeat$3 = uncurryThis$V($repeat$2);
var stringSlice$f = uncurryThis$V("".slice);
var ceil = Math.ceil;
var createMethod$3 = function(IS_END) {
  return function($this, maxLength, fillString) {
    var S = toString$v(requireObjectCoercible$h($this));
    var intMaxLength = toLength$8(maxLength);
    var stringLength = S.length;
    var fillStr = fillString === void 0 ? " " : toString$v(fillString);
    var fillLen, stringFiller;
    if (intMaxLength <= stringLength || fillStr == "")
      return S;
    fillLen = intMaxLength - stringLength;
    stringFiller = repeat$3(fillStr, ceil(fillLen / fillStr.length));
    if (stringFiller.length > fillLen)
      stringFiller = stringSlice$f(stringFiller, 0, fillLen);
    return IS_END ? S + stringFiller : stringFiller + S;
  };
};
var stringPad = {
  // `String.prototype.padStart` method
  // https://tc39.es/ecma262/#sec-string.prototype.padstart
  start: createMethod$3(false),
  // `String.prototype.padEnd` method
  // https://tc39.es/ecma262/#sec-string.prototype.padend
  end: createMethod$3(true)
};
var uncurryThis$U = functionUncurryThis;
var fails$Z = fails$1p;
var padStart = stringPad.start;
var $RangeError$6 = RangeError;
var $isFinite$1 = isFinite;
var abs$7 = Math.abs;
var DatePrototype$2 = Date.prototype;
var nativeDateToISOString = DatePrototype$2.toISOString;
var thisTimeValue$2 = uncurryThis$U(DatePrototype$2.getTime);
var getUTCDate = uncurryThis$U(DatePrototype$2.getUTCDate);
var getUTCFullYear = uncurryThis$U(DatePrototype$2.getUTCFullYear);
var getUTCHours = uncurryThis$U(DatePrototype$2.getUTCHours);
var getUTCMilliseconds = uncurryThis$U(DatePrototype$2.getUTCMilliseconds);
var getUTCMinutes = uncurryThis$U(DatePrototype$2.getUTCMinutes);
var getUTCMonth = uncurryThis$U(DatePrototype$2.getUTCMonth);
var getUTCSeconds = uncurryThis$U(DatePrototype$2.getUTCSeconds);
var dateToIsoString = fails$Z(function() {
  return nativeDateToISOString.call(new Date(-5e13 - 1)) != "0385-07-25T07:06:39.999Z";
}) || !fails$Z(function() {
  nativeDateToISOString.call(/* @__PURE__ */ new Date(NaN));
}) ? function toISOString() {
  if (!$isFinite$1(thisTimeValue$2(this)))
    throw $RangeError$6("Invalid time value");
  var date = this;
  var year = getUTCFullYear(date);
  var milliseconds = getUTCMilliseconds(date);
  var sign3 = year < 0 ? "-" : year > 9999 ? "+" : "";
  return sign3 + padStart(abs$7(year), sign3 ? 6 : 4, 0) + "-" + padStart(getUTCMonth(date) + 1, 2, 0) + "-" + padStart(getUTCDate(date), 2, 0) + "T" + padStart(getUTCHours(date), 2, 0) + ":" + padStart(getUTCMinutes(date), 2, 0) + ":" + padStart(getUTCSeconds(date), 2, 0) + "." + padStart(milliseconds, 3, 0) + "Z";
} : nativeDateToISOString;
var $$2a = _export;
var toISOString2 = dateToIsoString;
$$2a({ target: "Date", proto: true, forced: Date.prototype.toISOString !== toISOString2 }, {
  toISOString: toISOString2
});
var $$29 = _export;
var fails$Y = fails$1p;
var toObject$b = toObject$t;
var toPrimitive$2 = toPrimitive$4;
var FORCED$q = fails$Y(function() {
  return (/* @__PURE__ */ new Date(NaN)).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function() {
    return 1;
  } }) !== 1;
});
$$29({ target: "Date", proto: true, arity: 1, forced: FORCED$q }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  toJSON: function toJSON(key) {
    var O = toObject$b(this);
    var pv = toPrimitive$2(O, "number");
    return typeof pv == "number" && !isFinite(pv) ? null : O.toISOString();
  }
});
var anObject$p = anObject$D;
var ordinaryToPrimitive = ordinaryToPrimitive$2;
var $TypeError$a = TypeError;
var dateToPrimitive$1 = function(hint) {
  anObject$p(this);
  if (hint === "string" || hint === "default")
    hint = "string";
  else if (hint !== "number")
    throw $TypeError$a("Incorrect hint");
  return ordinaryToPrimitive(this, hint);
};
var hasOwn$g = hasOwnProperty_1;
var defineBuiltIn$f = defineBuiltIn$o;
var dateToPrimitive = dateToPrimitive$1;
var wellKnownSymbol$d = wellKnownSymbol$z;
var TO_PRIMITIVE = wellKnownSymbol$d("toPrimitive");
var DatePrototype$1 = Date.prototype;
if (!hasOwn$g(DatePrototype$1, TO_PRIMITIVE)) {
  defineBuiltIn$f(DatePrototype$1, TO_PRIMITIVE, dateToPrimitive);
}
var uncurryThis$T = functionUncurryThis;
var defineBuiltIn$e = defineBuiltIn$o;
var DatePrototype = Date.prototype;
var INVALID_DATE = "Invalid Date";
var TO_STRING$1 = "toString";
var nativeDateToString = uncurryThis$T(DatePrototype[TO_STRING$1]);
var thisTimeValue$1 = uncurryThis$T(DatePrototype.getTime);
if (String(/* @__PURE__ */ new Date(NaN)) != INVALID_DATE) {
  defineBuiltIn$e(DatePrototype, TO_STRING$1, function toString7() {
    var value = thisTimeValue$1(this);
    return value === value ? nativeDateToString(this) : INVALID_DATE;
  });
}
var $$28 = _export;
var uncurryThis$S = functionUncurryThis;
var toString$u = toString$C;
var charAt$e = uncurryThis$S("".charAt);
var charCodeAt$6 = uncurryThis$S("".charCodeAt);
var exec$8 = uncurryThis$S(/./.exec);
var numberToString$1 = uncurryThis$S(1 .toString);
var toUpperCase = uncurryThis$S("".toUpperCase);
var raw = /[\w*+\-./@]/;
var hex$1 = function(code, length) {
  var result = numberToString$1(code, 16);
  while (result.length < length)
    result = "0" + result;
  return result;
};
$$28({ global: true }, {
  escape: function escape(string) {
    var str = toString$u(string);
    var result = "";
    var length = str.length;
    var index = 0;
    var chr, code;
    while (index < length) {
      chr = charAt$e(str, index++);
      if (exec$8(raw, chr)) {
        result += chr;
      } else {
        code = charCodeAt$6(chr, 0);
        if (code < 256) {
          result += "%" + hex$1(code, 2);
        } else {
          result += "%u" + toUpperCase(hex$1(code, 4));
        }
      }
    }
    return result;
  }
});
var uncurryThis$R = functionUncurryThis;
var aCallable$c = aCallable$l;
var isObject$m = isObject$z;
var hasOwn$f = hasOwnProperty_1;
var arraySlice$6 = arraySlice$a;
var NATIVE_BIND = functionBindNative;
var $Function = Function;
var concat$2 = uncurryThis$R([].concat);
var join$7 = uncurryThis$R([].join);
var factories = {};
var construct = function(C, argsLength, args) {
  if (!hasOwn$f(factories, argsLength)) {
    for (var list = [], i = 0; i < argsLength; i++)
      list[i] = "a[" + i + "]";
    factories[argsLength] = $Function("C,a", "return new C(" + join$7(list, ",") + ")");
  }
  return factories[argsLength](C, args);
};
var functionBind = NATIVE_BIND ? $Function.bind : function bind(that) {
  var F = aCallable$c(this);
  var Prototype2 = F.prototype;
  var partArgs = arraySlice$6(arguments, 1);
  var boundFunction = function bound() {
    var args = concat$2(partArgs, arraySlice$6(arguments));
    return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args);
  };
  if (isObject$m(Prototype2))
    boundFunction.prototype = Prototype2;
  return boundFunction;
};
var $$27 = _export;
var bind$8 = functionBind;
$$27({ target: "Function", proto: true, forced: Function.bind !== bind$8 }, {
  bind: bind$8
});
var isCallable$d = isCallable$z;
var isObject$l = isObject$z;
var definePropertyModule$5 = objectDefineProperty;
var getPrototypeOf$5 = objectGetPrototypeOf$2;
var wellKnownSymbol$c = wellKnownSymbol$z;
var makeBuiltIn = makeBuiltInExports;
var HAS_INSTANCE = wellKnownSymbol$c("hasInstance");
var FunctionPrototype$1 = Function.prototype;
if (!(HAS_INSTANCE in FunctionPrototype$1)) {
  definePropertyModule$5.f(FunctionPrototype$1, HAS_INSTANCE, { value: makeBuiltIn(function(O) {
    if (!isCallable$d(this) || !isObject$l(O))
      return false;
    var P = this.prototype;
    if (!isObject$l(P))
      return O instanceof this;
    while (O = getPrototypeOf$5(O))
      if (P === O)
        return true;
    return false;
  }, HAS_INSTANCE) });
}
var DESCRIPTORS$s = descriptors;
var FUNCTION_NAME_EXISTS = functionName.EXISTS;
var uncurryThis$Q = functionUncurryThis;
var defineBuiltInAccessor$b = defineBuiltInAccessor$h;
var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis$Q(FunctionPrototype.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec$4 = uncurryThis$Q(nameRE.exec);
var NAME = "name";
if (DESCRIPTORS$s && !FUNCTION_NAME_EXISTS) {
  defineBuiltInAccessor$b(FunctionPrototype, NAME, {
    configurable: true,
    get: function() {
      try {
        return regExpExec$4(nameRE, functionToString(this))[1];
      } catch (error) {
        return "";
      }
    }
  });
}
var $$26 = _export;
var global$H = global$_;
$$26({ global: true, forced: global$H.globalThis !== global$H }, {
  globalThis: global$H
});
var global$G = global$_;
var setToStringTag$7 = setToStringTag$d;
setToStringTag$7(global$G.JSON, "JSON", true);
var internalMetadata = { exports: {} };
var fails$X = fails$1p;
var arrayBufferNonExtensible = fails$X(function() {
  if (typeof ArrayBuffer == "function") {
    var buffer = new ArrayBuffer(8);
    if (Object.isExtensible(buffer))
      Object.defineProperty(buffer, "a", { value: 8 });
  }
});
var fails$W = fails$1p;
var isObject$k = isObject$z;
var classof$d = classofRaw$2;
var ARRAY_BUFFER_NON_EXTENSIBLE$2 = arrayBufferNonExtensible;
var $isExtensible$2 = Object.isExtensible;
var FAILS_ON_PRIMITIVES$6 = fails$W(function() {
  $isExtensible$2(1);
});
var objectIsExtensible = FAILS_ON_PRIMITIVES$6 || ARRAY_BUFFER_NON_EXTENSIBLE$2 ? function isExtensible(it) {
  if (!isObject$k(it))
    return false;
  if (ARRAY_BUFFER_NON_EXTENSIBLE$2 && classof$d(it) == "ArrayBuffer")
    return false;
  return $isExtensible$2 ? $isExtensible$2(it) : true;
} : $isExtensible$2;
var fails$V = fails$1p;
var freezing = !fails$V(function() {
  return Object.isExtensible(Object.preventExtensions({}));
});
var $$25 = _export;
var uncurryThis$P = functionUncurryThis;
var hiddenKeys = hiddenKeys$6;
var isObject$j = isObject$z;
var hasOwn$e = hasOwnProperty_1;
var defineProperty$6 = objectDefineProperty.f;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertyNamesExternalModule = objectGetOwnPropertyNamesExternal;
var isExtensible$1 = objectIsExtensible;
var uid$1 = uid$6;
var FREEZING$5 = freezing;
var REQUIRED = false;
var METADATA = uid$1("meta");
var id$1 = 0;
var setMetadata = function(it) {
  defineProperty$6(it, METADATA, { value: {
    objectID: "O" + id$1++,
    // object ID
    weakData: {}
    // weak collections IDs
  } });
};
var fastKey$1 = function(it, create4) {
  if (!isObject$j(it))
    return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;
  if (!hasOwn$e(it, METADATA)) {
    if (!isExtensible$1(it))
      return "F";
    if (!create4)
      return "E";
    setMetadata(it);
  }
  return it[METADATA].objectID;
};
var getWeakData$1 = function(it, create4) {
  if (!hasOwn$e(it, METADATA)) {
    if (!isExtensible$1(it))
      return true;
    if (!create4)
      return false;
    setMetadata(it);
  }
  return it[METADATA].weakData;
};
var onFreeze$3 = function(it) {
  if (FREEZING$5 && REQUIRED && isExtensible$1(it) && !hasOwn$e(it, METADATA))
    setMetadata(it);
  return it;
};
var enable = function() {
  meta.enable = function() {
  };
  REQUIRED = true;
  var getOwnPropertyNames5 = getOwnPropertyNamesModule.f;
  var splice3 = uncurryThis$P([].splice);
  var test2 = {};
  test2[METADATA] = 1;
  if (getOwnPropertyNames5(test2).length) {
    getOwnPropertyNamesModule.f = function(it) {
      var result = getOwnPropertyNames5(it);
      for (var i = 0, length = result.length; i < length; i++) {
        if (result[i] === METADATA) {
          splice3(result, i, 1);
          break;
        }
      }
      return result;
    };
    $$25({ target: "Object", stat: true, forced: true }, {
      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
    });
  }
};
var meta = internalMetadata.exports = {
  enable,
  fastKey: fastKey$1,
  getWeakData: getWeakData$1,
  onFreeze: onFreeze$3
};
hiddenKeys[METADATA] = true;
var internalMetadataExports = internalMetadata.exports;
var $$24 = _export;
var global$F = global$_;
var uncurryThis$O = functionUncurryThis;
var isForced$3 = isForced_1;
var defineBuiltIn$d = defineBuiltIn$o;
var InternalMetadataModule$1 = internalMetadataExports;
var iterate$8 = iterate$a;
var anInstance$8 = anInstance$a;
var isCallable$c = isCallable$z;
var isNullOrUndefined$9 = isNullOrUndefined$e;
var isObject$i = isObject$z;
var fails$U = fails$1p;
var checkCorrectnessOfIteration$2 = checkCorrectnessOfIteration$4;
var setToStringTag$6 = setToStringTag$d;
var inheritIfRequired$4 = inheritIfRequired$6;
var collection$4 = function(CONSTRUCTOR_NAME, wrapper2, common) {
  var IS_MAP = CONSTRUCTOR_NAME.indexOf("Map") !== -1;
  var IS_WEAK = CONSTRUCTOR_NAME.indexOf("Weak") !== -1;
  var ADDER = IS_MAP ? "set" : "add";
  var NativeConstructor = global$F[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor2 = NativeConstructor;
  var exported = {};
  var fixMethod = function(KEY) {
    var uncurriedNativeMethod = uncurryThis$O(NativePrototype[KEY]);
    defineBuiltIn$d(
      NativePrototype,
      KEY,
      KEY == "add" ? function add(value) {
        uncurriedNativeMethod(this, value === 0 ? 0 : value);
        return this;
      } : KEY == "delete" ? function(key) {
        return IS_WEAK && !isObject$i(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == "get" ? function get3(key) {
        return IS_WEAK && !isObject$i(key) ? void 0 : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : KEY == "has" ? function has4(key) {
        return IS_WEAK && !isObject$i(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key);
      } : function set4(key, value) {
        uncurriedNativeMethod(this, key === 0 ? 0 : key, value);
        return this;
      }
    );
  };
  var REPLACE2 = isForced$3(
    CONSTRUCTOR_NAME,
    !isCallable$c(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails$U(function() {
      new NativeConstructor().entries().next();
    }))
  );
  if (REPLACE2) {
    Constructor2 = common.getConstructor(wrapper2, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    InternalMetadataModule$1.enable();
  } else if (isForced$3(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor2();
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    var THROWS_ON_PRIMITIVES = fails$U(function() {
      instance.has(1);
    });
    var ACCEPT_ITERABLES = checkCorrectnessOfIteration$2(function(iterable) {
      new NativeConstructor(iterable);
    });
    var BUGGY_ZERO = !IS_WEAK && fails$U(function() {
      var $instance = new NativeConstructor();
      var index = 5;
      while (index--)
        $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      Constructor2 = wrapper2(function(dummy, iterable) {
        anInstance$8(dummy, NativePrototype);
        var that = inheritIfRequired$4(new NativeConstructor(), dummy, Constructor2);
        if (!isNullOrUndefined$9(iterable))
          iterate$8(iterable, that[ADDER], { that, AS_ENTRIES: IS_MAP });
        return that;
      });
      Constructor2.prototype = NativePrototype;
      NativePrototype.constructor = Constructor2;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod("delete");
      fixMethod("has");
      IS_MAP && fixMethod("get");
    }
    if (BUGGY_ZERO || HASNT_CHAINING)
      fixMethod(ADDER);
    if (IS_WEAK && NativePrototype.clear)
      delete NativePrototype.clear;
  }
  exported[CONSTRUCTOR_NAME] = Constructor2;
  $$24({ global: true, constructor: true, forced: Constructor2 != NativeConstructor }, exported);
  setToStringTag$6(Constructor2, CONSTRUCTOR_NAME);
  if (!IS_WEAK)
    common.setStrong(Constructor2, CONSTRUCTOR_NAME, IS_MAP);
  return Constructor2;
};
var create$6 = objectCreate;
var defineBuiltInAccessor$a = defineBuiltInAccessor$h;
var defineBuiltIns$3 = defineBuiltIns$5;
var bind$7 = functionBindContext;
var anInstance$7 = anInstance$a;
var isNullOrUndefined$8 = isNullOrUndefined$e;
var iterate$7 = iterate$a;
var defineIterator$1 = iteratorDefine;
var createIterResultObject$2 = createIterResultObject$4;
var setSpecies$3 = setSpecies$6;
var DESCRIPTORS$r = descriptors;
var fastKey = internalMetadataExports.fastKey;
var InternalStateModule$8 = internalState;
var setInternalState$8 = InternalStateModule$8.set;
var internalStateGetterFor$1 = InternalStateModule$8.getterFor;
var collectionStrong$2 = {
  getConstructor: function(wrapper2, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor2 = wrapper2(function(that, iterable) {
      anInstance$7(that, Prototype2);
      setInternalState$8(that, {
        type: CONSTRUCTOR_NAME,
        index: create$6(null),
        first: void 0,
        last: void 0,
        size: 0
      });
      if (!DESCRIPTORS$r)
        that.size = 0;
      if (!isNullOrUndefined$8(iterable))
        iterate$7(iterable, that[ADDER], { that, AS_ENTRIES: IS_MAP });
    });
    var Prototype2 = Constructor2.prototype;
    var getInternalState2 = internalStateGetterFor$1(CONSTRUCTOR_NAME);
    var define = function(that, key, value) {
      var state = getInternalState2(that);
      var entry = getEntry(that, key);
      var previous, index;
      if (entry) {
        entry.value = value;
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key,
          value,
          previous: previous = state.last,
          next: void 0,
          removed: false
        };
        if (!state.first)
          state.first = entry;
        if (previous)
          previous.next = entry;
        if (DESCRIPTORS$r)
          state.size++;
        else
          that.size++;
        if (index !== "F")
          state.index[index] = entry;
      }
      return that;
    };
    var getEntry = function(that, key) {
      var state = getInternalState2(that);
      var index = fastKey(key);
      var entry;
      if (index !== "F")
        return state.index[index];
      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key)
          return entry;
      }
    };
    defineBuiltIns$3(Prototype2, {
      // `{ Map, Set }.prototype.clear()` methods
      // https://tc39.es/ecma262/#sec-map.prototype.clear
      // https://tc39.es/ecma262/#sec-set.prototype.clear
      clear: function clear2() {
        var that = this;
        var state = getInternalState2(that);
        var data2 = state.index;
        var entry = state.first;
        while (entry) {
          entry.removed = true;
          if (entry.previous)
            entry.previous = entry.previous.next = void 0;
          delete data2[entry.index];
          entry = entry.next;
        }
        state.first = state.last = void 0;
        if (DESCRIPTORS$r)
          state.size = 0;
        else
          that.size = 0;
      },
      // `{ Map, Set }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.delete
      // https://tc39.es/ecma262/#sec-set.prototype.delete
      "delete": function(key) {
        var that = this;
        var state = getInternalState2(that);
        var entry = getEntry(that, key);
        if (entry) {
          var next4 = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev)
            prev.next = next4;
          if (next4)
            next4.previous = prev;
          if (state.first == entry)
            state.first = next4;
          if (state.last == entry)
            state.last = prev;
          if (DESCRIPTORS$r)
            state.size--;
          else
            that.size--;
        }
        return !!entry;
      },
      // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.foreach
      // https://tc39.es/ecma262/#sec-set.prototype.foreach
      forEach: function forEach5(callbackfn) {
        var state = getInternalState2(this);
        var boundFunction = bind$7(callbackfn, arguments.length > 1 ? arguments[1] : void 0);
        var entry;
        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this);
          while (entry && entry.removed)
            entry = entry.previous;
        }
      },
      // `{ Map, Set}.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-map.prototype.has
      // https://tc39.es/ecma262/#sec-set.prototype.has
      has: function has4(key) {
        return !!getEntry(this, key);
      }
    });
    defineBuiltIns$3(Prototype2, IS_MAP ? {
      // `Map.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-map.prototype.get
      get: function get3(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // `Map.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-map.prototype.set
      set: function set4(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // `Set.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-set.prototype.add
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (DESCRIPTORS$r)
      defineBuiltInAccessor$a(Prototype2, "size", {
        configurable: true,
        get: function() {
          return getInternalState2(this).size;
        }
      });
    return Constructor2;
  },
  setStrong: function(Constructor2, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + " Iterator";
    var getInternalCollectionState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
    var getInternalIteratorState2 = internalStateGetterFor$1(ITERATOR_NAME);
    defineIterator$1(Constructor2, CONSTRUCTOR_NAME, function(iterated, kind) {
      setInternalState$8(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind,
        last: void 0
      });
    }, function() {
      var state = getInternalIteratorState2(this);
      var kind = state.kind;
      var entry = state.last;
      while (entry && entry.removed)
        entry = entry.previous;
      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        state.target = void 0;
        return createIterResultObject$2(void 0, true);
      }
      if (kind == "keys")
        return createIterResultObject$2(entry.key, false);
      if (kind == "values")
        return createIterResultObject$2(entry.value, false);
      return createIterResultObject$2([entry.key, entry.value], false);
    }, IS_MAP ? "entries" : "values", !IS_MAP, true);
    setSpecies$3(CONSTRUCTOR_NAME);
  }
};
var collection$3 = collection$4;
var collectionStrong$1 = collectionStrong$2;
collection$3("Map", function(init) {
  return function Map2() {
    return init(this, arguments.length ? arguments[0] : void 0);
  };
}, collectionStrong$1);
var log$7 = Math.log;
var mathLog1p = Math.log1p || function log1p(x) {
  var n = +x;
  return n > -1e-8 && n < 1e-8 ? n - n * n / 2 : log$7(1 + n);
};
var $$23 = _export;
var log1p$1 = mathLog1p;
var $acosh = Math.acosh;
var log$6 = Math.log;
var sqrt$2 = Math.sqrt;
var LN2$1 = Math.LN2;
var FORCED$p = !$acosh || Math.floor($acosh(Number.MAX_VALUE)) != 710 || $acosh(Infinity) != Infinity;
$$23({ target: "Math", stat: true, forced: FORCED$p }, {
  acosh: function acosh(x) {
    var n = +x;
    return n < 1 ? NaN : n > 9490626562425156e-8 ? log$6(n) + LN2$1 : log1p$1(n - 1 + sqrt$2(n - 1) * sqrt$2(n + 1));
  }
});
var $$22 = _export;
var $asinh = Math.asinh;
var log$5 = Math.log;
var sqrt$1 = Math.sqrt;
function asinh(x) {
  var n = +x;
  return !isFinite(n) || n == 0 ? n : n < 0 ? -asinh(-n) : log$5(n + sqrt$1(n * n + 1));
}
var FORCED$o = !($asinh && 1 / $asinh(0) > 0);
$$22({ target: "Math", stat: true, forced: FORCED$o }, {
  asinh
});
var $$21 = _export;
var $atanh = Math.atanh;
var log$4 = Math.log;
var FORCED$n = !($atanh && 1 / $atanh(-0) < 0);
$$21({ target: "Math", stat: true, forced: FORCED$n }, {
  atanh: function atanh(x) {
    var n = +x;
    return n == 0 ? n : log$4((1 + n) / (1 - n)) / 2;
  }
});
var mathSign = Math.sign || function sign(x) {
  var n = +x;
  return n == 0 || n != n ? n : n < 0 ? -1 : 1;
};
var $$20 = _export;
var sign$2 = mathSign;
var abs$6 = Math.abs;
var pow$4 = Math.pow;
$$20({ target: "Math", stat: true }, {
  cbrt: function cbrt(x) {
    var n = +x;
    return sign$2(n) * pow$4(abs$6(n), 1 / 3);
  }
});
var $$1$ = _export;
var floor$7 = Math.floor;
var log$3 = Math.log;
var LOG2E = Math.LOG2E;
$$1$({ target: "Math", stat: true }, {
  clz32: function clz32(x) {
    var n = x >>> 0;
    return n ? 31 - floor$7(log$3(n + 0.5) * LOG2E) : 32;
  }
});
var $expm1 = Math.expm1;
var exp$2 = Math.exp;
var mathExpm1 = !$expm1 || $expm1(10) > 22025.465794806718 || $expm1(10) < 22025.465794806718 || $expm1(-2e-17) != -2e-17 ? function expm1(x) {
  var n = +x;
  return n == 0 ? n : n > -1e-6 && n < 1e-6 ? n + n * n / 2 : exp$2(n) - 1;
} : $expm1;
var $$1_ = _export;
var expm1$3 = mathExpm1;
var $cosh = Math.cosh;
var abs$5 = Math.abs;
var E$1 = Math.E;
var FORCED$m = !$cosh || $cosh(710) === Infinity;
$$1_({ target: "Math", stat: true, forced: FORCED$m }, {
  cosh: function cosh(x) {
    var t = expm1$3(abs$5(x) - 1) + 1;
    return (t + 1 / (t * E$1 * E$1)) * (E$1 / 2);
  }
});
var $$1Z = _export;
var expm1$2 = mathExpm1;
$$1Z({ target: "Math", stat: true, forced: expm1$2 != Math.expm1 }, { expm1: expm1$2 });
var sign$1 = mathSign;
var abs$4 = Math.abs;
var pow$3 = Math.pow;
var EPSILON = pow$3(2, -52);
var EPSILON32 = pow$3(2, -23);
var MAX32 = pow$3(2, 127) * (2 - EPSILON32);
var MIN32 = pow$3(2, -126);
var roundTiesToEven = function(n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};
var mathFround = Math.fround || function fround(x) {
  var n = +x;
  var $abs = abs$4(n);
  var $sign = sign$1(n);
  var a, result;
  if ($abs < MIN32)
    return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  if (result > MAX32 || result != result)
    return $sign * Infinity;
  return $sign * result;
};
var $$1Y = _export;
var fround2 = mathFround;
$$1Y({ target: "Math", stat: true }, { fround: fround2 });
var $$1X = _export;
var $hypot = Math.hypot;
var abs$3 = Math.abs;
var sqrt = Math.sqrt;
var FORCED$l = !!$hypot && $hypot(Infinity, NaN) !== Infinity;
$$1X({ target: "Math", stat: true, arity: 2, forced: FORCED$l }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  hypot: function hypot(value1, value2) {
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs$3(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else
        sum += arg;
    }
    return larg === Infinity ? Infinity : larg * sqrt(sum);
  }
});
var $$1W = _export;
var fails$T = fails$1p;
var $imul = Math.imul;
var FORCED$k = fails$T(function() {
  return $imul(4294967295, 5) != -5 || $imul.length != 2;
});
$$1W({ target: "Math", stat: true, forced: FORCED$k }, {
  imul: function imul(x, y) {
    var UINT16 = 65535;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});
var log$2 = Math.log;
var LOG10E = Math.LOG10E;
var mathLog10 = Math.log10 || function log10(x) {
  return log$2(x) * LOG10E;
};
var $$1V = _export;
var log10$1 = mathLog10;
$$1V({ target: "Math", stat: true }, {
  log10: log10$1
});
var $$1U = _export;
var log1p2 = mathLog1p;
$$1U({ target: "Math", stat: true }, { log1p: log1p2 });
var $$1T = _export;
var log$1 = Math.log;
var LN2 = Math.LN2;
$$1T({ target: "Math", stat: true }, {
  log2: function log2(x) {
    return log$1(x) / LN2;
  }
});
var $$1S = _export;
var sign2 = mathSign;
$$1S({ target: "Math", stat: true }, {
  sign: sign2
});
var $$1R = _export;
var fails$S = fails$1p;
var expm1$1 = mathExpm1;
var abs$2 = Math.abs;
var exp$1 = Math.exp;
var E = Math.E;
var FORCED$j = fails$S(function() {
  return Math.sinh(-2e-17) != -2e-17;
});
$$1R({ target: "Math", stat: true, forced: FORCED$j }, {
  sinh: function sinh(x) {
    var n = +x;
    return abs$2(n) < 1 ? (expm1$1(n) - expm1$1(-n)) / 2 : (exp$1(n - 1) - exp$1(-n - 1)) * (E / 2);
  }
});
var $$1Q = _export;
var expm12 = mathExpm1;
var exp = Math.exp;
$$1Q({ target: "Math", stat: true }, {
  tanh: function tanh(x) {
    var n = +x;
    var a = expm12(n);
    var b = expm12(-n);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(n) + exp(-n));
  }
});
var setToStringTag$5 = setToStringTag$d;
setToStringTag$5(Math, "Math", true);
var $$1P = _export;
var trunc2 = mathTrunc;
$$1P({ target: "Math", stat: true }, {
  trunc: trunc2
});
var uncurryThis$N = functionUncurryThis;
var thisNumberValue$5 = uncurryThis$N(1 .valueOf);
var whitespaces$5 = "	\n\v\f\r                　\u2028\u2029\uFEFF";
var uncurryThis$M = functionUncurryThis;
var requireObjectCoercible$g = requireObjectCoercible$l;
var toString$t = toString$C;
var whitespaces$4 = whitespaces$5;
var replace$8 = uncurryThis$M("".replace);
var ltrim = RegExp("^[" + whitespaces$4 + "]+");
var rtrim = RegExp("(^|[^" + whitespaces$4 + "])[" + whitespaces$4 + "]+$");
var createMethod$2 = function(TYPE) {
  return function($this) {
    var string = toString$t(requireObjectCoercible$g($this));
    if (TYPE & 1)
      string = replace$8(string, ltrim, "");
    if (TYPE & 2)
      string = replace$8(string, rtrim, "$1");
    return string;
  };
};
var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  start: createMethod$2(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  end: createMethod$2(2),
  // `String.prototype.trim` method
  // https://tc39.es/ecma262/#sec-string.prototype.trim
  trim: createMethod$2(3)
};
var $$1O = _export;
var IS_PURE$2 = isPure;
var DESCRIPTORS$q = descriptors;
var global$E = global$_;
var path = path$2;
var uncurryThis$L = functionUncurryThis;
var isForced$2 = isForced_1;
var hasOwn$d = hasOwnProperty_1;
var inheritIfRequired$3 = inheritIfRequired$6;
var isPrototypeOf$3 = objectIsPrototypeOf;
var isSymbol$2 = isSymbol$7;
var toPrimitive$1 = toPrimitive$4;
var fails$R = fails$1p;
var getOwnPropertyNames$3 = objectGetOwnPropertyNames.f;
var getOwnPropertyDescriptor$7 = objectGetOwnPropertyDescriptor.f;
var defineProperty$5 = objectDefineProperty.f;
var thisNumberValue$4 = thisNumberValue$5;
var trim$2 = stringTrim.trim;
var NUMBER = "Number";
var NativeNumber = global$E[NUMBER];
path[NUMBER];
var NumberPrototype = NativeNumber.prototype;
var TypeError$5 = global$E.TypeError;
var stringSlice$e = uncurryThis$L("".slice);
var charCodeAt$5 = uncurryThis$L("".charCodeAt);
var toNumeric = function(value) {
  var primValue = toPrimitive$1(value, "number");
  return typeof primValue == "bigint" ? primValue : toNumber(primValue);
};
var toNumber = function(argument) {
  var it = toPrimitive$1(argument, "number");
  var first, third, radix, maxCode, digits, length, index, code;
  if (isSymbol$2(it))
    throw TypeError$5("Cannot convert a Symbol value to a number");
  if (typeof it == "string" && it.length > 2) {
    it = trim$2(it);
    first = charCodeAt$5(it, 0);
    if (first === 43 || first === 45) {
      third = charCodeAt$5(it, 2);
      if (third === 88 || third === 120)
        return NaN;
    } else if (first === 48) {
      switch (charCodeAt$5(it, 1)) {
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        default:
          return +it;
      }
      digits = stringSlice$e(it, 2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = charCodeAt$5(digits, index);
        if (code < 48 || code > maxCode)
          return NaN;
      }
      return parseInt(digits, radix);
    }
  }
  return +it;
};
var FORCED$i = isForced$2(NUMBER, !NativeNumber(" 0o1") || !NativeNumber("0b1") || NativeNumber("+0x1"));
var calledWithNew = function(dummy) {
  return isPrototypeOf$3(NumberPrototype, dummy) && fails$R(function() {
    thisNumberValue$4(dummy);
  });
};
var NumberWrapper = function Number2(value) {
  var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value));
  return calledWithNew(this) ? inheritIfRequired$3(Object(n), this, NumberWrapper) : n;
};
NumberWrapper.prototype = NumberPrototype;
if (FORCED$i && !IS_PURE$2)
  NumberPrototype.constructor = NumberWrapper;
$$1O({ global: true, constructor: true, wrap: true, forced: FORCED$i }, {
  Number: NumberWrapper
});
var copyConstructorProperties = function(target, source) {
  for (var keys5 = DESCRIPTORS$q ? getOwnPropertyNames$3(source) : (
    // ES3:
    "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(",")
  ), j = 0, key; keys5.length > j; j++) {
    if (hasOwn$d(source, key = keys5[j]) && !hasOwn$d(target, key)) {
      defineProperty$5(target, key, getOwnPropertyDescriptor$7(source, key));
    }
  }
};
if (FORCED$i || IS_PURE$2)
  copyConstructorProperties(path[NUMBER], NativeNumber);
var $$1N = _export;
$$1N({ target: "Number", stat: true, nonConfigurable: true, nonWritable: true }, {
  EPSILON: Math.pow(2, -52)
});
var global$D = global$_;
var globalIsFinite = global$D.isFinite;
var numberIsFinite$1 = Number.isFinite || function isFinite2(it) {
  return typeof it == "number" && globalIsFinite(it);
};
var $$1M = _export;
var numberIsFinite = numberIsFinite$1;
$$1M({ target: "Number", stat: true }, { isFinite: numberIsFinite });
var isObject$h = isObject$z;
var floor$6 = Math.floor;
var isIntegralNumber$3 = Number.isInteger || function isInteger(it) {
  return !isObject$h(it) && isFinite(it) && floor$6(it) === it;
};
var $$1L = _export;
var isIntegralNumber$2 = isIntegralNumber$3;
$$1L({ target: "Number", stat: true }, {
  isInteger: isIntegralNumber$2
});
var $$1K = _export;
$$1K({ target: "Number", stat: true }, {
  isNaN: function isNaN2(number) {
    return number != number;
  }
});
var $$1J = _export;
var isIntegralNumber$1 = isIntegralNumber$3;
var abs$1 = Math.abs;
$$1J({ target: "Number", stat: true }, {
  isSafeInteger: function isSafeInteger(number) {
    return isIntegralNumber$1(number) && abs$1(number) <= 9007199254740991;
  }
});
var $$1I = _export;
$$1I({ target: "Number", stat: true, nonConfigurable: true, nonWritable: true }, {
  MAX_SAFE_INTEGER: 9007199254740991
});
var $$1H = _export;
$$1H({ target: "Number", stat: true, nonConfigurable: true, nonWritable: true }, {
  MIN_SAFE_INTEGER: -9007199254740991
});
var global$C = global$_;
var fails$Q = fails$1p;
var uncurryThis$K = functionUncurryThis;
var toString$s = toString$C;
var trim$1 = stringTrim.trim;
var whitespaces$3 = whitespaces$5;
var charAt$d = uncurryThis$K("".charAt);
var $parseFloat$1 = global$C.parseFloat;
var Symbol$2 = global$C.Symbol;
var ITERATOR$5 = Symbol$2 && Symbol$2.iterator;
var FORCED$h = 1 / $parseFloat$1(whitespaces$3 + "-0") !== -Infinity || ITERATOR$5 && !fails$Q(function() {
  $parseFloat$1(Object(ITERATOR$5));
});
var numberParseFloat = FORCED$h ? function parseFloat2(string) {
  var trimmedString = trim$1(toString$s(string));
  var result = $parseFloat$1(trimmedString);
  return result === 0 && charAt$d(trimmedString, 0) == "-" ? -0 : result;
} : $parseFloat$1;
var $$1G = _export;
var parseFloat$1 = numberParseFloat;
$$1G({ target: "Number", stat: true, forced: Number.parseFloat != parseFloat$1 }, {
  parseFloat: parseFloat$1
});
var global$B = global$_;
var fails$P = fails$1p;
var uncurryThis$J = functionUncurryThis;
var toString$r = toString$C;
var trim = stringTrim.trim;
var whitespaces$2 = whitespaces$5;
var $parseInt$1 = global$B.parseInt;
var Symbol$1 = global$B.Symbol;
var ITERATOR$4 = Symbol$1 && Symbol$1.iterator;
var hex = /^[+-]?0x/i;
var exec$7 = uncurryThis$J(hex.exec);
var FORCED$g = $parseInt$1(whitespaces$2 + "08") !== 8 || $parseInt$1(whitespaces$2 + "0x16") !== 22 || ITERATOR$4 && !fails$P(function() {
  $parseInt$1(Object(ITERATOR$4));
});
var numberParseInt = FORCED$g ? function parseInt2(string, radix) {
  var S = trim(toString$r(string));
  return $parseInt$1(S, radix >>> 0 || (exec$7(hex, S) ? 16 : 10));
} : $parseInt$1;
var $$1F = _export;
var parseInt$2 = numberParseInt;
$$1F({ target: "Number", stat: true, forced: Number.parseInt != parseInt$2 }, {
  parseInt: parseInt$2
});
var $$1E = _export;
var uncurryThis$I = functionUncurryThis;
var toIntegerOrInfinity$8 = toIntegerOrInfinity$l;
var thisNumberValue$3 = thisNumberValue$5;
var $repeat$1 = stringRepeat;
var log102 = mathLog10;
var fails$O = fails$1p;
var $RangeError$5 = RangeError;
var $String$1 = String;
var $isFinite = isFinite;
var abs = Math.abs;
var floor$5 = Math.floor;
var pow$2 = Math.pow;
var round$1 = Math.round;
var nativeToExponential = uncurryThis$I(1 .toExponential);
var repeat$2 = uncurryThis$I($repeat$1);
var stringSlice$d = uncurryThis$I("".slice);
var ROUNDS_PROPERLY = nativeToExponential(-69e-12, 4) === "-6.9000e-11" && nativeToExponential(1.255, 2) === "1.25e+0" && nativeToExponential(12345, 3) === "1.235e+4" && nativeToExponential(25, 0) === "3e+1";
var throwsOnInfinityFraction = function() {
  return fails$O(function() {
    nativeToExponential(1, Infinity);
  }) && fails$O(function() {
    nativeToExponential(1, -Infinity);
  });
};
var properNonFiniteThisCheck = function() {
  return !fails$O(function() {
    nativeToExponential(Infinity, Infinity);
    nativeToExponential(NaN, Infinity);
  });
};
var FORCED$f = !ROUNDS_PROPERLY || !throwsOnInfinityFraction() || !properNonFiniteThisCheck();
$$1E({ target: "Number", proto: true, forced: FORCED$f }, {
  toExponential: function toExponential(fractionDigits) {
    var x = thisNumberValue$3(this);
    if (fractionDigits === void 0)
      return nativeToExponential(x);
    var f = toIntegerOrInfinity$8(fractionDigits);
    if (!$isFinite(x))
      return String(x);
    if (f < 0 || f > 20)
      throw $RangeError$5("Incorrect fraction digits");
    if (ROUNDS_PROPERLY)
      return nativeToExponential(x, f);
    var s = "";
    var m = "";
    var e = 0;
    var c = "";
    var d = "";
    if (x < 0) {
      s = "-";
      x = -x;
    }
    if (x === 0) {
      e = 0;
      m = repeat$2("0", f + 1);
    } else {
      var l = log102(x);
      e = floor$5(l);
      var n = 0;
      var w = pow$2(10, e - f);
      n = round$1(x / w);
      if (2 * x >= (2 * n + 1) * w) {
        n += 1;
      }
      if (n >= pow$2(10, f + 1)) {
        n /= 10;
        e += 1;
      }
      m = $String$1(n);
    }
    if (f !== 0) {
      m = stringSlice$d(m, 0, 1) + "." + stringSlice$d(m, 1);
    }
    if (e === 0) {
      c = "+";
      d = "0";
    } else {
      c = e > 0 ? "+" : "-";
      d = $String$1(abs(e));
    }
    m += "e" + c + d;
    return s + m;
  }
});
var $$1D = _export;
var uncurryThis$H = functionUncurryThis;
var toIntegerOrInfinity$7 = toIntegerOrInfinity$l;
var thisNumberValue$2 = thisNumberValue$5;
var $repeat = stringRepeat;
var fails$N = fails$1p;
var $RangeError$4 = RangeError;
var $String = String;
var floor$4 = Math.floor;
var repeat$1 = uncurryThis$H($repeat);
var stringSlice$c = uncurryThis$H("".slice);
var nativeToFixed = uncurryThis$H(1 .toFixed);
var pow$1 = function(x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow$1(x, n - 1, acc * x) : pow$1(x * x, n / 2, acc);
};
var log = function(x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  }
  return n;
};
var multiply = function(data2, n, c) {
  var index = -1;
  var c2 = c;
  while (++index < 6) {
    c2 += n * data2[index];
    data2[index] = c2 % 1e7;
    c2 = floor$4(c2 / 1e7);
  }
};
var divide = function(data2, n) {
  var index = 6;
  var c = 0;
  while (--index >= 0) {
    c += data2[index];
    data2[index] = floor$4(c / n);
    c = c % n * 1e7;
  }
};
var dataToString = function(data2) {
  var index = 6;
  var s = "";
  while (--index >= 0) {
    if (s !== "" || index === 0 || data2[index] !== 0) {
      var t = $String(data2[index]);
      s = s === "" ? t : s + repeat$1("0", 7 - t.length) + t;
    }
  }
  return s;
};
var FORCED$e = fails$N(function() {
  return nativeToFixed(8e-5, 3) !== "0.000" || nativeToFixed(0.9, 0) !== "1" || nativeToFixed(1.255, 2) !== "1.25" || nativeToFixed(1000000000000000100, 0) !== "1000000000000000128";
}) || !fails$N(function() {
  nativeToFixed({});
});
$$1D({ target: "Number", proto: true, forced: FORCED$e }, {
  toFixed: function toFixed(fractionDigits) {
    var number = thisNumberValue$2(this);
    var fractDigits = toIntegerOrInfinity$7(fractionDigits);
    var data2 = [0, 0, 0, 0, 0, 0];
    var sign3 = "";
    var result = "0";
    var e, z, j, k;
    if (fractDigits < 0 || fractDigits > 20)
      throw $RangeError$4("Incorrect fraction digits");
    if (number != number)
      return "NaN";
    if (number <= -1e21 || number >= 1e21)
      return $String(number);
    if (number < 0) {
      sign3 = "-";
      number = -number;
    }
    if (number > 1e-21) {
      e = log(number * pow$1(2, 69, 1)) - 69;
      z = e < 0 ? number * pow$1(2, -e, 1) : number / pow$1(2, e, 1);
      z *= 4503599627370496;
      e = 52 - e;
      if (e > 0) {
        multiply(data2, 0, z);
        j = fractDigits;
        while (j >= 7) {
          multiply(data2, 1e7, 0);
          j -= 7;
        }
        multiply(data2, pow$1(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(data2, 1 << 23);
          j -= 23;
        }
        divide(data2, 1 << j);
        multiply(data2, 1, 1);
        divide(data2, 2);
        result = dataToString(data2);
      } else {
        multiply(data2, 0, z);
        multiply(data2, 1 << -e, 0);
        result = dataToString(data2) + repeat$1("0", fractDigits);
      }
    }
    if (fractDigits > 0) {
      k = result.length;
      result = sign3 + (k <= fractDigits ? "0." + repeat$1("0", fractDigits - k) + result : stringSlice$c(result, 0, k - fractDigits) + "." + stringSlice$c(result, k - fractDigits));
    } else {
      result = sign3 + result;
    }
    return result;
  }
});
var $$1C = _export;
var uncurryThis$G = functionUncurryThis;
var fails$M = fails$1p;
var thisNumberValue$1 = thisNumberValue$5;
var nativeToPrecision = uncurryThis$G(1 .toPrecision);
var FORCED$d = fails$M(function() {
  return nativeToPrecision(1, void 0) !== "1";
}) || !fails$M(function() {
  nativeToPrecision({});
});
$$1C({ target: "Number", proto: true, forced: FORCED$d }, {
  toPrecision: function toPrecision(precision) {
    return precision === void 0 ? nativeToPrecision(thisNumberValue$1(this)) : nativeToPrecision(thisNumberValue$1(this), precision);
  }
});
var DESCRIPTORS$p = descriptors;
var uncurryThis$F = functionUncurryThis;
var call$r = functionCall;
var fails$L = fails$1p;
var objectKeys$2 = objectKeys$5;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var toObject$a = toObject$t;
var IndexedObject = indexedObject;
var $assign = Object.assign;
var defineProperty$4 = Object.defineProperty;
var concat$1 = uncurryThis$F([].concat);
var objectAssign = !$assign || fails$L(function() {
  if (DESCRIPTORS$p && $assign({ b: 1 }, $assign(defineProperty$4({}, "a", {
    enumerable: true,
    get: function() {
      defineProperty$4(this, "b", {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1)
    return true;
  var A = {};
  var B = {};
  var symbol = Symbol();
  var alphabet = "abcdefghijklmnopqrst";
  A[symbol] = 7;
  alphabet.split("").forEach(function(chr) {
    B[chr] = chr;
  });
  return $assign({}, A)[symbol] != 7 || objectKeys$2($assign({}, B)).join("") != alphabet;
}) ? function assign(target, source) {
  var T = toObject$a(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols2 = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable4 = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys5 = getOwnPropertySymbols2 ? concat$1(objectKeys$2(S), getOwnPropertySymbols2(S)) : objectKeys$2(S);
    var length = keys5.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys5[j++];
      if (!DESCRIPTORS$p || call$r(propertyIsEnumerable4, S, key))
        T[key] = S[key];
    }
  }
  return T;
} : $assign;
var $$1B = _export;
var assign$1 = objectAssign;
$$1B({ target: "Object", stat: true, arity: 2, forced: Object.assign !== assign$1 }, {
  assign: assign$1
});
var $$1A = _export;
var DESCRIPTORS$o = descriptors;
var create$5 = objectCreate;
$$1A({ target: "Object", stat: true, sham: !DESCRIPTORS$o }, {
  create: create$5
});
var global$A = global$_;
var fails$K = fails$1p;
var WEBKIT$1 = engineWebkitVersion;
var objectPrototypeAccessorsForced = !fails$K(function() {
  if (WEBKIT$1 && WEBKIT$1 < 535)
    return;
  var key = Math.random();
  __defineSetter__.call(null, key, function() {
  });
  delete global$A[key];
});
var $$1z = _export;
var DESCRIPTORS$n = descriptors;
var FORCED$c = objectPrototypeAccessorsForced;
var aCallable$b = aCallable$l;
var toObject$9 = toObject$t;
var definePropertyModule$4 = objectDefineProperty;
if (DESCRIPTORS$n) {
  $$1z({ target: "Object", proto: true, forced: FORCED$c }, {
    __defineGetter__: function __defineGetter__(P, getter) {
      definePropertyModule$4.f(toObject$9(this), P, { get: aCallable$b(getter), enumerable: true, configurable: true });
    }
  });
}
var $$1y = _export;
var DESCRIPTORS$m = descriptors;
var defineProperties3 = objectDefineProperties.f;
$$1y({ target: "Object", stat: true, forced: Object.defineProperties !== defineProperties3, sham: !DESCRIPTORS$m }, {
  defineProperties: defineProperties3
});
var $$1x = _export;
var DESCRIPTORS$l = descriptors;
var defineProperty$3 = objectDefineProperty.f;
$$1x({ target: "Object", stat: true, forced: Object.defineProperty !== defineProperty$3, sham: !DESCRIPTORS$l }, {
  defineProperty: defineProperty$3
});
var $$1w = _export;
var DESCRIPTORS$k = descriptors;
var FORCED$b = objectPrototypeAccessorsForced;
var aCallable$a = aCallable$l;
var toObject$8 = toObject$t;
var definePropertyModule$3 = objectDefineProperty;
if (DESCRIPTORS$k) {
  $$1w({ target: "Object", proto: true, forced: FORCED$b }, {
    __defineSetter__: function __defineSetter__2(P, setter) {
      definePropertyModule$3.f(toObject$8(this), P, { set: aCallable$a(setter), enumerable: true, configurable: true });
    }
  });
}
var DESCRIPTORS$j = descriptors;
var fails$J = fails$1p;
var uncurryThis$E = functionUncurryThis;
var objectGetPrototypeOf$1 = objectGetPrototypeOf$2;
var objectKeys$1 = objectKeys$5;
var toIndexedObject$4 = toIndexedObject$j;
var $propertyIsEnumerable = objectPropertyIsEnumerable.f;
var propertyIsEnumerable3 = uncurryThis$E($propertyIsEnumerable);
var push$9 = uncurryThis$E([].push);
var IE_BUG = DESCRIPTORS$j && fails$J(function() {
  var O = /* @__PURE__ */ Object.create(null);
  O[2] = 2;
  return !propertyIsEnumerable3(O, 2);
});
var createMethod$1 = function(TO_ENTRIES) {
  return function(it) {
    var O = toIndexedObject$4(it);
    var keys5 = objectKeys$1(O);
    var IE_WORKAROUND = IE_BUG && objectGetPrototypeOf$1(O) === null;
    var length = keys5.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys5[i++];
      if (!DESCRIPTORS$j || (IE_WORKAROUND ? key in O : propertyIsEnumerable3(O, key))) {
        push$9(result, TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};
var objectToArray = {
  // `Object.entries` method
  // https://tc39.es/ecma262/#sec-object.entries
  entries: createMethod$1(true),
  // `Object.values` method
  // https://tc39.es/ecma262/#sec-object.values
  values: createMethod$1(false)
};
var $$1v = _export;
var $entries = objectToArray.entries;
$$1v({ target: "Object", stat: true }, {
  entries: function entries(O) {
    return $entries(O);
  }
});
var $$1u = _export;
var FREEZING$4 = freezing;
var fails$I = fails$1p;
var isObject$g = isObject$z;
var onFreeze$2 = internalMetadataExports.onFreeze;
var $freeze = Object.freeze;
var FAILS_ON_PRIMITIVES$5 = fails$I(function() {
  $freeze(1);
});
$$1u({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES$5, sham: !FREEZING$4 }, {
  freeze: function freeze(it) {
    return $freeze && isObject$g(it) ? $freeze(onFreeze$2(it)) : it;
  }
});
var $$1t = _export;
var iterate$6 = iterate$a;
var createProperty$2 = createProperty$9;
$$1t({ target: "Object", stat: true }, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate$6(iterable, function(k, v) {
      createProperty$2(obj, k, v);
    }, { AS_ENTRIES: true });
    return obj;
  }
});
var $$1s = _export;
var fails$H = fails$1p;
var toIndexedObject$3 = toIndexedObject$j;
var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var DESCRIPTORS$i = descriptors;
var FORCED$a = !DESCRIPTORS$i || fails$H(function() {
  nativeGetOwnPropertyDescriptor$1(1);
});
$$1s({ target: "Object", stat: true, forced: FORCED$a, sham: !DESCRIPTORS$i }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor3(it, key) {
    return nativeGetOwnPropertyDescriptor$1(toIndexedObject$3(it), key);
  }
});
var $$1r = _export;
var DESCRIPTORS$h = descriptors;
var ownKeys$1 = ownKeys$3;
var toIndexedObject$2 = toIndexedObject$j;
var getOwnPropertyDescriptorModule$4 = objectGetOwnPropertyDescriptor;
var createProperty$1 = createProperty$9;
$$1r({ target: "Object", stat: true, sham: !DESCRIPTORS$h }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject$2(object);
    var getOwnPropertyDescriptor7 = getOwnPropertyDescriptorModule$4.f;
    var keys5 = ownKeys$1(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys5.length > index) {
      descriptor = getOwnPropertyDescriptor7(O, key = keys5[index++]);
      if (descriptor !== void 0)
        createProperty$1(result, key, descriptor);
    }
    return result;
  }
});
var $$1q = _export;
var fails$G = fails$1p;
var getOwnPropertyNames$2 = objectGetOwnPropertyNamesExternal.f;
var FAILS_ON_PRIMITIVES$4 = fails$G(function() {
  return !Object.getOwnPropertyNames(1);
});
$$1q({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES$4 }, {
  getOwnPropertyNames: getOwnPropertyNames$2
});
var $$1p = _export;
var fails$F = fails$1p;
var toObject$7 = toObject$t;
var nativeGetPrototypeOf = objectGetPrototypeOf$2;
var CORRECT_PROTOTYPE_GETTER$1 = correctPrototypeGetter;
var FAILS_ON_PRIMITIVES$3 = fails$F(function() {
  nativeGetPrototypeOf(1);
});
$$1p({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES$3, sham: !CORRECT_PROTOTYPE_GETTER$1 }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject$7(it));
  }
});
var $$1o = _export;
var hasOwn$c = hasOwnProperty_1;
$$1o({ target: "Object", stat: true }, {
  hasOwn: hasOwn$c
});
var sameValue$1 = Object.is || function is(x, y) {
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
var $$1n = _export;
var is2 = sameValue$1;
$$1n({ target: "Object", stat: true }, {
  is: is2
});
var $$1m = _export;
var $isExtensible$1 = objectIsExtensible;
$$1m({ target: "Object", stat: true, forced: Object.isExtensible !== $isExtensible$1 }, {
  isExtensible: $isExtensible$1
});
var $$1l = _export;
var fails$E = fails$1p;
var isObject$f = isObject$z;
var classof$c = classofRaw$2;
var ARRAY_BUFFER_NON_EXTENSIBLE$1 = arrayBufferNonExtensible;
var $isFrozen = Object.isFrozen;
var FORCED$9 = ARRAY_BUFFER_NON_EXTENSIBLE$1 || fails$E(function() {
  $isFrozen(1);
});
$$1l({ target: "Object", stat: true, forced: FORCED$9 }, {
  isFrozen: function isFrozen(it) {
    if (!isObject$f(it))
      return true;
    if (ARRAY_BUFFER_NON_EXTENSIBLE$1 && classof$c(it) == "ArrayBuffer")
      return true;
    return $isFrozen ? $isFrozen(it) : false;
  }
});
var $$1k = _export;
var fails$D = fails$1p;
var isObject$e = isObject$z;
var classof$b = classofRaw$2;
var ARRAY_BUFFER_NON_EXTENSIBLE = arrayBufferNonExtensible;
var $isSealed = Object.isSealed;
var FORCED$8 = ARRAY_BUFFER_NON_EXTENSIBLE || fails$D(function() {
  $isSealed(1);
});
$$1k({ target: "Object", stat: true, forced: FORCED$8 }, {
  isSealed: function isSealed(it) {
    if (!isObject$e(it))
      return true;
    if (ARRAY_BUFFER_NON_EXTENSIBLE && classof$b(it) == "ArrayBuffer")
      return true;
    return $isSealed ? $isSealed(it) : false;
  }
});
var $$1j = _export;
var toObject$6 = toObject$t;
var nativeKeys = objectKeys$5;
var fails$C = fails$1p;
var FAILS_ON_PRIMITIVES$2 = fails$C(function() {
  nativeKeys(1);
});
$$1j({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES$2 }, {
  keys: function keys2(it) {
    return nativeKeys(toObject$6(it));
  }
});
var $$1i = _export;
var DESCRIPTORS$g = descriptors;
var FORCED$7 = objectPrototypeAccessorsForced;
var toObject$5 = toObject$t;
var toPropertyKey$3 = toPropertyKey$8;
var getPrototypeOf$4 = objectGetPrototypeOf$2;
var getOwnPropertyDescriptor$6 = objectGetOwnPropertyDescriptor.f;
if (DESCRIPTORS$g) {
  $$1i({ target: "Object", proto: true, forced: FORCED$7 }, {
    __lookupGetter__: function __lookupGetter__(P) {
      var O = toObject$5(this);
      var key = toPropertyKey$3(P);
      var desc;
      do {
        if (desc = getOwnPropertyDescriptor$6(O, key))
          return desc.get;
      } while (O = getPrototypeOf$4(O));
    }
  });
}
var $$1h = _export;
var DESCRIPTORS$f = descriptors;
var FORCED$6 = objectPrototypeAccessorsForced;
var toObject$4 = toObject$t;
var toPropertyKey$2 = toPropertyKey$8;
var getPrototypeOf$3 = objectGetPrototypeOf$2;
var getOwnPropertyDescriptor$5 = objectGetOwnPropertyDescriptor.f;
if (DESCRIPTORS$f) {
  $$1h({ target: "Object", proto: true, forced: FORCED$6 }, {
    __lookupSetter__: function __lookupSetter__(P) {
      var O = toObject$4(this);
      var key = toPropertyKey$2(P);
      var desc;
      do {
        if (desc = getOwnPropertyDescriptor$5(O, key))
          return desc.set;
      } while (O = getPrototypeOf$3(O));
    }
  });
}
var $$1g = _export;
var isObject$d = isObject$z;
var onFreeze$1 = internalMetadataExports.onFreeze;
var FREEZING$3 = freezing;
var fails$B = fails$1p;
var $preventExtensions = Object.preventExtensions;
var FAILS_ON_PRIMITIVES$1 = fails$B(function() {
  $preventExtensions(1);
});
$$1g({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES$1, sham: !FREEZING$3 }, {
  preventExtensions: function preventExtensions(it) {
    return $preventExtensions && isObject$d(it) ? $preventExtensions(onFreeze$1(it)) : it;
  }
});
var DESCRIPTORS$e = descriptors;
var defineBuiltInAccessor$9 = defineBuiltInAccessor$h;
var isObject$c = isObject$z;
var toObject$3 = toObject$t;
var requireObjectCoercible$f = requireObjectCoercible$l;
var getPrototypeOf$2 = Object.getPrototypeOf;
var setPrototypeOf$3 = Object.setPrototypeOf;
var ObjectPrototype$1 = Object.prototype;
var PROTO = "__proto__";
if (DESCRIPTORS$e && getPrototypeOf$2 && setPrototypeOf$3 && !(PROTO in ObjectPrototype$1))
  try {
    defineBuiltInAccessor$9(ObjectPrototype$1, PROTO, {
      configurable: true,
      get: function __proto__() {
        return getPrototypeOf$2(toObject$3(this));
      },
      set: function __proto__(proto) {
        var O = requireObjectCoercible$f(this);
        if (!isObject$c(proto) && proto !== null || !isObject$c(O))
          return;
        setPrototypeOf$3(O, proto);
      }
    });
  } catch (error) {
  }
var $$1f = _export;
var isObject$b = isObject$z;
var onFreeze = internalMetadataExports.onFreeze;
var FREEZING$2 = freezing;
var fails$A = fails$1p;
var $seal = Object.seal;
var FAILS_ON_PRIMITIVES = fails$A(function() {
  $seal(1);
});
$$1f({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING$2 }, {
  seal: function seal(it) {
    return $seal && isObject$b(it) ? $seal(onFreeze(it)) : it;
  }
});
var $$1e = _export;
var setPrototypeOf$2 = objectSetPrototypeOf$1;
$$1e({ target: "Object", stat: true }, {
  setPrototypeOf: setPrototypeOf$2
});
var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof$a = classof$m;
var objectToString = TO_STRING_TAG_SUPPORT$1 ? {}.toString : function toString3() {
  return "[object " + classof$a(this) + "]";
};
var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var defineBuiltIn$c = defineBuiltIn$o;
var toString$q = objectToString;
if (!TO_STRING_TAG_SUPPORT) {
  defineBuiltIn$c(Object.prototype, "toString", toString$q, { unsafe: true });
}
var $$1d = _export;
var $values = objectToArray.values;
$$1d({ target: "Object", stat: true }, {
  values: function values2(O) {
    return $values(O);
  }
});
var $$1c = _export;
var $parseFloat = numberParseFloat;
$$1c({ global: true, forced: parseFloat != $parseFloat }, {
  parseFloat: $parseFloat
});
var $$1b = _export;
var $parseInt = numberParseInt;
$$1b({ global: true, forced: parseInt != $parseInt }, {
  parseInt: $parseInt
});
var $TypeError$9 = TypeError;
var validateArgumentsLength$b = function(passed, required) {
  if (passed < required)
    throw $TypeError$9("Not enough arguments");
  return passed;
};
var userAgent$3 = engineUserAgent;
var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$3);
var global$z = global$_;
var apply$6 = functionApply$1;
var bind$6 = functionBindContext;
var isCallable$b = isCallable$z;
var hasOwn$b = hasOwnProperty_1;
var fails$z = fails$1p;
var html = html$2;
var arraySlice$5 = arraySlice$a;
var createElement = documentCreateElement$2;
var validateArgumentsLength$a = validateArgumentsLength$b;
var IS_IOS$1 = engineIsIos;
var IS_NODE$6 = engineIsNode;
var set$1 = global$z.setImmediate;
var clear = global$z.clearImmediate;
var process$4 = global$z.process;
var Dispatch = global$z.Dispatch;
var Function$2 = global$z.Function;
var MessageChannel = global$z.MessageChannel;
var String$1 = global$z.String;
var counter = 0;
var queue$2 = {};
var ONREADYSTATECHANGE = "onreadystatechange";
var $location, defer, channel, port;
fails$z(function() {
  $location = global$z.location;
});
var run = function(id2) {
  if (hasOwn$b(queue$2, id2)) {
    var fn = queue$2[id2];
    delete queue$2[id2];
    fn();
  }
};
var runner = function(id2) {
  return function() {
    run(id2);
  };
};
var eventListener = function(event) {
  run(event.data);
};
var globalPostMessageDefer = function(id2) {
  global$z.postMessage(String$1(id2), $location.protocol + "//" + $location.host);
};
if (!set$1 || !clear) {
  set$1 = function setImmediate2(handler) {
    validateArgumentsLength$a(arguments.length, 1);
    var fn = isCallable$b(handler) ? handler : Function$2(handler);
    var args = arraySlice$5(arguments, 1);
    queue$2[++counter] = function() {
      apply$6(fn, void 0, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate2(id2) {
    delete queue$2[id2];
  };
  if (IS_NODE$6) {
    defer = function(id2) {
      process$4.nextTick(runner(id2));
    };
  } else if (Dispatch && Dispatch.now) {
    defer = function(id2) {
      Dispatch.now(runner(id2));
    };
  } else if (MessageChannel && !IS_IOS$1) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = eventListener;
    defer = bind$6(port.postMessage, port);
  } else if (global$z.addEventListener && isCallable$b(global$z.postMessage) && !global$z.importScripts && $location && $location.protocol !== "file:" && !fails$z(globalPostMessageDefer)) {
    defer = globalPostMessageDefer;
    global$z.addEventListener("message", eventListener, false);
  } else if (ONREADYSTATECHANGE in createElement("script")) {
    defer = function(id2) {
      html.appendChild(createElement("script"))[ONREADYSTATECHANGE] = function() {
        html.removeChild(this);
        run(id2);
      };
    };
  } else {
    defer = function(id2) {
      setTimeout(runner(id2), 0);
    };
  }
}
var task$1 = {
  set: set$1,
  clear
};
var Queue$2 = function() {
  this.head = null;
  this.tail = null;
};
Queue$2.prototype = {
  add: function(item) {
    var entry = { item, next: null };
    var tail = this.tail;
    if (tail)
      tail.next = entry;
    else
      this.head = entry;
    this.tail = entry;
  },
  get: function() {
    var entry = this.head;
    if (entry) {
      var next4 = this.head = entry.next;
      if (next4 === null)
        this.tail = null;
      return entry.item;
    }
  }
};
var queue$1 = Queue$2;
var userAgent$2 = engineUserAgent;
var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$2) && typeof Pebble != "undefined";
var userAgent$1 = engineUserAgent;
var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent$1);
var global$y = global$_;
var bind$5 = functionBindContext;
var getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor.f;
var macrotask = task$1.set;
var Queue$1 = queue$1;
var IS_IOS = engineIsIos;
var IS_IOS_PEBBLE = engineIsIosPebble;
var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
var IS_NODE$5 = engineIsNode;
var MutationObserver = global$y.MutationObserver || global$y.WebKitMutationObserver;
var document$2 = global$y.document;
var process$3 = global$y.process;
var Promise$1 = global$y.Promise;
var queueMicrotaskDescriptor = getOwnPropertyDescriptor$4(global$y, "queueMicrotask");
var microtask$2 = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
var notify$1, toggle, node, promise, then;
if (!microtask$2) {
  var queue = new Queue$1();
  var flush = function() {
    var parent, fn;
    if (IS_NODE$5 && (parent = process$3.domain))
      parent.exit();
    while (fn = queue.get())
      try {
        fn();
      } catch (error) {
        if (queue.head)
          notify$1();
        throw error;
      }
    if (parent)
      parent.enter();
  };
  if (!IS_IOS && !IS_NODE$5 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
    toggle = true;
    node = document$2.createTextNode("");
    new MutationObserver(flush).observe(node, { characterData: true });
    notify$1 = function() {
      node.data = toggle = !toggle;
    };
  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
    promise = Promise$1.resolve(void 0);
    promise.constructor = Promise$1;
    then = bind$5(promise.then, promise);
    notify$1 = function() {
      then(flush);
    };
  } else if (IS_NODE$5) {
    notify$1 = function() {
      process$3.nextTick(flush);
    };
  } else {
    macrotask = bind$5(macrotask, global$y);
    notify$1 = function() {
      macrotask(flush);
    };
  }
  microtask$2 = function(fn) {
    if (!queue.head)
      notify$1();
    queue.add(fn);
  };
}
var microtask_1 = microtask$2;
var hostReportErrors$1 = function(a, b) {
  try {
    arguments.length == 1 ? console.error(a) : console.error(a, b);
  } catch (error) {
  }
};
var perform$5 = function(exec2) {
  try {
    return { error: false, value: exec2() };
  } catch (error) {
    return { error: true, value: error };
  }
};
var global$x = global$_;
var promiseNativeConstructor = global$x.Promise;
var engineIsDeno = typeof Deno == "object" && Deno && typeof Deno.version == "object";
var IS_DENO$2 = engineIsDeno;
var IS_NODE$4 = engineIsNode;
var engineIsBrowser = !IS_DENO$2 && !IS_NODE$4 && typeof window == "object" && typeof document == "object";
var global$w = global$_;
var NativePromiseConstructor$4 = promiseNativeConstructor;
var isCallable$a = isCallable$z;
var isForced$1 = isForced_1;
var inspectSource = inspectSource$3;
var wellKnownSymbol$b = wellKnownSymbol$z;
var IS_BROWSER$1 = engineIsBrowser;
var IS_DENO$1 = engineIsDeno;
var V8_VERSION = engineV8Version;
NativePromiseConstructor$4 && NativePromiseConstructor$4.prototype;
var SPECIES$1 = wellKnownSymbol$b("species");
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$a(global$w.PromiseRejectionEvent);
var FORCED_PROMISE_CONSTRUCTOR$5 = isForced$1("Promise", function() {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$4);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$4);
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66)
    return true;
  if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
    var promise2 = new NativePromiseConstructor$4(function(resolve2) {
      resolve2(1);
    });
    var FakePromise = function(exec2) {
      exec2(function() {
      }, function() {
      });
    };
    var constructor = promise2.constructor = {};
    constructor[SPECIES$1] = FakePromise;
    SUBCLASSING = promise2.then(function() {
    }) instanceof FakePromise;
    if (!SUBCLASSING)
      return true;
  }
  return !GLOBAL_CORE_JS_PROMISE && (IS_BROWSER$1 || IS_DENO$1) && !NATIVE_PROMISE_REJECTION_EVENT$1;
});
var promiseConstructorDetection = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
  SUBCLASSING
};
var newPromiseCapability$2 = {};
var aCallable$9 = aCallable$l;
var $TypeError$8 = TypeError;
var PromiseCapability = function(C) {
  var resolve2, reject2;
  this.promise = new C(function($$resolve, $$reject) {
    if (resolve2 !== void 0 || reject2 !== void 0)
      throw $TypeError$8("Bad Promise constructor");
    resolve2 = $$resolve;
    reject2 = $$reject;
  });
  this.resolve = aCallable$9(resolve2);
  this.reject = aCallable$9(reject2);
};
newPromiseCapability$2.f = function(C) {
  return new PromiseCapability(C);
};
var $$1a = _export;
var IS_NODE$3 = engineIsNode;
var global$v = global$_;
var call$q = functionCall;
var defineBuiltIn$b = defineBuiltIn$o;
var setPrototypeOf$1 = objectSetPrototypeOf$1;
var setToStringTag$4 = setToStringTag$d;
var setSpecies$2 = setSpecies$6;
var aCallable$8 = aCallable$l;
var isCallable$9 = isCallable$z;
var isObject$a = isObject$z;
var anInstance$6 = anInstance$a;
var speciesConstructor$4 = speciesConstructor$6;
var task = task$1.set;
var microtask$1 = microtask_1;
var hostReportErrors = hostReportErrors$1;
var perform$4 = perform$5;
var Queue = queue$1;
var InternalStateModule$7 = internalState;
var NativePromiseConstructor$3 = promiseNativeConstructor;
var PromiseConstructorDetection = promiseConstructorDetection;
var newPromiseCapabilityModule$5 = newPromiseCapability$2;
var PROMISE = "Promise";
var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule$7.getterFor(PROMISE);
var setInternalState$7 = InternalStateModule$7.set;
var NativePromisePrototype$2 = NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
var PromiseConstructor = NativePromiseConstructor$3;
var PromisePrototype = NativePromisePrototype$2;
var TypeError$4 = global$v.TypeError;
var document$1 = global$v.document;
var process$2 = global$v.process;
var newPromiseCapability$1 = newPromiseCapabilityModule$5.f;
var newGenericPromiseCapability = newPromiseCapability$1;
var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$v.dispatchEvent);
var UNHANDLED_REJECTION = "unhandledrejection";
var REJECTION_HANDLED = "rejectionhandled";
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
var isThenable = function(it) {
  var then2;
  return isObject$a(it) && isCallable$9(then2 = it.then) ? then2 : false;
};
var callReaction = function(reaction, state) {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve2 = reaction.resolve;
  var reject2 = reaction.reject;
  var domain = reaction.domain;
  var result, then2, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED)
          onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true)
        result = value;
      else {
        if (domain)
          domain.enter();
        result = handler(value);
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject2(TypeError$4("Promise-chain cycle"));
      } else if (then2 = isThenable(result)) {
        call$q(then2, result, resolve2, reject2);
      } else
        resolve2(result);
    } else
      reject2(value);
  } catch (error) {
    if (domain && !exited)
      domain.exit();
    reject2(error);
  }
};
var notify = function(state, isReject) {
  if (state.notified)
    return;
  state.notified = true;
  microtask$1(function() {
    var reactions = state.reactions;
    var reaction;
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection)
      onUnhandled(state);
  });
};
var dispatchEvent = function(name, promise2, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$1.createEvent("Event");
    event.promise = promise2;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$v.dispatchEvent(event);
  } else
    event = { promise: promise2, reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$v["on" + name]))
    handler(event);
  else if (name === UNHANDLED_REJECTION)
    hostReportErrors("Unhandled promise rejection", reason);
};
var onUnhandled = function(state) {
  call$q(task, global$v, function() {
    var promise2 = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform$4(function() {
        if (IS_NODE$3) {
          process$2.emit("unhandledRejection", value, promise2);
        } else
          dispatchEvent(UNHANDLED_REJECTION, promise2, value);
      });
      state.rejection = IS_NODE$3 || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error)
        throw result.value;
    }
  });
};
var isUnhandled = function(state) {
  return state.rejection !== HANDLED && !state.parent;
};
var onHandleUnhandled = function(state) {
  call$q(task, global$v, function() {
    var promise2 = state.facade;
    if (IS_NODE$3) {
      process$2.emit("rejectionHandled", promise2);
    } else
      dispatchEvent(REJECTION_HANDLED, promise2, state.value);
  });
};
var bind$4 = function(fn, state, unwrap) {
  return function(value) {
    fn(state, value, unwrap);
  };
};
var internalReject = function(state, value, unwrap) {
  if (state.done)
    return;
  state.done = true;
  if (unwrap)
    state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};
var internalResolve = function(state, value, unwrap) {
  if (state.done)
    return;
  state.done = true;
  if (unwrap)
    state = unwrap;
  try {
    if (state.facade === value)
      throw TypeError$4("Promise can't be resolved itself");
    var then2 = isThenable(value);
    if (then2) {
      microtask$1(function() {
        var wrapper2 = { done: false };
        try {
          call$q(
            then2,
            value,
            bind$4(internalResolve, wrapper2, state),
            bind$4(internalReject, wrapper2, state)
          );
        } catch (error) {
          internalReject(wrapper2, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};
if (FORCED_PROMISE_CONSTRUCTOR$4) {
  PromiseConstructor = function Promise2(executor) {
    anInstance$6(this, PromisePrototype);
    aCallable$8(executor);
    call$q(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind$4(internalResolve, state), bind$4(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };
  PromisePrototype = PromiseConstructor.prototype;
  Internal = function Promise2(executor) {
    setInternalState$7(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: void 0
    });
  };
  Internal.prototype = defineBuiltIn$b(PromisePrototype, "then", function then2(onFulfilled, onRejected) {
    var state = getInternalPromiseState(this);
    var reaction = newPromiseCapability$1(speciesConstructor$4(this, PromiseConstructor));
    state.parent = true;
    reaction.ok = isCallable$9(onFulfilled) ? onFulfilled : true;
    reaction.fail = isCallable$9(onRejected) && onRejected;
    reaction.domain = IS_NODE$3 ? process$2.domain : void 0;
    if (state.state == PENDING)
      state.reactions.add(reaction);
    else
      microtask$1(function() {
        callReaction(reaction, state);
      });
    return reaction.promise;
  });
  OwnPromiseCapability = function() {
    var promise2 = new Internal();
    var state = getInternalPromiseState(promise2);
    this.promise = promise2;
    this.resolve = bind$4(internalResolve, state);
    this.reject = bind$4(internalReject, state);
  };
  newPromiseCapabilityModule$5.f = newPromiseCapability$1 = function(C) {
    return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };
  if (isCallable$9(NativePromiseConstructor$3) && NativePromisePrototype$2 !== Object.prototype) {
    nativeThen = NativePromisePrototype$2.then;
    if (!NATIVE_PROMISE_SUBCLASSING) {
      defineBuiltIn$b(NativePromisePrototype$2, "then", function then2(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function(resolve2, reject2) {
          call$q(nativeThen, that, resolve2, reject2);
        }).then(onFulfilled, onRejected);
      }, { unsafe: true });
    }
    try {
      delete NativePromisePrototype$2.constructor;
    } catch (error) {
    }
    if (setPrototypeOf$1) {
      setPrototypeOf$1(NativePromisePrototype$2, PromisePrototype);
    }
  }
}
$$1a({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
  Promise: PromiseConstructor
});
setToStringTag$4(PromiseConstructor, PROMISE, false);
setSpecies$2(PROMISE);
var NativePromiseConstructor$2 = promiseNativeConstructor;
var checkCorrectnessOfIteration$1 = checkCorrectnessOfIteration$4;
var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;
var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration$1(function(iterable) {
  NativePromiseConstructor$2.all(iterable).then(void 0, function() {
  });
});
var $$19 = _export;
var call$p = functionCall;
var aCallable$7 = aCallable$l;
var newPromiseCapabilityModule$4 = newPromiseCapability$2;
var perform$3 = perform$5;
var iterate$5 = iterate$a;
var PROMISE_STATICS_INCORRECT_ITERATION$3 = promiseStaticsIncorrectIteration;
$$19({ target: "Promise", stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$3 }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$4.f(C);
    var resolve2 = capability.resolve;
    var reject2 = capability.reject;
    var result = perform$3(function() {
      var $promiseResolve = aCallable$7(C.resolve);
      var values5 = [];
      var counter2 = 0;
      var remaining = 1;
      iterate$5(iterable, function(promise2) {
        var index = counter2++;
        var alreadyCalled = false;
        remaining++;
        call$p($promiseResolve, C, promise2).then(function(value) {
          if (alreadyCalled)
            return;
          alreadyCalled = true;
          values5[index] = value;
          --remaining || resolve2(values5);
        }, reject2);
      });
      --remaining || resolve2(values5);
    });
    if (result.error)
      reject2(result.value);
    return capability.promise;
  }
});
var $$18 = _export;
var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
var NativePromiseConstructor$1 = promiseNativeConstructor;
var getBuiltIn$b = getBuiltIn$n;
var isCallable$8 = isCallable$z;
var defineBuiltIn$a = defineBuiltIn$o;
var NativePromisePrototype$1 = NativePromiseConstructor$1 && NativePromiseConstructor$1.prototype;
$$18({ target: "Promise", proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
  "catch": function(onRejected) {
    return this.then(void 0, onRejected);
  }
});
if (isCallable$8(NativePromiseConstructor$1)) {
  var method$1 = getBuiltIn$b("Promise").prototype["catch"];
  if (NativePromisePrototype$1["catch"] !== method$1) {
    defineBuiltIn$a(NativePromisePrototype$1, "catch", method$1, { unsafe: true });
  }
}
var $$17 = _export;
var call$o = functionCall;
var aCallable$6 = aCallable$l;
var newPromiseCapabilityModule$3 = newPromiseCapability$2;
var perform$2 = perform$5;
var iterate$4 = iterate$a;
var PROMISE_STATICS_INCORRECT_ITERATION$2 = promiseStaticsIncorrectIteration;
$$17({ target: "Promise", stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$2 }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$3.f(C);
    var reject2 = capability.reject;
    var result = perform$2(function() {
      var $promiseResolve = aCallable$6(C.resolve);
      iterate$4(iterable, function(promise2) {
        call$o($promiseResolve, C, promise2).then(capability.resolve, reject2);
      });
    });
    if (result.error)
      reject2(result.value);
    return capability.promise;
  }
});
var $$16 = _export;
var call$n = functionCall;
var newPromiseCapabilityModule$2 = newPromiseCapability$2;
var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;
$$16({ target: "Promise", stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule$2.f(this);
    call$n(capability.reject, void 0, r);
    return capability.promise;
  }
});
var anObject$o = anObject$D;
var isObject$9 = isObject$z;
var newPromiseCapability = newPromiseCapability$2;
var promiseResolve$2 = function(C, x) {
  anObject$o(C);
  if (isObject$9(x) && x.constructor === C)
    return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve2 = promiseCapability.resolve;
  resolve2(x);
  return promiseCapability.promise;
};
var $$15 = _export;
var getBuiltIn$a = getBuiltIn$n;
var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
var promiseResolve$1 = promiseResolve$2;
getBuiltIn$a("Promise");
$$15({ target: "Promise", stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  resolve: function resolve(x) {
    return promiseResolve$1(this, x);
  }
});
var $$14 = _export;
var call$m = functionCall;
var aCallable$5 = aCallable$l;
var newPromiseCapabilityModule$1 = newPromiseCapability$2;
var perform$1 = perform$5;
var iterate$3 = iterate$a;
var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;
$$14({ target: "Promise", stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$1.f(C);
    var resolve2 = capability.resolve;
    var reject2 = capability.reject;
    var result = perform$1(function() {
      var promiseResolve2 = aCallable$5(C.resolve);
      var values5 = [];
      var counter2 = 0;
      var remaining = 1;
      iterate$3(iterable, function(promise2) {
        var index = counter2++;
        var alreadyCalled = false;
        remaining++;
        call$m(promiseResolve2, C, promise2).then(function(value) {
          if (alreadyCalled)
            return;
          alreadyCalled = true;
          values5[index] = { status: "fulfilled", value };
          --remaining || resolve2(values5);
        }, function(error) {
          if (alreadyCalled)
            return;
          alreadyCalled = true;
          values5[index] = { status: "rejected", reason: error };
          --remaining || resolve2(values5);
        });
      });
      --remaining || resolve2(values5);
    });
    if (result.error)
      reject2(result.value);
    return capability.promise;
  }
});
var $$13 = _export;
var call$l = functionCall;
var aCallable$4 = aCallable$l;
var getBuiltIn$9 = getBuiltIn$n;
var newPromiseCapabilityModule = newPromiseCapability$2;
var perform = perform$5;
var iterate$2 = iterate$a;
var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;
var PROMISE_ANY_ERROR = "No one promise resolved";
$$13({ target: "Promise", stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  any: function any(iterable) {
    var C = this;
    var AggregateError2 = getBuiltIn$9("AggregateError");
    var capability = newPromiseCapabilityModule.f(C);
    var resolve2 = capability.resolve;
    var reject2 = capability.reject;
    var result = perform(function() {
      var promiseResolve2 = aCallable$4(C.resolve);
      var errors = [];
      var counter2 = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate$2(iterable, function(promise2) {
        var index = counter2++;
        var alreadyRejected = false;
        remaining++;
        call$l(promiseResolve2, C, promise2).then(function(value) {
          if (alreadyRejected || alreadyResolved)
            return;
          alreadyResolved = true;
          resolve2(value);
        }, function(error) {
          if (alreadyRejected || alreadyResolved)
            return;
          alreadyRejected = true;
          errors[index] = error;
          --remaining || reject2(new AggregateError2(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject2(new AggregateError2(errors, PROMISE_ANY_ERROR));
    });
    if (result.error)
      reject2(result.value);
    return capability.promise;
  }
});
var $$12 = _export;
var NativePromiseConstructor = promiseNativeConstructor;
var fails$y = fails$1p;
var getBuiltIn$8 = getBuiltIn$n;
var isCallable$7 = isCallable$z;
var speciesConstructor$3 = speciesConstructor$6;
var promiseResolve = promiseResolve$2;
var defineBuiltIn$9 = defineBuiltIn$o;
var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
var NON_GENERIC = !!NativePromiseConstructor && fails$y(function() {
  NativePromisePrototype["finally"].call({ then: function() {
  } }, function() {
  });
});
$$12({ target: "Promise", proto: true, real: true, forced: NON_GENERIC }, {
  "finally": function(onFinally) {
    var C = speciesConstructor$3(this, getBuiltIn$8("Promise"));
    var isFunction = isCallable$7(onFinally);
    return this.then(
      isFunction ? function(x) {
        return promiseResolve(C, onFinally()).then(function() {
          return x;
        });
      } : onFinally,
      isFunction ? function(e) {
        return promiseResolve(C, onFinally()).then(function() {
          throw e;
        });
      } : onFinally
    );
  }
});
if (isCallable$7(NativePromiseConstructor)) {
  var method = getBuiltIn$8("Promise").prototype["finally"];
  if (NativePromisePrototype["finally"] !== method) {
    defineBuiltIn$9(NativePromisePrototype, "finally", method, { unsafe: true });
  }
}
var $$11 = _export;
var functionApply = functionApply$1;
var aCallable$3 = aCallable$l;
var anObject$n = anObject$D;
var fails$x = fails$1p;
var OPTIONAL_ARGUMENTS_LIST = !fails$x(function() {
  Reflect.apply(function() {
  });
});
$$11({ target: "Reflect", stat: true, forced: OPTIONAL_ARGUMENTS_LIST }, {
  apply: function apply(target, thisArgument, argumentsList) {
    return functionApply(aCallable$3(target), thisArgument, anObject$n(argumentsList));
  }
});
var $$10 = _export;
var getBuiltIn$7 = getBuiltIn$n;
var apply$5 = functionApply$1;
var bind$3 = functionBind;
var aConstructor$1 = aConstructor$3;
var anObject$m = anObject$D;
var isObject$8 = isObject$z;
var create$4 = objectCreate;
var fails$w = fails$1p;
var nativeConstruct = getBuiltIn$7("Reflect", "construct");
var ObjectPrototype = Object.prototype;
var push$8 = [].push;
var NEW_TARGET_BUG = fails$w(function() {
  function F() {
  }
  return !(nativeConstruct(function() {
  }, [], F) instanceof F);
});
var ARGS_BUG = !fails$w(function() {
  nativeConstruct(function() {
  });
});
var FORCED$5 = NEW_TARGET_BUG || ARGS_BUG;
$$10({ target: "Reflect", stat: true, forced: FORCED$5, sham: FORCED$5 }, {
  construct: function construct2(Target, args) {
    aConstructor$1(Target);
    anObject$m(args);
    var newTarget = arguments.length < 3 ? Target : aConstructor$1(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG)
      return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      switch (args.length) {
        case 0:
          return new Target();
        case 1:
          return new Target(args[0]);
        case 2:
          return new Target(args[0], args[1]);
        case 3:
          return new Target(args[0], args[1], args[2]);
        case 4:
          return new Target(args[0], args[1], args[2], args[3]);
      }
      var $args = [null];
      apply$5(push$8, $args, args);
      return new (apply$5(bind$3, Target, $args))();
    }
    var proto = newTarget.prototype;
    var instance = create$4(isObject$8(proto) ? proto : ObjectPrototype);
    var result = apply$5(Target, instance, args);
    return isObject$8(result) ? result : instance;
  }
});
var $$$ = _export;
var DESCRIPTORS$d = descriptors;
var anObject$l = anObject$D;
var toPropertyKey$1 = toPropertyKey$8;
var definePropertyModule$2 = objectDefineProperty;
var fails$v = fails$1p;
var ERROR_INSTEAD_OF_FALSE = fails$v(function() {
  Reflect.defineProperty(definePropertyModule$2.f({}, 1, { value: 1 }), 1, { value: 2 });
});
$$$({ target: "Reflect", stat: true, forced: ERROR_INSTEAD_OF_FALSE, sham: !DESCRIPTORS$d }, {
  defineProperty: function defineProperty4(target, propertyKey, attributes) {
    anObject$l(target);
    var key = toPropertyKey$1(propertyKey);
    anObject$l(attributes);
    try {
      definePropertyModule$2.f(target, key, attributes);
      return true;
    } catch (error) {
      return false;
    }
  }
});
var $$_ = _export;
var anObject$k = anObject$D;
var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
$$_({ target: "Reflect", stat: true }, {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var descriptor = getOwnPropertyDescriptor$3(anObject$k(target), propertyKey);
    return descriptor && !descriptor.configurable ? false : delete target[propertyKey];
  }
});
var hasOwn$a = hasOwnProperty_1;
var isDataDescriptor$2 = function(descriptor) {
  return descriptor !== void 0 && (hasOwn$a(descriptor, "value") || hasOwn$a(descriptor, "writable"));
};
var $$Z = _export;
var call$k = functionCall;
var isObject$7 = isObject$z;
var anObject$j = anObject$D;
var isDataDescriptor$1 = isDataDescriptor$2;
var getOwnPropertyDescriptorModule$3 = objectGetOwnPropertyDescriptor;
var getPrototypeOf$1 = objectGetPrototypeOf$2;
function get(target, propertyKey) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject$j(target) === receiver)
    return target[propertyKey];
  descriptor = getOwnPropertyDescriptorModule$3.f(target, propertyKey);
  if (descriptor)
    return isDataDescriptor$1(descriptor) ? descriptor.value : descriptor.get === void 0 ? void 0 : call$k(descriptor.get, receiver);
  if (isObject$7(prototype = getPrototypeOf$1(target)))
    return get(prototype, propertyKey, receiver);
}
$$Z({ target: "Reflect", stat: true }, {
  get
});
var $$Y = _export;
var DESCRIPTORS$c = descriptors;
var anObject$i = anObject$D;
var getOwnPropertyDescriptorModule$2 = objectGetOwnPropertyDescriptor;
$$Y({ target: "Reflect", stat: true, sham: !DESCRIPTORS$c }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor4(target, propertyKey) {
    return getOwnPropertyDescriptorModule$2.f(anObject$i(target), propertyKey);
  }
});
var $$X = _export;
var anObject$h = anObject$D;
var objectGetPrototypeOf = objectGetPrototypeOf$2;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;
$$X({ target: "Reflect", stat: true, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf2(target) {
    return objectGetPrototypeOf(anObject$h(target));
  }
});
var $$W = _export;
$$W({ target: "Reflect", stat: true }, {
  has: function has2(target, propertyKey) {
    return propertyKey in target;
  }
});
var $$V = _export;
var anObject$g = anObject$D;
var $isExtensible = objectIsExtensible;
$$V({ target: "Reflect", stat: true }, {
  isExtensible: function isExtensible2(target) {
    anObject$g(target);
    return $isExtensible(target);
  }
});
var $$U = _export;
var ownKeys2 = ownKeys$3;
$$U({ target: "Reflect", stat: true }, {
  ownKeys: ownKeys2
});
var $$T = _export;
var getBuiltIn$6 = getBuiltIn$n;
var anObject$f = anObject$D;
var FREEZING$1 = freezing;
$$T({ target: "Reflect", stat: true, sham: !FREEZING$1 }, {
  preventExtensions: function preventExtensions2(target) {
    anObject$f(target);
    try {
      var objectPreventExtensions = getBuiltIn$6("Object", "preventExtensions");
      if (objectPreventExtensions)
        objectPreventExtensions(target);
      return true;
    } catch (error) {
      return false;
    }
  }
});
var $$S = _export;
var call$j = functionCall;
var anObject$e = anObject$D;
var isObject$6 = isObject$z;
var isDataDescriptor = isDataDescriptor$2;
var fails$u = fails$1p;
var definePropertyModule$1 = objectDefineProperty;
var getOwnPropertyDescriptorModule$1 = objectGetOwnPropertyDescriptor;
var getPrototypeOf3 = objectGetPrototypeOf$2;
var createPropertyDescriptor$4 = createPropertyDescriptor$c;
function set(target, propertyKey, V) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDescriptor = getOwnPropertyDescriptorModule$1.f(anObject$e(target), propertyKey);
  var existingDescriptor, prototype, setter;
  if (!ownDescriptor) {
    if (isObject$6(prototype = getPrototypeOf3(target))) {
      return set(prototype, propertyKey, V, receiver);
    }
    ownDescriptor = createPropertyDescriptor$4(0);
  }
  if (isDataDescriptor(ownDescriptor)) {
    if (ownDescriptor.writable === false || !isObject$6(receiver))
      return false;
    if (existingDescriptor = getOwnPropertyDescriptorModule$1.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false)
        return false;
      existingDescriptor.value = V;
      definePropertyModule$1.f(receiver, propertyKey, existingDescriptor);
    } else
      definePropertyModule$1.f(receiver, propertyKey, createPropertyDescriptor$4(0, V));
  } else {
    setter = ownDescriptor.set;
    if (setter === void 0)
      return false;
    call$j(setter, receiver, V);
  }
  return true;
}
var MS_EDGE_BUG = fails$u(function() {
  var Constructor2 = function() {
  };
  var object = definePropertyModule$1.f(new Constructor2(), "a", { configurable: true });
  return Reflect.set(Constructor2.prototype, "a", 1, object) !== false;
});
$$S({ target: "Reflect", stat: true, forced: MS_EDGE_BUG }, {
  set
});
var $$R = _export;
var anObject$d = anObject$D;
var aPossiblePrototype = aPossiblePrototype$2;
var objectSetPrototypeOf = objectSetPrototypeOf$1;
if (objectSetPrototypeOf)
  $$R({ target: "Reflect", stat: true }, {
    setPrototypeOf: function setPrototypeOf(target, proto) {
      anObject$d(target);
      aPossiblePrototype(proto);
      try {
        objectSetPrototypeOf(target, proto);
        return true;
      } catch (error) {
        return false;
      }
    }
  });
var $$Q = _export;
var global$u = global$_;
var setToStringTag$3 = setToStringTag$d;
$$Q({ global: true }, { Reflect: {} });
setToStringTag$3(global$u.Reflect, "Reflect", true);
var isObject$5 = isObject$z;
var classof$9 = classofRaw$2;
var wellKnownSymbol$a = wellKnownSymbol$z;
var MATCH$2 = wellKnownSymbol$a("match");
var isRegexp = function(it) {
  var isRegExp2;
  return isObject$5(it) && ((isRegExp2 = it[MATCH$2]) !== void 0 ? !!isRegExp2 : classof$9(it) == "RegExp");
};
var anObject$c = anObject$D;
var regexpFlags$1 = function() {
  var that = anObject$c(this);
  var result = "";
  if (that.hasIndices)
    result += "d";
  if (that.global)
    result += "g";
  if (that.ignoreCase)
    result += "i";
  if (that.multiline)
    result += "m";
  if (that.dotAll)
    result += "s";
  if (that.unicode)
    result += "u";
  if (that.unicodeSets)
    result += "v";
  if (that.sticky)
    result += "y";
  return result;
};
var call$i = functionCall;
var hasOwn$9 = hasOwnProperty_1;
var isPrototypeOf$2 = objectIsPrototypeOf;
var regExpFlags$1 = regexpFlags$1;
var RegExpPrototype$7 = RegExp.prototype;
var regexpGetFlags = function(R) {
  var flags = R.flags;
  return flags === void 0 && !("flags" in RegExpPrototype$7) && !hasOwn$9(R, "flags") && isPrototypeOf$2(RegExpPrototype$7, R) ? call$i(regExpFlags$1, R) : flags;
};
var fails$t = fails$1p;
var global$t = global$_;
var $RegExp$2 = global$t.RegExp;
var UNSUPPORTED_Y$3 = fails$t(function() {
  var re = $RegExp$2("a", "y");
  re.lastIndex = 2;
  return re.exec("abcd") != null;
});
var MISSED_STICKY$2 = UNSUPPORTED_Y$3 || fails$t(function() {
  return !$RegExp$2("a", "y").sticky;
});
var BROKEN_CARET = UNSUPPORTED_Y$3 || fails$t(function() {
  var re = $RegExp$2("^r", "gy");
  re.lastIndex = 2;
  return re.exec("str") != null;
});
var regexpStickyHelpers = {
  BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY$2,
  UNSUPPORTED_Y: UNSUPPORTED_Y$3
};
var fails$s = fails$1p;
var global$s = global$_;
var $RegExp$1 = global$s.RegExp;
var regexpUnsupportedDotAll = fails$s(function() {
  var re = $RegExp$1(".", "s");
  return !(re.dotAll && re.exec("\n") && re.flags === "s");
});
var fails$r = fails$1p;
var global$r = global$_;
var $RegExp = global$r.RegExp;
var regexpUnsupportedNcg = fails$r(function() {
  var re = $RegExp("(?<a>b)", "g");
  return re.exec("b").groups.a !== "b" || "b".replace(re, "$<a>c") !== "bc";
});
var DESCRIPTORS$b = descriptors;
var global$q = global$_;
var uncurryThis$D = functionUncurryThis;
var isForced = isForced_1;
var inheritIfRequired$2 = inheritIfRequired$6;
var createNonEnumerableProperty$5 = createNonEnumerableProperty$f;
var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
var isPrototypeOf$1 = objectIsPrototypeOf;
var isRegExp$4 = isRegexp;
var toString$p = toString$C;
var getRegExpFlags$4 = regexpGetFlags;
var stickyHelpers$2 = regexpStickyHelpers;
var proxyAccessor = proxyAccessor$2;
var defineBuiltIn$8 = defineBuiltIn$o;
var fails$q = fails$1p;
var hasOwn$8 = hasOwnProperty_1;
var enforceInternalState$2 = internalState.enforce;
var setSpecies$1 = setSpecies$6;
var wellKnownSymbol$9 = wellKnownSymbol$z;
var UNSUPPORTED_DOT_ALL$2 = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG$1 = regexpUnsupportedNcg;
var MATCH$1 = wellKnownSymbol$9("match");
var NativeRegExp = global$q.RegExp;
var RegExpPrototype$6 = NativeRegExp.prototype;
var SyntaxError$1 = global$q.SyntaxError;
var exec$6 = uncurryThis$D(RegExpPrototype$6.exec);
var charAt$c = uncurryThis$D("".charAt);
var replace$7 = uncurryThis$D("".replace);
var stringIndexOf$4 = uncurryThis$D("".indexOf);
var stringSlice$b = uncurryThis$D("".slice);
var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/;
var re1 = /a/g;
var re2 = /a/g;
var CORRECT_NEW = new NativeRegExp(re1) !== re1;
var MISSED_STICKY$1 = stickyHelpers$2.MISSED_STICKY;
var UNSUPPORTED_Y$2 = stickyHelpers$2.UNSUPPORTED_Y;
var BASE_FORCED = DESCRIPTORS$b && (!CORRECT_NEW || MISSED_STICKY$1 || UNSUPPORTED_DOT_ALL$2 || UNSUPPORTED_NCG$1 || fails$q(function() {
  re2[MATCH$1] = false;
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, "i") != "/a/i";
}));
var handleDotAll = function(string) {
  var length = string.length;
  var index = 0;
  var result = "";
  var brackets = false;
  var chr;
  for (; index <= length; index++) {
    chr = charAt$c(string, index);
    if (chr === "\\") {
      result += chr + charAt$c(string, ++index);
      continue;
    }
    if (!brackets && chr === ".") {
      result += "[\\s\\S]";
    } else {
      if (chr === "[") {
        brackets = true;
      } else if (chr === "]") {
        brackets = false;
      }
      result += chr;
    }
  }
  return result;
};
var handleNCG = function(string) {
  var length = string.length;
  var index = 0;
  var result = "";
  var named = [];
  var names = {};
  var brackets = false;
  var ncg = false;
  var groupid = 0;
  var groupname = "";
  var chr;
  for (; index <= length; index++) {
    chr = charAt$c(string, index);
    if (chr === "\\") {
      chr = chr + charAt$c(string, ++index);
    } else if (chr === "]") {
      brackets = false;
    } else if (!brackets)
      switch (true) {
        case chr === "[":
          brackets = true;
          break;
        case chr === "(":
          if (exec$6(IS_NCG, stringSlice$b(string, index + 1))) {
            index += 2;
            ncg = true;
          }
          result += chr;
          groupid++;
          continue;
        case (chr === ">" && ncg):
          if (groupname === "" || hasOwn$8(names, groupname)) {
            throw new SyntaxError$1("Invalid capture group name");
          }
          names[groupname] = true;
          named[named.length] = [groupname, groupid];
          ncg = false;
          groupname = "";
          continue;
      }
    if (ncg)
      groupname += chr;
    else
      result += chr;
  }
  return [result, named];
};
if (isForced("RegExp", BASE_FORCED)) {
  var RegExpWrapper = function RegExp2(pattern, flags) {
    var thisIsRegExp = isPrototypeOf$1(RegExpPrototype$6, this);
    var patternIsRegExp = isRegExp$4(pattern);
    var flagsAreUndefined = flags === void 0;
    var groups = [];
    var rawPattern = pattern;
    var rawFlags, dotAll, sticky, handled, result, state;
    if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
      return pattern;
    }
    if (patternIsRegExp || isPrototypeOf$1(RegExpPrototype$6, pattern)) {
      pattern = pattern.source;
      if (flagsAreUndefined)
        flags = getRegExpFlags$4(rawPattern);
    }
    pattern = pattern === void 0 ? "" : toString$p(pattern);
    flags = flags === void 0 ? "" : toString$p(flags);
    rawPattern = pattern;
    if (UNSUPPORTED_DOT_ALL$2 && "dotAll" in re1) {
      dotAll = !!flags && stringIndexOf$4(flags, "s") > -1;
      if (dotAll)
        flags = replace$7(flags, /s/g, "");
    }
    rawFlags = flags;
    if (MISSED_STICKY$1 && "sticky" in re1) {
      sticky = !!flags && stringIndexOf$4(flags, "y") > -1;
      if (sticky && UNSUPPORTED_Y$2)
        flags = replace$7(flags, /y/g, "");
    }
    if (UNSUPPORTED_NCG$1) {
      handled = handleNCG(pattern);
      pattern = handled[0];
      groups = handled[1];
    }
    result = inheritIfRequired$2(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype$6, RegExpWrapper);
    if (dotAll || sticky || groups.length) {
      state = enforceInternalState$2(result);
      if (dotAll) {
        state.dotAll = true;
        state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags);
      }
      if (sticky)
        state.sticky = true;
      if (groups.length)
        state.groups = groups;
    }
    if (pattern !== rawPattern)
      try {
        createNonEnumerableProperty$5(result, "source", rawPattern === "" ? "(?:)" : rawPattern);
      } catch (error) {
      }
    return result;
  };
  for (var keys5 = getOwnPropertyNames$1(NativeRegExp), index$1 = 0; keys5.length > index$1; ) {
    proxyAccessor(RegExpWrapper, NativeRegExp, keys5[index$1++]);
  }
  RegExpPrototype$6.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype$6;
  defineBuiltIn$8(global$q, "RegExp", RegExpWrapper, { constructor: true });
}
setSpecies$1("RegExp");
var DESCRIPTORS$a = descriptors;
var UNSUPPORTED_DOT_ALL$1 = regexpUnsupportedDotAll;
var classof$8 = classofRaw$2;
var defineBuiltInAccessor$8 = defineBuiltInAccessor$h;
var getInternalState$6 = internalState.get;
var RegExpPrototype$5 = RegExp.prototype;
var $TypeError$7 = TypeError;
if (DESCRIPTORS$a && UNSUPPORTED_DOT_ALL$1) {
  defineBuiltInAccessor$8(RegExpPrototype$5, "dotAll", {
    configurable: true,
    get: function dotAll() {
      if (this === RegExpPrototype$5)
        return void 0;
      if (classof$8(this) === "RegExp") {
        return !!getInternalState$6(this).dotAll;
      }
      throw $TypeError$7("Incompatible receiver, RegExp required");
    }
  });
}
var call$h = functionCall;
var uncurryThis$C = functionUncurryThis;
var toString$o = toString$C;
var regexpFlags = regexpFlags$1;
var stickyHelpers$1 = regexpStickyHelpers;
var shared = sharedExports;
var create$3 = objectCreate;
var getInternalState$5 = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;
var nativeReplace = shared("native-string-replace", String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$b = uncurryThis$C("".charAt);
var indexOf$1 = uncurryThis$C("".indexOf);
var replace$6 = uncurryThis$C("".replace);
var stringSlice$a = uncurryThis$C("".slice);
var UPDATES_LAST_INDEX_WRONG = function() {
  var re12 = /a/;
  var re22 = /b*/g;
  call$h(nativeExec, re12, "a");
  call$h(nativeExec, re22, "a");
  return re12.lastIndex !== 0 || re22.lastIndex !== 0;
}();
var UNSUPPORTED_Y$1 = stickyHelpers$1.BROKEN_CARET;
var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1 || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;
if (PATCH) {
  patchedExec = function exec2(string) {
    var re = this;
    var state = getInternalState$5(re);
    var str = toString$o(string);
    var raw3 = state.raw;
    var result, reCopy, lastIndex, match2, i, object, group;
    if (raw3) {
      raw3.lastIndex = re.lastIndex;
      result = call$h(patchedExec, raw3, str);
      re.lastIndex = raw3.lastIndex;
      return result;
    }
    var groups = state.groups;
    var sticky = UNSUPPORTED_Y$1 && re.sticky;
    var flags = call$h(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;
    if (sticky) {
      flags = replace$6(flags, "y", "");
      if (indexOf$1(flags, "g") === -1) {
        flags += "g";
      }
      strCopy = stringSlice$a(str, re.lastIndex);
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$b(str, re.lastIndex - 1) !== "\n")) {
        source = "(?: " + source + ")";
        strCopy = " " + strCopy;
        charsAdded++;
      }
      reCopy = new RegExp("^(?:" + source + ")", flags);
    }
    if (NPCG_INCLUDED) {
      reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
    }
    if (UPDATES_LAST_INDEX_WRONG)
      lastIndex = re.lastIndex;
    match2 = call$h(nativeExec, sticky ? reCopy : re, strCopy);
    if (sticky) {
      if (match2) {
        match2.input = stringSlice$a(match2.input, charsAdded);
        match2[0] = stringSlice$a(match2[0], charsAdded);
        match2.index = re.lastIndex;
        re.lastIndex += match2[0].length;
      } else
        re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match2) {
      re.lastIndex = re.global ? match2.index + match2[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match2 && match2.length > 1) {
      call$h(nativeReplace, match2[0], reCopy, function() {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === void 0)
            match2[i] = void 0;
        }
      });
    }
    if (match2 && groups) {
      match2.groups = object = create$3(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match2[group[1]];
      }
    }
    return match2;
  };
}
var regexpExec$3 = patchedExec;
var $$P = _export;
var exec$5 = regexpExec$3;
$$P({ target: "RegExp", proto: true, forced: /./.exec !== exec$5 }, {
  exec: exec$5
});
var global$p = global$_;
var DESCRIPTORS$9 = descriptors;
var defineBuiltInAccessor$7 = defineBuiltInAccessor$h;
var regExpFlags = regexpFlags$1;
var fails$p = fails$1p;
var RegExp$2 = global$p.RegExp;
var RegExpPrototype$4 = RegExp$2.prototype;
var FORCED$4 = DESCRIPTORS$9 && fails$p(function() {
  var INDICES_SUPPORT = true;
  try {
    RegExp$2(".", "d");
  } catch (error) {
    INDICES_SUPPORT = false;
  }
  var O = {};
  var calls = "";
  var expected = INDICES_SUPPORT ? "dgimsy" : "gimsy";
  var addGetter2 = function(key2, chr) {
    Object.defineProperty(O, key2, { get: function() {
      calls += chr;
      return true;
    } });
  };
  var pairs = {
    dotAll: "s",
    global: "g",
    ignoreCase: "i",
    multiline: "m",
    sticky: "y"
  };
  if (INDICES_SUPPORT)
    pairs.hasIndices = "d";
  for (var key in pairs)
    addGetter2(key, pairs[key]);
  var result = Object.getOwnPropertyDescriptor(RegExpPrototype$4, "flags").get.call(O);
  return result !== expected || calls !== expected;
});
if (FORCED$4)
  defineBuiltInAccessor$7(RegExpPrototype$4, "flags", {
    configurable: true,
    get: regExpFlags
  });
var DESCRIPTORS$8 = descriptors;
var MISSED_STICKY = regexpStickyHelpers.MISSED_STICKY;
var classof$7 = classofRaw$2;
var defineBuiltInAccessor$6 = defineBuiltInAccessor$h;
var getInternalState$4 = internalState.get;
var RegExpPrototype$3 = RegExp.prototype;
var $TypeError$6 = TypeError;
if (DESCRIPTORS$8 && MISSED_STICKY) {
  defineBuiltInAccessor$6(RegExpPrototype$3, "sticky", {
    configurable: true,
    get: function sticky() {
      if (this === RegExpPrototype$3)
        return;
      if (classof$7(this) === "RegExp") {
        return !!getInternalState$4(this).sticky;
      }
      throw $TypeError$6("Incompatible receiver, RegExp required");
    }
  });
}
var $$O = _export;
var call$g = functionCall;
var isCallable$6 = isCallable$z;
var anObject$b = anObject$D;
var toString$n = toString$C;
var DELEGATES_TO_EXEC = function() {
  var execCalled = false;
  var re = /[ac]/;
  re.exec = function() {
    execCalled = true;
    return /./.exec.apply(this, arguments);
  };
  return re.test("abc") === true && execCalled;
}();
var nativeTest = /./.test;
$$O({ target: "RegExp", proto: true, forced: !DELEGATES_TO_EXEC }, {
  test: function(S) {
    var R = anObject$b(this);
    var string = toString$n(S);
    var exec2 = R.exec;
    if (!isCallable$6(exec2))
      return call$g(nativeTest, R, string);
    var result = call$g(exec2, R, string);
    if (result === null)
      return false;
    anObject$b(result);
    return true;
  }
});
var PROPER_FUNCTION_NAME$1 = functionName.PROPER;
var defineBuiltIn$7 = defineBuiltIn$o;
var anObject$a = anObject$D;
var $toString$2 = toString$C;
var fails$o = fails$1p;
var getRegExpFlags$3 = regexpGetFlags;
var TO_STRING = "toString";
var RegExpPrototype$2 = RegExp.prototype;
var nativeToString = RegExpPrototype$2[TO_STRING];
var NOT_GENERIC = fails$o(function() {
  return nativeToString.call({ source: "a", flags: "b" }) != "/a/b";
});
var INCORRECT_NAME = PROPER_FUNCTION_NAME$1 && nativeToString.name != TO_STRING;
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn$7(RegExp.prototype, TO_STRING, function toString7() {
    var R = anObject$a(this);
    var pattern = $toString$2(R.source);
    var flags = $toString$2(getRegExpFlags$3(R));
    return "/" + pattern + "/" + flags;
  }, { unsafe: true });
}
var collection$2 = collection$4;
var collectionStrong = collectionStrong$2;
collection$2("Set", function(init) {
  return function Set2() {
    return init(this, arguments.length ? arguments[0] : void 0);
  };
}, collectionStrong);
var $$N = _export;
var uncurryThis$B = functionUncurryThis;
var requireObjectCoercible$e = requireObjectCoercible$l;
var toIntegerOrInfinity$6 = toIntegerOrInfinity$l;
var toString$m = toString$C;
var fails$n = fails$1p;
var charAt$a = uncurryThis$B("".charAt);
var FORCED$3 = fails$n(function() {
  return "𠮷".at(-2) !== "\uD842";
});
$$N({ target: "String", proto: true, forced: FORCED$3 }, {
  at: function at2(index) {
    var S = toString$m(requireObjectCoercible$e(this));
    var len = S.length;
    var relativeIndex = toIntegerOrInfinity$6(index);
    var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
    return k < 0 || k >= len ? void 0 : charAt$a(S, k);
  }
});
var uncurryThis$A = functionUncurryThis;
var toIntegerOrInfinity$5 = toIntegerOrInfinity$l;
var toString$l = toString$C;
var requireObjectCoercible$d = requireObjectCoercible$l;
var charAt$9 = uncurryThis$A("".charAt);
var charCodeAt$4 = uncurryThis$A("".charCodeAt);
var stringSlice$9 = uncurryThis$A("".slice);
var createMethod = function(CONVERT_TO_STRING) {
  return function($this, pos) {
    var S = toString$l(requireObjectCoercible$d($this));
    var position = toIntegerOrInfinity$5(pos);
    var size2 = S.length;
    var first, second;
    if (position < 0 || position >= size2)
      return CONVERT_TO_STRING ? "" : void 0;
    first = charCodeAt$4(S, position);
    return first < 55296 || first > 56319 || position + 1 === size2 || (second = charCodeAt$4(S, position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? charAt$9(S, position) : first : CONVERT_TO_STRING ? stringSlice$9(S, position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
  };
};
var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};
var $$M = _export;
var codeAt$1 = stringMultibyte.codeAt;
$$M({ target: "String", proto: true }, {
  codePointAt: function codePointAt(pos) {
    return codeAt$1(this, pos);
  }
});
var isRegExp$3 = isRegexp;
var $TypeError$5 = TypeError;
var notARegexp = function(it) {
  if (isRegExp$3(it)) {
    throw $TypeError$5("The method doesn't accept regular expressions");
  }
  return it;
};
var wellKnownSymbol$8 = wellKnownSymbol$z;
var MATCH = wellKnownSymbol$8("match");
var correctIsRegexpLogic = function(METHOD_NAME) {
  var regexp = /./;
  try {
    "/./"[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return "/./"[METHOD_NAME](regexp);
    } catch (error2) {
    }
  }
  return false;
};
var $$L = _export;
var uncurryThis$z = functionUncurryThisClause;
var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var toLength$7 = toLength$d;
var toString$k = toString$C;
var notARegExp$2 = notARegexp;
var requireObjectCoercible$c = requireObjectCoercible$l;
var correctIsRegExpLogic$2 = correctIsRegexpLogic;
var nativeEndsWith = uncurryThis$z("".endsWith);
var slice$1 = uncurryThis$z("".slice);
var min$4 = Math.min;
var CORRECT_IS_REGEXP_LOGIC$1 = correctIsRegExpLogic$2("endsWith");
var MDN_POLYFILL_BUG$1 = !CORRECT_IS_REGEXP_LOGIC$1 && !!function() {
  var descriptor = getOwnPropertyDescriptor$2(String.prototype, "endsWith");
  return descriptor && !descriptor.writable;
}();
$$L({ target: "String", proto: true, forced: !MDN_POLYFILL_BUG$1 && !CORRECT_IS_REGEXP_LOGIC$1 }, {
  endsWith: function endsWith(searchString) {
    var that = toString$k(requireObjectCoercible$c(this));
    notARegExp$2(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : void 0;
    var len = that.length;
    var end = endPosition === void 0 ? len : min$4(toLength$7(endPosition), len);
    var search = toString$k(searchString);
    return nativeEndsWith ? nativeEndsWith(that, search, end) : slice$1(that, end - search.length, end) === search;
  }
});
var $$K = _export;
var uncurryThis$y = functionUncurryThis;
var toAbsoluteIndex$1 = toAbsoluteIndex$a;
var $RangeError$3 = RangeError;
var fromCharCode$3 = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;
var join$6 = uncurryThis$y([].join);
var INCORRECT_LENGTH = !!$fromCodePoint && $fromCodePoint.length != 1;
$$K({ target: "String", stat: true, arity: 1, forced: INCORRECT_LENGTH }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  fromCodePoint: function fromCodePoint(x) {
    var elements = [];
    var length = arguments.length;
    var i = 0;
    var code;
    while (length > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex$1(code, 1114111) !== code)
        throw $RangeError$3(code + " is not a valid code point");
      elements[i] = code < 65536 ? fromCharCode$3(code) : fromCharCode$3(((code -= 65536) >> 10) + 55296, code % 1024 + 56320);
    }
    return join$6(elements, "");
  }
});
var $$J = _export;
var uncurryThis$x = functionUncurryThis;
var notARegExp$1 = notARegexp;
var requireObjectCoercible$b = requireObjectCoercible$l;
var toString$j = toString$C;
var correctIsRegExpLogic$1 = correctIsRegexpLogic;
var stringIndexOf$3 = uncurryThis$x("".indexOf);
$$J({ target: "String", proto: true, forced: !correctIsRegExpLogic$1("includes") }, {
  includes: function includes2(searchString) {
    return !!~stringIndexOf$3(
      toString$j(requireObjectCoercible$b(this)),
      toString$j(notARegExp$1(searchString)),
      arguments.length > 1 ? arguments[1] : void 0
    );
  }
});
var $$I = _export;
var uncurryThis$w = functionUncurryThis;
var requireObjectCoercible$a = requireObjectCoercible$l;
var toString$i = toString$C;
var charCodeAt$3 = uncurryThis$w("".charCodeAt);
$$I({ target: "String", proto: true }, {
  isWellFormed: function isWellFormed() {
    var S = toString$i(requireObjectCoercible$a(this));
    var length = S.length;
    for (var i = 0; i < length; i++) {
      var charCode = charCodeAt$3(S, i);
      if ((charCode & 63488) != 55296)
        continue;
      if (charCode >= 56320 || ++i >= length || (charCodeAt$3(S, i) & 64512) != 56320)
        return false;
    }
    return true;
  }
});
var charAt$8 = stringMultibyte.charAt;
var toString$h = toString$C;
var InternalStateModule$6 = internalState;
var defineIterator = iteratorDefine;
var createIterResultObject$1 = createIterResultObject$4;
var STRING_ITERATOR = "String Iterator";
var setInternalState$6 = InternalStateModule$6.set;
var getInternalState$3 = InternalStateModule$6.getterFor(STRING_ITERATOR);
defineIterator(String, "String", function(iterated) {
  setInternalState$6(this, {
    type: STRING_ITERATOR,
    string: toString$h(iterated),
    index: 0
  });
}, function next() {
  var state = getInternalState$3(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length)
    return createIterResultObject$1(void 0, true);
  point = charAt$8(string, index);
  state.index += point.length;
  return createIterResultObject$1(point, false);
});
var uncurryThis$v = functionUncurryThisClause;
var defineBuiltIn$6 = defineBuiltIn$o;
var regexpExec$2 = regexpExec$3;
var fails$m = fails$1p;
var wellKnownSymbol$7 = wellKnownSymbol$z;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$f;
var SPECIES = wellKnownSymbol$7("species");
var RegExpPrototype$1 = RegExp.prototype;
var fixRegexpWellKnownSymbolLogic = function(KEY, exec2, FORCED2, SHAM) {
  var SYMBOL2 = wellKnownSymbol$7(KEY);
  var DELEGATES_TO_SYMBOL = !fails$m(function() {
    var O = {};
    O[SYMBOL2] = function() {
      return 7;
    };
    return ""[KEY](O) != 7;
  });
  var DELEGATES_TO_EXEC2 = DELEGATES_TO_SYMBOL && !fails$m(function() {
    var execCalled = false;
    var re = /a/;
    if (KEY === "split") {
      re = {};
      re.constructor = {};
      re.constructor[SPECIES] = function() {
        return re;
      };
      re.flags = "";
      re[SYMBOL2] = /./[SYMBOL2];
    }
    re.exec = function() {
      execCalled = true;
      return null;
    };
    re[SYMBOL2]("");
    return !execCalled;
  });
  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC2 || FORCED2) {
    var uncurriedNativeRegExpMethod = uncurryThis$v(/./[SYMBOL2]);
    var methods = exec2(SYMBOL2, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis$v(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec$2 || $exec === RegExpPrototype$1.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });
    defineBuiltIn$6(String.prototype, KEY, methods[0]);
    defineBuiltIn$6(RegExpPrototype$1, SYMBOL2, methods[1]);
  }
  if (SHAM)
    createNonEnumerableProperty$4(RegExpPrototype$1[SYMBOL2], "sham", true);
};
var charAt$7 = stringMultibyte.charAt;
var advanceStringIndex$4 = function(S, index, unicode) {
  return index + (unicode ? charAt$7(S, index).length : 1);
};
var call$f = functionCall;
var anObject$9 = anObject$D;
var isCallable$5 = isCallable$z;
var classof$6 = classofRaw$2;
var regexpExec$1 = regexpExec$3;
var $TypeError$4 = TypeError;
var regexpExecAbstract = function(R, S) {
  var exec2 = R.exec;
  if (isCallable$5(exec2)) {
    var result = call$f(exec2, R, S);
    if (result !== null)
      anObject$9(result);
    return result;
  }
  if (classof$6(R) === "RegExp")
    return call$f(regexpExec$1, R, S);
  throw $TypeError$4("RegExp#exec called on incompatible receiver");
};
var call$e = functionCall;
var fixRegExpWellKnownSymbolLogic$3 = fixRegexpWellKnownSymbolLogic;
var anObject$8 = anObject$D;
var isNullOrUndefined$7 = isNullOrUndefined$e;
var toLength$6 = toLength$d;
var toString$g = toString$C;
var requireObjectCoercible$9 = requireObjectCoercible$l;
var getMethod$5 = getMethod$9;
var advanceStringIndex$3 = advanceStringIndex$4;
var regExpExec$3 = regexpExecAbstract;
fixRegExpWellKnownSymbolLogic$3("match", function(MATCH2, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match2(regexp) {
      var O = requireObjectCoercible$9(this);
      var matcher = isNullOrUndefined$7(regexp) ? void 0 : getMethod$5(regexp, MATCH2);
      return matcher ? call$e(matcher, regexp, O) : new RegExp(regexp)[MATCH2](toString$g(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function(string) {
      var rx = anObject$8(this);
      var S = toString$g(string);
      var res = maybeCallNative(nativeMatch, rx, S);
      if (res.done)
        return res.value;
      if (!rx.global)
        return regExpExec$3(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec$3(rx, S)) !== null) {
        var matchStr = toString$g(result[0]);
        A[n] = matchStr;
        if (matchStr === "")
          rx.lastIndex = advanceStringIndex$3(S, toLength$6(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});
var $$H = _export;
var call$d = functionCall;
var uncurryThis$u = functionUncurryThisClause;
var createIteratorConstructor$1 = iteratorCreateConstructor;
var createIterResultObject = createIterResultObject$4;
var requireObjectCoercible$8 = requireObjectCoercible$l;
var toLength$5 = toLength$d;
var toString$f = toString$C;
var anObject$7 = anObject$D;
var isNullOrUndefined$6 = isNullOrUndefined$e;
var classof$5 = classofRaw$2;
var isRegExp$2 = isRegexp;
var getRegExpFlags$2 = regexpGetFlags;
var getMethod$4 = getMethod$9;
var defineBuiltIn$5 = defineBuiltIn$o;
var fails$l = fails$1p;
var wellKnownSymbol$6 = wellKnownSymbol$z;
var speciesConstructor$2 = speciesConstructor$6;
var advanceStringIndex$2 = advanceStringIndex$4;
var regExpExec$2 = regexpExecAbstract;
var InternalStateModule$5 = internalState;
var IS_PURE$1 = isPure;
var MATCH_ALL = wellKnownSymbol$6("matchAll");
var REGEXP_STRING = "RegExp String";
var REGEXP_STRING_ITERATOR = REGEXP_STRING + " Iterator";
var setInternalState$5 = InternalStateModule$5.set;
var getInternalState$2 = InternalStateModule$5.getterFor(REGEXP_STRING_ITERATOR);
var RegExpPrototype = RegExp.prototype;
var $TypeError$3 = TypeError;
var stringIndexOf$2 = uncurryThis$u("".indexOf);
var nativeMatchAll = uncurryThis$u("".matchAll);
var WORKS_WITH_NON_GLOBAL_REGEX = !!nativeMatchAll && !fails$l(function() {
  nativeMatchAll("a", /./);
});
var $RegExpStringIterator = createIteratorConstructor$1(function RegExpStringIterator(regexp, string, $global, fullUnicode) {
  setInternalState$5(this, {
    type: REGEXP_STRING_ITERATOR,
    regexp,
    string,
    global: $global,
    unicode: fullUnicode,
    done: false
  });
}, REGEXP_STRING, function next2() {
  var state = getInternalState$2(this);
  if (state.done)
    return createIterResultObject(void 0, true);
  var R = state.regexp;
  var S = state.string;
  var match2 = regExpExec$2(R, S);
  if (match2 === null) {
    state.done = true;
    return createIterResultObject(void 0, true);
  }
  if (state.global) {
    if (toString$f(match2[0]) === "")
      R.lastIndex = advanceStringIndex$2(S, toLength$5(R.lastIndex), state.unicode);
    return createIterResultObject(match2, false);
  }
  state.done = true;
  return createIterResultObject(match2, false);
});
var $matchAll = function(string) {
  var R = anObject$7(this);
  var S = toString$f(string);
  var C = speciesConstructor$2(R, RegExp);
  var flags = toString$f(getRegExpFlags$2(R));
  var matcher, $global, fullUnicode;
  matcher = new C(C === RegExp ? R.source : R, flags);
  $global = !!~stringIndexOf$2(flags, "g");
  fullUnicode = !!~stringIndexOf$2(flags, "u");
  matcher.lastIndex = toLength$5(R.lastIndex);
  return new $RegExpStringIterator(matcher, S, $global, fullUnicode);
};
$$H({ target: "String", proto: true, forced: WORKS_WITH_NON_GLOBAL_REGEX }, {
  matchAll: function matchAll(regexp) {
    var O = requireObjectCoercible$8(this);
    var flags, S, matcher, rx;
    if (!isNullOrUndefined$6(regexp)) {
      if (isRegExp$2(regexp)) {
        flags = toString$f(requireObjectCoercible$8(getRegExpFlags$2(regexp)));
        if (!~stringIndexOf$2(flags, "g"))
          throw $TypeError$3("`.matchAll` does not allow non-global regexes");
      }
      if (WORKS_WITH_NON_GLOBAL_REGEX)
        return nativeMatchAll(O, regexp);
      matcher = getMethod$4(regexp, MATCH_ALL);
      if (matcher === void 0 && IS_PURE$1 && classof$5(regexp) == "RegExp")
        matcher = $matchAll;
      if (matcher)
        return call$d(matcher, regexp, O);
    } else if (WORKS_WITH_NON_GLOBAL_REGEX)
      return nativeMatchAll(O, regexp);
    S = toString$f(O);
    rx = new RegExp(regexp, "g");
    return rx[MATCH_ALL](S);
  }
});
MATCH_ALL in RegExpPrototype || defineBuiltIn$5(RegExpPrototype, MATCH_ALL, $matchAll);
var userAgent = engineUserAgent;
var stringPadWebkitBug = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(userAgent);
var $$G = _export;
var $padEnd = stringPad.end;
var WEBKIT_BUG$1 = stringPadWebkitBug;
$$G({ target: "String", proto: true, forced: WEBKIT_BUG$1 }, {
  padEnd: function padEnd(maxLength) {
    return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var $$F = _export;
var $padStart = stringPad.start;
var WEBKIT_BUG = stringPadWebkitBug;
$$F({ target: "String", proto: true, forced: WEBKIT_BUG }, {
  padStart: function padStart2(maxLength) {
    return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : void 0);
  }
});
var $$E = _export;
var uncurryThis$t = functionUncurryThis;
var toIndexedObject$1 = toIndexedObject$j;
var toObject$2 = toObject$t;
var toString$e = toString$C;
var lengthOfArrayLike$4 = lengthOfArrayLike$t;
var push$7 = uncurryThis$t([].push);
var join$5 = uncurryThis$t([].join);
$$E({ target: "String", stat: true }, {
  raw: function raw2(template) {
    var rawTemplate = toIndexedObject$1(toObject$2(template).raw);
    var literalSegments = lengthOfArrayLike$4(rawTemplate);
    if (!literalSegments)
      return "";
    var argumentsLength = arguments.length;
    var elements = [];
    var i = 0;
    while (true) {
      push$7(elements, toString$e(rawTemplate[i++]));
      if (i === literalSegments)
        return join$5(elements, "");
      if (i < argumentsLength)
        push$7(elements, toString$e(arguments[i]));
    }
  }
});
var $$D = _export;
var repeat2 = stringRepeat;
$$D({ target: "String", proto: true }, {
  repeat: repeat2
});
var uncurryThis$s = functionUncurryThis;
var toObject$1 = toObject$t;
var floor$3 = Math.floor;
var charAt$6 = uncurryThis$s("".charAt);
var replace$5 = uncurryThis$s("".replace);
var stringSlice$8 = uncurryThis$s("".slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;
var getSubstitution$2 = function(matched, str, position, captures, namedCaptures, replacement2) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== void 0) {
    namedCaptures = toObject$1(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace$5(replacement2, symbols, function(match2, ch) {
    var capture;
    switch (charAt$6(ch, 0)) {
      case "$":
        return "$";
      case "&":
        return matched;
      case "`":
        return stringSlice$8(str, 0, position);
      case "'":
        return stringSlice$8(str, tailPos);
      case "<":
        capture = namedCaptures[stringSlice$8(ch, 1, -1)];
        break;
      default:
        var n = +ch;
        if (n === 0)
          return match2;
        if (n > m) {
          var f = floor$3(n / 10);
          if (f === 0)
            return match2;
          if (f <= m)
            return captures[f - 1] === void 0 ? charAt$6(ch, 1) : captures[f - 1] + charAt$6(ch, 1);
          return match2;
        }
        capture = captures[n - 1];
    }
    return capture === void 0 ? "" : capture;
  });
};
var apply$4 = functionApply$1;
var call$c = functionCall;
var uncurryThis$r = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic$2 = fixRegexpWellKnownSymbolLogic;
var fails$k = fails$1p;
var anObject$6 = anObject$D;
var isCallable$4 = isCallable$z;
var isNullOrUndefined$5 = isNullOrUndefined$e;
var toIntegerOrInfinity$4 = toIntegerOrInfinity$l;
var toLength$4 = toLength$d;
var toString$d = toString$C;
var requireObjectCoercible$7 = requireObjectCoercible$l;
var advanceStringIndex$1 = advanceStringIndex$4;
var getMethod$3 = getMethod$9;
var getSubstitution$1 = getSubstitution$2;
var regExpExec$1 = regexpExecAbstract;
var wellKnownSymbol$5 = wellKnownSymbol$z;
var REPLACE$1 = wellKnownSymbol$5("replace");
var max$2 = Math.max;
var min$3 = Math.min;
var concat2 = uncurryThis$r([].concat);
var push$6 = uncurryThis$r([].push);
var stringIndexOf$1 = uncurryThis$r("".indexOf);
var stringSlice$7 = uncurryThis$r("".slice);
var maybeToString = function(it) {
  return it === void 0 ? it : String(it);
};
var REPLACE_KEEPS_$0 = function() {
  return "a".replace(/./, "$0") === "$0";
}();
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function() {
  if (/./[REPLACE$1]) {
    return /./[REPLACE$1]("a", "$0") === "";
  }
  return false;
}();
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails$k(function() {
  var re = /./;
  re.exec = function() {
    var result = [];
    result.groups = { a: "7" };
    return result;
  };
  return "".replace(re, "$<a>") !== "7";
});
fixRegExpWellKnownSymbolLogic$2("replace", function(_, nativeReplace2, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? "$" : "$0";
  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace2(searchValue, replaceValue) {
      var O = requireObjectCoercible$7(this);
      var replacer2 = isNullOrUndefined$5(searchValue) ? void 0 : getMethod$3(searchValue, REPLACE$1);
      return replacer2 ? call$c(replacer2, searchValue, O, replaceValue) : call$c(nativeReplace2, toString$d(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function(string, replaceValue) {
      var rx = anObject$6(this);
      var S = toString$d(string);
      if (typeof replaceValue == "string" && stringIndexOf$1(replaceValue, UNSAFE_SUBSTITUTE) === -1 && stringIndexOf$1(replaceValue, "$<") === -1) {
        var res = maybeCallNative(nativeReplace2, rx, S, replaceValue);
        if (res.done)
          return res.value;
      }
      var functionalReplace = isCallable$4(replaceValue);
      if (!functionalReplace)
        replaceValue = toString$d(replaceValue);
      var global2 = rx.global;
      if (global2) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec$1(rx, S);
        if (result === null)
          break;
        push$6(results, result);
        if (!global2)
          break;
        var matchStr = toString$d(result[0]);
        if (matchStr === "")
          rx.lastIndex = advanceStringIndex$1(S, toLength$4(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = "";
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = toString$d(result[0]);
        var position = max$2(min$3(toIntegerOrInfinity$4(result.index), S.length), 0);
        var captures = [];
        for (var j = 1; j < result.length; j++)
          push$6(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat2([matched], captures, position, S);
          if (namedCaptures !== void 0)
            push$6(replacerArgs, namedCaptures);
          var replacement2 = toString$d(apply$4(replaceValue, void 0, replacerArgs));
        } else {
          replacement2 = getSubstitution$1(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice$7(S, nextSourcePosition, position) + replacement2;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice$7(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);
var $$C = _export;
var call$b = functionCall;
var uncurryThis$q = functionUncurryThis;
var requireObjectCoercible$6 = requireObjectCoercible$l;
var isCallable$3 = isCallable$z;
var isNullOrUndefined$4 = isNullOrUndefined$e;
var isRegExp$1 = isRegexp;
var toString$c = toString$C;
var getMethod$2 = getMethod$9;
var getRegExpFlags$1 = regexpGetFlags;
var getSubstitution = getSubstitution$2;
var wellKnownSymbol$4 = wellKnownSymbol$z;
var REPLACE = wellKnownSymbol$4("replace");
var $TypeError$2 = TypeError;
var indexOf2 = uncurryThis$q("".indexOf);
uncurryThis$q("".replace);
var stringSlice$6 = uncurryThis$q("".slice);
var max$1 = Math.max;
var stringIndexOf = function(string, searchValue, fromIndex) {
  if (fromIndex > string.length)
    return -1;
  if (searchValue === "")
    return fromIndex;
  return indexOf2(string, searchValue, fromIndex);
};
$$C({ target: "String", proto: true }, {
  replaceAll: function replaceAll(searchValue, replaceValue) {
    var O = requireObjectCoercible$6(this);
    var IS_REG_EXP, flags, replacer2, string, searchString, functionalReplace, searchLength, advanceBy, replacement2;
    var position = 0;
    var endOfLastMatch = 0;
    var result = "";
    if (!isNullOrUndefined$4(searchValue)) {
      IS_REG_EXP = isRegExp$1(searchValue);
      if (IS_REG_EXP) {
        flags = toString$c(requireObjectCoercible$6(getRegExpFlags$1(searchValue)));
        if (!~indexOf2(flags, "g"))
          throw $TypeError$2("`.replaceAll` does not allow non-global regexes");
      }
      replacer2 = getMethod$2(searchValue, REPLACE);
      if (replacer2) {
        return call$b(replacer2, searchValue, O, replaceValue);
      }
    }
    string = toString$c(O);
    searchString = toString$c(searchValue);
    functionalReplace = isCallable$3(replaceValue);
    if (!functionalReplace)
      replaceValue = toString$c(replaceValue);
    searchLength = searchString.length;
    advanceBy = max$1(1, searchLength);
    position = stringIndexOf(string, searchString, 0);
    while (position !== -1) {
      replacement2 = functionalReplace ? toString$c(replaceValue(searchString, position, string)) : getSubstitution(searchString, string, position, [], void 0, replaceValue);
      result += stringSlice$6(string, endOfLastMatch, position) + replacement2;
      endOfLastMatch = position + searchLength;
      position = stringIndexOf(string, searchString, position + advanceBy);
    }
    if (endOfLastMatch < string.length) {
      result += stringSlice$6(string, endOfLastMatch);
    }
    return result;
  }
});
var call$a = functionCall;
var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
var anObject$5 = anObject$D;
var isNullOrUndefined$3 = isNullOrUndefined$e;
var requireObjectCoercible$5 = requireObjectCoercible$l;
var sameValue = sameValue$1;
var toString$b = toString$C;
var getMethod$1 = getMethod$9;
var regExpExec = regexpExecAbstract;
fixRegExpWellKnownSymbolLogic$1("search", function(SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible$5(this);
      var searcher = isNullOrUndefined$3(regexp) ? void 0 : getMethod$1(regexp, SEARCH);
      return searcher ? call$a(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString$b(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function(string) {
      var rx = anObject$5(this);
      var S = toString$b(string);
      var res = maybeCallNative(nativeSearch, rx, S);
      if (res.done)
        return res.value;
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0))
        rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex))
        rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});
var apply$3 = functionApply$1;
var call$9 = functionCall;
var uncurryThis$p = functionUncurryThis;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var anObject$4 = anObject$D;
var isNullOrUndefined$2 = isNullOrUndefined$e;
var isRegExp = isRegexp;
var requireObjectCoercible$4 = requireObjectCoercible$l;
var speciesConstructor$1 = speciesConstructor$6;
var advanceStringIndex = advanceStringIndex$4;
var toLength$3 = toLength$d;
var toString$a = toString$C;
var getMethod = getMethod$9;
var arraySlice$4 = arraySliceSimple;
var callRegExpExec = regexpExecAbstract;
var regexpExec = regexpExec$3;
var stickyHelpers = regexpStickyHelpers;
var fails$j = fails$1p;
var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 4294967295;
var min$2 = Math.min;
var $push = [].push;
var exec$4 = uncurryThis$p(/./.exec);
var push$5 = uncurryThis$p($push);
var stringSlice$5 = uncurryThis$p("".slice);
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails$j(function() {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function() {
    return originalExec.apply(this, arguments);
  };
  var result = "ab".split(re);
  return result.length !== 2 || result[0] !== "a" || result[1] !== "b";
});
fixRegExpWellKnownSymbolLogic("split", function(SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if ("abbc".split(/(b)*/)[1] == "c" || // eslint-disable-next-line regexp/no-empty-group -- required for testing
  "test".split(/(?:)/, -1).length != 4 || "ab".split(/(?:ab)*/).length != 2 || ".".split(/(.?)(.?)/).length != 4 || // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
  ".".split(/()()/).length > 1 || "".split(/.?/).length) {
    internalSplit = function(separator, limit) {
      var string = toString$a(requireObjectCoercible$4(this));
      var lim = limit === void 0 ? MAX_UINT32 : limit >>> 0;
      if (lim === 0)
        return [];
      if (separator === void 0)
        return [string];
      if (!isRegExp(separator)) {
        return call$9(nativeSplit, string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.unicode ? "u" : "") + (separator.sticky ? "y" : "");
      var lastLastIndex = 0;
      var separatorCopy = new RegExp(separator.source, flags + "g");
      var match2, lastIndex, lastLength;
      while (match2 = call$9(regexpExec, separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          push$5(output, stringSlice$5(string, lastLastIndex, match2.index));
          if (match2.length > 1 && match2.index < string.length)
            apply$3($push, output, arraySlice$4(match2, 1));
          lastLength = match2[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim)
            break;
        }
        if (separatorCopy.lastIndex === match2.index)
          separatorCopy.lastIndex++;
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !exec$4(separatorCopy, ""))
          push$5(output, "");
      } else
        push$5(output, stringSlice$5(string, lastLastIndex));
      return output.length > lim ? arraySlice$4(output, 0, lim) : output;
    };
  } else if ("0".split(void 0, 0).length) {
    internalSplit = function(separator, limit) {
      return separator === void 0 && limit === 0 ? [] : call$9(nativeSplit, this, separator, limit);
    };
  } else
    internalSplit = nativeSplit;
  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split2(separator, limit) {
      var O = requireObjectCoercible$4(this);
      var splitter = isNullOrUndefined$2(separator) ? void 0 : getMethod(separator, SPLIT);
      return splitter ? call$9(splitter, separator, O, limit) : call$9(internalSplit, toString$a(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function(string, limit) {
      var rx = anObject$4(this);
      var S = toString$a(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);
      if (res.done)
        return res.value;
      var C = speciesConstructor$1(rx, RegExp);
      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? "i" : "") + (rx.multiline ? "m" : "") + (rx.unicode ? "u" : "") + (UNSUPPORTED_Y ? "g" : "y");
      var splitter = new C(UNSUPPORTED_Y ? "^(?:" + rx.source + ")" : rx, flags);
      var lim = limit === void 0 ? MAX_UINT32 : limit >>> 0;
      if (lim === 0)
        return [];
      if (S.length === 0)
        return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice$5(S, q) : S);
        var e;
        if (z === null || (e = min$2(toLength$3(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          push$5(A, stringSlice$5(S, p, q));
          if (A.length === lim)
            return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push$5(A, z[i]);
            if (A.length === lim)
              return A;
          }
          q = p = e;
        }
      }
      push$5(A, stringSlice$5(S, p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);
var $$B = _export;
var uncurryThis$o = functionUncurryThisClause;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var toLength$2 = toLength$d;
var toString$9 = toString$C;
var notARegExp = notARegexp;
var requireObjectCoercible$3 = requireObjectCoercible$l;
var correctIsRegExpLogic = correctIsRegexpLogic;
var nativeStartsWith = uncurryThis$o("".startsWith);
var stringSlice$4 = uncurryThis$o("".slice);
var min$1 = Math.min;
var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic("startsWith");
var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function() {
  var descriptor = getOwnPropertyDescriptor$1(String.prototype, "startsWith");
  return descriptor && !descriptor.writable;
}();
$$B({ target: "String", proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  startsWith: function startsWith(searchString) {
    var that = toString$9(requireObjectCoercible$3(this));
    notARegExp(searchString);
    var index = toLength$2(min$1(arguments.length > 1 ? arguments[1] : void 0, that.length));
    var search = toString$9(searchString);
    return nativeStartsWith ? nativeStartsWith(that, search, index) : stringSlice$4(that, index, index + search.length) === search;
  }
});
var $$A = _export;
var uncurryThis$n = functionUncurryThis;
var requireObjectCoercible$2 = requireObjectCoercible$l;
var toIntegerOrInfinity$3 = toIntegerOrInfinity$l;
var toString$8 = toString$C;
var stringSlice$3 = uncurryThis$n("".slice);
var max = Math.max;
var min = Math.min;
var FORCED$2 = !"".substr || "ab".substr(-1) !== "b";
$$A({ target: "String", proto: true, forced: FORCED$2 }, {
  substr: function substr(start, length) {
    var that = toString$8(requireObjectCoercible$2(this));
    var size2 = that.length;
    var intStart = toIntegerOrInfinity$3(start);
    var intLength, intEnd;
    if (intStart === Infinity)
      intStart = 0;
    if (intStart < 0)
      intStart = max(size2 + intStart, 0);
    intLength = length === void 0 ? size2 : toIntegerOrInfinity$3(length);
    if (intLength <= 0 || intLength === Infinity)
      return "";
    intEnd = min(intStart + intLength, size2);
    return intStart >= intEnd ? "" : stringSlice$3(that, intStart, intEnd);
  }
});
var $$z = _export;
var call$8 = functionCall;
var uncurryThis$m = functionUncurryThis;
var requireObjectCoercible$1 = requireObjectCoercible$l;
var toString$7 = toString$C;
var fails$i = fails$1p;
var $Array = Array;
var charAt$5 = uncurryThis$m("".charAt);
var charCodeAt$2 = uncurryThis$m("".charCodeAt);
var join$4 = uncurryThis$m([].join);
var $toWellFormed = "".toWellFormed;
var REPLACEMENT_CHARACTER = "�";
var TO_STRING_CONVERSION_BUG = $toWellFormed && fails$i(function() {
  return call$8($toWellFormed, 1) !== "1";
});
$$z({ target: "String", proto: true, forced: TO_STRING_CONVERSION_BUG }, {
  toWellFormed: function toWellFormed() {
    var S = toString$7(requireObjectCoercible$1(this));
    if (TO_STRING_CONVERSION_BUG)
      return call$8($toWellFormed, S);
    var length = S.length;
    var result = $Array(length);
    for (var i = 0; i < length; i++) {
      var charCode = charCodeAt$2(S, i);
      if ((charCode & 63488) != 55296)
        result[i] = charAt$5(S, i);
      else if (charCode >= 56320 || i + 1 >= length || (charCodeAt$2(S, i + 1) & 64512) != 56320)
        result[i] = REPLACEMENT_CHARACTER;
      else {
        result[i] = charAt$5(S, i);
        result[++i] = charAt$5(S, i);
      }
    }
    return join$4(result, "");
  }
});
var PROPER_FUNCTION_NAME = functionName.PROPER;
var fails$h = fails$1p;
var whitespaces$1 = whitespaces$5;
var non = "​᠎";
var stringTrimForced = function(METHOD_NAME) {
  return fails$h(function() {
    return !!whitespaces$1[METHOD_NAME]() || non[METHOD_NAME]() !== non || PROPER_FUNCTION_NAME && whitespaces$1[METHOD_NAME].name !== METHOD_NAME;
  });
};
var $$y = _export;
var $trim = stringTrim.trim;
var forcedStringTrimMethod$2 = stringTrimForced;
$$y({ target: "String", proto: true, forced: forcedStringTrimMethod$2("trim") }, {
  trim: function trim2() {
    return $trim(this);
  }
});
var $trimEnd = stringTrim.end;
var forcedStringTrimMethod$1 = stringTrimForced;
var stringTrimEnd = forcedStringTrimMethod$1("trimEnd") ? function trimEnd() {
  return $trimEnd(this);
} : "".trimEnd;
var $$x = _export;
var trimEnd$1 = stringTrimEnd;
$$x({ target: "String", proto: true, name: "trimEnd", forced: "".trimRight !== trimEnd$1 }, {
  trimRight: trimEnd$1
});
var $$w = _export;
var trimEnd2 = stringTrimEnd;
$$w({ target: "String", proto: true, name: "trimEnd", forced: "".trimEnd !== trimEnd2 }, {
  trimEnd: trimEnd2
});
var $trimStart = stringTrim.start;
var forcedStringTrimMethod = stringTrimForced;
var stringTrimStart = forcedStringTrimMethod("trimStart") ? function trimStart() {
  return $trimStart(this);
} : "".trimStart;
var $$v = _export;
var trimStart$1 = stringTrimStart;
$$v({ target: "String", proto: true, name: "trimStart", forced: "".trimLeft !== trimStart$1 }, {
  trimLeft: trimStart$1
});
var $$u = _export;
var trimStart2 = stringTrimStart;
$$u({ target: "String", proto: true, name: "trimStart", forced: "".trimStart !== trimStart2 }, {
  trimStart: trimStart2
});
var uncurryThis$l = functionUncurryThis;
var requireObjectCoercible = requireObjectCoercible$l;
var toString$6 = toString$C;
var quot = /"/g;
var replace$4 = uncurryThis$l("".replace);
var createHtml = function(string, tag, attribute, value) {
  var S = toString$6(requireObjectCoercible(string));
  var p1 = "<" + tag;
  if (attribute !== "")
    p1 += " " + attribute + '="' + replace$4(toString$6(value), quot, "&quot;") + '"';
  return p1 + ">" + S + "</" + tag + ">";
};
var fails$g = fails$1p;
var stringHtmlForced = function(METHOD_NAME) {
  return fails$g(function() {
    var test2 = ""[METHOD_NAME]('"');
    return test2 !== test2.toLowerCase() || test2.split('"').length > 3;
  });
};
var $$t = _export;
var createHTML$c = createHtml;
var forcedStringHTMLMethod$c = stringHtmlForced;
$$t({ target: "String", proto: true, forced: forcedStringHTMLMethod$c("anchor") }, {
  anchor: function anchor(name) {
    return createHTML$c(this, "a", "name", name);
  }
});
var $$s = _export;
var createHTML$b = createHtml;
var forcedStringHTMLMethod$b = stringHtmlForced;
$$s({ target: "String", proto: true, forced: forcedStringHTMLMethod$b("big") }, {
  big: function big() {
    return createHTML$b(this, "big", "", "");
  }
});
var $$r = _export;
var createHTML$a = createHtml;
var forcedStringHTMLMethod$a = stringHtmlForced;
$$r({ target: "String", proto: true, forced: forcedStringHTMLMethod$a("blink") }, {
  blink: function blink() {
    return createHTML$a(this, "blink", "", "");
  }
});
var $$q = _export;
var createHTML$9 = createHtml;
var forcedStringHTMLMethod$9 = stringHtmlForced;
$$q({ target: "String", proto: true, forced: forcedStringHTMLMethod$9("bold") }, {
  bold: function bold() {
    return createHTML$9(this, "b", "", "");
  }
});
var $$p = _export;
var createHTML$8 = createHtml;
var forcedStringHTMLMethod$8 = stringHtmlForced;
$$p({ target: "String", proto: true, forced: forcedStringHTMLMethod$8("fixed") }, {
  fixed: function fixed() {
    return createHTML$8(this, "tt", "", "");
  }
});
var $$o = _export;
var createHTML$7 = createHtml;
var forcedStringHTMLMethod$7 = stringHtmlForced;
$$o({ target: "String", proto: true, forced: forcedStringHTMLMethod$7("fontcolor") }, {
  fontcolor: function fontcolor(color) {
    return createHTML$7(this, "font", "color", color);
  }
});
var $$n = _export;
var createHTML$6 = createHtml;
var forcedStringHTMLMethod$6 = stringHtmlForced;
$$n({ target: "String", proto: true, forced: forcedStringHTMLMethod$6("fontsize") }, {
  fontsize: function fontsize(size2) {
    return createHTML$6(this, "font", "size", size2);
  }
});
var $$m = _export;
var createHTML$5 = createHtml;
var forcedStringHTMLMethod$5 = stringHtmlForced;
$$m({ target: "String", proto: true, forced: forcedStringHTMLMethod$5("italics") }, {
  italics: function italics() {
    return createHTML$5(this, "i", "", "");
  }
});
var $$l = _export;
var createHTML$4 = createHtml;
var forcedStringHTMLMethod$4 = stringHtmlForced;
$$l({ target: "String", proto: true, forced: forcedStringHTMLMethod$4("link") }, {
  link: function link(url) {
    return createHTML$4(this, "a", "href", url);
  }
});
var $$k = _export;
var createHTML$3 = createHtml;
var forcedStringHTMLMethod$3 = stringHtmlForced;
$$k({ target: "String", proto: true, forced: forcedStringHTMLMethod$3("small") }, {
  small: function small() {
    return createHTML$3(this, "small", "", "");
  }
});
var $$j = _export;
var createHTML$2 = createHtml;
var forcedStringHTMLMethod$2 = stringHtmlForced;
$$j({ target: "String", proto: true, forced: forcedStringHTMLMethod$2("strike") }, {
  strike: function strike() {
    return createHTML$2(this, "strike", "", "");
  }
});
var $$i = _export;
var createHTML$1 = createHtml;
var forcedStringHTMLMethod$1 = stringHtmlForced;
$$i({ target: "String", proto: true, forced: forcedStringHTMLMethod$1("sub") }, {
  sub: function sub() {
    return createHTML$1(this, "sub", "", "");
  }
});
var $$h = _export;
var createHTML = createHtml;
var forcedStringHTMLMethod = stringHtmlForced;
$$h({ target: "String", proto: true, forced: forcedStringHTMLMethod("sup") }, {
  sup: function sup() {
    return createHTML(this, "sup", "", "");
  }
});
var typedArrayConstructor = { exports: {} };
var global$o = global$_;
var fails$f = fails$1p;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$4;
var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
var ArrayBuffer$2 = global$o.ArrayBuffer;
var Int8Array$3 = global$o.Int8Array;
var typedArrayConstructorsRequireWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails$f(function() {
  Int8Array$3(1);
}) || !fails$f(function() {
  new Int8Array$3(-1);
}) || !checkCorrectnessOfIteration(function(iterable) {
  new Int8Array$3();
  new Int8Array$3(null);
  new Int8Array$3(1.5);
  new Int8Array$3(iterable);
}, true) || fails$f(function() {
  return new Int8Array$3(new ArrayBuffer$2(2), 1, void 0).length !== 1;
});
var toIntegerOrInfinity$2 = toIntegerOrInfinity$l;
var $RangeError$2 = RangeError;
var toPositiveInteger$1 = function(it) {
  var result = toIntegerOrInfinity$2(it);
  if (result < 0)
    throw $RangeError$2("The argument can't be less than 0");
  return result;
};
var toPositiveInteger = toPositiveInteger$1;
var $RangeError$1 = RangeError;
var toOffset$2 = function(it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES)
    throw $RangeError$1("Wrong offset");
  return offset;
};
var classof$4 = classof$m;
var isBigIntArray$2 = function(it) {
  var klass = classof$4(it);
  return klass == "BigInt64Array" || klass == "BigUint64Array";
};
var toPrimitive = toPrimitive$4;
var $TypeError$1 = TypeError;
var toBigInt$3 = function(argument) {
  var prim = toPrimitive(argument, "number");
  if (typeof prim == "number")
    throw $TypeError$1("Can't convert number to bigint");
  return BigInt(prim);
};
var bind$2 = functionBindContext;
var call$7 = functionCall;
var aConstructor = aConstructor$3;
var toObject = toObject$t;
var lengthOfArrayLike$3 = lengthOfArrayLike$t;
var getIterator$1 = getIterator$4;
var getIteratorMethod$1 = getIteratorMethod$5;
var isArrayIteratorMethod = isArrayIteratorMethod$3;
var isBigIntArray$1 = isBigIntArray$2;
var aTypedArrayConstructor$3 = arrayBufferViewCore.aTypedArrayConstructor;
var toBigInt$2 = toBigInt$3;
var typedArrayFrom$2 = function from3(source) {
  var C = aConstructor(this);
  var O = toObject(source);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : void 0;
  var mapping = mapfn !== void 0;
  var iteratorMethod = getIteratorMethod$1(O);
  var i, length, result, thisIsBigIntArray, value, step, iterator, next4;
  if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
    iterator = getIterator$1(O, iteratorMethod);
    next4 = iterator.next;
    O = [];
    while (!(step = call$7(next4, iterator)).done) {
      O.push(step.value);
    }
  }
  if (mapping && argumentsLength > 2) {
    mapfn = bind$2(mapfn, arguments[2]);
  }
  length = lengthOfArrayLike$3(O);
  result = new (aTypedArrayConstructor$3(C))(length);
  thisIsBigIntArray = isBigIntArray$1(result);
  for (i = 0; length > i; i++) {
    value = mapping ? mapfn(O[i], i) : O[i];
    result[i] = thisIsBigIntArray ? toBigInt$2(value) : +value;
  }
  return result;
};
var $$g = _export;
var global$n = global$_;
var call$6 = functionCall;
var DESCRIPTORS$7 = descriptors;
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$2 = typedArrayConstructorsRequireWrappers;
var ArrayBufferViewCore$u = arrayBufferViewCore;
var ArrayBufferModule = arrayBuffer;
var anInstance$5 = anInstance$a;
var createPropertyDescriptor$3 = createPropertyDescriptor$c;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$f;
var isIntegralNumber = isIntegralNumber$3;
var toLength$1 = toLength$d;
var toIndex = toIndex$2;
var toOffset$1 = toOffset$2;
var toPropertyKey = toPropertyKey$8;
var hasOwn$7 = hasOwnProperty_1;
var classof$3 = classof$m;
var isObject$4 = isObject$z;
var isSymbol$1 = isSymbol$7;
var create$2 = objectCreate;
var isPrototypeOf = objectIsPrototypeOf;
var setPrototypeOf2 = objectSetPrototypeOf$1;
var getOwnPropertyNames4 = objectGetOwnPropertyNames.f;
var typedArrayFrom$1 = typedArrayFrom$2;
var forEach$3 = arrayIteration.forEach;
var setSpecies = setSpecies$6;
var defineBuiltInAccessor$5 = defineBuiltInAccessor$h;
var definePropertyModule = objectDefineProperty;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var InternalStateModule$4 = internalState;
var inheritIfRequired$1 = inheritIfRequired$6;
var getInternalState$1 = InternalStateModule$4.get;
var setInternalState$4 = InternalStateModule$4.set;
var enforceInternalState$1 = InternalStateModule$4.enforce;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var round = Math.round;
var RangeError$3 = global$n.RangeError;
var ArrayBuffer$1 = ArrayBufferModule.ArrayBuffer;
var ArrayBufferPrototype = ArrayBuffer$1.prototype;
var DataView$1 = ArrayBufferModule.DataView;
var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore$u.NATIVE_ARRAY_BUFFER_VIEWS;
var TYPED_ARRAY_TAG = ArrayBufferViewCore$u.TYPED_ARRAY_TAG;
var TypedArray = ArrayBufferViewCore$u.TypedArray;
var TypedArrayPrototype$1 = ArrayBufferViewCore$u.TypedArrayPrototype;
var aTypedArrayConstructor$2 = ArrayBufferViewCore$u.aTypedArrayConstructor;
var isTypedArray = ArrayBufferViewCore$u.isTypedArray;
var BYTES_PER_ELEMENT = "BYTES_PER_ELEMENT";
var WRONG_LENGTH = "Wrong length";
var fromList = function(C, list) {
  aTypedArrayConstructor$2(C);
  var index = 0;
  var length = list.length;
  var result = new C(length);
  while (length > index)
    result[index] = list[index++];
  return result;
};
var addGetter = function(it, key) {
  defineBuiltInAccessor$5(it, key, {
    configurable: true,
    get: function() {
      return getInternalState$1(this)[key];
    }
  });
};
var isArrayBuffer = function(it) {
  var klass;
  return isPrototypeOf(ArrayBufferPrototype, it) || (klass = classof$3(it)) == "ArrayBuffer" || klass == "SharedArrayBuffer";
};
var isTypedArrayIndex = function(target, key) {
  return isTypedArray(target) && !isSymbol$1(key) && key in target && isIntegralNumber(+key) && key >= 0;
};
var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor5(target, key) {
  key = toPropertyKey(key);
  return isTypedArrayIndex(target, key) ? createPropertyDescriptor$3(2, target[key]) : nativeGetOwnPropertyDescriptor(target, key);
};
var wrappedDefineProperty = function defineProperty5(target, key, descriptor) {
  key = toPropertyKey(key);
  if (isTypedArrayIndex(target, key) && isObject$4(descriptor) && hasOwn$7(descriptor, "value") && !hasOwn$7(descriptor, "get") && !hasOwn$7(descriptor, "set") && !descriptor.configurable && (!hasOwn$7(descriptor, "writable") || descriptor.writable) && (!hasOwn$7(descriptor, "enumerable") || descriptor.enumerable)) {
    target[key] = descriptor.value;
    return target;
  }
  return nativeDefineProperty(target, key, descriptor);
};
if (DESCRIPTORS$7) {
  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
    getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor;
    definePropertyModule.f = wrappedDefineProperty;
    addGetter(TypedArrayPrototype$1, "buffer");
    addGetter(TypedArrayPrototype$1, "byteOffset");
    addGetter(TypedArrayPrototype$1, "byteLength");
    addGetter(TypedArrayPrototype$1, "length");
  }
  $$g({ target: "Object", stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
    defineProperty: wrappedDefineProperty
  });
  typedArrayConstructor.exports = function(TYPE, wrapper2, CLAMPED) {
    var BYTES = TYPE.match(/\d+/)[0] / 8;
    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? "Clamped" : "") + "Array";
    var GETTER = "get" + TYPE;
    var SETTER = "set" + TYPE;
    var NativeTypedArrayConstructor = global$n[CONSTRUCTOR_NAME];
    var TypedArrayConstructor = NativeTypedArrayConstructor;
    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
    var exported = {};
    var getter = function(that, index) {
      var data2 = getInternalState$1(that);
      return data2.view[GETTER](index * BYTES + data2.byteOffset, true);
    };
    var setter = function(that, index, value) {
      var data2 = getInternalState$1(that);
      if (CLAMPED)
        value = (value = round(value)) < 0 ? 0 : value > 255 ? 255 : value & 255;
      data2.view[SETTER](index * BYTES + data2.byteOffset, value, true);
    };
    var addElement = function(that, index) {
      nativeDefineProperty(that, index, {
        get: function() {
          return getter(this, index);
        },
        set: function(value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
      TypedArrayConstructor = wrapper2(function(that, data2, offset, $length) {
        anInstance$5(that, TypedArrayConstructorPrototype);
        var index = 0;
        var byteOffset = 0;
        var buffer, byteLength, length;
        if (!isObject$4(data2)) {
          length = toIndex(data2);
          byteLength = length * BYTES;
          buffer = new ArrayBuffer$1(byteLength);
        } else if (isArrayBuffer(data2)) {
          buffer = data2;
          byteOffset = toOffset$1(offset, BYTES);
          var $len = data2.byteLength;
          if ($length === void 0) {
            if ($len % BYTES)
              throw RangeError$3(WRONG_LENGTH);
            byteLength = $len - byteOffset;
            if (byteLength < 0)
              throw RangeError$3(WRONG_LENGTH);
          } else {
            byteLength = toLength$1($length) * BYTES;
            if (byteLength + byteOffset > $len)
              throw RangeError$3(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (isTypedArray(data2)) {
          return fromList(TypedArrayConstructor, data2);
        } else {
          return call$6(typedArrayFrom$1, TypedArrayConstructor, data2);
        }
        setInternalState$4(that, {
          buffer,
          byteOffset,
          byteLength,
          length,
          view: new DataView$1(buffer)
        });
        while (index < length)
          addElement(that, index++);
      });
      if (setPrototypeOf2)
        setPrototypeOf2(TypedArrayConstructor, TypedArray);
      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create$2(TypedArrayPrototype$1);
    } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$2) {
      TypedArrayConstructor = wrapper2(function(dummy, data2, typedArrayOffset, $length) {
        anInstance$5(dummy, TypedArrayConstructorPrototype);
        return inheritIfRequired$1(function() {
          if (!isObject$4(data2))
            return new NativeTypedArrayConstructor(toIndex(data2));
          if (isArrayBuffer(data2))
            return $length !== void 0 ? new NativeTypedArrayConstructor(data2, toOffset$1(typedArrayOffset, BYTES), $length) : typedArrayOffset !== void 0 ? new NativeTypedArrayConstructor(data2, toOffset$1(typedArrayOffset, BYTES)) : new NativeTypedArrayConstructor(data2);
          if (isTypedArray(data2))
            return fromList(TypedArrayConstructor, data2);
          return call$6(typedArrayFrom$1, TypedArrayConstructor, data2);
        }(), dummy, TypedArrayConstructor);
      });
      if (setPrototypeOf2)
        setPrototypeOf2(TypedArrayConstructor, TypedArray);
      forEach$3(getOwnPropertyNames4(NativeTypedArrayConstructor), function(key) {
        if (!(key in TypedArrayConstructor)) {
          createNonEnumerableProperty$3(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
        }
      });
      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
    }
    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
      createNonEnumerableProperty$3(TypedArrayConstructorPrototype, "constructor", TypedArrayConstructor);
    }
    enforceInternalState$1(TypedArrayConstructorPrototype).TypedArrayConstructor = TypedArrayConstructor;
    if (TYPED_ARRAY_TAG) {
      createNonEnumerableProperty$3(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
    }
    var FORCED2 = TypedArrayConstructor != NativeTypedArrayConstructor;
    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;
    $$g({ global: true, constructor: true, forced: FORCED2, sham: !NATIVE_ARRAY_BUFFER_VIEWS }, exported);
    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
      createNonEnumerableProperty$3(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
    }
    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
      createNonEnumerableProperty$3(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
    }
    setSpecies(CONSTRUCTOR_NAME);
  };
} else
  typedArrayConstructor.exports = function() {
  };
var typedArrayConstructorExports = typedArrayConstructor.exports;
var createTypedArrayConstructor$8 = typedArrayConstructorExports;
createTypedArrayConstructor$8("Float32", function(init) {
  return function Float32Array(data2, byteOffset, length) {
    return init(this, data2, byteOffset, length);
  };
});
var createTypedArrayConstructor$7 = typedArrayConstructorExports;
createTypedArrayConstructor$7("Float64", function(init) {
  return function Float64Array(data2, byteOffset, length) {
    return init(this, data2, byteOffset, length);
  };
});
var createTypedArrayConstructor$6 = typedArrayConstructorExports;
createTypedArrayConstructor$6("Int8", function(init) {
  return function Int8Array2(data2, byteOffset, length) {
    return init(this, data2, byteOffset, length);
  };
});
var createTypedArrayConstructor$5 = typedArrayConstructorExports;
createTypedArrayConstructor$5("Int16", function(init) {
  return function Int16Array(data2, byteOffset, length) {
    return init(this, data2, byteOffset, length);
  };
});
var createTypedArrayConstructor$4 = typedArrayConstructorExports;
createTypedArrayConstructor$4("Int32", function(init) {
  return function Int32Array(data2, byteOffset, length) {
    return init(this, data2, byteOffset, length);
  };
});
var createTypedArrayConstructor$3 = typedArrayConstructorExports;
createTypedArrayConstructor$3("Uint8", function(init) {
  return function Uint8Array2(data2, byteOffset, length) {
    return init(this, data2, byteOffset, length);
  };
});
var createTypedArrayConstructor$2 = typedArrayConstructorExports;
createTypedArrayConstructor$2("Uint8", function(init) {
  return function Uint8ClampedArray2(data2, byteOffset, length) {
    return init(this, data2, byteOffset, length);
  };
}, true);
var createTypedArrayConstructor$1 = typedArrayConstructorExports;
createTypedArrayConstructor$1("Uint16", function(init) {
  return function Uint16Array2(data2, byteOffset, length) {
    return init(this, data2, byteOffset, length);
  };
});
var createTypedArrayConstructor = typedArrayConstructorExports;
createTypedArrayConstructor("Uint32", function(init) {
  return function Uint32Array(data2, byteOffset, length) {
    return init(this, data2, byteOffset, length);
  };
});
var ArrayBufferViewCore$t = arrayBufferViewCore;
var lengthOfArrayLike$2 = lengthOfArrayLike$t;
var toIntegerOrInfinity$1 = toIntegerOrInfinity$l;
var aTypedArray$r = ArrayBufferViewCore$t.aTypedArray;
var exportTypedArrayMethod$s = ArrayBufferViewCore$t.exportTypedArrayMethod;
exportTypedArrayMethod$s("at", function at3(index) {
  var O = aTypedArray$r(this);
  var len = lengthOfArrayLike$2(O);
  var relativeIndex = toIntegerOrInfinity$1(index);
  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  return k < 0 || k >= len ? void 0 : O[k];
});
var uncurryThis$k = functionUncurryThis;
var ArrayBufferViewCore$s = arrayBufferViewCore;
var $ArrayCopyWithin = arrayCopyWithin;
var u$ArrayCopyWithin = uncurryThis$k($ArrayCopyWithin);
var aTypedArray$q = ArrayBufferViewCore$s.aTypedArray;
var exportTypedArrayMethod$r = ArrayBufferViewCore$s.exportTypedArrayMethod;
exportTypedArrayMethod$r("copyWithin", function copyWithin3(target, start) {
  return u$ArrayCopyWithin(aTypedArray$q(this), target, start, arguments.length > 2 ? arguments[2] : void 0);
});
var ArrayBufferViewCore$r = arrayBufferViewCore;
var $every = arrayIteration.every;
var aTypedArray$p = ArrayBufferViewCore$r.aTypedArray;
var exportTypedArrayMethod$q = ArrayBufferViewCore$r.exportTypedArrayMethod;
exportTypedArrayMethod$q("every", function every2(callbackfn) {
  return $every(aTypedArray$p(this), callbackfn, arguments.length > 1 ? arguments[1] : void 0);
});
var ArrayBufferViewCore$q = arrayBufferViewCore;
var $fill = arrayFill$1;
var toBigInt$1 = toBigInt$3;
var classof$2 = classof$m;
var call$5 = functionCall;
var uncurryThis$j = functionUncurryThis;
var fails$e = fails$1p;
var aTypedArray$o = ArrayBufferViewCore$q.aTypedArray;
var exportTypedArrayMethod$p = ArrayBufferViewCore$q.exportTypedArrayMethod;
var slice3 = uncurryThis$j("".slice);
var CONVERSION_BUG = fails$e(function() {
  var count = 0;
  new Int8Array(2).fill({ valueOf: function() {
    return count++;
  } });
  return count !== 1;
});
exportTypedArrayMethod$p("fill", function fill3(value) {
  var length = arguments.length;
  aTypedArray$o(this);
  var actualValue = slice3(classof$2(this), 0, 3) === "Big" ? toBigInt$1(value) : +value;
  return call$5($fill, this, actualValue, length > 1 ? arguments[1] : void 0, length > 2 ? arguments[2] : void 0);
}, CONVERSION_BUG);
var ArrayBufferViewCore$p = arrayBufferViewCore;
var speciesConstructor = speciesConstructor$6;
var aTypedArrayConstructor$1 = ArrayBufferViewCore$p.aTypedArrayConstructor;
var getTypedArrayConstructor$3 = ArrayBufferViewCore$p.getTypedArrayConstructor;
var typedArraySpeciesConstructor$4 = function(originalArray) {
  return aTypedArrayConstructor$1(speciesConstructor(originalArray, getTypedArrayConstructor$3(originalArray)));
};
var arrayFromConstructorAndList$1 = arrayFromConstructorAndList$3;
var typedArraySpeciesConstructor$3 = typedArraySpeciesConstructor$4;
var typedArrayFromSpeciesAndList = function(instance, list) {
  return arrayFromConstructorAndList$1(typedArraySpeciesConstructor$3(instance), list);
};
var ArrayBufferViewCore$o = arrayBufferViewCore;
var $filter = arrayIteration.filter;
var fromSpeciesAndList = typedArrayFromSpeciesAndList;
var aTypedArray$n = ArrayBufferViewCore$o.aTypedArray;
var exportTypedArrayMethod$o = ArrayBufferViewCore$o.exportTypedArrayMethod;
exportTypedArrayMethod$o("filter", function filter2(callbackfn) {
  var list = $filter(aTypedArray$n(this), callbackfn, arguments.length > 1 ? arguments[1] : void 0);
  return fromSpeciesAndList(this, list);
});
var ArrayBufferViewCore$n = arrayBufferViewCore;
var $find = arrayIteration.find;
var aTypedArray$m = ArrayBufferViewCore$n.aTypedArray;
var exportTypedArrayMethod$n = ArrayBufferViewCore$n.exportTypedArrayMethod;
exportTypedArrayMethod$n("find", function find2(predicate) {
  return $find(aTypedArray$m(this), predicate, arguments.length > 1 ? arguments[1] : void 0);
});
var ArrayBufferViewCore$m = arrayBufferViewCore;
var $findIndex = arrayIteration.findIndex;
var aTypedArray$l = ArrayBufferViewCore$m.aTypedArray;
var exportTypedArrayMethod$m = ArrayBufferViewCore$m.exportTypedArrayMethod;
exportTypedArrayMethod$m("findIndex", function findIndex2(predicate) {
  return $findIndex(aTypedArray$l(this), predicate, arguments.length > 1 ? arguments[1] : void 0);
});
var ArrayBufferViewCore$l = arrayBufferViewCore;
var $findLast = arrayIterationFromLast.findLast;
var aTypedArray$k = ArrayBufferViewCore$l.aTypedArray;
var exportTypedArrayMethod$l = ArrayBufferViewCore$l.exportTypedArrayMethod;
exportTypedArrayMethod$l("findLast", function findLast2(predicate) {
  return $findLast(aTypedArray$k(this), predicate, arguments.length > 1 ? arguments[1] : void 0);
});
var ArrayBufferViewCore$k = arrayBufferViewCore;
var $findLastIndex = arrayIterationFromLast.findLastIndex;
var aTypedArray$j = ArrayBufferViewCore$k.aTypedArray;
var exportTypedArrayMethod$k = ArrayBufferViewCore$k.exportTypedArrayMethod;
exportTypedArrayMethod$k("findLastIndex", function findLastIndex2(predicate) {
  return $findLastIndex(aTypedArray$j(this), predicate, arguments.length > 1 ? arguments[1] : void 0);
});
var ArrayBufferViewCore$j = arrayBufferViewCore;
var $forEach = arrayIteration.forEach;
var aTypedArray$i = ArrayBufferViewCore$j.aTypedArray;
var exportTypedArrayMethod$j = ArrayBufferViewCore$j.exportTypedArrayMethod;
exportTypedArrayMethod$j("forEach", function forEach2(callbackfn) {
  $forEach(aTypedArray$i(this), callbackfn, arguments.length > 1 ? arguments[1] : void 0);
});
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$1 = typedArrayConstructorsRequireWrappers;
var exportTypedArrayStaticMethod$1 = arrayBufferViewCore.exportTypedArrayStaticMethod;
var typedArrayFrom = typedArrayFrom$2;
exportTypedArrayStaticMethod$1("from", typedArrayFrom, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS$1);
var ArrayBufferViewCore$i = arrayBufferViewCore;
var $includes = arrayIncludes.includes;
var aTypedArray$h = ArrayBufferViewCore$i.aTypedArray;
var exportTypedArrayMethod$i = ArrayBufferViewCore$i.exportTypedArrayMethod;
exportTypedArrayMethod$i("includes", function includes3(searchElement) {
  return $includes(aTypedArray$h(this), searchElement, arguments.length > 1 ? arguments[1] : void 0);
});
var ArrayBufferViewCore$h = arrayBufferViewCore;
var $indexOf = arrayIncludes.indexOf;
var aTypedArray$g = ArrayBufferViewCore$h.aTypedArray;
var exportTypedArrayMethod$h = ArrayBufferViewCore$h.exportTypedArrayMethod;
exportTypedArrayMethod$h("indexOf", function indexOf3(searchElement) {
  return $indexOf(aTypedArray$g(this), searchElement, arguments.length > 1 ? arguments[1] : void 0);
});
var global$m = global$_;
var fails$d = fails$1p;
var uncurryThis$i = functionUncurryThis;
var ArrayBufferViewCore$g = arrayBufferViewCore;
var ArrayIterators = es_array_iterator;
var wellKnownSymbol$3 = wellKnownSymbol$z;
var ITERATOR$3 = wellKnownSymbol$3("iterator");
var Uint8Array$1 = global$m.Uint8Array;
var arrayValues = uncurryThis$i(ArrayIterators.values);
var arrayKeys = uncurryThis$i(ArrayIterators.keys);
var arrayEntries = uncurryThis$i(ArrayIterators.entries);
var aTypedArray$f = ArrayBufferViewCore$g.aTypedArray;
var exportTypedArrayMethod$g = ArrayBufferViewCore$g.exportTypedArrayMethod;
var TypedArrayPrototype = Uint8Array$1 && Uint8Array$1.prototype;
var GENERIC = !fails$d(function() {
  TypedArrayPrototype[ITERATOR$3].call([1]);
});
var ITERATOR_IS_VALUES = !!TypedArrayPrototype && TypedArrayPrototype.values && TypedArrayPrototype[ITERATOR$3] === TypedArrayPrototype.values && TypedArrayPrototype.values.name === "values";
var typedArrayValues = function values3() {
  return arrayValues(aTypedArray$f(this));
};
exportTypedArrayMethod$g("entries", function entries2() {
  return arrayEntries(aTypedArray$f(this));
}, GENERIC);
exportTypedArrayMethod$g("keys", function keys3() {
  return arrayKeys(aTypedArray$f(this));
}, GENERIC);
exportTypedArrayMethod$g("values", typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: "values" });
exportTypedArrayMethod$g(ITERATOR$3, typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: "values" });
var ArrayBufferViewCore$f = arrayBufferViewCore;
var uncurryThis$h = functionUncurryThis;
var aTypedArray$e = ArrayBufferViewCore$f.aTypedArray;
var exportTypedArrayMethod$f = ArrayBufferViewCore$f.exportTypedArrayMethod;
var $join = uncurryThis$h([].join);
exportTypedArrayMethod$f("join", function join2(separator) {
  return $join(aTypedArray$e(this), separator);
});
var ArrayBufferViewCore$e = arrayBufferViewCore;
var apply$2 = functionApply$1;
var $lastIndexOf = arrayLastIndexOf;
var aTypedArray$d = ArrayBufferViewCore$e.aTypedArray;
var exportTypedArrayMethod$e = ArrayBufferViewCore$e.exportTypedArrayMethod;
exportTypedArrayMethod$e("lastIndexOf", function lastIndexOf3(searchElement) {
  var length = arguments.length;
  return apply$2($lastIndexOf, aTypedArray$d(this), length > 1 ? [searchElement, arguments[1]] : [searchElement]);
});
var ArrayBufferViewCore$d = arrayBufferViewCore;
var $map = arrayIteration.map;
var typedArraySpeciesConstructor$2 = typedArraySpeciesConstructor$4;
var aTypedArray$c = ArrayBufferViewCore$d.aTypedArray;
var exportTypedArrayMethod$d = ArrayBufferViewCore$d.exportTypedArrayMethod;
exportTypedArrayMethod$d("map", function map2(mapfn) {
  return $map(aTypedArray$c(this), mapfn, arguments.length > 1 ? arguments[1] : void 0, function(O, length) {
    return new (typedArraySpeciesConstructor$2(O))(length);
  });
});
var ArrayBufferViewCore$c = arrayBufferViewCore;
var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = typedArrayConstructorsRequireWrappers;
var aTypedArrayConstructor = ArrayBufferViewCore$c.aTypedArrayConstructor;
var exportTypedArrayStaticMethod = ArrayBufferViewCore$c.exportTypedArrayStaticMethod;
exportTypedArrayStaticMethod("of", function of2() {
  var index = 0;
  var length = arguments.length;
  var result = new (aTypedArrayConstructor(this))(length);
  while (length > index)
    result[index] = arguments[index++];
  return result;
}, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS);
var ArrayBufferViewCore$b = arrayBufferViewCore;
var $reduce = arrayReduce.left;
var aTypedArray$b = ArrayBufferViewCore$b.aTypedArray;
var exportTypedArrayMethod$c = ArrayBufferViewCore$b.exportTypedArrayMethod;
exportTypedArrayMethod$c("reduce", function reduce2(callbackfn) {
  var length = arguments.length;
  return $reduce(aTypedArray$b(this), callbackfn, length, length > 1 ? arguments[1] : void 0);
});
var ArrayBufferViewCore$a = arrayBufferViewCore;
var $reduceRight = arrayReduce.right;
var aTypedArray$a = ArrayBufferViewCore$a.aTypedArray;
var exportTypedArrayMethod$b = ArrayBufferViewCore$a.exportTypedArrayMethod;
exportTypedArrayMethod$b("reduceRight", function reduceRight2(callbackfn) {
  var length = arguments.length;
  return $reduceRight(aTypedArray$a(this), callbackfn, length, length > 1 ? arguments[1] : void 0);
});
var ArrayBufferViewCore$9 = arrayBufferViewCore;
var aTypedArray$9 = ArrayBufferViewCore$9.aTypedArray;
var exportTypedArrayMethod$a = ArrayBufferViewCore$9.exportTypedArrayMethod;
var floor$2 = Math.floor;
exportTypedArrayMethod$a("reverse", function reverse3() {
  var that = this;
  var length = aTypedArray$9(that).length;
  var middle = floor$2(length / 2);
  var index = 0;
  var value;
  while (index < middle) {
    value = that[index];
    that[index++] = that[--length];
    that[length] = value;
  }
  return that;
});
var global$l = global$_;
var call$4 = functionCall;
var ArrayBufferViewCore$8 = arrayBufferViewCore;
var lengthOfArrayLike$1 = lengthOfArrayLike$t;
var toOffset = toOffset$2;
var toIndexedObject = toObject$t;
var fails$c = fails$1p;
var RangeError$2 = global$l.RangeError;
var Int8Array$2 = global$l.Int8Array;
var Int8ArrayPrototype = Int8Array$2 && Int8Array$2.prototype;
var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
var aTypedArray$8 = ArrayBufferViewCore$8.aTypedArray;
var exportTypedArrayMethod$9 = ArrayBufferViewCore$8.exportTypedArrayMethod;
var WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS = !fails$c(function() {
  var array = new Uint8ClampedArray(2);
  call$4($set, array, { length: 1, 0: 3 }, 1);
  return array[1] !== 3;
});
var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore$8.NATIVE_ARRAY_BUFFER_VIEWS && fails$c(function() {
  var array = new Int8Array$2(2);
  array.set(1);
  array.set("2", 1);
  return array[0] !== 0 || array[1] !== 2;
});
exportTypedArrayMethod$9("set", function set2(arrayLike) {
  aTypedArray$8(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : void 0, 1);
  var src = toIndexedObject(arrayLike);
  if (WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS)
    return call$4($set, this, src, offset);
  var length = this.length;
  var len = lengthOfArrayLike$1(src);
  var index = 0;
  if (len + offset > length)
    throw RangeError$2("Wrong length");
  while (index < len)
    this[offset + index] = src[index++];
}, !WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);
var ArrayBufferViewCore$7 = arrayBufferViewCore;
var typedArraySpeciesConstructor$1 = typedArraySpeciesConstructor$4;
var fails$b = fails$1p;
var arraySlice$3 = arraySlice$a;
var aTypedArray$7 = ArrayBufferViewCore$7.aTypedArray;
var exportTypedArrayMethod$8 = ArrayBufferViewCore$7.exportTypedArrayMethod;
var FORCED$1 = fails$b(function() {
  new Int8Array(1).slice();
});
exportTypedArrayMethod$8("slice", function slice4(start, end) {
  var list = arraySlice$3(aTypedArray$7(this), start, end);
  var C = typedArraySpeciesConstructor$1(this);
  var index = 0;
  var length = list.length;
  var result = new C(length);
  while (length > index)
    result[index] = list[index++];
  return result;
}, FORCED$1);
var ArrayBufferViewCore$6 = arrayBufferViewCore;
var $some = arrayIteration.some;
var aTypedArray$6 = ArrayBufferViewCore$6.aTypedArray;
var exportTypedArrayMethod$7 = ArrayBufferViewCore$6.exportTypedArrayMethod;
exportTypedArrayMethod$7("some", function some2(callbackfn) {
  return $some(aTypedArray$6(this), callbackfn, arguments.length > 1 ? arguments[1] : void 0);
});
var global$k = global$_;
var uncurryThis$g = functionUncurryThisClause;
var fails$a = fails$1p;
var aCallable$2 = aCallable$l;
var internalSort = arraySort$1;
var ArrayBufferViewCore$5 = arrayBufferViewCore;
var FF = engineFfVersion;
var IE_OR_EDGE = engineIsIeOrEdge;
var V8$1 = engineV8Version;
var WEBKIT = engineWebkitVersion;
var aTypedArray$5 = ArrayBufferViewCore$5.aTypedArray;
var exportTypedArrayMethod$6 = ArrayBufferViewCore$5.exportTypedArrayMethod;
var Uint16Array = global$k.Uint16Array;
var nativeSort = Uint16Array && uncurryThis$g(Uint16Array.prototype.sort);
var ACCEPT_INCORRECT_ARGUMENTS = !!nativeSort && !(fails$a(function() {
  nativeSort(new Uint16Array(2), null);
}) && fails$a(function() {
  nativeSort(new Uint16Array(2), {});
}));
var STABLE_SORT = !!nativeSort && !fails$a(function() {
  if (V8$1)
    return V8$1 < 74;
  if (FF)
    return FF < 67;
  if (IE_OR_EDGE)
    return true;
  if (WEBKIT)
    return WEBKIT < 602;
  var array = new Uint16Array(516);
  var expected = Array(516);
  var index, mod;
  for (index = 0; index < 516; index++) {
    mod = index % 4;
    array[index] = 515 - index;
    expected[index] = index - 2 * mod + 3;
  }
  nativeSort(array, function(a, b) {
    return (a / 4 | 0) - (b / 4 | 0);
  });
  for (index = 0; index < 516; index++) {
    if (array[index] !== expected[index])
      return true;
  }
});
var getSortCompare = function(comparefn) {
  return function(x, y) {
    if (comparefn !== void 0)
      return +comparefn(x, y) || 0;
    if (y !== y)
      return -1;
    if (x !== x)
      return 1;
    if (x === 0 && y === 0)
      return 1 / x > 0 && 1 / y < 0 ? 1 : -1;
    return x > y;
  };
};
exportTypedArrayMethod$6("sort", function sort2(comparefn) {
  if (comparefn !== void 0)
    aCallable$2(comparefn);
  if (STABLE_SORT)
    return nativeSort(this, comparefn);
  return internalSort(aTypedArray$5(this), getSortCompare(comparefn));
}, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS);
var ArrayBufferViewCore$4 = arrayBufferViewCore;
var toLength = toLength$d;
var toAbsoluteIndex = toAbsoluteIndex$a;
var typedArraySpeciesConstructor = typedArraySpeciesConstructor$4;
var aTypedArray$4 = ArrayBufferViewCore$4.aTypedArray;
var exportTypedArrayMethod$5 = ArrayBufferViewCore$4.exportTypedArrayMethod;
exportTypedArrayMethod$5("subarray", function subarray(begin, end) {
  var O = aTypedArray$4(this);
  var length = O.length;
  var beginIndex = toAbsoluteIndex(begin, length);
  var C = typedArraySpeciesConstructor(O);
  return new C(
    O.buffer,
    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
    toLength((end === void 0 ? length : toAbsoluteIndex(end, length)) - beginIndex)
  );
});
var global$j = global$_;
var apply$1 = functionApply$1;
var ArrayBufferViewCore$3 = arrayBufferViewCore;
var fails$9 = fails$1p;
var arraySlice$2 = arraySlice$a;
var Int8Array$1 = global$j.Int8Array;
var aTypedArray$3 = ArrayBufferViewCore$3.aTypedArray;
var exportTypedArrayMethod$4 = ArrayBufferViewCore$3.exportTypedArrayMethod;
var $toLocaleString = [].toLocaleString;
var TO_LOCALE_STRING_BUG = !!Int8Array$1 && fails$9(function() {
  $toLocaleString.call(new Int8Array$1(1));
});
var FORCED = fails$9(function() {
  return [1, 2].toLocaleString() != new Int8Array$1([1, 2]).toLocaleString();
}) || !fails$9(function() {
  Int8Array$1.prototype.toLocaleString.call([1, 2]);
});
exportTypedArrayMethod$4("toLocaleString", function toLocaleString() {
  return apply$1(
    $toLocaleString,
    TO_LOCALE_STRING_BUG ? arraySlice$2(aTypedArray$3(this)) : aTypedArray$3(this),
    arraySlice$2(arguments)
  );
}, FORCED);
var arrayToReversed = arrayToReversed$2;
var ArrayBufferViewCore$2 = arrayBufferViewCore;
var aTypedArray$2 = ArrayBufferViewCore$2.aTypedArray;
var exportTypedArrayMethod$3 = ArrayBufferViewCore$2.exportTypedArrayMethod;
var getTypedArrayConstructor$2 = ArrayBufferViewCore$2.getTypedArrayConstructor;
exportTypedArrayMethod$3("toReversed", function toReversed2() {
  return arrayToReversed(aTypedArray$2(this), getTypedArrayConstructor$2(this));
});
var ArrayBufferViewCore$1 = arrayBufferViewCore;
var uncurryThis$f = functionUncurryThis;
var aCallable$1 = aCallable$l;
var arrayFromConstructorAndList = arrayFromConstructorAndList$3;
var aTypedArray$1 = ArrayBufferViewCore$1.aTypedArray;
var getTypedArrayConstructor$1 = ArrayBufferViewCore$1.getTypedArrayConstructor;
var exportTypedArrayMethod$2 = ArrayBufferViewCore$1.exportTypedArrayMethod;
var sort3 = uncurryThis$f(ArrayBufferViewCore$1.TypedArrayPrototype.sort);
exportTypedArrayMethod$2("toSorted", function toSorted2(compareFn) {
  if (compareFn !== void 0)
    aCallable$1(compareFn);
  var O = aTypedArray$1(this);
  var A = arrayFromConstructorAndList(getTypedArrayConstructor$1(O), O);
  return sort3(A, compareFn);
});
var exportTypedArrayMethod$1 = arrayBufferViewCore.exportTypedArrayMethod;
var fails$8 = fails$1p;
var global$i = global$_;
var uncurryThis$e = functionUncurryThis;
var Uint8Array = global$i.Uint8Array;
var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {};
var arrayToString = [].toString;
var join$3 = uncurryThis$e([].join);
if (fails$8(function() {
  arrayToString.call({});
})) {
  arrayToString = function toString7() {
    return join$3(this);
  };
}
var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;
exportTypedArrayMethod$1("toString", arrayToString, IS_NOT_ARRAY_METHOD);
var arrayWith = arrayWith$2;
var ArrayBufferViewCore = arrayBufferViewCore;
var isBigIntArray = isBigIntArray$2;
var toIntegerOrInfinity = toIntegerOrInfinity$l;
var toBigInt = toBigInt$3;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var PROPER_ORDER = !!function() {
  try {
    new Int8Array(1)["with"](2, { valueOf: function() {
      throw 8;
    } });
  } catch (error) {
    return error === 8;
  }
}();
exportTypedArrayMethod("with", { "with": function(index, value) {
  var O = aTypedArray(this);
  var relativeIndex = toIntegerOrInfinity(index);
  var actualValue = isBigIntArray(O) ? toBigInt(value) : +value;
  return arrayWith(O, getTypedArrayConstructor(O), relativeIndex, actualValue);
} }["with"], !PROPER_ORDER);
var $$f = _export;
var uncurryThis$d = functionUncurryThis;
var toString$5 = toString$C;
var fromCharCode$2 = String.fromCharCode;
var charAt$4 = uncurryThis$d("".charAt);
var exec$3 = uncurryThis$d(/./.exec);
var stringSlice$2 = uncurryThis$d("".slice);
var hex2 = /^[\da-f]{2}$/i;
var hex4 = /^[\da-f]{4}$/i;
$$f({ global: true }, {
  unescape: function unescape(string) {
    var str = toString$5(string);
    var result = "";
    var length = str.length;
    var index = 0;
    var chr, part;
    while (index < length) {
      chr = charAt$4(str, index++);
      if (chr === "%") {
        if (charAt$4(str, index) === "u") {
          part = stringSlice$2(str, index + 1, index + 5);
          if (exec$3(hex4, part)) {
            result += fromCharCode$2(parseInt(part, 16));
            index += 5;
            continue;
          }
        } else {
          part = stringSlice$2(str, index, index + 2);
          if (exec$3(hex2, part)) {
            result += fromCharCode$2(parseInt(part, 16));
            index += 2;
            continue;
          }
        }
      }
      result += chr;
    }
    return result;
  }
});
var uncurryThis$c = functionUncurryThis;
var defineBuiltIns$2 = defineBuiltIns$5;
var getWeakData = internalMetadataExports.getWeakData;
var anInstance$4 = anInstance$a;
var anObject$3 = anObject$D;
var isNullOrUndefined$1 = isNullOrUndefined$e;
var isObject$3 = isObject$z;
var iterate$1 = iterate$a;
var ArrayIterationModule = arrayIteration;
var hasOwn$6 = hasOwnProperty_1;
var InternalStateModule$3 = internalState;
var setInternalState$3 = InternalStateModule$3.set;
var internalStateGetterFor = InternalStateModule$3.getterFor;
var find$1 = ArrayIterationModule.find;
var findIndex3 = ArrayIterationModule.findIndex;
var splice$1 = uncurryThis$c([].splice);
var id = 0;
var uncaughtFrozenStore = function(state) {
  return state.frozen || (state.frozen = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function() {
  this.entries = [];
};
var findUncaughtFrozen = function(store, key) {
  return find$1(store.entries, function(it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry)
      return entry[1];
  },
  has: function(key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry)
      entry[1] = value;
    else
      this.entries.push([key, value]);
  },
  "delete": function(key) {
    var index = findIndex3(this.entries, function(it) {
      return it[0] === key;
    });
    if (~index)
      splice$1(this.entries, index, 1);
    return !!~index;
  }
};
var collectionWeak$2 = {
  getConstructor: function(wrapper2, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var Constructor2 = wrapper2(function(that, iterable) {
      anInstance$4(that, Prototype2);
      setInternalState$3(that, {
        type: CONSTRUCTOR_NAME,
        id: id++,
        frozen: void 0
      });
      if (!isNullOrUndefined$1(iterable))
        iterate$1(iterable, that[ADDER], { that, AS_ENTRIES: IS_MAP });
    });
    var Prototype2 = Constructor2.prototype;
    var getInternalState2 = internalStateGetterFor(CONSTRUCTOR_NAME);
    var define = function(that, key, value) {
      var state = getInternalState2(that);
      var data2 = getWeakData(anObject$3(key), true);
      if (data2 === true)
        uncaughtFrozenStore(state).set(key, value);
      else
        data2[state.id] = value;
      return that;
    };
    defineBuiltIns$2(Prototype2, {
      // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
      // https://tc39.es/ecma262/#sec-weakset.prototype.delete
      "delete": function(key) {
        var state = getInternalState2(this);
        if (!isObject$3(key))
          return false;
        var data2 = getWeakData(key);
        if (data2 === true)
          return uncaughtFrozenStore(state)["delete"](key);
        return data2 && hasOwn$6(data2, state.id) && delete data2[state.id];
      },
      // `{ WeakMap, WeakSet }.prototype.has(key)` methods
      // https://tc39.es/ecma262/#sec-weakmap.prototype.has
      // https://tc39.es/ecma262/#sec-weakset.prototype.has
      has: function has4(key) {
        var state = getInternalState2(this);
        if (!isObject$3(key))
          return false;
        var data2 = getWeakData(key);
        if (data2 === true)
          return uncaughtFrozenStore(state).has(key);
        return data2 && hasOwn$6(data2, state.id);
      }
    });
    defineBuiltIns$2(Prototype2, IS_MAP ? {
      // `WeakMap.prototype.get(key)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.get
      get: function get3(key) {
        var state = getInternalState2(this);
        if (isObject$3(key)) {
          var data2 = getWeakData(key);
          if (data2 === true)
            return uncaughtFrozenStore(state).get(key);
          return data2 ? data2[state.id] : void 0;
        }
      },
      // `WeakMap.prototype.set(key, value)` method
      // https://tc39.es/ecma262/#sec-weakmap.prototype.set
      set: function set4(key, value) {
        return define(this, key, value);
      }
    } : {
      // `WeakSet.prototype.add(value)` method
      // https://tc39.es/ecma262/#sec-weakset.prototype.add
      add: function add(value) {
        return define(this, value, true);
      }
    });
    return Constructor2;
  }
};
var FREEZING = freezing;
var global$h = global$_;
var uncurryThis$b = functionUncurryThis;
var defineBuiltIns$1 = defineBuiltIns$5;
var InternalMetadataModule = internalMetadataExports;
var collection$1 = collection$4;
var collectionWeak$1 = collectionWeak$2;
var isObject$2 = isObject$z;
var enforceInternalState = internalState.enforce;
var fails$7 = fails$1p;
var NATIVE_WEAK_MAP = weakMapBasicDetection;
var $Object = Object;
var isArray2 = Array.isArray;
var isExtensible3 = $Object.isExtensible;
var isFrozen2 = $Object.isFrozen;
var isSealed2 = $Object.isSealed;
var freeze2 = $Object.freeze;
var seal2 = $Object.seal;
var FROZEN = {};
var SEALED = {};
var IS_IE11 = !global$h.ActiveXObject && "ActiveXObject" in global$h;
var InternalWeakMap;
var wrapper = function(init) {
  return function WeakMap2() {
    return init(this, arguments.length ? arguments[0] : void 0);
  };
};
var $WeakMap = collection$1("WeakMap", wrapper, collectionWeak$1);
var WeakMapPrototype = $WeakMap.prototype;
var nativeSet = uncurryThis$b(WeakMapPrototype.set);
var hasMSEdgeFreezingBug = function() {
  return FREEZING && fails$7(function() {
    var frozenArray = freeze2([]);
    nativeSet(new $WeakMap(), frozenArray, 1);
    return !isFrozen2(frozenArray);
  });
};
if (NATIVE_WEAK_MAP) {
  if (IS_IE11) {
    InternalWeakMap = collectionWeak$1.getConstructor(wrapper, "WeakMap", true);
    InternalMetadataModule.enable();
    var nativeDelete = uncurryThis$b(WeakMapPrototype["delete"]);
    var nativeHas = uncurryThis$b(WeakMapPrototype.has);
    var nativeGet = uncurryThis$b(WeakMapPrototype.get);
    defineBuiltIns$1(WeakMapPrototype, {
      "delete": function(key) {
        if (isObject$2(key) && !isExtensible3(key)) {
          var state = enforceInternalState(this);
          if (!state.frozen)
            state.frozen = new InternalWeakMap();
          return nativeDelete(this, key) || state.frozen["delete"](key);
        }
        return nativeDelete(this, key);
      },
      has: function has4(key) {
        if (isObject$2(key) && !isExtensible3(key)) {
          var state = enforceInternalState(this);
          if (!state.frozen)
            state.frozen = new InternalWeakMap();
          return nativeHas(this, key) || state.frozen.has(key);
        }
        return nativeHas(this, key);
      },
      get: function get3(key) {
        if (isObject$2(key) && !isExtensible3(key)) {
          var state = enforceInternalState(this);
          if (!state.frozen)
            state.frozen = new InternalWeakMap();
          return nativeHas(this, key) ? nativeGet(this, key) : state.frozen.get(key);
        }
        return nativeGet(this, key);
      },
      set: function set4(key, value) {
        if (isObject$2(key) && !isExtensible3(key)) {
          var state = enforceInternalState(this);
          if (!state.frozen)
            state.frozen = new InternalWeakMap();
          nativeHas(this, key) ? nativeSet(this, key, value) : state.frozen.set(key, value);
        } else
          nativeSet(this, key, value);
        return this;
      }
    });
  } else if (hasMSEdgeFreezingBug()) {
    defineBuiltIns$1(WeakMapPrototype, {
      set: function set4(key, value) {
        var arrayIntegrityLevel;
        if (isArray2(key)) {
          if (isFrozen2(key))
            arrayIntegrityLevel = FROZEN;
          else if (isSealed2(key))
            arrayIntegrityLevel = SEALED;
        }
        nativeSet(this, key, value);
        if (arrayIntegrityLevel == FROZEN)
          freeze2(key);
        if (arrayIntegrityLevel == SEALED)
          seal2(key);
        return this;
      }
    });
  }
}
var collection = collection$4;
var collectionWeak = collectionWeak$2;
collection("WeakSet", function(init) {
  return function WeakSet() {
    return init(this, arguments.length ? arguments[0] : void 0);
  };
}, collectionWeak);
var itoc$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var ctoi$1 = {};
for (var index = 0; index < 66; index++)
  ctoi$1[itoc$1.charAt(index)] = index;
var base64Map = {
  itoc: itoc$1,
  ctoi: ctoi$1
};
var $$e = _export;
var global$g = global$_;
var getBuiltIn$5 = getBuiltIn$n;
var uncurryThis$a = functionUncurryThis;
var call$3 = functionCall;
var fails$6 = fails$1p;
var toString$4 = toString$C;
var hasOwn$5 = hasOwnProperty_1;
var validateArgumentsLength$9 = validateArgumentsLength$b;
var ctoi = base64Map.ctoi;
var disallowed = /[^\d+/a-z]/i;
var whitespaces = /[\t\n\f\r ]+/g;
var finalEq = /[=]{1,2}$/;
var $atob = getBuiltIn$5("atob");
var fromCharCode$1 = String.fromCharCode;
var charAt$3 = uncurryThis$a("".charAt);
var replace$3 = uncurryThis$a("".replace);
var exec$2 = uncurryThis$a(disallowed.exec);
var NO_SPACES_IGNORE = fails$6(function() {
  return $atob(" ") !== "";
});
var NO_ENCODING_CHECK = !fails$6(function() {
  $atob("a");
});
var NO_ARG_RECEIVING_CHECK$1 = !NO_SPACES_IGNORE && !NO_ENCODING_CHECK && !fails$6(function() {
  $atob();
});
var WRONG_ARITY$1 = !NO_SPACES_IGNORE && !NO_ENCODING_CHECK && $atob.length !== 1;
$$e({ global: true, bind: true, enumerable: true, forced: NO_SPACES_IGNORE || NO_ENCODING_CHECK || NO_ARG_RECEIVING_CHECK$1 || WRONG_ARITY$1 }, {
  atob: function atob(data2) {
    validateArgumentsLength$9(arguments.length, 1);
    if (NO_ARG_RECEIVING_CHECK$1 || WRONG_ARITY$1)
      return call$3($atob, global$g, data2);
    var string = replace$3(toString$4(data2), whitespaces, "");
    var output = "";
    var position = 0;
    var bc = 0;
    var chr, bs;
    if (string.length % 4 == 0) {
      string = replace$3(string, finalEq, "");
    }
    if (string.length % 4 == 1 || exec$2(disallowed, string)) {
      throw new (getBuiltIn$5("DOMException"))("The string is not correctly encoded", "InvalidCharacterError");
    }
    while (chr = charAt$3(string, position++)) {
      if (hasOwn$5(ctoi, chr)) {
        bs = bc % 4 ? bs * 64 + ctoi[chr] : ctoi[chr];
        if (bc++ % 4)
          output += fromCharCode$1(255 & bs >> (-2 * bc & 6));
      }
    }
    return output;
  }
});
var $$d = _export;
var global$f = global$_;
var getBuiltIn$4 = getBuiltIn$n;
var uncurryThis$9 = functionUncurryThis;
var call$2 = functionCall;
var fails$5 = fails$1p;
var toString$3 = toString$C;
var validateArgumentsLength$8 = validateArgumentsLength$b;
var itoc = base64Map.itoc;
var $btoa = getBuiltIn$4("btoa");
var charAt$2 = uncurryThis$9("".charAt);
var charCodeAt$1 = uncurryThis$9("".charCodeAt);
var NO_ARG_RECEIVING_CHECK = !!$btoa && !fails$5(function() {
  $btoa();
});
var WRONG_ARG_CONVERSION = !!$btoa && fails$5(function() {
  return $btoa(null) !== "bnVsbA==";
});
var WRONG_ARITY = !!$btoa && $btoa.length !== 1;
$$d({ global: true, bind: true, enumerable: true, forced: NO_ARG_RECEIVING_CHECK || WRONG_ARG_CONVERSION || WRONG_ARITY }, {
  btoa: function btoa(data2) {
    validateArgumentsLength$8(arguments.length, 1);
    if (NO_ARG_RECEIVING_CHECK || WRONG_ARG_CONVERSION || WRONG_ARITY)
      return call$2($btoa, global$f, toString$3(data2));
    var string = toString$3(data2);
    var output = "";
    var position = 0;
    var map3 = itoc;
    var block, charCode;
    while (charAt$2(string, position) || (map3 = "=", position % 1)) {
      charCode = charCodeAt$1(string, position += 3 / 4);
      if (charCode > 255) {
        throw new (getBuiltIn$4("DOMException"))("The string contains characters outside of the Latin1 range", "InvalidCharacterError");
      }
      block = block << 8 | charCode;
      output += charAt$2(map3, 63 & block >> 8 - position % 1 * 8);
    }
    return output;
  }
});
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};
var documentCreateElement = documentCreateElement$2;
var classList = documentCreateElement("span").classList;
var DOMTokenListPrototype$2 = classList && classList.constructor && classList.constructor.prototype;
var domTokenListPrototype = DOMTokenListPrototype$2 === Object.prototype ? void 0 : DOMTokenListPrototype$2;
var global$e = global$_;
var DOMIterables$1 = domIterables;
var DOMTokenListPrototype$1 = domTokenListPrototype;
var forEach$2 = arrayForEach;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$f;
var handlePrototype$1 = function(CollectionPrototype) {
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach$2)
    try {
      createNonEnumerableProperty$2(CollectionPrototype, "forEach", forEach$2);
    } catch (error) {
      CollectionPrototype.forEach = forEach$2;
    }
};
for (var COLLECTION_NAME$1 in DOMIterables$1) {
  if (DOMIterables$1[COLLECTION_NAME$1]) {
    handlePrototype$1(global$e[COLLECTION_NAME$1] && global$e[COLLECTION_NAME$1].prototype);
  }
}
handlePrototype$1(DOMTokenListPrototype$1);
var global$d = global$_;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$f;
var wellKnownSymbol$2 = wellKnownSymbol$z;
var ITERATOR$2 = wellKnownSymbol$2("iterator");
var TO_STRING_TAG = wellKnownSymbol$2("toStringTag");
var ArrayValues = ArrayIteratorMethods.values;
var handlePrototype = function(CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    if (CollectionPrototype[ITERATOR$2] !== ArrayValues)
      try {
        createNonEnumerableProperty$1(CollectionPrototype, ITERATOR$2, ArrayValues);
      } catch (error) {
        CollectionPrototype[ITERATOR$2] = ArrayValues;
      }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME])
      for (var METHOD_NAME in ArrayIteratorMethods) {
        if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME])
          try {
            createNonEnumerableProperty$1(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
          } catch (error) {
            CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
          }
      }
  }
};
for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global$d[COLLECTION_NAME] && global$d[COLLECTION_NAME].prototype, COLLECTION_NAME);
}
handlePrototype(DOMTokenListPrototype, "DOMTokenList");
var IS_NODE$2 = engineIsNode;
var tryNodeRequire$1 = function(name) {
  try {
    if (IS_NODE$2)
      return Function('return require("' + name + '")')();
  } catch (error) {
  }
};
var domExceptionConstants = {
  IndexSizeError: { s: "INDEX_SIZE_ERR", c: 1, m: 1 },
  DOMStringSizeError: { s: "DOMSTRING_SIZE_ERR", c: 2, m: 0 },
  HierarchyRequestError: { s: "HIERARCHY_REQUEST_ERR", c: 3, m: 1 },
  WrongDocumentError: { s: "WRONG_DOCUMENT_ERR", c: 4, m: 1 },
  InvalidCharacterError: { s: "INVALID_CHARACTER_ERR", c: 5, m: 1 },
  NoDataAllowedError: { s: "NO_DATA_ALLOWED_ERR", c: 6, m: 0 },
  NoModificationAllowedError: { s: "NO_MODIFICATION_ALLOWED_ERR", c: 7, m: 1 },
  NotFoundError: { s: "NOT_FOUND_ERR", c: 8, m: 1 },
  NotSupportedError: { s: "NOT_SUPPORTED_ERR", c: 9, m: 1 },
  InUseAttributeError: { s: "INUSE_ATTRIBUTE_ERR", c: 10, m: 1 },
  InvalidStateError: { s: "INVALID_STATE_ERR", c: 11, m: 1 },
  SyntaxError: { s: "SYNTAX_ERR", c: 12, m: 1 },
  InvalidModificationError: { s: "INVALID_MODIFICATION_ERR", c: 13, m: 1 },
  NamespaceError: { s: "NAMESPACE_ERR", c: 14, m: 1 },
  InvalidAccessError: { s: "INVALID_ACCESS_ERR", c: 15, m: 1 },
  ValidationError: { s: "VALIDATION_ERR", c: 16, m: 0 },
  TypeMismatchError: { s: "TYPE_MISMATCH_ERR", c: 17, m: 1 },
  SecurityError: { s: "SECURITY_ERR", c: 18, m: 1 },
  NetworkError: { s: "NETWORK_ERR", c: 19, m: 1 },
  AbortError: { s: "ABORT_ERR", c: 20, m: 1 },
  URLMismatchError: { s: "URL_MISMATCH_ERR", c: 21, m: 1 },
  QuotaExceededError: { s: "QUOTA_EXCEEDED_ERR", c: 22, m: 1 },
  TimeoutError: { s: "TIMEOUT_ERR", c: 23, m: 1 },
  InvalidNodeTypeError: { s: "INVALID_NODE_TYPE_ERR", c: 24, m: 1 },
  DataCloneError: { s: "DATA_CLONE_ERR", c: 25, m: 1 }
};
var $$c = _export;
var tryNodeRequire = tryNodeRequire$1;
var getBuiltIn$3 = getBuiltIn$n;
var fails$4 = fails$1p;
var create$1 = objectCreate;
var createPropertyDescriptor$2 = createPropertyDescriptor$c;
var defineProperty$2 = objectDefineProperty.f;
var defineBuiltIn$4 = defineBuiltIn$o;
var defineBuiltInAccessor$4 = defineBuiltInAccessor$h;
var hasOwn$4 = hasOwnProperty_1;
var anInstance$3 = anInstance$a;
var anObject$2 = anObject$D;
var errorToString = errorToString$2;
var normalizeStringArgument$1 = normalizeStringArgument$5;
var DOMExceptionConstants$1 = domExceptionConstants;
var clearErrorStack$1 = errorStackClear;
var InternalStateModule$2 = internalState;
var DESCRIPTORS$6 = descriptors;
var DOM_EXCEPTION$2 = "DOMException";
var DATA_CLONE_ERR = "DATA_CLONE_ERR";
var Error$3 = getBuiltIn$3("Error");
var NativeDOMException$1 = getBuiltIn$3(DOM_EXCEPTION$2) || function() {
  try {
    var MessageChannel2 = getBuiltIn$3("MessageChannel") || tryNodeRequire("worker_threads").MessageChannel;
    new MessageChannel2().port1.postMessage(/* @__PURE__ */ new WeakMap());
  } catch (error) {
    if (error.name == DATA_CLONE_ERR && error.code == 25)
      return error.constructor;
  }
}();
var NativeDOMExceptionPrototype = NativeDOMException$1 && NativeDOMException$1.prototype;
var ErrorPrototype = Error$3.prototype;
var setInternalState$2 = InternalStateModule$2.set;
var getInternalState = InternalStateModule$2.getterFor(DOM_EXCEPTION$2);
var HAS_STACK = "stack" in Error$3(DOM_EXCEPTION$2);
var codeFor = function(name) {
  return hasOwn$4(DOMExceptionConstants$1, name) && DOMExceptionConstants$1[name].m ? DOMExceptionConstants$1[name].c : 0;
};
var $DOMException$1 = function DOMException() {
  anInstance$3(this, DOMExceptionPrototype$1);
  var argumentsLength = arguments.length;
  var message = normalizeStringArgument$1(argumentsLength < 1 ? void 0 : arguments[0]);
  var name = normalizeStringArgument$1(argumentsLength < 2 ? void 0 : arguments[1], "Error");
  var code = codeFor(name);
  setInternalState$2(this, {
    type: DOM_EXCEPTION$2,
    name,
    message,
    code
  });
  if (!DESCRIPTORS$6) {
    this.name = name;
    this.message = message;
    this.code = code;
  }
  if (HAS_STACK) {
    var error = Error$3(message);
    error.name = DOM_EXCEPTION$2;
    defineProperty$2(this, "stack", createPropertyDescriptor$2(1, clearErrorStack$1(error.stack, 1)));
  }
};
var DOMExceptionPrototype$1 = $DOMException$1.prototype = create$1(ErrorPrototype);
var createGetterDescriptor = function(get3) {
  return { enumerable: true, configurable: true, get: get3 };
};
var getterFor = function(key) {
  return createGetterDescriptor(function() {
    return getInternalState(this)[key];
  });
};
if (DESCRIPTORS$6) {
  defineBuiltInAccessor$4(DOMExceptionPrototype$1, "code", getterFor("code"));
  defineBuiltInAccessor$4(DOMExceptionPrototype$1, "message", getterFor("message"));
  defineBuiltInAccessor$4(DOMExceptionPrototype$1, "name", getterFor("name"));
}
defineProperty$2(DOMExceptionPrototype$1, "constructor", createPropertyDescriptor$2(1, $DOMException$1));
var INCORRECT_CONSTRUCTOR = fails$4(function() {
  return !(new NativeDOMException$1() instanceof Error$3);
});
var INCORRECT_TO_STRING = INCORRECT_CONSTRUCTOR || fails$4(function() {
  return ErrorPrototype.toString !== errorToString || String(new NativeDOMException$1(1, 2)) !== "2: 1";
});
var INCORRECT_CODE = INCORRECT_CONSTRUCTOR || fails$4(function() {
  return new NativeDOMException$1(1, "DataCloneError").code !== 25;
});
INCORRECT_CONSTRUCTOR || NativeDOMException$1[DATA_CLONE_ERR] !== 25 || NativeDOMExceptionPrototype[DATA_CLONE_ERR] !== 25;
var FORCED_CONSTRUCTOR$1 = INCORRECT_CONSTRUCTOR;
$$c({ global: true, constructor: true, forced: FORCED_CONSTRUCTOR$1 }, {
  DOMException: FORCED_CONSTRUCTOR$1 ? $DOMException$1 : NativeDOMException$1
});
var PolyfilledDOMException$1 = getBuiltIn$3(DOM_EXCEPTION$2);
var PolyfilledDOMExceptionPrototype$1 = PolyfilledDOMException$1.prototype;
if (INCORRECT_TO_STRING && NativeDOMException$1 === PolyfilledDOMException$1) {
  defineBuiltIn$4(PolyfilledDOMExceptionPrototype$1, "toString", errorToString);
}
if (INCORRECT_CODE && DESCRIPTORS$6 && NativeDOMException$1 === PolyfilledDOMException$1) {
  defineBuiltInAccessor$4(PolyfilledDOMExceptionPrototype$1, "code", createGetterDescriptor(function() {
    return codeFor(anObject$2(this).name);
  }));
}
for (var key$1 in DOMExceptionConstants$1)
  if (hasOwn$4(DOMExceptionConstants$1, key$1)) {
    var constant$1 = DOMExceptionConstants$1[key$1];
    var constantName$1 = constant$1.s;
    var descriptor$2 = createPropertyDescriptor$2(6, constant$1.c);
    if (!hasOwn$4(PolyfilledDOMException$1, constantName$1)) {
      defineProperty$2(PolyfilledDOMException$1, constantName$1, descriptor$2);
    }
    if (!hasOwn$4(PolyfilledDOMExceptionPrototype$1, constantName$1)) {
      defineProperty$2(PolyfilledDOMExceptionPrototype$1, constantName$1, descriptor$2);
    }
  }
var $$b = _export;
var global$c = global$_;
var getBuiltIn$2 = getBuiltIn$n;
var createPropertyDescriptor$1 = createPropertyDescriptor$c;
var defineProperty$1 = objectDefineProperty.f;
var hasOwn$3 = hasOwnProperty_1;
var anInstance$2 = anInstance$a;
var inheritIfRequired = inheritIfRequired$6;
var normalizeStringArgument = normalizeStringArgument$5;
var DOMExceptionConstants = domExceptionConstants;
var clearErrorStack = errorStackClear;
var DESCRIPTORS$5 = descriptors;
var DOM_EXCEPTION$1 = "DOMException";
var Error$2 = getBuiltIn$2("Error");
var NativeDOMException = getBuiltIn$2(DOM_EXCEPTION$1);
var $DOMException = function DOMException2() {
  anInstance$2(this, DOMExceptionPrototype);
  var argumentsLength = arguments.length;
  var message = normalizeStringArgument(argumentsLength < 1 ? void 0 : arguments[0]);
  var name = normalizeStringArgument(argumentsLength < 2 ? void 0 : arguments[1], "Error");
  var that = new NativeDOMException(message, name);
  var error = Error$2(message);
  error.name = DOM_EXCEPTION$1;
  defineProperty$1(that, "stack", createPropertyDescriptor$1(1, clearErrorStack(error.stack, 1)));
  inheritIfRequired(that, this, $DOMException);
  return that;
};
var DOMExceptionPrototype = $DOMException.prototype = NativeDOMException.prototype;
var ERROR_HAS_STACK = "stack" in Error$2(DOM_EXCEPTION$1);
var DOM_EXCEPTION_HAS_STACK = "stack" in new NativeDOMException(1, 2);
var descriptor$1 = NativeDOMException && DESCRIPTORS$5 && Object.getOwnPropertyDescriptor(global$c, DOM_EXCEPTION$1);
var BUGGY_DESCRIPTOR = !!descriptor$1 && !(descriptor$1.writable && descriptor$1.configurable);
var FORCED_CONSTRUCTOR = ERROR_HAS_STACK && !BUGGY_DESCRIPTOR && !DOM_EXCEPTION_HAS_STACK;
$$b({ global: true, constructor: true, forced: FORCED_CONSTRUCTOR }, {
  // TODO: fix export logic
  DOMException: FORCED_CONSTRUCTOR ? $DOMException : NativeDOMException
});
var PolyfilledDOMException = getBuiltIn$2(DOM_EXCEPTION$1);
var PolyfilledDOMExceptionPrototype = PolyfilledDOMException.prototype;
if (PolyfilledDOMExceptionPrototype.constructor !== PolyfilledDOMException) {
  {
    defineProperty$1(PolyfilledDOMExceptionPrototype, "constructor", createPropertyDescriptor$1(1, PolyfilledDOMException));
  }
  for (var key in DOMExceptionConstants)
    if (hasOwn$3(DOMExceptionConstants, key)) {
      var constant = DOMExceptionConstants[key];
      var constantName = constant.s;
      if (!hasOwn$3(PolyfilledDOMException, constantName)) {
        defineProperty$1(PolyfilledDOMException, constantName, createPropertyDescriptor$1(6, constant.c));
      }
    }
}
var getBuiltIn$1 = getBuiltIn$n;
var setToStringTag$2 = setToStringTag$d;
var DOM_EXCEPTION = "DOMException";
setToStringTag$2(getBuiltIn$1(DOM_EXCEPTION), DOM_EXCEPTION);
var $$a = _export;
var global$b = global$_;
var clearImmediate = task$1.clear;
$$a({ global: true, bind: true, enumerable: true, forced: global$b.clearImmediate !== clearImmediate }, {
  clearImmediate
});
var engineIsBun = typeof Bun == "function" && Bun && typeof Bun.version == "string";
var global$a = global$_;
var apply2 = functionApply$1;
var isCallable$2 = isCallable$z;
var ENGINE_IS_BUN = engineIsBun;
var USER_AGENT = engineUserAgent;
var arraySlice$1 = arraySlice$a;
var validateArgumentsLength$7 = validateArgumentsLength$b;
var Function$1 = global$a.Function;
var WRAP = /MSIE .\./.test(USER_AGENT) || ENGINE_IS_BUN && function() {
  var version2 = global$a.Bun.version.split(".");
  return version2.length < 3 || version2[0] == 0 && (version2[1] < 3 || version2[1] == 3 && version2[2] == 0);
}();
var schedulersFix$3 = function(scheduler, hasTimeArg) {
  var firstParamIndex = hasTimeArg ? 2 : 1;
  return WRAP ? function(handler, timeout) {
    var boundArgs = validateArgumentsLength$7(arguments.length, 1) > firstParamIndex;
    var fn = isCallable$2(handler) ? handler : Function$1(handler);
    var params2 = boundArgs ? arraySlice$1(arguments, firstParamIndex) : [];
    var callback = boundArgs ? function() {
      apply2(fn, this, params2);
    } : fn;
    return hasTimeArg ? scheduler(callback, timeout) : scheduler(callback);
  } : scheduler;
};
var $$9 = _export;
var global$9 = global$_;
var setTask = task$1.set;
var schedulersFix$2 = schedulersFix$3;
var setImmediate = global$9.setImmediate ? schedulersFix$2(setTask, false) : setTask;
$$9({ global: true, bind: true, enumerable: true, forced: global$9.setImmediate !== setImmediate }, {
  setImmediate
});
var $$8 = _export;
var global$8 = global$_;
var microtask = microtask_1;
var aCallable = aCallable$l;
var validateArgumentsLength$6 = validateArgumentsLength$b;
var IS_NODE$1 = engineIsNode;
var process$1 = global$8.process;
$$8({ global: true, enumerable: true, dontCallGetSet: true }, {
  queueMicrotask: function queueMicrotask(fn) {
    validateArgumentsLength$6(arguments.length, 1);
    aCallable(fn);
    var domain = IS_NODE$1 && process$1.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});
var $$7 = _export;
var global$7 = global$_;
var defineBuiltInAccessor$3 = defineBuiltInAccessor$h;
var DESCRIPTORS$4 = descriptors;
var $TypeError = TypeError;
var defineProperty6 = Object.defineProperty;
var INCORRECT_VALUE = global$7.self !== global$7;
try {
  if (DESCRIPTORS$4) {
    var descriptor = Object.getOwnPropertyDescriptor(global$7, "self");
    if (INCORRECT_VALUE || !descriptor || !descriptor.get || !descriptor.enumerable) {
      defineBuiltInAccessor$3(global$7, "self", {
        get: function self2() {
          return global$7;
        },
        set: function self2(value) {
          if (this !== global$7)
            throw $TypeError("Illegal invocation");
          defineProperty6(global$7, "self", {
            value,
            writable: true,
            configurable: true,
            enumerable: true
          });
        },
        configurable: true,
        enumerable: true
      });
    }
  } else
    $$7({ global: true, simple: true, forced: INCORRECT_VALUE }, {
      self: global$7
    });
} catch (error) {
}
var uncurryThis$8 = functionUncurryThis;
var MapPrototype = Map.prototype;
var mapHelpers = {
  // eslint-disable-next-line es/no-map -- safe
  Map,
  set: uncurryThis$8(MapPrototype.set),
  get: uncurryThis$8(MapPrototype.get),
  has: uncurryThis$8(MapPrototype.has),
  remove: uncurryThis$8(MapPrototype["delete"]),
  proto: MapPrototype
};
var uncurryThis$7 = functionUncurryThis;
var SetPrototype = Set.prototype;
var setHelpers = {
  // eslint-disable-next-line es/no-set -- safe
  Set,
  add: uncurryThis$7(SetPrototype.add),
  has: uncurryThis$7(SetPrototype.has),
  remove: uncurryThis$7(SetPrototype["delete"]),
  proto: SetPrototype
};
var global$6 = global$_;
var fails$3 = fails$1p;
var V8 = engineV8Version;
var IS_BROWSER = engineIsBrowser;
var IS_DENO = engineIsDeno;
var IS_NODE = engineIsNode;
var structuredClone = global$6.structuredClone;
var structuredCloneProperTransfer = !!structuredClone && !fails$3(function() {
  if (IS_DENO && V8 > 92 || IS_NODE && V8 > 94 || IS_BROWSER && V8 > 97)
    return false;
  var buffer = new ArrayBuffer(8);
  var clone = structuredClone(buffer, { transfer: [buffer] });
  return buffer.byteLength != 0 || clone.byteLength != 8;
});
var $$6 = _export;
var global$5 = global$_;
var getBuiltin = getBuiltIn$n;
var uncurryThis$6 = functionUncurryThis;
var fails$2 = fails$1p;
var uid = uid$6;
var isCallable$1 = isCallable$z;
var isConstructor3 = isConstructor$6;
var isNullOrUndefined = isNullOrUndefined$e;
var isObject$1 = isObject$z;
var isSymbol = isSymbol$7;
var iterate = iterate$a;
var anObject$1 = anObject$D;
var classof$1 = classof$m;
var hasOwn$2 = hasOwnProperty_1;
var createProperty = createProperty$9;
var createNonEnumerableProperty = createNonEnumerableProperty$f;
var lengthOfArrayLike = lengthOfArrayLike$t;
var validateArgumentsLength$5 = validateArgumentsLength$b;
var getRegExpFlags = regexpGetFlags;
var MapHelpers = mapHelpers;
var SetHelpers = setHelpers;
var ERROR_STACK_INSTALLABLE = errorStackInstallable;
var PROPER_TRANSFER = structuredCloneProperTransfer;
var Object$1 = global$5.Object;
var Array$1 = global$5.Array;
var Date$1 = global$5.Date;
var Error$1 = global$5.Error;
var EvalError = global$5.EvalError;
var RangeError$1 = global$5.RangeError;
var ReferenceError = global$5.ReferenceError;
var SyntaxError = global$5.SyntaxError;
var TypeError$3 = global$5.TypeError;
var URIError = global$5.URIError;
var PerformanceMark = global$5.PerformanceMark;
var WebAssembly = global$5.WebAssembly;
var CompileError = WebAssembly && WebAssembly.CompileError || Error$1;
var LinkError = WebAssembly && WebAssembly.LinkError || Error$1;
var RuntimeError = WebAssembly && WebAssembly.RuntimeError || Error$1;
var DOMException3 = getBuiltin("DOMException");
var Map$1 = MapHelpers.Map;
var mapHas = MapHelpers.has;
var mapGet = MapHelpers.get;
var mapSet = MapHelpers.set;
var Set$1 = SetHelpers.Set;
var setAdd = SetHelpers.add;
var objectKeys = getBuiltin("Object", "keys");
var push$4 = uncurryThis$6([].push);
var thisBooleanValue = uncurryThis$6(true.valueOf);
var thisNumberValue = uncurryThis$6(1 .valueOf);
var thisStringValue = uncurryThis$6("".valueOf);
var thisTimeValue = uncurryThis$6(Date$1.prototype.getTime);
var PERFORMANCE_MARK = uid("structuredClone");
var DATA_CLONE_ERROR = "DataCloneError";
var TRANSFERRING = "Transferring";
var checkBasicSemantic = function(structuredCloneImplementation) {
  return !fails$2(function() {
    var set1 = new global$5.Set([7]);
    var set22 = structuredCloneImplementation(set1);
    var number = structuredCloneImplementation(Object$1(7));
    return set22 == set1 || !set22.has(7) || typeof number != "object" || number != 7;
  }) && structuredCloneImplementation;
};
var checkErrorsCloning = function(structuredCloneImplementation, $Error2) {
  return !fails$2(function() {
    var error = new $Error2();
    var test2 = structuredCloneImplementation({ a: error, b: error });
    return !(test2 && test2.a === test2.b && test2.a instanceof $Error2 && test2.a.stack === error.stack);
  });
};
var checkNewErrorsCloningSemantic = function(structuredCloneImplementation) {
  return !fails$2(function() {
    var test2 = structuredCloneImplementation(new global$5.AggregateError([1], PERFORMANCE_MARK, { cause: 3 }));
    return test2.name != "AggregateError" || test2.errors[0] != 1 || test2.message != PERFORMANCE_MARK || test2.cause != 3;
  });
};
var nativeStructuredClone = global$5.structuredClone;
var FORCED_REPLACEMENT = !checkErrorsCloning(nativeStructuredClone, Error$1) || !checkErrorsCloning(nativeStructuredClone, DOMException3) || !checkNewErrorsCloningSemantic(nativeStructuredClone);
var structuredCloneFromMark = !nativeStructuredClone && checkBasicSemantic(function(value) {
  return new PerformanceMark(PERFORMANCE_MARK, { detail: value }).detail;
});
var nativeRestrictedStructuredClone = checkBasicSemantic(nativeStructuredClone) || structuredCloneFromMark;
var throwUncloneable = function(type) {
  throw new DOMException3("Uncloneable type: " + type, DATA_CLONE_ERROR);
};
var throwUnpolyfillable = function(type, action) {
  throw new DOMException3((action || "Cloning") + " of " + type + " cannot be properly polyfilled in this engine", DATA_CLONE_ERROR);
};
var tryNativeRestrictedStructuredClone = function(value, type) {
  if (!nativeRestrictedStructuredClone)
    throwUnpolyfillable(type);
  return nativeRestrictedStructuredClone(value);
};
var createDataTransfer = function() {
  var dataTransfer;
  try {
    dataTransfer = new global$5.DataTransfer();
  } catch (error) {
    try {
      dataTransfer = new global$5.ClipboardEvent("").clipboardData;
    } catch (error2) {
    }
  }
  return dataTransfer && dataTransfer.items && dataTransfer.files ? dataTransfer : null;
};
var cloneBuffer = function(value, map3, $type) {
  if (mapHas(map3, value))
    return mapGet(map3, value);
  var type = $type || classof$1(value);
  var clone, length, options, source, target, i;
  if (type === "SharedArrayBuffer") {
    if (nativeRestrictedStructuredClone)
      clone = nativeRestrictedStructuredClone(value);
    else
      clone = value;
  } else {
    var DataView2 = global$5.DataView;
    if (!DataView2 && typeof value.slice != "function")
      throwUnpolyfillable("ArrayBuffer");
    try {
      if (typeof value.slice == "function" && !value.resizable) {
        clone = value.slice(0);
      } else {
        length = value.byteLength;
        options = "maxByteLength" in value ? { maxByteLength: value.maxByteLength } : void 0;
        clone = new ArrayBuffer(length, options);
        source = new DataView2(value);
        target = new DataView2(clone);
        for (i = 0; i < length; i++) {
          target.setUint8(i, source.getUint8(i));
        }
      }
    } catch (error) {
      throw new DOMException3("ArrayBuffer is detached", DATA_CLONE_ERROR);
    }
  }
  mapSet(map3, value, clone);
  return clone;
};
var cloneView = function(value, type, offset, length, map3) {
  var C = global$5[type];
  if (!isObject$1(C))
    throwUnpolyfillable(type);
  return new C(cloneBuffer(value.buffer, map3), offset, length);
};
var Placeholder = function(object, type, metadata) {
  this.object = object;
  this.type = type;
  this.metadata = metadata;
};
var structuredCloneInternal = function(value, map3, transferredBuffers) {
  if (isSymbol(value))
    throwUncloneable("Symbol");
  if (!isObject$1(value))
    return value;
  if (map3) {
    if (mapHas(map3, value))
      return mapGet(map3, value);
  } else
    map3 = new Map$1();
  var type = classof$1(value);
  var C, name, cloned, dataTransfer, i, length, keys5, key;
  switch (type) {
    case "Array":
      cloned = Array$1(lengthOfArrayLike(value));
      break;
    case "Object":
      cloned = {};
      break;
    case "Map":
      cloned = new Map$1();
      break;
    case "Set":
      cloned = new Set$1();
      break;
    case "RegExp":
      cloned = new RegExp(value.source, getRegExpFlags(value));
      break;
    case "Error":
      name = value.name;
      switch (name) {
        case "AggregateError":
          cloned = getBuiltin("AggregateError")([]);
          break;
        case "EvalError":
          cloned = EvalError();
          break;
        case "RangeError":
          cloned = RangeError$1();
          break;
        case "ReferenceError":
          cloned = ReferenceError();
          break;
        case "SyntaxError":
          cloned = SyntaxError();
          break;
        case "TypeError":
          cloned = TypeError$3();
          break;
        case "URIError":
          cloned = URIError();
          break;
        case "CompileError":
          cloned = CompileError();
          break;
        case "LinkError":
          cloned = LinkError();
          break;
        case "RuntimeError":
          cloned = RuntimeError();
          break;
        default:
          cloned = Error$1();
      }
      break;
    case "DOMException":
      cloned = new DOMException3(value.message, value.name);
      break;
    case "ArrayBuffer":
    case "SharedArrayBuffer":
      cloned = transferredBuffers ? new Placeholder(value, type) : cloneBuffer(value, map3, type);
      break;
    case "DataView":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float16Array":
    case "Float32Array":
    case "Float64Array":
    case "BigInt64Array":
    case "BigUint64Array":
      length = type === "DataView" ? value.byteLength : value.length;
      cloned = transferredBuffers ? new Placeholder(value, type, { offset: value.byteOffset, length }) : cloneView(value, type, value.byteOffset, length, map3);
      break;
    case "DOMQuad":
      try {
        cloned = new DOMQuad(
          structuredCloneInternal(value.p1, map3, transferredBuffers),
          structuredCloneInternal(value.p2, map3, transferredBuffers),
          structuredCloneInternal(value.p3, map3, transferredBuffers),
          structuredCloneInternal(value.p4, map3, transferredBuffers)
        );
      } catch (error) {
        cloned = tryNativeRestrictedStructuredClone(value, type);
      }
      break;
    case "File":
      if (nativeRestrictedStructuredClone)
        try {
          cloned = nativeRestrictedStructuredClone(value);
          if (classof$1(cloned) !== type)
            cloned = void 0;
        } catch (error) {
        }
      if (!cloned)
        try {
          cloned = new File([value], value.name, value);
        } catch (error) {
        }
      if (!cloned)
        throwUnpolyfillable(type);
      break;
    case "FileList":
      dataTransfer = createDataTransfer();
      if (dataTransfer) {
        for (i = 0, length = lengthOfArrayLike(value); i < length; i++) {
          dataTransfer.items.add(structuredCloneInternal(value[i], map3, transferredBuffers));
        }
        cloned = dataTransfer.files;
      } else
        cloned = tryNativeRestrictedStructuredClone(value, type);
      break;
    case "ImageData":
      try {
        cloned = new ImageData(
          structuredCloneInternal(value.data, map3, transferredBuffers),
          value.width,
          value.height,
          { colorSpace: value.colorSpace }
        );
      } catch (error) {
        cloned = tryNativeRestrictedStructuredClone(value, type);
      }
      break;
    default:
      if (nativeRestrictedStructuredClone) {
        cloned = nativeRestrictedStructuredClone(value);
      } else
        switch (type) {
          case "BigInt":
            cloned = Object$1(value.valueOf());
            break;
          case "Boolean":
            cloned = Object$1(thisBooleanValue(value));
            break;
          case "Number":
            cloned = Object$1(thisNumberValue(value));
            break;
          case "String":
            cloned = Object$1(thisStringValue(value));
            break;
          case "Date":
            cloned = new Date$1(thisTimeValue(value));
            break;
          case "Blob":
            try {
              cloned = value.slice(0, value.size, value.type);
            } catch (error) {
              throwUnpolyfillable(type);
            }
            break;
          case "DOMPoint":
          case "DOMPointReadOnly":
            C = global$5[type];
            try {
              cloned = C.fromPoint ? C.fromPoint(value) : new C(value.x, value.y, value.z, value.w);
            } catch (error) {
              throwUnpolyfillable(type);
            }
            break;
          case "DOMRect":
          case "DOMRectReadOnly":
            C = global$5[type];
            try {
              cloned = C.fromRect ? C.fromRect(value) : new C(value.x, value.y, value.width, value.height);
            } catch (error) {
              throwUnpolyfillable(type);
            }
            break;
          case "DOMMatrix":
          case "DOMMatrixReadOnly":
            C = global$5[type];
            try {
              cloned = C.fromMatrix ? C.fromMatrix(value) : new C(value);
            } catch (error) {
              throwUnpolyfillable(type);
            }
            break;
          case "AudioData":
          case "VideoFrame":
            if (!isCallable$1(value.clone))
              throwUnpolyfillable(type);
            try {
              cloned = value.clone();
            } catch (error) {
              throwUncloneable(type);
            }
            break;
          case "CropTarget":
          case "CryptoKey":
          case "FileSystemDirectoryHandle":
          case "FileSystemFileHandle":
          case "FileSystemHandle":
          case "GPUCompilationInfo":
          case "GPUCompilationMessage":
          case "ImageBitmap":
          case "RTCCertificate":
          case "WebAssembly.Module":
            throwUnpolyfillable(type);
          default:
            throwUncloneable(type);
        }
  }
  mapSet(map3, value, cloned);
  switch (type) {
    case "Array":
    case "Object":
      keys5 = objectKeys(value);
      for (i = 0, length = lengthOfArrayLike(keys5); i < length; i++) {
        key = keys5[i];
        createProperty(cloned, key, structuredCloneInternal(value[key], map3, transferredBuffers));
      }
      break;
    case "Map":
      value.forEach(function(v, k) {
        mapSet(cloned, structuredCloneInternal(k, map3, transferredBuffers), structuredCloneInternal(v, map3, transferredBuffers));
      });
      break;
    case "Set":
      value.forEach(function(v) {
        setAdd(cloned, structuredCloneInternal(v, map3, transferredBuffers));
      });
      break;
    case "Error":
      createNonEnumerableProperty(cloned, "message", structuredCloneInternal(value.message, map3, transferredBuffers));
      if (hasOwn$2(value, "cause")) {
        createNonEnumerableProperty(cloned, "cause", structuredCloneInternal(value.cause, map3, transferredBuffers));
      }
      if (name == "AggregateError") {
        cloned.errors = structuredCloneInternal(value.errors, map3, transferredBuffers);
      }
    case "DOMException":
      if (ERROR_STACK_INSTALLABLE) {
        createNonEnumerableProperty(cloned, "stack", structuredCloneInternal(value.stack, map3, transferredBuffers));
      }
  }
  return cloned;
};
var replacePlaceholders = function(value, map3) {
  if (!isObject$1(value))
    return value;
  if (mapHas(map3, value))
    return mapGet(map3, value);
  var type, object, metadata, i, length, keys5, key, replacement2;
  if (value instanceof Placeholder) {
    type = value.type;
    object = value.object;
    switch (type) {
      case "ArrayBuffer":
      case "SharedArrayBuffer":
        replacement2 = cloneBuffer(object, map3, type);
        break;
      case "DataView":
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float16Array":
      case "Float32Array":
      case "Float64Array":
      case "BigInt64Array":
      case "BigUint64Array":
        metadata = value.metadata;
        replacement2 = cloneView(object, type, metadata.offset, metadata.length, map3);
    }
  } else
    switch (classof$1(value)) {
      case "Array":
      case "Object":
        keys5 = objectKeys(value);
        for (i = 0, length = lengthOfArrayLike(keys5); i < length; i++) {
          key = keys5[i];
          value[key] = replacePlaceholders(value[key], map3);
        }
        break;
      case "Map":
        replacement2 = new Map$1();
        value.forEach(function(v, k) {
          mapSet(replacement2, replacePlaceholders(k, map3), replacePlaceholders(v, map3));
        });
        break;
      case "Set":
        replacement2 = new Set$1();
        value.forEach(function(v) {
          setAdd(replacement2, replacePlaceholders(v, map3));
        });
        break;
      case "Error":
        value.message = replacePlaceholders(value.message, map3);
        if (hasOwn$2(value, "cause")) {
          value.cause = replacePlaceholders(value.cause, map3);
        }
        if (value.name == "AggregateError") {
          value.errors = replacePlaceholders(value.errors, map3);
        }
      case "DOMException":
        if (ERROR_STACK_INSTALLABLE) {
          value.stack = replacePlaceholders(value.stack, map3);
        }
    }
  mapSet(map3, value, replacement2 || value);
  return replacement2 || value;
};
var tryToTransfer = function(rawTransfer, map3) {
  if (!isObject$1(rawTransfer))
    throw TypeError$3("Transfer option cannot be converted to a sequence");
  var transfer = [];
  iterate(rawTransfer, function(value2) {
    push$4(transfer, anObject$1(value2));
  });
  var i = 0;
  var length = lengthOfArrayLike(transfer);
  var buffers = [];
  var value, type, C, transferred, canvas, context;
  while (i < length) {
    value = transfer[i++];
    type = classof$1(value);
    if (type === "ArrayBuffer") {
      push$4(buffers, value);
      continue;
    }
    if (mapHas(map3, value))
      throw new DOMException3("Duplicate transferable", DATA_CLONE_ERROR);
    if (PROPER_TRANSFER) {
      transferred = nativeStructuredClone(value, { transfer: [value] });
    } else
      switch (type) {
        case "ImageBitmap":
          C = global$5.OffscreenCanvas;
          if (!isConstructor3(C))
            throwUnpolyfillable(type, TRANSFERRING);
          try {
            canvas = new C(value.width, value.height);
            context = canvas.getContext("bitmaprenderer");
            context.transferFromImageBitmap(value);
            transferred = canvas.transferToImageBitmap();
          } catch (error) {
          }
          break;
        case "AudioData":
        case "VideoFrame":
          if (!isCallable$1(value.clone) || !isCallable$1(value.close))
            throwUnpolyfillable(type, TRANSFERRING);
          try {
            transferred = value.clone();
            value.close();
          } catch (error) {
          }
          break;
        case "MediaSourceHandle":
        case "MessagePort":
        case "OffscreenCanvas":
        case "ReadableStream":
        case "TransformStream":
        case "WritableStream":
          throwUnpolyfillable(type, TRANSFERRING);
      }
    if (transferred === void 0)
      throw new DOMException3("This object cannot be transferred: " + type, DATA_CLONE_ERROR);
    mapSet(map3, value, transferred);
  }
  return buffers;
};
var tryToTransferBuffers = function(transfer, map3) {
  var i = 0;
  var length = lengthOfArrayLike(transfer);
  var value, transferred;
  while (i < length) {
    value = transfer[i++];
    if (mapHas(map3, value))
      throw new DOMException3("Duplicate transferable", DATA_CLONE_ERROR);
    if (PROPER_TRANSFER) {
      transferred = nativeStructuredClone(value, { transfer: [value] });
    } else {
      if (!isCallable$1(value.transfer))
        throwUnpolyfillable("ArrayBuffer", TRANSFERRING);
      transferred = value.transfer();
    }
    mapSet(map3, value, transferred);
  }
};
$$6({ global: true, enumerable: true, sham: !PROPER_TRANSFER, forced: FORCED_REPLACEMENT }, {
  structuredClone: function structuredClone2(value) {
    var options = validateArgumentsLength$5(arguments.length, 1) > 1 && !isNullOrUndefined(arguments[1]) ? anObject$1(arguments[1]) : void 0;
    var transfer = options ? options.transfer : void 0;
    var transferredBuffers = false;
    var map3, buffers;
    if (transfer !== void 0) {
      map3 = new Map$1();
      buffers = tryToTransfer(transfer, map3);
      transferredBuffers = !!lengthOfArrayLike(buffers);
    }
    var clone = structuredCloneInternal(value, map3, transferredBuffers);
    if (transferredBuffers) {
      map3 = new Map$1();
      tryToTransferBuffers(transfer, map3);
      clone = replacePlaceholders(clone, map3);
    }
    return clone;
  }
});
var $$5 = _export;
var global$4 = global$_;
var schedulersFix$1 = schedulersFix$3;
var setInterval = schedulersFix$1(global$4.setInterval, true);
$$5({ global: true, bind: true, forced: global$4.setInterval !== setInterval }, {
  setInterval
});
var $$4 = _export;
var global$3 = global$_;
var schedulersFix = schedulersFix$3;
var setTimeout$1 = schedulersFix(global$3.setTimeout, true);
$$4({ global: true, bind: true, forced: global$3.setTimeout !== setTimeout$1 }, {
  setTimeout: setTimeout$1
});
var fails$1 = fails$1p;
var wellKnownSymbol$1 = wellKnownSymbol$z;
var DESCRIPTORS$3 = descriptors;
var IS_PURE = isPure;
var ITERATOR$1 = wellKnownSymbol$1("iterator");
var urlConstructorDetection = !fails$1(function() {
  var url = new URL("b?a=1&b=2&c=3", "http://a");
  var searchParams = url.searchParams;
  var searchParams2 = new URLSearchParams("a=1&a=2");
  var result = "";
  url.pathname = "c%20d";
  searchParams.forEach(function(value, key) {
    searchParams["delete"]("b");
    result += key + value;
  });
  searchParams2["delete"]("a", 2);
  return IS_PURE && (!url.toJSON || !searchParams2.has("a", 1) || searchParams2.has("a", 2)) || !searchParams.size && (IS_PURE || !DESCRIPTORS$3) || !searchParams.sort || url.href !== "http://a/c%20d?a=1&c=3" || searchParams.get("c") !== "3" || String(new URLSearchParams("?a=1")) !== "a=1" || !searchParams[ITERATOR$1] || new URL("https://a@b").username !== "a" || new URLSearchParams(new URLSearchParams("a=b")).get("a") !== "b" || new URL("http://тест").host !== "xn--e1aybc" || new URL("http://a#б").hash !== "#%D0%B1" || result !== "a1c3" || new URL("http://x", void 0).host !== "x";
});
var uncurryThis$5 = functionUncurryThis;
var maxInt = 2147483647;
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128;
var delimiter = "-";
var regexNonASCII = /[^\0-\u007E]/;
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g;
var OVERFLOW_ERROR = "Overflow: input needs wider integers to process";
var baseMinusTMin = base - tMin;
var $RangeError = RangeError;
var exec$1 = uncurryThis$5(regexSeparators.exec);
var floor$1 = Math.floor;
var fromCharCode = String.fromCharCode;
var charCodeAt = uncurryThis$5("".charCodeAt);
var join$2 = uncurryThis$5([].join);
var push$3 = uncurryThis$5([].push);
var replace$2 = uncurryThis$5("".replace);
var split$2 = uncurryThis$5("".split);
var toLowerCase$1 = uncurryThis$5("".toLowerCase);
var ucs2decode = function(string) {
  var output = [];
  var counter2 = 0;
  var length = string.length;
  while (counter2 < length) {
    var value = charCodeAt(string, counter2++);
    if (value >= 55296 && value <= 56319 && counter2 < length) {
      var extra = charCodeAt(string, counter2++);
      if ((extra & 64512) == 56320) {
        push$3(output, ((value & 1023) << 10) + (extra & 1023) + 65536);
      } else {
        push$3(output, value);
        counter2--;
      }
    } else {
      push$3(output, value);
    }
  }
  return output;
};
var digitToBasic = function(digit) {
  return digit + 22 + 75 * (digit < 26);
};
var adapt = function(delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor$1(delta / damp) : delta >> 1;
  delta += floor$1(delta / numPoints);
  while (delta > baseMinusTMin * tMax >> 1) {
    delta = floor$1(delta / baseMinusTMin);
    k += base;
  }
  return floor$1(k + (baseMinusTMin + 1) * delta / (delta + skew));
};
var encode = function(input) {
  var output = [];
  input = ucs2decode(input);
  var inputLength = input.length;
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 128) {
      push$3(output, fromCharCode(currentValue));
    }
  }
  var basicLength = output.length;
  var handledCPCount = basicLength;
  if (basicLength) {
    push$3(output, delimiter);
  }
  while (handledCPCount < inputLength) {
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor$1((maxInt - delta) / handledCPCountPlusOne)) {
      throw $RangeError(OVERFLOW_ERROR);
    }
    delta += (m - n) * handledCPCountPlusOne;
    n = m;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw $RangeError(OVERFLOW_ERROR);
      }
      if (currentValue == n) {
        var q = delta;
        var k = base;
        while (true) {
          var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (q < t)
            break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          push$3(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor$1(qMinusT / baseMinusT);
          k += base;
        }
        push$3(output, fromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        handledCPCount++;
      }
    }
    delta++;
    n++;
  }
  return join$2(output, "");
};
var stringPunycodeToAscii = function(input) {
  var encoded = [];
  var labels = split$2(replace$2(toLowerCase$1(input), regexSeparators, "."), ".");
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    push$3(encoded, exec$1(regexNonASCII, label) ? "xn--" + encode(label) : label);
  }
  return join$2(encoded, ".");
};
var $$3 = _export;
var global$2 = global$_;
var call$1 = functionCall;
var uncurryThis$4 = functionUncurryThis;
var DESCRIPTORS$2 = descriptors;
var USE_NATIVE_URL$2 = urlConstructorDetection;
var defineBuiltIn$3 = defineBuiltIn$o;
var defineBuiltInAccessor$2 = defineBuiltInAccessor$h;
var defineBuiltIns = defineBuiltIns$5;
var setToStringTag$1 = setToStringTag$d;
var createIteratorConstructor = iteratorCreateConstructor;
var InternalStateModule$1 = internalState;
var anInstance$1 = anInstance$a;
var isCallable = isCallable$z;
var hasOwn$1 = hasOwnProperty_1;
var bind$1 = functionBindContext;
var classof = classof$m;
var anObject = anObject$D;
var isObject = isObject$z;
var $toString$1 = toString$C;
var create3 = objectCreate;
var createPropertyDescriptor = createPropertyDescriptor$c;
var getIterator = getIterator$4;
var getIteratorMethod = getIteratorMethod$5;
var validateArgumentsLength$4 = validateArgumentsLength$b;
var wellKnownSymbol = wellKnownSymbol$z;
var arraySort = arraySort$1;
var ITERATOR = wellKnownSymbol("iterator");
var URL_SEARCH_PARAMS = "URLSearchParams";
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + "Iterator";
var setInternalState$1 = InternalStateModule$1.set;
var getInternalParamsState = InternalStateModule$1.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule$1.getterFor(URL_SEARCH_PARAMS_ITERATOR);
var getOwnPropertyDescriptor6 = Object.getOwnPropertyDescriptor;
var safeGetBuiltIn = function(name) {
  if (!DESCRIPTORS$2)
    return global$2[name];
  var descriptor = getOwnPropertyDescriptor6(global$2, name);
  return descriptor && descriptor.value;
};
var nativeFetch = safeGetBuiltIn("fetch");
var NativeRequest = safeGetBuiltIn("Request");
var Headers = safeGetBuiltIn("Headers");
var RequestPrototype = NativeRequest && NativeRequest.prototype;
var HeadersPrototype = Headers && Headers.prototype;
var RegExp$1 = global$2.RegExp;
var TypeError$2 = global$2.TypeError;
var decodeURIComponent = global$2.decodeURIComponent;
var encodeURIComponent$1 = global$2.encodeURIComponent;
var charAt$1 = uncurryThis$4("".charAt);
var join$1 = uncurryThis$4([].join);
var push$2 = uncurryThis$4([].push);
var replace$1 = uncurryThis$4("".replace);
var shift$1 = uncurryThis$4([].shift);
var splice2 = uncurryThis$4([].splice);
var split$1 = uncurryThis$4("".split);
var stringSlice$1 = uncurryThis$4("".slice);
var plus = /\+/g;
var sequences = Array(4);
var percentSequence = function(bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp$1("((?:%[\\da-f]{2}){" + bytes + "})", "gi"));
};
var percentDecode = function(sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};
var deserialize$1 = function(it) {
  var result = replace$1(it, plus, " ");
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = replace$1(result, percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};
var find3 = /[!'()~]|%20/g;
var replacements = {
  "!": "%21",
  "'": "%27",
  "(": "%28",
  ")": "%29",
  "~": "%7E",
  "%20": "+"
};
var replacer = function(match2) {
  return replacements[match2];
};
var serialize$1 = function(it) {
  return replace$1(encodeURIComponent$1(it), find3, replacer);
};
var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params2, kind) {
  setInternalState$1(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params2).entries),
    kind
  });
}, "Iterator", function next3() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === "keys" ? entry.key : kind === "values" ? entry.value : [entry.key, entry.value];
  }
  return step;
}, true);
var URLSearchParamsState = function(init) {
  this.entries = [];
  this.url = null;
  if (init !== void 0) {
    if (isObject(init))
      this.parseObject(init);
    else
      this.parseQuery(typeof init == "string" ? charAt$1(init, 0) === "?" ? stringSlice$1(init, 1) : init : $toString$1(init));
  }
};
URLSearchParamsState.prototype = {
  type: URL_SEARCH_PARAMS,
  bindURL: function(url) {
    this.url = url;
    this.update();
  },
  parseObject: function(object) {
    var iteratorMethod = getIteratorMethod(object);
    var iterator, next4, step, entryIterator, entryNext, first, second;
    if (iteratorMethod) {
      iterator = getIterator(object, iteratorMethod);
      next4 = iterator.next;
      while (!(step = call$1(next4, iterator)).done) {
        entryIterator = getIterator(anObject(step.value));
        entryNext = entryIterator.next;
        if ((first = call$1(entryNext, entryIterator)).done || (second = call$1(entryNext, entryIterator)).done || !call$1(entryNext, entryIterator).done)
          throw TypeError$2("Expected sequence with length 2");
        push$2(this.entries, { key: $toString$1(first.value), value: $toString$1(second.value) });
      }
    } else
      for (var key in object)
        if (hasOwn$1(object, key)) {
          push$2(this.entries, { key, value: $toString$1(object[key]) });
        }
  },
  parseQuery: function(query) {
    if (query) {
      var attributes = split$1(query, "&");
      var index = 0;
      var attribute, entry;
      while (index < attributes.length) {
        attribute = attributes[index++];
        if (attribute.length) {
          entry = split$1(attribute, "=");
          push$2(this.entries, {
            key: deserialize$1(shift$1(entry)),
            value: deserialize$1(join$1(entry, "="))
          });
        }
      }
    }
  },
  serialize: function() {
    var entries4 = this.entries;
    var result = [];
    var index = 0;
    var entry;
    while (index < entries4.length) {
      entry = entries4[index++];
      push$2(result, serialize$1(entry.key) + "=" + serialize$1(entry.value));
    }
    return join$1(result, "&");
  },
  update: function() {
    this.entries.length = 0;
    this.parseQuery(this.url.query);
  },
  updateURL: function() {
    if (this.url)
      this.url.update();
  }
};
var URLSearchParamsConstructor = function URLSearchParams2() {
  anInstance$1(this, URLSearchParamsPrototype$3);
  var init = arguments.length > 0 ? arguments[0] : void 0;
  var state = setInternalState$1(this, new URLSearchParamsState(init));
  if (!DESCRIPTORS$2)
    this.size = state.entries.length;
};
var URLSearchParamsPrototype$3 = URLSearchParamsConstructor.prototype;
defineBuiltIns(URLSearchParamsPrototype$3, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    var state = getInternalParamsState(this);
    validateArgumentsLength$4(arguments.length, 2);
    push$2(state.entries, { key: $toString$1(name), value: $toString$1(value) });
    if (!DESCRIPTORS$2)
      this.length++;
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  "delete": function(name) {
    var state = getInternalParamsState(this);
    var length = validateArgumentsLength$4(arguments.length, 1);
    var entries4 = state.entries;
    var key = $toString$1(name);
    var $value = length < 2 ? void 0 : arguments[1];
    var value = $value === void 0 ? $value : $toString$1($value);
    var index = 0;
    while (index < entries4.length) {
      var entry = entries4[index];
      if (entry.key === key && (value === void 0 || entry.value === value)) {
        splice2(entries4, index, 1);
        if (value !== void 0)
          break;
      } else
        index++;
    }
    if (!DESCRIPTORS$2)
      this.size = entries4.length;
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get2(name) {
    var entries4 = getInternalParamsState(this).entries;
    validateArgumentsLength$4(arguments.length, 1);
    var key = $toString$1(name);
    var index = 0;
    for (; index < entries4.length; index++) {
      if (entries4[index].key === key)
        return entries4[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    var entries4 = getInternalParamsState(this).entries;
    validateArgumentsLength$4(arguments.length, 1);
    var key = $toString$1(name);
    var result = [];
    var index = 0;
    for (; index < entries4.length; index++) {
      if (entries4[index].key === key)
        push$2(result, entries4[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has3(name) {
    var entries4 = getInternalParamsState(this).entries;
    var length = validateArgumentsLength$4(arguments.length, 1);
    var key = $toString$1(name);
    var $value = length < 2 ? void 0 : arguments[1];
    var value = $value === void 0 ? $value : $toString$1($value);
    var index = 0;
    while (index < entries4.length) {
      var entry = entries4[index++];
      if (entry.key === key && (value === void 0 || entry.value === value))
        return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set3(name, value) {
    var state = getInternalParamsState(this);
    validateArgumentsLength$4(arguments.length, 1);
    var entries4 = state.entries;
    var found = false;
    var key = $toString$1(name);
    var val = $toString$1(value);
    var index = 0;
    var entry;
    for (; index < entries4.length; index++) {
      entry = entries4[index];
      if (entry.key === key) {
        if (found)
          splice2(entries4, index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found)
      push$2(entries4, { key, value: val });
    if (!DESCRIPTORS$2)
      this.size = entries4.length;
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort4() {
    var state = getInternalParamsState(this);
    arraySort(state.entries, function(a, b) {
      return a.key > b.key ? 1 : -1;
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach3(callback) {
    var entries4 = getInternalParamsState(this).entries;
    var boundFunction = bind$1(callback, arguments.length > 1 ? arguments[1] : void 0);
    var index = 0;
    var entry;
    while (index < entries4.length) {
      entry = entries4[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys4() {
    return new URLSearchParamsIterator(this, "keys");
  },
  // `URLSearchParams.prototype.values` method
  values: function values4() {
    return new URLSearchParamsIterator(this, "values");
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries3() {
    return new URLSearchParamsIterator(this, "entries");
  }
}, { enumerable: true });
defineBuiltIn$3(URLSearchParamsPrototype$3, ITERATOR, URLSearchParamsPrototype$3.entries, { name: "entries" });
defineBuiltIn$3(URLSearchParamsPrototype$3, "toString", function toString4() {
  return getInternalParamsState(this).serialize();
}, { enumerable: true });
if (DESCRIPTORS$2)
  defineBuiltInAccessor$2(URLSearchParamsPrototype$3, "size", {
    get: function size() {
      return getInternalParamsState(this).entries.length;
    },
    configurable: true,
    enumerable: true
  });
setToStringTag$1(URLSearchParamsConstructor, URL_SEARCH_PARAMS);
$$3({ global: true, constructor: true, forced: !USE_NATIVE_URL$2 }, {
  URLSearchParams: URLSearchParamsConstructor
});
if (!USE_NATIVE_URL$2 && isCallable(Headers)) {
  var headersHas = uncurryThis$4(HeadersPrototype.has);
  var headersSet = uncurryThis$4(HeadersPrototype.set);
  var wrapRequestOptions = function(init) {
    if (isObject(init)) {
      var body = init.body;
      var headers;
      if (classof(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers(init.headers) : new Headers();
        if (!headersHas(headers, "content-type")) {
          headersSet(headers, "content-type", "application/x-www-form-urlencoded;charset=UTF-8");
        }
        return create3(init, {
          body: createPropertyDescriptor(0, $toString$1(body)),
          headers: createPropertyDescriptor(0, headers)
        });
      }
    }
    return init;
  };
  if (isCallable(nativeFetch)) {
    $$3({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
      fetch: function fetch(input) {
        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      }
    });
  }
  if (isCallable(NativeRequest)) {
    var RequestConstructor = function Request(input) {
      anInstance$1(this, RequestPrototype);
      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
    };
    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;
    $$3({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
      Request: RequestConstructor
    });
  }
}
var web_urlSearchParams_constructor = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};
var $$2 = _export;
var DESCRIPTORS$1 = descriptors;
var USE_NATIVE_URL$1 = urlConstructorDetection;
var global$1 = global$_;
var bind2 = functionBindContext;
var uncurryThis$3 = functionUncurryThis;
var defineBuiltIn$2 = defineBuiltIn$o;
var defineBuiltInAccessor$1 = defineBuiltInAccessor$h;
var anInstance = anInstance$a;
var hasOwn2 = hasOwnProperty_1;
var assign2 = objectAssign;
var arrayFrom = arrayFrom$1;
var arraySlice = arraySliceSimple;
var codeAt = stringMultibyte.codeAt;
var toASCII = stringPunycodeToAscii;
var $toString = toString$C;
var setToStringTag = setToStringTag$d;
var validateArgumentsLength$3 = validateArgumentsLength$b;
var URLSearchParamsModule = web_urlSearchParams_constructor;
var InternalStateModule = internalState;
var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor("URL");
var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;
var NativeURL = global$1.URL;
var TypeError$1 = global$1.TypeError;
var parseInt$1 = global$1.parseInt;
var floor = Math.floor;
var pow = Math.pow;
var charAt = uncurryThis$3("".charAt);
var exec = uncurryThis$3(/./.exec);
var join3 = uncurryThis$3([].join);
var numberToString = uncurryThis$3(1 .toString);
var pop = uncurryThis$3([].pop);
var push$1 = uncurryThis$3([].push);
var replace = uncurryThis$3("".replace);
var shift = uncurryThis$3([].shift);
var split = uncurryThis$3("".split);
var stringSlice = uncurryThis$3("".slice);
var toLowerCase = uncurryThis$3("".toLowerCase);
var unshift2 = uncurryThis$3([].unshift);
var INVALID_AUTHORITY = "Invalid authority";
var INVALID_SCHEME = "Invalid scheme";
var INVALID_HOST = "Invalid host";
var INVALID_PORT = "Invalid port";
var ALPHA = /[a-z]/i;
var ALPHANUMERIC = /[\d+-.a-z]/i;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\da-f]+$/i;
var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+/;
var TRAILING_C0_CONTROL_OR_SPACE = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
var EOF;
var parseIPv4 = function(input) {
  var parts = split(input, ".");
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == "") {
    parts.length--;
  }
  partsLength = parts.length;
  if (partsLength > 4)
    return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == "")
      return input;
    radix = 10;
    if (part.length > 1 && charAt(part, 0) == "0") {
      radix = exec(HEX_START, part) ? 16 : 8;
      part = stringSlice(part, radix == 8 ? 1 : 2);
    }
    if (part === "") {
      number = 0;
    } else {
      if (!exec(radix == 10 ? DEC : radix == 8 ? OCT : HEX, part))
        return input;
      number = parseInt$1(part, radix);
    }
    push$1(numbers, number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength))
        return null;
    } else if (number > 255)
      return null;
  }
  ipv4 = pop(numbers);
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};
var parseIPv6 = function(input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;
  var chr = function() {
    return charAt(input, pointer);
  };
  if (chr() == ":") {
    if (charAt(input, 1) != ":")
      return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (chr()) {
    if (pieceIndex == 8)
      return;
    if (chr() == ":") {
      if (compress !== null)
        return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && exec(HEX, chr())) {
      value = value * 16 + parseInt$1(chr(), 16);
      pointer++;
      length++;
    }
    if (chr() == ".") {
      if (length == 0)
        return;
      pointer -= length;
      if (pieceIndex > 6)
        return;
      numbersSeen = 0;
      while (chr()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (chr() == "." && numbersSeen < 4)
            pointer++;
          else
            return;
        }
        if (!exec(DIGIT, chr()))
          return;
        while (exec(DIGIT, chr())) {
          number = parseInt$1(chr(), 10);
          if (ipv4Piece === null)
            ipv4Piece = number;
          else if (ipv4Piece == 0)
            return;
          else
            ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255)
            return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4)
          pieceIndex++;
      }
      if (numbersSeen != 4)
        return;
      break;
    } else if (chr() == ":") {
      pointer++;
      if (!chr())
        return;
    } else if (chr())
      return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8)
    return;
  return address;
};
var findLongestZeroSequence = function(ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null)
        currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};
var serializeHost = function(host) {
  var result, index, compress, ignore0;
  if (typeof host == "number") {
    result = [];
    for (index = 0; index < 4; index++) {
      unshift2(result, host % 256);
      host = floor(host / 256);
    }
    return join3(result, ".");
  } else if (typeof host == "object") {
    result = "";
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0)
        continue;
      if (ignore0)
        ignore0 = false;
      if (compress === index) {
        result += index ? ":" : "::";
        ignore0 = true;
      } else {
        result += numberToString(host[index], 16);
        if (index < 7)
          result += ":";
      }
    }
    return "[" + result + "]";
  }
  return host;
};
var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign2({}, C0ControlPercentEncodeSet, {
  " ": 1,
  '"': 1,
  "<": 1,
  ">": 1,
  "`": 1
});
var pathPercentEncodeSet = assign2({}, fragmentPercentEncodeSet, {
  "#": 1,
  "?": 1,
  "{": 1,
  "}": 1
});
var userinfoPercentEncodeSet = assign2({}, pathPercentEncodeSet, {
  "/": 1,
  ":": 1,
  ";": 1,
  "=": 1,
  "@": 1,
  "[": 1,
  "\\": 1,
  "]": 1,
  "^": 1,
  "|": 1
});
var percentEncode = function(chr, set4) {
  var code = codeAt(chr, 0);
  return code > 32 && code < 127 && !hasOwn2(set4, chr) ? chr : encodeURIComponent(chr);
};
var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};
var isWindowsDriveLetter = function(string, normalized) {
  var second;
  return string.length == 2 && exec(ALPHA, charAt(string, 0)) && ((second = charAt(string, 1)) == ":" || !normalized && second == "|");
};
var startsWithWindowsDriveLetter = function(string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (string.length == 2 || ((third = charAt(string, 2)) === "/" || third === "\\" || third === "?" || third === "#"));
};
var isSingleDot = function(segment) {
  return segment === "." || toLowerCase(segment) === "%2e";
};
var isDoubleDot = function(segment) {
  segment = toLowerCase(segment);
  return segment === ".." || segment === "%2e." || segment === ".%2e" || segment === "%2e%2e";
};
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};
var URLState = function(url, isBase, base2) {
  var urlString = $toString(url);
  var baseState, failure, searchParams;
  if (isBase) {
    failure = this.parse(urlString);
    if (failure)
      throw TypeError$1(failure);
    this.searchParams = null;
  } else {
    if (base2 !== void 0)
      baseState = new URLState(base2, true);
    failure = this.parse(urlString, null, baseState);
    if (failure)
      throw TypeError$1(failure);
    searchParams = getInternalSearchParamsState(new URLSearchParams$1());
    searchParams.bindURL(this);
    this.searchParams = searchParams;
  }
};
URLState.prototype = {
  type: "URL",
  // https://url.spec.whatwg.org/#url-parsing
  // eslint-disable-next-line max-statements -- TODO
  parse: function(input, stateOverride, base2) {
    var url = this;
    var state = stateOverride || SCHEME_START;
    var pointer = 0;
    var buffer = "";
    var seenAt = false;
    var seenBracket = false;
    var seenPasswordToken = false;
    var codePoints, chr, bufferCodePoints, failure;
    input = $toString(input);
    if (!stateOverride) {
      url.scheme = "";
      url.username = "";
      url.password = "";
      url.host = null;
      url.port = null;
      url.path = [];
      url.query = null;
      url.fragment = null;
      url.cannotBeABaseURL = false;
      input = replace(input, LEADING_C0_CONTROL_OR_SPACE, "");
      input = replace(input, TRAILING_C0_CONTROL_OR_SPACE, "$1");
    }
    input = replace(input, TAB_AND_NEW_LINE, "");
    codePoints = arrayFrom(input);
    while (pointer <= codePoints.length) {
      chr = codePoints[pointer];
      switch (state) {
        case SCHEME_START:
          if (chr && exec(ALPHA, chr)) {
            buffer += toLowerCase(chr);
            state = SCHEME;
          } else if (!stateOverride) {
            state = NO_SCHEME;
            continue;
          } else
            return INVALID_SCHEME;
          break;
        case SCHEME:
          if (chr && (exec(ALPHANUMERIC, chr) || chr == "+" || chr == "-" || chr == ".")) {
            buffer += toLowerCase(chr);
          } else if (chr == ":") {
            if (stateOverride && (url.isSpecial() != hasOwn2(specialSchemes, buffer) || buffer == "file" && (url.includesCredentials() || url.port !== null) || url.scheme == "file" && !url.host))
              return;
            url.scheme = buffer;
            if (stateOverride) {
              if (url.isSpecial() && specialSchemes[url.scheme] == url.port)
                url.port = null;
              return;
            }
            buffer = "";
            if (url.scheme == "file") {
              state = FILE;
            } else if (url.isSpecial() && base2 && base2.scheme == url.scheme) {
              state = SPECIAL_RELATIVE_OR_AUTHORITY;
            } else if (url.isSpecial()) {
              state = SPECIAL_AUTHORITY_SLASHES;
            } else if (codePoints[pointer + 1] == "/") {
              state = PATH_OR_AUTHORITY;
              pointer++;
            } else {
              url.cannotBeABaseURL = true;
              push$1(url.path, "");
              state = CANNOT_BE_A_BASE_URL_PATH;
            }
          } else if (!stateOverride) {
            buffer = "";
            state = NO_SCHEME;
            pointer = 0;
            continue;
          } else
            return INVALID_SCHEME;
          break;
        case NO_SCHEME:
          if (!base2 || base2.cannotBeABaseURL && chr != "#")
            return INVALID_SCHEME;
          if (base2.cannotBeABaseURL && chr == "#") {
            url.scheme = base2.scheme;
            url.path = arraySlice(base2.path);
            url.query = base2.query;
            url.fragment = "";
            url.cannotBeABaseURL = true;
            state = FRAGMENT;
            break;
          }
          state = base2.scheme == "file" ? FILE : RELATIVE;
          continue;
        case SPECIAL_RELATIVE_OR_AUTHORITY:
          if (chr == "/" && codePoints[pointer + 1] == "/") {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            pointer++;
          } else {
            state = RELATIVE;
            continue;
          }
          break;
        case PATH_OR_AUTHORITY:
          if (chr == "/") {
            state = AUTHORITY;
            break;
          } else {
            state = PATH;
            continue;
          }
        case RELATIVE:
          url.scheme = base2.scheme;
          if (chr == EOF) {
            url.username = base2.username;
            url.password = base2.password;
            url.host = base2.host;
            url.port = base2.port;
            url.path = arraySlice(base2.path);
            url.query = base2.query;
          } else if (chr == "/" || chr == "\\" && url.isSpecial()) {
            state = RELATIVE_SLASH;
          } else if (chr == "?") {
            url.username = base2.username;
            url.password = base2.password;
            url.host = base2.host;
            url.port = base2.port;
            url.path = arraySlice(base2.path);
            url.query = "";
            state = QUERY;
          } else if (chr == "#") {
            url.username = base2.username;
            url.password = base2.password;
            url.host = base2.host;
            url.port = base2.port;
            url.path = arraySlice(base2.path);
            url.query = base2.query;
            url.fragment = "";
            state = FRAGMENT;
          } else {
            url.username = base2.username;
            url.password = base2.password;
            url.host = base2.host;
            url.port = base2.port;
            url.path = arraySlice(base2.path);
            url.path.length--;
            state = PATH;
            continue;
          }
          break;
        case RELATIVE_SLASH:
          if (url.isSpecial() && (chr == "/" || chr == "\\")) {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          } else if (chr == "/") {
            state = AUTHORITY;
          } else {
            url.username = base2.username;
            url.password = base2.password;
            url.host = base2.host;
            url.port = base2.port;
            state = PATH;
            continue;
          }
          break;
        case SPECIAL_AUTHORITY_SLASHES:
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          if (chr != "/" || charAt(buffer, pointer + 1) != "/")
            continue;
          pointer++;
          break;
        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
          if (chr != "/" && chr != "\\") {
            state = AUTHORITY;
            continue;
          }
          break;
        case AUTHORITY:
          if (chr == "@") {
            if (seenAt)
              buffer = "%40" + buffer;
            seenAt = true;
            bufferCodePoints = arrayFrom(buffer);
            for (var i = 0; i < bufferCodePoints.length; i++) {
              var codePoint = bufferCodePoints[i];
              if (codePoint == ":" && !seenPasswordToken) {
                seenPasswordToken = true;
                continue;
              }
              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
              if (seenPasswordToken)
                url.password += encodedCodePoints;
              else
                url.username += encodedCodePoints;
            }
            buffer = "";
          } else if (chr == EOF || chr == "/" || chr == "?" || chr == "#" || chr == "\\" && url.isSpecial()) {
            if (seenAt && buffer == "")
              return INVALID_AUTHORITY;
            pointer -= arrayFrom(buffer).length + 1;
            buffer = "";
            state = HOST;
          } else
            buffer += chr;
          break;
        case HOST:
        case HOSTNAME:
          if (stateOverride && url.scheme == "file") {
            state = FILE_HOST;
            continue;
          } else if (chr == ":" && !seenBracket) {
            if (buffer == "")
              return INVALID_HOST;
            failure = url.parseHost(buffer);
            if (failure)
              return failure;
            buffer = "";
            state = PORT;
            if (stateOverride == HOSTNAME)
              return;
          } else if (chr == EOF || chr == "/" || chr == "?" || chr == "#" || chr == "\\" && url.isSpecial()) {
            if (url.isSpecial() && buffer == "")
              return INVALID_HOST;
            if (stateOverride && buffer == "" && (url.includesCredentials() || url.port !== null))
              return;
            failure = url.parseHost(buffer);
            if (failure)
              return failure;
            buffer = "";
            state = PATH_START;
            if (stateOverride)
              return;
            continue;
          } else {
            if (chr == "[")
              seenBracket = true;
            else if (chr == "]")
              seenBracket = false;
            buffer += chr;
          }
          break;
        case PORT:
          if (exec(DIGIT, chr)) {
            buffer += chr;
          } else if (chr == EOF || chr == "/" || chr == "?" || chr == "#" || chr == "\\" && url.isSpecial() || stateOverride) {
            if (buffer != "") {
              var port2 = parseInt$1(buffer, 10);
              if (port2 > 65535)
                return INVALID_PORT;
              url.port = url.isSpecial() && port2 === specialSchemes[url.scheme] ? null : port2;
              buffer = "";
            }
            if (stateOverride)
              return;
            state = PATH_START;
            continue;
          } else
            return INVALID_PORT;
          break;
        case FILE:
          url.scheme = "file";
          if (chr == "/" || chr == "\\")
            state = FILE_SLASH;
          else if (base2 && base2.scheme == "file") {
            if (chr == EOF) {
              url.host = base2.host;
              url.path = arraySlice(base2.path);
              url.query = base2.query;
            } else if (chr == "?") {
              url.host = base2.host;
              url.path = arraySlice(base2.path);
              url.query = "";
              state = QUERY;
            } else if (chr == "#") {
              url.host = base2.host;
              url.path = arraySlice(base2.path);
              url.query = base2.query;
              url.fragment = "";
              state = FRAGMENT;
            } else {
              if (!startsWithWindowsDriveLetter(join3(arraySlice(codePoints, pointer), ""))) {
                url.host = base2.host;
                url.path = arraySlice(base2.path);
                url.shortenPath();
              }
              state = PATH;
              continue;
            }
          } else {
            state = PATH;
            continue;
          }
          break;
        case FILE_SLASH:
          if (chr == "/" || chr == "\\") {
            state = FILE_HOST;
            break;
          }
          if (base2 && base2.scheme == "file" && !startsWithWindowsDriveLetter(join3(arraySlice(codePoints, pointer), ""))) {
            if (isWindowsDriveLetter(base2.path[0], true))
              push$1(url.path, base2.path[0]);
            else
              url.host = base2.host;
          }
          state = PATH;
          continue;
        case FILE_HOST:
          if (chr == EOF || chr == "/" || chr == "\\" || chr == "?" || chr == "#") {
            if (!stateOverride && isWindowsDriveLetter(buffer)) {
              state = PATH;
            } else if (buffer == "") {
              url.host = "";
              if (stateOverride)
                return;
              state = PATH_START;
            } else {
              failure = url.parseHost(buffer);
              if (failure)
                return failure;
              if (url.host == "localhost")
                url.host = "";
              if (stateOverride)
                return;
              buffer = "";
              state = PATH_START;
            }
            continue;
          } else
            buffer += chr;
          break;
        case PATH_START:
          if (url.isSpecial()) {
            state = PATH;
            if (chr != "/" && chr != "\\")
              continue;
          } else if (!stateOverride && chr == "?") {
            url.query = "";
            state = QUERY;
          } else if (!stateOverride && chr == "#") {
            url.fragment = "";
            state = FRAGMENT;
          } else if (chr != EOF) {
            state = PATH;
            if (chr != "/")
              continue;
          }
          break;
        case PATH:
          if (chr == EOF || chr == "/" || chr == "\\" && url.isSpecial() || !stateOverride && (chr == "?" || chr == "#")) {
            if (isDoubleDot(buffer)) {
              url.shortenPath();
              if (chr != "/" && !(chr == "\\" && url.isSpecial())) {
                push$1(url.path, "");
              }
            } else if (isSingleDot(buffer)) {
              if (chr != "/" && !(chr == "\\" && url.isSpecial())) {
                push$1(url.path, "");
              }
            } else {
              if (url.scheme == "file" && !url.path.length && isWindowsDriveLetter(buffer)) {
                if (url.host)
                  url.host = "";
                buffer = charAt(buffer, 0) + ":";
              }
              push$1(url.path, buffer);
            }
            buffer = "";
            if (url.scheme == "file" && (chr == EOF || chr == "?" || chr == "#")) {
              while (url.path.length > 1 && url.path[0] === "") {
                shift(url.path);
              }
            }
            if (chr == "?") {
              url.query = "";
              state = QUERY;
            } else if (chr == "#") {
              url.fragment = "";
              state = FRAGMENT;
            }
          } else {
            buffer += percentEncode(chr, pathPercentEncodeSet);
          }
          break;
        case CANNOT_BE_A_BASE_URL_PATH:
          if (chr == "?") {
            url.query = "";
            state = QUERY;
          } else if (chr == "#") {
            url.fragment = "";
            state = FRAGMENT;
          } else if (chr != EOF) {
            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
          }
          break;
        case QUERY:
          if (!stateOverride && chr == "#") {
            url.fragment = "";
            state = FRAGMENT;
          } else if (chr != EOF) {
            if (chr == "'" && url.isSpecial())
              url.query += "%27";
            else if (chr == "#")
              url.query += "%23";
            else
              url.query += percentEncode(chr, C0ControlPercentEncodeSet);
          }
          break;
        case FRAGMENT:
          if (chr != EOF)
            url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
          break;
      }
      pointer++;
    }
  },
  // https://url.spec.whatwg.org/#host-parsing
  parseHost: function(input) {
    var result, codePoints, index;
    if (charAt(input, 0) == "[") {
      if (charAt(input, input.length - 1) != "]")
        return INVALID_HOST;
      result = parseIPv6(stringSlice(input, 1, -1));
      if (!result)
        return INVALID_HOST;
      this.host = result;
    } else if (!this.isSpecial()) {
      if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input))
        return INVALID_HOST;
      result = "";
      codePoints = arrayFrom(input);
      for (index = 0; index < codePoints.length; index++) {
        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
      }
      this.host = result;
    } else {
      input = toASCII(input);
      if (exec(FORBIDDEN_HOST_CODE_POINT, input))
        return INVALID_HOST;
      result = parseIPv4(input);
      if (result === null)
        return INVALID_HOST;
      this.host = result;
    }
  },
  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
  cannotHaveUsernamePasswordPort: function() {
    return !this.host || this.cannotBeABaseURL || this.scheme == "file";
  },
  // https://url.spec.whatwg.org/#include-credentials
  includesCredentials: function() {
    return this.username != "" || this.password != "";
  },
  // https://url.spec.whatwg.org/#is-special
  isSpecial: function() {
    return hasOwn2(specialSchemes, this.scheme);
  },
  // https://url.spec.whatwg.org/#shorten-a-urls-path
  shortenPath: function() {
    var path2 = this.path;
    var pathSize = path2.length;
    if (pathSize && (this.scheme != "file" || pathSize != 1 || !isWindowsDriveLetter(path2[0], true))) {
      path2.length--;
    }
  },
  // https://url.spec.whatwg.org/#concept-url-serializer
  serialize: function() {
    var url = this;
    var scheme = url.scheme;
    var username = url.username;
    var password = url.password;
    var host = url.host;
    var port2 = url.port;
    var path2 = url.path;
    var query = url.query;
    var fragment = url.fragment;
    var output = scheme + ":";
    if (host !== null) {
      output += "//";
      if (url.includesCredentials()) {
        output += username + (password ? ":" + password : "") + "@";
      }
      output += serializeHost(host);
      if (port2 !== null)
        output += ":" + port2;
    } else if (scheme == "file")
      output += "//";
    output += url.cannotBeABaseURL ? path2[0] : path2.length ? "/" + join3(path2, "/") : "";
    if (query !== null)
      output += "?" + query;
    if (fragment !== null)
      output += "#" + fragment;
    return output;
  },
  // https://url.spec.whatwg.org/#dom-url-href
  setHref: function(href) {
    var failure = this.parse(href);
    if (failure)
      throw TypeError$1(failure);
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-origin
  getOrigin: function() {
    var scheme = this.scheme;
    var port2 = this.port;
    if (scheme == "blob")
      try {
        return new URLConstructor(scheme.path[0]).origin;
      } catch (error) {
        return "null";
      }
    if (scheme == "file" || !this.isSpecial())
      return "null";
    return scheme + "://" + serializeHost(this.host) + (port2 !== null ? ":" + port2 : "");
  },
  // https://url.spec.whatwg.org/#dom-url-protocol
  getProtocol: function() {
    return this.scheme + ":";
  },
  setProtocol: function(protocol) {
    this.parse($toString(protocol) + ":", SCHEME_START);
  },
  // https://url.spec.whatwg.org/#dom-url-username
  getUsername: function() {
    return this.username;
  },
  setUsername: function(username) {
    var codePoints = arrayFrom($toString(username));
    if (this.cannotHaveUsernamePasswordPort())
      return;
    this.username = "";
    for (var i = 0; i < codePoints.length; i++) {
      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-password
  getPassword: function() {
    return this.password;
  },
  setPassword: function(password) {
    var codePoints = arrayFrom($toString(password));
    if (this.cannotHaveUsernamePasswordPort())
      return;
    this.password = "";
    for (var i = 0; i < codePoints.length; i++) {
      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-host
  getHost: function() {
    var host = this.host;
    var port2 = this.port;
    return host === null ? "" : port2 === null ? serializeHost(host) : serializeHost(host) + ":" + port2;
  },
  setHost: function(host) {
    if (this.cannotBeABaseURL)
      return;
    this.parse(host, HOST);
  },
  // https://url.spec.whatwg.org/#dom-url-hostname
  getHostname: function() {
    var host = this.host;
    return host === null ? "" : serializeHost(host);
  },
  setHostname: function(hostname) {
    if (this.cannotBeABaseURL)
      return;
    this.parse(hostname, HOSTNAME);
  },
  // https://url.spec.whatwg.org/#dom-url-port
  getPort: function() {
    var port2 = this.port;
    return port2 === null ? "" : $toString(port2);
  },
  setPort: function(port2) {
    if (this.cannotHaveUsernamePasswordPort())
      return;
    port2 = $toString(port2);
    if (port2 == "")
      this.port = null;
    else
      this.parse(port2, PORT);
  },
  // https://url.spec.whatwg.org/#dom-url-pathname
  getPathname: function() {
    var path2 = this.path;
    return this.cannotBeABaseURL ? path2[0] : path2.length ? "/" + join3(path2, "/") : "";
  },
  setPathname: function(pathname) {
    if (this.cannotBeABaseURL)
      return;
    this.path = [];
    this.parse(pathname, PATH_START);
  },
  // https://url.spec.whatwg.org/#dom-url-search
  getSearch: function() {
    var query = this.query;
    return query ? "?" + query : "";
  },
  setSearch: function(search) {
    search = $toString(search);
    if (search == "") {
      this.query = null;
    } else {
      if ("?" == charAt(search, 0))
        search = stringSlice(search, 1);
      this.query = "";
      this.parse(search, QUERY);
    }
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-searchparams
  getSearchParams: function() {
    return this.searchParams.facade;
  },
  // https://url.spec.whatwg.org/#dom-url-hash
  getHash: function() {
    var fragment = this.fragment;
    return fragment ? "#" + fragment : "";
  },
  setHash: function(hash) {
    hash = $toString(hash);
    if (hash == "") {
      this.fragment = null;
      return;
    }
    if ("#" == charAt(hash, 0))
      hash = stringSlice(hash, 1);
    this.fragment = "";
    this.parse(hash, FRAGMENT);
  },
  update: function() {
    this.query = this.searchParams.serialize() || null;
  }
};
var URLConstructor = function URL2(url) {
  var that = anInstance(this, URLPrototype);
  var base2 = validateArgumentsLength$3(arguments.length, 1) > 1 ? arguments[1] : void 0;
  var state = setInternalState(that, new URLState(url, false, base2));
  if (!DESCRIPTORS$1) {
    that.href = state.serialize();
    that.origin = state.getOrigin();
    that.protocol = state.getProtocol();
    that.username = state.getUsername();
    that.password = state.getPassword();
    that.host = state.getHost();
    that.hostname = state.getHostname();
    that.port = state.getPort();
    that.pathname = state.getPathname();
    that.search = state.getSearch();
    that.searchParams = state.getSearchParams();
    that.hash = state.getHash();
  }
};
var URLPrototype = URLConstructor.prototype;
var accessorDescriptor = function(getter, setter) {
  return {
    get: function() {
      return getInternalURLState(this)[getter]();
    },
    set: setter && function(value) {
      return getInternalURLState(this)[setter](value);
    },
    configurable: true,
    enumerable: true
  };
};
if (DESCRIPTORS$1) {
  defineBuiltInAccessor$1(URLPrototype, "href", accessorDescriptor("serialize", "setHref"));
  defineBuiltInAccessor$1(URLPrototype, "origin", accessorDescriptor("getOrigin"));
  defineBuiltInAccessor$1(URLPrototype, "protocol", accessorDescriptor("getProtocol", "setProtocol"));
  defineBuiltInAccessor$1(URLPrototype, "username", accessorDescriptor("getUsername", "setUsername"));
  defineBuiltInAccessor$1(URLPrototype, "password", accessorDescriptor("getPassword", "setPassword"));
  defineBuiltInAccessor$1(URLPrototype, "host", accessorDescriptor("getHost", "setHost"));
  defineBuiltInAccessor$1(URLPrototype, "hostname", accessorDescriptor("getHostname", "setHostname"));
  defineBuiltInAccessor$1(URLPrototype, "port", accessorDescriptor("getPort", "setPort"));
  defineBuiltInAccessor$1(URLPrototype, "pathname", accessorDescriptor("getPathname", "setPathname"));
  defineBuiltInAccessor$1(URLPrototype, "search", accessorDescriptor("getSearch", "setSearch"));
  defineBuiltInAccessor$1(URLPrototype, "searchParams", accessorDescriptor("getSearchParams"));
  defineBuiltInAccessor$1(URLPrototype, "hash", accessorDescriptor("getHash", "setHash"));
}
defineBuiltIn$2(URLPrototype, "toJSON", function toJSON2() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });
defineBuiltIn$2(URLPrototype, "toString", function toString5() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });
if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  if (nativeCreateObjectURL)
    defineBuiltIn$2(URLConstructor, "createObjectURL", bind2(nativeCreateObjectURL, NativeURL));
  if (nativeRevokeObjectURL)
    defineBuiltIn$2(URLConstructor, "revokeObjectURL", bind2(nativeRevokeObjectURL, NativeURL));
}
setToStringTag(URLConstructor, "URL");
$$2({ global: true, constructor: true, forced: !USE_NATIVE_URL$1, sham: !DESCRIPTORS$1 }, {
  URL: URLConstructor
});
var $$1 = _export;
var getBuiltIn = getBuiltIn$n;
var fails = fails$1p;
var validateArgumentsLength$2 = validateArgumentsLength$b;
var toString$2 = toString$C;
var USE_NATIVE_URL = urlConstructorDetection;
var URL$1 = getBuiltIn("URL");
var THROWS_WITHOUT_ARGUMENTS = USE_NATIVE_URL && fails(function() {
  URL$1.canParse();
});
$$1({ target: "URL", stat: true, forced: !THROWS_WITHOUT_ARGUMENTS }, {
  canParse: function canParse(url) {
    var length = validateArgumentsLength$2(arguments.length, 1);
    var urlString = toString$2(url);
    var base2 = length < 2 || arguments[1] === void 0 ? void 0 : toString$2(arguments[1]);
    try {
      return !!new URL$1(urlString, base2);
    } catch (error) {
      return false;
    }
  }
});
var $ = _export;
var call = functionCall;
$({ target: "URL", proto: true, enumerable: true }, {
  toJSON: function toJSON3() {
    return call(URL.prototype.toString, this);
  }
});
var defineBuiltIn$1 = defineBuiltIn$o;
var uncurryThis$2 = functionUncurryThis;
var toString$1 = toString$C;
var validateArgumentsLength$1 = validateArgumentsLength$b;
var $URLSearchParams$1 = URLSearchParams;
var URLSearchParamsPrototype$2 = $URLSearchParams$1.prototype;
var append2 = uncurryThis$2(URLSearchParamsPrototype$2.append);
var $delete = uncurryThis$2(URLSearchParamsPrototype$2["delete"]);
var forEach$1 = uncurryThis$2(URLSearchParamsPrototype$2.forEach);
var push2 = uncurryThis$2([].push);
var params$1 = new $URLSearchParams$1("a=1&a=2");
params$1["delete"]("a", 1);
if (params$1 + "" !== "a=2") {
  defineBuiltIn$1(URLSearchParamsPrototype$2, "delete", function(name) {
    var length = arguments.length;
    var $value = length < 2 ? void 0 : arguments[1];
    if (length && $value === void 0)
      return $delete(this, name);
    var entries4 = [];
    forEach$1(this, function(v, k) {
      push2(entries4, { key: k, value: v });
    });
    validateArgumentsLength$1(length, 1);
    var key = toString$1(name);
    var value = toString$1($value);
    var index = 0;
    var dindex = 0;
    var found = false;
    var entriesLength = entries4.length;
    var entry;
    while (index < entriesLength) {
      entry = entries4[index++];
      if (found || entry.key === key) {
        found = true;
        $delete(this, entry.key);
      } else
        dindex++;
    }
    while (dindex < entriesLength) {
      entry = entries4[dindex++];
      if (!(entry.key === key && entry.value === value))
        append2(this, entry.key, entry.value);
    }
  }, { enumerable: true, unsafe: true });
}
var defineBuiltIn = defineBuiltIn$o;
var uncurryThis$1 = functionUncurryThis;
var toString6 = toString$C;
var validateArgumentsLength = validateArgumentsLength$b;
var $URLSearchParams = URLSearchParams;
var URLSearchParamsPrototype$1 = $URLSearchParams.prototype;
var getAll2 = uncurryThis$1(URLSearchParamsPrototype$1.getAll);
var $has = uncurryThis$1(URLSearchParamsPrototype$1.has);
var params = new $URLSearchParams("a=1");
if (params.has("a", 2)) {
  defineBuiltIn(URLSearchParamsPrototype$1, "has", function has4(name) {
    var length = arguments.length;
    var $value = length < 2 ? void 0 : arguments[1];
    if (length && $value === void 0)
      return $has(this, name);
    var values5 = getAll2(this, name);
    validateArgumentsLength(length, 1);
    var value = toString6($value);
    var index = 0;
    while (index < values5.length) {
      if (values5[index++] === value)
        return true;
    }
    return false;
  }, { enumerable: true, unsafe: true });
}
var DESCRIPTORS = descriptors;
var uncurryThis = functionUncurryThis;
var defineBuiltInAccessor = defineBuiltInAccessor$h;
var URLSearchParamsPrototype = URLSearchParams.prototype;
var forEach4 = uncurryThis(URLSearchParamsPrototype.forEach);
if (DESCRIPTORS && !("size" in URLSearchParamsPrototype)) {
  defineBuiltInAccessor(URLSearchParamsPrototype, "size", {
    get: function size2() {
      var count = 0;
      forEach4(this, function() {
        count++;
      });
      return count;
    },
    configurable: true,
    enumerable: true
  });
}
var runtime = { exports: {} };
(function(module) {
  var runtime2 = function(exports) {
    var Op = Object.prototype;
    var hasOwn3 = Op.hasOwnProperty;
    var defineProperty7 = Object.defineProperty || function(obj, key, desc) {
      obj[key] = desc.value;
    };
    var undefined$1;
    var $Symbol2 = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol2.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol2.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol2.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function(obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap2(innerFn, outerFn, self2, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      defineProperty7(generator, "_invoke", { value: makeInvokeMethod(innerFn, self2, context) });
      return generator;
    }
    exports.wrap = wrap2;
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    var ContinueSentinel = {};
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    var IteratorPrototype2 = {};
    define(IteratorPrototype2, iteratorSymbol, function() {
      return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values5([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn3.call(NativeIteratorPrototype, iteratorSymbol)) {
      IteratorPrototype2 = NativeIteratorPrototype;
    }
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype2);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    defineProperty7(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: true });
    defineProperty7(
      GeneratorFunctionPrototype,
      "constructor",
      { value: GeneratorFunction, configurable: true }
    );
    GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    );
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }
    exports.isGeneratorFunction = function(genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }
      genFun.prototype = Object.create(Gp);
      return genFun;
    };
    exports.awrap = function(arg) {
      return { __await: arg };
    };
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve2, reject2) {
        var record = tryCatch(generator[method], generator, arg);
        if (record.type === "throw") {
          reject2(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;
          if (value && typeof value === "object" && hasOwn3.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function(value2) {
              invoke("next", value2, resolve2, reject2);
            }, function(err) {
              invoke("throw", err, resolve2, reject2);
            });
          }
          return PromiseImpl.resolve(value).then(function(unwrapped) {
            result.value = unwrapped;
            resolve2(result);
          }, function(error) {
            return invoke("throw", error, resolve2, reject2);
          });
        }
      }
      var previousPromise;
      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve2, reject2) {
            invoke(method, arg, resolve2, reject2);
          });
        }
        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
      }
      defineProperty7(this, "_invoke", { value: enqueue });
    }
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
      return this;
    });
    exports.AsyncIterator = AsyncIterator;
    exports.async = function(innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0)
        PromiseImpl = Promise;
      var iter = new AsyncIterator(
        wrap2(innerFn, outerFn, self2, tryLocsList),
        PromiseImpl
      );
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
        return result.done ? result.value : iter.next();
      });
    };
    function makeInvokeMethod(innerFn, self2, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
          return doneResult();
        }
        context.method = method;
        context.arg = arg;
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel)
                continue;
              return delegateResult;
            }
          }
          if (context.method === "next") {
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }
            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }
          state = GenStateExecuting;
          var record = tryCatch(innerFn, self2, context);
          if (record.type === "normal") {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;
            if (record.arg === ContinueSentinel) {
              continue;
            }
            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method;
      var method = delegate.iterator[methodName];
      if (method === undefined$1) {
        context.delegate = null;
        if (methodName === "throw" && delegate.iterator["return"]) {
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);
          if (context.method === "throw") {
            return ContinueSentinel;
          }
        }
        if (methodName !== "return") {
          context.method = "throw";
          context.arg = new TypeError(
            "The iterator does not provide a '" + methodName + "' method"
          );
        }
        return ContinueSentinel;
      }
      var record = tryCatch(method, delegate.iterator, context.arg);
      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }
      var info = record.arg;
      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }
      if (info.done) {
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;
        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        return info;
      }
      context.delegate = null;
      return ContinueSentinel;
    }
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    define(Gp, iteratorSymbol, function() {
      return this;
    });
    define(Gp, "toString", function() {
      return "[object Generator]";
    });
    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
      this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
    exports.keys = function(val) {
      var object = Object(val);
      var keys5 = [];
      for (var key in object) {
        keys5.push(key);
      }
      keys5.reverse();
      return function next4() {
        while (keys5.length) {
          var key2 = keys5.pop();
          if (key2 in object) {
            next4.value = key2;
            next4.done = false;
            return next4;
          }
        }
        next4.done = true;
        return next4;
      };
    };
    function values5(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
        if (typeof iterable.next === "function") {
          return iterable;
        }
        if (!isNaN(iterable.length)) {
          var i = -1, next4 = function next5() {
            while (++i < iterable.length) {
              if (hasOwn3.call(iterable, i)) {
                next5.value = iterable[i];
                next5.done = false;
                return next5;
              }
            }
            next5.value = undefined$1;
            next5.done = true;
            return next5;
          };
          return next4.next = next4;
        }
      }
      return { next: doneResult };
    }
    exports.values = values5;
    function doneResult() {
      return { value: undefined$1, done: true };
    }
    Context.prototype = {
      constructor: Context,
      reset: function(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);
        if (!skipTempReset) {
          for (var name in this) {
            if (name.charAt(0) === "t" && hasOwn3.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
        return this.rval;
      },
      dispatchException: function(exception) {
        if (this.done) {
          throw exception;
        }
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
          if (caught) {
            context.method = "next";
            context.arg = undefined$1;
          }
          return !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
          if (entry.tryLoc === "root") {
            return handle("end");
          }
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn3.call(entry, "catchLoc");
            var hasFinally = hasOwn3.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn3.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          finallyEntry = null;
        }
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }
        return this.complete(record);
      },
      complete: function(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
        return ContinueSentinel;
      },
      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values5(iterable),
          resultName,
          nextLoc
        };
        if (this.method === "next") {
          this.arg = undefined$1;
        }
        return ContinueSentinel;
      }
    };
    return exports;
  }(
    // If this script is executing as a CommonJS module, use module.exports
    // as the regeneratorRuntime namespace. Otherwise create a new empty
    // object. Either way, the resulting object will be used to initialize
    // the regeneratorRuntime variable at the top of this file.
    module.exports
  );
  try {
    regeneratorRuntime = runtime2;
  } catch (accidentalStrictMode) {
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime2;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime2);
    }
  }
})(runtime);
const windowOption = {
  width: 850,
  height: 600,
  backgroundColor: "#1b1b1b",
  webPreferences: {
    nodeIntegration: true,
    webSecurity: false,
    contextIsolation: false
  },
  hasShadow: true,
  frame: false,
  resizable: true
};
var main$1 = {};
var server = {};
var objectsRegistry = {};
Object.defineProperty(objectsRegistry, "__esModule", { value: true });
const getOwnerKey = (webContents, contextId) => {
  return `${webContents.id}-${contextId}`;
};
class ObjectsRegistry {
  constructor() {
    this.nextId = 0;
    this.storage = {};
    this.owners = {};
    this.electronIds = /* @__PURE__ */ new WeakMap();
  }
  // Register a new object and return its assigned ID. If the object is already
  // registered then the already assigned ID would be returned.
  add(webContents, contextId, obj) {
    const id2 = this.saveToStorage(obj);
    const ownerKey = getOwnerKey(webContents, contextId);
    let owner = this.owners[ownerKey];
    if (!owner) {
      owner = this.owners[ownerKey] = /* @__PURE__ */ new Map();
      this.registerDeleteListener(webContents, contextId);
    }
    if (!owner.has(id2)) {
      owner.set(id2, 0);
      this.storage[id2].count++;
    }
    owner.set(id2, owner.get(id2) + 1);
    return id2;
  }
  // Get an object according to its ID.
  get(id2) {
    const pointer = this.storage[id2];
    if (pointer != null)
      return pointer.object;
  }
  // Dereference an object according to its ID.
  // Note that an object may be double-freed (cleared when page is reloaded, and
  // then garbage collected in old page).
  remove(webContents, contextId, id2) {
    const ownerKey = getOwnerKey(webContents, contextId);
    const owner = this.owners[ownerKey];
    if (owner && owner.has(id2)) {
      const newRefCount = owner.get(id2) - 1;
      if (newRefCount <= 0) {
        owner.delete(id2);
        this.dereference(id2);
      } else {
        owner.set(id2, newRefCount);
      }
    }
  }
  // Clear all references to objects refrenced by the WebContents.
  clear(webContents, contextId) {
    const ownerKey = getOwnerKey(webContents, contextId);
    const owner = this.owners[ownerKey];
    if (!owner)
      return;
    for (const id2 of owner.keys())
      this.dereference(id2);
    delete this.owners[ownerKey];
  }
  // Saves the object into storage and assigns an ID for it.
  saveToStorage(object) {
    let id2 = this.electronIds.get(object);
    if (!id2) {
      id2 = ++this.nextId;
      this.storage[id2] = {
        count: 0,
        object
      };
      this.electronIds.set(object, id2);
    }
    return id2;
  }
  // Dereference the object from store.
  dereference(id2) {
    const pointer = this.storage[id2];
    if (pointer == null) {
      return;
    }
    pointer.count -= 1;
    if (pointer.count === 0) {
      this.electronIds.delete(pointer.object);
      delete this.storage[id2];
    }
  }
  // Clear the storage when renderer process is destroyed.
  registerDeleteListener(webContents, contextId) {
    const processHostId = contextId.split("-")[0];
    const listener = (_, deletedProcessHostId) => {
      if (deletedProcessHostId && deletedProcessHostId.toString() === processHostId) {
        webContents.removeListener("render-view-deleted", listener);
        this.clear(webContents, contextId);
      }
    };
    webContents.on("render-view-deleted", listener);
  }
}
objectsRegistry.default = new ObjectsRegistry();
var typeUtils = {};
Object.defineProperty(typeUtils, "__esModule", { value: true });
typeUtils.deserialize = typeUtils.serialize = typeUtils.isSerializableObject = typeUtils.isPromise = void 0;
const electron_1 = require$$3;
function isPromise(val) {
  return val && val.then && val.then instanceof Function && val.constructor && val.constructor.reject && val.constructor.reject instanceof Function && val.constructor.resolve && val.constructor.resolve instanceof Function;
}
typeUtils.isPromise = isPromise;
const serializableTypes = [
  Boolean,
  Number,
  String,
  Date,
  Error,
  RegExp,
  ArrayBuffer
];
function isSerializableObject(value) {
  return value === null || ArrayBuffer.isView(value) || serializableTypes.some((type) => value instanceof type);
}
typeUtils.isSerializableObject = isSerializableObject;
const objectMap = function(source, mapper) {
  const sourceEntries = Object.entries(source);
  const targetEntries = sourceEntries.map(([key, val]) => [key, mapper(val)]);
  return Object.fromEntries(targetEntries);
};
function serializeNativeImage(image) {
  const representations = [];
  const scaleFactors = image.getScaleFactors();
  if (scaleFactors.length === 1) {
    const scaleFactor = scaleFactors[0];
    const size2 = image.getSize(scaleFactor);
    const buffer = image.toBitmap({ scaleFactor });
    representations.push({ scaleFactor, size: size2, buffer });
  } else {
    for (const scaleFactor of scaleFactors) {
      const size2 = image.getSize(scaleFactor);
      const dataURL = image.toDataURL({ scaleFactor });
      representations.push({ scaleFactor, size: size2, dataURL });
    }
  }
  return { __ELECTRON_SERIALIZED_NativeImage__: true, representations };
}
function deserializeNativeImage(value) {
  const image = electron_1.nativeImage.createEmpty();
  if (value.representations.length === 1) {
    const { buffer, size: size2, scaleFactor } = value.representations[0];
    const { width, height } = size2;
    image.addRepresentation({ buffer, scaleFactor, width, height });
  } else {
    for (const rep of value.representations) {
      const { dataURL, size: size2, scaleFactor } = rep;
      const { width, height } = size2;
      image.addRepresentation({ dataURL, scaleFactor, width, height });
    }
  }
  return image;
}
function serialize(value) {
  if (value && value.constructor && value.constructor.name === "NativeImage") {
    return serializeNativeImage(value);
  }
  if (Array.isArray(value)) {
    return value.map(serialize);
  } else if (isSerializableObject(value)) {
    return value;
  } else if (value instanceof Object) {
    return objectMap(value, serialize);
  } else {
    return value;
  }
}
typeUtils.serialize = serialize;
function deserialize(value) {
  if (value && value.__ELECTRON_SERIALIZED_NativeImage__) {
    return deserializeNativeImage(value);
  } else if (Array.isArray(value)) {
    return value.map(deserialize);
  } else if (isSerializableObject(value)) {
    return value;
  } else if (value instanceof Object) {
    return objectMap(value, deserialize);
  } else {
    return value;
  }
}
typeUtils.deserialize = deserialize;
var getElectronBinding$1 = {};
Object.defineProperty(getElectronBinding$1, "__esModule", { value: true });
getElectronBinding$1.getElectronBinding = void 0;
const getElectronBinding = (name) => {
  if (process._linkedBinding) {
    return process._linkedBinding("electron_common_" + name);
  } else if (process.electronBinding) {
    return process.electronBinding(name);
  } else {
    return null;
  }
};
getElectronBinding$1.getElectronBinding = getElectronBinding;
(function(exports) {
  var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.initialize = exports.enable = exports.isRemoteModuleEnabled = void 0;
  const events_1 = require$$0;
  const objects_registry_1 = __importDefault(objectsRegistry);
  const type_utils_1 = typeUtils;
  const electron_12 = require$$3;
  const get_electron_binding_1 = getElectronBinding$1;
  const { Promise: Promise2 } = commonjsGlobal;
  const v8Util = get_electron_binding_1.getElectronBinding("v8_util");
  const hasWebPrefsRemoteModuleAPI = (() => {
    var _a, _b;
    const electronVersion = Number((_b = (_a = process.versions.electron) === null || _a === void 0 ? void 0 : _a.split(".")) === null || _b === void 0 ? void 0 : _b[0]);
    return Number.isNaN(electronVersion) || electronVersion < 14;
  })();
  const FUNCTION_PROPERTIES = [
    "length",
    "name",
    "arguments",
    "caller",
    "prototype"
  ];
  const rendererFunctionCache = /* @__PURE__ */ new Map();
  const finalizationRegistry = new FinalizationRegistry((fi) => {
    const mapKey = fi.id[0] + "~" + fi.id[1];
    const ref = rendererFunctionCache.get(mapKey);
    if (ref !== void 0 && ref.deref() === void 0) {
      rendererFunctionCache.delete(mapKey);
      if (!fi.webContents.isDestroyed()) {
        try {
          fi.webContents.sendToFrame(fi.frameId, "REMOTE_RENDERER_RELEASE_CALLBACK", fi.id[0], fi.id[1]);
        } catch (error) {
          console.warn(`sendToFrame() failed: ${error}`);
        }
      }
    }
  });
  function getCachedRendererFunction(id2) {
    const mapKey = id2[0] + "~" + id2[1];
    const ref = rendererFunctionCache.get(mapKey);
    if (ref !== void 0) {
      const deref = ref.deref();
      if (deref !== void 0)
        return deref;
    }
  }
  function setCachedRendererFunction(id2, wc, frameId, value) {
    const wr = new WeakRef(value);
    const mapKey = id2[0] + "~" + id2[1];
    rendererFunctionCache.set(mapKey, wr);
    finalizationRegistry.register(value, {
      id: id2,
      webContents: wc,
      frameId
    });
    return value;
  }
  const locationInfo = /* @__PURE__ */ new WeakMap();
  const getObjectMembers = function(object) {
    let names = Object.getOwnPropertyNames(object);
    if (typeof object === "function") {
      names = names.filter((name) => {
        return !FUNCTION_PROPERTIES.includes(name);
      });
    }
    return names.map((name) => {
      const descriptor = Object.getOwnPropertyDescriptor(object, name);
      let type;
      let writable = false;
      if (descriptor.get === void 0 && typeof object[name] === "function") {
        type = "method";
      } else {
        if (descriptor.set || descriptor.writable)
          writable = true;
        type = "get";
      }
      return { name, enumerable: descriptor.enumerable, writable, type };
    });
  };
  const getObjectPrototype = function(object) {
    const proto = Object.getPrototypeOf(object);
    if (proto === null || proto === Object.prototype)
      return null;
    return {
      members: getObjectMembers(proto),
      proto: getObjectPrototype(proto)
    };
  };
  const valueToMeta = function(sender, contextId, value, optimizeSimpleObject = false) {
    let type;
    switch (typeof value) {
      case "object":
        if (value instanceof Buffer) {
          type = "buffer";
        } else if (value && value.constructor && value.constructor.name === "NativeImage") {
          type = "nativeimage";
        } else if (Array.isArray(value)) {
          type = "array";
        } else if (value instanceof Error) {
          type = "error";
        } else if (type_utils_1.isSerializableObject(value)) {
          type = "value";
        } else if (type_utils_1.isPromise(value)) {
          type = "promise";
        } else if (Object.prototype.hasOwnProperty.call(value, "callee") && value.length != null) {
          type = "array";
        } else if (optimizeSimpleObject && v8Util.getHiddenValue(value, "simple")) {
          type = "value";
        } else {
          type = "object";
        }
        break;
      case "function":
        type = "function";
        break;
      default:
        type = "value";
        break;
    }
    if (type === "array") {
      return {
        type,
        members: value.map((el) => valueToMeta(sender, contextId, el, optimizeSimpleObject))
      };
    } else if (type === "nativeimage") {
      return { type, value: type_utils_1.serialize(value) };
    } else if (type === "object" || type === "function") {
      return {
        type,
        name: value.constructor ? value.constructor.name : "",
        // Reference the original value if it's an object, because when it's
        // passed to renderer we would assume the renderer keeps a reference of
        // it.
        id: objects_registry_1.default.add(sender, contextId, value),
        members: getObjectMembers(value),
        proto: getObjectPrototype(value)
      };
    } else if (type === "buffer") {
      return { type, value };
    } else if (type === "promise") {
      value.then(function() {
      }, function() {
      });
      return {
        type,
        then: valueToMeta(sender, contextId, function(onFulfilled, onRejected) {
          value.then(onFulfilled, onRejected);
        })
      };
    } else if (type === "error") {
      return {
        type,
        value,
        members: Object.keys(value).map((name) => ({
          name,
          value: valueToMeta(sender, contextId, value[name])
        }))
      };
    } else {
      return {
        type: "value",
        value
      };
    }
  };
  const throwRPCError = function(message) {
    const error = new Error(message);
    error.code = "EBADRPC";
    error.errno = -72;
    throw error;
  };
  const removeRemoteListenersAndLogWarning = (sender, callIntoRenderer) => {
    const location = locationInfo.get(callIntoRenderer);
    let message = `Attempting to call a function in a renderer window that has been closed or released.
Function provided here: ${location}`;
    if (sender instanceof events_1.EventEmitter) {
      const remoteEvents = sender.eventNames().filter((eventName) => {
        return sender.listeners(eventName).includes(callIntoRenderer);
      });
      if (remoteEvents.length > 0) {
        message += `
Remote event names: ${remoteEvents.join(", ")}`;
        remoteEvents.forEach((eventName) => {
          sender.removeListener(eventName, callIntoRenderer);
        });
      }
    }
    console.warn(message);
  };
  const fakeConstructor = (constructor, name) => new Proxy(Object, {
    get(target, prop, receiver) {
      if (prop === "name") {
        return name;
      } else {
        return Reflect.get(target, prop, receiver);
      }
    }
  });
  const unwrapArgs = function(sender, frameId, contextId, args) {
    const metaToValue = function(meta2) {
      switch (meta2.type) {
        case "nativeimage":
          return type_utils_1.deserialize(meta2.value);
        case "value":
          return meta2.value;
        case "remote-object":
          return objects_registry_1.default.get(meta2.id);
        case "array":
          return unwrapArgs(sender, frameId, contextId, meta2.value);
        case "buffer":
          return Buffer.from(meta2.value.buffer, meta2.value.byteOffset, meta2.value.byteLength);
        case "promise":
          return Promise2.resolve({
            then: metaToValue(meta2.then)
          });
        case "object": {
          const ret = meta2.name !== "Object" ? /* @__PURE__ */ Object.create({
            constructor: fakeConstructor(Object, meta2.name)
          }) : {};
          for (const { name, value } of meta2.members) {
            ret[name] = metaToValue(value);
          }
          return ret;
        }
        case "function-with-return-value": {
          const returnValue = metaToValue(meta2.value);
          return function() {
            return returnValue;
          };
        }
        case "function": {
          const objectId = [contextId, meta2.id];
          const cachedFunction = getCachedRendererFunction(objectId);
          if (cachedFunction !== void 0) {
            return cachedFunction;
          }
          const callIntoRenderer = function(...args2) {
            let succeed = false;
            if (!sender.isDestroyed()) {
              try {
                succeed = sender.sendToFrame(frameId, "REMOTE_RENDERER_CALLBACK", contextId, meta2.id, valueToMeta(sender, contextId, args2)) !== false;
              } catch (error) {
                console.warn(`sendToFrame() failed: ${error}`);
              }
            }
            if (!succeed) {
              removeRemoteListenersAndLogWarning(this, callIntoRenderer);
            }
          };
          locationInfo.set(callIntoRenderer, meta2.location);
          Object.defineProperty(callIntoRenderer, "length", { value: meta2.length });
          setCachedRendererFunction(objectId, sender, frameId, callIntoRenderer);
          return callIntoRenderer;
        }
        default:
          throw new TypeError(`Unknown type: ${meta2.type}`);
      }
    };
    return args.map(metaToValue);
  };
  const isRemoteModuleEnabledImpl = function(contents) {
    const webPreferences = contents.getLastWebPreferences() || {};
    return webPreferences.enableRemoteModule != null ? !!webPreferences.enableRemoteModule : false;
  };
  const isRemoteModuleEnabledCache = /* @__PURE__ */ new WeakMap();
  const isRemoteModuleEnabled = function(contents) {
    if (hasWebPrefsRemoteModuleAPI && !isRemoteModuleEnabledCache.has(contents)) {
      isRemoteModuleEnabledCache.set(contents, isRemoteModuleEnabledImpl(contents));
    }
    return isRemoteModuleEnabledCache.get(contents);
  };
  exports.isRemoteModuleEnabled = isRemoteModuleEnabled;
  function enable2(contents) {
    isRemoteModuleEnabledCache.set(contents, true);
  }
  exports.enable = enable2;
  const handleRemoteCommand = function(channel2, handler) {
    electron_12.ipcMain.on(channel2, (event, contextId, ...args) => {
      let returnValue;
      if (!exports.isRemoteModuleEnabled(event.sender)) {
        event.returnValue = {
          type: "exception",
          value: valueToMeta(event.sender, contextId, new Error('@electron/remote is disabled for this WebContents. Call require("@electron/remote/main").enable(webContents) to enable it.'))
        };
        return;
      }
      try {
        returnValue = handler(event, contextId, ...args);
      } catch (error) {
        returnValue = {
          type: "exception",
          value: valueToMeta(event.sender, contextId, error)
        };
      }
      if (returnValue !== void 0) {
        event.returnValue = returnValue;
      }
    });
  };
  const emitCustomEvent = function(contents, eventName, ...args) {
    const event = { sender: contents, returnValue: void 0, defaultPrevented: false };
    electron_12.app.emit(eventName, event, contents, ...args);
    contents.emit(eventName, event, ...args);
    return event;
  };
  const logStack = function(contents, code, stack) {
    if (stack) {
      console.warn(`WebContents (${contents.id}): ${code}`, stack);
    }
  };
  let initialized = false;
  function initialize() {
    if (initialized)
      throw new Error("@electron/remote has already been initialized");
    initialized = true;
    handleRemoteCommand("REMOTE_BROWSER_WRONG_CONTEXT_ERROR", function(event, contextId, passedContextId, id2) {
      const objectId = [passedContextId, id2];
      const cachedFunction = getCachedRendererFunction(objectId);
      if (cachedFunction === void 0) {
        return;
      }
      removeRemoteListenersAndLogWarning(event.sender, cachedFunction);
    });
    handleRemoteCommand("REMOTE_BROWSER_REQUIRE", function(event, contextId, moduleName, stack) {
      logStack(event.sender, `remote.require('${moduleName}')`, stack);
      const customEvent = emitCustomEvent(event.sender, "remote-require", moduleName);
      if (customEvent.returnValue === void 0) {
        if (customEvent.defaultPrevented) {
          throw new Error(`Blocked remote.require('${moduleName}')`);
        } else {
          customEvent.returnValue = process.mainModule.require(moduleName);
        }
      }
      return valueToMeta(event.sender, contextId, customEvent.returnValue);
    });
    handleRemoteCommand("REMOTE_BROWSER_GET_BUILTIN", function(event, contextId, moduleName, stack) {
      logStack(event.sender, `remote.getBuiltin('${moduleName}')`, stack);
      const customEvent = emitCustomEvent(event.sender, "remote-get-builtin", moduleName);
      if (customEvent.returnValue === void 0) {
        if (customEvent.defaultPrevented) {
          throw new Error(`Blocked remote.getBuiltin('${moduleName}')`);
        } else {
          customEvent.returnValue = require$$3[moduleName];
        }
      }
      return valueToMeta(event.sender, contextId, customEvent.returnValue);
    });
    handleRemoteCommand("REMOTE_BROWSER_GET_GLOBAL", function(event, contextId, globalName, stack) {
      logStack(event.sender, `remote.getGlobal('${globalName}')`, stack);
      const customEvent = emitCustomEvent(event.sender, "remote-get-global", globalName);
      if (customEvent.returnValue === void 0) {
        if (customEvent.defaultPrevented) {
          throw new Error(`Blocked remote.getGlobal('${globalName}')`);
        } else {
          customEvent.returnValue = commonjsGlobal[globalName];
        }
      }
      return valueToMeta(event.sender, contextId, customEvent.returnValue);
    });
    handleRemoteCommand("REMOTE_BROWSER_GET_CURRENT_WINDOW", function(event, contextId, stack) {
      logStack(event.sender, "remote.getCurrentWindow()", stack);
      const customEvent = emitCustomEvent(event.sender, "remote-get-current-window");
      if (customEvent.returnValue === void 0) {
        if (customEvent.defaultPrevented) {
          throw new Error("Blocked remote.getCurrentWindow()");
        } else {
          customEvent.returnValue = event.sender.getOwnerBrowserWindow();
        }
      }
      return valueToMeta(event.sender, contextId, customEvent.returnValue);
    });
    handleRemoteCommand("REMOTE_BROWSER_GET_CURRENT_WEB_CONTENTS", function(event, contextId, stack) {
      logStack(event.sender, "remote.getCurrentWebContents()", stack);
      const customEvent = emitCustomEvent(event.sender, "remote-get-current-web-contents");
      if (customEvent.returnValue === void 0) {
        if (customEvent.defaultPrevented) {
          throw new Error("Blocked remote.getCurrentWebContents()");
        } else {
          customEvent.returnValue = event.sender;
        }
      }
      return valueToMeta(event.sender, contextId, customEvent.returnValue);
    });
    handleRemoteCommand("REMOTE_BROWSER_CONSTRUCTOR", function(event, contextId, id2, args) {
      args = unwrapArgs(event.sender, event.frameId, contextId, args);
      const constructor = objects_registry_1.default.get(id2);
      if (constructor == null) {
        throwRPCError(`Cannot call constructor on missing remote object ${id2}`);
      }
      return valueToMeta(event.sender, contextId, new constructor(...args));
    });
    handleRemoteCommand("REMOTE_BROWSER_FUNCTION_CALL", function(event, contextId, id2, args) {
      args = unwrapArgs(event.sender, event.frameId, contextId, args);
      const func = objects_registry_1.default.get(id2);
      if (func == null) {
        throwRPCError(`Cannot call function on missing remote object ${id2}`);
      }
      try {
        return valueToMeta(event.sender, contextId, func(...args), true);
      } catch (error) {
        const err = new Error(`Could not call remote function '${func.name || "anonymous"}'. Check that the function signature is correct. Underlying error: ${error}
` + (error instanceof Error ? `Underlying stack: ${error.stack}
` : ""));
        err.cause = error;
        throw err;
      }
    });
    handleRemoteCommand("REMOTE_BROWSER_MEMBER_CONSTRUCTOR", function(event, contextId, id2, method, args) {
      args = unwrapArgs(event.sender, event.frameId, contextId, args);
      const object = objects_registry_1.default.get(id2);
      if (object == null) {
        throwRPCError(`Cannot call constructor '${method}' on missing remote object ${id2}`);
      }
      return valueToMeta(event.sender, contextId, new object[method](...args));
    });
    handleRemoteCommand("REMOTE_BROWSER_MEMBER_CALL", function(event, contextId, id2, method, args) {
      args = unwrapArgs(event.sender, event.frameId, contextId, args);
      const object = objects_registry_1.default.get(id2);
      if (object == null) {
        throwRPCError(`Cannot call method '${method}' on missing remote object ${id2}`);
      }
      try {
        return valueToMeta(event.sender, contextId, object[method](...args), true);
      } catch (error) {
        const err = new Error(`Could not call remote method '${method}'. Check that the method signature is correct. Underlying error: ${error}` + (error instanceof Error ? `Underlying stack: ${error.stack}
` : ""));
        err.cause = error;
        throw err;
      }
    });
    handleRemoteCommand("REMOTE_BROWSER_MEMBER_SET", function(event, contextId, id2, name, args) {
      args = unwrapArgs(event.sender, event.frameId, contextId, args);
      const obj = objects_registry_1.default.get(id2);
      if (obj == null) {
        throwRPCError(`Cannot set property '${name}' on missing remote object ${id2}`);
      }
      obj[name] = args[0];
      return null;
    });
    handleRemoteCommand("REMOTE_BROWSER_MEMBER_GET", function(event, contextId, id2, name) {
      const obj = objects_registry_1.default.get(id2);
      if (obj == null) {
        throwRPCError(`Cannot get property '${name}' on missing remote object ${id2}`);
      }
      return valueToMeta(event.sender, contextId, obj[name]);
    });
    handleRemoteCommand("REMOTE_BROWSER_DEREFERENCE", function(event, contextId, id2) {
      objects_registry_1.default.remove(event.sender, contextId, id2);
    });
    handleRemoteCommand("REMOTE_BROWSER_CONTEXT_RELEASE", (event, contextId) => {
      objects_registry_1.default.clear(event.sender, contextId);
      return null;
    });
  }
  exports.initialize = initialize;
})(server);
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.enable = exports.initialize = void 0;
  var server_1 = server;
  Object.defineProperty(exports, "initialize", { enumerable: true, get: function() {
    return server_1.initialize;
  } });
  Object.defineProperty(exports, "enable", { enumerable: true, get: function() {
    return server_1.enable;
  } });
})(main$1);
var main = main$1;
main.initialize();
require$$3.app.commandLine.appendSwitch("disable-features", "OutOfBlinkCors");
require$$3.app.commandLine.appendSwitch("disable-site-isolation-trials");
require$$3.app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
require$$3.app.commandLine.appendSwitch("enable-blink-features", "WebCodecs");
let win;
const isDev = !require$$3.app.isPackaged;
const createWindow = async () => {
  win = new require$$3.BrowserWindow({
    ...windowOption
  });
  if (isDev) {
    win.webContents.once("dom-ready", () => {
      win.webContents.openDevTools();
    });
  }
  main.enable(win.webContents);
  if (isDev && process.env["ELECTRON_RENDERER_URL"]) {
    win.loadURL(process.env["ELECTRON_RENDERER_URL"] + "/app/src/index.html");
  } else {
    win.loadFile(path$3.join(__dirname, "../renderer/index.html"));
  }
  win.on("closed", () => {
    win = null;
  });
};
require$$3.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    require$$3.app.quit();
  }
});
require$$3.app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
require$$3.app.on("browser-window-created", (_, window2) => {
  main.enable(window2.webContents);
});
const gotTheLock = require$$3.app.requestSingleInstanceLock();
if (!gotTheLock) {
  require$$3.app.quit();
} else {
  require$$3.app.on("second-instance", () => {
    if (win) {
      if (win.isMinimized())
        win.restore();
      win.focus();
    }
  });
  require$$3.app.on("ready", createWindow);
}
