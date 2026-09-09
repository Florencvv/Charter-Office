# D1 QA pass two, The Charter Office

Tested against `index.html` md5 `70e7c40c00af73f4ac2bf83b81c2c152` (60,624 bytes, 17:54),
`engine.js` md5 `7ee990eb36e4788f3d9d280386e4581e`, `quiz.js` md5 `4f2cd81114de05eba31d0b259b733ad9`.
Served from `http://localhost:8787/index.html`. Chrome, real viewport 1366 by 768 for
screenshots and geometry, plus the preview pane for pointer and key events.

Note on timing: the build changed twice under this pass (17:51 and 17:54). Two defects found
early were already fixed by the author before I finished and are listed at the bottom as
closed, so nobody rechases them. Everything ranked below was reverified on the md5 above.

## BLOCKER

### B1. The result view's "Post it on X" button does nothing

`#examToPost` in the modal's end footer has no click handler. `wireOnce()` binds `exClose`,
`exVeil`, `exBack`, `exNext`, `exAgain` and `exToCert`. `examToPost` is never grabbed in
`grab()` and never wired, so it is inert.

Repro: type a name, issue, sit all seven questions, then on the result screen click
**Post it on X**. Nothing happens. The modal stays open, the page does not scroll, no error
in the console.

Measured before and after the click: `exWrap.hidden` false to false, `scrollY` 2828 to 2828.

This is the terminal call to action of the whole funnel and the only dead control on the
page. Its two neighbours in the same footer, "Return to the certificate" and "Sit it again",
both work. A visitor who finishes the examination and clicks the primary button will read the
site as broken.

Fix shape: grab `examToPost` alongside `TOCERT` and give it a handler that calls `closeExam()`
then scrolls `#post` into view, the same shape as `toCertificate()`.

## MAJOR

None. Every other item found is cosmetic or conditional. They are listed below rather than
promoted, per the brief.

## MINOR

### M1. "Copy the link" has no failure path

`#copyLink` calls `navigator.clipboard.writeText(location.href).then(success)` with no
rejection handler. When the clipboard is refused the control is a silent no op and Chrome logs
`Uncaught (in promise) NotAllowedError` from index.html line 962. Verified by stubbing
`writeText` to reject: the `#said` span stays empty and the error appears.

The sibling control `#postCopy` in the composer already does this correctly, with a rejection
branch that selects the textarea and says so. The two should match.

In a normally focused desktop browser this never fires, which is why it is MINOR rather than
MAJOR, but it is the one click in the whole flow that can put an error in the console.

### M2. Duplicate id `postQuiet`

Two elements carry `id="postQuiet"`, at lines 723 and 726, with identical text. Both start
hidden and `setLive()` only ever toggles the first, so there is no visible symptom. It is
invalid HTML and the second copy is dead weight in a file that is about to be concatenated.
Delete the one at line 726.

### M3. "START HERE" reads as a second line of the "HOW THIS WORKS" rail label

The `.arrowStart` cue is absolutely positioned out of `.main` and lands in the rail column.
Its note sits at y 875 to 889, directly under the rail label at y 823 to 841, at almost the
same left edge. The bounding boxes overlap and the two unrelated labels read as one stacked
caption:

```
HOW THIS WORKS
    START HERE
```

No glyphs collide, so it is legible, but it looks like a typo rather than a cue. Nudging the
note down or right by about 20px separates them.

### M4. The "then this" arrow points at the register, not at step two

`.arrowThen` hangs off the bottom of the issuance block and its arrowhead lands on the rule
above **Look up a certificate**. The register is a side feature, not the next step. A visitor
following the cue is sent to the lookup field instead of the examination. Moving the cue below
the register block, or repointing it, would match the ISSUE, EXAMINE, POST strip.

### M5. The page shifts 8px right when the modal opens

`openExam()` sets `overflow: hidden` on both `html` and `body`, which removes the scrollbar and
widens the client area from 1351 to 1366. Everything centred moves 8px right on open and 8px
left on close. Measured on `.navInner`: left 87.5 to 95. The veil is 88% opaque over a near
black page, so almost nothing is visible behind it, which is the only reason this is not worse.
Compensating with `padding-right` equal to the scrollbar width removes it.

### M6. Empty footer bar on an unanswered question

On question one before any answer, `exBack` is hidden because `idx === 0` and `exNext` is
hidden because nothing is picked, but `#exNav` is still shown. The result is a 33px empty strip
with a top rule under the options. Hiding `#exNav` when both buttons are hidden closes it.

## WHAT PASSES

Everything below was exercised and is correct on the tested md5.

### 1. The whole flow, twice

* Hero desk: typing a name and pressing **Engrave it** issues, mirrors the value into
  `#nameField`, scrolls to the plate and opens the composer. Charter 6316 for "Ada Fen".
* Section button and nav link both open the modal. `#examStart` and `#navExamine` are wired to
  the same `openExam()`.
* Seven questions, one at a time, progress reads "1 of 7" through "7 of 7", the tick marks fill
  as answers land, and the last Next button relabels itself "See the result".
* The reveal appears under the options after each answer and the chosen option keeps focus.
* The result view appears with the rank heading, the caps line, the body and the verdict.
* The stamp lands on the certificate behind the modal the moment the seventh answer is chosen,
  not on pressing on. Plate caption went to "Charter 6316, PROVISIONAL" and the EXAMINATION row
  to "PROVISIONAL" while the modal was still open.
* The composer text switches to the matching variant. All six variants checked by driving
  `state.stamp` through every rank:

| stamp | characters | counter | opening words |
| :- | :- | :- | :- |
| expansion | 156 | 156 | got [ cleared for expansion |
| patient | 181 | 181 | got [ standing / patient cap |
| provisional | 185 | 185 | got [ provisional / subject |
| revocation | 174 | 174 | they stamped [ revocation no |
| sovereign | 177 | 177 | [ sovereign / examined and f |
| not sat | 167 | 167 | i took the paper and walked |

  All six are inside the 280 cap and the counter agrees with the textarea in every case.
* The X intent link carries the same text. `#postOpen` href was checked against
  `encodeURIComponent(textarea.value)` for all six and matched every time.
* Reload with the produced URL brings back the same stamped card:
  `?n=Quill+Hastings&e=provisional` redraws charter 8361 with the PROVISIONAL stamp, sets the
  schedule row, and writes the provisional tweet into the composer on boot.

### 2. The unstamped path

Fresh page, issue a card, do not sit the examination:

* Composer offers the sixth variant, "i took the paper and walked out before the examination,
  so the sheet is clean and there is no stamp on it to read." plus the tail.
* Plate caption reads "Charter 8361, examination not sat".
* On the paper itself the EXAMINATION row of the schedule reads NOT SAT, and the ruled reserve
  is drawn at the right of the sheet carrying "THE EXAMINATION / HAS NOT BEEN SAT" in hairlines.
  Screenshot confirms both.
* Before any card exists the composer is correctly shut: textarea, both copy controls and the
  download button disabled, "Open X" carries no href and `tabindex="-1"`, and the
  "No certificate yet" line shows.

### 3. Modal behaviour

* Escape closes. Verified with a real key event, not a synthetic one.
* Backdrop click closes. Verified with a real pointer event on `#exVeil` at native pane scale.
* Focus moves into the panel on open, to `#exBody`.
* Focus is trapped. 12 forward tabs and 15 backward tabs both stayed inside `#exPanel`. The
  trap filters on `getClientRects()` so hidden footer buttons are skipped correctly.
* Focus returns to whichever control opened it. Opened from `#examStart`, closed with Escape,
  focus returned to `#examStart`. Opened from `#navExamine`, focus returned to `#navExamine`.
* The page behind does not scroll: `html` and `body` both get `overflow: hidden` on open and
  the previous values are restored on close, verified as empty strings after.
* Reopening after finishing shows the result, not question one. `openExam()` runs `scoreExam()`
  first and renders the result when all seven are answered.
* Back works from the result: it returns to question seven with the answer still chosen and the
  reveal still shown, and swaps the end footer back for the navigation footer.
* Changing an earlier answer updates everything at once: rank, schedule row, plate caption,
  URL and composer text all move together, because `applyResult()` runs on every choice.
* "Sit it again" clears all seven, resets to question one, strips the stamp from the paper,
  puts the row back to "Not sat", drops `e` from the URL and rewrites the composer to the
  walked out variant.
* "Return to the certificate" closes the modal, restores focus and scrolls the plate into view.
* Sitting the examination before issuing any card is safe. The rank is held and applied to the
  first card issued afterwards.
* The nav bar sits at z index 20 and the veil at 90, so the nav is correctly unreachable behind
  an open modal.

### 4. Console and network

Zero console output on load, on every click through the whole flow, and on close. The only
error I could produce anywhere is M1, and only by refusing the clipboard.

The page makes exactly three network requests and no others. No fonts, no analytics, no
images, no beacons, nothing third party.

| request | result |
| :- | :- |
| `GET http://localhost:8787/index.html` | 200 |
| `GET http://localhost:8787/quiz.js` | 200 |
| `GET http://localhost:8787/engine.js` | 200 |

After concatenation at handover this becomes one request. Both PNG exports are local: the wide
and square plates were rendered and serialised to a data URL with no error and no request, in
1.6s and 2.4s at 3x backing. The X intent is a link the visitor follows, never a fetch.

### 5. Layout at 1366 by 768

`document.documentElement.scrollWidth` is 1366 against a 1366 viewport, so there is no
horizontal overflow and no element sits outside the frame. Screenshots taken at 1366 by 768 and
as a full height plate at 1366 by 5400.

* Hero: canvas 1176 by 340 at x 56, headline, lede, desk row and the "built by @flxrnc"
  signature all inside it, nothing clipped, nothing overlapping.
* Three step strip, issuance, register, examination, composer and footer all clean.
* Fixed bar does not cover a heading when a nav link is followed. `.navAnchor` carries
  `scroll-margin-top: 76px` against a 48px bar, so after jumping to `#issuance`, `#examination`
  or `#post` the section top lands at 76 and the kicker at 93, well clear.
* Nav underline tracking follows the scroll correctly, landing on Post after a jump to `#post`.
* Arrows against controls: I intersected all three cues with every button, link, input,
  textarea, heading, rail label and canvas on the page. Only one intersection exists and it is
  M3, a rail label, not a control. No arrow sits over anything operable.
* Modal at 1366 by 768: panel 642 by 647 at x 362 y 56, inside an 84vh cap, never clipped at
  any of the seven questions or the result. The body scrolls internally when the reveal makes
  it taller than the panel. Retested at 534 by 419, the narrowest case available: still no
  clipping, still scrolls.

### 6. Keyboard

Tabbing from the top of the document reaches everything, in document order, with a visible
2px outline throughout:

skip link, Issue, Examine, Post, Whitepaper, nav @flxrnc, hero @flxrnc, hero name field,
Engrave it, name field, Issue the certificate, Download PNG, Download large PNG, Copy the link,
lookup field, Look it up, Sit the examination, Download the card, composer textarea,
Copy the text, Open X, then the five footer links.

The skip link is hidden by transform until focused, then lands on `#navMain`, which carries
`tabindex="-1"` so it accepts the focus. The examination options are real buttons and answer to
Enter and Space. Nothing is reachable but inoperable, and nothing operable is unreachable.

## FIXED DURING THIS PASS, DO NOT RECHASE

Both were live in the 17:44 build I started against and are gone from the tested md5.

1. The composer did not follow the rank. `applyResult()` redrew the plate and rewrote the URL
   but never called `refreshPost()`, so after sitting the examination the textarea still held
   the "walked out before the examination" line and the X intent carried it too. Verified
   broken at 17:48, verified fixed at 17:54: line 1290 now calls `refreshPost()`.
2. A duplicated and nested `#post` block. Window three contained a second `.block` with its own
   `id="post"`, its own rail label and a second `h2`, so the page showed "Post it on X"
   immediately followed by "Post the certificate" with a stray rule between them, and there
   were two elements with the same id. Gone from the tested md5.

## NOT TESTED

Neither download button was actually clicked, because that writes a file to the machine. The
drawing and serialising path underneath both of them was exercised directly instead, on both
layouts and with a stamp applied, and returned valid PNG data URLs with no error. Only the
final anchor click is unverified.
