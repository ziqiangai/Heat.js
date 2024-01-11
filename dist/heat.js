/*! Heat.js v0.2.0 | (c) Bunoon 2024 | MIT License */
(function() {
  function r(a) {
    a.element.className = "heat-js";
    a.element.innerHTML = y.empty;
    Q(a);
    R(a);
    S(a);
  }
  function Q(a) {
    M(a.currentView.year) || (a.currentView.year = (new Date()).getFullYear());
    if (a.showTitle || a.showYearSelector) {
      var c = h("div", "year");
      a.element.appendChild(c);
      if (a.showTitle) {
        var b = h("div", "title");
        b.innerHTML = a.titleText;
        c.appendChild(b);
      }
      a.showYearSelector && (b = h("button", "back"), b.innerHTML = d.backButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year--;
        r(a);
        v(a.onBackYear, a.currentView.year);
      }, a.currentView.yearText = h("div", "year-text"), a.currentView.yearText.innerHTML = a.currentView.year, c.appendChild(a.currentView.yearText), b = h("button", "next"), b.innerHTML = d.nextButtonText, c.appendChild(b), b.onclick = function() {
        a.currentView.year++;
        r(a);
        v(a.onNextYear, a.currentView.year);
      });
    }
  }
  function R(a) {
    var c = h("div", "map");
    a.element.appendChild(c);
    var b = a.currentView.year;
    if (a.showDayNames) {
      var k = h("div", "days");
      c.appendChild(k);
      for (var f = 0; 7 > f; f++) {
        var g = h("div", "day-name");
        g.innerHTML = d.dayNames[f];
        k.appendChild(g);
      }
    }
    k = h("div", "months");
    c.appendChild(k);
    c = d.mapRangeColors.sort(function(t, F) {
      return F.range - t.range;
    });
    for (f = 0; 12 > f; f++) {
      if (-1 < a.monthsToShow.indexOf(f + 1)) {
        var m = h("div", "month");
        k.appendChild(m);
        g = h("div", "month-name");
        g.innerHTML = d.monthNames[f];
        m.appendChild(g);
        g = h("div", "day-columns");
        m.appendChild(g);
        m = (new Date(b, f + 1, 0)).getDate();
        var n = h("div", "day-column"), p = !1;
        g.appendChild(n);
        var w = N(new Date(b, f, 1));
        m += w;
        for (var e = 0; e < m; e++) {
          if (e >= w) {
            p = !0;
          } else {
            var x = h("div", "day-disabled");
            n.appendChild(x);
          }
          p && (T(a, n, e - w, f, b, c), 0 === (e + 1) % 7 && (n = h("div", "day-column"), g.appendChild(n)));
        }
      }
    }
  }
  function T(a, c, b, k, f, g) {
    var m = b + 1;
    b = h("div", "day");
    var n = new Date(f, k, m);
    k = l[a.element.id][G(n)];
    b.title = U(a.dayToolTipText, n);
    c.appendChild(b);
    b.onclick = function() {
      v(a.onDayClick, n);
    };
    c = d.mapRangeColors.length;
    for (f = 0; f < c; f++) {
      if (m = g[f], k >= m.minimum) {
        b.className += y.space + m.cssClassName;
        break;
      }
    }
  }
  function S(a) {
    if (a.showGuide) {
      var c = h("div", "guide");
      a.element.appendChild(c);
      a = h("div", "less-text");
      a.innerHTML = d.lessText;
      c.appendChild(a);
      a = h("div", "days");
      c.appendChild(a);
      for (var b = d.mapRangeColors.sort(function(m, n) {
        return n.range - m.range;
      }), k = b.length, f = 0; f < k; f++) {
        var g = h("div", "day " + b[f].cssClassName);
        a.appendChild(g);
      }
      a = h("div", "more-text");
      a.innerHTML = d.moreText;
      c.appendChild(a);
    }
  }
  function N(a) {
    return 0 > a.getDay() - 1 ? 6 : a.getDay() - 1;
  }
  function U(a, c) {
    var b = a, k = N(c);
    b = b.replace("{dddd}", d.dayNames[k]);
    b = b.replace("{dd}", O(c.getDate()));
    b = b.replace("{d}", c.getDate());
    k = b.replace;
    var f = c.getDate(), g = d.thText;
    if (31 === f || 21 === f || 1 === f) {
      g = d.stText;
    } else if (22 === f || 2 === f) {
      g = d.ndText;
    } else if (23 === f || 3 === f) {
      g = d.rdText;
    }
    b = k.call(b, "{o}", g);
    b = b.replace("{mmmm}", d.monthNames[c.getMonth()]);
    b = b.replace("{mm}", O(c.getMonth() + 1));
    b = b.replace("{m}", c.getMonth() + 1);
    b = b.replace("{yyyy}", c.getFullYear());
    b = b.replace("{yyy}", c.getFullYear().toString().substring(1));
    b = b.replace("{yy}", c.getFullYear().toString().substring(2));
    return b = b.replace("{y}", parseInt(c.getFullYear().toString().substring(2)).toString());
  }
  function u(a) {
    return null !== a && void 0 !== a && a !== y.empty;
  }
  function D(a) {
    return u(a) && "object" === typeof a;
  }
  function E(a) {
    return u(a) && "boolean" === typeof a;
  }
  function A(a) {
    return u(a) && "string" === typeof a;
  }
  function H(a) {
    return u(a) && "function" === typeof a;
  }
  function M(a) {
    return u(a) && "number" === typeof a;
  }
  function I(a) {
    return D(a) && a instanceof Array;
  }
  function h(a, c) {
    var b = a.toLowerCase();
    var k = "text" === b;
    J.hasOwnProperty(b) || (J[b] = k ? B.createTextNode(y.empty) : B.createElement(b));
    b = J[b].cloneNode(!1);
    u(c) && (b.className = c);
    return b;
  }
  function v(a) {
    H(a) && a.apply(null, [].slice.call(arguments, 1));
  }
  function q(a, c) {
    return A(a) ? a : c;
  }
  function C(a, c) {
    return E(a) ? a : c;
  }
  function z(a, c) {
    return H(a) ? a : c;
  }
  function V(a) {
    var c = !0, b = null;
    try {
      A(a) && (b = JSON.parse(a));
    } catch (k) {
      try {
        b = eval("(" + a + ")"), H(b) && (b = b());
      } catch (f) {
        d.safeMode || (console.error("Errors in object: " + k.message + ", " + f.message), c = !1), b = null;
      }
    }
    return {parsed:c, result:b};
  }
  function O(a) {
    a = a.toString();
    return 1 === a.length ? "0" + a : a;
  }
  function G(a) {
    return a.getFullYear() + "-" + a.getMonth() + "-" + a.getDate();
  }
  function P() {
    d.safeMode = C(d.safeMode, !0);
    var a = d, c = d.domElementTypes, b = ["*"];
    A(c) ? (c = c.split(y.space), 0 === c.length && (c = b)) : c = I(c) ? c : b;
    a.domElementTypes = c;
    a = d;
    b = d.mapRangeColors;
    c = [{minimum:10, cssClassName:"day-color-1"}, {minimum:15, cssClassName:"day-color-2"}, {minimum:20, cssClassName:"day-color-3"}, {minimum:25, cssClassName:"day-color-4"}];
    b = I(b) ? b : c;
    a.mapRangeColors = b;
    d.stText = q(d.stText, "st");
    d.ndText = q(d.ndText, "nd");
    d.rdText = q(d.rdText, "rd");
    d.thText = q(d.thText, "th");
    d.backButtonText = q(d.backButtonText, "Back");
    d.nextButtonText = q(d.nextButtonText, "Next");
    d.lessText = q(d.lessText, "Less");
    d.moreText = q(d.moreText, "More");
    K(d.monthNames, 12) && (d.monthNames = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "));
    K(d.dayNames, 7) && (d.dayNames = "Mon Tue Wed Thu Fri Sat Sun".split(" "));
  }
  function K(a, c) {
    c = M(c) ? c : 1;
    return !I(a) || a.length < c;
  }
  var B = null, L = null, d = {}, y = {empty:"", space:" "}, J = {}, l = {};
  this.addDate = function(a, c, b) {
    l.hasOwnProperty(a) && (b = E(b) ? b : !0, c = G(c), l[a].hasOwnProperty(c) || (l[a][c] = 0), l[a][c]++, b && r(l[a].options));
    return this;
  };
  this.removeDate = function(a, c, b) {
    l.hasOwnProperty(a) && (c = G(c), l[a].hasOwnProperty(c) && (b = E(b) ? b : !0, l[a][c]--, b && r(l[a].options)));
    return this;
  };
  this.reset = function(a, c) {
    if (l.hasOwnProperty(a)) {
      c = E(c) ? c : !0;
      var b = l[a].options;
      l[a] = {};
      l[a].options = b;
      c && r(l[a].options);
    }
    return this;
  };
  this.refresh = function(a) {
    l.hasOwnProperty(a) && (a = l[a].options, r(a), v(a.onRefresh, a.element));
    return this;
  };
  this.refreshAll = function() {
    for (var a in l) {
      if (l.hasOwnProperty(a)) {
        var c = l[a].options;
        r(c);
        v(c.onRefresh, c.element);
      }
    }
    return this;
  };
  this.setConfiguration = function(a) {
    d = D(a) ? a : {};
    P();
    return this;
  };
  this.getVersion = function() {
    return "0.2.0";
  };
  (function(a, c) {
    B = a;
    L = c;
    P();
    B.addEventListener("DOMContentLoaded", function() {
      for (var b = d.domElementTypes, k = b.length, f = 0; f < k; f++) {
        var g = B.getElementsByTagName(b[f]);
        g = [].slice.call(g);
        for (var m = g.length, n = 0; n < m; n++) {
          var p = g[n], w = !0;
          if (u(p) && p.hasAttribute("data-heat-options")) {
            var e = p.getAttribute("data-heat-options");
            if (A(e)) {
              if (e = V(e), e.parsed && D(e.result)) {
                e = e.result;
                e = D(e) ? e : {};
                e.showDayNames = C(e.showDayNames, !0);
                e.showGuide = C(e.showGuide, !0);
                e.showTitle = C(e.showTitle, !0);
                e.showYearSelector = C(e.showYearSelector, !0);
                K(d.monthsToShow, 12) && (e.monthsToShow = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
                e.titleText = q(e.titleText, "Heat.js");
                e.dayToolTipText = q(e.dayToolTipText, "{d}{o} {mmmm} {yyyy}");
                e.onDayClick = z(e.onDayClick, null);
                e.onBackYear = z(e.onBackYear, null);
                e.onNextYear = z(e.onNextYear, null);
                e.onRefresh = z(e.onRefresh, null);
                e.onBeforeRender = z(e.onBeforeRender, null);
                e.onRenderComplete = z(e.onRenderComplete, null);
                e.element = p;
                e.currentView = {};
                v(e.onBeforeRender, p);
                if (!A(p.id)) {
                  var x = [];
                  for (var t = 0; 32 > t; t++) {
                    8 !== t && 12 !== t && 16 !== t && 20 !== t || x.push("-");
                    var F = Math.floor(16 * Math.random()).toString(16);
                    x.push(F);
                  }
                  x = x.join(y.empty);
                  p.id = x;
                }
                p.removeAttribute("data-heat-options");
                l[p.id] = {options:e};
                r(e);
                v(e.onRenderComplete, p);
              } else {
                d.safeMode || (console.error("The attribute 'data-heat-options' is not a valid object."), w = !1);
              }
            } else {
              d.safeMode || (console.error("The attribute 'data-heat-options' has not been set correctly."), w = !1);
            }
          }
          if (!w) {
            break;
          }
        }
      }
    });
    u(L.$heat) || (L.$heat = this);
  })(document, window);
})();