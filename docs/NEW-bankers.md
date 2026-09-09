# Bankers vignette

## 1. HTML

```html
<div class="bankersWrap">
  <canvas id="bankersCanvas" class="bankersCanvas" width="2352" height="400" role="img" aria-label="An engraved vignette of clerks and bankers standing behind a long counter"></canvas>
</div>
```

## 2. CSS

```css
.bankersWrap { position: relative; width: 1176px; height: 200px; margin: 56px auto 28px; }
.bankersCanvas { display: block; width: 1176px; height: 200px; }

@media (max-width: 1287px) {
  .bankersWrap { width: auto; height: auto; margin: 36px 0 20px; }
  .bankersCanvas { width: 100%; height: 120px; object-fit: cover; }
}
```

## 3. JS

```js
/* ========================================================== bankers vignette
   The counting hall from the customer side, cut from one fixed seed. Same
   technique as the banner: layered fills far to near, dark to light, then the
   burin work clipped to the near layer. No clock, no Math.random. */

var BANK_SEED = "the counting hall, six clerks, plate two";

function bankRng(seed) {
  var s = xmur3(seed);
  return sfc32(s(), s(), s(), s());
}

function bankSpan(rng, lo, hi) { return lo + (hi - lo) * rng(); }

function bankInt(rng, lo, hi) { return Math.floor(bankSpan(rng, lo, hi + 1)); }

function bankGround(ctx, W, H) {
  var grd = ctx.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0, "#100D09");
  grd.addColorStop(0.5, "#14100C");
  grd.addColorStop(1, "#191410");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);
}

/* Burin work. One diagonal set for the shadow, one flat set for the tooth of
   the plate. Called inside a clip, so it never floods the whole plate. */

function bankHatch(ctx, W, H, pitch, alpha) {
  var d, y;
  ctx.lineWidth = 0.6;
  ctx.strokeStyle = "rgba(16, 12, 8, " + alpha + ")";
  ctx.beginPath();
  for (d = -H; d < W + H; d += pitch) {
    ctx.moveTo(d, H);
    ctx.lineTo(d + H, 0);
  }
  ctx.stroke();
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "rgba(216, 208, 190, 0.055)";
  ctx.beginPath();
  for (y = 0; y < H; y += 5) {
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(W, y + 0.5);
  }
  ctx.stroke();
}

/* The back wall: a run of arched teller openings, each one a hole of shadow
   with a grille of bars across it. Nothing is stroked; the wall is filled
   once and the openings are laid inside its clip. */

function bankArcade(ctx, rng, W, top, base) {
  var bays = 9;
  var pitch = W / bays;
  var i, j, cx, w, r, aTop, bars, bp;
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, top, W, base - top);
  ctx.fillStyle = "#1E1C19";
  ctx.fill();
  ctx.clip();

  ctx.fillStyle = "#141310";
  for (i = 0; i < bays; i += 1) {
    cx = pitch * i + pitch / 2 + bankSpan(rng, -3, 3);
    w = pitch * bankSpan(rng, 0.44, 0.56);
    r = w / 2;
    aTop = top + bankSpan(rng, 22, 34);
    ctx.beginPath();
    ctx.moveTo(cx - r, base);
    ctx.lineTo(cx - r, aTop + r);
    ctx.arc(cx, aTop + r, r, Math.PI, Math.PI * 2);
    ctx.lineTo(cx + r, base);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = "rgba(90, 83, 72, 0.34)";
  for (i = 0; i < bays; i += 1) {
    cx = pitch * i + pitch / 2;
    w = pitch * 0.5;
    bars = 5;
    bp = w / bars;
    for (j = 1; j < bars; j += 1) {
      ctx.fillRect(cx - w / 2 + bp * j, top + 34, 1.1, base - top - 34);
    }
  }

  ctx.fillStyle = "rgba(67, 62, 53, 0.5)";
  ctx.fillRect(0, top + 4, W, 1.6);
  ctx.fillRect(0, top + 9, W, 1);
  ctx.restore();
}

/* One figure, head and shoulders only. Lean turns the head and rolls the
   shoulders; hat is 0 for bareheaded, 1 for a top hat, 2 for a bowler. The
   subpaths go onto the accumulated layer path, the shadow rectangles onto
   det, exactly as the banner does it. */

function bankFigure(ctx, rng, cx, base, h, s, hat, lean, det) {
  var rx = 8.6 * s;
  var ry = 10.8 * s;
  var headTop = base - h;
  var hcy = headTop + ry;
  var hx = cx + lean;
  var sw = 22 * s;
  var shTop = hcy + ry + 1.5 * s;
  var crown, brim;

  ctx.moveTo(cx - sw, base + 14);
  ctx.lineTo(cx - sw - lean * 0.3, base - 7 * s);
  ctx.quadraticCurveTo(cx - sw * 0.84, shTop + 1.5 * s, hx - rx * 1.05, shTop);
  ctx.quadraticCurveTo(hx, shTop - 4.6 * s, hx + rx * 1.05, shTop);
  ctx.quadraticCurveTo(cx + sw * 0.84, shTop + 1.5 * s, cx + sw - lean * 0.3, base - 7 * s);
  ctx.lineTo(cx + sw, base + 14);
  ctx.closePath();

  ctx.moveTo(hx + rx, hcy);
  ctx.ellipse(hx, hcy, rx, ry, 0, 0, Math.PI * 2);
  ctx.closePath();

  if (hat === 1) {
    crown = bankSpan(rng, 15, 19) * s;
    brim = rx * 1.62;
    ctx.moveTo(hx - rx * 0.94, headTop + 2);
    ctx.lineTo(hx - rx * 1.04, headTop - crown);
    ctx.lineTo(hx + rx * 1.04, headTop - crown);
    ctx.lineTo(hx + rx * 0.94, headTop + 2);
    ctx.closePath();
    ctx.moveTo(hx + brim, headTop + 1);
    ctx.ellipse(hx, headTop + 1, brim, 2.9 * s, 0, 0, Math.PI * 2);
    ctx.closePath();
    det.push([hx - rx * 1.02, headTop - 5.5 * s, rx * 2.04, 3.4 * s]);
  } else if (hat === 2) {
    crown = 8.4 * s;
    brim = rx * 1.44;
    ctx.moveTo(hx - rx * 0.98, headTop + 2);
    ctx.quadraticCurveTo(hx, headTop - crown * 2.1, hx + rx * 0.98, headTop + 2);
    ctx.closePath();
    ctx.moveTo(hx + brim, headTop + 2.5);
    ctx.ellipse(hx, headTop + 2.5, brim, 2.5 * s, 0, 0, Math.PI * 2);
    ctx.closePath();
    det.push([hx - rx * 0.9, headTop - 1.4 * s, rx * 1.8, 2.6 * s]);
  }

  det.push([hx - 4.6 * s, hcy + ry - 1.5 * s, 9.2 * s, 7 * s]);
  det.push([cx - 1.2 * s, shTop + 3 * s, 2.4 * s, base - shTop - 3 * s]);
  det.push([cx - sw * 0.66, shTop + 6 * s, sw * 0.2, base - shTop - 6 * s]);
  det.push([cx + sw * 0.46, shTop + 6 * s, sw * 0.2, base - shTop - 6 * s]);
}

/* The things left standing on the counter: ledgers, a balance, a lamp. They
   belong to the near layer, so they cut in front of the clerks. */

function bankLedgers(ctx, x, y, w, det) {
  var leaves = 3;
  var i, t, lw;
  for (i = 0; i < leaves; i += 1) {
    t = y - 5.5 * (i + 1);
    lw = w - i * 4;
    ctx.rect(x + i * 2, t, lw, 5.5);
    det.push([x + i * 2 + 1.6, t + 1.4, lw - 3.2, 1]);
  }
}

function bankOpenBook(ctx, x, y, w, det) {
  var half = w / 2;
  ctx.moveTo(x, y);
  ctx.lineTo(x + 2.5, y - 9);
  ctx.lineTo(x + half, y - 4.5);
  ctx.lineTo(x + half, y);
  ctx.closePath();
  ctx.moveTo(x + half, y);
  ctx.lineTo(x + half, y - 4.5);
  ctx.lineTo(x + w - 2.5, y - 9);
  ctx.lineTo(x + w, y);
  ctx.closePath();
  det.push([x + 4, y - 6.5, half - 5, 0.9]);
  det.push([x + half + 1, y - 6.5, half - 5, 0.9]);
  det.push([x + half - 0.6, y - 5, 1.2, 5]);
}

function bankScale(ctx, cx, y, det) {
  var beam = 30;
  var post = 22;
  var top = y - post;
  var i, px;
  ctx.rect(cx - 6, y - 2.6, 12, 2.6);
  ctx.rect(cx - 2, top, 4, post);
  ctx.rect(cx - beam / 2, top - 1.6, beam, 2.2);
  for (i = 0; i < 2; i += 1) {
    px = cx + (i === 0 ? -beam / 2 + 1 : beam / 2 - 3);
    ctx.rect(px + 0.6, top, 0.9, 7);
    ctx.moveTo(px - 3.4, top + 7);
    ctx.lineTo(px + 5.4, top + 7);
    ctx.lineTo(px + 3.6, top + 10.4);
    ctx.lineTo(px - 1.6, top + 10.4);
    ctx.closePath();
  }
  det.push([cx - 1, top + 2, 2, post - 4]);
}

function bankLamp(ctx, cx, y, det) {
  var stem = 20;
  var top = y - stem;
  ctx.rect(cx - 7, y - 2.4, 14, 2.4);
  ctx.rect(cx - 1.8, top, 3.6, stem);
  ctx.moveTo(cx - 11, top);
  ctx.lineTo(cx - 6, top - 8.5);
  ctx.lineTo(cx + 6, top - 8.5);
  ctx.lineTo(cx + 11, top);
  ctx.closePath();
  det.push([cx - 9.5, top - 2.4, 19, 1.4]);
}

/* One rank of clerks. Far rank darker and shorter, near rank lighter and
   carrying the counter furniture and the hatching. */

function bankRank(ctx, rng, layer, W, H, hatch) {
  var det = [];
  var x = bankSpan(rng, 34, 68);
  var n = 0;
  var h, s, hat, lean, cx;
  ctx.save();
  ctx.beginPath();
  while (x < W - 30 && n < layer.max) {
    s = bankSpan(rng, layer.sMin, layer.sMax);
    h = bankSpan(rng, layer.hMin, layer.hMax);
    hat = rng() < layer.hatOdds ? bankInt(rng, 1, 2) : 0;
    lean = bankSpan(rng, -5.5, 5.5) * s;
    cx = x + 22 * s;
    bankFigure(ctx, rng, cx, layer.base, h, s, hat, lean, det);
    x = cx + bankSpan(rng, layer.gapMin, layer.gapMax);
    n += 1;
  }
  if (layer.props) { layer.props(ctx, rng, det); }
  ctx.fillStyle = layer.fill;
  ctx.fill();
  ctx.clip();
  if (hatch) { bankHatch(ctx, W, H, 4, 0.5); }
  ctx.fillStyle = layer.dark;
  for (n = 0; n < det.length; n += 1) {
    ctx.fillRect(det[n][0], det[n][1], det[n][2], det[n][3]);
  }
  ctx.restore();
}

/* The counter itself, the nearest plane, with its panelled front. */

function bankCounter(ctx, W, H, y) {
  var i, panels, pitch;
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, y, W, H - y);
  ctx.fillStyle = "#5A5348";
  ctx.fill();
  ctx.clip();
  bankHatch(ctx, W, H, 5, 0.42);

  ctx.fillStyle = "#3D372F";
  ctx.fillRect(0, y + 7, W, 2.2);
  panels = 14;
  pitch = W / panels;
  for (i = 0; i < panels; i += 1) {
    ctx.fillRect(pitch * i + pitch * 0.12, y + 15, pitch * 0.76, H - y - 22);
    ctx.fillRect(pitch * i, y + 9, 2.4, H - y - 9);
  }
  ctx.restore();

  ctx.fillStyle = "rgba(216, 208, 190, 0.16)";
  ctx.fillRect(0, y, W, 1.4);
  var sh = ctx.createLinearGradient(0, y - 18, 0, y + 2);
  sh.addColorStop(0, "rgba(16, 12, 8, 0)");
  sh.addColorStop(1, "rgba(16, 12, 8, 0.55)");
  ctx.fillStyle = sh;
  ctx.fillRect(0, y - 18, W, 20);
}

/* The vignette edge: the plate fades to nothing at the sides, the way a
   banknote cartouche does, and closes on two hairlines. */

function bankScrim(ctx, W, H) {
  var left = ctx.createLinearGradient(0, 0, W * 0.2, 0);
  left.addColorStop(0, "rgba(16, 12, 8, 0.96)");
  left.addColorStop(1, "rgba(16, 12, 8, 0)");
  ctx.fillStyle = left;
  ctx.fillRect(0, 0, W * 0.2, H);

  var right = ctx.createLinearGradient(W, 0, W * 0.8, 0);
  right.addColorStop(0, "rgba(16, 12, 8, 0.96)");
  right.addColorStop(1, "rgba(16, 12, 8, 0)");
  ctx.fillStyle = right;
  ctx.fillRect(W * 0.8, 0, W * 0.2, H);

  var top = ctx.createLinearGradient(0, 0, 0, 40);
  top.addColorStop(0, "rgba(16, 12, 8, 0.9)");
  top.addColorStop(1, "rgba(16, 12, 8, 0)");
  ctx.fillStyle = top;
  ctx.fillRect(0, 0, W, 40);

  var foot = ctx.createLinearGradient(0, H - 26, 0, H);
  foot.addColorStop(0, "rgba(16, 12, 8, 0)");
  foot.addColorStop(1, "rgba(16, 12, 8, 0.78)");
  ctx.fillStyle = foot;
  ctx.fillRect(0, H - 26, W, 26);

  ctx.fillStyle = "rgba(74, 64, 52, 0.7)";
  ctx.fillRect(0, 0, W, 1);
  ctx.fillRect(0, H - 1, W, 1);
}

function drawBankers(canvas) {
  var W = 1176, H = 200, S = 2;
  var counter = 150;
  var i;
  canvas.width = W * S;
  canvas.height = H * S;
  /* The stylesheet takes the vignette fluid below the desktop sheet width,
     and an inline size would beat it. */
  if (window.innerWidth > 1287) {
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
  } else {
    canvas.style.width = "100%";
    canvas.style.height = "120px";
  }
  var ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(S, S);

  var rng = bankRng(BANK_SEED);

  bankGround(ctx, W, H);
  bankArcade(ctx, rng, W, 14, counter + 4);

  var ranks = [
    {
      base: counter + 2, hMin: 62, hMax: 82, sMin: 0.82, sMax: 0.96,
      gapMin: 118, gapMax: 176, hatOdds: 0.5, max: 5,
      fill: "#2E2B26", dark: "#201E1A", props: null
    },
    {
      base: counter + 2, hMin: 76, hMax: 104, sMin: 0.98, sMax: 1.16,
      gapMin: 152, gapMax: 214, hatOdds: 0.72, max: 5,
      fill: "#433E35", dark: "#2E2A24",
      props: function (c, r, det) {
        bankLedgers(c, 196, counter, 34, det);
        bankOpenBook(c, 402, counter, 46, det);
        bankScale(c, 606, counter, det);
        bankLedgers(c, 742, counter, 28, det);
        bankLamp(c, 928, counter, det);
      }
    }
  ];

  for (i = 0; i < ranks.length; i += 1) {
    bankRank(ctx, rng, ranks[i], W, H, i === ranks.length - 1);
  }

  bankCounter(ctx, W, H, counter);
  bankHatch(ctx, W, H, 9, 0.14);
  bankScrim(ctx, W, H);
  ctx.restore();
}

var bankEl = document.getElementById("bankersCanvas");
if (bankEl) { drawBankers(bankEl); }
```
