import {
  DataTextureLoader,
  DataUtils,
  FloatType,
  HalfFloatType,
  LinearFilter,
  LinearSRGBColorSpace,
  NoColorSpace,
  RGBAFormat,
  RedFormat
} from "./chunk-M6PXLJ4O.js";

// ../../node_modules/three/examples/jsm/libs/fflate.module.js
var ch2 = {};
var durl = function(c) {
  return URL.createObjectURL(new Blob([c], { type: "text/javascript" }));
};
var cwk = function(u) {
  return new Worker(u);
};
try {
  URL.revokeObjectURL(durl(""));
} catch (e) {
  durl = function(c) {
    return "data:application/javascript;charset=UTF-8," + encodeURI(c);
  };
  cwk = function(u) {
    return new Worker(u, { type: "module" });
  };
}
var wk = function(c, id, msg, transfer, cb) {
  var w = cwk(ch2[id] || (ch2[id] = durl(c)));
  w.onerror = function(e) {
    return cb(e.error, null);
  };
  w.onmessage = function(e) {
    return cb(null, e.data);
  };
  w.postMessage(msg, transfer);
  return w;
};
var u8 = Uint8Array;
var u16 = Uint16Array;
var u32 = Uint32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  var r = new u32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return [b, r];
};
var _a = freb(fleb, 2);
var fl = _a[0];
var revfl = _a[1];
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b[0];
var revfd = _b[1];
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >>> 1 | (i & 21845) << 1;
  x = (x & 52428) >>> 2 | (x & 13107) << 2;
  x = (x & 61680) >>> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >>> 8 | (x & 255) << 8) >>> 1;
}
var x;
var i;
var hMap = function(cd, mb, r) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i)
    ++l[cd[i] - 1];
  var le = new u16(mb);
  for (i = 0; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >>> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        co[i] = rev[le[cd[i] - 1]++] >>> 15 - cd[i];
      }
    }
  }
  return co;
};
var flt = new u8(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var flm = hMap(flt, 9, 0);
var flrm = hMap(flt, 9, 1);
var fdm = hMap(fdt, 5, 0);
var fdrm = hMap(fdt, 5, 1);
var max = function(a) {
  var m = a[0];
  for (var i = 1; i < a.length; ++i) {
    if (a[i] > m)
      m = a[i];
  }
  return m;
};
var bits = function(d, p, m) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
var bits16 = function(d, p) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
var shft = function(p) {
  return (p / 8 | 0) + (p & 7 && 1);
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  var n = new (v instanceof u16 ? u16 : v instanceof u32 ? u32 : u8)(e - s);
  n.set(v.subarray(s, e));
  return n;
};
var inflt = function(dat, buf, st) {
  var sl = dat.length;
  if (!sl || st && !st.l && sl < 5)
    return buf || new u8(0);
  var noBuf = !buf || st;
  var noSt = !st || st.i;
  if (!st)
    st = {};
  if (!buf)
    buf = new u8(sl * 3);
  var cbuf = function(l2) {
    var bl = buf.length;
    if (l2 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l2));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      st.f = final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
        if (t > sl) {
          if (noSt)
            throw "unexpected EOF";
          break;
        }
        if (noBuf)
          cbuf(bt + l);
        buf.set(dat.subarray(s, t), bt);
        st.b = bt += l, st.p = pos = t * 8;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i = 0; i < hcLen; ++i) {
          clt[clim[i]] = bits(dat, pos + i * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i = 0; i < tl; ) {
          var r = clm[bits(dat, pos, clbmsk)];
          pos += r & 15;
          var s = r >>> 4;
          if (s < 16) {
            ldt[i++] = s;
          } else {
            var c = 0, n = 0;
            if (s == 16)
              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
            else if (s == 17)
              n = 3 + bits(dat, pos, 7), pos += 3;
            else if (s == 18)
              n = 11 + bits(dat, pos, 127), pos += 7;
            while (n--)
              ldt[i++] = c;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max(lt);
        dbt = max(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        throw "invalid block type";
      if (pos > tbts) {
        if (noSt)
          throw "unexpected EOF";
        break;
      }
    }
    if (noBuf)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
      pos += c & 15;
      if (pos > tbts) {
        if (noSt)
          throw "unexpected EOF";
        break;
      }
      if (!c)
        throw "invalid length/literal";
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add = sym - 254;
        if (sym > 264) {
          var i = sym - 257, b = fleb[i];
          add = bits(dat, pos, (1 << b) - 1) + fl[i];
          pos += b;
        }
        var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
        if (!d)
          throw "invalid distance";
        pos += d & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
        }
        if (pos > tbts) {
          if (noSt)
            throw "unexpected EOF";
          break;
        }
        if (noBuf)
          cbuf(bt + 131072);
        var end = bt + add;
        for (; bt < end; bt += 4) {
          buf[bt] = buf[bt - dt];
          buf[bt + 1] = buf[bt + 1 - dt];
          buf[bt + 2] = buf[bt + 2 - dt];
          buf[bt + 3] = buf[bt + 3 - dt];
        }
        bt = end;
      }
    }
    st.l = lm, st.p = lpos, st.b = bt;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt == buf.length ? buf : slc(buf, 0, bt);
};
var wbits = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >>> 8;
};
var wbits16 = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >>> 8;
  d[o + 2] |= v >>> 16;
};
var hTree = function(d, mb) {
  var t = [];
  for (var i = 0; i < d.length; ++i) {
    if (d[i])
      t.push({ s: i, f: d[i] });
  }
  var s = t.length;
  var t2 = t.slice();
  if (!s)
    return [et, 0];
  if (s == 1) {
    var v = new u8(t[0].s + 1);
    v[t[0].s] = 1;
    return [v, 1];
  }
  t.sort(function(a, b) {
    return a.f - b.f;
  });
  t.push({ s: -1, f: 25001 });
  var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
  t[0] = { s: -1, f: l.f + r.f, l, r };
  while (i1 != s - 1) {
    l = t[t[i0].f < t[i2].f ? i0++ : i2++];
    r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
    t[i1++] = { s: -1, f: l.f + r.f, l, r };
  }
  var maxSym = t2[0].s;
  for (var i = 1; i < s; ++i) {
    if (t2[i].s > maxSym)
      maxSym = t2[i].s;
  }
  var tr = new u16(maxSym + 1);
  var mbt = ln(t[i1 - 1], tr, 0);
  if (mbt > mb) {
    var i = 0, dt = 0;
    var lft = mbt - mb, cst = 1 << lft;
    t2.sort(function(a, b) {
      return tr[b.s] - tr[a.s] || a.f - b.f;
    });
    for (; i < s; ++i) {
      var i2_1 = t2[i].s;
      if (tr[i2_1] > mb) {
        dt += cst - (1 << mbt - tr[i2_1]);
        tr[i2_1] = mb;
      } else
        break;
    }
    dt >>>= lft;
    while (dt > 0) {
      var i2_2 = t2[i].s;
      if (tr[i2_2] < mb)
        dt -= 1 << mb - tr[i2_2]++ - 1;
      else
        ++i;
    }
    for (; i >= 0 && dt; --i) {
      var i2_3 = t2[i].s;
      if (tr[i2_3] == mb) {
        --tr[i2_3];
        ++dt;
      }
    }
    mbt = mb;
  }
  return [new u8(tr), mbt];
};
var ln = function(n, l, d) {
  return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
};
var lc = function(c) {
  var s = c.length;
  while (s && !c[--s])
    ;
  var cl = new u16(++s);
  var cli = 0, cln = c[0], cls = 1;
  var w = function(v) {
    cl[cli++] = v;
  };
  for (var i = 1; i <= s; ++i) {
    if (c[i] == cln && i != s)
      ++cls;
    else {
      if (!cln && cls > 2) {
        for (; cls > 138; cls -= 138)
          w(32754);
        if (cls > 2) {
          w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
          cls = 0;
        }
      } else if (cls > 3) {
        w(cln), --cls;
        for (; cls > 6; cls -= 6)
          w(8304);
        if (cls > 2)
          w(cls - 3 << 5 | 8208), cls = 0;
      }
      while (cls--)
        w(cln);
      cls = 1;
      cln = c[i];
    }
  }
  return [cl.subarray(0, cli), s];
};
var clen = function(cf, cl) {
  var l = 0;
  for (var i = 0; i < cl.length; ++i)
    l += cf[i] * cl[i];
  return l;
};
var wfblk = function(out, pos, dat) {
  var s = dat.length;
  var o = shft(pos + 2);
  out[o] = s & 255;
  out[o + 1] = s >>> 8;
  out[o + 2] = out[o] ^ 255;
  out[o + 3] = out[o + 1] ^ 255;
  for (var i = 0; i < s; ++i)
    out[o + i + 4] = dat[i];
  return (o + 4 + s) * 8;
};
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
  wbits(out, p++, final);
  ++lf[256];
  var _a2 = hTree(lf, 15), dlt = _a2[0], mlb = _a2[1];
  var _b2 = hTree(df, 15), ddt = _b2[0], mdb = _b2[1];
  var _c = lc(dlt), lclt = _c[0], nlc = _c[1];
  var _d = lc(ddt), lcdt = _d[0], ndc = _d[1];
  var lcfreq = new u16(19);
  for (var i = 0; i < lclt.length; ++i)
    lcfreq[lclt[i] & 31]++;
  for (var i = 0; i < lcdt.length; ++i)
    lcfreq[lcdt[i] & 31]++;
  var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1];
  var nlcc = 19;
  for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
    ;
  var flen = bl + 5 << 3;
  var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
  var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
  if (flen <= ftlen && flen <= dtlen)
    return wfblk(out, p, dat.subarray(bs, bs + bl));
  var lm, ll, dm, dl;
  wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
  if (dtlen < ftlen) {
    lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
    var llm = hMap(lct, mlcb, 0);
    wbits(out, p, nlc - 257);
    wbits(out, p + 5, ndc - 1);
    wbits(out, p + 10, nlcc - 4);
    p += 14;
    for (var i = 0; i < nlcc; ++i)
      wbits(out, p + 3 * i, lct[clim[i]]);
    p += 3 * nlcc;
    var lcts = [lclt, lcdt];
    for (var it = 0; it < 2; ++it) {
      var clct = lcts[it];
      for (var i = 0; i < clct.length; ++i) {
        var len = clct[i] & 31;
        wbits(out, p, llm[len]), p += lct[len];
        if (len > 15)
          wbits(out, p, clct[i] >>> 5 & 127), p += clct[i] >>> 12;
      }
    }
  } else {
    lm = flm, ll = flt, dm = fdm, dl = fdt;
  }
  for (var i = 0; i < li; ++i) {
    if (syms[i] > 255) {
      var len = syms[i] >>> 18 & 31;
      wbits16(out, p, lm[len + 257]), p += ll[len + 257];
      if (len > 7)
        wbits(out, p, syms[i] >>> 23 & 31), p += fleb[len];
      var dst = syms[i] & 31;
      wbits16(out, p, dm[dst]), p += dl[dst];
      if (dst > 3)
        wbits16(out, p, syms[i] >>> 5 & 8191), p += fdeb[dst];
    } else {
      wbits16(out, p, lm[syms[i]]), p += ll[syms[i]];
    }
  }
  wbits16(out, p, lm[256]);
  return p + ll[256];
};
var deo = new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var et = new u8(0);
var dflt = function(dat, lvl, plvl, pre, post, lst) {
  var s = dat.length;
  var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
  var w = o.subarray(pre, o.length - post);
  var pos = 0;
  if (!lvl || s < 8) {
    for (var i = 0; i <= s; i += 65535) {
      var e = i + 65535;
      if (e < s) {
        pos = wfblk(w, pos, dat.subarray(i, e));
      } else {
        w[i] = lst;
        pos = wfblk(w, pos, dat.subarray(i, s));
      }
    }
  } else {
    var opt = deo[lvl - 1];
    var n = opt >>> 13, c = opt & 8191;
    var msk_1 = (1 << plvl) - 1;
    var prev = new u16(32768), head = new u16(msk_1 + 1);
    var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
    var hsh = function(i2) {
      return (dat[i2] ^ dat[i2 + 1] << bs1_1 ^ dat[i2 + 2] << bs2_1) & msk_1;
    };
    var syms = new u32(25e3);
    var lf = new u16(288), df = new u16(32);
    var lc_1 = 0, eb = 0, i = 0, li = 0, wi = 0, bs = 0;
    for (; i < s; ++i) {
      var hv = hsh(i);
      var imod = i & 32767, pimod = head[hv];
      prev[imod] = pimod;
      head[hv] = imod;
      if (wi <= i) {
        var rem = s - i;
        if ((lc_1 > 7e3 || li > 24576) && rem > 423) {
          pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
          li = lc_1 = eb = 0, bs = i;
          for (var j = 0; j < 286; ++j)
            lf[j] = 0;
          for (var j = 0; j < 30; ++j)
            df[j] = 0;
        }
        var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
        if (rem > 2 && hv == hsh(i - dif)) {
          var maxn = Math.min(n, rem) - 1;
          var maxd = Math.min(32767, i);
          var ml = Math.min(258, rem);
          while (dif <= maxd && --ch_1 && imod != pimod) {
            if (dat[i + l] == dat[i + l - dif]) {
              var nl = 0;
              for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                ;
              if (nl > l) {
                l = nl, d = dif;
                if (nl > maxn)
                  break;
                var mmd = Math.min(dif, nl - 2);
                var md = 0;
                for (var j = 0; j < mmd; ++j) {
                  var ti = i - dif + j + 32768 & 32767;
                  var pti = prev[ti];
                  var cd = ti - pti + 32768 & 32767;
                  if (cd > md)
                    md = cd, pimod = ti;
                }
              }
            }
            imod = pimod, pimod = prev[imod];
            dif += imod - pimod + 32768 & 32767;
          }
        }
        if (d) {
          syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
          var lin = revfl[l] & 31, din = revfd[d] & 31;
          eb += fleb[lin] + fdeb[din];
          ++lf[257 + lin];
          ++df[din];
          wi = i + l;
          ++lc_1;
        } else {
          syms[li++] = dat[i];
          ++lf[dat[i]];
        }
      }
    }
    pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
    if (!lst && pos & 7)
      pos = wfblk(w, pos + 1, et);
  }
  return slc(o, 0, pre + shft(pos) + post);
};
var crct = function() {
  var t = new u32(256);
  for (var i = 0; i < 256; ++i) {
    var c = i, k = 9;
    while (--k)
      c = (c & 1 && 3988292384) ^ c >>> 1;
    t[i] = c;
  }
  return t;
}();
var crc = function() {
  var c = -1;
  return {
    p: function(d) {
      var cr = c;
      for (var i = 0; i < d.length; ++i)
        cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
      c = cr;
    },
    d: function() {
      return ~c;
    }
  };
};
var adler = function() {
  var a = 1, b = 0;
  return {
    p: function(d) {
      var n = a, m = b;
      var l = d.length;
      for (var i = 0; i != l; ) {
        var e = Math.min(i + 2655, l);
        for (; i < e; ++i)
          m += n += d[i];
        n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
      }
      a = n, b = m;
    },
    d: function() {
      a %= 65521, b %= 65521;
      return (a & 255) << 24 | a >>> 8 << 16 | (b & 255) << 8 | b >>> 8;
    }
  };
};
var dopt = function(dat, opt, pre, post, st) {
  return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 12 + opt.mem, pre, post, !st);
};
var mrg = function(a, b) {
  var o = {};
  for (var k in a)
    o[k] = a[k];
  for (var k in b)
    o[k] = b[k];
  return o;
};
var wcln = function(fn, fnStr, td2) {
  var dt = fn();
  var st = fn.toString();
  var ks = st.slice(st.indexOf("[") + 1, st.lastIndexOf("]")).replace(/ /g, "").split(",");
  for (var i = 0; i < dt.length; ++i) {
    var v = dt[i], k = ks[i];
    if (typeof v == "function") {
      fnStr += ";" + k + "=";
      var st_1 = v.toString();
      if (v.prototype) {
        if (st_1.indexOf("[native code]") != -1) {
          var spInd = st_1.indexOf(" ", 8) + 1;
          fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
        } else {
          fnStr += st_1;
          for (var t in v.prototype)
            fnStr += ";" + k + ".prototype." + t + "=" + v.prototype[t].toString();
        }
      } else
        fnStr += st_1;
    } else
      td2[k] = v;
  }
  return [fnStr, td2];
};
var ch = [];
var cbfs = function(v) {
  var tl = [];
  for (var k in v) {
    if (v[k] instanceof u8 || v[k] instanceof u16 || v[k] instanceof u32)
      tl.push((v[k] = new v[k].constructor(v[k])).buffer);
  }
  return tl;
};
var wrkr = function(fns, init, id, cb) {
  var _a2;
  if (!ch[id]) {
    var fnStr = "", td_1 = {}, m = fns.length - 1;
    for (var i = 0; i < m; ++i)
      _a2 = wcln(fns[i], fnStr, td_1), fnStr = _a2[0], td_1 = _a2[1];
    ch[id] = wcln(fns[m], fnStr, td_1);
  }
  var td2 = mrg({}, ch[id][1]);
  return wk(ch[id][0] + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init.toString() + "}", id, td2, cbfs(td2), cb);
};
var bInflt = function() {
  return [u8, u16, u32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, hMap, max, bits, bits16, shft, slc, inflt, inflateSync, pbf, gu8];
};
var bDflt = function() {
  return [u8, u16, u32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf];
};
var guze = function() {
  return [gzs, gzl];
};
var zule = function() {
  return [zlv];
};
var pbf = function(msg) {
  return postMessage(msg, [msg.buffer]);
};
var gu8 = function(o) {
  return o && o.size && new u8(o.size);
};
var astrm = function(strm) {
  strm.ondata = function(dat, final) {
    return postMessage([dat, final], [dat.buffer]);
  };
  return function(ev) {
    return strm.push(ev.data[0], ev.data[1]);
  };
};
var astrmify = function(fns, strm, opts, init, id) {
  var t;
  var w = wrkr(fns, init, id, function(err, dat) {
    if (err)
      w.terminate(), strm.ondata.call(strm, err);
    else {
      if (dat[1])
        w.terminate();
      strm.ondata.call(strm, err, dat[0], dat[1]);
    }
  });
  w.postMessage(opts);
  strm.push = function(d, f) {
    if (t)
      throw "stream finished";
    if (!strm.ondata)
      throw "no stream handler";
    w.postMessage([d, t = f], [d.buffer]);
  };
  strm.terminate = function() {
    w.terminate();
  };
};
var b2 = function(d, b) {
  return d[b] | d[b + 1] << 8;
};
var b4 = function(d, b) {
  return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
};
var b8 = function(d, b) {
  return b4(d, b) + b4(d, b + 4) * 4294967296;
};
var wbytes = function(d, b, v) {
  for (; v; ++b)
    d[b] = v, v >>>= 8;
};
var gzh = function(c, o) {
  var fn = o.filename;
  c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3;
  if (o.mtime != 0)
    wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1e3));
  if (fn) {
    c[3] = 8;
    for (var i = 0; i <= fn.length; ++i)
      c[i + 10] = fn.charCodeAt(i);
  }
};
var gzs = function(d) {
  if (d[0] != 31 || d[1] != 139 || d[2] != 8)
    throw "invalid gzip data";
  var flg = d[3];
  var st = 10;
  if (flg & 4)
    st += d[10] | (d[11] << 8) + 2;
  for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
    ;
  return st + (flg & 2);
};
var gzl = function(d) {
  var l = d.length;
  return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
};
var gzhl = function(o) {
  return 10 + (o.filename && o.filename.length + 1 || 0);
};
var zlh = function(c, o) {
  var lv = o.level, fl2 = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
  c[0] = 120, c[1] = fl2 << 6 | (fl2 ? 32 - 2 * fl2 : 1);
};
var zlv = function(d) {
  if ((d[0] & 15) != 8 || d[0] >>> 4 > 7 || (d[0] << 8 | d[1]) % 31)
    throw "invalid zlib data";
  if (d[1] & 32)
    throw "invalid zlib data: preset dictionaries not supported";
};
function AsyncCmpStrm(opts, cb) {
  if (!cb && typeof opts == "function")
    cb = opts, opts = {};
  this.ondata = cb;
  return opts;
}
var Deflate = function() {
  function Deflate2(opts, cb) {
    if (!cb && typeof opts == "function")
      cb = opts, opts = {};
    this.ondata = cb;
    this.o = opts || {};
  }
  Deflate2.prototype.p = function(c, f) {
    this.ondata(dopt(c, this.o, 0, 0, !f), f);
  };
  Deflate2.prototype.push = function(chunk, final) {
    if (this.d)
      throw "stream finished";
    if (!this.ondata)
      throw "no stream handler";
    this.d = final;
    this.p(chunk, final || false);
  };
  return Deflate2;
}();
var AsyncDeflate = /* @__PURE__ */ function() {
  function AsyncDeflate2(opts, cb) {
    astrmify([
      bDflt,
      function() {
        return [astrm, Deflate];
      }
    ], this, AsyncCmpStrm.call(this, opts, cb), function(ev) {
      var strm = new Deflate(ev.data);
      onmessage = astrm(strm);
    }, 6);
  }
  return AsyncDeflate2;
}();
function deflateSync(data, opts) {
  return dopt(data, opts || {}, 0, 0);
}
var Inflate = function() {
  function Inflate2(cb) {
    this.s = {};
    this.p = new u8(0);
    this.ondata = cb;
  }
  Inflate2.prototype.e = function(c) {
    if (this.d)
      throw "stream finished";
    if (!this.ondata)
      throw "no stream handler";
    var l = this.p.length;
    var n = new u8(l + c.length);
    n.set(this.p), n.set(c, l), this.p = n;
  };
  Inflate2.prototype.c = function(final) {
    this.d = this.s.i = final || false;
    var bts = this.s.b;
    var dt = inflt(this.p, this.o, this.s);
    this.ondata(slc(dt, bts, this.s.b), this.d);
    this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
    this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;
  };
  Inflate2.prototype.push = function(chunk, final) {
    this.e(chunk), this.c(final);
  };
  return Inflate2;
}();
var AsyncInflate = /* @__PURE__ */ function() {
  function AsyncInflate2(cb) {
    this.ondata = cb;
    astrmify([
      bInflt,
      function() {
        return [astrm, Inflate];
      }
    ], this, 0, function() {
      var strm = new Inflate();
      onmessage = astrm(strm);
    }, 7);
  }
  return AsyncInflate2;
}();
function inflateSync(data, out) {
  return inflt(data, out);
}
var Gzip = function() {
  function Gzip2(opts, cb) {
    this.c = crc();
    this.l = 0;
    this.v = 1;
    Deflate.call(this, opts, cb);
  }
  Gzip2.prototype.push = function(chunk, final) {
    Deflate.prototype.push.call(this, chunk, final);
  };
  Gzip2.prototype.p = function(c, f) {
    this.c.p(c);
    this.l += c.length;
    var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, !f);
    if (this.v)
      gzh(raw, this.o), this.v = 0;
    if (f)
      wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
    this.ondata(raw, f);
  };
  return Gzip2;
}();
var Gunzip = function() {
  function Gunzip2(cb) {
    this.v = 1;
    Inflate.call(this, cb);
  }
  Gunzip2.prototype.push = function(chunk, final) {
    Inflate.prototype.e.call(this, chunk);
    if (this.v) {
      var s = this.p.length > 3 ? gzs(this.p) : 4;
      if (s >= this.p.length && !final)
        return;
      this.p = this.p.subarray(s), this.v = 0;
    }
    if (final) {
      if (this.p.length < 8)
        throw "invalid gzip stream";
      this.p = this.p.subarray(0, -8);
    }
    Inflate.prototype.c.call(this, final);
  };
  return Gunzip2;
}();
var AsyncGunzip = /* @__PURE__ */ function() {
  function AsyncGunzip2(cb) {
    this.ondata = cb;
    astrmify([
      bInflt,
      guze,
      function() {
        return [astrm, Inflate, Gunzip];
      }
    ], this, 0, function() {
      var strm = new Gunzip();
      onmessage = astrm(strm);
    }, 9);
  }
  return AsyncGunzip2;
}();
var Zlib = function() {
  function Zlib2(opts, cb) {
    this.c = adler();
    this.v = 1;
    Deflate.call(this, opts, cb);
  }
  Zlib2.prototype.push = function(chunk, final) {
    Deflate.prototype.push.call(this, chunk, final);
  };
  Zlib2.prototype.p = function(c, f) {
    this.c.p(c);
    var raw = dopt(c, this.o, this.v && 2, f && 4, !f);
    if (this.v)
      zlh(raw, this.o), this.v = 0;
    if (f)
      wbytes(raw, raw.length - 4, this.c.d());
    this.ondata(raw, f);
  };
  return Zlib2;
}();
var Unzlib = function() {
  function Unzlib2(cb) {
    this.v = 1;
    Inflate.call(this, cb);
  }
  Unzlib2.prototype.push = function(chunk, final) {
    Inflate.prototype.e.call(this, chunk);
    if (this.v) {
      if (this.p.length < 2 && !final)
        return;
      this.p = this.p.subarray(2), this.v = 0;
    }
    if (final) {
      if (this.p.length < 4)
        throw "invalid zlib stream";
      this.p = this.p.subarray(0, -4);
    }
    Inflate.prototype.c.call(this, final);
  };
  return Unzlib2;
}();
var AsyncUnzlib = /* @__PURE__ */ function() {
  function AsyncUnzlib2(cb) {
    this.ondata = cb;
    astrmify([
      bInflt,
      zule,
      function() {
        return [astrm, Inflate, Unzlib];
      }
    ], this, 0, function() {
      var strm = new Unzlib();
      onmessage = astrm(strm);
    }, 11);
  }
  return AsyncUnzlib2;
}();
function unzlibSync(data, out) {
  return inflt((zlv(data), data.subarray(2, -4)), out);
}
var Decompress = function() {
  function Decompress2(cb) {
    this.G = Gunzip;
    this.I = Inflate;
    this.Z = Unzlib;
    this.ondata = cb;
  }
  Decompress2.prototype.push = function(chunk, final) {
    if (!this.ondata)
      throw "no stream handler";
    if (!this.s) {
      if (this.p && this.p.length) {
        var n = new u8(this.p.length + chunk.length);
        n.set(this.p), n.set(chunk, this.p.length);
      } else
        this.p = chunk;
      if (this.p.length > 2) {
        var _this_1 = this;
        var cb = function() {
          _this_1.ondata.apply(_this_1, arguments);
        };
        this.s = this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8 ? new this.G(cb) : (this.p[0] & 15) != 8 || this.p[0] >> 4 > 7 || (this.p[0] << 8 | this.p[1]) % 31 ? new this.I(cb) : new this.Z(cb);
        this.s.push(this.p, final);
        this.p = null;
      }
    } else
      this.s.push(chunk, final);
  };
  return Decompress2;
}();
var AsyncDecompress = function() {
  function AsyncDecompress2(cb) {
    this.G = AsyncGunzip;
    this.I = AsyncInflate;
    this.Z = AsyncUnzlib;
    this.ondata = cb;
  }
  AsyncDecompress2.prototype.push = function(chunk, final) {
    Decompress.prototype.push.call(this, chunk, final);
  };
  return AsyncDecompress2;
}();
var te = typeof TextEncoder != "undefined" && new TextEncoder();
var td = typeof TextDecoder != "undefined" && new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}
var dutf8 = function(d) {
  for (var r = "", i = 0; ; ) {
    var c = d[i++];
    var eb = (c > 127) + (c > 223) + (c > 239);
    if (i + eb > d.length)
      return [r, slc(d, i - 1)];
    if (!eb)
      r += String.fromCharCode(c);
    else if (eb == 3) {
      c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | d[i++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
    } else if (eb & 1)
      r += String.fromCharCode((c & 31) << 6 | d[i++] & 63);
    else
      r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | d[i++] & 63);
  }
};
var DecodeUTF8 = function() {
  function DecodeUTF82(cb) {
    this.ondata = cb;
    if (tds)
      this.t = new TextDecoder();
    else
      this.p = et;
  }
  DecodeUTF82.prototype.push = function(chunk, final) {
    if (!this.ondata)
      throw "no callback";
    final = !!final;
    if (this.t) {
      this.ondata(this.t.decode(chunk, { stream: true }), final);
      if (final) {
        if (this.t.decode().length)
          throw "invalid utf-8 data";
        this.t = null;
      }
      return;
    }
    if (!this.p)
      throw "stream finished";
    var dat = new u8(this.p.length + chunk.length);
    dat.set(this.p);
    dat.set(chunk, this.p.length);
    var _a2 = dutf8(dat), ch3 = _a2[0], np = _a2[1];
    if (final) {
      if (np.length)
        throw "invalid utf-8 data";
      this.p = null;
    } else
      this.p = np;
    this.ondata(ch3, final);
  };
  return DecodeUTF82;
}();
var EncodeUTF8 = function() {
  function EncodeUTF82(cb) {
    this.ondata = cb;
  }
  EncodeUTF82.prototype.push = function(chunk, final) {
    if (!this.ondata)
      throw "no callback";
    if (this.d)
      throw "stream finished";
    this.ondata(strToU8(chunk), this.d = final || false);
  };
  return EncodeUTF82;
}();
function strToU8(str, latin1) {
  if (latin1) {
    var ar_1 = new u8(str.length);
    for (var i = 0; i < str.length; ++i)
      ar_1[i] = str.charCodeAt(i);
    return ar_1;
  }
  if (te)
    return te.encode(str);
  var l = str.length;
  var ar = new u8(str.length + (str.length >> 1));
  var ai = 0;
  var w = function(v) {
    ar[ai++] = v;
  };
  for (var i = 0; i < l; ++i) {
    if (ai + 5 > ar.length) {
      var n = new u8(ai + 8 + (l - i << 1));
      n.set(ar);
      ar = n;
    }
    var c = str.charCodeAt(i);
    if (c < 128 || latin1)
      w(c);
    else if (c < 2048)
      w(192 | c >> 6), w(128 | c & 63);
    else if (c > 55295 && c < 57344)
      c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
    else
      w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
  }
  return slc(ar, 0, ai);
}
function strFromU8(dat, latin1) {
  if (latin1) {
    var r = "";
    for (var i = 0; i < dat.length; i += 16384)
      r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
    return r;
  } else if (td)
    return td.decode(dat);
  else {
    var _a2 = dutf8(dat), out = _a2[0], ext = _a2[1];
    if (ext.length)
      throw "invalid utf-8 data";
    return out;
  }
}
var dbf = function(l) {
  return l == 1 ? 3 : l < 6 ? 2 : l == 9 ? 1 : 0;
};
var z64e = function(d, b) {
  for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
    ;
  return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
};
var exfl = function(ex) {
  var le = 0;
  if (ex) {
    for (var k in ex) {
      var l = ex[k].length;
      if (l > 65535)
        throw "extra field too long";
      le += l + 4;
    }
  }
  return le;
};
var wzh = function(d, b, f, fn, u, c, ce, co) {
  var fl2 = fn.length, ex = f.extra, col = co && co.length;
  var exl = exfl(ex);
  wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
  if (ce != null)
    d[b++] = 20, d[b++] = f.os;
  d[b] = 20, b += 2;
  d[b++] = f.flag << 1 | (c == null && 8), d[b++] = u && 8;
  d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
  var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
  if (y < 0 || y > 119)
    throw "date not in range 1980-2099";
  wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >>> 1), b += 4;
  if (c != null) {
    wbytes(d, b, f.crc);
    wbytes(d, b + 4, c);
    wbytes(d, b + 8, f.size);
  }
  wbytes(d, b + 12, fl2);
  wbytes(d, b + 14, exl), b += 16;
  if (ce != null) {
    wbytes(d, b, col);
    wbytes(d, b + 6, f.attrs);
    wbytes(d, b + 10, ce), b += 14;
  }
  d.set(fn, b);
  b += fl2;
  if (exl) {
    for (var k in ex) {
      var exf = ex[k], l = exf.length;
      wbytes(d, b, +k);
      wbytes(d, b + 2, l);
      d.set(exf, b + 4), b += 4 + l;
    }
  }
  if (col)
    d.set(co, b), b += col;
  return b;
};
var wzf = function(o, b, c, d, e) {
  wbytes(o, b, 101010256);
  wbytes(o, b + 8, c);
  wbytes(o, b + 10, c);
  wbytes(o, b + 12, d);
  wbytes(o, b + 16, e);
};
var ZipPassThrough = function() {
  function ZipPassThrough2(filename) {
    this.filename = filename;
    this.c = crc();
    this.size = 0;
    this.compression = 0;
  }
  ZipPassThrough2.prototype.process = function(chunk, final) {
    this.ondata(null, chunk, final);
  };
  ZipPassThrough2.prototype.push = function(chunk, final) {
    if (!this.ondata)
      throw "no callback - add to ZIP archive before pushing";
    this.c.p(chunk);
    this.size += chunk.length;
    if (final)
      this.crc = this.c.d();
    this.process(chunk, final || false);
  };
  return ZipPassThrough2;
}();
var ZipDeflate = function() {
  function ZipDeflate2(filename, opts) {
    var _this_1 = this;
    if (!opts)
      opts = {};
    ZipPassThrough.call(this, filename);
    this.d = new Deflate(opts, function(dat, final) {
      _this_1.ondata(null, dat, final);
    });
    this.compression = 8;
    this.flag = dbf(opts.level);
  }
  ZipDeflate2.prototype.process = function(chunk, final) {
    try {
      this.d.push(chunk, final);
    } catch (e) {
      this.ondata(e, null, final);
    }
  };
  ZipDeflate2.prototype.push = function(chunk, final) {
    ZipPassThrough.prototype.push.call(this, chunk, final);
  };
  return ZipDeflate2;
}();
var AsyncZipDeflate = function() {
  function AsyncZipDeflate2(filename, opts) {
    var _this_1 = this;
    if (!opts)
      opts = {};
    ZipPassThrough.call(this, filename);
    this.d = new AsyncDeflate(opts, function(err, dat, final) {
      _this_1.ondata(err, dat, final);
    });
    this.compression = 8;
    this.flag = dbf(opts.level);
    this.terminate = this.d.terminate;
  }
  AsyncZipDeflate2.prototype.process = function(chunk, final) {
    this.d.push(chunk, final);
  };
  AsyncZipDeflate2.prototype.push = function(chunk, final) {
    ZipPassThrough.prototype.push.call(this, chunk, final);
  };
  return AsyncZipDeflate2;
}();
var Zip = function() {
  function Zip2(cb) {
    this.ondata = cb;
    this.u = [];
    this.d = 1;
  }
  Zip2.prototype.add = function(file) {
    var _this_1 = this;
    if (this.d & 2)
      throw "stream finished";
    var f = strToU8(file.filename), fl2 = f.length;
    var com = file.comment, o = com && strToU8(com);
    var u = fl2 != file.filename.length || o && com.length != o.length;
    var hl = fl2 + exfl(file.extra) + 30;
    if (fl2 > 65535)
      throw "filename too long";
    var header = new u8(hl);
    wzh(header, 0, file, f, u);
    var chks = [header];
    var pAll = function() {
      for (var _i = 0, chks_1 = chks; _i < chks_1.length; _i++) {
        var chk = chks_1[_i];
        _this_1.ondata(null, chk, false);
      }
      chks = [];
    };
    var tr = this.d;
    this.d = 0;
    var ind = this.u.length;
    var uf = mrg(file, {
      f,
      u,
      o,
      t: function() {
        if (file.terminate)
          file.terminate();
      },
      r: function() {
        pAll();
        if (tr) {
          var nxt = _this_1.u[ind + 1];
          if (nxt)
            nxt.r();
          else
            _this_1.d = 1;
        }
        tr = 1;
      }
    });
    var cl = 0;
    file.ondata = function(err, dat, final) {
      if (err) {
        _this_1.ondata(err, dat, final);
        _this_1.terminate();
      } else {
        cl += dat.length;
        chks.push(dat);
        if (final) {
          var dd = new u8(16);
          wbytes(dd, 0, 134695760);
          wbytes(dd, 4, file.crc);
          wbytes(dd, 8, cl);
          wbytes(dd, 12, file.size);
          chks.push(dd);
          uf.c = cl, uf.b = hl + cl + 16, uf.crc = file.crc, uf.size = file.size;
          if (tr)
            uf.r();
          tr = 1;
        } else if (tr)
          pAll();
      }
    };
    this.u.push(uf);
  };
  Zip2.prototype.end = function() {
    var _this_1 = this;
    if (this.d & 2) {
      if (this.d & 1)
        throw "stream finishing";
      throw "stream finished";
    }
    if (this.d)
      this.e();
    else
      this.u.push({
        r: function() {
          if (!(_this_1.d & 1))
            return;
          _this_1.u.splice(-1, 1);
          _this_1.e();
        },
        t: function() {
        }
      });
    this.d = 3;
  };
  Zip2.prototype.e = function() {
    var bt = 0, l = 0, tl = 0;
    for (var _i = 0, _a2 = this.u; _i < _a2.length; _i++) {
      var f = _a2[_i];
      tl += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
    }
    var out = new u8(tl + 22);
    for (var _b2 = 0, _c = this.u; _b2 < _c.length; _b2++) {
      var f = _c[_b2];
      wzh(out, bt, f, f.f, f.u, f.c, l, f.o);
      bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), l += f.b;
    }
    wzf(out, bt, this.u.length, tl, l);
    this.ondata(null, out, true);
    this.d = 2;
  };
  Zip2.prototype.terminate = function() {
    for (var _i = 0, _a2 = this.u; _i < _a2.length; _i++) {
      var f = _a2[_i];
      f.t();
    }
    this.d = 2;
  };
  return Zip2;
}();
var UnzipPassThrough = function() {
  function UnzipPassThrough2() {
  }
  UnzipPassThrough2.prototype.push = function(data, final) {
    this.ondata(null, data, final);
  };
  UnzipPassThrough2.compression = 0;
  return UnzipPassThrough2;
}();
var UnzipInflate = function() {
  function UnzipInflate2() {
    var _this_1 = this;
    this.i = new Inflate(function(dat, final) {
      _this_1.ondata(null, dat, final);
    });
  }
  UnzipInflate2.prototype.push = function(data, final) {
    try {
      this.i.push(data, final);
    } catch (e) {
      this.ondata(e, data, final);
    }
  };
  UnzipInflate2.compression = 8;
  return UnzipInflate2;
}();
var AsyncUnzipInflate = function() {
  function AsyncUnzipInflate2(_, sz) {
    var _this_1 = this;
    if (sz < 32e4) {
      this.i = new Inflate(function(dat, final) {
        _this_1.ondata(null, dat, final);
      });
    } else {
      this.i = new AsyncInflate(function(err, dat, final) {
        _this_1.ondata(err, dat, final);
      });
      this.terminate = this.i.terminate;
    }
  }
  AsyncUnzipInflate2.prototype.push = function(data, final) {
    if (this.i.terminate)
      data = slc(data, 0);
    this.i.push(data, final);
  };
  AsyncUnzipInflate2.compression = 8;
  return AsyncUnzipInflate2;
}();
var Unzip = function() {
  function Unzip2(cb) {
    this.onfile = cb;
    this.k = [];
    this.o = {
      0: UnzipPassThrough
    };
    this.p = et;
  }
  Unzip2.prototype.push = function(chunk, final) {
    var _this_1 = this;
    if (!this.onfile)
      throw "no callback";
    if (!this.p)
      throw "stream finished";
    if (this.c > 0) {
      var len = Math.min(this.c, chunk.length);
      var toAdd = chunk.subarray(0, len);
      this.c -= len;
      if (this.d)
        this.d.push(toAdd, !this.c);
      else
        this.k[0].push(toAdd);
      chunk = chunk.subarray(len);
      if (chunk.length)
        return this.push(chunk, final);
    } else {
      var f = 0, i = 0, is = void 0, buf = void 0;
      if (!this.p.length)
        buf = chunk;
      else if (!chunk.length)
        buf = this.p;
      else {
        buf = new u8(this.p.length + chunk.length);
        buf.set(this.p), buf.set(chunk, this.p.length);
      }
      var l = buf.length, oc = this.c, add = oc && this.d;
      var _loop_2 = function() {
        var _a2;
        var sig = b4(buf, i);
        if (sig == 67324752) {
          f = 1, is = i;
          this_1.d = null;
          this_1.c = 0;
          var bf = b2(buf, i + 6), cmp_1 = b2(buf, i + 8), u = bf & 2048, dd = bf & 8, fnl = b2(buf, i + 26), es = b2(buf, i + 28);
          if (l > i + 30 + fnl + es) {
            var chks_2 = [];
            this_1.k.unshift(chks_2);
            f = 2;
            var sc_1 = b4(buf, i + 18), su_1 = b4(buf, i + 22);
            var fn_1 = strFromU8(buf.subarray(i + 30, i += 30 + fnl), !u);
            if (sc_1 == 4294967295) {
              _a2 = dd ? [-2] : z64e(buf, i), sc_1 = _a2[0], su_1 = _a2[1];
            } else if (dd)
              sc_1 = -1;
            i += es;
            this_1.c = sc_1;
            var d_1;
            var file_1 = {
              name: fn_1,
              compression: cmp_1,
              start: function() {
                if (!file_1.ondata)
                  throw "no callback";
                if (!sc_1)
                  file_1.ondata(null, et, true);
                else {
                  var ctr = _this_1.o[cmp_1];
                  if (!ctr)
                    throw "unknown compression type " + cmp_1;
                  d_1 = sc_1 < 0 ? new ctr(fn_1) : new ctr(fn_1, sc_1, su_1);
                  d_1.ondata = function(err, dat3, final2) {
                    file_1.ondata(err, dat3, final2);
                  };
                  for (var _i = 0, chks_3 = chks_2; _i < chks_3.length; _i++) {
                    var dat2 = chks_3[_i];
                    d_1.push(dat2, false);
                  }
                  if (_this_1.k[0] == chks_2 && _this_1.c)
                    _this_1.d = d_1;
                  else
                    d_1.push(et, true);
                }
              },
              terminate: function() {
                if (d_1 && d_1.terminate)
                  d_1.terminate();
              }
            };
            if (sc_1 >= 0)
              file_1.size = sc_1, file_1.originalSize = su_1;
            this_1.onfile(file_1);
          }
          return "break";
        } else if (oc) {
          if (sig == 134695760) {
            is = i += 12 + (oc == -2 && 8), f = 3, this_1.c = 0;
            return "break";
          } else if (sig == 33639248) {
            is = i -= 4, f = 3, this_1.c = 0;
            return "break";
          }
        }
      };
      var this_1 = this;
      for (; i < l - 4; ++i) {
        var state_1 = _loop_2();
        if (state_1 === "break")
          break;
      }
      this.p = et;
      if (oc < 0) {
        var dat = f ? buf.subarray(0, is - 12 - (oc == -2 && 8) - (b4(buf, is - 16) == 134695760 && 4)) : buf.subarray(0, i);
        if (add)
          add.push(dat, !!f);
        else
          this.k[+(f == 2)].push(dat);
      }
      if (f & 2)
        return this.push(buf.subarray(i), final);
      this.p = buf.subarray(i);
    }
    if (final) {
      if (this.c)
        throw "invalid zip file";
      this.p = null;
    }
  };
  Unzip2.prototype.register = function(decoder) {
    this.o[decoder.compression] = decoder;
  };
  return Unzip2;
}();

// ../../node_modules/three/examples/jsm/loaders/EXRLoader.js
var EXRLoader = class extends DataTextureLoader {
  constructor(manager) {
    super(manager);
    this.type = HalfFloatType;
  }
  parse(buffer) {
    const USHORT_RANGE = 1 << 16;
    const BITMAP_SIZE = USHORT_RANGE >> 3;
    const HUF_ENCBITS = 16;
    const HUF_DECBITS = 14;
    const HUF_ENCSIZE = (1 << HUF_ENCBITS) + 1;
    const HUF_DECSIZE = 1 << HUF_DECBITS;
    const HUF_DECMASK = HUF_DECSIZE - 1;
    const NBITS = 16;
    const A_OFFSET = 1 << NBITS - 1;
    const MOD_MASK = (1 << NBITS) - 1;
    const SHORT_ZEROCODE_RUN = 59;
    const LONG_ZEROCODE_RUN = 63;
    const SHORTEST_LONG_RUN = 2 + LONG_ZEROCODE_RUN - SHORT_ZEROCODE_RUN;
    const ULONG_SIZE = 8;
    const FLOAT32_SIZE = 4;
    const INT32_SIZE = 4;
    const INT16_SIZE = 2;
    const INT8_SIZE = 1;
    const STATIC_HUFFMAN = 0;
    const DEFLATE = 1;
    const UNKNOWN = 0;
    const LOSSY_DCT = 1;
    const RLE = 2;
    const logBase = Math.pow(2.7182818, 2.2);
    function reverseLutFromBitmap(bitmap, lut) {
      let k = 0;
      for (let i = 0; i < USHORT_RANGE; ++i) {
        if (i == 0 || bitmap[i >> 3] & 1 << (i & 7)) {
          lut[k++] = i;
        }
      }
      const n = k - 1;
      while (k < USHORT_RANGE) lut[k++] = 0;
      return n;
    }
    function hufClearDecTable(hdec) {
      for (let i = 0; i < HUF_DECSIZE; i++) {
        hdec[i] = {};
        hdec[i].len = 0;
        hdec[i].lit = 0;
        hdec[i].p = null;
      }
    }
    const getBitsReturn = { l: 0, c: 0, lc: 0 };
    function getBits(nBits, c, lc2, uInt8Array2, inOffset) {
      while (lc2 < nBits) {
        c = c << 8 | parseUint8Array(uInt8Array2, inOffset);
        lc2 += 8;
      }
      lc2 -= nBits;
      getBitsReturn.l = c >> lc2 & (1 << nBits) - 1;
      getBitsReturn.c = c;
      getBitsReturn.lc = lc2;
    }
    const hufTableBuffer = new Array(59);
    function hufCanonicalCodeTable(hcode) {
      for (let i = 0; i <= 58; ++i) hufTableBuffer[i] = 0;
      for (let i = 0; i < HUF_ENCSIZE; ++i) hufTableBuffer[hcode[i]] += 1;
      let c = 0;
      for (let i = 58; i > 0; --i) {
        const nc = c + hufTableBuffer[i] >> 1;
        hufTableBuffer[i] = c;
        c = nc;
      }
      for (let i = 0; i < HUF_ENCSIZE; ++i) {
        const l = hcode[i];
        if (l > 0) hcode[i] = l | hufTableBuffer[l]++ << 6;
      }
    }
    function hufUnpackEncTable(uInt8Array2, inOffset, ni, im, iM, hcode) {
      const p = inOffset;
      let c = 0;
      let lc2 = 0;
      for (; im <= iM; im++) {
        if (p.value - inOffset.value > ni) return false;
        getBits(6, c, lc2, uInt8Array2, p);
        const l = getBitsReturn.l;
        c = getBitsReturn.c;
        lc2 = getBitsReturn.lc;
        hcode[im] = l;
        if (l == LONG_ZEROCODE_RUN) {
          if (p.value - inOffset.value > ni) {
            throw new Error("Something wrong with hufUnpackEncTable");
          }
          getBits(8, c, lc2, uInt8Array2, p);
          let zerun = getBitsReturn.l + SHORTEST_LONG_RUN;
          c = getBitsReturn.c;
          lc2 = getBitsReturn.lc;
          if (im + zerun > iM + 1) {
            throw new Error("Something wrong with hufUnpackEncTable");
          }
          while (zerun--) hcode[im++] = 0;
          im--;
        } else if (l >= SHORT_ZEROCODE_RUN) {
          let zerun = l - SHORT_ZEROCODE_RUN + 2;
          if (im + zerun > iM + 1) {
            throw new Error("Something wrong with hufUnpackEncTable");
          }
          while (zerun--) hcode[im++] = 0;
          im--;
        }
      }
      hufCanonicalCodeTable(hcode);
    }
    function hufLength(code) {
      return code & 63;
    }
    function hufCode(code) {
      return code >> 6;
    }
    function hufBuildDecTable(hcode, im, iM, hdecod) {
      for (; im <= iM; im++) {
        const c = hufCode(hcode[im]);
        const l = hufLength(hcode[im]);
        if (c >> l) {
          throw new Error("Invalid table entry");
        }
        if (l > HUF_DECBITS) {
          const pl = hdecod[c >> l - HUF_DECBITS];
          if (pl.len) {
            throw new Error("Invalid table entry");
          }
          pl.lit++;
          if (pl.p) {
            const p = pl.p;
            pl.p = new Array(pl.lit);
            for (let i = 0; i < pl.lit - 1; ++i) {
              pl.p[i] = p[i];
            }
          } else {
            pl.p = new Array(1);
          }
          pl.p[pl.lit - 1] = im;
        } else if (l) {
          let plOffset = 0;
          for (let i = 1 << HUF_DECBITS - l; i > 0; i--) {
            const pl = hdecod[(c << HUF_DECBITS - l) + plOffset];
            if (pl.len || pl.p) {
              throw new Error("Invalid table entry");
            }
            pl.len = l;
            pl.lit = im;
            plOffset++;
          }
        }
      }
      return true;
    }
    const getCharReturn = { c: 0, lc: 0 };
    function getChar(c, lc2, uInt8Array2, inOffset) {
      c = c << 8 | parseUint8Array(uInt8Array2, inOffset);
      lc2 += 8;
      getCharReturn.c = c;
      getCharReturn.lc = lc2;
    }
    const getCodeReturn = { c: 0, lc: 0 };
    function getCode(po, rlc, c, lc2, uInt8Array2, inOffset, outBuffer, outBufferOffset, outBufferEndOffset) {
      if (po == rlc) {
        if (lc2 < 8) {
          getChar(c, lc2, uInt8Array2, inOffset);
          c = getCharReturn.c;
          lc2 = getCharReturn.lc;
        }
        lc2 -= 8;
        let cs = c >> lc2;
        cs = new Uint8Array([cs])[0];
        if (outBufferOffset.value + cs > outBufferEndOffset) {
          return false;
        }
        const s = outBuffer[outBufferOffset.value - 1];
        while (cs-- > 0) {
          outBuffer[outBufferOffset.value++] = s;
        }
      } else if (outBufferOffset.value < outBufferEndOffset) {
        outBuffer[outBufferOffset.value++] = po;
      } else {
        return false;
      }
      getCodeReturn.c = c;
      getCodeReturn.lc = lc2;
    }
    function UInt16(value) {
      return value & 65535;
    }
    function Int16(value) {
      const ref = UInt16(value);
      return ref > 32767 ? ref - 65536 : ref;
    }
    const wdec14Return = { a: 0, b: 0 };
    function wdec14(l, h) {
      const ls = Int16(l);
      const hs = Int16(h);
      const hi = hs;
      const ai = ls + (hi & 1) + (hi >> 1);
      const as = ai;
      const bs = ai - hi;
      wdec14Return.a = as;
      wdec14Return.b = bs;
    }
    function wdec16(l, h) {
      const m = UInt16(l);
      const d = UInt16(h);
      const bb = m - (d >> 1) & MOD_MASK;
      const aa = d + bb - A_OFFSET & MOD_MASK;
      wdec14Return.a = aa;
      wdec14Return.b = bb;
    }
    function wav2Decode(buffer2, j, nx, ox, ny, oy, mx) {
      const w14 = mx < 1 << 14;
      const n = nx > ny ? ny : nx;
      let p = 1;
      let p2;
      let py;
      while (p <= n) p <<= 1;
      p >>= 1;
      p2 = p;
      p >>= 1;
      while (p >= 1) {
        py = 0;
        const ey = py + oy * (ny - p2);
        const oy1 = oy * p;
        const oy2 = oy * p2;
        const ox1 = ox * p;
        const ox2 = ox * p2;
        let i00, i01, i10, i11;
        for (; py <= ey; py += oy2) {
          let px = py;
          const ex = py + ox * (nx - p2);
          for (; px <= ex; px += ox2) {
            const p01 = px + ox1;
            const p10 = px + oy1;
            const p11 = p10 + ox1;
            if (w14) {
              wdec14(buffer2[px + j], buffer2[p10 + j]);
              i00 = wdec14Return.a;
              i10 = wdec14Return.b;
              wdec14(buffer2[p01 + j], buffer2[p11 + j]);
              i01 = wdec14Return.a;
              i11 = wdec14Return.b;
              wdec14(i00, i01);
              buffer2[px + j] = wdec14Return.a;
              buffer2[p01 + j] = wdec14Return.b;
              wdec14(i10, i11);
              buffer2[p10 + j] = wdec14Return.a;
              buffer2[p11 + j] = wdec14Return.b;
            } else {
              wdec16(buffer2[px + j], buffer2[p10 + j]);
              i00 = wdec14Return.a;
              i10 = wdec14Return.b;
              wdec16(buffer2[p01 + j], buffer2[p11 + j]);
              i01 = wdec14Return.a;
              i11 = wdec14Return.b;
              wdec16(i00, i01);
              buffer2[px + j] = wdec14Return.a;
              buffer2[p01 + j] = wdec14Return.b;
              wdec16(i10, i11);
              buffer2[p10 + j] = wdec14Return.a;
              buffer2[p11 + j] = wdec14Return.b;
            }
          }
          if (nx & p) {
            const p10 = px + oy1;
            if (w14)
              wdec14(buffer2[px + j], buffer2[p10 + j]);
            else
              wdec16(buffer2[px + j], buffer2[p10 + j]);
            i00 = wdec14Return.a;
            buffer2[p10 + j] = wdec14Return.b;
            buffer2[px + j] = i00;
          }
        }
        if (ny & p) {
          let px = py;
          const ex = py + ox * (nx - p2);
          for (; px <= ex; px += ox2) {
            const p01 = px + ox1;
            if (w14)
              wdec14(buffer2[px + j], buffer2[p01 + j]);
            else
              wdec16(buffer2[px + j], buffer2[p01 + j]);
            i00 = wdec14Return.a;
            buffer2[p01 + j] = wdec14Return.b;
            buffer2[px + j] = i00;
          }
        }
        p2 = p;
        p >>= 1;
      }
      return py;
    }
    function hufDecode(encodingTable, decodingTable, uInt8Array2, inOffset, ni, rlc, no, outBuffer, outOffset) {
      let c = 0;
      let lc2 = 0;
      const outBufferEndOffset = no;
      const inOffsetEnd = Math.trunc(inOffset.value + (ni + 7) / 8);
      while (inOffset.value < inOffsetEnd) {
        getChar(c, lc2, uInt8Array2, inOffset);
        c = getCharReturn.c;
        lc2 = getCharReturn.lc;
        while (lc2 >= HUF_DECBITS) {
          const index = c >> lc2 - HUF_DECBITS & HUF_DECMASK;
          const pl = decodingTable[index];
          if (pl.len) {
            lc2 -= pl.len;
            getCode(pl.lit, rlc, c, lc2, uInt8Array2, inOffset, outBuffer, outOffset, outBufferEndOffset);
            c = getCodeReturn.c;
            lc2 = getCodeReturn.lc;
          } else {
            if (!pl.p) {
              throw new Error("hufDecode issues");
            }
            let j;
            for (j = 0; j < pl.lit; j++) {
              const l = hufLength(encodingTable[pl.p[j]]);
              while (lc2 < l && inOffset.value < inOffsetEnd) {
                getChar(c, lc2, uInt8Array2, inOffset);
                c = getCharReturn.c;
                lc2 = getCharReturn.lc;
              }
              if (lc2 >= l) {
                if (hufCode(encodingTable[pl.p[j]]) == (c >> lc2 - l & (1 << l) - 1)) {
                  lc2 -= l;
                  getCode(pl.p[j], rlc, c, lc2, uInt8Array2, inOffset, outBuffer, outOffset, outBufferEndOffset);
                  c = getCodeReturn.c;
                  lc2 = getCodeReturn.lc;
                  break;
                }
              }
            }
            if (j == pl.lit) {
              throw new Error("hufDecode issues");
            }
          }
        }
      }
      const i = 8 - ni & 7;
      c >>= i;
      lc2 -= i;
      while (lc2 > 0) {
        const pl = decodingTable[c << HUF_DECBITS - lc2 & HUF_DECMASK];
        if (pl.len) {
          lc2 -= pl.len;
          getCode(pl.lit, rlc, c, lc2, uInt8Array2, inOffset, outBuffer, outOffset, outBufferEndOffset);
          c = getCodeReturn.c;
          lc2 = getCodeReturn.lc;
        } else {
          throw new Error("hufDecode issues");
        }
      }
      return true;
    }
    function hufUncompress(uInt8Array2, inDataView, inOffset, nCompressed, outBuffer, nRaw) {
      const outOffset = { value: 0 };
      const initialInOffset = inOffset.value;
      const im = parseUint32(inDataView, inOffset);
      const iM = parseUint32(inDataView, inOffset);
      inOffset.value += 4;
      const nBits = parseUint32(inDataView, inOffset);
      inOffset.value += 4;
      if (im < 0 || im >= HUF_ENCSIZE || iM < 0 || iM >= HUF_ENCSIZE) {
        throw new Error("Something wrong with HUF_ENCSIZE");
      }
      const freq = new Array(HUF_ENCSIZE);
      const hdec = new Array(HUF_DECSIZE);
      hufClearDecTable(hdec);
      const ni = nCompressed - (inOffset.value - initialInOffset);
      hufUnpackEncTable(uInt8Array2, inOffset, ni, im, iM, freq);
      if (nBits > 8 * (nCompressed - (inOffset.value - initialInOffset))) {
        throw new Error("Something wrong with hufUncompress");
      }
      hufBuildDecTable(freq, im, iM, hdec);
      hufDecode(freq, hdec, uInt8Array2, inOffset, nBits, iM, nRaw, outBuffer, outOffset);
    }
    function applyLut(lut, data, nData) {
      for (let i = 0; i < nData; ++i) {
        data[i] = lut[data[i]];
      }
    }
    function predictor(source) {
      for (let t = 1; t < source.length; t++) {
        const d = source[t - 1] + source[t] - 128;
        source[t] = d;
      }
    }
    function interleaveScalar(source, out) {
      let t1 = 0;
      let t2 = Math.floor((source.length + 1) / 2);
      let s = 0;
      const stop = source.length - 1;
      while (true) {
        if (s > stop) break;
        out[s++] = source[t1++];
        if (s > stop) break;
        out[s++] = source[t2++];
      }
    }
    function decodeRunLength(source) {
      let size = source.byteLength;
      const out = new Array();
      let p = 0;
      const reader = new DataView(source);
      while (size > 0) {
        const l = reader.getInt8(p++);
        if (l < 0) {
          const count = -l;
          size -= count + 1;
          for (let i = 0; i < count; i++) {
            out.push(reader.getUint8(p++));
          }
        } else {
          const count = l;
          size -= 2;
          const value = reader.getUint8(p++);
          for (let i = 0; i < count + 1; i++) {
            out.push(value);
          }
        }
      }
      return out;
    }
    function lossyDctDecode(cscSet, rowPtrs, channelData, acBuffer, dcBuffer, outBuffer) {
      let dataView = new DataView(outBuffer.buffer);
      const width = channelData[cscSet.idx[0]].width;
      const height = channelData[cscSet.idx[0]].height;
      const numComp = 3;
      const numFullBlocksX = Math.floor(width / 8);
      const numBlocksX = Math.ceil(width / 8);
      const numBlocksY = Math.ceil(height / 8);
      const leftoverX = width - (numBlocksX - 1) * 8;
      const leftoverY = height - (numBlocksY - 1) * 8;
      const currAcComp = { value: 0 };
      const currDcComp = new Array(numComp);
      const dctData = new Array(numComp);
      const halfZigBlock = new Array(numComp);
      const rowBlock = new Array(numComp);
      const rowOffsets = new Array(numComp);
      for (let comp = 0; comp < numComp; ++comp) {
        rowOffsets[comp] = rowPtrs[cscSet.idx[comp]];
        currDcComp[comp] = comp < 1 ? 0 : currDcComp[comp - 1] + numBlocksX * numBlocksY;
        dctData[comp] = new Float32Array(64);
        halfZigBlock[comp] = new Uint16Array(64);
        rowBlock[comp] = new Uint16Array(numBlocksX * 64);
      }
      for (let blocky = 0; blocky < numBlocksY; ++blocky) {
        let maxY = 8;
        if (blocky == numBlocksY - 1)
          maxY = leftoverY;
        let maxX = 8;
        for (let blockx = 0; blockx < numBlocksX; ++blockx) {
          if (blockx == numBlocksX - 1)
            maxX = leftoverX;
          for (let comp = 0; comp < numComp; ++comp) {
            halfZigBlock[comp].fill(0);
            halfZigBlock[comp][0] = dcBuffer[currDcComp[comp]++];
            unRleAC(currAcComp, acBuffer, halfZigBlock[comp]);
            unZigZag(halfZigBlock[comp], dctData[comp]);
            dctInverse(dctData[comp]);
          }
          if (numComp == 3) {
            csc709Inverse(dctData);
          }
          for (let comp = 0; comp < numComp; ++comp) {
            convertToHalf(dctData[comp], rowBlock[comp], blockx * 64);
          }
        }
        let offset2 = 0;
        for (let comp = 0; comp < numComp; ++comp) {
          const type = channelData[cscSet.idx[comp]].type;
          for (let y = 8 * blocky; y < 8 * blocky + maxY; ++y) {
            offset2 = rowOffsets[comp][y];
            for (let blockx = 0; blockx < numFullBlocksX; ++blockx) {
              const src = blockx * 64 + (y & 7) * 8;
              dataView.setUint16(offset2 + 0 * INT16_SIZE * type, rowBlock[comp][src + 0], true);
              dataView.setUint16(offset2 + 1 * INT16_SIZE * type, rowBlock[comp][src + 1], true);
              dataView.setUint16(offset2 + 2 * INT16_SIZE * type, rowBlock[comp][src + 2], true);
              dataView.setUint16(offset2 + 3 * INT16_SIZE * type, rowBlock[comp][src + 3], true);
              dataView.setUint16(offset2 + 4 * INT16_SIZE * type, rowBlock[comp][src + 4], true);
              dataView.setUint16(offset2 + 5 * INT16_SIZE * type, rowBlock[comp][src + 5], true);
              dataView.setUint16(offset2 + 6 * INT16_SIZE * type, rowBlock[comp][src + 6], true);
              dataView.setUint16(offset2 + 7 * INT16_SIZE * type, rowBlock[comp][src + 7], true);
              offset2 += 8 * INT16_SIZE * type;
            }
          }
          if (numFullBlocksX != numBlocksX) {
            for (let y = 8 * blocky; y < 8 * blocky + maxY; ++y) {
              const offset3 = rowOffsets[comp][y] + 8 * numFullBlocksX * INT16_SIZE * type;
              const src = numFullBlocksX * 64 + (y & 7) * 8;
              for (let x = 0; x < maxX; ++x) {
                dataView.setUint16(offset3 + x * INT16_SIZE * type, rowBlock[comp][src + x], true);
              }
            }
          }
        }
      }
      const halfRow = new Uint16Array(width);
      dataView = new DataView(outBuffer.buffer);
      for (let comp = 0; comp < numComp; ++comp) {
        channelData[cscSet.idx[comp]].decoded = true;
        const type = channelData[cscSet.idx[comp]].type;
        if (channelData[comp].type != 2) continue;
        for (let y = 0; y < height; ++y) {
          const offset2 = rowOffsets[comp][y];
          for (let x = 0; x < width; ++x) {
            halfRow[x] = dataView.getUint16(offset2 + x * INT16_SIZE * type, true);
          }
          for (let x = 0; x < width; ++x) {
            dataView.setFloat32(offset2 + x * INT16_SIZE * type, decodeFloat16(halfRow[x]), true);
          }
        }
      }
    }
    function unRleAC(currAcComp, acBuffer, halfZigBlock) {
      let acValue;
      let dctComp = 1;
      while (dctComp < 64) {
        acValue = acBuffer[currAcComp.value];
        if (acValue == 65280) {
          dctComp = 64;
        } else if (acValue >> 8 == 255) {
          dctComp += acValue & 255;
        } else {
          halfZigBlock[dctComp] = acValue;
          dctComp++;
        }
        currAcComp.value++;
      }
    }
    function unZigZag(src, dst) {
      dst[0] = decodeFloat16(src[0]);
      dst[1] = decodeFloat16(src[1]);
      dst[2] = decodeFloat16(src[5]);
      dst[3] = decodeFloat16(src[6]);
      dst[4] = decodeFloat16(src[14]);
      dst[5] = decodeFloat16(src[15]);
      dst[6] = decodeFloat16(src[27]);
      dst[7] = decodeFloat16(src[28]);
      dst[8] = decodeFloat16(src[2]);
      dst[9] = decodeFloat16(src[4]);
      dst[10] = decodeFloat16(src[7]);
      dst[11] = decodeFloat16(src[13]);
      dst[12] = decodeFloat16(src[16]);
      dst[13] = decodeFloat16(src[26]);
      dst[14] = decodeFloat16(src[29]);
      dst[15] = decodeFloat16(src[42]);
      dst[16] = decodeFloat16(src[3]);
      dst[17] = decodeFloat16(src[8]);
      dst[18] = decodeFloat16(src[12]);
      dst[19] = decodeFloat16(src[17]);
      dst[20] = decodeFloat16(src[25]);
      dst[21] = decodeFloat16(src[30]);
      dst[22] = decodeFloat16(src[41]);
      dst[23] = decodeFloat16(src[43]);
      dst[24] = decodeFloat16(src[9]);
      dst[25] = decodeFloat16(src[11]);
      dst[26] = decodeFloat16(src[18]);
      dst[27] = decodeFloat16(src[24]);
      dst[28] = decodeFloat16(src[31]);
      dst[29] = decodeFloat16(src[40]);
      dst[30] = decodeFloat16(src[44]);
      dst[31] = decodeFloat16(src[53]);
      dst[32] = decodeFloat16(src[10]);
      dst[33] = decodeFloat16(src[19]);
      dst[34] = decodeFloat16(src[23]);
      dst[35] = decodeFloat16(src[32]);
      dst[36] = decodeFloat16(src[39]);
      dst[37] = decodeFloat16(src[45]);
      dst[38] = decodeFloat16(src[52]);
      dst[39] = decodeFloat16(src[54]);
      dst[40] = decodeFloat16(src[20]);
      dst[41] = decodeFloat16(src[22]);
      dst[42] = decodeFloat16(src[33]);
      dst[43] = decodeFloat16(src[38]);
      dst[44] = decodeFloat16(src[46]);
      dst[45] = decodeFloat16(src[51]);
      dst[46] = decodeFloat16(src[55]);
      dst[47] = decodeFloat16(src[60]);
      dst[48] = decodeFloat16(src[21]);
      dst[49] = decodeFloat16(src[34]);
      dst[50] = decodeFloat16(src[37]);
      dst[51] = decodeFloat16(src[47]);
      dst[52] = decodeFloat16(src[50]);
      dst[53] = decodeFloat16(src[56]);
      dst[54] = decodeFloat16(src[59]);
      dst[55] = decodeFloat16(src[61]);
      dst[56] = decodeFloat16(src[35]);
      dst[57] = decodeFloat16(src[36]);
      dst[58] = decodeFloat16(src[48]);
      dst[59] = decodeFloat16(src[49]);
      dst[60] = decodeFloat16(src[57]);
      dst[61] = decodeFloat16(src[58]);
      dst[62] = decodeFloat16(src[62]);
      dst[63] = decodeFloat16(src[63]);
    }
    function dctInverse(data) {
      const a = 0.5 * Math.cos(3.14159 / 4);
      const b = 0.5 * Math.cos(3.14159 / 16);
      const c = 0.5 * Math.cos(3.14159 / 8);
      const d = 0.5 * Math.cos(3 * 3.14159 / 16);
      const e = 0.5 * Math.cos(5 * 3.14159 / 16);
      const f = 0.5 * Math.cos(3 * 3.14159 / 8);
      const g = 0.5 * Math.cos(7 * 3.14159 / 16);
      const alpha = new Array(4);
      const beta = new Array(4);
      const theta = new Array(4);
      const gamma = new Array(4);
      for (let row = 0; row < 8; ++row) {
        const rowPtr = row * 8;
        alpha[0] = c * data[rowPtr + 2];
        alpha[1] = f * data[rowPtr + 2];
        alpha[2] = c * data[rowPtr + 6];
        alpha[3] = f * data[rowPtr + 6];
        beta[0] = b * data[rowPtr + 1] + d * data[rowPtr + 3] + e * data[rowPtr + 5] + g * data[rowPtr + 7];
        beta[1] = d * data[rowPtr + 1] - g * data[rowPtr + 3] - b * data[rowPtr + 5] - e * data[rowPtr + 7];
        beta[2] = e * data[rowPtr + 1] - b * data[rowPtr + 3] + g * data[rowPtr + 5] + d * data[rowPtr + 7];
        beta[3] = g * data[rowPtr + 1] - e * data[rowPtr + 3] + d * data[rowPtr + 5] - b * data[rowPtr + 7];
        theta[0] = a * (data[rowPtr + 0] + data[rowPtr + 4]);
        theta[3] = a * (data[rowPtr + 0] - data[rowPtr + 4]);
        theta[1] = alpha[0] + alpha[3];
        theta[2] = alpha[1] - alpha[2];
        gamma[0] = theta[0] + theta[1];
        gamma[1] = theta[3] + theta[2];
        gamma[2] = theta[3] - theta[2];
        gamma[3] = theta[0] - theta[1];
        data[rowPtr + 0] = gamma[0] + beta[0];
        data[rowPtr + 1] = gamma[1] + beta[1];
        data[rowPtr + 2] = gamma[2] + beta[2];
        data[rowPtr + 3] = gamma[3] + beta[3];
        data[rowPtr + 4] = gamma[3] - beta[3];
        data[rowPtr + 5] = gamma[2] - beta[2];
        data[rowPtr + 6] = gamma[1] - beta[1];
        data[rowPtr + 7] = gamma[0] - beta[0];
      }
      for (let column = 0; column < 8; ++column) {
        alpha[0] = c * data[16 + column];
        alpha[1] = f * data[16 + column];
        alpha[2] = c * data[48 + column];
        alpha[3] = f * data[48 + column];
        beta[0] = b * data[8 + column] + d * data[24 + column] + e * data[40 + column] + g * data[56 + column];
        beta[1] = d * data[8 + column] - g * data[24 + column] - b * data[40 + column] - e * data[56 + column];
        beta[2] = e * data[8 + column] - b * data[24 + column] + g * data[40 + column] + d * data[56 + column];
        beta[3] = g * data[8 + column] - e * data[24 + column] + d * data[40 + column] - b * data[56 + column];
        theta[0] = a * (data[column] + data[32 + column]);
        theta[3] = a * (data[column] - data[32 + column]);
        theta[1] = alpha[0] + alpha[3];
        theta[2] = alpha[1] - alpha[2];
        gamma[0] = theta[0] + theta[1];
        gamma[1] = theta[3] + theta[2];
        gamma[2] = theta[3] - theta[2];
        gamma[3] = theta[0] - theta[1];
        data[0 + column] = gamma[0] + beta[0];
        data[8 + column] = gamma[1] + beta[1];
        data[16 + column] = gamma[2] + beta[2];
        data[24 + column] = gamma[3] + beta[3];
        data[32 + column] = gamma[3] - beta[3];
        data[40 + column] = gamma[2] - beta[2];
        data[48 + column] = gamma[1] - beta[1];
        data[56 + column] = gamma[0] - beta[0];
      }
    }
    function csc709Inverse(data) {
      for (let i = 0; i < 64; ++i) {
        const y = data[0][i];
        const cb = data[1][i];
        const cr = data[2][i];
        data[0][i] = y + 1.5747 * cr;
        data[1][i] = y - 0.1873 * cb - 0.4682 * cr;
        data[2][i] = y + 1.8556 * cb;
      }
    }
    function convertToHalf(src, dst, idx) {
      for (let i = 0; i < 64; ++i) {
        dst[idx + i] = DataUtils.toHalfFloat(toLinear(src[i]));
      }
    }
    function toLinear(float) {
      if (float <= 1) {
        return Math.sign(float) * Math.pow(Math.abs(float), 2.2);
      } else {
        return Math.sign(float) * Math.pow(logBase, Math.abs(float) - 1);
      }
    }
    function uncompressRAW(info) {
      return new DataView(info.array.buffer, info.offset.value, info.size);
    }
    function uncompressRLE(info) {
      const compressed = info.viewer.buffer.slice(info.offset.value, info.offset.value + info.size);
      const rawBuffer = new Uint8Array(decodeRunLength(compressed));
      const tmpBuffer = new Uint8Array(rawBuffer.length);
      predictor(rawBuffer);
      interleaveScalar(rawBuffer, tmpBuffer);
      return new DataView(tmpBuffer.buffer);
    }
    function uncompressZIP(info) {
      const compressed = info.array.slice(info.offset.value, info.offset.value + info.size);
      const rawBuffer = unzlibSync(compressed);
      const tmpBuffer = new Uint8Array(rawBuffer.length);
      predictor(rawBuffer);
      interleaveScalar(rawBuffer, tmpBuffer);
      return new DataView(tmpBuffer.buffer);
    }
    function uncompressPIZ(info) {
      const inDataView = info.viewer;
      const inOffset = { value: info.offset.value };
      const outBuffer = new Uint16Array(info.width * info.scanlineBlockSize * (info.channels * info.type));
      const bitmap = new Uint8Array(BITMAP_SIZE);
      let outBufferEnd = 0;
      const pizChannelData = new Array(info.channels);
      for (let i = 0; i < info.channels; i++) {
        pizChannelData[i] = {};
        pizChannelData[i]["start"] = outBufferEnd;
        pizChannelData[i]["end"] = pizChannelData[i]["start"];
        pizChannelData[i]["nx"] = info.width;
        pizChannelData[i]["ny"] = info.lines;
        pizChannelData[i]["size"] = info.type;
        outBufferEnd += pizChannelData[i].nx * pizChannelData[i].ny * pizChannelData[i].size;
      }
      const minNonZero = parseUint16(inDataView, inOffset);
      const maxNonZero = parseUint16(inDataView, inOffset);
      if (maxNonZero >= BITMAP_SIZE) {
        throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");
      }
      if (minNonZero <= maxNonZero) {
        for (let i = 0; i < maxNonZero - minNonZero + 1; i++) {
          bitmap[i + minNonZero] = parseUint8(inDataView, inOffset);
        }
      }
      const lut = new Uint16Array(USHORT_RANGE);
      const maxValue = reverseLutFromBitmap(bitmap, lut);
      const length = parseUint32(inDataView, inOffset);
      hufUncompress(info.array, inDataView, inOffset, length, outBuffer, outBufferEnd);
      for (let i = 0; i < info.channels; ++i) {
        const cd = pizChannelData[i];
        for (let j = 0; j < pizChannelData[i].size; ++j) {
          wav2Decode(
            outBuffer,
            cd.start + j,
            cd.nx,
            cd.size,
            cd.ny,
            cd.nx * cd.size,
            maxValue
          );
        }
      }
      applyLut(lut, outBuffer, outBufferEnd);
      let tmpOffset2 = 0;
      const tmpBuffer = new Uint8Array(outBuffer.buffer.byteLength);
      for (let y = 0; y < info.lines; y++) {
        for (let c = 0; c < info.channels; c++) {
          const cd = pizChannelData[c];
          const n = cd.nx * cd.size;
          const cp = new Uint8Array(outBuffer.buffer, cd.end * INT16_SIZE, n * INT16_SIZE);
          tmpBuffer.set(cp, tmpOffset2);
          tmpOffset2 += n * INT16_SIZE;
          cd.end += n;
        }
      }
      return new DataView(tmpBuffer.buffer);
    }
    function uncompressPXR(info) {
      const compressed = info.array.slice(info.offset.value, info.offset.value + info.size);
      const rawBuffer = unzlibSync(compressed);
      const sz = info.lines * info.channels * info.width;
      const tmpBuffer = info.type == 1 ? new Uint16Array(sz) : new Uint32Array(sz);
      let tmpBufferEnd = 0;
      let writePtr = 0;
      const ptr = new Array(4);
      for (let y = 0; y < info.lines; y++) {
        for (let c = 0; c < info.channels; c++) {
          let pixel = 0;
          switch (info.type) {
            case 1:
              ptr[0] = tmpBufferEnd;
              ptr[1] = ptr[0] + info.width;
              tmpBufferEnd = ptr[1] + info.width;
              for (let j = 0; j < info.width; ++j) {
                const diff = rawBuffer[ptr[0]++] << 8 | rawBuffer[ptr[1]++];
                pixel += diff;
                tmpBuffer[writePtr] = pixel;
                writePtr++;
              }
              break;
            case 2:
              ptr[0] = tmpBufferEnd;
              ptr[1] = ptr[0] + info.width;
              ptr[2] = ptr[1] + info.width;
              tmpBufferEnd = ptr[2] + info.width;
              for (let j = 0; j < info.width; ++j) {
                const diff = rawBuffer[ptr[0]++] << 24 | rawBuffer[ptr[1]++] << 16 | rawBuffer[ptr[2]++] << 8;
                pixel += diff;
                tmpBuffer[writePtr] = pixel;
                writePtr++;
              }
              break;
          }
        }
      }
      return new DataView(tmpBuffer.buffer);
    }
    function uncompressDWA(info) {
      const inDataView = info.viewer;
      const inOffset = { value: info.offset.value };
      const outBuffer = new Uint8Array(info.width * info.lines * (info.channels * info.type * INT16_SIZE));
      const dwaHeader = {
        version: parseInt64(inDataView, inOffset),
        unknownUncompressedSize: parseInt64(inDataView, inOffset),
        unknownCompressedSize: parseInt64(inDataView, inOffset),
        acCompressedSize: parseInt64(inDataView, inOffset),
        dcCompressedSize: parseInt64(inDataView, inOffset),
        rleCompressedSize: parseInt64(inDataView, inOffset),
        rleUncompressedSize: parseInt64(inDataView, inOffset),
        rleRawSize: parseInt64(inDataView, inOffset),
        totalAcUncompressedCount: parseInt64(inDataView, inOffset),
        totalDcUncompressedCount: parseInt64(inDataView, inOffset),
        acCompression: parseInt64(inDataView, inOffset)
      };
      if (dwaHeader.version < 2)
        throw new Error("EXRLoader.parse: " + EXRHeader.compression + " version " + dwaHeader.version + " is unsupported");
      const channelRules = new Array();
      let ruleSize = parseUint16(inDataView, inOffset) - INT16_SIZE;
      while (ruleSize > 0) {
        const name = parseNullTerminatedString(inDataView.buffer, inOffset);
        const value = parseUint8(inDataView, inOffset);
        const compression = value >> 2 & 3;
        const csc = (value >> 4) - 1;
        const index = new Int8Array([csc])[0];
        const type = parseUint8(inDataView, inOffset);
        channelRules.push({
          name,
          index,
          type,
          compression
        });
        ruleSize -= name.length + 3;
      }
      const channels = EXRHeader.channels;
      const channelData = new Array(info.channels);
      for (let i = 0; i < info.channels; ++i) {
        const cd = channelData[i] = {};
        const channel = channels[i];
        cd.name = channel.name;
        cd.compression = UNKNOWN;
        cd.decoded = false;
        cd.type = channel.pixelType;
        cd.pLinear = channel.pLinear;
        cd.width = info.width;
        cd.height = info.lines;
      }
      const cscSet = {
        idx: new Array(3)
      };
      for (let offset2 = 0; offset2 < info.channels; ++offset2) {
        const cd = channelData[offset2];
        for (let i = 0; i < channelRules.length; ++i) {
          const rule = channelRules[i];
          if (cd.name == rule.name) {
            cd.compression = rule.compression;
            if (rule.index >= 0) {
              cscSet.idx[rule.index] = offset2;
            }
            cd.offset = offset2;
          }
        }
      }
      let acBuffer, dcBuffer, rleBuffer;
      if (dwaHeader.acCompressedSize > 0) {
        switch (dwaHeader.acCompression) {
          case STATIC_HUFFMAN:
            acBuffer = new Uint16Array(dwaHeader.totalAcUncompressedCount);
            hufUncompress(info.array, inDataView, inOffset, dwaHeader.acCompressedSize, acBuffer, dwaHeader.totalAcUncompressedCount);
            break;
          case DEFLATE:
            const compressed = info.array.slice(inOffset.value, inOffset.value + dwaHeader.totalAcUncompressedCount);
            const data = unzlibSync(compressed);
            acBuffer = new Uint16Array(data.buffer);
            inOffset.value += dwaHeader.totalAcUncompressedCount;
            break;
        }
      }
      if (dwaHeader.dcCompressedSize > 0) {
        const zlibInfo = {
          array: info.array,
          offset: inOffset,
          size: dwaHeader.dcCompressedSize
        };
        dcBuffer = new Uint16Array(uncompressZIP(zlibInfo).buffer);
        inOffset.value += dwaHeader.dcCompressedSize;
      }
      if (dwaHeader.rleRawSize > 0) {
        const compressed = info.array.slice(inOffset.value, inOffset.value + dwaHeader.rleCompressedSize);
        const data = unzlibSync(compressed);
        rleBuffer = decodeRunLength(data.buffer);
        inOffset.value += dwaHeader.rleCompressedSize;
      }
      let outBufferEnd = 0;
      const rowOffsets = new Array(channelData.length);
      for (let i = 0; i < rowOffsets.length; ++i) {
        rowOffsets[i] = new Array();
      }
      for (let y = 0; y < info.lines; ++y) {
        for (let chan = 0; chan < channelData.length; ++chan) {
          rowOffsets[chan].push(outBufferEnd);
          outBufferEnd += channelData[chan].width * info.type * INT16_SIZE;
        }
      }
      lossyDctDecode(cscSet, rowOffsets, channelData, acBuffer, dcBuffer, outBuffer);
      for (let i = 0; i < channelData.length; ++i) {
        const cd = channelData[i];
        if (cd.decoded) continue;
        switch (cd.compression) {
          case RLE:
            let row = 0;
            let rleOffset = 0;
            for (let y = 0; y < info.lines; ++y) {
              let rowOffsetBytes = rowOffsets[i][row];
              for (let x = 0; x < cd.width; ++x) {
                for (let byte = 0; byte < INT16_SIZE * cd.type; ++byte) {
                  outBuffer[rowOffsetBytes++] = rleBuffer[rleOffset + byte * cd.width * cd.height];
                }
                rleOffset++;
              }
              row++;
            }
            break;
          case LOSSY_DCT:
          default:
            throw new Error("EXRLoader.parse: unsupported channel compression");
        }
      }
      return new DataView(outBuffer.buffer);
    }
    function parseNullTerminatedString(buffer2, offset2) {
      const uintBuffer = new Uint8Array(buffer2);
      let endOffset = 0;
      while (uintBuffer[offset2.value + endOffset] != 0) {
        endOffset += 1;
      }
      const stringValue = new TextDecoder().decode(
        uintBuffer.slice(offset2.value, offset2.value + endOffset)
      );
      offset2.value = offset2.value + endOffset + 1;
      return stringValue;
    }
    function parseFixedLengthString(buffer2, offset2, size) {
      const stringValue = new TextDecoder().decode(
        new Uint8Array(buffer2).slice(offset2.value, offset2.value + size)
      );
      offset2.value = offset2.value + size;
      return stringValue;
    }
    function parseRational(dataView, offset2) {
      const x = parseInt32(dataView, offset2);
      const y = parseUint32(dataView, offset2);
      return [x, y];
    }
    function parseTimecode(dataView, offset2) {
      const x = parseUint32(dataView, offset2);
      const y = parseUint32(dataView, offset2);
      return [x, y];
    }
    function parseInt32(dataView, offset2) {
      const Int32 = dataView.getInt32(offset2.value, true);
      offset2.value = offset2.value + INT32_SIZE;
      return Int32;
    }
    function parseUint32(dataView, offset2) {
      const Uint32 = dataView.getUint32(offset2.value, true);
      offset2.value = offset2.value + INT32_SIZE;
      return Uint32;
    }
    function parseUint8Array(uInt8Array2, offset2) {
      const Uint8 = uInt8Array2[offset2.value];
      offset2.value = offset2.value + INT8_SIZE;
      return Uint8;
    }
    function parseUint8(dataView, offset2) {
      const Uint8 = dataView.getUint8(offset2.value);
      offset2.value = offset2.value + INT8_SIZE;
      return Uint8;
    }
    const parseInt64 = function(dataView, offset2) {
      let int;
      if ("getBigInt64" in DataView.prototype) {
        int = Number(dataView.getBigInt64(offset2.value, true));
      } else {
        int = dataView.getUint32(offset2.value + 4, true) + Number(dataView.getUint32(offset2.value, true) << 32);
      }
      offset2.value += ULONG_SIZE;
      return int;
    };
    function parseFloat32(dataView, offset2) {
      const float = dataView.getFloat32(offset2.value, true);
      offset2.value += FLOAT32_SIZE;
      return float;
    }
    function decodeFloat32(dataView, offset2) {
      return DataUtils.toHalfFloat(parseFloat32(dataView, offset2));
    }
    function decodeFloat16(binary) {
      const exponent = (binary & 31744) >> 10, fraction = binary & 1023;
      return (binary >> 15 ? -1 : 1) * (exponent ? exponent === 31 ? fraction ? NaN : Infinity : Math.pow(2, exponent - 15) * (1 + fraction / 1024) : 6103515625e-14 * (fraction / 1024));
    }
    function parseUint16(dataView, offset2) {
      const Uint16 = dataView.getUint16(offset2.value, true);
      offset2.value += INT16_SIZE;
      return Uint16;
    }
    function parseFloat16(buffer2, offset2) {
      return decodeFloat16(parseUint16(buffer2, offset2));
    }
    function parseChlist(dataView, buffer2, offset2, size) {
      const startOffset = offset2.value;
      const channels = [];
      while (offset2.value < startOffset + size - 1) {
        const name = parseNullTerminatedString(buffer2, offset2);
        const pixelType = parseInt32(dataView, offset2);
        const pLinear = parseUint8(dataView, offset2);
        offset2.value += 3;
        const xSampling = parseInt32(dataView, offset2);
        const ySampling = parseInt32(dataView, offset2);
        channels.push({
          name,
          pixelType,
          pLinear,
          xSampling,
          ySampling
        });
      }
      offset2.value += 1;
      return channels;
    }
    function parseChromaticities(dataView, offset2) {
      const redX = parseFloat32(dataView, offset2);
      const redY = parseFloat32(dataView, offset2);
      const greenX = parseFloat32(dataView, offset2);
      const greenY = parseFloat32(dataView, offset2);
      const blueX = parseFloat32(dataView, offset2);
      const blueY = parseFloat32(dataView, offset2);
      const whiteX = parseFloat32(dataView, offset2);
      const whiteY = parseFloat32(dataView, offset2);
      return { redX, redY, greenX, greenY, blueX, blueY, whiteX, whiteY };
    }
    function parseCompression(dataView, offset2) {
      const compressionCodes = [
        "NO_COMPRESSION",
        "RLE_COMPRESSION",
        "ZIPS_COMPRESSION",
        "ZIP_COMPRESSION",
        "PIZ_COMPRESSION",
        "PXR24_COMPRESSION",
        "B44_COMPRESSION",
        "B44A_COMPRESSION",
        "DWAA_COMPRESSION",
        "DWAB_COMPRESSION"
      ];
      const compression = parseUint8(dataView, offset2);
      return compressionCodes[compression];
    }
    function parseBox2i(dataView, offset2) {
      const xMin = parseUint32(dataView, offset2);
      const yMin = parseUint32(dataView, offset2);
      const xMax = parseUint32(dataView, offset2);
      const yMax = parseUint32(dataView, offset2);
      return { xMin, yMin, xMax, yMax };
    }
    function parseLineOrder(dataView, offset2) {
      const lineOrders = [
        "INCREASING_Y"
      ];
      const lineOrder = parseUint8(dataView, offset2);
      return lineOrders[lineOrder];
    }
    function parseV2f(dataView, offset2) {
      const x = parseFloat32(dataView, offset2);
      const y = parseFloat32(dataView, offset2);
      return [x, y];
    }
    function parseV3f(dataView, offset2) {
      const x = parseFloat32(dataView, offset2);
      const y = parseFloat32(dataView, offset2);
      const z = parseFloat32(dataView, offset2);
      return [x, y, z];
    }
    function parseValue(dataView, buffer2, offset2, type, size) {
      if (type === "string" || type === "stringvector" || type === "iccProfile") {
        return parseFixedLengthString(buffer2, offset2, size);
      } else if (type === "chlist") {
        return parseChlist(dataView, buffer2, offset2, size);
      } else if (type === "chromaticities") {
        return parseChromaticities(dataView, offset2);
      } else if (type === "compression") {
        return parseCompression(dataView, offset2);
      } else if (type === "box2i") {
        return parseBox2i(dataView, offset2);
      } else if (type === "lineOrder") {
        return parseLineOrder(dataView, offset2);
      } else if (type === "float") {
        return parseFloat32(dataView, offset2);
      } else if (type === "v2f") {
        return parseV2f(dataView, offset2);
      } else if (type === "v3f") {
        return parseV3f(dataView, offset2);
      } else if (type === "int") {
        return parseInt32(dataView, offset2);
      } else if (type === "rational") {
        return parseRational(dataView, offset2);
      } else if (type === "timecode") {
        return parseTimecode(dataView, offset2);
      } else if (type === "preview") {
        offset2.value += size;
        return "skipped";
      } else {
        offset2.value += size;
        return void 0;
      }
    }
    function parseHeader(dataView, buffer2, offset2) {
      const EXRHeader2 = {};
      if (dataView.getUint32(0, true) != 20000630) {
        throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");
      }
      EXRHeader2.version = dataView.getUint8(4);
      const spec = dataView.getUint8(5);
      EXRHeader2.spec = {
        singleTile: !!(spec & 2),
        longName: !!(spec & 4),
        deepFormat: !!(spec & 8),
        multiPart: !!(spec & 16)
      };
      offset2.value = 8;
      let keepReading = true;
      while (keepReading) {
        const attributeName = parseNullTerminatedString(buffer2, offset2);
        if (attributeName == 0) {
          keepReading = false;
        } else {
          const attributeType = parseNullTerminatedString(buffer2, offset2);
          const attributeSize = parseUint32(dataView, offset2);
          const attributeValue = parseValue(dataView, buffer2, offset2, attributeType, attributeSize);
          if (attributeValue === void 0) {
            console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${attributeType}'.`);
          } else {
            EXRHeader2[attributeName] = attributeValue;
          }
        }
      }
      if ((spec & ~4) != 0) {
        console.error("THREE.EXRHeader:", EXRHeader2);
        throw new Error("THREE.EXRLoader: Provided file is currently unsupported.");
      }
      return EXRHeader2;
    }
    function setupDecoder(EXRHeader2, dataView, uInt8Array2, offset2, outputType) {
      const EXRDecoder2 = {
        size: 0,
        viewer: dataView,
        array: uInt8Array2,
        offset: offset2,
        width: EXRHeader2.dataWindow.xMax - EXRHeader2.dataWindow.xMin + 1,
        height: EXRHeader2.dataWindow.yMax - EXRHeader2.dataWindow.yMin + 1,
        channels: EXRHeader2.channels.length,
        bytesPerLine: null,
        lines: null,
        inputSize: null,
        type: EXRHeader2.channels[0].pixelType,
        uncompress: null,
        getter: null,
        format: null,
        colorSpace: LinearSRGBColorSpace
      };
      switch (EXRHeader2.compression) {
        case "NO_COMPRESSION":
          EXRDecoder2.lines = 1;
          EXRDecoder2.uncompress = uncompressRAW;
          break;
        case "RLE_COMPRESSION":
          EXRDecoder2.lines = 1;
          EXRDecoder2.uncompress = uncompressRLE;
          break;
        case "ZIPS_COMPRESSION":
          EXRDecoder2.lines = 1;
          EXRDecoder2.uncompress = uncompressZIP;
          break;
        case "ZIP_COMPRESSION":
          EXRDecoder2.lines = 16;
          EXRDecoder2.uncompress = uncompressZIP;
          break;
        case "PIZ_COMPRESSION":
          EXRDecoder2.lines = 32;
          EXRDecoder2.uncompress = uncompressPIZ;
          break;
        case "PXR24_COMPRESSION":
          EXRDecoder2.lines = 16;
          EXRDecoder2.uncompress = uncompressPXR;
          break;
        case "DWAA_COMPRESSION":
          EXRDecoder2.lines = 32;
          EXRDecoder2.uncompress = uncompressDWA;
          break;
        case "DWAB_COMPRESSION":
          EXRDecoder2.lines = 256;
          EXRDecoder2.uncompress = uncompressDWA;
          break;
        default:
          throw new Error("EXRLoader.parse: " + EXRHeader2.compression + " is unsupported");
      }
      EXRDecoder2.scanlineBlockSize = EXRDecoder2.lines;
      if (EXRDecoder2.type == 1) {
        switch (outputType) {
          case FloatType:
            EXRDecoder2.getter = parseFloat16;
            EXRDecoder2.inputSize = INT16_SIZE;
            break;
          case HalfFloatType:
            EXRDecoder2.getter = parseUint16;
            EXRDecoder2.inputSize = INT16_SIZE;
            break;
        }
      } else if (EXRDecoder2.type == 2) {
        switch (outputType) {
          case FloatType:
            EXRDecoder2.getter = parseFloat32;
            EXRDecoder2.inputSize = FLOAT32_SIZE;
            break;
          case HalfFloatType:
            EXRDecoder2.getter = decodeFloat32;
            EXRDecoder2.inputSize = FLOAT32_SIZE;
        }
      } else {
        throw new Error("EXRLoader.parse: unsupported pixelType " + EXRDecoder2.type + " for " + EXRHeader2.compression + ".");
      }
      EXRDecoder2.blockCount = (EXRHeader2.dataWindow.yMax + 1) / EXRDecoder2.scanlineBlockSize;
      for (let i = 0; i < EXRDecoder2.blockCount; i++)
        parseInt64(dataView, offset2);
      EXRDecoder2.outputChannels = EXRDecoder2.channels == 3 ? 4 : EXRDecoder2.channels;
      const size = EXRDecoder2.width * EXRDecoder2.height * EXRDecoder2.outputChannels;
      switch (outputType) {
        case FloatType:
          EXRDecoder2.byteArray = new Float32Array(size);
          if (EXRDecoder2.channels < EXRDecoder2.outputChannels)
            EXRDecoder2.byteArray.fill(1, 0, size);
          break;
        case HalfFloatType:
          EXRDecoder2.byteArray = new Uint16Array(size);
          if (EXRDecoder2.channels < EXRDecoder2.outputChannels)
            EXRDecoder2.byteArray.fill(15360, 0, size);
          break;
        default:
          console.error("THREE.EXRLoader: unsupported type: ", outputType);
          break;
      }
      EXRDecoder2.bytesPerLine = EXRDecoder2.width * EXRDecoder2.inputSize * EXRDecoder2.channels;
      if (EXRDecoder2.outputChannels == 4) {
        EXRDecoder2.format = RGBAFormat;
        EXRDecoder2.colorSpace = LinearSRGBColorSpace;
      } else {
        EXRDecoder2.format = RedFormat;
        EXRDecoder2.colorSpace = NoColorSpace;
      }
      return EXRDecoder2;
    }
    const bufferDataView = new DataView(buffer);
    const uInt8Array = new Uint8Array(buffer);
    const offset = { value: 0 };
    const EXRHeader = parseHeader(bufferDataView, buffer, offset);
    const EXRDecoder = setupDecoder(EXRHeader, bufferDataView, uInt8Array, offset, this.type);
    const tmpOffset = { value: 0 };
    const channelOffsets = { R: 0, G: 1, B: 2, A: 3, Y: 0 };
    for (let scanlineBlockIdx = 0; scanlineBlockIdx < EXRDecoder.height / EXRDecoder.scanlineBlockSize; scanlineBlockIdx++) {
      const line = parseUint32(bufferDataView, offset);
      EXRDecoder.size = parseUint32(bufferDataView, offset);
      EXRDecoder.lines = line + EXRDecoder.scanlineBlockSize > EXRDecoder.height ? EXRDecoder.height - line : EXRDecoder.scanlineBlockSize;
      const isCompressed = EXRDecoder.size < EXRDecoder.lines * EXRDecoder.bytesPerLine;
      const viewer = isCompressed ? EXRDecoder.uncompress(EXRDecoder) : uncompressRAW(EXRDecoder);
      offset.value += EXRDecoder.size;
      for (let line_y = 0; line_y < EXRDecoder.scanlineBlockSize; line_y++) {
        const true_y = line_y + scanlineBlockIdx * EXRDecoder.scanlineBlockSize;
        if (true_y >= EXRDecoder.height) break;
        for (let channelID = 0; channelID < EXRDecoder.channels; channelID++) {
          const cOff = channelOffsets[EXRHeader.channels[channelID].name];
          for (let x = 0; x < EXRDecoder.width; x++) {
            tmpOffset.value = (line_y * (EXRDecoder.channels * EXRDecoder.width) + channelID * EXRDecoder.width + x) * EXRDecoder.inputSize;
            const outIndex = (EXRDecoder.height - 1 - true_y) * (EXRDecoder.width * EXRDecoder.outputChannels) + x * EXRDecoder.outputChannels + cOff;
            EXRDecoder.byteArray[outIndex] = EXRDecoder.getter(viewer, tmpOffset);
          }
        }
      }
    }
    return {
      header: EXRHeader,
      width: EXRDecoder.width,
      height: EXRDecoder.height,
      data: EXRDecoder.byteArray,
      format: EXRDecoder.format,
      colorSpace: EXRDecoder.colorSpace,
      type: this.type
    };
  }
  setDataType(value) {
    this.type = value;
    return this;
  }
  load(url, onLoad, onProgress, onError) {
    function onLoadCallback(texture, texData) {
      texture.colorSpace = texData.colorSpace;
      texture.minFilter = LinearFilter;
      texture.magFilter = LinearFilter;
      texture.generateMipmaps = false;
      texture.flipY = false;
      if (onLoad) onLoad(texture, texData);
    }
    return super.load(url, onLoadCallback, onProgress, onError);
  }
};
export {
  EXRLoader
};
/*! Bundled license information:

three/examples/jsm/libs/fflate.module.js:
  (*!
  fflate - fast JavaScript compression/decompression
  <https://101arrowz.github.io/fflate>
  Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
  version 0.6.9
  *)
*/
//# sourceMappingURL=three_addons_loaders_EXRLoader__js.js.map
