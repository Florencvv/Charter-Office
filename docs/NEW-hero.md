# Hero banner

## 1. HTML

```html
<div class="heroWrap">
  <canvas id="heroCanvas" class="heroCanvas" width="2352" height="600" role="img" aria-label="An engraved night skyline of monumental bank architecture"></canvas>
  <div class="heroPlate">
    <h1 class="heroName titling">The Charter Office</h1>
    <p class="heroLine">The protocol issues licenses. This office issues the paper.</p>
  </div>
  <p class="heroSig caps">built by <a href="https://x.com/flxrnc" rel="noopener">@flxrnc</a></p>
</div>
```

## 2. CSS

```css
.heroWrap { position: relative; width: 1176px; height: 300px; margin: 0 auto 56px; }
.heroCanvas { display: block; width: 1176px; height: 300px; }

.heroPlate { position: absolute; left: 52px; top: 74px; width: 660px; }
.heroName {
  font-family: Didot, "Didot LT Std", "Bodoni 72", "Bodoni MT", "Hoefler Text", Constantia, Georgia, "Times New Roman", serif;
  font-weight: 400;
  font-size: 58px;
  line-height: 60px;
  margin: 0 0 14px;
  color: #F0EBDF;
}
.heroLine { font-size: 19px; line-height: 30px; margin: 0; color: #D9D3C7; }

.heroSig {
  position: absolute;
  right: 24px;
  bottom: 18px;
  margin: 0;
  font-family: Copperplate, "Copperplate Gothic Light", "Engravers MT", "Perpetua Titling MT", Optima, Candara, "Gill Sans MT", "Trebuchet MS", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 10px;
  line-height: 16px;
  color: #A89C89;
}
.heroSig a { color: #A89C89; border-bottom: 1px solid #4A4034; }
.heroSig a:hover { color: #D9D3C7; border-bottom-color: #A89C89; }
```

## 3. JS

```js
/* ============================================================== hero banner
   A night elevation of the financial district, cut from one fixed seed. No
   clock, no Math.random: the same skyline on every load, on every machine. */

var HERO_SEED = "the charter office, night elevation, plate one";

function heroRng(seed) {
  var s = xmur3(seed);
  return sfc32(s(), s(), s(), s());
}

function heroSpan(rng, lo, hi) { return lo + (hi - lo) * rng(); }

function heroInt(rng, lo, hi) { return Math.floor(heroSpan(rng, lo, hi + 1)); }

function heroGround(ctx, W, H) {
  var grd = ctx.createLinearGradient(0, 0, 0, H);
  grd.addColorStop(0, "#0F0C08");
  grd.addColorStop(0.58, "#14100C");
  grd.addColorStop(1, "#1A140D");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);
}

function heroHaze(ctx, W, H, y) {
  var grd = ctx.createLinearGradient(0, y - 58, 0, y + 16);
  grd.addColorStop(0, "rgba(168, 156, 137, 0)");
  grd.addColorStop(0.72, "rgba(168, 156, 137, 0.13)");
  grd.addColorStop(1, "rgba(168, 156, 137, 0)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, y - 58, W, 74);
}

/* Each block adds subpaths to one accumulated path, and pushes its dark
   detail rectangles onto det. Nothing is stroked here: the silhouette is
   filled once per layer, then the details are laid inside the clip. */

function heroSlab(ctx, rng, x, w, top, base, det) {
  ctx.rect(x, top, w, base - top);
  ctx.rect(x - 3, top - 5, w + 6, 6);
  var slots = Math.max(2, Math.floor(w / 12));
  var pitch = w / slots;
  var sw = Math.min(3.2, pitch * 0.36);
  for (var i = 0; i < slots; i += 1) {
    det.push([x + pitch * i + (pitch - sw) / 2, top + 13, sw, Math.max(6, base - top - 20)]);
  }
  det.push([x, top + 7, w, 1.6]);
}

function heroPortico(ctx, rng, x, w, top, base, det) {
  var ped = Math.min(38, w * 0.34);
  var bodyTop = top + ped;
  ctx.rect(x, bodyTop, w, base - bodyTop);
  ctx.moveTo(x - 7, bodyTop + 2);
  ctx.lineTo(x + w / 2, top);
  ctx.lineTo(x + w + 7, bodyTop + 2);
  ctx.closePath();
  ctx.rect(x - 7, bodyTop, w + 14, 8);
  ctx.rect(x - 10, base - 7, w + 20, 8);
  var n = heroInt(rng, 4, 8);
  var pitch = w / n;
  var colTop = bodyTop + 12;
  var colBase = base - 9;
  for (var i = 0; i < n; i += 1) {
    det.push([x + pitch * i + pitch * 0.52, colTop, pitch * 0.44, colBase - colTop]);
  }
  det.push([x + 3, bodyTop + 9, w - 6, 1.6]);
}

function heroDome(ctx, rng, x, w, top, base, det) {
  var cx = x + w / 2;
  var r = w * 0.30;
  var cy = top + 13 + r;
  var i;
  ctx.rect(cx - 1.6, top, 3.2, 14);
  ctx.moveTo(cx - r, cy);
  ctx.arc(cx, cy, r, Math.PI, Math.PI * 2);
  ctx.closePath();
  ctx.rect(cx - r * 1.12, cy, r * 2.24, 13);
  ctx.rect(x, cy + 11, w, base - cy - 11);
  var ribs = 7;
  for (i = 1; i < ribs; i += 1) {
    var a = Math.PI + (Math.PI * i) / ribs;
    det.push([cx + Math.cos(a) * r * 0.92 - 0.7, cy - r, 1.4, r]);
  }
  det.push([cx - r * 1.12, cy + 10, r * 2.24, 2]);
  var slots = Math.max(3, Math.floor(w / 14));
  var pitch = w / slots;
  for (i = 0; i < slots; i += 1) {
    det.push([x + pitch * i + pitch * 0.36, cy + 19, pitch * 0.28, Math.max(6, base - cy - 27)]);
  }
}

function heroTower(ctx, rng, x, w, top, base, det) {
  var cx = x + w / 2;
  var spire = 26;
  var w1 = w * 0.44;
  var w2 = w * 0.72;
  var t1 = top + spire;
  var t2 = t1 + (base - t1) * 0.30;
  var t3 = t2 + (base - t2) * 0.44;
  ctx.moveTo(cx - w1 * 0.30, t1 + 3);
  ctx.lineTo(cx, top);
  ctx.lineTo(cx + w1 * 0.30, t1 + 3);
  ctx.closePath();
  ctx.rect(cx - w1 / 2, t1, w1, base - t1);
  ctx.rect(cx - w1 * 0.62, t1, w1 * 1.24, 6);
  ctx.rect(cx - w2 / 2, t2, w2, base - t2);
  ctx.rect(cx - w2 * 0.55, t2, w2 * 1.1, 6);
  ctx.rect(x, t3, w, base - t3);
  ctx.rect(x - 4, t3, w + 8, 6);
  var face = Math.min(11, w1 * 0.42);
  det.push([cx - face / 2, t1 + 14, face, face]);
  var slots = Math.max(3, Math.floor(w / 13));
  var pitch = w / slots;
  for (var i = 0; i < slots; i += 1) {
    det.push([x + pitch * i + pitch * 0.34, t3 + 10, pitch * 0.3, Math.max(6, base - t3 - 17)]);
  }
  det.push([cx - w2 / 2 + 3, t2 + 12, w2 - 6, 1.6]);
}

/* Burin work. One diagonal set for the shadow, one flat set for the tooth of
   the plate. Called inside the near layer clip, so it never touches the sky. */

function heroHatch(ctx, W, H) {
  var d, y;
  ctx.lineWidth = 0.6;
  ctx.strokeStyle = "rgba(16, 12, 8, 0.55)";
  ctx.beginPath();
  for (d = -H; d < W + H; d += 4) {
    ctx.moveTo(d, H);
    ctx.lineTo(d + H, 0);
  }
  ctx.stroke();
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "rgba(216, 208, 190, 0.05)";
  ctx.beginPath();
  for (y = 0; y < H; y += 5) {
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(W, y + 0.5);
  }
  ctx.stroke();
}

function heroSkyline(ctx, rng, layer, W, H, hatch) {
  var det = [];
  var x = heroSpan(rng, -30, -8);
  var i, w, h, top, k;
  ctx.save();
  ctx.beginPath();
  while (x < W + 24) {
    w = heroSpan(rng, layer.wMin, layer.wMax);
    h = heroSpan(rng, layer.hMin, layer.hMax);
    if (rng() < 0.2) { h *= 0.58; }
    top = layer.base - h;
    k = rng();
    if (k < 0.40) { heroSlab(ctx, rng, x, w, top, layer.base, det); }
    else if (k < 0.64) { heroPortico(ctx, rng, x, w, top, layer.base, det); }
    else if (k < 0.82) { heroDome(ctx, rng, x, w, top, layer.base, det); }
    else {
      top -= h * 0.22;
      heroTower(ctx, rng, x, w, top, layer.base, det);
    }
    x += w - heroSpan(rng, 1, 9);
  }
  ctx.fillStyle = layer.fill;
  ctx.fill();
  ctx.clip();
  if (hatch) { heroHatch(ctx, W, H); }
  ctx.fillStyle = layer.dark;
  for (i = 0; i < det.length; i += 1) {
    ctx.fillRect(det[i][0], det[i][1], det[i][2], det[i][3]);
  }
  ctx.restore();
}

function heroScrim(ctx, W, H) {
  var left = ctx.createLinearGradient(0, 0, W * 0.66, 0);
  left.addColorStop(0, "rgba(13, 10, 7, 0.82)");
  left.addColorStop(0.55, "rgba(13, 10, 7, 0.34)");
  left.addColorStop(1, "rgba(13, 10, 7, 0)");
  ctx.fillStyle = left;
  ctx.fillRect(0, 0, W, H);

  var foot = ctx.createLinearGradient(0, H - 76, 0, H);
  foot.addColorStop(0, "rgba(13, 10, 7, 0)");
  foot.addColorStop(1, "rgba(13, 10, 7, 0.72)");
  ctx.fillStyle = foot;
  ctx.fillRect(0, H - 76, W, 76);

  ctx.fillStyle = "rgba(74, 64, 52, 0.75)";
  ctx.fillRect(0, 0, W, 1);
  ctx.fillRect(0, H - 1, W, 1);
}

function drawHero(canvas) {
  var W = 1176, H = 300, S = 2;
  var i;
  canvas.width = W * S;
  canvas.height = H * S;
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  var ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(S, S);

  var rng = heroRng(HERO_SEED);

  /* Four ranks of building, the far rank darkest, each one in front of it a
     shade lighter and standing on a lower base line. */
  var layers = [
    { base: 258, hMin: 62, hMax: 146, wMin: 26, wMax: 66, fill: "#221B13", dark: "#181209" },
    { base: 272, hMin: 66, hMax: 172, wMin: 32, wMax: 84, fill: "#2C231A", dark: "#1E1710" },
    { base: 288, hMin: 64, hMax: 192, wMin: 40, wMax: 102, fill: "#392E21", dark: "#271F16" },
    { base: 304, hMin: 58, hMax: 208, wMin: 52, wMax: 128, fill: "#423528", dark: "#2C2219" }
  ];

  heroGround(ctx, W, H);
  for (i = 0; i < layers.length; i += 1) {
    if (i === 2) { heroHaze(ctx, W, H, 250); }
    heroSkyline(ctx, rng, layers[i], W, H, i === layers.length - 1);
  }
  heroScrim(ctx, W, H);
  ctx.restore();
}

var heroEl = document.getElementById("heroCanvas");
if (heroEl) { drawHero(heroEl); }
```
