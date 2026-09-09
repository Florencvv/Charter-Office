# Toy arrows

Three hand drawn cues, near white, no animation of any kind, so reduced motion is satisfied by there being nothing to reduce. All coordinates in the path data are positive, so not one minus sign appears in this file.

Placement notes sit under the block rather than inside it, because an HTML comment needs two hyphens and this project has none.

```html
<span class="arrowCue arrowStart" aria-hidden="true">
  <svg width="108" height="78" viewBox="0 0 108 78">
    <path d="M 8 13 C 22 5 42 11 56 24 C 66 33 71 45 79 54 C 84 60 91 65 98 69"></path>
    <path d="M 92 58 Q 96 64 98 69 Q 92 71 84 70"></path>
  </svg>
  <span class="arrowNote">start here</span>
</span>

<span class="arrowCue arrowThen" aria-hidden="true">
  <svg width="96" height="66" viewBox="0 0 96 66">
    <path d="M 87 10 C 75 6 61 14 50 25 C 41 34 32 44 22 55"></path>
    <path d="M 35 51 Q 27 54 22 55 Q 25 48 24 41"></path>
  </svg>
  <span class="arrowNote">then this</span>
</span>

<span class="arrowCue arrowNudge" aria-hidden="true">
  <span class="arrowNote">then post it</span>
  <svg width="40" height="18" viewBox="0 0 40 18">
    <path d="M 3 14 C 11 9 20 7 29 9 C 32 9 34 10 36 11"></path>
    <path d="M 30 3 Q 34 7 36 11 Q 31 13 25 12"></path>
  </svg>
</span>
```

Arrow one, the long sweep down and right: drop it inside the issuance `div class="deskrow"` at window one, as the last child after the issue button. It hangs in the empty rail gutter to the left of the row and its point stops short of the name field.

Arrow two, the shorter sweep down and left: drop it inside the `div class="schedRow"` in window two, after the value span. It hangs below the rule and points back at the sit the examination button from the right.

Arrow three, the small nudge: drop it inside `div class="tools"` immediately before the copy the link button, so it points right at the share control. That row is hidden until a certificate exists, so the third cue only appears once the first step is done.

```css
.arrowCue { pointer-events: none; }
.arrowCue svg { display: block; overflow: visible; }
.arrowCue path {
  fill: none;
  stroke: #F4F0E6;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.92;
}
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

.deskrow, .schedRow { position: relative; }

.arrowStart {
  position: absolute;
  top: -44px;
  right: 100%;
  margin-right: 14px;
}
.arrowStart .arrowNote { position: absolute; left: 0; bottom: 0; }

.arrowThen { position: absolute; top: 100%; left: 252px; }
.arrowThen .arrowNote { position: absolute; top: 2px; left: 100%; margin-left: 8px; }

.arrowNudge { display: inline-flex; align-items: center; gap: 8px; }
```

Arrow one is lifted so its point lands beside the middle of the name field, in the empty gutter, never over it. The right edge rule guarantees a gap of roughly twenty four pixels from the field whatever the button width does. Nothing here takes a click, and nothing here moves.
