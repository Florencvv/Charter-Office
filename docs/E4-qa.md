# E4. QA AND ACCESSIBILITY. Break it before the owner does.

Build tested: index.html 21,088 bytes, engine.js 41,243 bytes, quiz.js 16,343 bytes.
Served from http://localhost:8787/index.html and also loaded from the file system.
Chrome 152, tested at 1366 by 768 and in the preview pane. Note that index.html and
engine.js were both rewritten while this pass was running, at 16:58 and 17:06. Every
finding below was re-confirmed against the files as they stand at 17:11.

Ranked BLOCKER, MAJOR, MINOR. Reproduction steps are literal.

***

## BLOCKER

### B1. A wrong serial silently issues a different person's card

`decodeSerial` has no checksum, and the one validity check it does have is dead code.
Line 144 of engine.js reads:

```
return out && encodeSerial(out) === clean ? out : (out || null);
```

Both branches return `out`. The re-encode comparison is computed and then discarded,
so a serial that fails it is accepted anyway.

Measured: of the 21 single character mutations of one real serial, 20 decode to a
name and issue a card. Only the mutation of the leading kind byte is rejected.

Reproduce.
1. Load the page. Type `Ada Lovelace` in the issuance field, press Enter.
2. Read the serial off the plate: `010P 8R90 9HQQ CSBC C5HP A`. Charter 3478.
3. In the lookup field type `011P8R909HQQCSBCC5HPA`, one character changed at
   position 3. Press Enter.
4. The page says "Redrawn from the text on its face." and draws charter 1006 for
   `Cda Lovelace`. The name field is silently overwritten with `Cda Lovelace` and
   the address bar becomes `?n=Cda+Lovelace`, so the mistake is now shareable.

The requirement is that a wrong serial fails politely. It does not fail at all.
Other mutations produce control characters in the name, for example position 2 gives
`\u0001da Lovelace`, which is then engraved on the plate and typed into the field.

### B2. The register cannot look up a name, which is the thing it advertises

`doLookup` tests the input against `/^[0-9A-Za-z][0-9A-Za-z ]*$/` and, if the value
has 6 or more non space characters, treats it as a serial and never falls through to
the name path. Most names match that pattern.

Reproduce.
1. Issue `Ada Lovelace` in window one so the card exists.
2. Type `Ada Lovelace` into the lookup field. Press Enter.
3. Result: "No entry matches that serial. Enter the name itself and the same card is
   issued again." The visitor just did enter the name itself.

Also fails: `Vitalik`, `Satoshi`, `standard`, `charlotte`, `abcdef`, and a full wallet
address such as `0xd8da6bf26964af9d7eed9e03e53415d37aa96045`. Names that happen to
carry punctuation, such as `@flxrnc`, work. Names of 5 characters or fewer, such as
`BEANS`, work. So the failure hits ordinary plain names and addresses and misses the
cases most likely to be tested by hand.

The field placeholder is "A name already issued, or its serial" and the error text
tells the visitor to do the thing that just failed.

### B3. The download and copy controls are visible and focusable before any certificate exists

`<div class="tools" id="tools" hidden>` is defeated by the author rule on line 106 of
index.html, `.tools { display: flex; ... }`. An author `display` declaration beats the
user agent `[hidden] { display: none }` rule, so the attribute has no effect. The
plate box is correctly hidden because `.plate` sets no `display`.

Reproduce.
1. Load http://localhost:8787/index.html with no query string.
2. Scroll to window one. DOWNLOAD PNG, DOWNLOAD LARGE PNG and COPY THE LINK are all
   visible, directly under the hint, with no certificate above them.
3. Tab to them. All three take focus. Verified: `toolsHiddenAttr: true`,
   `toolsDisplay: "flex"`, `toolsVisible: true`, `state.card: null`.
4. Press DOWNLOAD PNG. Nothing happens at all, `exportPng` returns on `!state.card`.
5. Press COPY THE LINK. It copies the bare page URL and reports "Link copied."

This is the "reachable but not operable" case from the keyboard brief, and it is worse
with JavaScript off, where the three buttons sit immediately below the noscript notice
that says no certificate can be issued. It also breaks B1 section 4 device 4, since the
heaviest controls on the page are present before there is anything to take.

***

## MAJOR

### M1. The serial on the plate does not decode back to the input for names over 48 characters

`normalise` trims and then slices at 48, in that order, so a truncated name can keep a
trailing space. `encodeSerial` encodes that space. `decodeSerial` strips trailing
spaces before returning. The two are not inverses.

Reproduce.
1. Load `http://localhost:8787/index.html?n=The%20quick%20brown%20fox%20jumps%20over%20the%20lazy%20dog%20and%20keeps%20running`
2. The plate is charter 4212 for `"The quick brown fox jumps over the lazy dog and "`.
3. Its own serial decodes to `"The quick brown fox jumps over the lazy dog and"`,
   without the trailing space, which derives charter 5439. A different card.

The issuance field has `maxlength="48"` so this is not reachable by typing there, but it
is reachable through the URL, through a pasted share link, and through the lookup field,
which has `maxlength="220"`.

### M2. A checksummed address and a lower case address share one serial and produce two different cards

`encodeSerial` folds an address to its 20 bytes, so case is discarded. `deriveCard`
seeds the plate from the raw string, so case is preserved. One serial, two plates.

Reproduce.
1. Issue `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`. Charter 4721, The First
   Continental Bank of.
2. Read its serial, `07CDMTZJD5JAZ7BYXPF07S9M2Q9QNAB08M`, and paste it into the lookup.
3. Charter 9771, The Fourth Sovereign Bank of. Different guilloche, different date,
   different house. The serial on the paper in front of you resolves to somebody else's
   paper, with no error shown.

Since a mixed case address is the normal clipboard form on Etherscan and in most
wallets, this is the likely path, not the unlikely one.

### M3. The plate is not stable. The same card redraws with a different signature every time

`card.sigRng` and `card.inkRng` are stateful closures created once in `deriveCard` and
consumed during drawing. Drawing the same card object twice does not give the same
image. Measured on a 1200 by 675 render: 870 pixels differ, all inside the registrar's
signature at x 269 to 383, y 511 to 550. Verified by pixel diff, not by eye.

Two visible consequences.
1. Answering any examination question calls `renderScreen()` on the existing card, so
   the signature on the certificate the visitor is looking at changes under them. Diff
   box after one answer: x 253 to 405, y 518 to 578, about 1,700 pixels.
2. The exported PNG is drawn from the same card object again, so the file never carries
   the signature that was on screen. Verified: screen against export differs by 1,708
   pixels, all inside the signature box.

Reproduce.
1. Issue any name. Look at the CLERK signature.
2. Press SIT THE EXAMINATION and answer question one.
3. The signature has been redrawn. Press DOWNLOAD PNG and it changes again.

A fresh page load is deterministic, and that part passes: three loads of
`?n=Ada%20Lovelace&e=sovereign` produced the pixel checksum 2944107046 every time. It
is only redraws of a card already in memory that drift. The page's own copy, "the same
text always cuts the same card, on any machine, for anyone", is not true of two clicks
on the same machine.

### M4. Long non Latin input overruns the plate

The serial line at engine.js line 1022 is drawn centred with no fitting, and the base32
serial is a function of UTF8 bytes rather than characters. The name line stops shrinking
at its 18px floor and then overflows.

Measured widths against the 1200 unit plate, serial line at 11px:

| Input | Serial length | Serial line width |
|-|-|-|
| 48 Latin characters | 79 | 683px, fits |
| 20 CJK characters | 98 | 838px |
| 25 CJK characters | about 122 | about 1,030px, leaves the frame |
| 32 CJK characters | 156 | 1,302px, clipped by the canvas |
| 48 CJK characters | 232 | 1,914px, 357px lost off each edge |
| 24 emoji | 156 | 1,302px, clipped |

Reproduce.
1. Load `dev-plate.html?n=` with 48 CJK characters, or paste the same into the issuance
   field, which allows 48 of them.
2. The serial runs off both edges of the sheet. The word SERIAL is gone. The code on the
   face of the certificate is now unreadable and the card cannot be looked up from its
   own paper.
3. The applicant line, fitted down to the 18px floor, measures 864px against a 690px
   slot and crosses the left inner frame rule.

Threshold is roughly 74 UTF8 bytes, which is about 25 CJK characters or 12 emoji.

### M5. Answering an examination question destroys keyboard focus

`renderExam` rebuilds `#examBody` with `innerHTML` on every answer, so the button that
was just activated is removed from the document and focus falls to `document.body`.

Reproduce.
1. Tab to any examination option and press Enter or Space.
2. `document.activeElement` is now `BODY`. Verified.
3. To answer question two, tab again from the top of the document, past three notice
   links, both fields, four buttons and every option already rendered above.

Seven questions means seven full trips from the top. The examination is technically
completable by keyboard, so it is not a blocker, but it is close to unusable.

### M6. The certificate has no text alternative, and nothing on the page is announced

Four items, one finding, all confirmed live.

1. `canvas#card` carries the fixed string `aria-label="An engraved commemorative
   charter certificate"` and it never changes. Every card, for every visitor, reads the
   same. The name, the serial, the charter number and the examination stamp are
   unavailable to a screen reader, and there is no parallel text summary beside the
   plate. The entire output of the product is inaccessible.
2. `#issueHint` and `#lookupHint` have no `aria-live`. "Nothing entered. The clerk needs
   a name." and "No entry matches that serial." are written into silent paragraphs.
3. Examination options are plain buttons with no `aria-pressed`, no radio group and no
   grouping element. `optionAttrs` on a rendered option is `class`, `data-q`, `data-o`
   and nothing else. Which option is chosen is conveyed by a class only.
4. `#examBody` and `#examSchedVal` change without any live region, so the reveal, the
   rank and the schedule row all appear in silence.

B1 section 5 finding 9 called for the first two of these. Neither was done.

### M7. The examination option control boundary measures 1.76 to 1

Measured from computed styles, not from the design file. The resting and unchosen option
buttons have a transparent background, no border and no outline. The only mark that they
are controls is `border-left: 2px solid #4A4034` against the page ground `#1C1712`.

`#4A4034` on `#1C1712` is **1.76 to 1** against a 3 to 1 requirement for a control
boundary. B1 section 1 forbids LEDGER as a control boundary in its own words and its
table claims PENCIL at 6.6 to 1 for this element. The build uses PENCIL only on hover
and CLERK only when chosen.

Reproduce: load the page, press SIT THE EXAMINATION, sample any unanswered option.

### M8. Export freezes the page for 1.3 to 3.9 seconds with no feedback

`exportPng` runs `toDataURL` synchronously on the main thread. Measured on this machine,
12 cores, warm:

| Step | Wide | Square |
|-|-|-|
| Draw at 3x | 21 to 26 ms | 18 to 24 ms |
| Downscale | 2 to 6 ms | 2 to 4 ms |
| PNG encode | 1,285 to 1,617 ms | 3,835 to 4,596 ms |
| Total | about 1.5 s | about 4.2 s |

This is not the environment. A same size canvas of pure noise encodes in 1,178 ms here
and a flat fill encodes in 97 ms, so the cost is the engine turned tint, which gives the
whole sheet high entropy. During the freeze the button shows no pressed state, no
message and no cursor change, and a second click queues a second encode.

Reproduce: issue any name, press DOWNLOAD LARGE PNG, try to scroll.

### M9. The typed string is written into the URL and into browser history

`setUrl` puts the raw input in the query string on every issuance and on every
examination answer. The page above the field says "Nothing is checked, nothing is kept."

Reproduce.
1. Paste `0xd8da6bf26964af9d7eed9e03e53415d37aa96045` into the issuance field, press Enter.
2. The address bar now reads `?n=0xd8da6bf26964af9d7eed9e03e53415d37aa96045`. It is in
   the session history, it is in the tab title bar of a screen share, and COPY THE LINK
   puts it on the clipboard.

Nothing leaves the machine, so this is not a network finding, and it sits under the
notice block that tells people not to hand their address to pages. B1 section 5 finding
10 raised it and called it Chief's call. It has not been made.

***

## MINOR

1. **Plate serial contrast 4.43 to 1.** `RED #B1361E` on `PAPER #DCDCCB`. B1 section 1
   argued this exact number up to 4.7 to 1 by moving the ink to `#A63A1C` and the stock
   to `#E2DCC8`, precisely because the serial is transcribed off a picture. engine.js
   still carries the pre-adjustment values. The page and the plate are also now two
   different papers, `#E2DCC8` in the fields and buttons, `#DCDCCB` on the sheet, sitting
   next to each other on screen.
2. **Plate schedule labels 3.90 to 1.** `INK_SOFT #6E6A5C` on paper, at 9.5px, for
   BRANCHES OPEN through COUNTERPART FILED and for the SCHEDULE OF WHAT THIS PAPER GRANTS
   line. Smallest text on the sheet and the weakest.
3. **The serial is set in a monospace stack.** `F_NUM` is `"SF Mono", "Cascadia Mono",
   Consolas, "DejaVu Sans Mono", monospace`, at 11px. B1 section 6 names this as the
   banned default the prototype committed and specifies the numbering grotesque instead.
4. **Disabled button boundary 1.76 to 1.** After SIT THE EXAMINATION is pressed, its
   border becomes `#4A4034` on `#1C1712`. Its label is fine at 6.59 to 1. WCAG exempts
   disabled controls, so this is not a failure, but the button all but vanishes.
5. **The register rule on the primary button.** `#A63A1C` measures 2.75 to 1 against the
   counter. In practice the button's own paper background paints under the border, so the
   rule sits on paper at 4.66 to 1 and passes. Recorded only because B1 section 1 states
   that the second colour never touches the counter, and at the top edge of that 2px rule
   it does.
6. **One unwanted network request.** There is no `<link rel="icon">`, so the browser asks
   for `/favicon.ico` and gets a 404. Same origin, no third party, no data leaves, but it
   is a request the page did not ask for and it will show in any server log.
7. **A serial separated by hyphens is issued as a name.** Paste
   `010P-8R90-9HQQ-CSBC-C5HP-A` into the lookup and the page issues a certificate to the
   literal string, charter 2358, with the cheerful "Redrawn from the text on its face."
   Spaces and lower case are both handled correctly, so this is only the hyphen form.
8. **A pasted share link drops the stamp.** Paste
   `http://localhost:8787/index.html?n=BEANS&e=sovereign` into the lookup and the card is
   redrawn without the SOVEREIGN stamp, because `doLookup` reads only `n`. The same link
   in the address bar restores it correctly.
9. **`navigator.clipboard.writeText` has no catch.** Confirmed in the console:
   `Uncaught (in promise) NotAllowedError: Failed to execute 'writeText' on 'Clipboard':
   Document is not focused.` at index.html line 464. On a denied clipboard the button is
   silently dead and throws. The false "Copied." from the prototype was fixed, the catch
   was not added.
10. **A zero width space alone issues a blank certificate.** Enter U+200B and the guard
    passes, since `\s` does not match it, so the plate is engraved with an empty applicant
    line and a real serial.
11. **The lookup scrolls the plate into view but leaves focus behind.** After Enter in the
    lookup field, `scrollY` moves to centre the plate and `document.activeElement` is
    still the lookup field, now below the fold. Keyboard focus and viewport disagree.
12. **No `main` landmark.** The only landmark on the page is `footer`. Heading order is
    otherwise clean: one h1, four h2, no skipped levels.
13. **An examination sat before a certificate exists is lost on reload.** The answer
    handler only calls `setUrl()` inside `if (state.card)`, so the stamp never reaches the
    URL. Answer all seven, then issue a name: the stamp is applied to the card, but a
    reload of the resulting link restores nothing until the card exists first.

***

## What passes

**1. Input edge cases.** 27 inputs run through `deriveCard`, `drawPlate`,
`encodeSerial` and `decodeSerial`. Nothing threw. Empty string and any run of spaces are
refused with the right two messages, "Nothing entered. The clerk needs a name." and "Only
spaces entered. There is nothing there to engrave." Leading and trailing spaces around a
real name are collapsed and the card matches the trimmed name. Multi codepoint emoji
survive as single glyphs, including the four person family and a regional indicator flag.
Cyrillic, Chinese, Arabic, Hebrew, combining marks, tabs, newlines, non breaking spaces
and a bare RTL override all round trip. Digit strings are fine. Both address forms draw.
`__proto__` and `constructor` as input are inert.

**No injection anywhere.** `a"b<script>c&d'e` and `<img src=x onerror=alert(1)>` both
reach the DOM only through `.value` and the canvas. After loading
`?n=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E`, `document.images.length` is 0,
`document.scripts.length` is 3, the page's own, and the body contains no `onerror`.
Quiz strings go through `innerHTML` but they are authored, not user supplied.

**2. Determinism, the parts that hold.** Twelve inputs issued twice give byte identical
renders. Three loads of the same URL give the identical pixel checksum. The serial
decodes back to the input, and the lookup returns the identical card, for every case
except M1 and M2. Exact serial, lower case serial and the grouped form printed on the
plate all resolve correctly. A full shared link pasted into the lookup resolves, including
one carrying a percent encoded emoji. An empty lookup says "Nothing to look up."

**3. PNG export.** Both buttons produce the right thing.

| Export | Dimensions | Data URL prefix | Size |
|-|-|-|-|
| DOWNLOAD PNG | exactly 1200 by 675 | `data:image/png;base64,` | 1,585,728 bytes, 1.51 MiB |
| DOWNLOAD LARGE PNG | exactly 1080 by 1080 | `data:image/png;base64,` | 2,270,649 bytes, 2.17 MiB |

Sizes vary by a few hundred bytes between renders because of M3. Both were inspected at
full resolution. All type is legible down to the 8px credit line and the disclaimer under
the frame. The blind embossed SOVEREIGN seal is deliberately near invisible, which is the
intent, not a defect.

**4. Keyboard, apart from M5 and B3.** Tab order top to bottom: three notice links, the
issuance field, ISSUE THE CERTIFICATE, the three tool buttons, the lookup field, LOOK IT
UP, then the examination in order, then the footer links. No focus trap anywhere. Enter
issues from the issuance field and looks up from the lookup field, both confirmed with
real key events. The focus ring is `2px solid #D9D3C7` at 3px offset and is visible on
every control including the paper filled buttons, where the offset puts it on the counter
at 11.94 to 1. Screenshot taken to confirm. No element is operable but unreachable.

**5. Contrast, everything not listed above.** Measured from computed colours in the
browser. Body copy, lede, masthead, notice body, hints, rail labels, link text and
underline, field value, field boundary, both button labels, the quiet button border and
its hover fill, the disabled label, the schedule row, footnotes, exam question, exam
option in all three states apart from the resting bar, the reveal label and the selection
colours all pass at their thresholds. Placeholder `#61594E` on `#E2DCC8` measures 5.02 to
1, so the design file's refusal of the placeholder exemption holds. The 1.76 to 1
hairlines used as decorative rules between blocks are not boundaries and are not counted.

**6. Reduced motion and no script.** 170 elements checked: zero with an animation name,
zero with a transition duration above 0, zero with `scroll-behavior: smooth`.
`document.getAnimations()` is empty. `scrollIntoView` in the lookup is called with no
`behavior` key and both `html` and `body` compute to `scroll-behavior: auto`, so it is an
instant jump whether or not reduced motion is set. With JavaScript blocked the page keeps
its full layout, all copy, all links, and the noscript notice is visible in place inside
window one, correctly ruled above and below. The only defect in that state is B3.

**7. Weight and speed.** Three files, 78,674 bytes total. Nothing here exceeds 200 ms
except the export in M8.

| Measure | Result |
|-|-|
| Total bytes, three files | 78,674 |
| DOMContentLoaded | 22 ms |
| First render of the certificate | 32 to 55 ms |
| Redraw when the stamp changes | 28 ms expansion, 34 ms patient, 28 ms provisional, 58 ms revocation, 32 ms sovereign |
| Redraw on a fresh issuance | 31 to 35 ms |

**8. Offline and privacy. Clean.** Captured with a full browser network log on a cold
profile, not just the resource timing API. The complete list of requests the page makes:

| Request | Origin | Result |
|-|-|-|
| `http://localhost:8787/index.html` | same | 200 |
| `http://localhost:8787/quiz.js` | same | 200 |
| `http://localhost:8787/engine.js` | same | 200 |
| `http://localhost:8787/favicon.ico` | same, browser default, see MINOR 6 | 404 |

That is all four. No font, no analytics, no beacon, no third party anything. The source
contains no `fetch`, no `XMLHttpRequest`, no `sendBeacon`, no `WebSocket`, no dynamic
import, no `@import`, no CSS `url()`, no `new Image`, no `localStorage`, no
`sessionStorage`, no `indexedDB` and no cookie access. The only external URLs in the three
files are eight `href` values on anchors, five to standardreserve.xyz and x.com in the
notice and three in the footnotes, none of which is fetched. Exercising every control,
issuing, looking up, exporting both PNGs, copying the link and sitting the examination,
adds no request at all.

From the file system: `file:///C:/Users/shelu/Desktop/standardbank/index.html?n=Ada%20Lovelace&e=sovereign`
loads, both scripts load, the plate renders charter 3478, matching the HTTP render
exactly, the stamp is restored, and `history.replaceState` works. Zero console errors.

**9. The examination.** Sat five times with different patterns. The stamp changes, the
schedule row changes, the URL changes, the plate changes, and reloading the URL restores
the same stamped card.

| Pattern | Stamp | Schedule row | URL |
|-|-|-|-|
| every keyed answer | sovereign | SOVEREIGN | `?n=Ada+Lovelace&e=sovereign` |
| all a | provisional | PROVISIONAL | `&e=provisional` |
| all b | patient | STANDING, PATIENT CAPITAL | `&e=patient` |
| all c | patient | STANDING, PATIENT CAPITAL | `&e=patient` |
| all d | revocation | REVOCATION NOTICE | `&e=revocation` |

The examination gates nothing. The certificate is drawn complete before window two is
touched, the paper is unchanged apart from the EXAMINATION row and the stamp, and no
state anywhere else on the page distinguishes a visitor who sat it. The one wrinkle is
the signature drift in M3, which is not the examination's fault.

Malformed stamps in the URL are all safe. `?e=constructor`, `?e=nonsense`, `?e=__proto__`
and `?e=toString` are each ignored, the row stays "Not sat", the certificate still draws,
and `e` is dropped from the address bar on the next write. The `hasOwnProperty` guard at
index.html line 504 is doing its job.

***

## Compliance

- No em dashes in this file. No double hyphens in this file.
- Nothing was fixed and no file other than this one was touched.
