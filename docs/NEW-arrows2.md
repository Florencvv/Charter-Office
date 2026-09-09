# Arrow cues, redrawn

Three decorative cues. Each is one continuous shaft path plus one head path whose
two short strokes both terminate on the shaft's exact endpoint, at the shaft's own
exit angle, so the head reads as part of the same gesture. Still wobbly by hand,
still thin, still decoration only.

```html
<span class="arrowCue arrowStart" aria-hidden="true">
  <svg width="120" height="80" viewBox="0 0 120 80">
    <path class="arrowShaft" d="M 10 15 C 27 6 51 13 67 30 C 76 40 82 52 92 60 C 98 65 104 69 110 72"></path>
    <path class="arrowHead" d="M 102 62 Q 105 67 110 72 Q 103 74 96 72"></path>
  </svg>
  <span class="arrowNote">start here</span>
</span>

<span class="arrowCue arrowThen" aria-hidden="true">
  <svg width="96" height="66" viewBox="0 0 96 66">
    <path class="arrowShaft" d="M 86 12 C 72 9 56 16 44 28 C 36 36 27 45 20 56"></path>
    <path class="arrowHead" d="M 31 49 Q 26 53 20 56 Q 22 50 22 44"></path>
  </svg>
  <span class="arrowNote">then this</span>
</span>

<span class="arrowCue arrowNudge" aria-hidden="true">
  <span class="arrowNote">then post it</span>
  <svg width="48" height="22" viewBox="0 0 48 22">
    <path class="arrowShaft" d="M 5 18 C 13 14 22 10 31 8 C 35 7 39 8 43 11"></path>
    <path class="arrowHead" d="M 40 3 Q 42 7 43 11 Q 38 13 34 12"></path>
  </svg>
</span>
```

Each span replaces the existing span of the same class, whole: the arrowStart span after the three step cards (index.html around line 646), the arrowThen span after the card legend (around line 703), and the arrowNudge span after the examStart button (around line 751).

```css
.arrowCue { pointer-events: none; }
.arrowCue svg { display: block; overflow: visible; }
.arrowCue path {
  fill: none;
  stroke: #F4F0E6;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.9;
}
.arrowCue .arrowHead { stroke-width: 1.5; }
.arrowNote {
  font-family: Copperplate, "Copperplate Gothic Light", "Engravers MT", Optima, Candara, "Gill Sans MT", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 10px;
  line-height: 14px;
  white-space: nowrap;
  color: #F4F0E6;
  opacity: 0.8;
}

.arrowStart {
  position: absolute;
  top: -44px;
  right: 100%;
  margin-right: 14px;
}
.arrowStart .arrowNote { position: absolute; left: 0; bottom: 1px; }

.arrowThen { position: absolute; top: 100%; left: 252px; }
.arrowThen .arrowNote { position: absolute; top: 4px; left: 100%; margin-left: 18px; }

.arrowNudge { display: inline-flex; align-items: center; gap: 14px; }
```
