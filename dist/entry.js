import { app as Ws } from "../../scripts/app.js";
/**
* @vue/shared v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
// @__NO_SIDE_EFFECTS__
function xs(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const le = {}, Ot = [], Xe = () => {
}, Mi = () => !1, Fn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Ln = (e) => e.startsWith("onUpdate:"), me = Object.assign, Cs = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Wo = Object.prototype.hasOwnProperty, te = (e, t) => Wo.call(e, t), B = Array.isArray, Pt = (e) => cn(e) === "[object Map]", Hn = (e) => cn(e) === "[object Set]", js = (e) => cn(e) === "[object Date]", q = (e) => typeof e == "function", ue = (e) => typeof e == "string", Pe = (e) => typeof e == "symbol", ne = (e) => e !== null && typeof e == "object", $i = (e) => (ne(e) || q(e)) && q(e.then) && q(e.catch), Ai = Object.prototype.toString, cn = (e) => Ai.call(e), jo = (e) => cn(e).slice(8, -1), Ei = (e) => cn(e) === "[object Object]", Nn = (e) => ue(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Jt = /* @__PURE__ */ xs(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Wn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return ((n) => t[n] || (t[n] = e(n)));
}, Vo = /-\w/g, Fe = Wn(
  (e) => e.replace(Vo, (t) => t.slice(1).toUpperCase())
), Bo = /\B([A-Z])/g, $t = Wn(
  (e) => e.replace(Bo, "-$1").toLowerCase()
), Ri = Wn((e) => e.charAt(0).toUpperCase() + e.slice(1)), Xn = Wn(
  (e) => e ? `on${Ri(e)}` : ""
), Je = (e, t) => !Object.is(e, t), wn = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Ii = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
}, jn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Vs;
const Vn = () => Vs || (Vs = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ze(e) {
  if (B(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = ue(s) ? Go(s) : Ze(s);
      if (i)
        for (const o in i)
          t[o] = i[o];
    }
    return t;
  } else if (ue(e) || ne(e))
    return e;
}
const Ko = /;(?![^(]*\))/g, Uo = /:([^]+)/, zo = /\/\*[^]*?\*\//g;
function Go(e) {
  const t = {};
  return e.replace(zo, "").split(Ko).forEach((n) => {
    if (n) {
      const s = n.split(Uo);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function $e(e) {
  let t = "";
  if (ue(e))
    t = e;
  else if (B(e))
    for (let n = 0; n < e.length; n++) {
      const s = $e(e[n]);
      s && (t += s + " ");
    }
  else if (ne(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const qo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Yo = /* @__PURE__ */ xs(qo);
function Oi(e) {
  return !!e || e === "";
}
function Jo(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++)
    n = un(e[s], t[s]);
  return n;
}
function un(e, t) {
  if (e === t) return !0;
  let n = js(e), s = js(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = Pe(e), s = Pe(t), n || s)
    return e === t;
  if (n = B(e), s = B(t), n || s)
    return n && s ? Jo(e, t) : !1;
  if (n = ne(e), s = ne(t), n || s) {
    if (!n || !s)
      return !1;
    const i = Object.keys(e).length, o = Object.keys(t).length;
    if (i !== o)
      return !1;
    for (const r in e) {
      const l = e.hasOwnProperty(r), a = t.hasOwnProperty(r);
      if (l && !a || !l && a || !un(e[r], t[r]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function Xo(e, t) {
  return e.findIndex((n) => un(n, t));
}
const Pi = (e) => !!(e && e.__v_isRef === !0), G = (e) => ue(e) ? e : e == null ? "" : B(e) || ne(e) && (e.toString === Ai || !q(e.toString)) ? Pi(e) ? G(e.value) : JSON.stringify(e, Di, 2) : String(e), Di = (e, t) => Pi(t) ? Di(e, t.value) : Pt(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, i], o) => (n[Zn(s, o) + " =>"] = i, n),
    {}
  )
} : Hn(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Zn(n))
} : Pe(t) ? Zn(t) : ne(t) && !B(t) && !Ei(t) ? String(t) : t, Zn = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Pe(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ge;
class Zo {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t = !1) {
    this.detached = t, this._active = !0, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = !1, this._warnOnRun = !0, this.__v_skip = !0, !t && ge && (ge.active ? (this.parent = ge, this.index = (ge.scopes || (ge.scopes = [])).push(
      this
    ) - 1) : (this._active = !1, this._warnOnRun = !1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = ge;
      try {
        return ge = this, t();
      } finally {
        ge = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ++this._on === 1 && (this.prevScope = ge, ge = this);
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    if (this._on > 0 && --this._on === 0) {
      if (ge === this)
        ge = this.prevScope;
      else {
        let t = ge;
        for (; t; ) {
          if (t.prevScope === this) {
            t.prevScope = this.prevScope;
            break;
          }
          t = t.prevScope;
        }
      }
      this.prevScope = void 0;
    }
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop();
        i && i !== this && (this.parent.scopes[this.index] = i, i.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Qo() {
  return ge;
}
let ae;
const Qn = /* @__PURE__ */ new WeakSet();
class Fi {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ge && (ge.active ? ge.effects.push(this) : this.flags &= -2);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Qn.has(this) && (Qn.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Hi(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Bs(this), Ni(this);
    const t = ae, n = Le;
    ae = this, Le = !0;
    try {
      return this.fn();
    } finally {
      Wi(this), ae = t, Le = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Ts(t);
      this.deps = this.depsTail = void 0, Bs(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Qn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    cs(this) && this.run();
  }
  get dirty() {
    return cs(this);
  }
}
let Li = 0, Xt, Zt;
function Hi(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Zt, Zt = e;
    return;
  }
  e.next = Xt, Xt = e;
}
function ks() {
  Li++;
}
function Ss() {
  if (--Li > 0)
    return;
  if (Zt) {
    let t = Zt;
    for (Zt = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Xt; ) {
    let t = Xt;
    for (Xt = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Ni(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Wi(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const i = s.prevDep;
    s.version === -1 ? (s === n && (n = i), Ts(s), er(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = i;
  }
  e.deps = t, e.depsTail = n;
}
function cs(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ji(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ji(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === sn) || (e.globalVersion = sn, !e.isSSR && e.flags & 128 && (!e.deps && !e._dirty || !cs(e))))
    return;
  e.flags |= 2;
  const t = e.dep, n = ae, s = Le;
  ae = e, Le = !0;
  try {
    Ni(e);
    const i = e.fn(e._value);
    (t.version === 0 || Je(i, e._value)) && (e.flags |= 128, e._value = i, t.version++);
  } catch (i) {
    throw t.version++, i;
  } finally {
    ae = n, Le = s, Wi(e), e.flags &= -3;
  }
}
function Ts(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: i } = e;
  if (s && (s.nextSub = i, e.prevSub = void 0), i && (i.prevSub = s, e.nextSub = void 0), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      Ts(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function er(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Le = !0;
const Vi = [];
function Qe() {
  Vi.push(Le), Le = !1;
}
function et() {
  const e = Vi.pop();
  Le = e === void 0 ? !0 : e;
}
function Bs(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = ae;
    ae = void 0;
    try {
      t();
    } finally {
      ae = n;
    }
  }
}
let sn = 0;
class tr {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Ms {
  // TODO isolatedDeclarations "__v_skip"
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = !0;
  }
  track(t) {
    if (!ae || !Le || ae === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== ae)
      n = this.activeLink = new tr(ae, this), ae.deps ? (n.prevDep = ae.depsTail, ae.depsTail.nextDep = n, ae.depsTail = n) : ae.deps = ae.depsTail = n, Bi(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = ae.depsTail, n.nextDep = void 0, ae.depsTail.nextDep = n, ae.depsTail = n, ae.deps === n && (ae.deps = s);
    }
    return n;
  }
  trigger(t) {
    this.version++, sn++, this.notify(t);
  }
  notify(t) {
    ks();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Ss();
    }
  }
}
function Bi(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        Bi(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Sn = /* @__PURE__ */ new WeakMap(), St = /* @__PURE__ */ Symbol(
  ""
), us = /* @__PURE__ */ Symbol(
  ""
), on = /* @__PURE__ */ Symbol(
  ""
);
function ve(e, t, n) {
  if (Le && ae) {
    let s = Sn.get(e);
    s || Sn.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || (s.set(n, i = new Ms()), i.map = s, i.key = n), i.track();
  }
}
function lt(e, t, n, s, i, o) {
  const r = Sn.get(e);
  if (!r) {
    sn++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (ks(), t === "clear")
    r.forEach(l);
  else {
    const a = B(e), f = a && Nn(n);
    if (a && n === "length") {
      const u = Number(s);
      r.forEach((h, p) => {
        (p === "length" || p === on || !Pe(p) && p >= u) && l(h);
      });
    } else
      switch ((n !== void 0 || r.has(void 0)) && l(r.get(n)), f && l(r.get(on)), t) {
        case "add":
          a ? f && l(r.get("length")) : (l(r.get(St)), Pt(e) && l(r.get(us)));
          break;
        case "delete":
          a || (l(r.get(St)), Pt(e) && l(r.get(us)));
          break;
        case "set":
          Pt(e) && l(r.get(St));
          break;
      }
  }
  Ss();
}
function nr(e, t) {
  const n = Sn.get(e);
  return n && n.get(t);
}
function Et(e) {
  const t = /* @__PURE__ */ ee(e);
  return t === e ? t : (ve(t, "iterate", on), /* @__PURE__ */ Ae(e) ? t : t.map(He));
}
function Bn(e) {
  return ve(e = /* @__PURE__ */ ee(e), "iterate", on), e;
}
function qe(e, t) {
  return /* @__PURE__ */ ct(e) ? Ht(/* @__PURE__ */ Tt(e) ? He(t) : t) : He(t);
}
const sr = {
  __proto__: null,
  [Symbol.iterator]() {
    return es(this, Symbol.iterator, (e) => qe(this, e));
  },
  concat(...e) {
    return Et(this).concat(
      ...e.map((t) => B(t) ? Et(t) : t)
    );
  },
  entries() {
    return es(this, "entries", (e) => (e[1] = qe(this, e[1]), e));
  },
  every(e, t) {
    return it(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return it(
      this,
      "filter",
      e,
      t,
      (n) => n.map((s) => qe(this, s)),
      arguments
    );
  },
  find(e, t) {
    return it(
      this,
      "find",
      e,
      t,
      (n) => qe(this, n),
      arguments
    );
  },
  findIndex(e, t) {
    return it(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return it(
      this,
      "findLast",
      e,
      t,
      (n) => qe(this, n),
      arguments
    );
  },
  findLastIndex(e, t) {
    return it(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return it(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return ts(this, "includes", e);
  },
  indexOf(...e) {
    return ts(this, "indexOf", e);
  },
  join(e) {
    return Et(this).join(e);
  },
  // keys() iterator only reads `length`, no optimization required
  lastIndexOf(...e) {
    return ts(this, "lastIndexOf", e);
  },
  map(e, t) {
    return it(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ut(this, "pop");
  },
  push(...e) {
    return Ut(this, "push", e);
  },
  reduce(e, ...t) {
    return Ks(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Ks(this, "reduceRight", e, t);
  },
  shift() {
    return Ut(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return it(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ut(this, "splice", e);
  },
  toReversed() {
    return Et(this).toReversed();
  },
  toSorted(e) {
    return Et(this).toSorted(e);
  },
  toSpliced(...e) {
    return Et(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ut(this, "unshift", e);
  },
  values() {
    return es(this, "values", (e) => qe(this, e));
  }
};
function es(e, t, n) {
  const s = Bn(e), i = s[t]();
  return s !== e && !/* @__PURE__ */ Ae(e) && (i._next = i.next, i.next = () => {
    const o = i._next();
    return o.done || (o.value = n(o.value)), o;
  }), i;
}
const ir = Array.prototype;
function it(e, t, n, s, i, o) {
  const r = Bn(e), l = r !== e && !/* @__PURE__ */ Ae(e), a = r[t];
  if (a !== ir[t]) {
    const h = a.apply(e, o);
    return l ? He(h) : h;
  }
  let f = n;
  r !== e && (l ? f = function(h, p) {
    return n.call(this, qe(e, h), p, e);
  } : n.length > 2 && (f = function(h, p) {
    return n.call(this, h, p, e);
  }));
  const u = a.call(r, f, s);
  return l && i ? i(u) : u;
}
function Ks(e, t, n, s) {
  const i = Bn(e), o = i !== e && !/* @__PURE__ */ Ae(e);
  let r = n, l = !1;
  i !== e && (o ? (l = s.length === 0, r = function(f, u, h) {
    return l && (l = !1, f = qe(e, f)), n.call(this, f, qe(e, u), h, e);
  }) : n.length > 3 && (r = function(f, u, h) {
    return n.call(this, f, u, h, e);
  }));
  const a = i[t](r, ...s);
  return l ? qe(e, a) : a;
}
function ts(e, t, n) {
  const s = /* @__PURE__ */ ee(e);
  ve(s, "iterate", on);
  const i = s[t](...n);
  return (i === -1 || i === !1) && /* @__PURE__ */ Kn(n[0]) ? (n[0] = /* @__PURE__ */ ee(n[0]), s[t](...n)) : i;
}
function Ut(e, t, n = []) {
  Qe(), ks();
  const s = (/* @__PURE__ */ ee(e))[t].apply(e, n);
  return Ss(), et(), s;
}
const or = /* @__PURE__ */ xs("__proto__,__v_isRef,__isVue"), Ki = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Pe)
);
function rr(e) {
  Pe(e) || (e = String(e));
  const t = /* @__PURE__ */ ee(this);
  return ve(t, "has", e), t.hasOwnProperty(e);
}
class Ui {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const i = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return s === (i ? o ? mr : Yi : o ? qi : Gi).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const r = B(t);
    if (!i) {
      let a;
      if (r && (a = sr[n]))
        return a;
      if (n === "hasOwnProperty")
        return rr;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      /* @__PURE__ */ de(t) ? t : s
    );
    if ((Pe(n) ? Ki.has(n) : or(n)) || (i || ve(t, "get", n), o))
      return l;
    if (/* @__PURE__ */ de(l)) {
      const a = r && Nn(n) ? l : l.value;
      return i && ne(a) ? /* @__PURE__ */ ds(a) : a;
    }
    return ne(l) ? i ? /* @__PURE__ */ ds(l) : /* @__PURE__ */ Mt(l) : l;
  }
}
class zi extends Ui {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, i) {
    let o = t[n];
    const r = B(t) && Nn(n);
    if (!this._isShallow) {
      const f = /* @__PURE__ */ ct(o);
      if (!/* @__PURE__ */ Ae(s) && !/* @__PURE__ */ ct(s) && (o = /* @__PURE__ */ ee(o), s = /* @__PURE__ */ ee(s)), !r && /* @__PURE__ */ de(o) && !/* @__PURE__ */ de(s))
        return f || (o.value = s), !0;
    }
    const l = r ? Number(n) < t.length : te(t, n), a = Reflect.set(
      t,
      n,
      s,
      /* @__PURE__ */ de(t) ? t : i
    );
    return t === /* @__PURE__ */ ee(i) && a && (l ? Je(s, o) && lt(t, "set", n, s) : lt(t, "add", n, s)), a;
  }
  deleteProperty(t, n) {
    const s = te(t, n);
    t[n];
    const i = Reflect.deleteProperty(t, n);
    return i && s && lt(t, "delete", n, void 0), i;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!Pe(n) || !Ki.has(n)) && ve(t, "has", n), s;
  }
  ownKeys(t) {
    return ve(
      t,
      "iterate",
      B(t) ? "length" : St
    ), Reflect.ownKeys(t);
  }
}
class lr extends Ui {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const ar = /* @__PURE__ */ new zi(), cr = /* @__PURE__ */ new lr(), ur = /* @__PURE__ */ new zi(!0);
const fs = (e) => e, gn = (e) => Reflect.getPrototypeOf(e);
function fr(e, t, n) {
  return function(...s) {
    const i = this.__v_raw, o = /* @__PURE__ */ ee(i), r = Pt(o), l = e === "entries" || e === Symbol.iterator && r, a = e === "keys" && r, f = i[e](...s), u = n ? fs : t ? Ht : He;
    return !t && ve(
      o,
      "iterate",
      a ? us : St
    ), me(
      // inheriting all iterator properties
      Object.create(f),
      {
        // iterator protocol
        next() {
          const { value: h, done: p } = f.next();
          return p ? { value: h, done: p } : {
            value: l ? [u(h[0]), u(h[1])] : u(h),
            done: p
          };
        }
      }
    );
  };
}
function mn(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function dr(e, t) {
  const n = {
    get(i) {
      const o = this.__v_raw, r = /* @__PURE__ */ ee(o), l = /* @__PURE__ */ ee(i);
      e || (Je(i, l) && ve(r, "get", i), ve(r, "get", l));
      const { has: a } = gn(r), f = t ? fs : e ? Ht : He;
      if (a.call(r, i))
        return f(o.get(i));
      if (a.call(r, l))
        return f(o.get(l));
      o !== r && o.get(i);
    },
    get size() {
      const i = this.__v_raw;
      return !e && ve(/* @__PURE__ */ ee(i), "iterate", St), i.size;
    },
    has(i) {
      const o = this.__v_raw, r = /* @__PURE__ */ ee(o), l = /* @__PURE__ */ ee(i);
      return e || (Je(i, l) && ve(r, "has", i), ve(r, "has", l)), i === l ? o.has(i) : o.has(i) || o.has(l);
    },
    forEach(i, o) {
      const r = this, l = r.__v_raw, a = /* @__PURE__ */ ee(l), f = t ? fs : e ? Ht : He;
      return !e && ve(a, "iterate", St), l.forEach((u, h) => i.call(o, f(u), f(h), r));
    }
  };
  return me(
    n,
    e ? {
      add: mn("add"),
      set: mn("set"),
      delete: mn("delete"),
      clear: mn("clear")
    } : {
      add(i) {
        const o = /* @__PURE__ */ ee(this), r = gn(o), l = /* @__PURE__ */ ee(i), a = !t && !/* @__PURE__ */ Ae(i) && !/* @__PURE__ */ ct(i) ? l : i;
        return r.has.call(o, a) || Je(i, a) && r.has.call(o, i) || Je(l, a) && r.has.call(o, l) || (o.add(a), lt(o, "add", a, a)), this;
      },
      set(i, o) {
        !t && !/* @__PURE__ */ Ae(o) && !/* @__PURE__ */ ct(o) && (o = /* @__PURE__ */ ee(o));
        const r = /* @__PURE__ */ ee(this), { has: l, get: a } = gn(r);
        let f = l.call(r, i);
        f || (i = /* @__PURE__ */ ee(i), f = l.call(r, i));
        const u = a.call(r, i);
        return r.set(i, o), f ? Je(o, u) && lt(r, "set", i, o) : lt(r, "add", i, o), this;
      },
      delete(i) {
        const o = /* @__PURE__ */ ee(this), { has: r, get: l } = gn(o);
        let a = r.call(o, i);
        a || (i = /* @__PURE__ */ ee(i), a = r.call(o, i)), l && l.call(o, i);
        const f = o.delete(i);
        return a && lt(o, "delete", i, void 0), f;
      },
      clear() {
        const i = /* @__PURE__ */ ee(this), o = i.size !== 0, r = i.clear();
        return o && lt(
          i,
          "clear",
          void 0,
          void 0
        ), r;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    n[i] = fr(i, e, t);
  }), n;
}
function $s(e, t) {
  const n = dr(e, t);
  return (s, i, o) => i === "__v_isReactive" ? !e : i === "__v_isReadonly" ? e : i === "__v_raw" ? s : Reflect.get(
    te(n, i) && i in s ? n : s,
    i,
    o
  );
}
const hr = {
  get: /* @__PURE__ */ $s(!1, !1)
}, pr = {
  get: /* @__PURE__ */ $s(!1, !0)
}, gr = {
  get: /* @__PURE__ */ $s(!0, !1)
};
const Gi = /* @__PURE__ */ new WeakMap(), qi = /* @__PURE__ */ new WeakMap(), Yi = /* @__PURE__ */ new WeakMap(), mr = /* @__PURE__ */ new WeakMap();
function vr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
// @__NO_SIDE_EFFECTS__
function Mt(e) {
  return /* @__PURE__ */ ct(e) ? e : As(
    e,
    !1,
    ar,
    hr,
    Gi
  );
}
// @__NO_SIDE_EFFECTS__
function yr(e) {
  return As(
    e,
    !1,
    ur,
    pr,
    qi
  );
}
// @__NO_SIDE_EFFECTS__
function ds(e) {
  return As(
    e,
    !0,
    cr,
    gr,
    Yi
  );
}
function As(e, t, n, s, i) {
  if (!ne(e) || e.__v_raw && !(t && e.__v_isReactive) || e.__v_skip || !Object.isExtensible(e))
    return e;
  const o = i.get(e);
  if (o)
    return o;
  const r = vr(jo(e));
  if (r === 0)
    return e;
  const l = new Proxy(
    e,
    r === 2 ? s : n
  );
  return i.set(e, l), l;
}
// @__NO_SIDE_EFFECTS__
function Tt(e) {
  return /* @__PURE__ */ ct(e) ? /* @__PURE__ */ Tt(e.__v_raw) : !!(e && e.__v_isReactive);
}
// @__NO_SIDE_EFFECTS__
function ct(e) {
  return !!(e && e.__v_isReadonly);
}
// @__NO_SIDE_EFFECTS__
function Ae(e) {
  return !!(e && e.__v_isShallow);
}
// @__NO_SIDE_EFFECTS__
function Kn(e) {
  return e ? !!e.__v_raw : !1;
}
// @__NO_SIDE_EFFECTS__
function ee(e) {
  const t = e && e.__v_raw;
  return t ? /* @__PURE__ */ ee(t) : e;
}
function _r(e) {
  return !te(e, "__v_skip") && Object.isExtensible(e) && Ii(e, "__v_skip", !0), e;
}
const He = (e) => ne(e) ? /* @__PURE__ */ Mt(e) : e, Ht = (e) => ne(e) ? /* @__PURE__ */ ds(e) : e;
// @__NO_SIDE_EFFECTS__
function de(e) {
  return e ? e.__v_isRef === !0 : !1;
}
// @__NO_SIDE_EFFECTS__
function J(e) {
  return br(e, !1);
}
function br(e, t) {
  return /* @__PURE__ */ de(e) ? e : new wr(e, t);
}
class wr {
  constructor(t, n) {
    this.dep = new Ms(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : /* @__PURE__ */ ee(t), this._value = n ? t : He(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, s = this.__v_isShallow || /* @__PURE__ */ Ae(t) || /* @__PURE__ */ ct(t);
    t = s ? t : /* @__PURE__ */ ee(t), Je(t, n) && (this._rawValue = t, this._value = s ? t : He(t), this.dep.trigger());
  }
}
function F(e) {
  return /* @__PURE__ */ de(e) ? e.value : e;
}
const xr = {
  get: (e, t, n) => t === "__v_raw" ? e : F(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t];
    return /* @__PURE__ */ de(i) && !/* @__PURE__ */ de(n) ? (i.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Ji(e) {
  return /* @__PURE__ */ Tt(e) ? e : new Proxy(e, xr);
}
class Cr {
  constructor(t, n, s) {
    this._object = t, this._defaultValue = s, this.__v_isRef = !0, this._value = void 0, this._key = Pe(n) ? n : String(n), this._raw = /* @__PURE__ */ ee(t);
    let i = !0, o = t;
    if (!B(t) || Pe(this._key) || !Nn(this._key))
      do
        i = !/* @__PURE__ */ Kn(o) || /* @__PURE__ */ Ae(o);
      while (i && (o = o.__v_raw));
    this._shallow = i;
  }
  get value() {
    let t = this._object[this._key];
    return this._shallow && (t = F(t)), this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    if (this._shallow && /* @__PURE__ */ de(this._raw[this._key])) {
      const n = this._object[this._key];
      if (/* @__PURE__ */ de(n)) {
        n.value = t;
        return;
      }
    }
    this._object[this._key] = t;
  }
  get dep() {
    return nr(this._raw, this._key);
  }
}
class kr {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
// @__NO_SIDE_EFFECTS__
function Sr(e, t, n) {
  return /* @__PURE__ */ de(e) ? e : q(e) ? new kr(e) : ne(e) && arguments.length > 1 ? Tr(e, t, n) : /* @__PURE__ */ J(e);
}
function Tr(e, t, n) {
  return new Cr(e, t, n);
}
class Mr {
  constructor(t, n, s) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Ms(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = sn - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = s;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    ae !== this)
      return Hi(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ji(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
// @__NO_SIDE_EFFECTS__
function $r(e, t, n = !1) {
  let s, i;
  return q(e) ? s = e : (s = e.get, i = e.set), new Mr(s, i, n);
}
const vn = {}, Tn = /* @__PURE__ */ new WeakMap();
let wt;
function Ar(e, t = !1, n = wt) {
  if (n) {
    let s = Tn.get(n);
    s || Tn.set(n, s = []), s.push(e);
  }
}
function Er(e, t, n = le) {
  const { immediate: s, deep: i, once: o, scheduler: r, augmentJob: l, call: a } = n, f = (v) => i ? v : /* @__PURE__ */ Ae(v) || i === !1 || i === 0 ? at(v, 1) : at(v);
  let u, h, p, g, A = !1, C = !1;
  if (/* @__PURE__ */ de(e) ? (h = () => e.value, A = /* @__PURE__ */ Ae(e)) : /* @__PURE__ */ Tt(e) ? (h = () => f(e), A = !0) : B(e) ? (C = !0, A = e.some((v) => /* @__PURE__ */ Tt(v) || /* @__PURE__ */ Ae(v)), h = () => e.map((v) => {
    if (/* @__PURE__ */ de(v))
      return v.value;
    if (/* @__PURE__ */ Tt(v))
      return f(v);
    if (q(v))
      return a ? a(v, 2) : v();
  })) : q(e) ? t ? h = a ? () => a(e, 2) : e : h = () => {
    if (p) {
      Qe();
      try {
        p();
      } finally {
        et();
      }
    }
    const v = wt;
    wt = u;
    try {
      return a ? a(e, 3, [g]) : e(g);
    } finally {
      wt = v;
    }
  } : h = Xe, t && i) {
    const v = h, M = i === !0 ? 1 / 0 : i;
    h = () => at(v(), M);
  }
  const E = Qo(), R = () => {
    u.stop(), E && E.active && Cs(E.effects, u);
  };
  if (o && t) {
    const v = t;
    t = (...M) => {
      const Y = v(...M);
      return R(), Y;
    };
  }
  let k = C ? new Array(e.length).fill(vn) : vn;
  const D = (v) => {
    if (!(!(u.flags & 1) || !u.dirty && !v))
      if (t) {
        const M = u.run();
        if (v || i || A || (C ? M.some((Y, I) => Je(Y, k[I])) : Je(M, k))) {
          p && p();
          const Y = wt;
          wt = u;
          try {
            const I = [
              M,
              // pass undefined as the old value when it's changed for the first time
              k === vn ? void 0 : C && k[0] === vn ? [] : k,
              g
            ];
            k = M, a ? a(t, 3, I) : (
              // @ts-expect-error
              t(...I)
            );
          } finally {
            wt = Y;
          }
        }
      } else
        u.run();
  };
  return l && l(D), u = new Fi(h), u.scheduler = r ? () => r(D, !1) : D, g = (v) => Ar(v, !1, u), p = u.onStop = () => {
    const v = Tn.get(u);
    if (v) {
      if (a)
        a(v, 4);
      else
        for (const M of v) M();
      Tn.delete(u);
    }
  }, t ? s ? D(!0) : k = u.run() : r ? r(D.bind(null, !0), !0) : u.run(), R.pause = u.pause.bind(u), R.resume = u.resume.bind(u), R.stop = R, R;
}
function at(e, t = 1 / 0, n) {
  if (t <= 0 || !ne(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Map(), (n.get(e) || 0) >= t))
    return e;
  if (n.set(e, t), t--, /* @__PURE__ */ de(e))
    at(e.value, t, n);
  else if (B(e))
    for (let s = 0; s < e.length; s++)
      at(e[s], t, n);
  else if (Hn(e) || Pt(e))
    e.forEach((s) => {
      at(s, t, n);
    });
  else if (Ei(e)) {
    for (const s in e)
      at(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && at(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function fn(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (i) {
    Un(i, t, n);
  }
}
function Ne(e, t, n, s) {
  if (q(e)) {
    const i = fn(e, t, n, s);
    return i && $i(i) && i.catch((o) => {
      Un(o, t, n);
    }), i;
  }
  if (B(e)) {
    const i = [];
    for (let o = 0; o < e.length; o++)
      i.push(Ne(e[o], t, n, s));
    return i;
  }
}
function Un(e, t, n, s = !0) {
  const i = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: r } = t && t.appContext.config || le;
  if (t) {
    let l = t.parent;
    const a = t.proxy, f = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const u = l.ec;
      if (u) {
        for (let h = 0; h < u.length; h++)
          if (u[h](e, a, f) === !1)
            return;
      }
      l = l.parent;
    }
    if (o) {
      Qe(), fn(o, null, 10, [
        e,
        a,
        f
      ]), et();
      return;
    }
  }
  Rr(e, n, i, s, r);
}
function Rr(e, t, n, s = !0, i = !1) {
  if (i)
    throw e;
  console.error(e);
}
const xe = [];
let Ge = -1;
const Dt = [];
let ht = null, Rt = 0;
const Xi = /* @__PURE__ */ Promise.resolve();
let Mn = null;
function Zi(e) {
  const t = Mn || Xi;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ir(e) {
  let t = Ge + 1, n = xe.length;
  for (; t < n; ) {
    const s = t + n >>> 1, i = xe[s], o = rn(i);
    o < e || o === e && i.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function Es(e) {
  if (!(e.flags & 1)) {
    const t = rn(e), n = xe[xe.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= rn(n) ? xe.push(e) : xe.splice(Ir(t), 0, e), e.flags |= 1, Qi();
  }
}
function Qi() {
  Mn || (Mn = Xi.then(to));
}
function Or(e) {
  B(e) ? Dt.push(...e) : ht && e.id === -1 ? ht.splice(Rt + 1, 0, e) : e.flags & 1 || (Dt.push(e), e.flags |= 1), Qi();
}
function Us(e, t, n = Ge + 1) {
  for (; n < xe.length; n++) {
    const s = xe[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid)
        continue;
      xe.splice(n, 1), n--, s.flags & 4 && (s.flags &= -2), s(), s.flags & 4 || (s.flags &= -2);
    }
  }
}
function eo(e) {
  if (Dt.length) {
    const t = [...new Set(Dt)].sort(
      (n, s) => rn(n) - rn(s)
    );
    if (Dt.length = 0, ht) {
      ht.push(...t);
      return;
    }
    for (ht = t, Rt = 0; Rt < ht.length; Rt++) {
      const n = ht[Rt];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    ht = null, Rt = 0;
  }
}
const rn = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function to(e) {
  try {
    for (Ge = 0; Ge < xe.length; Ge++) {
      const t = xe[Ge];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), fn(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Ge < xe.length; Ge++) {
      const t = xe[Ge];
      t && (t.flags &= -2);
    }
    Ge = -1, xe.length = 0, eo(), Mn = null, (xe.length || Dt.length) && to();
  }
}
let Ie = null, no = null;
function $n(e) {
  const t = Ie;
  return Ie = e, no = e && e.type.__scopeId || null, t;
}
function Pr(e, t = Ie, n) {
  if (!t || e._n)
    return e;
  const s = (...i) => {
    s._d && oi(-1);
    const o = $n(t);
    let r;
    try {
      r = e(...i);
    } finally {
      $n(o), s._d && oi(1);
    }
    return r;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function zs(e, t) {
  if (Ie === null)
    return e;
  const n = Yn(Ie), s = e.dirs || (e.dirs = []);
  for (let i = 0; i < t.length; i++) {
    let [o, r, l, a = le] = t[i];
    o && (q(o) && (o = {
      mounted: o,
      updated: o
    }), o.deep && at(r), s.push({
      dir: o,
      instance: n,
      value: r,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return e;
}
function _t(e, t, n, s) {
  const i = e.dirs, o = t && t.dirs;
  for (let r = 0; r < i.length; r++) {
    const l = i[r];
    o && (l.oldValue = o[r].value);
    let a = l.dir[s];
    a && (Qe(), Ne(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), et());
  }
}
function Dr(e, t) {
  if (ke) {
    let n = ke.provides;
    const s = ke.parent && ke.parent.provides;
    s === n && (n = ke.provides = Object.create(s)), n[e] = t;
  }
}
function xn(e, t, n = !1) {
  const s = Pl();
  if (s || Ft) {
    let i = Ft ? Ft._context.provides : s ? s.parent == null || s.ce ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (i && e in i)
      return i[e];
    if (arguments.length > 1)
      return n && q(t) ? t.call(s && s.proxy) : t;
  }
}
const Fr = /* @__PURE__ */ Symbol.for("v-scx"), Lr = () => xn(Fr);
function mt(e, t, n) {
  return so(e, t, n);
}
function so(e, t, n = le) {
  const { immediate: s, deep: i, flush: o, once: r } = n, l = me({}, n), a = t && s || !t && o !== "post";
  let f;
  if (an) {
    if (o === "sync") {
      const g = Lr();
      f = g.__watcherHandles || (g.__watcherHandles = []);
    } else if (!a) {
      const g = () => {
      };
      return g.stop = Xe, g.resume = Xe, g.pause = Xe, g;
    }
  }
  const u = ke;
  l.call = (g, A, C) => Ne(g, u, A, C);
  let h = !1;
  o === "post" ? l.scheduler = (g) => {
    be(g, u && u.suspense);
  } : o !== "sync" && (h = !0, l.scheduler = (g, A) => {
    A ? g() : Es(g);
  }), l.augmentJob = (g) => {
    t && (g.flags |= 4), h && (g.flags |= 2, u && (g.id = u.uid, g.i = u));
  };
  const p = Er(e, t, l);
  return an && (f ? f.push(p) : a && p()), p;
}
function Hr(e, t, n) {
  const s = this.proxy, i = ue(e) ? e.includes(".") ? io(s, e) : () => s[e] : e.bind(s, s);
  let o;
  q(t) ? o = t : (o = t.handler, n = t);
  const r = hn(this), l = so(i, o.bind(s), n);
  return r(), l;
}
function io(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let i = 0; i < n.length && s; i++)
      s = s[n[i]];
    return s;
  };
}
const dt = /* @__PURE__ */ new WeakMap(), oo = /* @__PURE__ */ Symbol("_vte"), Nr = (e) => e.__isTeleport, Ct = (e) => e && (e.disabled || e.disabled === ""), Wr = (e) => e && (e.defer || e.defer === ""), Gs = (e) => typeof SVGElement < "u" && e instanceof SVGElement, qs = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, hs = (e, t) => {
  const n = e && e.to;
  return ue(n) ? t ? t(n) : null : n;
}, jr = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, s, i, o, r, l, a, f) {
    const {
      mc: u,
      pc: h,
      pbc: p,
      o: { insert: g, querySelector: A, createText: C, createComment: E, parentNode: R }
    } = f, k = Ct(t.props);
    let { dynamicChildren: D } = t;
    const v = (I, N, P) => {
      I.shapeFlag & 16 && u(
        I.children,
        N,
        P,
        i,
        o,
        r,
        l,
        a
      );
    }, M = (I = t) => {
      const N = Ct(I.props), P = I.target = hs(I.props, A), se = ps(P, I, C, g);
      P && (r !== "svg" && Gs(P) ? r = "svg" : r !== "mathml" && qs(P) && (r = "mathml"), i && i.isCE && (i.ce._teleportTargets || (i.ce._teleportTargets = /* @__PURE__ */ new Set())).add(P), N || (v(I, P, se), Gt(I, !1)));
    }, Y = (I) => {
      const N = () => {
        if (dt.get(I) === N) {
          if (dt.delete(I), Ct(I.props)) {
            const P = R(I.el) || n;
            v(I, P, I.anchor), Gt(I, !0);
          }
          M(I);
        }
      };
      dt.set(I, N), be(N, o);
    };
    if (e == null) {
      const I = t.el = C(""), N = t.anchor = C("");
      if (g(I, n, s), g(N, n, s), Wr(t.props) || o && o.pendingBranch) {
        Y(t);
        return;
      }
      k && (v(t, n, N), Gt(t, !0)), M();
    } else {
      t.el = e.el;
      const I = t.anchor = e.anchor, N = dt.get(e);
      if (N) {
        N.flags |= 8, dt.delete(e), Y(t);
        return;
      }
      t.targetStart = e.targetStart;
      const P = t.target = e.target, se = t.targetAnchor = e.targetAnchor, Re = Ct(e.props), Se = Re ? n : P, nt = Re ? I : se;
      if (r === "svg" || Gs(P) ? r = "svg" : (r === "mathml" || qs(P)) && (r = "mathml"), D ? (p(
        e.dynamicChildren,
        D,
        Se,
        i,
        o,
        r,
        l
      ), Ps(e, t, !0)) : a || h(
        e,
        t,
        Se,
        nt,
        i,
        o,
        r,
        l,
        !1
      ), k)
        Re ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : yn(
          t,
          n,
          I,
          f,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const We = hs(t.props, A);
        We && (t.target = We, yn(
          t,
          We,
          null,
          f,
          0
        ));
      } else Re && yn(
        t,
        P,
        se,
        f,
        1
      );
      Gt(t, k);
    }
  },
  remove(e, t, n, { um: s, o: { remove: i } }, o) {
    const {
      shapeFlag: r,
      children: l,
      anchor: a,
      targetStart: f,
      targetAnchor: u,
      target: h,
      props: p
    } = e, g = Ct(p), A = o || !g, C = dt.get(e);
    if (C && (C.flags |= 8, dt.delete(e)), h && (i(f), i(u)), o && i(a), !C && (g || h) && r & 16)
      for (let E = 0; E < l.length; E++) {
        const R = l[E];
        s(
          R,
          t,
          n,
          A,
          !!R.dynamicChildren
        );
      }
  },
  move: yn,
  hydrate: Vr
};
function yn(e, t, n, { o: { insert: s }, m: i }, o = 2) {
  o === 0 && s(e.targetAnchor, t, n);
  const { el: r, anchor: l, shapeFlag: a, children: f, props: u } = e, h = o === 2;
  if (h && s(r, t, n), !dt.has(e) && (!h || Ct(u)) && a & 16)
    for (let p = 0; p < f.length; p++)
      i(
        f[p],
        t,
        n,
        2
      );
  h && s(l, t, n);
}
function Vr(e, t, n, s, i, o, {
  o: { nextSibling: r, parentNode: l, querySelector: a, insert: f, createText: u }
}, h) {
  function p(E, R) {
    let k = R;
    for (; k; ) {
      if (k && k.nodeType === 8) {
        if (k.data === "teleport start anchor")
          t.targetStart = k;
        else if (k.data === "teleport anchor") {
          t.targetAnchor = k, E._lpa = t.targetAnchor && r(t.targetAnchor);
          break;
        }
      }
      k = r(k);
    }
  }
  function g(E, R) {
    R.anchor = h(
      r(E),
      R,
      l(E),
      n,
      s,
      i,
      o
    );
  }
  const A = t.target = hs(
    t.props,
    a
  ), C = Ct(t.props);
  if (A) {
    const E = A._lpa || A.firstChild;
    t.shapeFlag & 16 && (C ? (g(e, t), p(A, E), t.targetAnchor || ps(
      A,
      t,
      u,
      f,
      // if target is the same as the main view, insert anchors before current node
      // to avoid hydrating mismatch
      l(e) === A ? e : null
    )) : (t.anchor = r(e), p(A, E), t.targetAnchor || ps(A, t, u, f), h(
      E && r(E),
      t,
      A,
      n,
      s,
      i,
      o
    ))), Gt(t, C);
  } else C && t.shapeFlag & 16 && (g(e, t), t.targetStart = e, t.targetAnchor = r(e));
  return t.anchor && r(t.anchor);
}
const ro = jr;
function Gt(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let s, i;
    for (t ? (s = e.el, i = e.anchor) : (s = e.targetStart, i = e.targetAnchor); s && s !== i; )
      s.nodeType === 1 && s.setAttribute("data-v-owner", n.uid), s = s.nextSibling;
    n.ut();
  }
}
function ps(e, t, n, s, i = null) {
  const o = t.targetStart = n(""), r = t.targetAnchor = n("");
  return o[oo] = r, e && (s(o, e, i), s(r, e, i)), r;
}
const ns = /* @__PURE__ */ Symbol("_leaveCb");
function Rs(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Rs(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
// @__NO_SIDE_EFFECTS__
function tt(e, t) {
  return q(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    me({ name: e.name }, t, { setup: e })
  ) : e;
}
function lo(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Ys(e, t) {
  let n;
  return !!((n = Object.getOwnPropertyDescriptor(e, t)) && !n.configurable);
}
const An = /* @__PURE__ */ new WeakMap();
function Qt(e, t, n, s, i = !1) {
  if (B(e)) {
    e.forEach(
      (C, E) => Qt(
        C,
        t && (B(t) ? t[E] : t),
        n,
        s,
        i
      )
    );
    return;
  }
  if (en(s) && !i) {
    s.shapeFlag & 512 && s.type.__asyncResolved && s.component.subTree.component && Qt(e, t, n, s.component.subTree);
    return;
  }
  const o = s.shapeFlag & 4 ? Yn(s.component) : s.el, r = i ? null : o, { i: l, r: a } = e, f = t && t.r, u = l.refs === le ? l.refs = {} : l.refs, h = l.setupState, p = /* @__PURE__ */ ee(h), g = h === le ? Mi : (C) => Ys(u, C) ? !1 : te(p, C), A = (C, E) => !(E && Ys(u, E));
  if (f != null && f !== a) {
    if (Js(t), ue(f))
      u[f] = null, g(f) && (h[f] = null);
    else if (/* @__PURE__ */ de(f)) {
      const C = t;
      A(f, C.k) && (f.value = null), C.k && (u[C.k] = null);
    }
  }
  if (q(a)) {
    Qe();
    try {
      fn(a, l, 12, [r, u]);
    } finally {
      et();
    }
  } else {
    const C = ue(a), E = /* @__PURE__ */ de(a);
    if (C || E) {
      const R = () => {
        if (e.f) {
          const k = C ? g(a) ? h[a] : u[a] : A() || !e.k ? a.value : u[e.k];
          if (i)
            B(k) && Cs(k, o);
          else if (B(k))
            k.includes(o) || k.push(o);
          else if (C)
            u[a] = [o], g(a) && (h[a] = u[a]);
          else {
            const D = [o];
            A(a, e.k) && (a.value = D), e.k && (u[e.k] = D);
          }
        } else C ? (u[a] = r, g(a) && (h[a] = r)) : E && (A(a, e.k) && (a.value = r), e.k && (u[e.k] = r));
      };
      if (r) {
        const k = () => {
          R(), An.delete(e);
        };
        k.id = -1, An.set(e, k), be(k, n);
      } else
        Js(e), R();
    }
  }
}
function Js(e) {
  const t = An.get(e);
  t && (t.flags |= 8, An.delete(e));
}
Vn().requestIdleCallback;
Vn().cancelIdleCallback;
const en = (e) => !!e.type.__asyncLoader, ao = (e) => e.type.__isKeepAlive;
function Br(e, t) {
  co(e, "a", t);
}
function Kr(e, t) {
  co(e, "da", t);
}
function co(e, t, n = ke) {
  const s = e.__wdc || (e.__wdc = () => {
    let i = n;
    for (; i; ) {
      if (i.isDeactivated)
        return;
      i = i.parent;
    }
    return e();
  });
  if (zn(t, s, n), n) {
    let i = n.parent;
    for (; i && i.parent; )
      ao(i.parent.vnode) && Ur(s, t, n, i), i = i.parent;
  }
}
function Ur(e, t, n, s) {
  const i = zn(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  yt(() => {
    Cs(s[t], i);
  }, n);
}
function zn(e, t, n = ke, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...r) => {
      Qe();
      const l = hn(n), a = Ne(t, n, e, r);
      return l(), et(), a;
    });
    return s ? i.unshift(o) : i.push(o), o;
  }
}
const ut = (e) => (t, n = ke) => {
  (!an || e === "sp") && zn(e, (...s) => t(...s), n);
}, zr = ut("bm"), Wt = ut("m"), Gr = ut(
  "bu"
), qr = ut("u"), Yr = ut(
  "bum"
), yt = ut("um"), Jr = ut(
  "sp"
), Xr = ut("rtg"), Zr = ut("rtc");
function Qr(e, t = ke) {
  zn("ec", e, t);
}
const el = /* @__PURE__ */ Symbol.for("v-ndc");
function dn(e, t, n, s) {
  let i;
  const o = n, r = B(e);
  if (r || ue(e)) {
    const l = r && /* @__PURE__ */ Tt(e);
    let a = !1, f = !1;
    l && (a = !/* @__PURE__ */ Ae(e), f = /* @__PURE__ */ ct(e), e = Bn(e)), i = new Array(e.length);
    for (let u = 0, h = e.length; u < h; u++)
      i[u] = t(
        a ? f ? Ht(He(e[u])) : He(e[u]) : e[u],
        u,
        void 0,
        o
      );
  } else if (typeof e == "number") {
    i = new Array(e);
    for (let l = 0; l < e; l++)
      i[l] = t(l + 1, l, void 0, o);
  } else if (ne(e))
    if (e[Symbol.iterator])
      i = Array.from(
        e,
        (l, a) => t(l, a, void 0, o)
      );
    else {
      const l = Object.keys(e);
      i = new Array(l.length);
      for (let a = 0, f = l.length; a < f; a++) {
        const u = l[a];
        i[a] = t(e[u], u, a, o);
      }
    }
  else
    i = [];
  return i;
}
const gs = (e) => e ? Eo(e) ? Yn(e) : gs(e.parent) : null, tn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ me(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => gs(e.parent),
    $root: (e) => gs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => fo(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Es(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Zi.bind(e.proxy)),
    $watch: (e) => Hr.bind(e)
  })
), ss = (e, t) => e !== le && !e.__isScriptSetup && te(e, t), tl = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: i, props: o, accessCache: r, type: l, appContext: a } = e;
    if (t[0] !== "$") {
      const p = r[t];
      if (p !== void 0)
        switch (p) {
          case 1:
            return s[t];
          case 2:
            return i[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (ss(s, t))
          return r[t] = 1, s[t];
        if (i !== le && te(i, t))
          return r[t] = 2, i[t];
        if (te(o, t))
          return r[t] = 3, o[t];
        if (n !== le && te(n, t))
          return r[t] = 4, n[t];
        ms && (r[t] = 0);
      }
    }
    const f = tn[t];
    let u, h;
    if (f)
      return t === "$attrs" && ve(e.attrs, "get", ""), f(e);
    if (
      // css module (injected by vue-loader)
      (u = l.__cssModules) && (u = u[t])
    )
      return u;
    if (n !== le && te(n, t))
      return r[t] = 4, n[t];
    if (
      // global properties
      h = a.config.globalProperties, te(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: i, ctx: o } = e;
    return ss(i, t) ? (i[t] = n, !0) : s !== le && te(s, t) ? (s[t] = n, !0) : te(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: i, props: o, type: r }
  }, l) {
    let a;
    return !!(n[l] || e !== le && l[0] !== "$" && te(e, l) || ss(t, l) || te(o, l) || te(s, l) || te(tn, l) || te(i.config.globalProperties, l) || (a = r.__cssModules) && a[l]);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : te(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Xs(e) {
  return B(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let ms = !0;
function nl(e) {
  const t = fo(e), n = e.proxy, s = e.ctx;
  ms = !1, t.beforeCreate && Zs(t.beforeCreate, e, "bc");
  const {
    // state
    data: i,
    computed: o,
    methods: r,
    watch: l,
    provide: a,
    inject: f,
    // lifecycle
    created: u,
    beforeMount: h,
    mounted: p,
    beforeUpdate: g,
    updated: A,
    activated: C,
    deactivated: E,
    beforeDestroy: R,
    beforeUnmount: k,
    destroyed: D,
    unmounted: v,
    render: M,
    renderTracked: Y,
    renderTriggered: I,
    errorCaptured: N,
    serverPrefetch: P,
    // public API
    expose: se,
    inheritAttrs: Re,
    // assets
    components: Se,
    directives: nt,
    filters: We
  } = t;
  if (f && sl(f, s, null), r)
    for (const ce in r) {
      const ie = r[ce];
      q(ie) && (s[ce] = ie.bind(n));
    }
  if (i) {
    const ce = i.call(n, n);
    ne(ce) && (e.data = /* @__PURE__ */ Mt(ce));
  }
  if (ms = !0, o)
    for (const ce in o) {
      const ie = o[ce], st = q(ie) ? ie.bind(n, n) : q(ie.get) ? ie.get.bind(n, n) : Xe, je = !q(ie) && q(ie.set) ? ie.set.bind(n) : Xe, Ve = Z({
        get: st,
        set: je
      });
      Object.defineProperty(s, ce, {
        enumerable: !0,
        configurable: !0,
        get: () => Ve.value,
        set: (L) => Ve.value = L
      });
    }
  if (l)
    for (const ce in l)
      uo(l[ce], s, n, ce);
  if (a) {
    const ce = q(a) ? a.call(n) : a;
    Reflect.ownKeys(ce).forEach((ie) => {
      Dr(ie, ce[ie]);
    });
  }
  u && Zs(u, e, "c");
  function he(ce, ie) {
    B(ie) ? ie.forEach((st) => ce(st.bind(n))) : ie && ce(ie.bind(n));
  }
  if (he(zr, h), he(Wt, p), he(Gr, g), he(qr, A), he(Br, C), he(Kr, E), he(Qr, N), he(Zr, Y), he(Xr, I), he(Yr, k), he(yt, v), he(Jr, P), B(se))
    if (se.length) {
      const ce = e.exposed || (e.exposed = {});
      se.forEach((ie) => {
        Object.defineProperty(ce, ie, {
          get: () => n[ie],
          set: (st) => n[ie] = st,
          enumerable: !0
        });
      });
    } else e.exposed || (e.exposed = {});
  M && e.render === Xe && (e.render = M), Re != null && (e.inheritAttrs = Re), Se && (e.components = Se), nt && (e.directives = nt), P && lo(e);
}
function sl(e, t, n = Xe) {
  B(e) && (e = vs(e));
  for (const s in e) {
    const i = e[s];
    let o;
    ne(i) ? "default" in i ? o = xn(
      i.from || s,
      i.default,
      !0
    ) : o = xn(i.from || s) : o = xn(i), /* @__PURE__ */ de(o) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (r) => o.value = r
    }) : t[s] = o;
  }
}
function Zs(e, t, n) {
  Ne(
    B(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function uo(e, t, n, s) {
  let i = s.includes(".") ? io(n, s) : () => n[s];
  if (ue(e)) {
    const o = t[e];
    q(o) && mt(i, o);
  } else if (q(e))
    mt(i, e.bind(n));
  else if (ne(e))
    if (B(e))
      e.forEach((o) => uo(o, t, n, s));
    else {
      const o = q(e.handler) ? e.handler.bind(n) : t[e.handler];
      q(o) && mt(i, o, e);
    }
}
function fo(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: i,
    optionsCache: o,
    config: { optionMergeStrategies: r }
  } = e.appContext, l = o.get(t);
  let a;
  return l ? a = l : !i.length && !n && !s ? a = t : (a = {}, i.length && i.forEach(
    (f) => En(a, f, r, !0)
  ), En(a, t, r)), ne(t) && o.set(t, a), a;
}
function En(e, t, n, s = !1) {
  const { mixins: i, extends: o } = t;
  o && En(e, o, n, !0), i && i.forEach(
    (r) => En(e, r, n, !0)
  );
  for (const r in t)
    if (!(s && r === "expose")) {
      const l = il[r] || n && n[r];
      e[r] = l ? l(e[r], t[r]) : t[r];
    }
  return e;
}
const il = {
  data: Qs,
  props: ei,
  emits: ei,
  // objects
  methods: qt,
  computed: qt,
  // lifecycle
  beforeCreate: _e,
  created: _e,
  beforeMount: _e,
  mounted: _e,
  beforeUpdate: _e,
  updated: _e,
  beforeDestroy: _e,
  beforeUnmount: _e,
  destroyed: _e,
  unmounted: _e,
  activated: _e,
  deactivated: _e,
  errorCaptured: _e,
  serverPrefetch: _e,
  // assets
  components: qt,
  directives: qt,
  // watch
  watch: rl,
  // provide / inject
  provide: Qs,
  inject: ol
};
function Qs(e, t) {
  return t ? e ? function() {
    return me(
      q(e) ? e.call(this, this) : e,
      q(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function ol(e, t) {
  return qt(vs(e), vs(t));
}
function vs(e) {
  if (B(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function _e(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function qt(e, t) {
  return e ? me(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ei(e, t) {
  return e ? B(e) && B(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : me(
    /* @__PURE__ */ Object.create(null),
    Xs(e),
    Xs(t ?? {})
  ) : t;
}
function rl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = me(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = _e(e[s], t[s]);
  return n;
}
function ho() {
  return {
    app: null,
    config: {
      isNativeTag: Mi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let ll = 0;
function al(e, t) {
  return function(s, i = null) {
    q(s) || (s = me({}, s)), i != null && !ne(i) && (i = null);
    const o = ho(), r = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const f = o.app = {
      _uid: ll++,
      _component: s,
      _props: i,
      _container: null,
      _context: o,
      _instance: null,
      version: Wl,
      get config() {
        return o.config;
      },
      set config(u) {
      },
      use(u, ...h) {
        return r.has(u) || (u && q(u.install) ? (r.add(u), u.install(f, ...h)) : q(u) && (r.add(u), u(f, ...h))), f;
      },
      mixin(u) {
        return o.mixins.includes(u) || o.mixins.push(u), f;
      },
      component(u, h) {
        return h ? (o.components[u] = h, f) : o.components[u];
      },
      directive(u, h) {
        return h ? (o.directives[u] = h, f) : o.directives[u];
      },
      mount(u, h, p) {
        if (!a) {
          const g = f._ceVNode || Ee(s, i);
          return g.appContext = o, p === !0 ? p = "svg" : p === !1 && (p = void 0), e(g, u, p), a = !0, f._container = u, u.__vue_app__ = f, Yn(g.component);
        }
      },
      onUnmount(u) {
        l.push(u);
      },
      unmount() {
        a && (Ne(
          l,
          f._instance,
          16
        ), e(null, f._container), delete f._container.__vue_app__);
      },
      provide(u, h) {
        return o.provides[u] = h, f;
      },
      runWithContext(u) {
        const h = Ft;
        Ft = f;
        try {
          return u();
        } finally {
          Ft = h;
        }
      }
    };
    return f;
  };
}
let Ft = null;
const cl = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Fe(t)}Modifiers`] || e[`${$t(t)}Modifiers`];
function ul(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || le;
  let i = n;
  const o = t.startsWith("update:"), r = o && cl(s, t.slice(7));
  r && (r.trim && (i = n.map((u) => ue(u) ? u.trim() : u)), r.number && (i = n.map(jn)));
  let l, a = s[l = Xn(t)] || // also try camelCase event handler (#2249)
  s[l = Xn(Fe(t))];
  !a && o && (a = s[l = Xn($t(t))]), a && Ne(
    a,
    e,
    6,
    i
  );
  const f = s[l + "Once"];
  if (f) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Ne(
      f,
      e,
      6,
      i
    );
  }
}
const fl = /* @__PURE__ */ new WeakMap();
function po(e, t, n = !1) {
  const s = n ? fl : t.emitsCache, i = s.get(e);
  if (i !== void 0)
    return i;
  const o = e.emits;
  let r = {}, l = !1;
  if (!q(e)) {
    const a = (f) => {
      const u = po(f, t, !0);
      u && (l = !0, me(r, u));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !o && !l ? (ne(e) && s.set(e, null), null) : (B(o) ? o.forEach((a) => r[a] = null) : me(r, o), ne(e) && s.set(e, r), r);
}
function Gn(e, t) {
  return !e || !Fn(t) ? !1 : (t = t.slice(2), t = t === "Once" ? t : t.replace(/Once$/, ""), te(e, t[0].toLowerCase() + t.slice(1)) || te(e, $t(t)) || te(e, t));
}
function ti(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: i,
    propsOptions: [o],
    slots: r,
    attrs: l,
    emit: a,
    render: f,
    renderCache: u,
    props: h,
    data: p,
    setupState: g,
    ctx: A,
    inheritAttrs: C
  } = e, E = $n(e);
  let R, k;
  try {
    if (n.shapeFlag & 4) {
      const v = i || s, M = v;
      R = Ye(
        f.call(
          M,
          v,
          u,
          h,
          g,
          p,
          A
        )
      ), k = l;
    } else {
      const v = t;
      R = Ye(
        v.length > 1 ? v(
          h,
          { attrs: l, slots: r, emit: a }
        ) : v(
          h,
          null
        )
      ), k = t.props ? l : dl(l);
    }
  } catch (v) {
    nn.length = 0, Un(v, e, 1), R = Ee(vt);
  }
  let D = R;
  if (k && C !== !1) {
    const v = Object.keys(k), { shapeFlag: M } = D;
    v.length && M & 7 && (o && v.some(Ln) && (k = hl(
      k,
      o
    )), D = Nt(D, k, !1, !0));
  }
  return n.dirs && (D = Nt(D, null, !1, !0), D.dirs = D.dirs ? D.dirs.concat(n.dirs) : n.dirs), n.transition && Rs(D, n.transition), R = D, $n(E), R;
}
const dl = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Fn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, hl = (e, t) => {
  const n = {};
  for (const s in e)
    (!Ln(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function pl(e, t, n) {
  const { props: s, children: i, component: o } = e, { props: r, children: l, patchFlag: a } = t, f = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return s ? ni(s, r, f) : !!r;
    if (a & 8) {
      const u = t.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        const p = u[h];
        if (go(r, s, p) && !Gn(f, p))
          return !0;
      }
    }
  } else
    return (i || l) && (!l || !l.$stable) ? !0 : s === r ? !1 : s ? r ? ni(s, r, f) : !0 : !!r;
  return !1;
}
function ni(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let i = 0; i < s.length; i++) {
    const o = s[i];
    if (go(t, e, o) && !Gn(n, o))
      return !0;
  }
  return !1;
}
function go(e, t, n) {
  const s = e[n], i = t[n];
  return n === "style" && ne(s) && ne(i) ? !un(s, i) : s !== i;
}
function gl({ vnode: e, parent: t, suspense: n }, s) {
  for (; t; ) {
    const i = t.subTree;
    if (i.suspense && i.suspense.activeBranch === e && (i.suspense.vnode.el = i.el = s, e = i), i === e)
      (e = t.vnode).el = s, t = t.parent;
    else
      break;
  }
  n && n.activeBranch === e && (n.vnode.el = s);
}
const mo = {}, vo = () => Object.create(mo), yo = (e) => Object.getPrototypeOf(e) === mo;
function ml(e, t, n, s = !1) {
  const i = {}, o = vo();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), _o(e, t, i, o);
  for (const r in e.propsOptions[0])
    r in i || (i[r] = void 0);
  n ? e.props = s ? i : /* @__PURE__ */ yr(i) : e.type.props ? e.props = i : e.props = o, e.attrs = o;
}
function vl(e, t, n, s) {
  const {
    props: i,
    attrs: o,
    vnode: { patchFlag: r }
  } = e, l = /* @__PURE__ */ ee(i), [a] = e.propsOptions;
  let f = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const u = e.vnode.dynamicProps;
      for (let h = 0; h < u.length; h++) {
        let p = u[h];
        if (Gn(e.emitsOptions, p))
          continue;
        const g = t[p];
        if (a)
          if (te(o, p))
            g !== o[p] && (o[p] = g, f = !0);
          else {
            const A = Fe(p);
            i[A] = ys(
              a,
              l,
              A,
              g,
              e,
              !1
            );
          }
        else
          g !== o[p] && (o[p] = g, f = !0);
      }
    }
  } else {
    _o(e, t, i, o) && (f = !0);
    let u;
    for (const h in l)
      (!t || // for camelCase
      !te(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((u = $t(h)) === h || !te(t, u))) && (a ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[u] !== void 0) && (i[h] = ys(
        a,
        l,
        h,
        void 0,
        e,
        !0
      )) : delete i[h]);
    if (o !== l)
      for (const h in o)
        (!t || !te(t, h)) && (delete o[h], f = !0);
  }
  f && lt(e.attrs, "set", "");
}
function _o(e, t, n, s) {
  const [i, o] = e.propsOptions;
  let r = !1, l;
  if (t)
    for (let a in t) {
      if (Jt(a))
        continue;
      const f = t[a];
      let u;
      i && te(i, u = Fe(a)) ? !o || !o.includes(u) ? n[u] = f : (l || (l = {}))[u] = f : Gn(e.emitsOptions, a) || (!(a in s) || f !== s[a]) && (s[a] = f, r = !0);
    }
  if (o) {
    const a = /* @__PURE__ */ ee(n), f = l || le;
    for (let u = 0; u < o.length; u++) {
      const h = o[u];
      n[h] = ys(
        i,
        a,
        h,
        f[h],
        e,
        !te(f, h)
      );
    }
  }
  return r;
}
function ys(e, t, n, s, i, o) {
  const r = e[n];
  if (r != null) {
    const l = te(r, "default");
    if (l && s === void 0) {
      const a = r.default;
      if (r.type !== Function && !r.skipFactory && q(a)) {
        const { propsDefaults: f } = i;
        if (n in f)
          s = f[n];
        else {
          const u = hn(i);
          s = f[n] = a.call(
            null,
            t
          ), u();
        }
      } else
        s = a;
      i.ce && i.ce._setProp(n, s);
    }
    r[
      0
      /* shouldCast */
    ] && (o && !l ? s = !1 : r[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === $t(n)) && (s = !0));
  }
  return s;
}
const yl = /* @__PURE__ */ new WeakMap();
function bo(e, t, n = !1) {
  const s = n ? yl : t.propsCache, i = s.get(e);
  if (i)
    return i;
  const o = e.props, r = {}, l = [];
  let a = !1;
  if (!q(e)) {
    const u = (h) => {
      a = !0;
      const [p, g] = bo(h, t, !0);
      me(r, p), g && l.push(...g);
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  if (!o && !a)
    return ne(e) && s.set(e, Ot), Ot;
  if (B(o))
    for (let u = 0; u < o.length; u++) {
      const h = Fe(o[u]);
      si(h) && (r[h] = le);
    }
  else if (o)
    for (const u in o) {
      const h = Fe(u);
      if (si(h)) {
        const p = o[u], g = r[h] = B(p) || q(p) ? { type: p } : me({}, p), A = g.type;
        let C = !1, E = !0;
        if (B(A))
          for (let R = 0; R < A.length; ++R) {
            const k = A[R], D = q(k) && k.name;
            if (D === "Boolean") {
              C = !0;
              break;
            } else D === "String" && (E = !1);
          }
        else
          C = q(A) && A.name === "Boolean";
        g[
          0
          /* shouldCast */
        ] = C, g[
          1
          /* shouldCastTrue */
        ] = E, (C || te(g, "default")) && l.push(h);
      }
    }
  const f = [r, l];
  return ne(e) && s.set(e, f), f;
}
function si(e) {
  return e[0] !== "$" && !Jt(e);
}
const Is = (e) => e === "_" || e === "_ctx" || e === "$stable", Os = (e) => B(e) ? e.map(Ye) : [Ye(e)], _l = (e, t, n) => {
  if (t._n)
    return t;
  const s = Pr((...i) => Os(t(...i)), n);
  return s._c = !1, s;
}, wo = (e, t, n) => {
  const s = e._ctx;
  for (const i in e) {
    if (Is(i)) continue;
    const o = e[i];
    if (q(o))
      t[i] = _l(i, o, s);
    else if (o != null) {
      const r = Os(o);
      t[i] = () => r;
    }
  }
}, xo = (e, t) => {
  const n = Os(t);
  e.slots.default = () => n;
}, Co = (e, t, n) => {
  for (const s in t)
    (n || !Is(s)) && (e[s] = t[s]);
}, bl = (e, t, n) => {
  const s = e.slots = vo();
  if (e.vnode.shapeFlag & 32) {
    const i = t._;
    i ? (Co(s, t, n), n && Ii(s, "_", i, !0)) : wo(t, s);
  } else t && xo(e, t);
}, wl = (e, t, n) => {
  const { vnode: s, slots: i } = e;
  let o = !0, r = le;
  if (s.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? o = !1 : Co(i, t, n) : (o = !t.$stable, wo(t, i)), r = t;
  } else t && (xo(e, t), r = { default: 1 });
  if (o)
    for (const l in i)
      !Is(l) && r[l] == null && delete i[l];
}, be = Tl;
function xl(e) {
  return Cl(e);
}
function Cl(e, t) {
  const n = Vn();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: i,
    patchProp: o,
    createElement: r,
    createText: l,
    createComment: a,
    setText: f,
    setElementText: u,
    parentNode: h,
    nextSibling: p,
    setScopeId: g = Xe,
    insertStaticContent: A
  } = e, C = (c, d, m, w = null, b = null, y = null, $ = void 0, T = null, S = !!d.dynamicChildren) => {
    if (c === d)
      return;
    c && !zt(c, d) && (w = pn(c), L(c, b, y, !0), c = null), d.patchFlag === -2 && (S = !1, d.dynamicChildren = null);
    const { type: _, ref: j, shapeFlag: O } = d;
    switch (_) {
      case qn:
        E(c, d, m, w);
        break;
      case vt:
        R(c, d, m, w);
        break;
      case Cn:
        c == null && k(d, m, w, $);
        break;
      case Ce:
        Se(
          c,
          d,
          m,
          w,
          b,
          y,
          $,
          T,
          S
        );
        break;
      default:
        O & 1 ? M(
          c,
          d,
          m,
          w,
          b,
          y,
          $,
          T,
          S
        ) : O & 6 ? nt(
          c,
          d,
          m,
          w,
          b,
          y,
          $,
          T,
          S
        ) : (O & 64 || O & 128) && _.process(
          c,
          d,
          m,
          w,
          b,
          y,
          $,
          T,
          S,
          Bt
        );
    }
    j != null && b ? Qt(j, c && c.ref, y, d || c, !d) : j == null && c && c.ref != null && Qt(c.ref, null, y, c, !0);
  }, E = (c, d, m, w) => {
    if (c == null)
      s(
        d.el = l(d.children),
        m,
        w
      );
    else {
      const b = d.el = c.el;
      d.children !== c.children && f(b, d.children);
    }
  }, R = (c, d, m, w) => {
    c == null ? s(
      d.el = a(d.children || ""),
      m,
      w
    ) : d.el = c.el;
  }, k = (c, d, m, w) => {
    [c.el, c.anchor] = A(
      c.children,
      d,
      m,
      w,
      c.el,
      c.anchor
    );
  }, D = ({ el: c, anchor: d }, m, w) => {
    let b;
    for (; c && c !== d; )
      b = p(c), s(c, m, w), c = b;
    s(d, m, w);
  }, v = ({ el: c, anchor: d }) => {
    let m;
    for (; c && c !== d; )
      m = p(c), i(c), c = m;
    i(d);
  }, M = (c, d, m, w, b, y, $, T, S) => {
    if (d.type === "svg" ? $ = "svg" : d.type === "math" && ($ = "mathml"), c == null)
      Y(
        d,
        m,
        w,
        b,
        y,
        $,
        T,
        S
      );
    else {
      const _ = c.el && c.el._isVueCE ? c.el : null;
      try {
        _ && _._beginPatch(), P(
          c,
          d,
          b,
          y,
          $,
          T,
          S
        );
      } finally {
        _ && _._endPatch();
      }
    }
  }, Y = (c, d, m, w, b, y, $, T) => {
    let S, _;
    const { props: j, shapeFlag: O, transition: W, dirs: K } = c;
    if (S = c.el = r(
      c.type,
      y,
      j && j.is,
      j
    ), O & 8 ? u(S, c.children) : O & 16 && N(
      c.children,
      S,
      null,
      w,
      b,
      is(c, y),
      $,
      T
    ), K && _t(c, null, w, "created"), I(S, c, c.scopeId, $, w), j) {
      for (const re in j)
        re !== "value" && !Jt(re) && o(S, re, null, j[re], y, w);
      "value" in j && o(S, "value", null, j.value, y), (_ = j.onVnodeBeforeMount) && ze(_, w, c);
    }
    K && _t(c, null, w, "beforeMount");
    const Q = kl(b, W);
    Q && W.beforeEnter(S), s(S, d, m), ((_ = j && j.onVnodeMounted) || Q || K) && be(() => {
      try {
        _ && ze(_, w, c), Q && W.enter(S), K && _t(c, null, w, "mounted");
      } finally {
      }
    }, b);
  }, I = (c, d, m, w, b) => {
    if (m && g(c, m), w)
      for (let y = 0; y < w.length; y++)
        g(c, w[y]);
    if (b) {
      let y = b.subTree;
      if (d === y || To(y.type) && (y.ssContent === d || y.ssFallback === d)) {
        const $ = b.vnode;
        I(
          c,
          $,
          $.scopeId,
          $.slotScopeIds,
          b.parent
        );
      }
    }
  }, N = (c, d, m, w, b, y, $, T, S = 0) => {
    for (let _ = S; _ < c.length; _++) {
      const j = c[_] = T ? rt(c[_]) : Ye(c[_]);
      C(
        null,
        j,
        d,
        m,
        w,
        b,
        y,
        $,
        T
      );
    }
  }, P = (c, d, m, w, b, y, $) => {
    const T = d.el = c.el;
    let { patchFlag: S, dynamicChildren: _, dirs: j } = d;
    S |= c.patchFlag & 16;
    const O = c.props || le, W = d.props || le;
    let K;
    if (m && bt(m, !1), (K = W.onVnodeBeforeUpdate) && ze(K, m, d, c), j && _t(d, c, m, "beforeUpdate"), m && bt(m, !0), // #6385 the old vnode may be a user-wrapped non-isomorphic block
    // Force full diff when block metadata is unstable.
    _ && (!c.dynamicChildren || c.dynamicChildren.length !== _.length) && (S = 0, $ = !1, _ = null), (O.innerHTML && W.innerHTML == null || O.textContent && W.textContent == null) && u(T, ""), _ ? se(
      c.dynamicChildren,
      _,
      T,
      m,
      w,
      is(d, b),
      y
    ) : $ || ie(
      c,
      d,
      T,
      null,
      m,
      w,
      is(d, b),
      y,
      !1
    ), S > 0) {
      if (S & 16)
        Re(T, O, W, m, b);
      else if (S & 2 && O.class !== W.class && o(T, "class", null, W.class, b), S & 4 && o(T, "style", O.style, W.style, b), S & 8) {
        const Q = d.dynamicProps;
        for (let re = 0; re < Q.length; re++) {
          const oe = Q[re], fe = O[oe], pe = W[oe];
          (pe !== fe || oe === "value") && o(T, oe, fe, pe, b, m);
        }
      }
      S & 1 && c.children !== d.children && u(T, d.children);
    } else !$ && _ == null && Re(T, O, W, m, b);
    ((K = W.onVnodeUpdated) || j) && be(() => {
      K && ze(K, m, d, c), j && _t(d, c, m, "updated");
    }, w);
  }, se = (c, d, m, w, b, y, $) => {
    for (let T = 0; T < d.length; T++) {
      const S = c[T], _ = d[T], j = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        S.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (S.type === Ce || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !zt(S, _) || // - In the case of a component, it could contain anything.
        S.shapeFlag & 198) ? h(S.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      C(
        S,
        _,
        j,
        null,
        w,
        b,
        y,
        $,
        !0
      );
    }
  }, Re = (c, d, m, w, b) => {
    if (d !== m) {
      if (d !== le)
        for (const y in d)
          !Jt(y) && !(y in m) && o(
            c,
            y,
            d[y],
            null,
            b,
            w
          );
      for (const y in m) {
        if (Jt(y)) continue;
        const $ = m[y], T = d[y];
        $ !== T && y !== "value" && o(c, y, T, $, b, w);
      }
      "value" in m && o(c, "value", d.value, m.value, b);
    }
  }, Se = (c, d, m, w, b, y, $, T, S) => {
    const _ = d.el = c ? c.el : l(""), j = d.anchor = c ? c.anchor : l("");
    let { patchFlag: O, dynamicChildren: W, slotScopeIds: K } = d;
    K && (T = T ? T.concat(K) : K), c == null ? (s(_, m, w), s(j, m, w), N(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      d.children || [],
      m,
      j,
      b,
      y,
      $,
      T,
      S
    )) : O > 0 && O & 64 && W && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    c.dynamicChildren && c.dynamicChildren.length === W.length ? (se(
      c.dynamicChildren,
      W,
      m,
      b,
      y,
      $,
      T
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (d.key != null || b && d === b.subTree) && Ps(
      c,
      d,
      !0
      /* shallow */
    )) : ie(
      c,
      d,
      m,
      j,
      b,
      y,
      $,
      T,
      S
    );
  }, nt = (c, d, m, w, b, y, $, T, S) => {
    d.slotScopeIds = T, c == null ? d.shapeFlag & 512 ? b.ctx.activate(
      d,
      m,
      w,
      $,
      S
    ) : We(
      d,
      m,
      w,
      b,
      y,
      $,
      S
    ) : jt(c, d, S);
  }, We = (c, d, m, w, b, y, $) => {
    const T = c.component = Ol(
      c,
      w,
      b
    );
    if (ao(c) && (T.ctx.renderer = Bt), Dl(T, !1, $), T.asyncDep) {
      if (b && b.registerDep(T, he, $), !c.el) {
        const S = T.subTree = Ee(vt);
        R(null, S, d, m), c.placeholder = S.el;
      }
    } else
      he(
        T,
        c,
        d,
        m,
        b,
        y,
        $
      );
  }, jt = (c, d, m) => {
    const w = d.component = c.component;
    if (pl(c, d, m))
      if (w.asyncDep && !w.asyncResolved) {
        ce(w, d, m);
        return;
      } else
        w.next = d, w.update();
    else
      d.el = c.el, w.vnode = d;
  }, he = (c, d, m, w, b, y, $) => {
    const T = () => {
      if (c.isMounted) {
        let { next: O, bu: W, u: K, parent: Q, vnode: re } = c;
        {
          const Ke = ko(c);
          if (Ke) {
            O && (O.el = re.el, ce(c, O, $)), Ke.asyncDep.then(() => {
              be(() => {
                c.isUnmounted || _();
              }, b);
            });
            return;
          }
        }
        let oe = O, fe;
        bt(c, !1), O ? (O.el = re.el, ce(c, O, $)) : O = re, W && wn(W), (fe = O.props && O.props.onVnodeBeforeUpdate) && ze(fe, Q, O, re), bt(c, !0);
        const pe = ti(c), Be = c.subTree;
        c.subTree = pe, C(
          Be,
          pe,
          // parent may have changed if it's in a teleport
          h(Be.el),
          // anchor may have changed if it's in a fragment
          pn(Be),
          c,
          b,
          y
        ), O.el = pe.el, oe === null && gl(c, pe.el), K && be(K, b), (fe = O.props && O.props.onVnodeUpdated) && be(
          () => ze(fe, Q, O, re),
          b
        );
      } else {
        let O;
        const { el: W, props: K } = d, { bm: Q, m: re, parent: oe, root: fe, type: pe } = c, Be = en(d);
        bt(c, !1), Q && wn(Q), !Be && (O = K && K.onVnodeBeforeMount) && ze(O, oe, d), bt(c, !0);
        {
          fe.ce && fe.ce._hasShadowRoot() && fe.ce._injectChildStyle(
            pe,
            c.parent ? c.parent.type : void 0
          );
          const Ke = c.subTree = ti(c);
          C(
            null,
            Ke,
            m,
            w,
            c,
            b,
            y
          ), d.el = Ke.el;
        }
        if (re && be(re, b), !Be && (O = K && K.onVnodeMounted)) {
          const Ke = d;
          be(
            () => ze(O, oe, Ke),
            b
          );
        }
        (d.shapeFlag & 256 || oe && en(oe.vnode) && oe.vnode.shapeFlag & 256) && c.a && be(c.a, b), c.isMounted = !0, d = m = w = null;
      }
    };
    c.scope.on();
    const S = c.effect = new Fi(T);
    c.scope.off();
    const _ = c.update = S.run.bind(S), j = c.job = S.runIfDirty.bind(S);
    j.i = c, j.id = c.uid, S.scheduler = () => Es(j), bt(c, !0), _();
  }, ce = (c, d, m) => {
    d.component = c;
    const w = c.vnode.props;
    c.vnode = d, c.next = null, vl(c, d.props, w, m), wl(c, d.children, m), Qe(), Us(c), et();
  }, ie = (c, d, m, w, b, y, $, T, S = !1) => {
    const _ = c && c.children, j = c ? c.shapeFlag : 0, O = d.children, { patchFlag: W, shapeFlag: K } = d;
    if (W > 0) {
      if (W & 128) {
        je(
          _,
          O,
          m,
          w,
          b,
          y,
          $,
          T,
          S
        );
        return;
      } else if (W & 256) {
        st(
          _,
          O,
          m,
          w,
          b,
          y,
          $,
          T,
          S
        );
        return;
      }
    }
    K & 8 ? (j & 16 && Vt(_, b, y), O !== _ && u(m, O)) : j & 16 ? K & 16 ? je(
      _,
      O,
      m,
      w,
      b,
      y,
      $,
      T,
      S
    ) : Vt(_, b, y, !0) : (j & 8 && u(m, ""), K & 16 && N(
      O,
      m,
      w,
      b,
      y,
      $,
      T,
      S
    ));
  }, st = (c, d, m, w, b, y, $, T, S) => {
    c = c || Ot, d = d || Ot;
    const _ = c.length, j = d.length, O = Math.min(_, j);
    let W;
    for (W = 0; W < O; W++) {
      const K = d[W] = S ? rt(d[W]) : Ye(d[W]);
      C(
        c[W],
        K,
        m,
        null,
        b,
        y,
        $,
        T,
        S
      );
    }
    _ > j ? Vt(
      c,
      b,
      y,
      !0,
      !1,
      O
    ) : N(
      d,
      m,
      w,
      b,
      y,
      $,
      T,
      S,
      O
    );
  }, je = (c, d, m, w, b, y, $, T, S) => {
    let _ = 0;
    const j = d.length;
    let O = c.length - 1, W = j - 1;
    for (; _ <= O && _ <= W; ) {
      const K = c[_], Q = d[_] = S ? rt(d[_]) : Ye(d[_]);
      if (zt(K, Q))
        C(
          K,
          Q,
          m,
          null,
          b,
          y,
          $,
          T,
          S
        );
      else
        break;
      _++;
    }
    for (; _ <= O && _ <= W; ) {
      const K = c[O], Q = d[W] = S ? rt(d[W]) : Ye(d[W]);
      if (zt(K, Q))
        C(
          K,
          Q,
          m,
          null,
          b,
          y,
          $,
          T,
          S
        );
      else
        break;
      O--, W--;
    }
    if (_ > O) {
      if (_ <= W) {
        const K = W + 1, Q = K < j ? d[K].el : w;
        for (; _ <= W; )
          C(
            null,
            d[_] = S ? rt(d[_]) : Ye(d[_]),
            m,
            Q,
            b,
            y,
            $,
            T,
            S
          ), _++;
      }
    } else if (_ > W)
      for (; _ <= O; )
        L(c[_], b, y, !0), _++;
    else {
      const K = _, Q = _, re = /* @__PURE__ */ new Map();
      for (_ = Q; _ <= W; _++) {
        const Te = d[_] = S ? rt(d[_]) : Ye(d[_]);
        Te.key != null && re.set(Te.key, _);
      }
      let oe, fe = 0;
      const pe = W - Q + 1;
      let Be = !1, Ke = 0;
      const Kt = new Array(pe);
      for (_ = 0; _ < pe; _++) Kt[_] = 0;
      for (_ = K; _ <= O; _++) {
        const Te = c[_];
        if (fe >= pe) {
          L(Te, b, y, !0);
          continue;
        }
        let Ue;
        if (Te.key != null)
          Ue = re.get(Te.key);
        else
          for (oe = Q; oe <= W; oe++)
            if (Kt[oe - Q] === 0 && zt(Te, d[oe])) {
              Ue = oe;
              break;
            }
        Ue === void 0 ? L(Te, b, y, !0) : (Kt[Ue - Q] = _ + 1, Ue >= Ke ? Ke = Ue : Be = !0, C(
          Te,
          d[Ue],
          m,
          null,
          b,
          y,
          $,
          T,
          S
        ), fe++);
      }
      const Ls = Be ? Sl(Kt) : Ot;
      for (oe = Ls.length - 1, _ = pe - 1; _ >= 0; _--) {
        const Te = Q + _, Ue = d[Te], Hs = d[Te + 1], Ns = Te + 1 < j ? (
          // #13559, #14173 fallback to el placeholder for unresolved async component
          Hs.el || So(Hs)
        ) : w;
        Kt[_] === 0 ? C(
          null,
          Ue,
          m,
          Ns,
          b,
          y,
          $,
          T,
          S
        ) : Be && (oe < 0 || _ !== Ls[oe] ? Ve(Ue, m, Ns, 2) : oe--);
      }
    }
  }, Ve = (c, d, m, w, b = null) => {
    const { el: y, type: $, transition: T, children: S, shapeFlag: _ } = c;
    if (_ & 6) {
      Ve(c.component.subTree, d, m, w);
      return;
    }
    if (_ & 128) {
      c.suspense.move(d, m, w);
      return;
    }
    if (_ & 64) {
      $.move(c, d, m, Bt);
      return;
    }
    if ($ === Ce) {
      s(y, d, m);
      for (let O = 0; O < S.length; O++)
        Ve(S[O], d, m, w);
      s(c.anchor, d, m);
      return;
    }
    if ($ === Cn) {
      D(c, d, m);
      return;
    }
    if (w !== 2 && _ & 1 && T)
      if (w === 0)
        T.persisted && !y[ns] ? s(y, d, m) : (T.beforeEnter(y), s(y, d, m), be(() => T.enter(y), b));
      else {
        const { leave: O, delayLeave: W, afterLeave: K } = T, Q = () => {
          c.ctx.isUnmounted ? i(y) : s(y, d, m);
        }, re = () => {
          const oe = y._isLeaving || !!y[ns];
          y._isLeaving && y[ns](
            !0
            /* cancelled */
          ), T.persisted && !oe ? Q() : O(y, () => {
            Q(), K && K();
          });
        };
        W ? W(y, Q, re) : re();
      }
    else
      s(y, d, m);
  }, L = (c, d, m, w = !1, b = !1) => {
    const {
      type: y,
      props: $,
      ref: T,
      children: S,
      dynamicChildren: _,
      shapeFlag: j,
      patchFlag: O,
      dirs: W,
      cacheIndex: K,
      memo: Q
    } = c;
    if (O === -2 && (b = !1), T != null && (Qe(), Qt(T, null, m, c, !0), et()), K != null && (d.renderCache[K] = void 0), j & 256) {
      d.ctx.deactivate(c);
      return;
    }
    const re = j & 1 && W, oe = !en(c);
    let fe;
    if (oe && (fe = $ && $.onVnodeBeforeUnmount) && ze(fe, d, c), j & 6)
      ye(c.component, m, w);
    else {
      if (j & 128) {
        c.suspense.unmount(m, w);
        return;
      }
      re && _t(c, null, d, "beforeUnmount"), j & 64 ? c.type.remove(
        c,
        d,
        m,
        Bt,
        w
      ) : _ && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !_.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (y !== Ce || O > 0 && O & 64) ? Vt(
        _,
        d,
        m,
        !1,
        !0
      ) : (y === Ce && O & 384 || !b && j & 16) && Vt(S, d, m), w && V(c);
    }
    const pe = Q != null && K == null;
    (oe && (fe = $ && $.onVnodeUnmounted) || re || pe) && be(() => {
      fe && ze(fe, d, c), re && _t(c, null, d, "unmounted"), pe && (c.el = null);
    }, m);
  }, V = (c) => {
    const { type: d, el: m, anchor: w, transition: b } = c;
    if (d === Ce) {
      X(m, w);
      return;
    }
    if (d === Cn) {
      v(c);
      return;
    }
    const y = () => {
      i(m), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (c.shapeFlag & 1 && b && !b.persisted) {
      const { leave: $, delayLeave: T } = b, S = () => $(m, y);
      T ? T(c.el, y, S) : S();
    } else
      y();
  }, X = (c, d) => {
    let m;
    for (; c !== d; )
      m = p(c), i(c), c = m;
    i(d);
  }, ye = (c, d, m) => {
    const { bum: w, scope: b, job: y, subTree: $, um: T, m: S, a: _ } = c;
    ii(S), ii(_), w && wn(w), b.stop(), y && (y.flags |= 8, L($, c, d, m)), T && be(T, d), be(() => {
      c.isUnmounted = !0;
    }, d);
  }, Vt = (c, d, m, w = !1, b = !1, y = 0) => {
    for (let $ = y; $ < c.length; $++)
      L(c[$], d, m, w, b);
  }, pn = (c) => {
    if (c.shapeFlag & 6)
      return pn(c.component.subTree);
    if (c.shapeFlag & 128)
      return c.suspense.next();
    const d = p(c.anchor || c.el), m = d && d[oo];
    return m ? p(m) : d;
  };
  let Jn = !1;
  const Fs = (c, d, m) => {
    let w;
    c == null ? d._vnode && (L(d._vnode, null, null, !0), w = d._vnode.component) : C(
      d._vnode || null,
      c,
      d,
      null,
      null,
      null,
      m
    ), d._vnode = c, Jn || (Jn = !0, Us(w), eo(), Jn = !1);
  }, Bt = {
    p: C,
    um: L,
    m: Ve,
    r: V,
    mt: We,
    mc: N,
    pc: ie,
    pbc: se,
    n: pn,
    o: e
  };
  return {
    render: Fs,
    hydrate: void 0,
    createApp: al(Fs)
  };
}
function is({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function bt({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function kl(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Ps(e, t, n = !1) {
  const s = e.children, i = t.children;
  if (B(s) && B(i))
    for (let o = 0; o < s.length; o++) {
      const r = s[o];
      let l = i[o];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = i[o] = rt(i[o]), l.el = r.el), !n && l.patchFlag !== -2 && Ps(r, l)), l.type === qn && (l.patchFlag === -1 && (l = i[o] = rt(l)), l.el = r.el), l.type === vt && !l.el && (l.el = r.el);
    }
}
function Sl(e) {
  const t = e.slice(), n = [0];
  let s, i, o, r, l;
  const a = e.length;
  for (s = 0; s < a; s++) {
    const f = e[s];
    if (f !== 0) {
      if (i = n[n.length - 1], e[i] < f) {
        t[s] = i, n.push(s);
        continue;
      }
      for (o = 0, r = n.length - 1; o < r; )
        l = o + r >> 1, e[n[l]] < f ? o = l + 1 : r = l;
      f < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), n[o] = s);
    }
  }
  for (o = n.length, r = n[o - 1]; o-- > 0; )
    n[o] = r, r = t[r];
  return n;
}
function ko(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : ko(t);
}
function ii(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
function So(e) {
  if (e.placeholder)
    return e.placeholder;
  const t = e.component;
  return t ? So(t.subTree) : null;
}
const To = (e) => e.__isSuspense;
function Tl(e, t) {
  t && t.pendingBranch ? B(e) ? t.effects.push(...e) : t.effects.push(e) : Or(e);
}
const Ce = /* @__PURE__ */ Symbol.for("v-fgt"), qn = /* @__PURE__ */ Symbol.for("v-txt"), vt = /* @__PURE__ */ Symbol.for("v-cmt"), Cn = /* @__PURE__ */ Symbol.for("v-stc"), nn = [];
let Me = null;
function H(e = !1) {
  nn.push(Me = e ? null : []);
}
function Ml() {
  nn.pop(), Me = nn[nn.length - 1] || null;
}
let ln = 1;
function oi(e, t = !1) {
  ln += e, e < 0 && Me && t && (Me.hasOnce = !0);
}
function Mo(e) {
  return e.dynamicChildren = ln > 0 ? Me || Ot : null, Ml(), ln > 0 && Me && Me.push(e), e;
}
function U(e, t, n, s, i, o) {
  return Mo(
    x(
      e,
      t,
      n,
      s,
      i,
      o,
      !0
    )
  );
}
function De(e, t, n, s, i) {
  return Mo(
    Ee(
      e,
      t,
      n,
      s,
      i,
      !0
    )
  );
}
function $o(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function zt(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Ao = ({ key: e }) => e ?? null, kn = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? ue(e) || /* @__PURE__ */ de(e) || q(e) ? { i: Ie, r: e, k: t, f: !!n } : e : null);
function x(e, t = null, n = null, s = 0, i = null, o = e === Ce ? 0 : 1, r = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Ao(t),
    ref: t && kn(t),
    scopeId: no,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Ie
  };
  return l ? (In(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= ue(n) ? 8 : 16), ln > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  Me && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && Me.push(a), a;
}
const Ee = $l;
function $l(e, t = null, n = null, s = 0, i = null, o = !1) {
  if ((!e || e === el) && (e = vt), $o(e)) {
    const l = Nt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && In(l, n), ln > 0 && !o && Me && (l.shapeFlag & 6 ? Me[Me.indexOf(e)] = l : Me.push(l)), l.patchFlag = -2, l;
  }
  if (Nl(e) && (e = e.__vccOpts), t) {
    t = Al(t);
    let { class: l, style: a } = t;
    l && !ue(l) && (t.class = $e(l)), ne(a) && (/* @__PURE__ */ Kn(a) && !B(a) && (a = me({}, a)), t.style = Ze(a));
  }
  const r = ue(e) ? 1 : To(e) ? 128 : Nr(e) ? 64 : ne(e) ? 4 : q(e) ? 2 : 0;
  return x(
    e,
    t,
    n,
    s,
    i,
    r,
    o,
    !0
  );
}
function Al(e) {
  return e ? /* @__PURE__ */ Kn(e) || yo(e) ? me({}, e) : e : null;
}
function Nt(e, t, n = !1, s = !1) {
  const { props: i, ref: o, patchFlag: r, children: l, transition: a } = e, f = t ? El(i || {}, t) : i, u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Ao(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? B(o) ? o.concat(kn(t)) : [o, kn(t)] : kn(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Ce ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Nt(e.ssContent),
    ssFallback: e.ssFallback && Nt(e.ssFallback),
    placeholder: e.placeholder,
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && s && Rs(
    u,
    a.clone(u)
  ), u;
}
function xt(e = " ", t = 0) {
  return Ee(qn, null, e, t);
}
function Rn(e, t) {
  const n = Ee(Cn, null, e);
  return n.staticCount = t, n;
}
function Oe(e = "", t = !1) {
  return t ? (H(), De(vt, null, e)) : Ee(vt, null, e);
}
function Ye(e) {
  return e == null || typeof e == "boolean" ? Ee(vt) : B(e) ? Ee(
    Ce,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : $o(e) ? rt(e) : Ee(qn, null, String(e));
}
function rt(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Nt(e);
}
function In(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (B(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default;
      i && (i._c && (i._d = !1), In(e, i()), i._c && (i._d = !0));
      return;
    } else {
      n = 32;
      const i = t._;
      !i && !yo(t) ? t._ctx = Ie : i === 3 && Ie && (Ie.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else if (q(t)) {
    if (s & 65) {
      In(e, { default: t });
      return;
    }
    t = { default: t, _ctx: Ie }, n = 32;
  } else
    t = String(t), s & 64 ? (n = 16, t = [xt(t)]) : n = 8;
  e.children = t, e.shapeFlag |= n;
}
function El(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = $e([t.class, s.class]));
      else if (i === "style")
        t.style = Ze([t.style, s.style]);
      else if (Fn(i)) {
        const o = t[i], r = s[i];
        r && o !== r && !(B(o) && o.includes(r)) ? t[i] = o ? [].concat(o, r) : r : r == null && o == null && // mergeProps({ 'onUpdate:modelValue': undefined }) should not retain
        // the model listener.
        !Ln(i) && (t[i] = r);
      } else i !== "" && (t[i] = s[i]);
  }
  return t;
}
function ze(e, t, n, s = null) {
  Ne(e, t, 7, [
    n,
    s
  ]);
}
const Rl = ho();
let Il = 0;
function Ol(e, t, n) {
  const s = e.type, i = (t ? t.appContext : e.appContext) || Rl, o = {
    uid: Il++,
    vnode: e,
    type: s,
    parent: t,
    appContext: i,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new Zo(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(i.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: bo(s, i),
    emitsOptions: po(s, i),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: le,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: le,
    data: le,
    props: le,
    attrs: le,
    slots: le,
    refs: le,
    setupState: le,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = ul.bind(null, o), e.ce && e.ce(o), o;
}
let ke = null;
const Pl = () => ke || Ie;
let On, _s;
{
  const e = Vn(), t = (n, s) => {
    let i;
    return (i = e[n]) || (i = e[n] = []), i.push(s), (o) => {
      i.length > 1 ? i.forEach((r) => r(o)) : i[0](o);
    };
  };
  On = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => ke = n
  ), _s = t(
    "__VUE_SSR_SETTERS__",
    (n) => an = n
  );
}
const hn = (e) => {
  const t = ke;
  return On(e), e.scope.on(), () => {
    e.scope.off(), On(t);
  };
}, ri = () => {
  ke && ke.scope.off(), On(null);
};
function Eo(e) {
  return e.vnode.shapeFlag & 4;
}
let an = !1;
function Dl(e, t = !1, n = !1) {
  t && _s(t);
  const { props: s, children: i } = e.vnode, o = Eo(e);
  ml(e, s, o, t), bl(e, i, n || t);
  const r = o ? Fl(e, t) : void 0;
  return t && _s(!1), r;
}
function Fl(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, tl);
  const { setup: s } = n;
  if (s) {
    Qe();
    const i = e.setupContext = s.length > 1 ? Hl(e) : null, o = hn(e), r = fn(
      s,
      e,
      0,
      [
        e.props,
        i
      ]
    ), l = $i(r);
    if (et(), o(), (l || e.sp) && !en(e) && lo(e), l) {
      if (r.then(ri, ri), t)
        return r.then((a) => {
          li(e, a);
        }).catch((a) => {
          Un(a, e, 0);
        });
      e.asyncDep = r;
    } else
      li(e, r);
  } else
    Ro(e);
}
function li(e, t, n) {
  q(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : ne(t) && (e.setupState = Ji(t)), Ro(e);
}
function Ro(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || Xe);
  {
    const i = hn(e);
    Qe();
    try {
      nl(e);
    } finally {
      et(), i();
    }
  }
}
const Ll = {
  get(e, t) {
    return ve(e, "get", ""), e[t];
  }
};
function Hl(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Ll),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Yn(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ji(_r(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in tn)
        return tn[n](e);
    },
    has(t, n) {
      return n in t || n in tn;
    }
  })) : e.proxy;
}
function Nl(e) {
  return q(e) && "__vccOpts" in e;
}
const Z = (e, t) => /* @__PURE__ */ $r(e, t, an), Wl = "3.5.39";
/**
* @vue/runtime-dom v3.5.39
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let bs;
const ai = typeof window < "u" && window.trustedTypes;
if (ai)
  try {
    bs = /* @__PURE__ */ ai.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Io = bs ? (e) => bs.createHTML(e) : (e) => e, jl = "http://www.w3.org/2000/svg", Vl = "http://www.w3.org/1998/Math/MathML", ot = typeof document < "u" ? document : null, ci = ot && /* @__PURE__ */ ot.createElement("template"), Bl = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const i = t === "svg" ? ot.createElementNS(jl, e) : t === "mathml" ? ot.createElementNS(Vl, e) : n ? ot.createElement(e, { is: n }) : ot.createElement(e);
    return e === "select" && s && s.multiple != null && i.setAttribute("multiple", s.multiple), i;
  },
  createText: (e) => ot.createTextNode(e),
  createComment: (e) => ot.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ot.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, i, o) {
    const r = n ? n.previousSibling : t.lastChild;
    if (i && (i === o || i.nextSibling))
      for (; t.insertBefore(i.cloneNode(!0), n), !(i === o || !(i = i.nextSibling)); )
        ;
    else {
      ci.innerHTML = Io(
        s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e
      );
      const l = ci.content;
      if (s === "svg" || s === "mathml") {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      r ? r.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Kl = /* @__PURE__ */ Symbol("_vtc");
function Ul(e, t, n) {
  const s = e[Kl];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const ui = /* @__PURE__ */ Symbol("_vod"), zl = /* @__PURE__ */ Symbol("_vsh"), Gl = /* @__PURE__ */ Symbol(""), ql = /(?:^|;)\s*display\s*:/;
function Yl(e, t, n) {
  const s = e.style, i = ue(n);
  let o = !1;
  if (n && !i) {
    if (t)
      if (ue(t))
        for (const r of t.split(";")) {
          const l = r.slice(0, r.indexOf(":")).trim();
          n[l] == null && Yt(s, l, "");
        }
      else
        for (const r in t)
          n[r] == null && Yt(s, r, "");
    for (const r in n) {
      r === "display" && (o = !0);
      const l = n[r];
      l != null ? Xl(
        e,
        r,
        !ue(t) && t ? t[r] : void 0,
        l
      ) || Yt(s, r, l) : Yt(s, r, "");
    }
  } else if (i) {
    if (t !== n) {
      const r = s[Gl];
      r && (n += ";" + r), s.cssText = n, o = ql.test(n);
    }
  } else t && e.removeAttribute("style");
  ui in e && (e[ui] = o ? s.display : "", e[zl] && (s.display = "none"));
}
const fi = /\s*!important$/;
function Yt(e, t, n) {
  if (B(n))
    n.forEach((s) => Yt(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Jl(e, t);
    fi.test(n) ? e.setProperty(
      $t(s),
      n.replace(fi, ""),
      "important"
    ) : e[s] = n;
  }
}
const di = ["Webkit", "Moz", "ms"], os = {};
function Jl(e, t) {
  const n = os[t];
  if (n)
    return n;
  let s = Fe(t);
  if (s !== "filter" && s in e)
    return os[t] = s;
  s = Ri(s);
  for (let i = 0; i < di.length; i++) {
    const o = di[i] + s;
    if (o in e)
      return os[t] = o;
  }
  return t;
}
function Xl(e, t, n, s) {
  return e.tagName === "TEXTAREA" && (t === "width" || t === "height") && ue(s) && n === s;
}
const hi = "http://www.w3.org/1999/xlink";
function pi(e, t, n, s, i, o = Yo(t)) {
  s && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(hi, t.slice(6, t.length)) : e.setAttributeNS(hi, t, n) : n == null || o && !Oi(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    o ? "" : Pe(n) ? String(n) : n
  );
}
function gi(e, t, n, s, i) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Io(n) : n);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && // custom elements may use _value internally
  !o.includes("-")) {
    const l = o === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let r = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = Oi(n) : n == null && l === "string" ? (n = "", r = !0) : l === "number" && (n = 0, r = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  r && e.removeAttribute(i || t);
}
function kt(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Zl(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const mi = /* @__PURE__ */ Symbol("_vei");
function Ql(e, t, n, s, i = null) {
  const o = e[mi] || (e[mi] = {}), r = o[t];
  if (s && r)
    r.value = s;
  else {
    const [l, a] = na(t);
    if (s) {
      const f = o[t] = oa(
        s,
        i
      );
      kt(e, l, f, a);
    } else r && (Zl(e, l, r, a), o[t] = void 0);
  }
}
const ea = /(Once|Passive|Capture)$/, ta = /^on:?(?:Once|Passive|Capture)$/;
function na(e) {
  let t, n;
  for (; (n = e.match(ea)) && !ta.test(e); )
    t || (t = {}), e = e.slice(0, e.length - n[1].length), t[n[1].toLowerCase()] = !0;
  return [e[2] === ":" ? e.slice(3) : $t(e.slice(2)), t];
}
let rs = 0;
const sa = /* @__PURE__ */ Promise.resolve(), ia = () => rs || (sa.then(() => rs = 0), rs = Date.now());
function oa(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    const i = n.value;
    if (B(i)) {
      const o = s.stopImmediatePropagation;
      s.stopImmediatePropagation = () => {
        o.call(s), s._stopped = !0;
      };
      const r = i.slice(), l = [s];
      for (let a = 0; a < r.length && !s._stopped; a++) {
        const f = r[a];
        f && Ne(
          f,
          t,
          5,
          l
        );
      }
    } else
      Ne(
        i,
        t,
        5,
        [s]
      );
  };
  return n.value = e, n.attached = ia(), n;
}
const vi = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, ra = (e, t, n, s, i, o) => {
  const r = i === "svg";
  t === "class" ? Ul(e, s, r) : t === "style" ? Yl(e, n, s) : Fn(t) ? Ln(t) || Ql(e, t, n, s, o) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : la(e, t, s, r)) ? (gi(e, t, s), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && pi(e, t, s, r, o, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && // #12408 check if it's declared prop or it's async custom element
  (aa(e, t) || // @ts-expect-error _def is private
  e._def.__asyncLoader && (/[A-Z]/.test(t) || !ue(s))) ? gi(e, Fe(t), s, o, t) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), pi(e, t, s, r));
};
function la(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && vi(t) && q(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "autocorrect" || t === "sandbox" && e.tagName === "IFRAME" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const i = e.tagName;
    if (i === "IMG" || i === "VIDEO" || i === "CANVAS" || i === "SOURCE")
      return !1;
  }
  return vi(t) && ue(n) ? !1 : t in e;
}
function aa(e, t) {
  const n = (
    // @ts-expect-error _def is private
    e._def.props
  );
  if (!n)
    return !1;
  const s = Fe(t);
  return Array.isArray(n) ? n.some((i) => Fe(i) === s) : Object.keys(n).some((i) => Fe(i) === s);
}
const Pn = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return B(t) ? (n) => wn(t, n) : t;
};
function ca(e) {
  e.target.composing = !0;
}
function yi(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Lt = /* @__PURE__ */ Symbol("_assign");
function _i(e, t, n) {
  return t && (e = e.trim()), n && (e = jn(e)), e;
}
const ua = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, i) {
    e[Lt] = Pn(i);
    const o = s || i.props && i.props.type === "number";
    kt(e, t ? "change" : "input", (r) => {
      r.target.composing || e[Lt](_i(e.value, n, o));
    }), (n || o) && kt(e, "change", () => {
      e.value = _i(e.value, n, o);
    }), t || (kt(e, "compositionstart", ca), kt(e, "compositionend", yi), kt(e, "change", yi));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: i, number: o } }, r) {
    if (e[Lt] = Pn(r), e.composing) return;
    const l = (o || e.type === "number") && !/^0\d/.test(e.value) ? jn(e.value) : e.value, a = t ?? "";
    if (l === a)
      return;
    const f = e.getRootNode();
    (f instanceof Document || f instanceof ShadowRoot) && f.activeElement === e && e.type !== "range" && (s && t === n || i && e.value.trim() === a) || (e.value = a);
  }
}, fa = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, s) {
    const i = Hn(t);
    kt(e, "change", () => {
      const o = Array.prototype.filter.call(e.options, (r) => r.selected).map(
        (r) => n ? jn(Dn(r)) : Dn(r)
      );
      e[Lt](
        e.multiple ? i ? new Set(o) : o : o[0]
      ), e._assigning = !0, Zi(() => {
        e._assigning = !1;
      });
    }), e[Lt] = Pn(s);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    bi(e, t);
  },
  beforeUpdate(e, t, n) {
    e[Lt] = Pn(n);
  },
  updated(e, { value: t }) {
    e._assigning || bi(e, t);
  }
};
function bi(e, t) {
  const n = e.multiple, s = B(t);
  if (!(n && !s && !Hn(t))) {
    for (let i = 0, o = e.options.length; i < o; i++) {
      const r = e.options[i], l = Dn(r);
      if (n)
        if (s) {
          const a = typeof l;
          a === "string" || a === "number" ? r.selected = t.some((f) => String(f) === String(l)) : r.selected = Xo(t, l) > -1;
        } else
          r.selected = t.has(l);
      else if (un(Dn(r), t)) {
        e.selectedIndex !== i && (e.selectedIndex = i);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Dn(e) {
  return "_value" in e ? e._value : e.value;
}
const da = ["ctrl", "shift", "alt", "meta"], ha = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => da.some((n) => e[`${n}Key`] && !t.includes(n))
}, we = (e, t) => {
  if (!e) return e;
  const n = e._withMods || (e._withMods = {}), s = t.join(".");
  return n[s] || (n[s] = ((i, ...o) => {
    for (let r = 0; r < t.length; r++) {
      const l = ha[t[r]];
      if (l && l(i, t)) return;
    }
    return e(i, ...o);
  }));
}, pa = /* @__PURE__ */ me({ patchProp: ra }, Bl);
let wi;
function ga() {
  return wi || (wi = xl(pa));
}
const ma = ((...e) => {
  const t = ga().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const i = ya(s);
    if (!i) return;
    const o = t._component;
    !q(o) && !o.render && !o.template && (o.template = i.innerHTML), i.nodeType === 1 && (i.textContent = "");
    const r = n(i, !1, va(i));
    return i instanceof Element && (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")), r;
  }, t;
});
function va(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function ya(e) {
  return ue(e) ? document.querySelector(e) : e;
}
const _a = "媒体文件", ba = "媒体", wa = "查看已生成和已导入的媒体文件（含历史记录）", xa = { output: "已生成", input: "已导入" }, Ca = { search: "搜索文件名", all: "全部", image: "图片", video: "视频", audio: "音频", sort: { title: "排序", "date-desc": "最新优先", "date-asc": "最旧优先", "name-asc": "名称 A-Z", "name-desc": "名称 Z-A", "size-desc": "体积最大" } }, ka = { grid: "网格视图", list: "列表视图" }, Sa = { title: "暂无文件", desc: "该目录下还没有任何媒体文件", noResults: "没有匹配的文件" }, Ta = "加载中...", Ma = { inspect: "检查", addToWorkflow: "添加到工作流", download: "下载", openWorkflow: "打开工作流", exportWorkflow: "导出工作流", copyFilename: "复制文件名", delete: "删除" }, $a = { count: "已选 {n} 项", downloadAll: "下载选中", deleteAll: "删除选中", clear: "取消选择" }, Aa = { prev: "上一张", next: "下一张", close: "关闭" }, Ea = { deleted: "已删除 {name}", deleteFailed: "删除失败：{name}", copied: "已复制文件名", downloaded: "已下载 {name}", noWorkflow: "该文件没有嵌入工作流元数据", workflowOpened: "工作流已加载到画布", workflowExported: "工作流已导出" }, It = {
  title: _a,
  label: ba,
  tooltip: wa,
  tab: xa,
  filter: Ca,
  view: ka,
  empty: Sa,
  loading: Ta,
  contextMenu: Ma,
  selection: $a,
  lightbox: Aa,
  toast: Ea
}, Ra = "Media", Ia = "Media", Oa = "Browse generated and imported media files (with history)", Pa = { output: "Generated", input: "Imported" }, Da = { search: "Search filename", all: "All", image: "Image", video: "Video", audio: "Audio", sort: { title: "Sort", "date-desc": "Newest first", "date-asc": "Oldest first", "name-asc": "Name A-Z", "name-desc": "Name Z-A", "size-desc": "Largest first" } }, Fa = { grid: "Grid view", list: "List view" }, La = { title: "No files", desc: "No media files in this directory yet", noResults: "No matching files" }, Ha = "Loading...", Na = { inspect: "Inspect", addToWorkflow: "Add to workflow", download: "Download", openWorkflow: "Open workflow", exportWorkflow: "Export workflow", copyFilename: "Copy filename", delete: "Delete" }, Wa = { count: "{n} selected", downloadAll: "Download selected", deleteAll: "Delete selected", clear: "Clear selection" }, ja = { prev: "Previous", next: "Next", close: "Close" }, Va = { deleted: "Deleted {name}", deleteFailed: "Delete failed: {name}", copied: "Filename copied", downloaded: "Downloaded {name}", noWorkflow: "No workflow metadata embedded in this file", workflowOpened: "Workflow loaded to canvas", workflowExported: "Workflow exported" }, ls = {
  title: Ra,
  label: Ia,
  tooltip: Oa,
  tab: Pa,
  filter: Da,
  view: Fa,
  empty: La,
  loading: Ha,
  contextMenu: Na,
  selection: Wa,
  lightbox: ja,
  toast: Va
}, Oo = {
  "zh-CN": It,
  "zh-TW": It,
  "zh-HK": It,
  zh: It,
  en: ls,
  "en-US": ls,
  "en-GB": ls
};
function xi() {
  try {
    const e = (navigator.language || navigator.userLanguage || "zh-CN").toLowerCase();
    for (const t of Object.keys(Oo))
      if (e.startsWith(t.toLowerCase())) return t;
  } catch {
  }
  return "zh-CN";
}
const Ba = /* @__PURE__ */ Mt({
  locale: xi(),
  messages: Oo[xi()] || It
});
function Ci(e, t) {
  return t.split(".").reduce((n, s) => n == null ? void 0 : n[s], e);
}
function ki(e, t) {
  return t ? e.replace(
    /\{(\w+)\}/g,
    (n, s) => t[s] != null ? String(t[s]) : `{${s}}`
  ) : e;
}
function z(e, t) {
  const n = Ci(Ba.messages, e);
  if (typeof n == "string") return ki(n, t);
  const s = Ci(It, e);
  return typeof s == "string" ? ki(s, t) : e;
}
const as = "/mav", _n = /* @__PURE__ */ new Map(), Ka = 6e4;
function Po() {
  const e = /* @__PURE__ */ J([]), t = /* @__PURE__ */ J(!1), n = /* @__PURE__ */ J(null);
  async function s(l, a = !1) {
    const f = _n.get(l), u = f && Date.now() - f.ts < Ka;
    if (f && (e.value = f.files), u && !a) {
      t.value = !1;
      return;
    }
    f || (t.value = !0), n.value = null;
    try {
      const h = await fetch(`${as}/files/${l}`);
      if (!h.ok) throw new Error(`HTTP ${h.status}`);
      const p = await h.json();
      _n.set(l, { files: p, ts: Date.now() }), e.value = p;
    } catch (h) {
      n.value = (h == null ? void 0 : h.message) || String(h), f || (e.value = []);
    } finally {
      t.value = !1;
    }
  }
  async function i(l, a, f = "") {
    const u = new URLSearchParams({ type: l, name: a, subfolder: f }), h = await fetch(`${as}/metadata?${u}`);
    if (!h.ok) throw new Error(`HTTP ${h.status}`);
    return await h.json();
  }
  async function o(l, a, f = "") {
    const u = await fetch(`${as}/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: l, name: a, subfolder: f })
    });
    return u.ok ? !!(await u.json()).success : !1;
  }
  function r(l) {
    l ? _n.delete(l) : _n.clear();
  }
  return {
    files: e,
    loading: t,
    error: n,
    fetchFiles: s,
    fetchMetadata: i,
    deleteFile: o,
    clearCache: r
  };
}
function pt(e) {
  return `/view?${new URLSearchParams({
    filename: e.name,
    type: e.type,
    subfolder: e.subfolder || ""
  })}`;
}
function Ua(e) {
  return `${pt(e)}&download=1`;
}
function Ds(e) {
  return e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(1)} KB` : e < 1024 * 1024 * 1024 ? `${(e / 1024 / 1024).toFixed(1)} MB` : `${(e / 1024 / 1024 / 1024).toFixed(2)} GB`;
}
function Do(e) {
  const t = new Date(e), n = (s) => String(s).padStart(2, "0");
  return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())} ${n(
    t.getHours()
  )}:${n(t.getMinutes())}`;
}
function za(e) {
  const { fetchMetadata: t, deleteFile: n, clearCache: s } = Po();
  function i(p) {
    e ? e(p) : console.log("[MAV]", p);
  }
  async function o(p) {
    try {
      const g = document.createElement("a");
      g.href = Ua(p), g.download = p.name, document.body.appendChild(g), g.click(), g.remove(), i(z("toast.downloaded", { name: p.name }));
    } catch (g) {
      console.error("[MAV] download failed", g);
    }
  }
  async function r(p) {
    const g = await n(p.type, p.name, p.subfolder);
    return g ? (i(z("toast.deleted", { name: p.name })), s(p.type)) : i(z("toast.deleteFailed", { name: p.name })), g;
  }
  async function l(p) {
    try {
      await navigator.clipboard.writeText(p.name), i(z("toast.copied"));
    } catch {
      const g = document.createElement("textarea");
      g.value = p.name, document.body.appendChild(g), g.select();
      try {
        document.execCommand("copy"), i(z("toast.copied"));
      } catch {
      }
      g.remove();
    }
  }
  async function a(p) {
    const g = await t(p.type, p.name, p.subfolder);
    return !g.has_workflow || !g.workflow ? (i(z("toast.noWorkflow")), null) : g.workflow;
  }
  async function f(p) {
    const g = await a(p);
    if (!g) return;
    const A = new Blob([JSON.stringify(g, null, 2)], { type: "application/json" }), C = URL.createObjectURL(A), E = document.createElement("a");
    E.href = C, E.download = p.name.replace(/\.[^.]+$/, "") + "_workflow.json", document.body.appendChild(E), E.click(), E.remove(), URL.revokeObjectURL(C), i(z("toast.workflowExported"));
  }
  async function u(p) {
    const g = await a(p);
    if (g)
      try {
        const A = window.app;
        A != null && A.loadGraphData ? (A.loadGraphData(g), i(z("toast.workflowOpened"))) : console.warn("[MAV] window.app 不可用");
      } catch (A) {
        console.error("[MAV] openWorkflow failed", A);
      }
  }
  async function h(p) {
    try {
      const g = window.app, A = p.media_kind === "video" ? "VHS_LoadVideo" : p.media_kind === "audio" ? "PreviewAudio" : "LoadImage";
      if (g != null && g.addNodeOnGraph) {
        const C = g.addNodeOnGraph(A);
        if (C && C.widgets) {
          const E = C.widgets.find(
            (R) => R.name === "image" || R.name === "video" || R.name === "audio" || R.name === "filename"
          );
          E && (E.value = p.name);
        }
      }
    } catch (g) {
      console.error("[MAV] addToWorkflow failed", g);
    }
  }
  return {
    download: o,
    remove: r,
    copyFilename: l,
    exportWorkflow: f,
    openWorkflow: u,
    addToWorkflow: h,
    getWorkflow: a
  };
}
function ft(e) {
  return `${e.type}|${e.subfolder}|${e.name}`;
}
function Ga() {
  const e = /* @__PURE__ */ J(/* @__PURE__ */ new Set()), t = /* @__PURE__ */ J([]), n = /* @__PURE__ */ J(null), s = Z(() => e.value.size), i = Z(() => s.value > 0);
  function o(h) {
    return e.value.has(ft(h));
  }
  function r(h) {
    const p = ft(h);
    e.value.has(p) || (e.value.add(p), t.value.push(h)), n.value = h;
  }
  function l(h) {
    const p = ft(h);
    e.value.has(p) && (e.value.delete(p), t.value = t.value.filter((g) => ft(g) !== p));
  }
  function a(h) {
    o(h) ? l(h) : r(h);
  }
  function f(h, p) {
    if (!n.value) {
      r(h);
      return;
    }
    const g = p.findIndex((R) => ft(R) === ft(n.value)), A = p.findIndex((R) => ft(R) === ft(h));
    if (g === -1 || A === -1) {
      r(h);
      return;
    }
    const [C, E] = g <= A ? [g, A] : [A, g];
    for (let R = C; R <= E; R++)
      r(p[R]);
    n.value = h;
  }
  function u() {
    e.value.clear(), t.value = [], n.value = null;
  }
  return {
    selectedKeys: e,
    selectedAssets: t,
    count: s,
    isActive: i,
    isSelected: o,
    select: r,
    deselect: l,
    toggle: a,
    rangeSelect: f,
    clear: u
  };
}
const qa = { class: "mav-filter-bar" }, Ya = { class: "mav-search-wrap" }, Ja = ["placeholder"], Xa = { class: "mav-view-toggle" }, Za = ["title"], Qa = ["title"], ec = { class: "mav-media-chips" }, tc = ["onClick"], nc = { class: "mav-chip-icon" }, sc = { class: "mav-chip-label" }, ic = ["title"], oc = { value: "date-desc" }, rc = { value: "date-asc" }, lc = { value: "name-asc" }, ac = { value: "name-desc" }, cc = { value: "size-desc" }, uc = /* @__PURE__ */ tt({
  __name: "FilterBar",
  props: {
    search: {},
    mediaKind: {},
    sort: {},
    viewMode: {}
  },
  emits: ["update:search", "update:mediaKind", "update:sort", "update:viewMode"],
  setup(e, { emit: t }) {
    const n = e, s = t, i = Z({
      get: () => n.search,
      set: (l) => s("update:search", l)
    }), o = Z({
      get: () => n.sort,
      set: (l) => s("update:sort", l)
    }), r = Z(() => [
      { value: "all", label: z("filter.all"), icon: "📋" },
      { value: "image", label: z("filter.image"), icon: "🖼" },
      { value: "video", label: z("filter.video"), icon: "▶" },
      { value: "audio", label: z("filter.audio"), icon: "♪" }
    ]);
    return (l, a) => (H(), U("div", qa, [
      x("div", Ya, [
        a[4] || (a[4] = x("svg", {
          class: "mav-search-icon",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2"
        }, [
          x("circle", {
            cx: "11",
            cy: "11",
            r: "8"
          }),
          x("line", {
            x1: "21",
            y1: "21",
            x2: "16.65",
            y2: "16.65"
          })
        ], -1)),
        zs(x("input", {
          class: "mav-search",
          type: "text",
          "onUpdate:modelValue": a[0] || (a[0] = (f) => i.value = f),
          placeholder: F(z)("filter.search")
        }, null, 8, Ja), [
          [ua, i.value]
        ])
      ]),
      x("div", Xa, [
        x("button", {
          class: $e(["mav-icon-btn", { active: e.viewMode === "grid" }]),
          title: F(z)("view.grid"),
          onClick: a[1] || (a[1] = (f) => l.$emit("update:viewMode", "grid"))
        }, [...a[5] || (a[5] = [
          Rn('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-332d4b2a><rect x="3" y="3" width="7" height="7" data-v-332d4b2a></rect><rect x="14" y="3" width="7" height="7" data-v-332d4b2a></rect><rect x="3" y="14" width="7" height="7" data-v-332d4b2a></rect><rect x="14" y="14" width="7" height="7" data-v-332d4b2a></rect></svg>', 1)
        ])], 10, Za),
        x("button", {
          class: $e(["mav-icon-btn", { active: e.viewMode === "list" }]),
          title: F(z)("view.list"),
          onClick: a[2] || (a[2] = (f) => l.$emit("update:viewMode", "list"))
        }, [...a[6] || (a[6] = [
          Rn('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-332d4b2a><line x1="8" y1="6" x2="21" y2="6" data-v-332d4b2a></line><line x1="8" y1="12" x2="21" y2="12" data-v-332d4b2a></line><line x1="8" y1="18" x2="21" y2="18" data-v-332d4b2a></line><line x1="3" y1="6" x2="3.01" y2="6" data-v-332d4b2a></line><line x1="3" y1="12" x2="3.01" y2="12" data-v-332d4b2a></line><line x1="3" y1="18" x2="3.01" y2="18" data-v-332d4b2a></line></svg>', 1)
        ])], 10, Qa)
      ]),
      x("div", ec, [
        (H(!0), U(Ce, null, dn(r.value, (f) => (H(), U("button", {
          key: f.value,
          class: $e(["mav-chip", { active: e.mediaKind === f.value }]),
          onClick: (u) => l.$emit("update:mediaKind", f.value)
        }, [
          x("span", nc, G(f.icon), 1),
          x("span", sc, G(f.label), 1)
        ], 10, tc))), 128)),
        zs(x("select", {
          class: "mav-sort-select",
          "onUpdate:modelValue": a[3] || (a[3] = (f) => o.value = f),
          title: F(z)("filter.sort.title")
        }, [
          x("option", oc, G(F(z)("filter.sort.date-desc")), 1),
          x("option", rc, G(F(z)("filter.sort.date-asc")), 1),
          x("option", lc, G(F(z)("filter.sort.name-asc")), 1),
          x("option", ac, G(F(z)("filter.sort.name-desc")), 1),
          x("option", cc, G(F(z)("filter.sort.size-desc")), 1)
        ], 8, ic), [
          [fa, o.value]
        ])
      ])
    ]));
  }
}), At = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, i] of t)
    n[s] = i;
  return n;
}, fc = /* @__PURE__ */ At(uc, [["__scopeId", "data-v-332d4b2a"]]), Fo = "application/x-comfy-asset-info";
function Si(e) {
  if (!isFinite(e) || e < 0) return "0:00";
  const t = Math.floor(e / 60), n = Math.floor(e % 60);
  return `${t}:${n.toString().padStart(2, "0")}`;
}
function ws(e) {
  return Array.from({ length: e }, () => ({
    height: Math.random() * 60 + 10
  }));
}
function dc(e, t) {
  const n = e.getChannelData(0);
  if (n.length === 0)
    return ws(t);
  const s = [];
  for (let o = 0; o < t; o++) {
    const r = Math.floor(o * n.length / t), l = Math.max(
      r + 1,
      Math.floor((o + 1) * n.length / t)
    );
    let a = 0;
    for (let f = r; f < l && f < n.length; f++)
      a += Math.abs(n[f]);
    s.push(a / (l - r));
  }
  const i = Math.max(...s) || 1;
  return s.map((o) => ({
    height: Math.max(8, o / i * 100)
  }));
}
function hc(e) {
  const { src: t, barCount: n = 40 } = e, s = /* @__PURE__ */ J(null), i = /* @__PURE__ */ J(null), o = /* @__PURE__ */ J(!1), r = /* @__PURE__ */ J(!1), l = /* @__PURE__ */ J(0), a = /* @__PURE__ */ J(0), f = /* @__PURE__ */ J(ws(n));
  let u = 0;
  const h = Z(() => a.value === 0 ? -1 : Math.floor(l.value / a.value * n) - 1), p = Z(() => a.value === 0 ? 0 : l.value / a.value * 100), g = Z(() => Si(l.value)), A = Z(() => Si(a.value));
  async function C(v) {
    const M = ++u;
    o.value = !0;
    let Y;
    try {
      const I = await fetch(v);
      if (M !== u) return;
      if (!I.ok)
        throw new Error(`Failed to fetch audio (${I.status})`);
      const N = await I.arrayBuffer();
      if (M !== u) return;
      const P = window.AudioContext || window.webkitAudioContext;
      Y = new P();
      const se = await Y.decodeAudioData(N);
      if (M !== u) return;
      f.value = dc(se, n);
    } catch {
      M === u && (f.value = ws(n));
    } finally {
      await (Y == null ? void 0 : Y.close()), M === u && (o.value = !1);
    }
  }
  function E() {
    s.value && (r.value ? s.value.pause() : s.value.play());
  }
  function R(v) {
    if (!s.value || a.value === 0) return;
    const M = Math.max(0, Math.min(1, v));
    s.value.currentTime = M * a.value;
  }
  function k(v) {
    if (!i.value || a.value === 0) return;
    const M = i.value.getBoundingClientRect(), Y = Math.max(
      0,
      Math.min(1, (v.clientX - M.left) / M.width)
    );
    R(Y), !r.value && s.value && s.value.play();
  }
  function D(v) {
    v.addEventListener("play", () => {
      r.value = !0;
    }), v.addEventListener("pause", () => {
      r.value = !1;
    }), v.addEventListener("ended", () => {
      r.value = !1, l.value = 0;
    }), v.addEventListener("timeupdate", () => {
      l.value = v.currentTime;
    }), v.addEventListener("loadedmetadata", () => {
      a.value = v.duration || 0;
    }), v.addEventListener("durationchange", () => {
      a.value = v.duration || 0;
    });
  }
  return mt(
    t,
    (v) => {
      r.value = !1, l.value = 0, v && C(v);
    },
    { immediate: !0 }
  ), {
    audioRef: s,
    waveformRef: i,
    bars: f,
    loading: o,
    isPlaying: r,
    currentTime: l,
    duration: a,
    playedBarIndex: h,
    progressRatio: p,
    formattedCurrentTime: g,
    formattedDuration: A,
    togglePlayPause: E,
    seekToRatio: R,
    handleWaveformClick: k,
    bindAudioEvents: D
  };
}
const pc = { class: "mav-audio-thumb" }, gc = ["aria-label", "disabled"], mc = {
  key: 0,
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, vc = {
  key: 1,
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, yc = { class: "mav-audio-time" }, _c = ["src"], bc = 32, wc = /* @__PURE__ */ tt({
  __name: "AudioThumb",
  props: {
    src: {}
  },
  setup(e) {
    const t = e, n = /* @__PURE__ */ J(null), {
      audioRef: s,
      waveformRef: i,
      bars: o,
      loading: r,
      isPlaying: l,
      playedBarIndex: a,
      formattedCurrentTime: f,
      formattedDuration: u,
      togglePlayPause: h,
      handleWaveformClick: p,
      bindAudioEvents: g
    } = hc({
      src: /* @__PURE__ */ Sr(() => t.src),
      barCount: 40
    });
    return Wt(() => {
      n.value && (s.value = n.value, g(n.value));
    }), yt(() => {
      n.value && n.value.pause();
    }), (A, C) => (H(), U("div", pc, [
      C[6] || (C[6] = Rn('<div class="mav-audio-icon-wrap" data-v-dd122fd7><svg class="mav-audio-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-dd122fd7><path d="M9 18V5l12-2v13" data-v-dd122fd7></path><circle cx="6" cy="18" r="3" data-v-dd122fd7></circle><circle cx="18" cy="16" r="3" data-v-dd122fd7></circle></svg></div>', 1)),
      x("div", {
        class: "mav-audio-player",
        onPointerdown: C[2] || (C[2] = we(() => {
        }, ["stop"])),
        onClick: C[3] || (C[3] = we(() => {
        }, ["stop"]))
      }, [
        x("button", {
          class: "mav-audio-play-btn",
          "aria-label": F(l) ? "暂停" : "播放",
          disabled: F(r),
          onClick: C[0] || (C[0] = we(
            //@ts-ignore
            (...E) => F(h) && F(h)(...E),
            ["stop"]
          ))
        }, [
          F(l) ? (H(), U("svg", vc, [...C[5] || (C[5] = [
            x("path", { d: "M6 5h4v14H6zM14 5h4v14h-4z" }, null, -1)
          ])])) : (H(), U("svg", mc, [...C[4] || (C[4] = [
            x("path", { d: "M8 5v14l11-7z" }, null, -1)
          ])]))
        ], 8, gc),
        x("div", {
          ref_key: "waveformRef",
          ref: i,
          class: "mav-audio-waveform",
          onClick: C[1] || (C[1] = //@ts-ignore
          (...E) => F(p) && F(p)(...E))
        }, [
          (H(!0), U(Ce, null, dn(F(o), (E, R) => (H(), U("div", {
            key: R,
            class: $e(["mav-audio-bar", {
              played: !F(r) && R <= F(a),
              loading: F(r)
            }]),
            style: Ze({ height: E.height / 100 * bc + "px" })
          }, null, 6))), 128))
        ], 512),
        x("span", yc, G(F(f)) + " / " + G(F(u)), 1)
      ], 32),
      x("audio", {
        ref_key: "audioEl",
        ref: n,
        src: e.src,
        preload: "metadata",
        class: "mav-audio-el"
      }, null, 8, _c)
    ]));
  }
}), Lo = /* @__PURE__ */ At(wc, [["__scopeId", "data-v-dd122fd7"]]), xc = ["src"], Cc = ["title"], kc = {
  key: 0,
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, Sc = {
  key: 1,
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, Tc = ["title"], Mc = {
  key: 0,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, $c = {
  key: 1,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Ac = { class: "mav-vc-time" }, Ec = {
  key: 2,
  class: "mav-video-resolution"
}, Rc = /* @__PURE__ */ tt({
  __name: "VideoThumb",
  props: {
    src: {}
  },
  setup(e) {
    const t = /* @__PURE__ */ J(null), n = /* @__PURE__ */ J(null), s = /* @__PURE__ */ J(!1), i = /* @__PURE__ */ J(!1), o = /* @__PURE__ */ J(!1), r = /* @__PURE__ */ J(0), l = /* @__PURE__ */ J(0), a = /* @__PURE__ */ J("");
    function f(v) {
      if (!isFinite(v) || v < 0) return "0:00";
      const M = Math.floor(v / 60), Y = Math.floor(v % 60);
      return `${M}:${Y.toString().padStart(2, "0")}`;
    }
    const u = Z(() => f(r.value)), h = Z(() => f(l.value)), p = Z(() => l.value === 0 ? 0 : r.value / l.value * 100);
    function g() {
      const v = t.value;
      v && (l.value = v.duration || 0, v.videoWidth && v.videoHeight && (a.value = `${v.videoWidth}×${v.videoHeight}`));
    }
    function A() {
      const v = t.value;
      v && (r.value = v.currentTime);
    }
    async function C() {
      const v = t.value;
      v && (v.paused || v.ended ? await v.play().catch(() => {
      }) : v.pause());
    }
    function E() {
      const v = t.value;
      v && (v.paused ? v.play().catch(() => {
      }) : v.pause());
    }
    function R() {
      const v = t.value;
      v && (v.muted = !v.muted, o.value = v.muted);
    }
    function k() {
      var M;
      const v = t.value;
      v && (document.fullscreenElement ? document.exitFullscreen() : (M = v.requestFullscreen) == null || M.call(v).catch(() => {
      }));
    }
    function D(v) {
      const M = t.value, Y = n.value;
      if (!M || !Y || l.value === 0) return;
      const I = Y.getBoundingClientRect(), N = Math.max(0, Math.min(1, (v.clientX - I.left) / I.width));
      M.currentTime = N * l.value;
    }
    return (v, M) => (H(), U("div", {
      class: "mav-video-thumb",
      onMouseenter: M[4] || (M[4] = (Y) => s.value = !0),
      onMouseleave: M[5] || (M[5] = (Y) => s.value = !1)
    }, [
      x("video", {
        ref_key: "videoEl",
        ref: t,
        src: e.src,
        preload: "metadata",
        loop: "",
        playsinline: "",
        class: "mav-video-el",
        onClick: we(C, ["stop"]),
        onPlay: M[0] || (M[0] = (Y) => i.value = !0),
        onPause: M[1] || (M[1] = (Y) => i.value = !1),
        onLoadedmetadata: g,
        onTimeupdate: A
      }, null, 40, xc),
      i.value ? Oe("", !0) : (H(), U("div", {
        key: 0,
        class: "mav-video-play-overlay",
        onClick: we(C, ["stop"])
      }, [...M[6] || (M[6] = [
        x("svg", {
          class: "mav-video-play-icon",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2.2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          x("path", { d: "M8 5.5 L18.5 12 L8 18.5 Z" })
        ], -1)
      ])])),
      i.value ? (H(), U("div", {
        key: 1,
        class: "mav-video-controls",
        onClick: M[2] || (M[2] = we(() => {
        }, ["stop"])),
        onPointerdown: M[3] || (M[3] = we(() => {
        }, ["stop"]))
      }, [
        x("button", {
          class: "mav-vc-btn",
          title: i.value ? "暂停" : "播放",
          onClick: we(E, ["stop"])
        }, [
          i.value ? (H(), U("svg", kc, [...M[7] || (M[7] = [
            x("path", { d: "M6 5h4v14H6zM14 5h4v14h-4z" }, null, -1)
          ])])) : (H(), U("svg", Sc, [...M[8] || (M[8] = [
            x("path", { d: "M8 5v14l11-7z" }, null, -1)
          ])]))
        ], 8, Cc),
        x("button", {
          class: "mav-vc-btn",
          title: o.value ? "取消静音" : "静音",
          onClick: we(R, ["stop"])
        }, [
          o.value ? (H(), U("svg", Mc, [...M[9] || (M[9] = [
            x("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }, null, -1),
            x("line", {
              x1: "23",
              y1: "9",
              x2: "17",
              y2: "15"
            }, null, -1),
            x("line", {
              x1: "17",
              y1: "9",
              x2: "23",
              y2: "15"
            }, null, -1)
          ])])) : (H(), U("svg", $c, [...M[10] || (M[10] = [
            x("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }, null, -1),
            x("path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07" }, null, -1),
            x("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14" }, null, -1)
          ])]))
        ], 8, Tc),
        x("button", {
          class: "mav-vc-btn",
          title: "全屏",
          onClick: we(k, ["stop"])
        }, [...M[11] || (M[11] = [
          Rn('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-3f796aee><path d="M8 3H5a2 2 0 0 0-2 2v3" data-v-3f796aee></path><path d="M21 8V5a2 2 0 0 0-2-2h-3" data-v-3f796aee></path><path d="M3 16v3a2 2 0 0 0 2 2h3" data-v-3f796aee></path><path d="M16 21h3a2 2 0 0 0 2-2v-3" data-v-3f796aee></path></svg>', 1)
        ])]),
        x("div", {
          ref_key: "progressRef",
          ref: n,
          class: "mav-vc-progress",
          onClick: we(D, ["stop"])
        }, [
          x("div", {
            class: "mav-vc-progress-fill",
            style: Ze({ width: p.value + "%" })
          }, null, 4)
        ], 512),
        x("span", Ac, G(u.value) + " / " + G(h.value), 1)
      ], 32)) : Oe("", !0),
      a.value ? (H(), U("div", Ec, G(a.value), 1)) : Oe("", !0)
    ], 32));
  }
}), Ho = /* @__PURE__ */ At(Rc, [["__scopeId", "data-v-3f796aee"]]), Ic = ["title"], Oc = { class: "mav-card-thumb" }, Pc = ["src"], Dc = {
  key: 3,
  class: "mav-card-other"
}, Fc = {
  key: 4,
  class: "mav-card-resolution"
}, Lc = { class: "mav-card-name" }, Hc = { class: "mav-card-meta" }, Nc = { class: "mav-meta-size" }, Wc = { class: "mav-meta-date" }, jc = /* @__PURE__ */ tt({
  __name: "AssetCard",
  props: {
    asset: {},
    selected: { type: Boolean }
  },
  emits: ["click", "context-menu", "dblclick"],
  setup(e, { emit: t }) {
    const n = e, s = t, i = Z(() => pt(n.asset)), o = Z(() => pt(n.asset) + "#t=0.1"), r = Z(() => Ds(n.asset.size)), l = Z(() => {
      if (!n.asset.mtime) return "";
      const k = new Date(n.asset.mtime), D = (v) => v.toString().padStart(2, "0");
      return `${k.getFullYear()}-${D(k.getMonth() + 1)}-${D(k.getDate())} ${D(k.getHours())}:${D(k.getMinutes())}`;
    }), a = Z(() => {
      switch (n.asset.media_kind) {
        case "image":
          return "IMG";
        case "video":
          return "VID";
        case "audio":
          return "AUD";
        default:
          return "FILE";
      }
    }), f = Z(() => {
      switch (n.asset.media_kind) {
        case "image":
          return "kind-img";
        case "video":
          return "kind-vid";
        case "audio":
          return "kind-aud";
        default:
          return "kind-file";
      }
    }), u = Z(() => {
      var D;
      return (((D = n.asset.name.split(".").pop()) == null ? void 0 : D.toUpperCase()) || "?").slice(0, 4);
    });
    function h(k) {
      if (!k.dataTransfer) return;
      const D = JSON.stringify({
        filename: n.asset.name,
        subfolder: n.asset.subfolder || "",
        type: n.asset.type
      });
      k.dataTransfer.setData(Fo, D), k.dataTransfer.setData("text/uri-list", i.value), k.dataTransfer.effectAllowed = "copyMove";
    }
    function p(k) {
      s("click", n.asset, k);
    }
    function g(k) {
      s("context-menu", n.asset, k.clientX, k.clientY);
    }
    function A() {
      s("dblclick", n.asset);
    }
    function C(k) {
      k.target.style.display = "none";
    }
    const E = /* @__PURE__ */ J("");
    function R(k) {
      const D = k.target;
      D.naturalWidth && D.naturalHeight && (E.value = `${D.naturalWidth}×${D.naturalHeight}`);
    }
    return (k, D) => (H(), U("div", {
      class: $e(["mav-card", { selected: e.selected }]),
      draggable: "true",
      onDragstart: h,
      onClick: p,
      onContextmenu: we(g, ["prevent"]),
      onDblclick: A,
      title: e.asset.name
    }, [
      x("div", Oc, [
        e.asset.media_kind === "image" ? (H(), U("img", {
          key: 0,
          src: i.value,
          loading: "lazy",
          onError: C,
          onLoad: R
        }, null, 40, Pc)) : e.asset.media_kind === "video" ? (H(), De(Ho, {
          key: 1,
          src: o.value
        }, null, 8, ["src"])) : e.asset.media_kind === "audio" ? (H(), De(Lo, {
          key: 2,
          src: i.value
        }, null, 8, ["src"])) : (H(), U("div", Dc, [
          x("span", null, G(u.value), 1)
        ])),
        x("div", {
          class: $e(["mav-card-kind", f.value])
        }, G(a.value), 3),
        e.asset.media_kind === "image" && E.value ? (H(), U("div", Fc, G(E.value), 1)) : Oe("", !0)
      ]),
      x("div", Lc, G(e.asset.name), 1),
      x("div", Hc, [
        x("span", Nc, G(r.value), 1),
        x("span", Wc, G(l.value), 1)
      ])
    ], 42, Ic));
  }
}), Vc = /* @__PURE__ */ At(jc, [["__scopeId", "data-v-3ed06633"]]);
function No(e, t) {
  const n = /* @__PURE__ */ J(0), s = t.bufferRows ?? 4, i = Z(
    () => Math.ceil(e.value / Math.max(1, t.itemsPerRow.value))
  ), o = Z(() => i.value * t.rowHeight.value), r = Z(() => {
    const p = Math.floor(n.value / t.rowHeight.value) - s;
    return Math.max(0, p);
  }), l = Z(() => {
    const p = Math.ceil(t.containerHeight.value / t.rowHeight.value) + s * 2;
    return Math.min(i.value - r.value, p);
  }), a = Z(
    () => Math.min(e.value, (r.value + l.value) * t.itemsPerRow.value)
  ), f = Z(() => r.value * t.itemsPerRow.value), u = Z(() => r.value * t.rowHeight.value);
  function h(p) {
    const g = p.target;
    n.value = g.scrollTop;
  }
  return {
    totalHeight: o,
    startIndex: f,
    endIndex: a,
    offsetY: u,
    onScroll: h
  };
}
const Bc = 200, bn = 8, Kc = 54, Uc = /* @__PURE__ */ tt({
  __name: "AssetGrid",
  props: {
    assets: {},
    isSelected: { type: Function }
  },
  emits: ["click", "context-menu", "dblclick"],
  setup(e, { emit: t }) {
    const n = e, s = t, i = /* @__PURE__ */ J(null), o = /* @__PURE__ */ J(600), r = /* @__PURE__ */ J(4), l = /* @__PURE__ */ J(220);
    function a() {
      if (!i.value) return;
      const R = i.value.clientWidth - 16, k = Math.max(1, Math.floor((R + bn) / (Bc + bn)));
      r.value = k;
      const D = (R - (k - 1) * bn) / k;
      l.value = D + Kc + bn;
    }
    const {
      totalHeight: f,
      startIndex: u,
      endIndex: h,
      offsetY: p,
      onScroll: g
    } = No(
      Z(() => n.assets.length),
      {
        containerHeight: o,
        rowHeight: l,
        itemsPerRow: r,
        bufferRows: 4
      }
    ), A = Z(() => n.assets.slice(u.value, h.value));
    function C(R, k) {
      s("click", R, k, k.ctrlKey || k.metaKey, k.shiftKey);
    }
    let E = null;
    return Wt(() => {
      a(), i.value && (o.value = i.value.clientHeight, E = new ResizeObserver(() => {
        var R;
        a(), o.value = ((R = i.value) == null ? void 0 : R.clientHeight) || 600;
      }), E.observe(i.value));
    }), yt(() => {
      E == null || E.disconnect();
    }), mt(
      () => n.assets.length,
      () => {
        i.value && (i.value.scrollTop = 0);
      }
    ), (R, k) => (H(), U("div", {
      class: "mav-grid-scroll",
      onScroll: k[2] || (k[2] = //@ts-ignore
      (...D) => F(g) && F(g)(...D)),
      ref_key: "scrollEl",
      ref: i
    }, [
      x("div", {
        class: "mav-grid-spacer",
        style: Ze({ height: F(f) + "px", position: "relative" })
      }, [
        x("div", {
          class: "mav-grid-inner",
          style: Ze({ transform: `translateY(${F(p)}px)`, position: "absolute", top: 0, left: 0, right: 0 })
        }, [
          (H(!0), U(Ce, null, dn(A.value, (D) => (H(), De(Vc, {
            key: `${D.type}|${D.subfolder}|${D.name}`,
            asset: D,
            selected: e.isSelected(D),
            onClick: (v) => C(D, v),
            onContextMenu: k[0] || (k[0] = (v, M, Y) => R.$emit("context-menu", v, M, Y)),
            onDblclick: k[1] || (k[1] = (v) => R.$emit("dblclick", v))
          }, null, 8, ["asset", "selected", "onClick"]))), 128))
        ], 4)
      ], 4)
    ], 544));
  }
}), zc = ["onClick", "onContextmenu", "onDblclick", "onDragstart"], Gc = { class: "mav-list-thumb-wrap" }, qc = ["src", "onLoad"], Yc = {
  key: 3,
  class: "mav-list-thumb mav-list-thumb-placeholder"
}, Jc = { class: "mav-list-info" }, Xc = { class: "mav-list-name" }, Zc = { class: "mav-list-meta" }, Qc = {
  key: 0,
  class: "mav-list-res"
}, eu = { key: 1 }, tu = /* @__PURE__ */ tt({
  __name: "AssetList",
  props: {
    assets: {},
    isSelected: { type: Function }
  },
  emits: ["click", "context-menu", "dblclick"],
  setup(e, { emit: t }) {
    const n = e, s = t, i = /* @__PURE__ */ J(null), o = /* @__PURE__ */ J(600), r = /* @__PURE__ */ J(92), l = /* @__PURE__ */ J(1), a = /* @__PURE__ */ Mt({}), { totalHeight: f, startIndex: u, endIndex: h, offsetY: p, onScroll: g } = No(
      Z(() => n.assets.length),
      {
        containerHeight: o,
        rowHeight: r,
        itemsPerRow: l,
        bufferRows: 6
      }
    ), A = Z(() => n.assets.slice(u.value, h.value));
    function C(I) {
      switch (I.media_kind) {
        case "image":
          return "🖼";
        case "video":
          return "▶";
        case "audio":
          return "♪";
        default:
          return "📄";
      }
    }
    function E(I) {
      switch (I.media_kind) {
        case "image":
          return "IMG";
        case "video":
          return "VID";
        case "audio":
          return "AUD";
        default:
          return "FILE";
      }
    }
    function R(I) {
      switch (I.media_kind) {
        case "image":
          return "kind-img";
        case "video":
          return "kind-vid";
        case "audio":
          return "kind-aud";
        default:
          return "kind-file";
      }
    }
    function k(I) {
      return Do(I);
    }
    function D(I, N) {
      const P = I.target;
      P.naturalWidth && P.naturalHeight && (a[`${N.type}|${N.subfolder}|${N.name}`] = `${P.naturalWidth}×${P.naturalHeight}`);
    }
    function v(I, N) {
      s("click", I, N, N.ctrlKey || N.metaKey, N.shiftKey);
    }
    function M(I, N) {
      I.dataTransfer && (I.dataTransfer.setData(
        Fo,
        JSON.stringify({ filename: N.name, subfolder: N.subfolder || "", type: N.type })
      ), I.dataTransfer.setData("text/uri-list", pt(N)), I.dataTransfer.effectAllowed = "copyMove");
    }
    let Y = null;
    return Wt(() => {
      i.value && (Y = new ResizeObserver(() => {
        var I;
        o.value = ((I = i.value) == null ? void 0 : I.clientHeight) || 600;
      }), Y.observe(i.value), o.value = i.value.clientHeight);
    }), yt(() => {
      Y == null || Y.disconnect();
    }), (I, N) => (H(), U("div", {
      class: "mav-list-scroll",
      onScroll: N[0] || (N[0] = //@ts-ignore
      (...P) => F(g) && F(g)(...P)),
      ref_key: "scrollEl",
      ref: i
    }, [
      x("div", {
        style: Ze({ height: F(f) + "px", position: "relative" })
      }, [
        x("div", {
          style: Ze({ transform: `translateY(${F(p)}px)`, position: "absolute", top: 0, left: 0, right: 0 })
        }, [
          (H(!0), U(Ce, null, dn(A.value, (P) => (H(), U("div", {
            key: `${P.type}|${P.subfolder}|${P.name}`,
            class: $e(["mav-list-item", { selected: e.isSelected(P) }]),
            onClick: (se) => v(P, se),
            onContextmenu: we((se) => I.$emit("context-menu", P, se.clientX, se.clientY), ["prevent"]),
            onDblclick: (se) => I.$emit("dblclick", P),
            draggable: "true",
            onDragstart: (se) => M(se, P)
          }, [
            x("div", Gc, [
              P.media_kind === "image" ? (H(), U("img", {
                key: 0,
                class: "mav-list-thumb",
                src: F(pt)(P),
                loading: "lazy",
                onLoad: (se) => D(se, P)
              }, null, 40, qc)) : P.media_kind === "video" ? (H(), De(Ho, {
                key: 1,
                src: F(pt)(P) + "#t=0.1"
              }, null, 8, ["src"])) : P.media_kind === "audio" ? (H(), De(Lo, {
                key: 2,
                src: F(pt)(P)
              }, null, 8, ["src"])) : (H(), U("div", Yc, G(C(P)), 1)),
              x("div", {
                class: $e(["mav-list-kind", R(P)])
              }, G(E(P)), 3)
            ]),
            x("div", Jc, [
              x("div", Xc, G(P.name), 1),
              x("div", Zc, [
                x("span", null, G(F(Ds)(P.size)), 1),
                x("span", null, G(k(P.mtime)), 1),
                a[`${P.type}|${P.subfolder}|${P.name}`] ? (H(), U("span", Qc, G(a[`${P.type}|${P.subfolder}|${P.name}`]), 1)) : Oe("", !0),
                P.subfolder ? (H(), U("span", eu, G(P.subfolder), 1)) : Oe("", !0)
              ])
            ])
          ], 42, zc))), 128))
        ], 4)
      ], 4)
    ], 544));
  }
}), nu = /* @__PURE__ */ At(tu, [["__scopeId", "data-v-2233f5d0"]]), su = {
  key: 0,
  class: "mav-selection-bar"
}, iu = { class: "mav-selection-count" }, ou = ["title"], ru = ["title"], lu = ["title"], au = /* @__PURE__ */ tt({
  __name: "SelectionBar",
  props: {
    count: {}
  },
  emits: ["download-all", "delete-all", "clear"],
  setup(e) {
    return (t, n) => e.count > 0 ? (H(), U("div", su, [
      x("span", iu, G(F(z)("selection.count", { n: e.count })), 1),
      x("button", {
        class: "mav-icon-btn",
        onClick: n[0] || (n[0] = (s) => t.$emit("download-all")),
        title: F(z)("selection.downloadAll")
      }, " ⬇ ", 8, ou),
      x("button", {
        class: "mav-icon-btn",
        onClick: n[1] || (n[1] = (s) => t.$emit("delete-all")),
        title: F(z)("selection.deleteAll")
      }, " 🗑 ", 8, ru),
      x("button", {
        class: "mav-icon-btn",
        onClick: n[2] || (n[2] = (s) => t.$emit("clear")),
        title: F(z)("selection.clear")
      }, " ✕ ", 8, lu)
    ])) : Oe("", !0);
  }
}), cu = /* @__PURE__ */ tt({
  __name: "ContextMenu",
  props: {
    visible: { type: Boolean },
    x: {},
    y: {}
  },
  emits: ["action", "close"],
  setup(e, { emit: t }) {
    const n = e, s = t;
    function i(r) {
      s("action", r), s("close");
    }
    function o() {
      n.visible && s("close");
    }
    return mt(
      () => n.visible,
      (r) => {
        r && requestAnimationFrame(() => {
          document.addEventListener("click", o, { once: !0 });
        });
      }
    ), yt(() => {
      document.removeEventListener("click", o);
    }), (r, l) => (H(), De(ro, { to: "body" }, [
      e.visible ? (H(), U("div", {
        key: 0,
        class: "mav-context-menu",
        style: Ze({ left: e.x + "px", top: e.y + "px" }),
        onClick: l[6] || (l[6] = we(() => {
        }, ["stop"]))
      }, [
        x("div", {
          class: "mav-context-item",
          onClick: l[0] || (l[0] = (a) => i("inspect"))
        }, [
          l[7] || (l[7] = x("span", null, "🔍", -1)),
          xt(" " + G(F(z)("contextMenu.inspect")), 1)
        ]),
        x("div", {
          class: "mav-context-item",
          onClick: l[1] || (l[1] = (a) => i("addToWorkflow"))
        }, [
          l[8] || (l[8] = x("span", null, "➕", -1)),
          xt(" " + G(F(z)("contextMenu.addToWorkflow")), 1)
        ]),
        l[13] || (l[13] = x("div", { class: "mav-context-divider" }, null, -1)),
        x("div", {
          class: "mav-context-item",
          onClick: l[2] || (l[2] = (a) => i("download"))
        }, [
          l[9] || (l[9] = x("span", null, "⬇", -1)),
          xt(" " + G(F(z)("contextMenu.download")), 1)
        ]),
        x("div", {
          class: "mav-context-item",
          onClick: l[3] || (l[3] = (a) => i("openWorkflow"))
        }, [
          l[10] || (l[10] = x("span", null, "📂", -1)),
          xt(" " + G(F(z)("contextMenu.openWorkflow")), 1)
        ]),
        x("div", {
          class: "mav-context-item",
          onClick: l[4] || (l[4] = (a) => i("exportWorkflow"))
        }, [
          l[11] || (l[11] = x("span", null, "💾", -1)),
          xt(" " + G(F(z)("contextMenu.exportWorkflow")), 1)
        ]),
        x("div", {
          class: "mav-context-item",
          onClick: l[5] || (l[5] = (a) => i("copyFilename"))
        }, [
          l[12] || (l[12] = x("span", null, "📋", -1)),
          xt(" " + G(F(z)("contextMenu.copyFilename")), 1)
        ])
      ], 4)) : Oe("", !0)
    ]));
  }
}), uu = ["title"], fu = ["title"], du = ["title"], hu = { class: "mav-lightbox-content" }, pu = ["src"], gu = ["src"], mu = ["src"], vu = {
  key: 3,
  class: "mav-lightbox-media mav-lightbox-other"
}, yu = { class: "mav-lightbox-info" }, _u = { style: { opacity: "0.7", "font-size": "12px" } }, bu = /* @__PURE__ */ tt({
  __name: "AssetLightbox",
  props: {
    asset: {},
    list: {}
  },
  emits: ["close", "navigate"],
  setup(e, { emit: t }) {
    const n = e, s = t, i = /* @__PURE__ */ J(null), o = Z(() => pt(n.asset)), r = Z(() => n.list.findIndex((g) => g === n.asset)), l = Z(() => r.value > 0), a = Z(() => r.value >= 0 && r.value < n.list.length - 1);
    function f() {
      s("close");
    }
    function u() {
      l.value && s("navigate", n.list[r.value - 1]);
    }
    function h() {
      a.value && s("navigate", n.list[r.value + 1]);
    }
    function p(g) {
      g.key === "Escape" ? f() : g.key === "ArrowLeft" ? u() : g.key === "ArrowRight" && h();
    }
    return Wt(() => {
      var g;
      (g = i.value) == null || g.focus(), document.addEventListener("keydown", p);
    }), yt(() => {
      document.removeEventListener("keydown", p);
    }), mt(() => n.asset, () => {
      var g;
      (g = i.value) == null || g.focus();
    }), (g, A) => (H(), U("div", {
      class: "mav-lightbox-backdrop",
      onClick: we(f, ["self"]),
      tabindex: "0",
      ref_key: "rootEl",
      ref: i
    }, [
      x("button", {
        class: "mav-lightbox-close",
        onClick: f,
        title: F(z)("lightbox.close")
      }, "×", 8, uu),
      l.value ? (H(), U("button", {
        key: 0,
        class: "mav-lightbox-nav prev",
        onClick: u,
        title: F(z)("lightbox.prev")
      }, "‹", 8, fu)) : Oe("", !0),
      a.value ? (H(), U("button", {
        key: 1,
        class: "mav-lightbox-nav next",
        onClick: h,
        title: F(z)("lightbox.next")
      }, "›", 8, du)) : Oe("", !0),
      x("div", hu, [
        e.asset.media_kind === "image" ? (H(), U("img", {
          key: 0,
          class: "mav-lightbox-media",
          src: o.value
        }, null, 8, pu)) : e.asset.media_kind === "video" ? (H(), U("video", {
          key: 1,
          class: "mav-lightbox-media",
          src: o.value,
          controls: "",
          autoplay: ""
        }, null, 8, gu)) : e.asset.media_kind === "audio" ? (H(), U("audio", {
          key: 2,
          class: "mav-lightbox-media",
          src: o.value,
          controls: "",
          autoplay: ""
        }, null, 8, mu)) : (H(), U("div", vu, [
          x("p", null, G(e.asset.name), 1)
        ])),
        x("div", yu, [
          x("div", null, G(e.asset.name), 1),
          x("div", _u, G(F(Ds)(e.asset.size)) + " · " + G(F(Do)(e.asset.mtime)), 1)
        ])
      ])
    ], 512));
  }
}), wu = /* @__PURE__ */ At(bu, [["__scopeId", "data-v-9c642ea1"]]), xu = { class: "mav-root" }, Cu = { class: "mav-header" }, ku = { class: "mav-title" }, Su = { class: "mav-tabs" }, Tu = { class: "mav-body" }, Mu = {
  key: 0,
  class: "mav-grid-scroll"
}, $u = { class: "mav-skeleton" }, Au = {
  key: 1,
  class: "mav-empty"
}, Eu = { class: "mav-empty-title" }, Ru = { class: "mav-empty-desc" }, Iu = {
  key: 0,
  class: "mav-toast"
}, Ou = /* @__PURE__ */ tt({
  __name: "MediaAssetsViewer",
  setup(e) {
    function t() {
      var L;
      return (L = window.app) == null ? void 0 : L.api;
    }
    const n = /* @__PURE__ */ J("output"), s = /* @__PURE__ */ J(
      localStorage.getItem("mav-viewMode") || "grid"
    ), i = /* @__PURE__ */ Mt({
      search: "",
      mediaKind: "all",
      sort: "date-desc"
    }), { files: o, loading: r, fetchFiles: l, clearCache: a } = Po(), {
      download: f,
      remove: u,
      copyFilename: h,
      exportWorkflow: p,
      openWorkflow: g,
      addToWorkflow: A
    } = za(Re), {
      count: C,
      isSelected: E,
      select: R,
      deselect: k,
      toggle: D,
      rangeSelect: v,
      clear: M,
      selectedAssets: Y
    } = Ga(), I = /* @__PURE__ */ J(null), N = /* @__PURE__ */ Mt({
      visible: !1,
      x: 0,
      y: 0,
      asset: null
    }), P = /* @__PURE__ */ J("");
    let se = null;
    function Re(L) {
      P.value = L, se && clearTimeout(se), se = setTimeout(() => P.value = "", 2500);
    }
    const Se = Z(() => {
      let L = o.value;
      if (i.mediaKind !== "all" && (L = L.filter((X) => X.media_kind === i.mediaKind)), i.search.trim()) {
        const X = i.search.trim().toLowerCase();
        L = L.filter((ye) => ye.name.toLowerCase().includes(X));
      }
      const V = [...L];
      switch (i.sort) {
        case "date-desc":
          V.sort((X, ye) => ye.mtime - X.mtime);
          break;
        case "date-asc":
          V.sort((X, ye) => X.mtime - ye.mtime);
          break;
        case "name-asc":
          V.sort((X, ye) => X.name.localeCompare(ye.name));
          break;
        case "name-desc":
          V.sort((X, ye) => ye.name.localeCompare(X.name));
          break;
        case "size-desc":
          V.sort((X, ye) => ye.size - X.size);
          break;
      }
      return V;
    });
    async function nt(L) {
      n.value !== L && (n.value = L, M(), await l(L));
    }
    function We(L, V, X, ye) {
      ye ? v(L, Se.value) : X ? D(L) : E(L) || (M(), R(L));
    }
    function jt(L) {
      I.value = L;
    }
    function he(L, V, X) {
      N.asset = L, N.x = V, N.y = X, N.visible = !0, E(L) || (M(), R(L));
    }
    async function ce(L) {
      const V = N.asset;
      if (V)
        switch (N.visible = !1, L) {
          case "inspect":
            I.value = V;
            break;
          case "addToWorkflow":
            await A(V);
            break;
          case "download":
            await f(V);
            break;
          case "openWorkflow":
            await g(V);
            break;
          case "exportWorkflow":
            await p(V);
            break;
          case "copyFilename":
            await h(V);
            break;
        }
    }
    async function ie() {
      for (const L of Y.value)
        await f(L);
    }
    async function st() {
      for (const L of [...Y.value])
        await u(L) && k(L);
      M(), await l(n.value, !0);
    }
    mt(s, (L) => {
      localStorage.setItem("mav-viewMode", L);
    });
    let je = null;
    function Ve() {
      je && clearTimeout(je), je = setTimeout(() => {
        a("output"), n.value === "output" && l("output", !0);
      }, 600);
    }
    return Wt(() => {
      var L, V;
      l(n.value);
      try {
        (V = (L = t()) == null ? void 0 : L.addEventListener) == null || V.call(L, "executed", Ve);
      } catch (X) {
        console.warn("[MediaAssetsViewer] 注册 executed 监听失败", X);
      }
    }), yt(() => {
      var L, V;
      try {
        (V = (L = t()) == null ? void 0 : L.removeEventListener) == null || V.call(L, "executed", Ve);
      } catch {
      }
      je && clearTimeout(je);
    }), (L, V) => (H(), U("div", xu, [
      x("header", Cu, [
        x("div", ku, G(F(z)("title")), 1),
        Ee(fc, {
          search: i.search,
          "onUpdate:search": V[0] || (V[0] = (X) => i.search = X),
          mediaKind: i.mediaKind,
          "onUpdate:mediaKind": V[1] || (V[1] = (X) => i.mediaKind = X),
          sort: i.sort,
          "onUpdate:sort": V[2] || (V[2] = (X) => i.sort = X),
          viewMode: s.value,
          "onUpdate:viewMode": V[3] || (V[3] = (X) => s.value = X)
        }, null, 8, ["search", "mediaKind", "sort", "viewMode"]),
        x("div", Su, [
          x("button", {
            class: $e(["mav-tab", { active: n.value === "output" }]),
            onClick: V[4] || (V[4] = (X) => nt("output"))
          }, G(F(z)("tab.output")), 3),
          x("button", {
            class: $e(["mav-tab", { active: n.value === "input" }]),
            onClick: V[5] || (V[5] = (X) => nt("input"))
          }, G(F(z)("tab.input")), 3)
        ])
      ]),
      x("main", Tu, [
        F(r) ? (H(), U("div", Mu, [
          x("div", $u, [
            (H(), U(Ce, null, dn(24, (X) => x("div", {
              key: X,
              class: "mav-skeleton-card"
            })), 64))
          ])
        ])) : Se.value.length === 0 ? (H(), U("div", Au, [
          V[9] || (V[9] = x("div", { class: "mav-empty-icon" }, "📭", -1)),
          x("div", Eu, G(i.search || i.mediaKind !== "all" ? F(z)("empty.noResults") : F(z)("empty.title")), 1),
          x("div", Ru, G(F(z)("empty.desc")), 1)
        ])) : (H(), U(Ce, { key: 2 }, [
          s.value === "grid" ? (H(), De(Uc, {
            key: 0,
            assets: Se.value,
            isSelected: F(E),
            onClick: We,
            onContextMenu: he,
            onDblclick: jt
          }, null, 8, ["assets", "isSelected"])) : (H(), De(nu, {
            key: 1,
            assets: Se.value,
            isSelected: F(E),
            onClick: We,
            onContextMenu: he,
            onDblclick: jt
          }, null, 8, ["assets", "isSelected"]))
        ], 64))
      ]),
      Ee(au, {
        count: F(C),
        onDownloadAll: ie,
        onDeleteAll: st,
        onClear: F(M)
      }, null, 8, ["count", "onClear"]),
      Ee(cu, {
        visible: N.visible,
        x: N.x,
        y: N.y,
        onAction: ce,
        onClose: V[6] || (V[6] = (X) => N.visible = !1)
      }, null, 8, ["visible", "x", "y"]),
      I.value ? (H(), De(wu, {
        key: 0,
        asset: I.value,
        list: Se.value,
        onClose: V[7] || (V[7] = (X) => I.value = null),
        onNavigate: V[8] || (V[8] = (X) => I.value = X)
      }, null, 8, ["asset", "list"])) : Oe("", !0),
      (H(), De(ro, { to: "body" }, [
        P.value ? (H(), U("div", Iu, G(P.value), 1)) : Oe("", !0)
      ]))
    ]));
  }
}), Pu = /* @__PURE__ */ At(Ou, [["__scopeId", "data-v-c0b1a662"]]), Du = "__mavVueApp";
let gt = null;
function Fu() {
  const e = document.createElement("div");
  return e.dataset.mavHost = Du, e.style.height = "100%", e.style.width = "100%", e.style.minHeight = "0", e.style.display = "flex", e.style.flexDirection = "column", e.style.overflow = "hidden", e;
}
function Lu(e, t) {
  e.style.height = "100%", e.style.minHeight = "0", e.style.display = "flex", e.style.flexDirection = "column", e.style.overflow = "hidden", !(e.firstChild === t && e.childNodes.length === 1) && e.replaceChildren(t);
}
function Hu(e) {
  if (!e) return !1;
  let t = !1;
  if (!gt) {
    const n = Fu(), s = ma(Pu);
    s.mount(n), gt = { app: s, host: n, container: null }, t = !0;
  }
  return Lu(e, gt.host), gt.container = e, t;
}
function Nu() {
  if (gt) {
    try {
      gt.app.unmount();
    } catch {
    }
    gt.host.remove(), gt = null;
  }
}
function Wu() {
  const e = new URL("./assets/comfyui-media-assets-viewer-ui.css", import.meta.url).href;
  if (document.querySelector(`link[data-mav-css="${e}"]`)) return;
  const t = document.createElement("link");
  t.rel = "stylesheet", t.href = e, t.setAttribute("data-mav-css", e), document.head.appendChild(t);
}
Wu();
const ju = "MediaAssetsViewer", Vu = "media-assets-viewer";
function Ti(e) {
  var t;
  try {
    const n = (e == null ? void 0 : e.extensionManager) || ((t = e == null ? void 0 : e.ui) == null ? void 0 : t.extensionManager) || (e == null ? void 0 : e.workspaceStore) || null;
    return n && typeof n.registerSidebarTab == "function" ? (n.registerSidebarTab({
      id: Vu,
      icon: "pi pi-images",
      title: z("title"),
      label: z("label"),
      tooltip: z("tooltip"),
      type: "custom",
      render(s) {
        Hu(s);
      },
      destroy(s) {
      }
    }), !0) : (console.warn("[MediaAssetsViewer] registerSidebarTab API 不可用"), !1);
  } catch (n) {
    return console.error("[MediaAssetsViewer] 注册侧边栏失败", n), !1;
  }
}
Ws.registerExtension({
  name: ju,
  async setup() {
    var n;
    const e = Ws;
    let t = !1;
    for (let s = 0; s < 20; s++) {
      const i = (e == null ? void 0 : e.extensionManager) || ((n = e == null ? void 0 : e.ui) == null ? void 0 : n.extensionManager) || (e == null ? void 0 : e.workspaceStore) || null;
      if (i && typeof i.registerSidebarTab == "function" && (t = Ti(e), t))
        break;
      await new Promise((o) => setTimeout(o, 100));
    }
    t || Ti(e);
  }
});
window.addEventListener("beforeunload", () => {
  try {
    Nu();
  } catch {
  }
});
