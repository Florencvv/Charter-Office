# B1 DESIGN. The page around the plate.

Scope. Everything that is not the certificate, plus the relationship between the
counter and the sheet lying on it. B2 owns the plate. A3's structural argument is
accepted: the certificate is half of a pair, so the page is the counter the other
half was filed behind.

Governing rule, restated so I can be held to it: one bold element on the whole
site, the engraving. Every decision below is a decision about how to be furniture.

Hard rules observed throughout. No em dashes. No double hyphens anywhere, which
also rules out CSS custom properties, so the palette below is the single source
and the stylesheet repeats literal hex. Desktop only, one fixed width, no
breakpoints. No motion of any kind, decorative or otherwise, and the reduced
motion block stays as a guard.

***

## 1. PALETTE

Six values. Chief's starting position is taken, with one argued adjustment to the
numbering colour and one structural rule that is stronger than the brief asked for.

### The values

**COUNTER `#1C1712`**
The page ground. A warm brown black, the desk the paper is handed across.
May be used for: the page background, and nothing else.
May not be used for: any surface on the canvas, any text, any border. There is no
second background tone on the site and no panel ground anywhere.

**LEDGER `#4A4034`**
Structure. Hairline rules between blocks, and the fill of a hovered row.
May be used for: 1px horizontal rules, and as a hover fill behind CLERK text.
May not be used for: text at any size, any control boundary, any panel that
persists in a resting state. It measures 1.8 to 1 against COUNTER, which is the
right weight for a scored line on a counter top and is far too weak to carry
meaning. Nothing informational is ever expressed by it.

**CLERK `#D9D3C7`**
Reading text. Body copy, headings, link text, control labels, focus rings.
May be used for: all running text on the counter, the focus ring.
May not be used for: anything on the canvas, and never as a fill behind dark text.

**PENCIL `#A89C89`**
Secondary. Rail labels, captions, hints, control boundaries, disabled labels.
May be used for: text at 14px and above, 1px control borders, underlines.
May not be used for: body copy, and not on a LEDGER fill, where it drops to 3.8 to 1.

**PAPER `#E2DCC8` bonded to INK `#241C14`**
The stock. One value in practice, because the two never appear apart. PAPER is the
sheet; INK is the only text colour that may sit on it. INK is the lower end of
A2's intaglio range and is taken unchanged.
May be used for: the canvas ground and its engraving, and, on the page, the two
form fields and the primary button, which are the only paper objects in the
interface. A form on a counter is filled in on paper, so this is not decoration.
May not be used for: any panel, any callout, any section background. Paper appears
in exactly three places on the page and one of them is the certificate.

**NUMBER `#A63A1C`**
The second colour. The letterpress numbering pass, the crossing, the cancellation
mark, the examination stamp.
May be used for: marks and numerals on a PAPER ground, which means the canvas and
the primary button's top register rule.
May not be used for: the COUNTER, at all, at any size, as text or as a mark. See
the rule below.

### The adjustment to A2, argued

A2 anchors the numbering colour at `#B1361E` to `#C2451F`. I am moving one step
darker to `#A63A1C`, same hue family, lower value, and the reason is measurable.
Against our stock at `#E2DCC8`, `#B1361E` measures 4.1 to 1 and `#C2451F` measures
3.5 to 1. Both fail 4.5 to 1 for a serial somebody has to read off a picture and
retype. `#A63A1C` measures 4.7 to 1 and passes.

The alternative fix is to lighten the paper until the published hex passes, which
takes the stock to about `#EDE7D3`. That is nine points off the banned cream and I
will not go there to save a swatch. A2's range was sampled from ink on physical
stock lighter and warmer than ours; matching the historical ratio rather than the
historical hex is the more faithful move, and the hue is unchanged.

### The rule that is stronger than the brief asked for

**The second colour never touches the counter. It goes where paper goes.**

`#A63A1C` measures 2.7 to 1 against `#1C1712`, which fails even the 3 to 1
threshold for a non text component boundary. So it is not a question of taste: it
cannot legally carry an error state, a link hover, a selected row or a notice
marker. Rather than lighten it into an accent, I am holding it to the sheet.

This is also exactly right historically. The numbering machine touched the paper,
not the desk. And it serves the single taste rule better than anything else in
this file: the only colour anywhere on the site is on the certificate, so the eye
has nowhere else to go. The interface has no accent colour at all.

### Contrast, measured

Body text on background: **CLERK `#D9D3C7` on COUNTER `#1C1712` is 11.9 to 1.**

Every interactive element:

| Element | Colours | Ratio | Threshold |
|-|-|-|-|
| Text input value | INK on PAPER | 12.2 to 1 | 4.5 |
| Text input placeholder | `#61594E` on PAPER | 5.0 to 1 | 4.5 |
| Text input boundary | PAPER against COUNTER | 13.0 to 1 | 3 |
| Primary button label | INK on PAPER | 12.2 to 1 | 4.5 |
| Primary button register rule | NUMBER on PAPER | 4.7 to 1 | 3 |
| Quiet button label | CLERK on COUNTER | 11.9 to 1 | 4.5 |
| Quiet button border | PENCIL against COUNTER | 6.6 to 1 | 3 |
| Quiet button, hovered | CLERK on LEDGER | 6.8 to 1 | 4.5 |
| Disabled button label | PENCIL on COUNTER | 6.6 to 1 | 4.5 |
| Link text | CLERK on COUNTER | 11.9 to 1 | 4.5 |
| Link underline | PENCIL against COUNTER | 6.6 to 1 | 3 |
| Exam option label | CLERK on COUNTER | 11.9 to 1 | 4.5 |
| Exam option, chosen bar | PENCIL against COUNTER | 6.6 to 1 | 3 |
| Focus ring | CLERK, 2px, offset 3px | 11.9 to 1 | 3 |
| Hint and caption text | PENCIL on COUNTER | 6.6 to 1 | 4.5 |
| Error hint text | CLERK on COUNTER | 11.9 to 1 | 4.5 |
| Rail labels, 11px caps | PENCIL on COUNTER | 6.6 to 1 | 4.5 |

Three things were failing and are fixed:

1. The numbering colour on the counter, 2.7 to 1. Fixed by banning it there.
2. The placeholder. A 55 percent ink wash on paper gives `#7A7265` at 3.5 to 1.
   Fixed at 68 percent, `#61594E`, 5.0 to 1. Placeholders are technically exempt.
   We are not taking the exemption.
3. Disabled controls at `opacity: 0.45`, as the prototype has them, which crushes
   PENCIL to about 2.6 to 1. Fixed by removing opacity entirely and setting the
   disabled label in PENCIL at full strength with the pointer removed.

Two further rules. The focus ring is CLERK, brighter than any resting boundary on
the page, so focus is never confused with a border. On a PAPER field the 3px
offset puts the ring on COUNTER, where the 11.9 to 1 figure holds. And no state
is carried by colour alone: the chosen exam option gets a 2px left bar **and** its
label switches to the caps stack; the error hint gets its own rule above it **and**
sits in CLERK rather than PENCIL.

***

## 2. TYPOGRAPHY

No webfont budget, no network, zero dependencies. System stacks only. Every stack
below has a real Windows resident first choice and a real macOS resident first
choice, and a named degradation that is a design decision rather than an accident.

### The four stacks

**Titling, didone.** Used twice on the page and once on the plate.

```
Didot, "Didot LT Std", "Bodoni 72", "Bodoni MT", "Hoefler Text", Constantia, Georgia, "Times New Roman", serif
```

macOS first: Didot, which ships with macOS. Then Bodoni 72, then Hoefler Text.
Windows first: "Bodoni MT", present wherever Office is. Then Constantia, which
ships with every Windows since Vista and is therefore the real Windows floor.
Degrades to: Constantia on a bare Windows install, Georgia on anything older.
Both are moderate contrast serifs. What is lost is the hairline, not the shape,
so the masthead still reads as a letterhead. Consequence for the design: the
didone is never set below 24px and never carries a hairline that has to survive,
because on half of all machines the hairline is not there.

**Engraved caps.** Field labels, rail labels, capacities, the plate's own labels.

```
Copperplate, "Copperplate Gothic Light", "Engravers MT", "Perpetua Titling MT", Optima, Candara, "Gill Sans MT", "Trebuchet MS", sans-serif
```

macOS first: Copperplate, which ships with macOS. Then Optima.
Windows first: "Copperplate Gothic Light" and the two Office titling faces. Then
Candara, Vista and later, the Windows floor.
Degrades to: Candara set in caps at 0.16em. The engraved reading comes from the
even widths, the caps and the tracking, not from the flared serif, so the
degradation costs an ornament and nothing structural.
Rule: never set lowercase in this stack. If a string has lowercase in it, it is
the wrong stack.

**Reading.** All running prose on the page and the grant sentence on the plate.

```
"Palatino Linotype", Palatino, "Book Antiqua", "URW Palladio L", "Iowan Old Style", Georgia, "Times New Roman", serif
```

Windows first: "Palatino Linotype", which ships with Windows 2000 and later, so
this is one of the very few genuine both platform matches available.
macOS first: Palatino, which ships with macOS. Book Antiqua covers Office.
Degrades to: Georgia, which is wider and has a larger x-height, so the 660px
measure drops from about 68 characters to about 62. Nothing on the page is set to
a fixed line count, so this reflows without breaking a single block.
Rejected: putting Charter first, which macOS has and Windows does not. The joke of
setting The Charter Office in Charter is worth less than the platform divergence
it buys, because Charter is much darker on the page than Palatino and the two
builds would not look like the same design.

**Numbering.** Serials, charter numbers, dates, counts. The letterpress pass.

```
"Franklin Gothic Medium", "Arial Narrow", "Avenir Next Condensed", "Helvetica Neue", Helvetica, Arial, sans-serif
```

Set at `font-weight: 500` and `font-variant-numeric: lining-nums tabular-nums`.
Windows first: "Franklin Gothic Medium", which ships with Windows XP and later.
macOS first: "Avenir Next Condensed", macOS 10.8 and later, then "Helvetica Neue",
whose real Medium cut answers weight 500 without synthesis.
Degrades to: Arial at 500. What survives is the category contrast, a grotesque
sitting inside a serif page, which is the entire job. The condensation is a bonus.
Why a grotesque and not a monospace: a numbering machine set numerals in a
grotesque on a second physical pass, and lining tabular figures are a transcription
requirement for a code somebody reads off a picture. See section 6.
Canvas note: canvas 2d does not honour `font-variant-numeric`, so this stack must
have lining tabular figures by default. Franklin Gothic Medium, Arial Narrow and
Helvetica Neue all do. Palatino does not, which is why serials never use the
reading stack.

### Size scale, PAGE. These are CSS pixels and they inherit.

| Role | Size and leading | Stack |
|-|-|-|
| Office name, masthead | 40px / 42px | Titling |
| Masthead line | 19px / 30px | Reading |
| Masthead unofficial statement | 17px / 28px | Reading, first word in caps stack |
| Notice heading | 20px / 28px | Titling |
| Notice body | 18px / 29px | Reading |
| Section head | 24px / 30px | Titling |
| Body copy | 17px / 28px | Reading |
| Exam question | 19px / 30px | Reading |
| Hints, captions, tools row | 14px / 22px | Reading |
| Footnotes and footer | 14px / 22px | Reading |
| Rail labels and microlabels | 11px, 0.16em tracking | Caps |
| Interface numerals | 15px | Numbering |

Two facts about that table. The notice body at 18px is larger than the page's own
body copy at 17px, which is how the most important text on the site earns primacy
without a box around it. And the word "Unofficial" sits at 17px in the masthead,
not at 11px, because C1 says it is never softened and setting it in the smallest
type on the page is a way of softening it.

### Size scale, CANVAS. These are drawing units and they inherit nothing.

Canvas text does not read CSS. No inheritance, no `letter-spacing`, no
`line-height`, no wrapping, no `font-variant-numeric`. Every value below is a
number B2 passes to `ctx.font`, and every tracked line is drawn glyph by glyph
because `ctx.letterSpacing` is not portable.

The drawing space is **1008 by 567 units**, which is exactly 16 by 9. On screen one
unit equals one CSS pixel, because the plate is presented 1:1 (see section 3). On
export the whole context is scaled once and every unit moves together.

| Role | Units | Stack |
|-|-|-|
| Chirograph cut line, clipped by the top edge | 15u, tracking 3.0u | Caps |
| Office name on the plate | 14u, tracking 3.4u | Caps |
| Plate subline | 10u, tracking 2.2u | Caps |
| Engraved initial, inside a 64u compartment | 46u | Titling |
| Grant sentence | 17u / 26u | Reading |
| The applicant string in the inline slot | 26u, tracked tighter if long | Titling |
| Schedule labels | 10u, tracking 2.0u | Caps |
| Schedule values | 15u | Reading |
| Serial and charter number | 15u | Numbering, in NUMBER |
| Date, one degree off axis | 13u | Numbering, in NUMBER |
| Engraved disclaimer | 11u, tracking 2.4u | Caps |
| Testimonial clause | 12u italic | Reading |
| Countersignature capacities | 9u, tracking 1.8u | Caps |
| Stub type, the retained line | 9u | Caps |

Floor: nothing on the plate below 9u. At 1:1 with DPR 1 that is roughly 6px of cap
height, which is the last size that survives.

***

## 3. GRID AND PAGE STRUCTURE

### Column and margins

One fixed width. `body { min-width: 1288px }`, ground COUNTER, no breakpoints.

```
page margin 56 | rail 132 | gutter 36 | main 1008 | page margin 56
```

Sheet width 1176px, centred. The rail is the counter's signage: it holds one caps
label per block, set at the first baseline of the block, PENCIL, 11px, 0.16em, and
nothing else. The main column is 1008px wide because that is the plate's presented
width, and the plate sits flush to its left edge.

Reading measure inside the main column is **660px** on every paragraph and list.
Two things break out of that measure, and only two: the plate at 1008, and the
notice, described below. Everything else on the site is one 660px column of text
hanging off a 132px label rail, which is what a register looks like.

Total 1288px fits a 1366 wide window with the scrollbar. That is the constraint the
grid was solved against.

### Vertical rhythm

Base unit **28px**, which is the body leading. The only permitted vertical values
are 14, 28, 56 and 84. Paragraph gap 14. Within a block 28. Between blocks 56.
Between the two windows 84, and that is the largest gap on the page, for the reason
given in section 4.

### Order of blocks down the page

1. **Masthead.** `masthead-office-name` at 40px titling, `masthead-line` at 19px,
   `masthead-unofficial` at 17px with the first word in the caps stack. In the rail
   beside it, the counter directory: two lines, WINDOW ONE ISSUANCE and WINDOW TWO
   EXAMINATION, the second followed by OPTIONAL. Two entries, listed, not sequenced.
2. LEDGER hairline, full 1176.
3. **The standing notice.** Rail label NOTICE. `scam-heading` at 20px titling, then
   the five scam strings as a two column broadside inside the main column:
   476 + 56 + 476 = 1008. Source order preserved, reading down then across.
4. LEDGER hairline.
5. **Window one, issuance.** Rail label WINDOW ONE. Head, instruction, field row,
   plate, tools row, then a closing hairline.
6. **The register.** Rail label THE REGISTER. Lookup field and explainer.
7. 84px gap.
8. **Window two, examination.** Rail label WINDOW TWO. Head, the optional schedule
   row, the entry control, then the seven questions.
9. LEDGER hairline.
10. **Footnotes.** Rail label FOOTNOTES. Attribution, links, licence, the gift line,
    and `footer-scam-line` last, so the warning closes the page as well as opening it.

### The notice, and why it is not a decorative callout

It has no border, no background, no left bar, no icon, no tint and no colour. It is
distinguished by three things a decorative callout cannot use: it is the only block
on the site set in two columns, it is set one step larger than the page's body copy,
and it sits above every other block. Measure, size and position. That is how a
printed standing notice at a counter is distinguished, and it is the opposite of the
documentation admonition pattern, which distinguishes by ornament because its
content has no claim to position.

Readability without scrolling, measured against the layout above. Page top padding
48. Masthead ends at roughly 198. Hairline at 240. Notice heading baseline at
roughly 262. The taller of the two notice columns runs about 333px, so the block
closes at roughly 630. On a 1366 by 768 window the usable viewport is about 630 to
660px tall, so the heading and the whole of the first column are visible on load and
the block ends within one wheel notch. Nothing between the masthead and the notice
is permitted to grow. If Chief wants the entire notice above the fold at 768, the
lever is the masthead at 34px and top padding at 36, which recovers 20px, and I
would rather have the office name than those 20px.

### The plate, and the 1:1 rule

**The plate is presented at exactly its drawing size: 1008 by 567 CSS pixels.**
Backing store `1008 * dpr` by `567 * dpr`, `ctx.scale(dpr, dpr)`, and the CSS width
is never set to anything other than 1008.

This is a page decision, not a plate decision, and it is the reason the main column
is 1008 wide rather than a rounder number. Any other presented width introduces a
resample between the drawing space and the device grid, and A2 section 2.5 says a
line that lands between 1.0 and 2.0 device pixels stops looking like an engraving
and starts looking like a JPEG artefact. Export is a separate pass at 1200 by 675 or
larger, rendered fresh at scale, and is allowed to supersample because a supersample
downward from 2x is antialiasing rather than a resample. The screen path gets no
resample at all.

No shadow under the sheet. PAPER measures 13.0 to 1 against COUNTER, which is more
separation than any shadow would add, and see section 6.

***

## 4. THE TWO WINDOWS

The requirement is that a visitor can see, not read, that the paper is theirs and
the examination is optional. Six devices, none of which is a sentence.

**1. The counter directory, in the rail, at the top.** Before any content, two
entries listed side by side in the rail: WINDOW ONE ISSUANCE and WINDOW TWO
EXAMINATION OPTIONAL. Two windows at a counter are a list. A funnel is a sequence.
The directory is the first structural statement the page makes and it makes it
before the visitor has read a word of prose.

**2. Identical treatment.** Both windows get the same rail label style, the same
24px section head, the same 660px measure, the same opening hairline. Neither gets
a number, a step count, a progress bar, a chevron, an arrow or a "next". Window two
is not styled as the continuation of window one because it is not one.

**3. Window one visibly closes.** After the tools row, a full width LEDGER hairline
and then 84px of nothing, the largest gap on the page. A block that terminates and
a gap that reads as a doorway. Every other gap on the site is 56 or less, so the
break is legible as a break and not as spacing.

**4. The heaviest controls are the ones that let you leave.** The download and copy
controls are the paper filled buttons. The examination entry is a quiet outlined
button in the same style as the lookup. The single most prominent thing you can do
after your certificate exists is take it. That is a hierarchy statement, not a copy
statement, and it survives being read at a glance by somebody who is skimming.

**5. The examination opens on a blank schedule row.** Borrowed from A3 entry 14 and
matched to C1's own note that a blank EXAMINATION field is a correct state. The
first thing inside window two is a two column ruled row, label EXAMINATION in the
caps stack on the left, hairline beneath, and a single centred dash in the value
column. A field that is correct while empty is the strongest available picture of
an optional step, and it is the same field that appears on the plate, so the page
and the paper agree.

**6. The certificate is already finished before window two exists on screen.** The
plate renders complete, with its countersignature rules and its testimonial clause
and its serial, the moment a name is entered. Nothing about it is greyed, dotted,
outlined or held back pending the examination. There is no empty slot on the sheet
waiting to be filled, only the schedule row that is correct blank. The visitor sees
a finished document, and a finished document does not need a second window.

What is deliberately absent: no auto scroll to the examination after issuance, no
"you may also" prompt, no completion percentage, no badge, no count of questions
answered anywhere outside window two itself, and no state anywhere on the page that
distinguishes a visitor who sat the examination from one who did not.

***

## 5. CRITIQUE OF THE PROTOTYPE

Ten findings, by severity. The prototype is a working skeleton and it does work.
It is not a design, and several of these are not stylistic.

**1. The copy on the page is not C1's copy, and it publishes invented numbers.**
Severity first because it invalidates the layout. `masthead-unofficial` is a full
sentence naming the protocol; the page has "Unofficial and unaffiliated. Nothing
here is onchain." The notice heading is "Read this before anything else"; C1
specifies "Read this before you buy anything" and argues the difference explicitly,
because the second one names the action that can hurt somebody. The primary button
says "Engrave"; C1 says "Issue the certificate". And the two download buttons read
"Download 1200 by 675" and "Download 1080 by 1080", which put invented pixel
dimensions on the face of the page, against the brief's rule number one, when C1
names sizes by weight precisely to avoid that. The lookup explainer, the exam
intro and both hints are also rewritten. Fix: bind every text node to a key in the
copy object, one key per node, so the copy owner can change a string without a
designer touching layout, and so a string can be audited by reading one file.

**2. The plate invents its own facts.** `deriveCard` produces a four digit charter
number from `1 + Math.floor(rng() * 9999)`, hard codes `branches = 1` and prints it
as "1 OF 10", and generates a date of issue between 1863 and 1928. A random four
figure number set beside "1 OF 10" reads as a rank in a set, which C1 warns against
by name. A nineteenth century DATE OF ISSUE on a certificate issued today is a
fabricated provenance rather than a joke, and it is the one thing on the sheet a
screenshot would carry into an argument. This is B2's plate, but it lands on my
page, because the page states the office issues paper today. Fix belongs to B2 and
Chief: derive nothing that looks like a position, and date the sheet today.

**3. The single bold element on the site is the only blurry thing on it.** The
canvas draws in a 1200 unit space and is presented at 940 CSS pixels, a 0.783
downscale. At DPR 1 the guilloche ribbons are drawn at `lineWidth 0.55` and land at
0.43 device pixels, the rosette at 0.4 lands at 0.31, and the tint at 0.7 lands at
0.55. None of those is a line. They are grey smear. The ribbon crossings inside a
34 unit band land squarely inside A2 section 2.5's forbidden 1.0 to 2.0 band, which
is the aliasing beat the whole section exists to warn about. Fix: the 1:1 rule in
section 3. Drawing width equals layout width equals 1008, backing store scaled by
DPR only, export rendered separately. Note also `var scale = 2 * dpr / 2;` at line
882, which is `dpr` written as the residue of an abandoned supersample, and
`cv.style.width = "940px"` at line 885, which duplicates the CSS rule at line 129,
so the presented size lives in two files.

**4. The palette is a banned default with the accent shifted from acid to gold.**
`#16211D` is a dark blue green and `#C9A85C` is a single bright hue carrying links,
the primary button, the focus ring, the chosen exam option and the reveal heading.
That is the near black plus one accent structure exactly. There is no brown black
anywhere on the page, A2's ink range is unused, and the second colour `#A32E1E`
appears only on the canvas and on a 3px left border. The green plus gold reading is
casino felt and brass, not a registry. Fix: section 1. Warm brown black ground, the
second colour restricted to paper, and no accent hue at all.

**5. The gold filled button is a second bold element, and it is the loudest thing
on the site before the engraving exists.** It passes contrast at 7.3 to 1, so this
is not an accessibility finding, it is a taste finding and it is fatal. The plate is
`hidden` until a name is entered, so on first paint the brightest, most saturated,
highest area object on the page is a 12px caps button. Fix: the primary button is a
paper block with ink text and one register rule in the second colour. Paper is not
loud, and it is the right material, because you press a paper slip at a counter.

**6. The notice is the documentation admonition callout.** 1px border, 3px red left
bar, tinted panel `#1A2723`, 13px caps heading in `#E3B0A2`, a pink that appears
nowhere else on the site. Worse, its body is 14px on a 780px measure while the
page's own body copy is 15px, so the most important text on the site is set smaller
than the least important. It passes contrast at 8.0 to 1 and it is still wrong. Fix:
section 3. Strip the border, the bar, the panel and the pink. Distinguish by measure,
size and position, and set it larger than body, not smaller.

**7. There are five inks on a two colour document.** INK, RED, BLUE `#1D4E6B`,
BRONZE `#8C6B2E` in the stamp table, plus the gold in the interface. A2's two colour
argument is that the second colour exists because it was a second physical pass with
its own ink train. A third and a fourth pass is a different and much more expensive
document, and each new hue is another thing competing with the engraving. Fix: every
stamp is INK or NUMBER, and the blind seal from A3 entry 2 uses no ink at all,
rendered as shadow and highlight only.

**8. Both signature slots are filled by the same procedural squiggle.**
`drawFlourish` scribbles a seeded bezier over both rules, so REGISTRAR and CLERK OF
THE OFFICE sign every certificate ever issued, in near identical hands, generated by
the same function. A3 entry 6's entire point is the reverse: three ruled slots, one
filled, two visibly blank, because a blank signature line on a printed form reads as
an office that exists and was not required today. Two machine drawn scrawls read as
a generator. Fix belongs to B2: three rules, one hand, two empty.

**9. Accessibility and behaviour, five items in one finding.** The canvas carries a
static `aria-label` of "An engraved commemorative charter certificate" that never
changes, so a screen reader user gets the same sentence for every distinct card;
set it from the derived card on every render and put a parallel text summary beside
the plate. The hint paragraph is not a live region, so "Nothing entered. The clerk
needs a name." is written into a `<p>` nobody hears; add `aria-live="polite"` and
`aria-describedby`. The canvas element's `height="1057.5"` is not a valid integer
attribute, so before the first render the backing store falls back to the default
150 and the plate box has the wrong aspect. `scrollIntoView({ behavior: "smooth" })`
in `doLookup` is decorative motion, and the reduced motion block at line 174 kills
`animation` and `transition` but has no effect on a behaviour passed to a JS API, so
it survives the guard; delete the scroll. And `navigator.clipboard.writeText` has no
`catch` while "Copied." is written unconditionally, so on `file://` or a denied
permission the page states something untrue.

**10. The typed string goes into the URL.** `setUrl` writes the raw input into the
query string and `history.replaceState` puts it in the address bar and in browser
history. There is no injection here, because values only ever reach the DOM through
`.value` and `textContent`. The problem is the promise. C1's `issue-instruction`
says "Nothing is checked, nothing is kept" and `scam-no-wallet` says this office
asks for no address. Pasting a wallet address then puts it in the address bar, in
history, and in every link the visitor copies. Either the shareable link is worth it
and the copy says so plainly, or the link carries the serial rather than the string.
This is Chief's call, not mine, but the page currently makes a promise it does not
keep.

***

## 6. BANNED DEFAULTS CHECK

**Cream near `#F4F1EA` with a high contrast serif and a terracotta accent.**
Not this. The page ground is `#1C1712`. The paper is `#E2DCC8`, which is
substantially darker and yellower than `#F4F1EA`, and it is never the page: it
appears only as an object lying on the counter, plus two form fields. The body face
is Palatino Linotype, a low contrast old style, and the only high contrast face on
the site is the didone, used at two sizes for the office name and the section heads.
And `#A63A1C` is not an accent: it colours no link, no button, no heading and no
state, and it is forbidden on the counter by measurement.
Where it is close, admitted: paper plus red orange is the neighbouring idea. The
difference is that the pair exists only inside the printed object, and the interface
around it has no accent colour of any kind. The default puts the terracotta on the
furniture. We put it on the paper, and nowhere else.

**Near black with one acid accent.** Not this. `#1C1712` is a warm brown black
carrying real hue, and the structure of the default, one bright colour carrying all
interactive meaning, is absent by rule rather than by taste. Every control on the
counter is CLERK text with a PENCIL boundary. There is no hue anywhere in the
interactive layer.

**A kit of identical rounded cards with soft grey shadows.** Not this. There is no
border radius anywhere on the site, no exception. There is no `box-shadow` anywhere
on the site, including under the plate, which is separated from the counter by 13.0
to 1 of value and needs nothing else. There is exactly one raised object on the page
and it is the certificate. Blocks are separated by hairlines and vertical space.
Where it is close, admitted: the hovered exam option takes a LEDGER fill, which is a
filled rectangle. It is a full measure row with square corners, no shadow and no
resting fill, which is a selected line in a ledger rather than a card. If it starts
reading as a card at build time it goes to a left bar instead.

**Gradient washes as decoration.** Not this. There is no gradient in the CSS, of any
kind, anywhere. The only gradation on the site is the tint underprint on the canvas,
which A2 section 2.3 defines as a discrete field of engine turned lines at 8 to 14
percent of the paper to ink range, drawn at 4.5 device pixels of spacing, with a
stated job: making erasure and photographic copying visible. It is a printing
artefact with a function, not a wash.

**A monospace face used for small labels as a style move.** Not this, and this one
the prototype does commit: `F_MONO` at 9px on the SERIAL line. There is no monospace
face in any of the four stacks. Serials and charter numbers use the numbering stack,
a condensed grotesque, for two reasons that are not vibes. A letterpress numbering
machine set numerals in a grotesque on a second physical pass, which is the whole
justification for the second colour in A2 section 2.2, so the face and the colour
change for the same historical reason. And a serial that a person reads off a
picture and retypes needs lining tabular figures, which Palatino does not have by
default and which canvas cannot request through `font-variant-numeric`. The
requirement is transcription, and the answer to transcription is tabular figures,
not a code face.

***

## Compliance

- No em dashes in this file. No double hyphens in this file.
- No CSS custom properties proposed, for the same reason. The palette in section 1
  is the source and the stylesheet repeats literal hex.
- Desktop only. One fixed width at 1288px minimum. No media queries except the
  reduced motion guard.
- No motion proposed anywhere. `scrollIntoView` with smooth behaviour is removed
  rather than gated, because it is decorative and the brief bans decorative motion
  outright. The reduced motion block stays as a guard against future additions.
- Every interactive element measured in section 1. Three failures found and fixed.
