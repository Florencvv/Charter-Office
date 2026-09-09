# A2 polish pass

Two blocks below. The CSS block appends to the end of the existing `<style>` block, after the
`@media (prefers-reduced-motion: reduce)` rule. The HTML block holds four fragments; the plain
uppercase `PLACE:` lines are notes for the integrator, not markup, and are not pasted in.

Nothing here adds animation, transition, gradient, radius or shadow. All prefixed `a2`, except
`cardlet`, which is the shared name asked for.

One note on the plate. `renderScreen` writes `cv.style.width = "1008px"` inline, so the stage
sizes the canvas with `!important` to fit inside its 14px mat. If whoever owns the engine prefers
it clean, set `var SCREEN_W = 976;` (line 1770) and the two `!important` flags can come off.

```css
/* A2 visual richness pass. Appended to the end of the style block. */

/* 1. How this works */
.a2steps { display: flex; gap: 36px; margin: 0; }
.a2step { flex: 1; display: flex; gap: 14px; border-top: 2px solid #4A4034; padding: 14px 0 0; }
.a2step .a2n { flex: none; width: 24px; font-size: 27px; line-height: 27px; color: #A63A1C; }
.a2step .a2body { flex: 1; }
.a2step .a2lab { font-size: 11px; line-height: 18px; color: #E2DCC8; margin: 0 0 6px; }
.a2step .a2say { font-size: 15px; line-height: 23px; color: #A89C89; margin: 0; }

/* 2. Section headers */
.a2head { border-top: 1px solid #4A4034; padding: 16px 0 0; margin: 0 0 24px; }
.a2head .a2kick { font-size: 11px; line-height: 18px; color: #A89C89; margin: 0 0 10px; }
.a2head h2 { font-size: 26px; line-height: 32px; margin: 0 0 12px; color: #F0EBDF; }
.a2head .a2under { width: 56px; height: 2px; background: #A63A1C; }

/* 3. The certificate stage */
.a2stage { margin: 28px 0 0; background: #241C14; border: 1px solid #4A4034; padding: 14px; }
.a2mat { border: 1px solid #4A4034; background: #1C1712; line-height: 0; }
.a2stage canvas#card { display: block; width: 976px !important; height: 549px !important; }
.a2cap {
  display: flex; justify-content: space-between; align-items: baseline;
  border-top: 1px solid #4A4034; margin: 14px 0 0; padding: 10px 2px 0;
  font-size: 11px; line-height: 18px; color: #A89C89;
}
.a2cap .a2capR { color: #D9D3C7; }

/* 4. Controls. The paper button carries a LEDGER lip under it and swaps the
   red rule to the bottom edge on press, so it reads as a key going down. */
button.paper { border-bottom: 2px solid #4A4034; }
button.paper:hover:enabled { background: #F0EBDF; }
button.paper:active:enabled {
  background: #D9D3C7;
  border-top-color: #4A4034;
  border-bottom-color: #A63A1C;
}
button.quiet:hover:enabled { background: #4A4034; border-color: #D9D3C7; }
button.quiet:active:enabled { background: #241C14; border-color: #A63A1C; color: #F0EBDF; }
.deskrow input[type=text] { border-bottom: 2px solid #4A4034; }
.deskrow input[type=text]:hover { background: #F0EBDF; }

/* 5. cardlet, the shared small panel */
.cardlet { background: #241C14; border: 1px solid #4A4034; padding: 14px 16px; }
.cardlet.a2paper { background: #E2DCC8; border-color: #A89C89; color: #241C14; }
.cardlet .a2ct { font-size: 11px; line-height: 18px; color: #A89C89; margin: 0 0 10px; }
.cardlet.a2paper .a2ct { color: #4A4034; }
.cardlet p { font-size: 15px; line-height: 24px; margin: 0 0 10px; }
.cardlet p:last-child { margin: 0; }
.cardlet a { color: inherit; }
.cardlet .a2foot {
  display: flex; justify-content: space-between; align-items: baseline;
  border-top: 1px solid #4A4034; margin: 12px 0 0; padding: 10px 0 0;
  font-size: 11px; line-height: 18px; color: #A89C89;
}
.cardlet.a2paper .a2foot { border-top-color: #A89C89; color: #4A4034; }
.cardlet textarea {
  width: 100%; box-sizing: border-box; resize: none; border: 0; border-radius: 0;
  border-bottom: 2px solid #A89C89; padding: 12px 14px;
  font: 15px/24px "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif;
  color: #241C14; background: #E2DCC8;
}
.cardlet textarea:hover { background: #F0EBDF; }

/* 6. Footer, tightened */
footer .cols { gap: 36px; margin: 0 0 20px; }
footer ul { width: 320px; }
footer li { margin: 0 0 4px; }
footer p { margin: 0 0 10px; }
footer a { border-bottom-color: #4A4034; }
footer a:hover { border-bottom-color: #A89C89; }
footer p.last {
  border-left: 2px solid #A63A1C;
  padding: 0 0 0 12px;
  margin: 16px 0 0;
  color: #D9D3C7;
}
```

```html
PLACE: a whole new block. Goes straight after the closing div of the title block
PLACE: (the one holding h1.office) and before the hr.score that follows it.
<hr class="score">

<div class="block">
  <div class="rail"><p class="railLabel caps">How this works</p></div>
  <div class="main">
    <div class="a2steps">
      <div class="a2step">
        <span class="a2n titling">1</span>
        <div class="a2body">
          <p class="a2lab caps">Issue paper</p>
          <p class="a2say">Type any name. The plate is engraved on this machine, in the browser.</p>
        </div>
      </div>
      <div class="a2step">
        <span class="a2n titling">2</span>
        <div class="a2body">
          <p class="a2lab caps">Sit examination</p>
          <p class="a2say">Seven questions, optional. They change the stamp, not the paper.</p>
        </div>
      </div>
      <div class="a2step">
        <span class="a2n titling">3</span>
        <div class="a2body">
          <p class="a2lab caps">Post it</p>
          <p class="a2say">Take the PNG, or copy the link. The same name always cuts the same card.</p>
        </div>
      </div>
    </div>
  </div>
</div>

PLACE: the section header. One per section. Replaces the h2 at the top of a .main
PLACE: column, and takes the rail label with it, so empty that section's .rail and
PLACE: drop the hr.score sitting above it. Shown here for Issuance; repeat with the
PLACE: kicker and title of each other section.
<div class="a2head">
  <p class="a2kick caps">Window one</p>
  <h2 class="titling">Issuance</h2>
  <div class="a2under"></div>
</div>

PLACE: the certificate stage. Replaces the whole div.plate, id and hidden intact.
<div class="a2stage" id="platebox" hidden>
  <div class="a2mat">
    <canvas id="card" width="1008" height="567" role="img" aria-label="An engraved commemorative charter certificate"></canvas>
  </div>
  <div class="a2cap">
    <span class="a2capL caps">Cut on this machine</span>
    <span class="a2capR caps" id="plateCap"></span>
  </div>
</div>

PLACE: cardlet, for whoever is building the composer and the result panel. Two
PLACE: faces, dark and paper. Both take an optional a2ct head and an a2foot strip.
<div class="cardlet">
  <p class="a2ct caps">Result</p>
  <p>Body text sits here.</p>
  <div class="a2foot"><span class="caps">Left note</span><span class="caps">Right note</span></div>
</div>

<div class="cardlet a2paper">
  <p class="a2ct caps">Compose</p>
  <textarea rows="4"></textarea>
  <div class="a2foot"><span class="caps">Left note</span><span class="caps">Right note</span></div>
</div>
```
