import We, { useState as F, useEffect as hr } from "react";
var de = { exports: {} }, z = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Le;
function br() {
  if (Le) return z;
  Le = 1;
  var c = We, i = Symbol.for("react.element"), d = Symbol.for("react.fragment"), k = Object.prototype.hasOwnProperty, j = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, y = { key: !0, ref: !0, __self: !0, __source: !0 };
  function _(x, p, C) {
    var g, E = {}, T = null, S = null;
    C !== void 0 && (T = "" + C), p.key !== void 0 && (T = "" + p.key), p.ref !== void 0 && (S = p.ref);
    for (g in p) k.call(p, g) && !y.hasOwnProperty(g) && (E[g] = p[g]);
    if (x && x.defaultProps) for (g in p = x.defaultProps, p) E[g] === void 0 && (E[g] = p[g]);
    return { $$typeof: i, type: x, key: T, ref: S, props: E, _owner: j.current };
  }
  return z.Fragment = d, z.jsx = _, z.jsxs = _, z;
}
var B = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Me;
function kr() {
  return Me || (Me = 1, process.env.NODE_ENV !== "production" && function() {
    var c = We, i = Symbol.for("react.element"), d = Symbol.for("react.portal"), k = Symbol.for("react.fragment"), j = Symbol.for("react.strict_mode"), y = Symbol.for("react.profiler"), _ = Symbol.for("react.provider"), x = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), C = Symbol.for("react.suspense"), g = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), P = Symbol.iterator, I = "@@iterator";
    function $(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = P && e[P] || e[I];
      return typeof r == "function" ? r : null;
    }
    var R = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function m(e) {
      {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
          n[a - 1] = arguments[a];
        H("error", e, n);
      }
    }
    function H(e, r, n) {
      {
        var a = R.ReactDebugCurrentFrame, l = a.getStackAddendum();
        l !== "" && (r += "%s", n = n.concat([l]));
        var u = n.map(function(o) {
          return String(o);
        });
        u.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, u);
      }
    }
    var X = !1, Q = !1, Y = !1, ee = !1, L = !1, O;
    O = Symbol.for("react.module.reference");
    function Ve(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === k || e === y || L || e === j || e === C || e === g || ee || e === S || X || Q || Y || typeof e == "object" && e !== null && (e.$$typeof === T || e.$$typeof === E || e.$$typeof === _ || e.$$typeof === x || e.$$typeof === p || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === O || e.getModuleId !== void 0));
    }
    function Ue(e, r, n) {
      var a = e.displayName;
      if (a)
        return a;
      var l = r.displayName || r.name || "";
      return l !== "" ? n + "(" + l + ")" : n;
    }
    function ve(e) {
      return e.displayName || "Context";
    }
    function N(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && m("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case k:
          return "Fragment";
        case d:
          return "Portal";
        case y:
          return "Profiler";
        case j:
          return "StrictMode";
        case C:
          return "Suspense";
        case g:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case x:
            var r = e;
            return ve(r) + ".Consumer";
          case _:
            var n = e;
            return ve(n._context) + ".Provider";
          case p:
            return Ue(e, e.render, "ForwardRef");
          case E:
            var a = e.displayName || null;
            return a !== null ? a : N(e.type) || "Memo";
          case T: {
            var l = e, u = l._payload, o = l._init;
            try {
              return N(o(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var A = Object.assign, V = 0, pe, ge, me, he, be, ke, ye;
    function we() {
    }
    we.__reactDisabledLog = !0;
    function ze() {
      {
        if (V === 0) {
          pe = console.log, ge = console.info, me = console.warn, he = console.error, be = console.group, ke = console.groupCollapsed, ye = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: we,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        V++;
      }
    }
    function Be() {
      {
        if (V--, V === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: A({}, e, {
              value: pe
            }),
            info: A({}, e, {
              value: ge
            }),
            warn: A({}, e, {
              value: me
            }),
            error: A({}, e, {
              value: he
            }),
            group: A({}, e, {
              value: be
            }),
            groupCollapsed: A({}, e, {
              value: ke
            }),
            groupEnd: A({}, e, {
              value: ye
            })
          });
        }
        V < 0 && m("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var re = R.ReactCurrentDispatcher, ne;
    function J(e, r, n) {
      {
        if (ne === void 0)
          try {
            throw Error();
          } catch (l) {
            var a = l.stack.trim().match(/\n( *(at )?)/);
            ne = a && a[1] || "";
          }
        return `
` + ne + e;
      }
    }
    var te = !1, G;
    {
      var Je = typeof WeakMap == "function" ? WeakMap : Map;
      G = new Je();
    }
    function _e(e, r) {
      if (!e || te)
        return "";
      {
        var n = G.get(e);
        if (n !== void 0)
          return n;
      }
      var a;
      te = !0;
      var l = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = re.current, re.current = null, ze();
      try {
        if (r) {
          var o = function() {
            throw Error();
          };
          if (Object.defineProperty(o.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(o, []);
            } catch (b) {
              a = b;
            }
            Reflect.construct(e, [], o);
          } else {
            try {
              o.call();
            } catch (b) {
              a = b;
            }
            e.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (b) {
            a = b;
          }
          e();
        }
      } catch (b) {
        if (b && a && typeof b.stack == "string") {
          for (var s = b.stack.split(`
`), h = a.stack.split(`
`), f = s.length - 1, v = h.length - 1; f >= 1 && v >= 0 && s[f] !== h[v]; )
            v--;
          for (; f >= 1 && v >= 0; f--, v--)
            if (s[f] !== h[v]) {
              if (f !== 1 || v !== 1)
                do
                  if (f--, v--, v < 0 || s[f] !== h[v]) {
                    var w = `
` + s[f].replace(" at new ", " at ");
                    return e.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", e.displayName)), typeof e == "function" && G.set(e, w), w;
                  }
                while (f >= 1 && v >= 0);
              break;
            }
        }
      } finally {
        te = !1, re.current = u, Be(), Error.prepareStackTrace = l;
      }
      var W = e ? e.displayName || e.name : "", D = W ? J(W) : "";
      return typeof e == "function" && G.set(e, D), D;
    }
    function Ge(e, r, n) {
      return _e(e, !1);
    }
    function qe(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function q(e, r, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return _e(e, qe(e));
      if (typeof e == "string")
        return J(e);
      switch (e) {
        case C:
          return J("Suspense");
        case g:
          return J("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case p:
            return Ge(e.render);
          case E:
            return q(e.type, r, n);
          case T: {
            var a = e, l = a._payload, u = a._init;
            try {
              return q(u(l), r, n);
            } catch {
            }
          }
        }
      return "";
    }
    var U = Object.prototype.hasOwnProperty, Ee = {}, je = R.ReactDebugCurrentFrame;
    function K(e) {
      if (e) {
        var r = e._owner, n = q(e.type, e._source, r ? r.type : null);
        je.setExtraStackFrame(n);
      } else
        je.setExtraStackFrame(null);
    }
    function Ke(e, r, n, a, l) {
      {
        var u = Function.call.bind(U);
        for (var o in e)
          if (u(e, o)) {
            var s = void 0;
            try {
              if (typeof e[o] != "function") {
                var h = Error((a || "React class") + ": " + n + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw h.name = "Invariant Violation", h;
              }
              s = e[o](r, o, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (f) {
              s = f;
            }
            s && !(s instanceof Error) && (K(l), m("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, o, typeof s), K(null)), s instanceof Error && !(s.message in Ee) && (Ee[s.message] = !0, K(l), m("Failed %s type: %s", n, s.message), K(null));
          }
      }
    }
    var Ze = Array.isArray;
    function ae(e) {
      return Ze(e);
    }
    function He(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n;
      }
    }
    function Xe(e) {
      try {
        return xe(e), !1;
      } catch {
        return !0;
      }
    }
    function xe(e) {
      return "" + e;
    }
    function Re(e) {
      if (Xe(e))
        return m("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", He(e)), xe(e);
    }
    var Ce = R.ReactCurrentOwner, Qe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Te, Se;
    function er(e) {
      if (U.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function rr(e) {
      if (U.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function nr(e, r) {
      typeof e.ref == "string" && Ce.current;
    }
    function tr(e, r) {
      {
        var n = function() {
          Te || (Te = !0, m("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
    }
    function ar(e, r) {
      {
        var n = function() {
          Se || (Se = !0, m("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var ir = function(e, r, n, a, l, u, o) {
      var s = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: i,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: n,
        props: o,
        // Record the component responsible for creating this element.
        _owner: u
      };
      return s._store = {}, Object.defineProperty(s._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(s, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: a
      }), Object.defineProperty(s, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: l
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    };
    function sr(e, r, n, a, l) {
      {
        var u, o = {}, s = null, h = null;
        n !== void 0 && (Re(n), s = "" + n), rr(r) && (Re(r.key), s = "" + r.key), er(r) && (h = r.ref, nr(r, l));
        for (u in r)
          U.call(r, u) && !Qe.hasOwnProperty(u) && (o[u] = r[u]);
        if (e && e.defaultProps) {
          var f = e.defaultProps;
          for (u in f)
            o[u] === void 0 && (o[u] = f[u]);
        }
        if (s || h) {
          var v = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && tr(o, v), h && ar(o, v);
        }
        return ir(e, s, h, l, a, Ce.current, o);
      }
    }
    var ie = R.ReactCurrentOwner, Oe = R.ReactDebugCurrentFrame;
    function M(e) {
      if (e) {
        var r = e._owner, n = q(e.type, e._source, r ? r.type : null);
        Oe.setExtraStackFrame(n);
      } else
        Oe.setExtraStackFrame(null);
    }
    var se;
    se = !1;
    function oe(e) {
      return typeof e == "object" && e !== null && e.$$typeof === i;
    }
    function Ne() {
      {
        if (ie.current) {
          var e = N(ie.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function or(e) {
      return "";
    }
    var Pe = {};
    function cr(e) {
      {
        var r = Ne();
        if (!r) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (r = `

Check the top-level render call using <` + n + ">.");
        }
        return r;
      }
    }
    function Ae(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var n = cr(r);
        if (Pe[n])
          return;
        Pe[n] = !0;
        var a = "";
        e && e._owner && e._owner !== ie.current && (a = " It was passed a child from " + N(e._owner.type) + "."), M(e), m('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, a), M(null);
      }
    }
    function De(e, r) {
      {
        if (typeof e != "object")
          return;
        if (ae(e))
          for (var n = 0; n < e.length; n++) {
            var a = e[n];
            oe(a) && Ae(a, r);
          }
        else if (oe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var l = $(e);
          if (typeof l == "function" && l !== e.entries)
            for (var u = l.call(e), o; !(o = u.next()).done; )
              oe(o.value) && Ae(o.value, r);
        }
      }
    }
    function lr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var n;
        if (typeof r == "function")
          n = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === p || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === E))
          n = r.propTypes;
        else
          return;
        if (n) {
          var a = N(r);
          Ke(n, e.props, "prop", a, e);
        } else if (r.PropTypes !== void 0 && !se) {
          se = !0;
          var l = N(r);
          m("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", l || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && m("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ur(e) {
      {
        for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
          var a = r[n];
          if (a !== "children" && a !== "key") {
            M(e), m("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", a), M(null);
            break;
          }
        }
        e.ref !== null && (M(e), m("Invalid attribute `ref` supplied to `React.Fragment`."), M(null));
      }
    }
    var Fe = {};
    function $e(e, r, n, a, l, u) {
      {
        var o = Ve(e);
        if (!o) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var h = or();
          h ? s += h : s += Ne();
          var f;
          e === null ? f = "null" : ae(e) ? f = "array" : e !== void 0 && e.$$typeof === i ? (f = "<" + (N(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : f = typeof e, m("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", f, s);
        }
        var v = sr(e, r, n, l, u);
        if (v == null)
          return v;
        if (o) {
          var w = r.children;
          if (w !== void 0)
            if (a)
              if (ae(w)) {
                for (var W = 0; W < w.length; W++)
                  De(w[W], e);
                Object.freeze && Object.freeze(w);
              } else
                m("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              De(w, e);
        }
        if (U.call(r, "key")) {
          var D = N(e), b = Object.keys(r).filter(function(mr) {
            return mr !== "key";
          }), ce = b.length > 0 ? "{key: someKey, " + b.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Fe[D + ce]) {
            var gr = b.length > 0 ? "{" + b.join(": ..., ") + ": ...}" : "{}";
            m(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ce, D, gr, D), Fe[D + ce] = !0;
          }
        }
        return e === k ? ur(v) : lr(v), v;
      }
    }
    function fr(e, r, n) {
      return $e(e, r, n, !0);
    }
    function dr(e, r, n) {
      return $e(e, r, n, !1);
    }
    var vr = dr, pr = fr;
    B.Fragment = k, B.jsx = vr, B.jsxs = pr;
  }()), B;
}
process.env.NODE_ENV === "production" ? de.exports = br() : de.exports = kr();
var t = de.exports;
const Ie = "martinelli_gdpr", yr = 365, Ye = "1.0";
function wr(c, i) {
  const d = /* @__PURE__ */ new Date();
  d.setTime(d.getTime() + i * 864e5), document.cookie = `${Ie}=${encodeURIComponent(c)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}
function _r() {
  for (const c of document.cookie.split(";")) {
    const i = c.trim().split("="), d = i[0], k = i.slice(1).join("=");
    if (d === Ie) return decodeURIComponent(k || "");
  }
  return null;
}
function le(c, i) {
  wr(
    JSON.stringify({
      necessary: !0,
      analytics: c,
      marketing: i,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      version: Ye
      // stored so we can re-prompt on version bump
    }),
    yr
  );
}
function Z(c, i) {
  if (typeof window > "u") return;
  window.dataLayer = window.dataLayer || [];
  function d() {
    window.dataLayer.push(arguments);
  }
  window.gtag || (window.gtag = d), window.gtag("consent", "update", {
    analytics_storage: c ? "granted" : "denied",
    ad_storage: i ? "granted" : "denied",
    ad_user_data: i ? "granted" : "denied",
    ad_personalization: i ? "granted" : "denied"
  });
}
function Er() {
  if (typeof window > "u") return;
  window.dataLayer = window.dataLayer || [];
  function c() {
    window.dataLayer.push(arguments);
  }
  window.gtag || (window.gtag = c), window.google_tag_manager || window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500
  });
}
function jr(c) {
  if (!c || document.getElementById("ck-gtm")) return;
  window.dataLayer = window.dataLayer || [], window.dataLayer.push({ "gtm.start": (/* @__PURE__ */ new Date()).getTime(), event: "gtm.js" });
  const i = document.createElement("script");
  i.id = "ck-gtm", i.async = !0, i.src = `https://www.googletagmanager.com/gtm.js?id=${c}`, document.head.appendChild(i);
}
function ue(c) {
  if (!c || document.getElementById("ck-ga4")) return;
  const i = document.createElement("script");
  i.id = "ck-ga4", i.async = !0, i.src = `https://www.googletagmanager.com/gtag/js?id=${c}`, document.head.appendChild(i), i.onload = () => {
    window.gtag("js", /* @__PURE__ */ new Date()), window.gtag("config", c, { anonymize_ip: !0 });
  };
}
const xr = () => /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", width: "22", height: "22", children: /* @__PURE__ */ t.jsx("path", { d: "M21.93 11.15a1 1 0 0 0-.89-.66 3 3 0 0 1-2.71-2.16 1 1 0 0 0-.78-.72 3 3 0 0 1-2.16-2.71 1 1 0 0 0-.66-.89A10 10 0 1 0 21.93 11.15ZM12 20a8 8 0 1 1 7.61-10.31 5 5 0 0 0 2.7 3 5 5 0 0 0 3 2.7A8 8 0 0 1 12 20Zm-1-7a1 1 0 1 1-1-1A1 1 0 0 1 11 13Zm-4-1a1 1 0 1 1-1-1A1 1 0 0 1 7 12Zm9 4a1 1 0 1 1-1-1A1 1 0 0 1 16 16Zm-1-5a1 1 0 1 1-1-1A1 1 0 0 1 15 11Z" }) }), Rr = () => /* @__PURE__ */ t.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", width: "16", height: "16", children: /* @__PURE__ */ t.jsx("polyline", { points: "20 6 9 17 4 12" }) });
function Cr({ checked: c, onChange: i, disabled: d }) {
  return /* @__PURE__ */ t.jsx(
    "button",
    {
      role: "switch",
      "aria-checked": c,
      disabled: d,
      onClick: () => !d && i(!c),
      className: `ck-toggle ${c ? "ck-toggle--on" : ""} ${d ? "ck-toggle--disabled" : ""}`,
      children: /* @__PURE__ */ t.jsx("span", { className: "ck-toggle-thumb" })
    }
  );
}
function fe({ name: c, description: i, checked: d, onChange: k, required: j, cookies: y }) {
  return /* @__PURE__ */ t.jsxs("div", { className: `ck-cat ${j ? "ck-cat--required" : ""}`, children: [
    /* @__PURE__ */ t.jsxs("div", { className: "ck-cat-left", children: [
      /* @__PURE__ */ t.jsx(Cr, { checked: d, onChange: k, disabled: j }),
      /* @__PURE__ */ t.jsxs("div", { className: "ck-cat-text", children: [
        /* @__PURE__ */ t.jsx("span", { className: "ck-cat-name", children: c }),
        /* @__PURE__ */ t.jsx("span", { className: "ck-cat-desc", children: i }),
        y && /* @__PURE__ */ t.jsx("span", { className: "ck-cat-cookies", children: y })
      ] })
    ] }),
    j && /* @__PURE__ */ t.jsx("span", { className: "ck-required-badge", children: "Immer aktiv" })
  ] });
}
function Sr({
  gtmId: c = "",
  // GTM container ID e.g. "GTM-XXXXXXX" (recommended, manages GA4 via GTM)
  gaId: i = "",
  // GA4 ID e.g. "G-XXXXXXXXXX" (only if NOT using GTM)
  privacyUrl: d = "/datenschutz",
  cookiePolicyUrl: k = "/cookies",
  restaurantName: j = "Martinelli"
}) {
  const [y, _] = F(!1), [x, p] = F(!1), [C, g] = F(!1), [E, T] = F(""), [S, P] = F(!1), [I, $] = F(!1), [R, m] = F(!1);
  hr(() => {
    Er(), c && jr(c);
    const L = _r();
    if (!L) {
      setTimeout(() => _(!0), 900);
      return;
    }
    try {
      const O = JSON.parse(L);
      if (O.version !== Ye) {
        setTimeout(() => _(!0), 900);
        return;
      }
      P(!!O.analytics), $(!!O.marketing), Z(O.analytics, O.marketing), O.analytics && i && !c && ue(i), p(!0);
    } catch {
      setTimeout(() => _(!0), 900);
    }
  }, [c, i]);
  function H() {
    P(!0), $(!0), le(!0, !0), Z(!0, !0), i && !c && ue(i), Y("Alle Cookies akzeptiert — Herzlich Willkommen");
  }
  function X() {
    P(!1), $(!1), le(!1, !1), Z(!1, !1), Y("Nur notwendige Cookies aktiv");
  }
  function Q() {
    le(S, I), Z(S, I), S && i && !c && ue(i), Y("Auswahl bestätigt — Danke");
  }
  function Y(L) {
    T(L), g(!0), setTimeout(() => {
      _(!1), g(!1), setTimeout(() => p(!0), 600);
    }, 1500);
  }
  function ee() {
    p(!1), _(!0), g(!1);
  }
  return !y && !x ? null : /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
    y && /* @__PURE__ */ t.jsx("div", { className: "ck-overlay", onClick: () => {
    } }),
    /* @__PURE__ */ t.jsx("div", { className: `ck-wrap ${y ? "ck-wrap--visible" : ""}`, children: /* @__PURE__ */ t.jsxs("div", { className: "ck-box", children: [
      /* @__PURE__ */ t.jsx("div", { className: "ck-shimmer" }),
      /* @__PURE__ */ t.jsxs("div", { className: "ck-inner", children: [
        /* @__PURE__ */ t.jsxs("div", { className: "ck-eyebrow", children: [
          /* @__PURE__ */ t.jsx("span", { className: "ck-eyebrow-line" }),
          /* @__PURE__ */ t.jsx("span", { className: "ck-eyebrow-dot" }),
          /* @__PURE__ */ t.jsx("span", { className: "ck-eyebrow-text", children: "Datenschutz & Cookie-Einstellungen" })
        ] }),
        /* @__PURE__ */ t.jsxs("div", { className: "ck-grid", children: [
          /* @__PURE__ */ t.jsxs("div", { className: "ck-left", children: [
            /* @__PURE__ */ t.jsxs("h2", { className: "ck-title", children: [
              "Ihre Privatsphäre bei ",
              /* @__PURE__ */ t.jsx("em", { children: j })
            ] }),
            /* @__PURE__ */ t.jsxs("p", { className: "ck-desc", children: [
              "Wir verwenden Cookies für die beste Erfahrung auf unserer Website. Notwendige Cookies sind immer aktiv. Alle weiteren nur mit Ihrer ausdrücklichen Zustimmung. Mehr in unserer",
              " ",
              /* @__PURE__ */ t.jsx("a", { href: d, children: "Datenschutzerklärung" }),
              " und",
              " ",
              /* @__PURE__ */ t.jsx("a", { href: k, children: "Cookie-Richtlinie" }),
              "."
            ] }),
            /* @__PURE__ */ t.jsxs("div", { className: "ck-cats", children: [
              /* @__PURE__ */ t.jsx(
                fe,
                {
                  name: "Notwendig",
                  description: "Session, Sicherheit, Grundfunktionen",
                  cookies: "ck_consent · 1 Jahr",
                  checked: !0,
                  required: !0
                }
              ),
              /* @__PURE__ */ t.jsx(
                fe,
                {
                  name: "Analyse",
                  description: "Google Analytics 4 — keine persönlichen Daten",
                  cookies: "_ga, _ga_* · 2 Jahre · Google LLC",
                  checked: S,
                  onChange: P
                }
              ),
              /* @__PURE__ */ t.jsx(
                fe,
                {
                  name: "Marketing",
                  description: "Personalisierte Werbung auf Drittplattformen",
                  cookies: "_fbp · 90 Tage · Meta Platforms",
                  checked: I,
                  onChange: $
                }
              )
            ] }),
            /* @__PURE__ */ t.jsxs(
              "button",
              {
                className: "ck-details-btn",
                onClick: () => m(!R),
                children: [
                  R ? "Details ausblenden" : "Details & Cookie-Liste anzeigen",
                  /* @__PURE__ */ t.jsx("span", { className: `ck-details-arrow ${R ? "ck-details-arrow--open" : ""}`, children: "›" })
                ]
              }
            ),
            /* @__PURE__ */ t.jsxs("div", { className: "ck-footer-note", children: [
              /* @__PURE__ */ t.jsx("span", { children: "DSGVO Art.7 · ePrivacy-konform · Zeitstempel gespeichert" }),
              /* @__PURE__ */ t.jsx("a", { href: d, children: "Datenschutzerklärung →" })
            ] }),
            C && /* @__PURE__ */ t.jsxs("div", { className: "ck-confirm", children: [
              /* @__PURE__ */ t.jsx("div", { className: "ck-confirm-icon", children: /* @__PURE__ */ t.jsx(Rr, {}) }),
              /* @__PURE__ */ t.jsx(
                "span",
                {
                  className: "ck-confirm-text",
                  dangerouslySetInnerHTML: { __html: E }
                }
              )
            ] })
          ] }),
          !C && /* @__PURE__ */ t.jsxs("div", { className: "ck-actions", children: [
            /* @__PURE__ */ t.jsxs("button", { className: "ck-btn ck-btn--accept", onClick: H, children: [
              /* @__PURE__ */ t.jsxs("span", { children: [
                "Alle akzeptieren ",
                /* @__PURE__ */ t.jsx("span", { className: "ck-btn-star", children: "✦" })
              ] }),
              /* @__PURE__ */ t.jsx("span", { className: "ck-btn-sub", children: "Analyse & Marketing aktivieren" })
            ] }),
            /* @__PURE__ */ t.jsxs("button", { className: "ck-btn ck-btn--save", onClick: Q, children: [
              /* @__PURE__ */ t.jsx("span", { children: "Auswahl bestätigen" }),
              /* @__PURE__ */ t.jsx("span", { className: "ck-btn-sub", children: "Eigene Einstellungen speichern" })
            ] }),
            /* @__PURE__ */ t.jsx("div", { className: "ck-btn-divider" }),
            /* @__PURE__ */ t.jsxs("button", { className: "ck-btn ck-btn--reject", onClick: X, children: [
              /* @__PURE__ */ t.jsx("span", { children: "Alle ablehnen" }),
              /* @__PURE__ */ t.jsx("span", { className: "ck-btn-sub", children: "Nur notwendige Cookies bleiben aktiv" })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    x && !y && /* @__PURE__ */ t.jsxs("div", { className: "ck-bubble", children: [
      /* @__PURE__ */ t.jsx(
        "button",
        {
          className: "ck-bubble-btn",
          onClick: ee,
          "aria-label": "Cookie-Einstellungen öffnen",
          children: /* @__PURE__ */ t.jsx(xr, {})
        }
      ),
      /* @__PURE__ */ t.jsx("div", { className: "ck-bubble-tooltip", children: "Cookie-Einstellungen" })
    ] })
  ] });
}
export {
  Sr as default
};
