# NEW-nav. The counter rail across the top.

B1. A fixed top bar for The Charter Office. Desktop only, no animation, no
transitions, no two consecutive hyphens anywhere in this file or in what it
ships.

## Why top and not left

Decided before drafting. The page is a fixed 1288 wide desktop layout and the
left 132px is already the rail that carries the window labels. A second left
column would be two rails arguing. The bar goes across the top, its inner row
locked to the 1176px sheet so the office name sits directly above "Window one"
and the whole thing reads as one ruled sheet.

The bar's real job is not navigation. It is that the word UNOFFICIAL is on
screen at every scroll position, in NUMBER, next to the office name. A visitor
who lands mid page, screenshots the certificate, or arrives from a link now
cannot see this office without seeing the disclaimer. The four links are the
excuse for the bar. The disclaimer is the reason for it.

## What the parent must attach

Section ids I expect to exist, exactly these three:

| id | element | state |
| :- | :- | :- |
| `issuance` | the Window one block, the certificate generator | exists as a `div.block`, needs the id |
| `examination` | the Window two block | exists as a `div.block`, needs the id |
| `post` | the tweet composer block | not in index.html yet, another agent is building it |

Each of those three blocks also takes `class="block navAnchor"`. `navAnchor`
carries `scroll-margin-top` so an anchor jump lands 28px clear of the bar
instead of underneath it.

Two more edits outside the three blocks below.

1. `<div class="sheet">` becomes `<div class="sheet" id="navMain" tabindex="-1">`.
   That is the skip link's target. The `tabindex` is what makes focus actually
   move rather than only the scroll position.

2. **Body padding.** The bar is 48px tall in total: 13px top padding, a 22px
   row, 12px bottom padding, 1px hairline. Body currently reads
   `padding: 48px 0 120px`. It becomes `padding: 96px 0 120px`. That is the
   original 48 plus the bar's 48, so the first line of the page sits exactly
   where it sits today and the bar covers nothing.

`#navExamine` is a `button`, not an anchor. It navigates nowhere, it opens the
examination modal another agent is building, and a button is the element that
means that. It is keyboard reachable and focus visible for free. **The parent
attaches the handler**, something like
`document.getElementById("navExamine").addEventListener("click", openExam)`.
Until that handler exists the button is inert and jumps nowhere, which is the
correct failure.

If the modal is layered, give it a z-index above 20. The bar sits at 20.

## HTML

Goes first inside `<body>`, before `<div class="sheet">`. The skip link is the
first focusable element on the page.

```html
<nav class="navBar" aria-label="Office sections">
  <a class="navSkip caps" href="#navMain">Skip to the counter</a>
  <div class="navInner">
    <p class="navMark caps">The Charter Office <span>Unofficial</span></p>
    <div class="navSet">
      <a class="navLink caps" id="navIssue" href="#issuance">Issue</a>
      <button class="navLink caps" id="navExamine" type="button">Examine</button>
      <a class="navLink caps" id="navPost" href="#post">Post</a>
      <a class="navLink caps" href="https://www.standardreserve.xyz/whitepaper/">Whitepaper</a>
    </div>
    <a class="navMe" href="https://x.com/flxrnc">@flxrnc</a>
  </div>
</nav>
```

## CSS

Appended to the existing `<style>`. 43 lines. It reuses the sheet's `.caps`
stack and the existing `a:focus-visible, button:focus-visible` outline rather
than restating either, so the bar cannot drift from the page.

```css
.navBar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  min-width: 1288px;
  background: #1C1712;
  border-bottom: 1px solid #4A4034;
  padding: 13px 0 12px;
}
.navInner {
  width: 1176px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 56px;
}
.navMark {
  font-size: 11px;
  line-height: 18px;
  color: #D9D3C7;
  white-space: nowrap;
  margin: 0;
}
.navMark span { color: #A63A1C; margin-left: 14px; }
.navSet { display: flex; gap: 28px; flex: 1; }
.navLink {
  font-size: 11px;
  line-height: 18px;
  color: #A89C89;
  background: transparent;
  border: 0;
  border-bottom: 1px solid transparent;
  padding: 0 0 3px;
}
a.navLink:hover, button.navLink:hover { color: #D9D3C7; border-bottom-color: #A89C89; }
.navLink.navOn { color: #D9D3C7; border-bottom-color: #A63A1C; }
.navMe { font-size: 11px; line-height: 18px; color: #A89C89; white-space: nowrap; }
.navMe:hover { color: #D9D3C7; }
.navSkip {
  position: absolute;
  left: -9999px;
  top: 0;
  font-size: 11px;
  line-height: 19px;
  color: #241C14;
  background: #E2DCC8;
  border: 0;
  padding: 14px 20px;
}
.navSkip:focus { left: 0; }
.navAnchor { scroll-margin-top: 76px; }
```

Notes on three of those rules.

`.navSkip` uses `:focus` and not `:focus-visible`. A skip link reached by Tab
must appear whatever the browser thinks of the focus. It is absolutely
positioned against the fixed bar, so it lands on top of the bar's left end in
PAPER on INK, and the global outline still draws around it.

`.navLink` carries a transparent bottom border at rest, so the active mark
colours a border that is already in the layout. Nothing moves when a section
becomes active. No transition needed because there is nothing to ease.

`.navSet { flex: 1 }` is the whole layout. Mark, then the link set taking the
slack, then `@flxrnc` pinned right.

## JS

17 lines of body. Appended to the existing `<script>`, near the end, after the
DOM it reads. No observer, no library, no dependency. One `rAF` coalesces a
burst of scroll events into a single read per frame, and the listener is
passive so it never blocks the scroll.

```js
(function () {
  var navMap = [["issuance", "navIssue"], ["examination", "navExamine"], ["post", "navPost"]];
  var navPending = 0;
  function navMark() {
    navPending = 0;
    var hit = "", i, sec, a;
    for (i = 0; i < navMap.length; i += 1) {
      sec = document.getElementById(navMap[i][0]);
      if (sec && sec.getBoundingClientRect().top <= 140) { hit = navMap[i][1]; }
    }
    for (i = 0; i < navMap.length; i += 1) {
      a = document.getElementById(navMap[i][1]);
      if (a) { a.className = navMap[i][1] === hit ? "navLink caps navOn" : "navLink caps"; }
    }
  }
  function navQueue() { if (!navPending) { navPending = requestAnimationFrame(navMark); } }
  window.addEventListener("scroll", navQueue, { passive: true });
  navMark();
})();
```

The last section whose top has passed 140px wins, which is the reading a person
would give the page. Above the first section nothing is marked, which is
correct: the notice at the top is not one of the four destinations. Every
`getElementById` is null checked, so this runs clean today with no `post`
section in the document and starts marking POST the moment that block lands.

## Checks

Tab order from a cold load: skip link, ISSUE, EXAMINE, POST, WHITEPAPER,
@flxrnc, then the page. Every one of them takes the sheet's 2px CLERK outline
at 3px offset. Enter on the skip link moves focus to the sheet and the top of
the content. Enter on EXAMINE calls the parent's handler and scrolls nothing.

No `transition`, no `animation`, no `@keyframes`, no `scroll-behavior`. The
existing reduced motion block has nothing here to switch off.

Grep this file and the three blocks above for two consecutive hyphens. Zero.
