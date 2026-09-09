"use strict";

/* THE CHARTER OFFICE. Plate engine.
   Curve mathematics from A2. Structure from A3. Nothing here touches
   Math.random or the clock: one string draws one plate, on any machine. */

/* ================================================================== seeding */

function xmur3(str) {
  var h = 1779033703 ^ str.length;
  for (var i = 0; i < str.length; i += 1) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return h >>> 0;
  };
}

function sfc32(a, b, c, d) {
  return function () {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
    var t = (a + b) | 0;
    a = b ^ (b >>> 9);
    b = (c + (c << 3)) | 0;
    c = (c << 21) | (c >>> 11);
    d = (d + 1) | 0;
    t = (t + d) | 0;
    c = (c + t) | 0;
    return (t >>> 0) / 4294967296;
  };
}

function makeRng(str) {
  var s = xmur3(str);
  return sfc32(s(), s(), s(), s());
}

/* A byte stream off the hash. A2 section 1.9: shape drivers take discrete
   values from fixed tables, texture drivers take continuous ranges. Spending
   every byte on a continuous range gives one plate a hundred times over. */

function byteStream(str) {
  var s = xmur3(str);
  var pool = [], idx = 0;
  function refill() {
    var v = s();
    pool.push(v & 255, (v >>> 8) & 255, (v >>> 16) & 255, (v >>> 24) & 255);
  }
  return {
    next: function () {
      if (idx >= pool.length) { refill(); }
      return pool[idx++];
    },
    pick: function (table) {
      return table[this.next() % table.length];
    },
    range: function (lo, hi) {
      return lo + (this.next() / 255) * (hi - lo);
    }
  };
}

function normalise(raw) {
  var s = String(raw == null ? "" : raw);
  if (s.normalize) { s = s.normalize("NFC"); }
  s = s.replace(/\s+/g, " ").trim();
  if (s.length > 48) { s = s.slice(0, 48); }
  return s;
}

/* ================================================= the serial, and reading it back */

var C32 = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
var ADDR = /^0x[0-9a-fA-F]{40}$/;
var utf8enc = new TextEncoder();
var utf8dec = new TextDecoder();

function bytesToC32(bytes) {
  var out = "", bits = 0, value = 0;
  for (var i = 0; i < bytes.length; i += 1) {
    value = (value << 8) | bytes[i];
    bits += 8;
    while (bits >= 5) {
      out += C32[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }
  if (bits > 0) { out += C32[(value << (5 - bits)) & 31]; }
  return out;
}

function c32ToBytes(s) {
  var bytes = [], bits = 0, value = 0;
  for (var i = 0; i < s.length; i += 1) {
    var ch = s[i];
    if (ch === "I" || ch === "L") { ch = "1"; }
    if (ch === "O") { ch = "0"; }
    if (ch === "U") { ch = "V"; }
    var k = C32.indexOf(ch);
    if (k < 0) { return null; }
    value = (value << 5) | k;
    bits += 5;
    if (bits >= 8) {
      bytes.push((value >>> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return bytes;
}

function encodeSerial(name) {
  var bytes, i;
  if (ADDR.test(name)) {
    bytes = [1];
    for (i = 2; i < 42; i += 2) { bytes.push(parseInt(name.slice(i, i + 2), 16)); }
  } else {
    bytes = [0];
    var u = utf8enc.encode(name);
    for (i = 0; i < u.length; i += 1) { bytes.push(u[i]); }
  }
  return bytesToC32(bytes);
}

function decodeSerial(serial) {
  var clean = String(serial).toUpperCase().replace(/[^0-9A-Z]/g, "");
  if (clean.length < 4) { return null; }
  var bytes = c32ToBytes(clean);
  if (!bytes || bytes.length < 2) { return null; }
  var kind = bytes[0], body = bytes.slice(1), i;
  if (kind === 1) {
    if (body.length < 20) { return null; }
    var hex = "0x";
    for (i = 0; i < 20; i += 1) { hex += body[i].toString(16).padStart(2, "0"); }
    return hex;
  }
  if (kind !== 0) { return null; }
  try {
    var out = utf8dec.decode(new Uint8Array(body)).replace(/ +$/, "");
    out = normalise(out);
    return out && encodeSerial(out) === clean ? out : (out || null);
  } catch (e) { return null; }
}

function groupSerial(s) {
  return s.replace(/(.{4})/g, "$1 ").trim();
}

/* ============================================================= card derivation */

var ORDINALS = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth"];
/* E3: "Reserve" and "Standard" were removed from this table. They are the two
   words of the protocol's own name, and "The Second Standard Bank of X" set
   above the motto reads as a bank the protocol issued rather than as pastiche.
   Every word below is ordinary nineteenth century bank vocabulary instead. */
var HOUSES = ["Continental", "Mercantile", "Provincial", "Sovereign", "Charter"];
var MONTHS = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
  "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

var P_TABLE = [5, 7, 8, 9, 11, 13, 14, 16, 17, 19, 21, 23];
var Q_TABLE = [1, 2, 3, 4, 5];
var RATIO_TABLE = [2, 3, 2.5, 7 / 3];
var STRAND_TABLE = [5, 6, 7, 8, 9, 11];
var ROSE_N_TABLE = [8, 10, 12, 14, 18, 24, 30, 36];

function gcd(a, b) { while (b) { var t = b; b = a % b; a = t; } return a; }

function shortAddress(a) { return a.slice(0, 6) + " " + a.slice(-4); }

function deriveCard(rawInput) {
  var name = normalise(rawInput);
  if (!name) { return null; }

  var b = byteStream(name);
  var rng = makeRng(name);

  /* Five discrete shape drivers first, per A2 1.9. These are what make one
     plate obviously not another. */
  var p = b.pick(P_TABLE);
  var q = b.pick(Q_TABLE);
  while (gcd(p, q) !== 1) { q = q === 1 ? 2 : 1; }
  var braid = b.pick(RATIO_TABLE);
  var strands = b.pick(STRAND_TABLE);
  var roseN = b.pick(ROSE_N_TABLE);

  /* Then the continuous texture drivers. */
  var g = {
    p: p, q: q, braid: braid, strands: strands, roseN: roseN,
    dOverR: b.range(0.30, 1.55),
    roseS: b.range(0.42, 0.95),
    roseDepth: b.range(0.05, 0.16),
    psi: b.range(0, Math.PI * 2),
    psi2: b.range(0, Math.PI * 2),
    a2a1: b.range(0.28, 0.72),
    envE: b.range(0.32, 0.95),
    dwOverW: b.range(0.28, 0.85),
    swellW: b.range(2, 4),
    tintDpsi: b.range(0.03, 0.22),
    tintPitch: b.range(3.1, 5.4),
    misTint: [b.range(-1.2, 1.2), b.range(-1.2, 1.2)],
    misNum: [b.range(-1.1, 1.1), b.range(-1.1, 1.1)],
    stampSkew: b.range(-0.02, 0.02)
  };

  var pick = function (arr) { return arr[Math.floor(rng() * arr.length)]; };
  /* E3 caught a real one. A zero padded four digit number that lands between
     0001 and 1000 is indistinguishable from a position in the genesis set of
     1,000 Founding Charters, and about one card in ten used to land there.
     E3 answered it with five digits, which fixes the reading and breaks the
     brief and the look of the plate at once. Chief's ruling: keep four digits,
     draw from 1001 upward, and the collision cannot happen at all. */
  var charter = 1001 + Math.floor(rng() * 8999);
  var ordinal = pick(ORDINALS);
  var house = pick(HOUSES);
  var year = 1863 + Math.floor(rng() * 63);
  var month = Math.floor(rng() * 12);
  var day = 1 + Math.floor(rng() * 28);

  return {
    input: name,
    isAddress: ADDR.test(name),
    subject: (ADDR.test(name) ? shortAddress(name) : name).toUpperCase(),
    house: "The " + ordinal + " " + house + " Bank of",
    charter: String(charter),
    day: String(day),
    month: MONTHS[month],
    year: String(year),
    serial: encodeSerial(name),
    g: g,
    sigRng: makeRng(name + " countersigned"),
    inkRng: makeRng(name + " ink")
  };
}

/* ===================================================================== ink */

var PAPER = "#DCDCCB";
var PAPER_HI = "#E6E6D8";
var TINT = "#B9BFA8";
var INK = "#26201A";
var INK_MID = "#4A463C";
var INK_SOFT = "#6E6A5C";
var RED = "#B1361E";
var BLUE = "#28536B";
var BRONZE = "#7E6428";
var COUNTER = "#16211D";

var F_TITLE = 'Didot, "Bodoni MT", "Bodoni 72", "Playfair Display", Georgia, "Times New Roman", serif';
var F_CAPS = 'Copperplate, "Copperplate Gothic Light", Optima, Candara, Georgia, serif';
var F_TEXT = '"Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif';
var F_NUM = '"SF Mono", "Cascadia Mono", Consolas, "DejaVu Sans Mono", monospace';
var F_STAMP = '"Haettenschweiler", "Arial Narrow", "Oswald", "Impact", "Franklin Gothic Medium", sans-serif';

/* ======================================================= engraved stroking */

/* A2 2.1. Canvas has no variable width stroke, so walk the polyline in short
   segments and set lineWidth per segment. Round caps, because an engraved line
   ends in a point. A2 1.6: pumping maps to width, not to position. */

function strokeEngraved(ctx, pts, colour, w0, kappa, omega, alpha) {
  if (pts.length < 2) { return; }
  ctx.save();
  ctx.strokeStyle = colour;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalAlpha = alpha == null ? 1 : alpha;
  var n = pts.length;
  for (var i = 1; i < n; i += 1) {
    var t = i / n;
    ctx.lineWidth = w0 * (1 + kappa * Math.abs(Math.cos(omega * t * Math.PI * 2)));
    ctx.beginPath();
    ctx.moveTo(pts[i - 1][0], pts[i - 1][1]);
    ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.stroke();
  }
  ctx.restore();
}

function strokePlain(ctx, pts, colour, w, alpha) {
  if (pts.length < 2) { return; }
  ctx.save();
  ctx.strokeStyle = colour;
  ctx.lineWidth = w;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalAlpha = alpha == null ? 1 : alpha;
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (var i = 1; i < pts.length; i += 1) { ctx.lineTo(pts[i][0], pts[i][1]); }
  ctx.stroke();
  ctx.restore();
}

/* =============================================================== the curves */

/* A2 1.1. Hypotrochoid with closure by p and q rather than by guessing r. */
function hypoPoints(cx, cy, R, p, q, dOverR, phase, spin) {
  var r = R * q / p;
  var d = dOverR * r;
  var k = (R - r) / r;
  var turns = q;
  var steps = Math.max(600, Math.floor(720 * turns));
  var pts = [];
  for (var i = 0; i <= steps; i += 1) {
    var t = (i / steps) * Math.PI * 2 * turns;
    var x = (R - r) * Math.cos(t) + d * Math.cos(k * t + phase);
    var y = (R - r) * Math.sin(t) - d * Math.sin(k * t + phase);
    var xr = x * Math.cos(spin) - y * Math.sin(spin);
    var yr = x * Math.sin(spin) + y * Math.cos(spin);
    pts.push([cx + xr, cy + yr]);
  }
  return pts;
}

/* A2 1.6. The rose engine proper. A lobed cam rocking the headstock, which is a
   polar radius function and not a trochoid. s below 1 gives the flat topped
   lobes a metal rosette actually cuts. */
function roseProfile(u, s) {
  var v = Math.sin(u);
  return (v < 0 ? -1 : 1) * Math.pow(Math.abs(v), s);
}

function rosePoints(cx, cy, R0, n, s, depth, psi) {
  var pts = [];
  var steps = 1440;
  for (var i = 0; i <= steps; i += 1) {
    var th = (i / steps) * Math.PI * 2;
    var rho = R0 * (1 + depth * roseProfile(n * th + psi, s));
    pts.push([cx + Math.cos(th) * rho, cy + Math.sin(th) * rho]);
  }
  return pts;
}

/* A2 1.7. Concentric rose family with a drift per ring. dpsi is the strongest
   parameter in the ground: it sweeps the crossing points into moire eyes. This
   belongs in the medallion, where the radii are small. Run it across a whole
   sheet and the outer rings become metre long arcs that read as scratches. */
function drawEngineTurnedGround(ctx, cx, cy, rInner, rOuter, g, colour, alpha) {
  var rings = Math.floor((rOuter - rInner) / g.tintPitch);
  ctx.save();
  ctx.globalAlpha = alpha;
  for (var k = 0; k < rings; k += 1) {
    var R0 = rInner + k * g.tintPitch;
    var pts = rosePoints(cx, cy, R0, g.roseN, g.roseS, g.roseDepth, g.psi + k * g.tintDpsi);
    strokePlain(ctx, pts, colour, 0.55, 1);
  }
  ctx.restore();
}

/* The sheet tint. A2 2.3: a field with no edge of its own, printed first and
   running under the type, whose job is to make erasure show. Two straight line
   families crossing at a seeded angle, which is what the straight line engine
   actually laid down. A2 2.5 keeps the pitch clear of the aliasing band. */
function drawSheetTint(ctx, W, H, g, colour, alpha) {
  var diag = Math.hypot(W, H);
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(W / 2, H / 2);
  var fams = [
    { rot: g.psi * 0.12 + 0.18, pitch: g.tintPitch, freq: 0.0042, amp: 5.5 },
    { rot: g.psi * 0.12 + 0.18 + 1.05 + g.tintDpsi * 2, pitch: g.tintPitch * 1.24, freq: 0.0031, amp: 3.4 }
  ];
  for (var f = 0; f < fams.length; f += 1) {
    var fam = fams[f];
    ctx.save();
    ctx.rotate(fam.rot);
    ctx.strokeStyle = colour;
    ctx.lineWidth = 0.6;
    for (var y = -diag / 2; y < diag / 2; y += fam.pitch) {
      ctx.beginPath();
      for (var x = -diag / 2; x <= diag / 2; x += 9) {
        var yy = y + Math.sin(x * fam.freq + y * 0.02 + g.psi2) * fam.amp;
        if (x === -diag / 2) { ctx.moveTo(x, yy); } else { ctx.lineTo(x, yy); }
      }
      ctx.stroke();
    }
    ctx.restore();
  }
  ctx.restore();
}

/* A2 1.3 and 1.4. The border is a travelling wave family off a straight line
   engine, parameterised by arc length so the corners do not stretch, with two
   frequencies because one frequency is a heart monitor. Interlacing is done by
   casing per A2 1.8, not by per crossing clipping. */

function perimeterPath(x, y, w, h, r) {
  var pts = [];
  var steps = 10;
  function arc(cx, cy, a0, a1) {
    for (var i = 1; i <= steps; i += 1) {
      var a = a0 + (a1 - a0) * (i / steps);
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
  }
  pts.push([x + r, y]);
  pts.push([x + w - r, y]);
  arc(x + w - r, y + r, -Math.PI / 2, 0);
  pts.push([x + w, y + h - r]);
  arc(x + w - r, y + h - r, 0, Math.PI / 2);
  pts.push([x + r, y + h]);
  arc(x + r, y + h - r, Math.PI / 2, Math.PI);
  pts.push([x, y + r]);
  arc(x + r, y + r, Math.PI, Math.PI * 1.5);
  pts.push([x + r, y]);

  var cum = [0], total = 0;
  for (var i = 1; i < pts.length; i += 1) {
    total += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    cum.push(total);
  }
  return { pts: pts, cum: cum, total: total };
}

function atLength(path, s) {
  var cum = path.cum, pts = path.pts;
  if (s <= 0) { s = 0; }
  if (s >= path.total) { s = path.total - 0.001; }
  var lo = 0, hi = cum.length - 1;
  while (lo < hi - 1) {
    var mid = (lo + hi) >> 1;
    if (cum[mid] <= s) { lo = mid; } else { hi = mid; }
  }
  var seg = cum[hi] - cum[lo] || 1;
  var f = (s - cum[lo]) / seg;
  var x = pts[lo][0] + (pts[hi][0] - pts[lo][0]) * f;
  var y = pts[lo][1] + (pts[hi][1] - pts[lo][1]) * f;
  var dx = pts[hi][0] - pts[lo][0], dy = pts[hi][1] - pts[lo][1];
  var len = Math.hypot(dx, dy) || 1;
  return [x, y, -dy / len, dx / len];
}

function drawBorderBand(ctx, x, y, w, h, band, g, casing) {
  var path = perimeterPath(x, y, w, h, 14);
  var L = path.total;
  var f1 = 1 / 62;
  var f2 = f1 * g.braid;
  var A1 = band * 0.42;
  var A2v = A1 * g.a2a1;
  var N = g.strands;
  var samples = Math.max(1400, Math.floor(L / 1.6));
  var k, i;

  for (k = 0; k < N; k += 1) {
    var phi = (Math.PI * 2 * k) / N;
    var pts = [];
    for (i = 0; i <= samples; i += 1) {
      var s = (i / samples) * L;
      var off = A1 * Math.sin(Math.PI * 2 * f1 * s + phi) +
                A2v * Math.sin(Math.PI * 2 * f2 * s + 2 * phi);
      var pt = atLength(path, s);
      pts.push([pt[0] + pt[2] * off, pt[1] + pt[3] * off]);
    }
    if (casing) { strokePlain(ctx, pts, PAPER, 3.1, 1); }
    strokeEngraved(ctx, pts, INK, 0.62, 0.55, 3, 0.92);
  }
}

/* ============================================================= the substrate */

function cutY(x, g) {
  return 21 + Math.sin(x / 38 + g.psi) * 11 + Math.sin(x / 13 + g.psi2) * 3.4;
}

function clipToPaper(ctx, W, H, g) {
  ctx.beginPath();
  ctx.moveTo(0, H);
  ctx.lineTo(0, cutY(0, g));
  for (var x = 0; x <= W; x += 4) { ctx.lineTo(x, cutY(x, g)); }
  ctx.lineTo(W, H);
  ctx.closePath();
  ctx.clip();
}

function drawPaper(ctx, W, H, g, cutTop) {
  ctx.fillStyle = COUNTER;
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  clipToPaper(ctx, W, H, g);

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  var grd = ctx.createLinearGradient(0, 0, W * 0.7, H);
  grd.addColorStop(0, PAPER_HI);
  grd.addColorStop(1, PAPER);
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = 1;
  ctx.restore();
}

/* ================================================================== lettering */

function tracked(ctx, text, x, y, spacing, align) {
  /* Letterspacing opens every letter gap, so a word space set at its normal
     width stops reading as a word break and the eye finds breaks inside words
     instead. Open the space further than the letters, the way an engraver
     spacing out a line of caps would. */
  function advance(ch) {
    var w = ctx.measureText(ch).width;
    return ch === " " ? w * 1.35 + spacing * 2.2 : w + spacing;
  }
  var total = 0, i;
  for (i = 0; i < text.length; i += 1) { total += advance(text[i]); }
  total -= spacing;
  var cx = x;
  if (align === "center") { cx = x - total / 2; }
  if (align === "right") { cx = x - total; }
  for (i = 0; i < text.length; i += 1) {
    if (text[i] !== " ") { ctx.fillText(text[i], cx, y); }
    cx += advance(text[i]);
  }
  return total;
}

function fitFont(ctx, text, font, maxWidth, startSize, minSize) {
  var size = startSize;
  while (size > minSize) {
    ctx.font = size + "px " + font;
    if (ctx.measureText(text).width <= maxWidth) { break; }
    size -= 1;
  }
  ctx.font = size + "px " + font;
  return size;
}

function trackedFit(ctx, text, font, maxWidth, startSize, minSize, spacing) {
  var size = startSize;
  while (size > minSize) {
    ctx.font = size + "px " + font;
    var w = ctx.measureText(text).width + spacing * (text.length - 1);
    if (w <= maxWidth) { break; }
    size -= 1;
  }
  ctx.font = size + "px " + font;
  return size;
}

/* =============================================================== the plate */

var LAYOUT = {
  wide: {
    W: 1200, H: 675,
    stubX: 14, stubW: 84, perfX: 112,
    bodyX: 156, bodyY: 56, bodyW: 1000, bodyH: 575, band: 16,
    colX: 190, colW: 708, colCx: 544,
    markCx: 1018, markX: 914, markW: 208,
    houseY: 122, nameY: 190, nameMax: 690,
    schedX: 196, schedW: 696, schedY: 258, schedRow: 27,
    medCx: 1018, medCy: 276, medR: 90,
    crossCx: 1000, crossCy: 122, crossW: 158,
    dateCx: 1018, dateY: 404,
    clauseY: 492, clauseCx: 544,
    sigX: 240, sigW: 200, sigGap: 20, sigY: 548,
    mottoY: 594, creditY: 608,
    serialY: 656, discY: 670,
    stampCx: 1002, stampCy: 498, stampR: 72,
    counterR: 26
  },
  square: {
    W: 1080, H: 1080,
    stubX: 16, stubW: 88, perfX: 118,
    bodyX: 162, bodyY: 60, bodyW: 876, bodyH: 960, band: 17,
    colX: 196, colW: 808, colCx: 600,
    markCx: 600, markX: 196, markW: 808,
    houseY: 196, nameY: 272, nameMax: 740,
    schedX: 210, schedW: 780, schedY: 640, schedRow: 29,
    medCx: 600, medCy: 440, medR: 138,
    crossCx: 846, crossCy: 124, crossW: 158,
    dateCx: 856, dateY: 604,
    clauseY: 888, clauseCx: 600,
    sigX: 250, sigW: 210, sigGap: 20, sigY: 944,
    mottoY: 982, creditY: 996,
    serialY: 1050, discY: 1066,
    stampCx: 600, stampCy: 440, stampR: 116,
    counterR: 28
  }
};

var SCHEDULE = [
  ["BRANCHES OPEN", "1 OF 10"],
  ["ISSUED BY", "THE CHARTER OFFICE, UNOFFICIAL"],
  ["AUTHORITY", "NONE"],
  ["ONCHAIN RECORD", "NONE"],
  ["TRANSFERABLE", "NO"],
  ["CONFERS", "NOTHING"],
  ["EXAMINATION", ""],
  ["COUNTERPART FILED", ""]
];

function drawStub(ctx, L, card) {
  var x = L.stubX, w = L.stubW;
  var top = 40, bot = L.H - 26;

  ctx.save();
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = TINT;
  ctx.fillRect(0, top - 12, L.perfX, bot - top + 24);
  ctx.restore();

  ctx.save();
  ctx.strokeStyle = INK_MID;
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(x + w + 6, top - 4);
  ctx.lineTo(x + w + 6, bot);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.fillStyle = INK_MID;
  ctx.globalAlpha = 0.55;
  for (var y = top - 10; y < bot + 12; y += 7) {
    ctx.beginPath();
    ctx.arc(L.perfX, y, 1.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  function label(text, ly) {
    ctx.fillStyle = INK_SOFT;
    ctx.font = "7px " + F_CAPS;
    tracked(ctx, text, x, ly, 1.3, "left");
  }
  function rule(ly) {
    ctx.save();
    ctx.strokeStyle = INK_MID;
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(x, ly);
    ctx.lineTo(x + w, ly);
    ctx.stroke();
    ctx.restore();
  }

  label("CHARTER No.", top + 24);
  ctx.fillStyle = INK;
  ctx.font = "21px " + F_TITLE;
  ctx.fillText(card.charter, x, top + 48);
  rule(top + 60);

  label("DATE OF ISSUE", top + 78);
  ctx.fillStyle = INK;
  ctx.font = "11px " + F_TITLE;
  ctx.fillText(card.day + " " + card.month.slice(0, 3), x, top + 96);
  ctx.fillText(card.year, x, top + 112);
  rule(top + 124);

  label("ENTERED BY", top + 142);
  rule(top + 168);

  /* A3 entries 7 and 10. The office kept the counterfoil and the holder never
     saw it again, so an intact pair only survives where the office stopped
     functioning. This office is unofficial, nothing was filed, and the visitor
     is holding both halves. The line states the fact and tells no joke. */
  ctx.save();
  ctx.translate(x + w - 4, bot - 8);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = INK_SOFT;
  ctx.font = "7.5px " + F_CAPS;
  tracked(ctx, "THIS PORTION IS RETAINED BY THE OFFICE", 0, 0, 1.1, "left");
  ctx.restore();

  /* A3 entry 1. Papel sellado stacked the prior biennium's seals down the left
     margin, so the sheet carries a history older than anything written on it. */
  ctx.save();
  ctx.globalAlpha = 0.15;
  var gy = top + 210;
  for (var b = 0; b < 3; b += 1) {
    var pts = rosePoints(x + w / 2, gy + b * 46, 15, 12, 0.7, 0.14, card.g.psi + b);
    strokePlain(ctx, pts, INK, 0.6, 1);
    ctx.strokeStyle = INK;
    ctx.lineWidth = 0.5;
    ctx.strokeRect(x + 4, gy + b * 46 - 20, w - 8, 40);
  }
  ctx.restore();
}

function drawChirographLine(ctx, L, g) {
  /* A3 entry 3. The text sits astride the cut, then everything above the cut
     is clipped away, so the top of every letterform is missing and a
     counterpart exists somewhere with the other halves. */
  /* E3: the word unofficial is carried here as well as in the crossing. This
     line repeats across the full width at the torn edge, so no single crop
     removes it without removing the office name too. */
  var line = "THE CHARTER OFFICE   UNOFFICIAL REGISTER OF COMMEMORATIVE PAPER   ";
  ctx.save();
  clipToPaper(ctx, L.W, L.H, g);

  ctx.fillStyle = INK;
  ctx.globalAlpha = 0.62;
  ctx.font = "15px " + F_CAPS;
  var full = "";
  while (ctx.measureText(full).width < L.W + 240) { full += line; }
  ctx.fillText(full, 6, 27);
  ctx.restore();
}

function drawCrossing(ctx, L, g) {
  /* A3 entry 9. The crossing under the Bills of Exchange Act is the only mark
     I found that subtracts rights by drawing two rules over finished printing.
     Ours carries the one word that has to survive a screenshot. It is applied
     by the holder after issue, so it sits on top of the plate work and inside
     the frame, never bleeding off the sheet. */
  ctx.save();
  ctx.translate(L.crossCx, L.crossCy);
  ctx.rotate(-0.32);
  ctx.strokeStyle = RED;
  ctx.globalAlpha = 0.9;
  ctx.lineWidth = 1.5;
  var half = L.crossW / 2;
  ctx.beginPath();
  ctx.moveTo(-half, -13); ctx.lineTo(half, -13);
  ctx.moveTo(-half, 15); ctx.lineTo(half, 15);
  ctx.stroke();
  ctx.fillStyle = RED;
  ctx.font = "12px " + F_CAPS;
  tracked(ctx, "UNOFFICIAL ISSUE", 0, 8, 3.2, "center");
  ctx.restore();
}

function drawCorner(ctx, cx, cy, R, g, card, index) {
  /* A1, from the 1864 Treasury contract: counters in all four corners, fine
     work in every remaining gap, no empty ground left inside the border. The
     charter number lives in the counter, which is where a National Bank Note
     put it, rather than loose on the field. */
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(g.psi2 + index * 0.6);
  var ring = rosePoints(0, 0, R, Math.max(8, g.roseN - 4), g.roseS, g.roseDepth * 1.6, g.psi);
  strokeEngraved(ctx, ring, INK, 0.55, 0.5, 2, 0.72);
  var inner = rosePoints(0, 0, R * 0.74, Math.max(8, g.roseN - 4), g.roseS, g.roseDepth * 1.2, g.psi + 0.4);
  strokeEngraved(ctx, inner, INK, 0.45, 0.5, 2, 0.6);
  ctx.beginPath();
  ctx.fillStyle = PAPER;
  ctx.globalAlpha = 0.88;
  ctx.arc(0, 0, R * 0.58, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();

  ctx.save();
  ctx.translate(cx + card.g.misNum[0], cy + card.g.misNum[1]);
  ctx.fillStyle = RED;
  ctx.font = "16px " + F_NUM;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(card.charter, 0, 1);
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  ctx.restore();
}

function drawSchedule(ctx, L, card, stampLabel) {
  var x = L.schedX, w = L.schedW, y = L.schedY;
  ctx.save();
  ctx.fillStyle = INK_SOFT;
  ctx.font = "9px " + F_CAPS;
  tracked(ctx, "SCHEDULE OF WHAT THIS PAPER GRANTS", x, y - 14, 1.8, "left");

  for (var i = 0; i < SCHEDULE.length; i += 1) {
    var ry = y + i * L.schedRow;
    ctx.strokeStyle = INK_MID;
    ctx.globalAlpha = 0.42;
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(x, ry + 7);
    ctx.lineTo(x + w, ry + 7);
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.fillStyle = INK_SOFT;
    ctx.font = "9.5px " + F_CAPS;
    tracked(ctx, SCHEDULE[i][0], x, ry, 1.5, "left");

    var val = SCHEDULE[i][1];
    if (SCHEDULE[i][0] === "EXAMINATION" && stampLabel) { val = stampLabel; }
    ctx.textAlign = "right";
    if (val) {
      ctx.fillStyle = INK;
      ctx.font = "12px " + F_TEXT;
      ctx.fillText(val, x + w, ry);
    } else {
      ctx.fillStyle = INK_SOFT;
      ctx.globalAlpha = 0.55;
      ctx.font = "12px " + F_TEXT;
      ctx.fillText("·  ·  ·", x + w, ry);
      ctx.globalAlpha = 1;
    }
    ctx.textAlign = "left";
  }
  ctx.restore();
}

function drawSignature(ctx, x, y, w, rng, colour) {
  /* A signature is not a row of peaks. What makes a hand read as a hand is
     three things: a slant, so the stroke leans as the wrist pulls it right;
     more than one frequency, so loops sit inside loops instead of repeating;
     and continuity, because the pen only leaves the paper once. Built from a
     sheared sum of three sinusoids under an envelope that tapers both ends. */
  var loops = 2.6 + rng() * 1.6;
  var a1 = 15 + rng() * 9;
  var a2 = 6 + rng() * 7;
  var a3 = 2.5 + rng() * 4;
  var p2 = rng() * Math.PI * 2;
  var p3 = rng() * Math.PI * 2;
  var shear = 0.26 + rng() * 0.16;
  var lift = 0.62 + rng() * 0.2;

  var body = [];
  var i, t, u, env, dy;
  var steps = 320;
  for (i = 0; i <= steps; i += 1) {
    t = i / steps;
    u = t * loops * Math.PI * 2;
    env = Math.pow(Math.sin(Math.PI * Math.min(1, t * 1.06)), 0.34);
    dy = (a1 * Math.sin(u) + a2 * Math.sin(2 * u + p2) + a3 * Math.sin(3 * u + p3)) * env;
    body.push([x + t * w * lift + shear * dy, y - dy]);
  }

  /* One lift, then the terminal flourish. It goes out to the right, drops
     below the line and runs back left underneath everything already written,
     which is what an underlining hand does. It never leaves the rule it sits
     on, because a flourish that crosses the next field is a mistake. */
  var last = body[body.length - 1];
  var qx = [last[0], last[0] + w * 0.17, last[0] + w * 0.10, x - w * 0.02];
  var qy = [last[1], last[1] + 6, last[1] + 27, last[1] + 17];
  var tail = [];
  for (i = 0; i <= 180; i += 1) {
    t = i / 180;
    var mt = 1 - t;
    tail.push([
      mt * mt * mt * qx[0] + 3 * mt * mt * t * qx[1] + 3 * mt * t * t * qx[2] + t * t * t * qx[3],
      mt * mt * mt * qy[0] + 3 * mt * mt * t * qy[1] + 3 * mt * t * t * qy[2] + t * t * t * qy[3]
    ]);
  }

  strokeEngraved(ctx, body, colour, 1.2, 0.62, 2, 0.95);
  strokeEngraved(ctx, tail, colour, 0.9, 0.55, 1, 0.8);
}

function drawSignatureRow(ctx, L, card) {
  /* A3 entry 6. Three capacities on one line, one of them signed. A blank rule
     on a printed form reads as an office that exists and was not required. */
  var caps = ["CLERK", "EXAMINER", "KEEPER OF THE REGISTER"];
  var rng = card.sigRng;
  for (var i = 0; i < 3; i += 1) {
    var x = L.sigX + i * (L.sigW + L.sigGap);
    if (i === 0) { drawSignature(ctx, x + 14, L.sigY - 12, L.sigW - 28, rng, INK); }
    ctx.save();
    ctx.strokeStyle = INK_MID;
    ctx.globalAlpha = 0.6;
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(x, L.sigY + 8);
    ctx.lineTo(x + L.sigW, L.sigY + 8);
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = INK_SOFT;
    ctx.font = "9px " + F_CAPS;
    tracked(ctx, caps[i], x + L.sigW / 2, L.sigY + 22, 1.8, "center");
  }
}

function drawBookingLayer(ctx, L, card) {
  /* A3 entry 11. The blank was printed months earlier and aligned to the grid.
     The date and the file number were impressed at the counter, off axis and a
     little heavier, by a second machine in a different room. Nothing else on
     the plate is allowed to break alignment. */
  ctx.save();
  ctx.translate(L.dateCx, L.dateY);
  ctx.rotate(card.g.stampSkew + 0.026);
  ctx.fillStyle = INK;
  ctx.globalAlpha = 0.9;
  ctx.textAlign = "center";
  ctx.font = "9px " + F_CAPS;
  tracked(ctx, "DATE OF ISSUE", 0, -18, 2, "center");
  ctx.font = "18px " + F_NUM;
  ctx.fillText(card.day + " " + card.month + " " + card.year, 0, 4);
  ctx.textAlign = "left";
  ctx.restore();
}

function drawPlate(ctx, card, mode, stampId, scale) {
  var L = LAYOUT[mode];
  var g = card.g;
  var W = L.W, H = L.H;
  var i;

  ctx.save();
  ctx.scale(scale, scale);
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  drawPaper(ctx, W, H, g, 0);

  /* The tint underprint. A2 2.3 puts it at 8 to 14 percent of the paper to ink
     range, A2 2.5 keeps the pitch clear of the aliasing band, and A2 2.7 gives
     it its own misregistration because it is a separate press pass. */
  ctx.save();
  clipToPaper(ctx, W, H, g);
  ctx.translate(g.misTint[0], g.misTint[1]);
  drawSheetTint(ctx, W, H, g, TINT, 0.55);
  ctx.restore();

  drawChirographLine(ctx, L, g);
  drawStub(ctx, L, card);

  drawBorderBand(ctx, L.bodyX, L.bodyY, L.bodyW, L.bodyH, L.band, g, true);

  ctx.save();
  ctx.strokeStyle = INK;
  ctx.globalAlpha = 0.85;
  ctx.lineWidth = 1.2;
  ctx.strokeRect(L.bodyX - 10, L.bodyY - 10, L.bodyW + 20, L.bodyH + 20);
  ctx.globalAlpha = 0.7;
  ctx.lineWidth = 0.7;
  ctx.strokeRect(L.bodyX + L.band, L.bodyY + L.band, L.bodyW - 2 * L.band, L.bodyH - 2 * L.band);
  ctx.restore();

  var cIn = L.band + 30;
  var corners = [
    [L.bodyX + cIn, L.bodyY + cIn],
    [L.bodyX + L.bodyW - cIn, L.bodyY + cIn],
    [L.bodyX + cIn, L.bodyY + L.bodyH - cIn],
    [L.bodyX + L.bodyW - cIn, L.bodyY + L.bodyH - cIn]
  ];
  for (i = 0; i < 4; i += 1) {
    drawCorner(ctx, corners[i][0], corners[i][1], L.counterR, g, card, i);
  }

  /* The compartment. A rose engine ground under a phase shifted hypotrochoid
     family, A2 1.3 second variant, which twists the family like rope rather
     than rotating the whole figure. This is the one bold element on the site. */
  drawEngineTurnedGround(ctx, L.medCx, L.medCy, L.medR * 0.30, L.medR * 0.92, g, INK, 0.32);
  var fam = Math.min(g.strands, 8);
  for (i = 0; i < fam; i += 1) {
    var pts = hypoPoints(L.medCx, L.medCy, L.medR * 0.74, g.p, g.q, g.dOverR,
      (Math.PI * 2 * i) / fam, g.psi);
    strokeEngraved(ctx, pts, INK, 0.42, 0.6, 2, 0.6);
  }
  ctx.save();
  ctx.strokeStyle = INK;
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.arc(L.medCx, L.medCy, L.medR * 0.99, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  ctx.font = "12px " + F_CAPS;
  tracked(ctx, "THE CHARTER OFFICE", L.colCx, L.houseY - 44, 3.4, "center");
  ctx.font = "22px " + F_TITLE;
  ctx.fillText(card.house, L.colCx, L.houseY);
  ctx.textAlign = "left";

  var ts = fitFont(ctx, card.subject, F_TITLE, L.nameMax, mode === "square" ? 84 : 74, 18);
  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  ctx.font = ts + "px " + F_TITLE;
  ctx.fillText(card.subject, L.colCx, L.nameY);
  ctx.textAlign = "left";

  ctx.save();
  ctx.strokeStyle = INK;
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(L.colCx - L.nameMax / 2, L.nameY + 18);
  ctx.lineTo(L.colCx + L.nameMax / 2, L.nameY + 18);
  ctx.stroke();
  ctx.restore();

  drawSchedule(ctx, L, card, STAMP_SHORT[stampId] || "");
  drawBookingLayer(ctx, L, card);

  /* A3 entry 13. A fixed testimonial clause, first person, from the office,
     immediately above the countersignature rules. A protest form printed the
     closing formula before the event it described had happened. */
  ctx.fillStyle = INK_MID;
  ctx.textAlign = "center";
  ctx.font = "13px " + F_TEXT;
  ctx.fillText("In witness of nothing at all, this office has set its hand and issued the paper.",
    L.clauseCx, L.clauseY);
  ctx.textAlign = "left";

  drawSignatureRow(ctx, L, card);

  ctx.fillStyle = INK;
  ctx.font = "15px " + F_CAPS;
  ctx.textAlign = "center";
  tracked(ctx, "THE BANK IS CODE", L.colCx, L.mottoY, 5, "center");

  /* E3: the motto is the protocol's line, not this office's. Set unattributed
     in the largest caps on the sheet, it reads on a shared PNG as the issuing
     body's own motto. The credit turns it back into a quotation, and that
     courtesy is what the whole project rests on. */
  ctx.fillStyle = INK_SOFT;
  ctx.font = "8px " + F_CAPS;
  tracked(ctx, "THE STANDARD RESERVE, WHITEPAPER V0.1", L.colCx, L.creditY, 1.6, "center");

  /* The numbering pass. A2 2.2: a separate letterpress run, its own colour and
     its own misregistration, never sharing a path with the lathe work. It sits
     in the bottom margin, outside the frame, where E3 can read it: this line
     used to be set over the guilloche band and was invisible at six times
     magnification even though every pixel of it was being drawn. */
  ctx.save();
  ctx.translate(g.misNum[0], g.misNum[1]);
  ctx.fillStyle = RED;
  ctx.font = "11px " + F_NUM;
  ctx.textAlign = "center";
  ctx.fillText("SERIAL  " + groupSerial(card.serial), W / 2, L.serialY);
  ctx.restore();

  ctx.fillStyle = INK;
  ctx.font = "9px " + F_CAPS;
  ctx.textAlign = "center";
  tracked(ctx, "UNOFFICIAL AND COMMEMORATIVE. NOT ONCHAIN. NOT AN ALLOWLIST. CONFERS NOTHING.",
    W / 2, L.discY, 1.5, "center");
  ctx.textAlign = "left";

  drawCrossing(ctx, L, g);

  if (stampId && Object.prototype.hasOwnProperty.call(STAMPS, stampId)) {
    drawStamp(ctx, stampId, L, card);
  }

  ctx.restore();
}

var STAMP_SHORT = {
  expansion: "CLEARED FOR EXPANSION",
  patient: "STANDING, PATIENT CAPITAL",
  provisional: "PROVISIONAL",
  revocation: "REVOCATION NOTICE",
  sovereign: "SOVEREIGN"
};

var STAMPS = {
  expansion: { kind: "seal", colour: BRONZE, l1: "CLEARED FOR", l2: "EXPANSION", l3: "LICENSE BURNED ON RECEIPT" },
  patient: { kind: "seal", colour: INK, l1: "STANDING", l2: "PATIENT CAPITAL", l3: "" },
  provisional: { kind: "hand", colour: BLUE, l1: "PROVISIONAL", l2: "SUBJECT TO EXIT PRICING", l3: "" },
  revocation: { kind: "over", colour: "#A8321C", l1: "REVOCATION NOTICE", l2: "REPORTABLE AFTER 30 DAYS", l3: "" },
  sovereign: { kind: "emboss", colour: INK, l1: "SOVEREIGN", l2: "EXAMINED AND FOUND CORRECT", l3: "" }
};

function erode(ctx, x, y, w, h, count, rng) {
  /* A2 3.4 item 2. A hand applied strike does not have clean glyph edges. */
  ctx.save();
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "#000";
  for (var i = 0; i < count; i += 1) {
    var px = x + rng() * w;
    var py = y + rng() * h;
    var r = 0.4 + rng() * 1.2;
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawOverstamp(ctx, s, L, card) {
  /* A2 3.9, followed to the number. Drawn last, on its own layer, visibly on
     top of the serial. If it sits under anything printed with the plate the
     eye reads it as part of the design and the whole effect is gone. */
  var W = L.W, H = L.H;
  var rng = card.inkRng;
  var off = document.createElement("canvas");
  off.width = W; off.height = H;
  var o = off.getContext("2d");

  o.save();
  o.translate(0.46 * W - 18, 0.54 * H + 14);
  o.rotate(-23.5 * Math.PI / 180);

  var text = s.l1;
  var size = trackedFit(o, text, F_STAMP, W * 0.62, 74, 34, 7);
  o.fillStyle = s.colour;
  o.textAlign = "center";

  o.globalAlpha = 0.2;
  o.filter = "blur(1.2px)";
  o.font = size + "px " + F_STAMP;
  tracked(o, text, 0, 0, 7, "center");
  o.filter = "none";

  var width = 0, i;
  o.font = size + "px " + F_STAMP;
  for (i = 0; i < text.length; i += 1) { width += o.measureText(text[i]).width + 7; }
  width -= 7;

  var cxs = -width / 2;
  for (i = 0; i < text.length; i += 1) {
    var ch = text[i];
    var t = i / Math.max(1, text.length - 1);
    o.globalAlpha = 0.95 - t * 0.37;
    o.save();
    o.translate(cxs + o.measureText(ch).width / 2 + (rng() - 0.5) * 1.2,
      (rng() - 0.5) * 1.6);
    o.rotate((rng() - 0.5) * 0.0175);
    o.textAlign = "center";
    o.fillText(ch, 0, 0);
    o.restore();
    cxs += o.measureText(ch).width + 7;
  }

  o.globalAlpha = 0.9;
  o.strokeStyle = s.colour;
  o.lineWidth = 3;
  o.beginPath();
  o.moveTo(-width / 2 - 8, -size * 0.78);
  o.lineTo(width / 2 + 8, -size * 0.78);
  o.moveTo(-width / 2 - 8, size * 0.34);
  o.lineTo(width / 2 + 8, size * 0.34);
  o.stroke();

  o.globalAlpha = 0.74;
  o.fillStyle = s.colour;
  o.font = "23px " + F_STAMP;
  o.textAlign = "left";
  tracked(o, s.l2, -width / 2, size * 0.34 + 34, 3, "left");
  o.restore();

  /* One under inked region, A2 3.4 item 4. The corner of the die that did not
     quite touch the pad. */
  o.save();
  o.globalCompositeOperation = "destination-out";
  var gx = 0.46 * W + 150, gy = 0.54 * H - 30;
  var rg = o.createRadialGradient(gx, gy, 0, gx, gy, 96);
  rg.addColorStop(0, "rgba(0,0,0,0.44)");
  rg.addColorStop(1, "rgba(0,0,0,0)");
  o.fillStyle = rg;
  o.fillRect(gx - 110, gy - 110, 220, 220);
  o.restore();

  erode(o, 0.46 * W - 480, 0.54 * H - 130, 960, 260, 900, rng);

  ctx.save();
  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = 0.88;
  ctx.drawImage(off, 0, 0);
  ctx.restore();
}

function drawSeal(ctx, s, L, card) {
  var cx = L.stampCx, cy = L.stampCy, R = L.stampR;
  var rng = card.inkRng;
  var blind = s.kind === "emboss";

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(s.kind === "hand" ? -0.085 : card.g.stampSkew);

  if (blind) {
    /* A3 entry 2. An albino strike carries no ink at all, so it can only be
       drawn as the shadow one side and the highlight the other. On a tinted
       ground that means two offset passes of the same geometry, one darker
       than the paper and one lighter, and no fill anywhere. */
    ctx.save();
    var kg = ctx.createRadialGradient(0, 0, R * 0.2, 0, 0, R + 8);
    kg.addColorStop(0, "rgba(220,220,203,0.62)");
    kg.addColorStop(0.78, "rgba(220,220,203,0.44)");
    kg.addColorStop(1, "rgba(220,220,203,0)");
    ctx.fillStyle = kg;
    ctx.beginPath();
    ctx.arc(0, 0, R + 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    var passes = [[-1.7, -2.0, "rgba(255,255,248,0.85)"], [1.7, 2.0, "rgba(38,32,26,0.46)"]];
    for (var pi = 0; pi < passes.length; pi += 1) {
      ctx.save();
      ctx.translate(passes[pi][0], passes[pi][1]);
      ctx.strokeStyle = passes[pi][2];
      ctx.fillStyle = passes[pi][2];
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, R - 9, 0, Math.PI * 2); ctx.stroke();
      var pts = rosePoints(0, 0, R - 20, 24, 0.6, 0.1, 0);
      strokePlain(ctx, pts, passes[pi][2], 1.1, 1);
      ctx.textAlign = "center";
      ctx.font = "17px " + F_CAPS;
      tracked(ctx, s.l1, 0, 4, 3, "center");
      ctx.restore();
    }
    ctx.restore();
    return;
  }

  var off = document.createElement("canvas");
  off.width = R * 2 + 40; off.height = R * 2 + 40;
  var o = off.getContext("2d");
  o.translate(off.width / 2, off.height / 2);
  o.strokeStyle = s.colour;
  o.fillStyle = s.colour;
  o.lineWidth = s.kind === "hand" ? 3.4 : 2.4;
  o.beginPath(); o.arc(0, 0, R, 0, Math.PI * 2); o.stroke();
  o.beginPath(); o.arc(0, 0, R - 8, 0, Math.PI * 2); o.stroke();

  if (s.kind === "seal") {
    var ring = rosePoints(0, 0, R - 20, 30, 0.55, 0.09, 0);
    strokePlain(o, ring, s.colour, 0.9, 0.75);
  }

  o.textAlign = "center";
  o.font = "15px " + F_CAPS;
  tracked(o, s.l1, 0, s.l2 ? -6 : 4, 2.6, "center");
  if (s.l2) {
    o.font = "10px " + F_CAPS;
    tracked(o, s.l2, 0, 14, 1.6, "center");
  }
  if (s.l3) {
    o.font = "7.5px " + F_CAPS;
    tracked(o, s.l3, 0, 32, 1.2, "center");
  }
  erode(o, -off.width / 2, -off.height / 2, off.width, off.height, 420, rng);

  ctx.globalCompositeOperation = "multiply";
  ctx.globalAlpha = 0.86;
  ctx.drawImage(off, -off.width / 2, -off.height / 2);
  ctx.restore();
}

function drawStamp(ctx, id, L, card) {
  var s = STAMPS[id];
  if (!s) { return; }
  if (s.kind === "over") { drawOverstamp(ctx, s, L, card); return; }
  drawSeal(ctx, s, L, card);
}
