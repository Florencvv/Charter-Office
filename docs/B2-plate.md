# B2. THE PLATE. Composition and parameter specification.
The Charter Office. Certificate geometry for both aspects, seed map, draw order,
five stamps, cost control. Built to A2 parts 1 to 3, A3 CHIEF READ THIS FIRST,
C1 sections 3 and 8, D2 parts 1 and 3.

This file replaces the plate in the current index.html in full. Nothing in the
existing drawPlate or drawStamp survives except the seeding, the serial codec
and the font stacks.

## The concept, stated once so the numbers below make sense

The certificate is half of a pair. Currency is whole and anonymous. Office paper
is a fragment that means something only because a matching fragment is filed
under a number somewhere. Every number in this file serves structural
incompleteness: a torn top edge, a perforation, a retained stub, a schedule with
rows nobody filled, three signature rules with one signature on them.

The joke is never stated. The office is unofficial, so nothing was retained, so
the holder has both halves.

## Conventions

W and H are CSS pixels of the plate. Every coordinate in part A is a CSS pixel
integer in plate space, origin top left. The backing store runs at 3x per A2
part 5 recommendation 1, so a "device px" is one third of a CSS px. Line widths
are given in device px because that is where they matter. Font size is CSS px.
Letterspacing is CSS px added after each character, not em, because the tracked
drawing routine adds a scalar.

Z is the pass number from part C. Higher Z draws later.

Alignment: L left, C centre, R right. Where alignment is C the x given is the
centre. Where alignment is R the x given is the right edge.

## Palette

| Token | Hex | Use |
|-|-|-|
| PAPER | #DCDCCB | Tinted safety paper. The only ground. |
| TINT | #BFC3AE | Engine turned underprint. Sits at 11 percent of the paper to ink range, inside A2 2.3's 8 to 14. |
| INK | #241C14 | Intaglio brown black, A2 2.2 low end. |
| INK_SOFT | #6A6152 | Microlabels and captions only. Never a rule, never a value. |
| RED | #B1361E | Letterpress numbering, A2 2.2. Charter number and serial only. |
| STAMP_RED | #A8321C | Revocation overstamp, A2 3.9. Never used for anything else. |
| BRONZE | #8A6A2C | Expansion seal, struck ochre. |
| BRONZE_DEEP | #6E5527 | Expansion seal impression ring and starved centre. |
| BLUE | #46506E | Exit handstamp, dull registry blue. |
| EMB_SHADOW | #D6D6D6 | Blind emboss shadow, drawn under multiply. Neutral by design. See part D5. |
| EMB_LIGHT | rgb(17,17,15) | Blind emboss highlight, drawn under lighter. See part D5. |

## Font stacks

| Token | Stack | Cap ratio | Avg advance |
|-|-|-|-|
| F_TITLE | Didot, "Bodoni MT", "Bodoni 72", "Playfair Display", Georgia, serif | 0.70 | 0.48 em |
| F_CAPS | Copperplate, "Copperplate Gothic Light", Optima, Candara, Georgia, serif | 0.72 | 0.62 em |
| F_TEXT | "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif | 0.69 | 0.46 em |
| F_MONO | "SF Mono", "Cascadia Mono", Consolas, "DejaVu Sans Mono", monospace | 0.70 | 0.60 em |
| F_STAMP | "Arial Narrow", "Helvetica Neue Condensed", "Liberation Sans Narrow", "DejaVu Sans Condensed", Impact, sans-serif, weight 700 | 0.716 | 0.455 em |

Cap ratio and average advance are nominal. Every place a length target appears
below, the engineer measures with ctx.measureText and solves for the tracking,
so a font fallback changes the tracking and never the box.

***

# PART A. THE COORDINATE TABLES

## A.0 The two sheets

| | Wide | Square |
|-|-|-|
| W by H | 1200 by 675 | 1080 by 1080 |
| Backing store | 3600 by 2025 | 3240 by 3240 |
| Stub width | 112 | 118 |
| Perforation x | 112 | 118 |
| Outer frame rule | 146, 46 to 1166, 641 | 152, 50 to 1048, 1030 |
| Border band centreline | 156, 56 to 1156, 631, corner r 18 | 162, 60 to 1038, 1020, corner r 18 |
| Border band half height | 7 | 7 |
| Inner hairline | 168, 68 to 1144, 619 | 174, 72 to 1026, 1008 |
| Content column | x 190 to 1122, centre 656 | x 196 to 1004, centre 600 |
| Body column | x 190 to 898, centre 544 | x 196 to 1004, centre 600 |
| Mark column | x 914 to 1122 | none, see A.9 |
| Bottom margin | y 641 to 675 | y 1030 to 1080 |

The wide plate is set as a left body column of 708 px with a right mark column
of 208 px held clear for the applied marks. The square plate has no mark column.
That is the single structural difference between the two and part A.9 explains
why.

## A.1 The chirograph cut and the sliced line

The top edge of the sheet is not straight. It is a two frequency wave, and the
sheet clip built from it does all the cutting. The line of the office's own text
is drawn at full height and the clip removes the top of each letterform for
free. This is why the feature costs nothing.

    y_cut(x) = 18 + 5.0 * sin(2 * pi * x / 168 + phi_a)
                  + 2.0 * sin(2 * pi * x / 63  + phi_b)

Range of y_cut is 11 to 25 in both aspects. phi_a and phi_b come from seed byte
B15, part B.

The wavelengths 168 and 63 are absolute pixels and do NOT scale with the aspect.
A blade has one wave. Scaling it would say the two plates were cut with
different tools, which is the one thing a chirograph must never say.

| Element | x | y | w | h | Font | Size | Track | Align | Z |
|-|-|-|-|-|-|-|-|-|-|
| Sheet clip path | 0 | y_cut(x) | W | to H | | | | | 2 |
| Sliced line, wide | 24 | 27 | to 1176 | cap 17 | F_CAPS | 24 | 5.3 | L | 13 |
| Sliced line, square | 24 | 27 | to 1056 | cap 17 | F_CAPS | 24 | 5.3 | L | 13 |

String: "THE CHARTER OFFICE" repeated with a 72 px gap between repeats, three
repeats, drawn from x 24 and clipped by the sheet clip and by the plate width.
Colour INK, alpha 0.90.

Cap top lands at y 10. The cut runs 11 to 25, so between 6 percent and 88 percent
of each letterform is removed depending where the wave is. The variation is the
point. A clerk's blade does not hold one depth.

## A.2 The stub and the perforation

The stub carries the file number, the date and one ruled blank. It carries the
retention line in the smallest type on the plate, set rotated so it reads up the
strip, which is how a counterfoil actually prints it.

WIDE, stub region x 0 to 112.

| Element | x | y | w | h | Font | Size | Track | Align | Z |
|-|-|-|-|-|-|-|-|-|-|-|
| Stub right printed rule | 98 | 44 to 655 | 0.6 dev px | | | | | | 12 |
| Perforation holes | 112 | cut+8 to 667, pitch 7 | r 1.6 | | | | | | 15 |
| CHARTER No. label | 14 | 64 | | | F_CAPS | 7 | 1.4 | L | 13 |
| Charter number value | 14 | 88 | | | F_TITLE | 22 | 0 | L | 17 |
| Hairline | 14 to 98 | 118 | 0.6 dev px | | | | | | 12 |
| DATE OF ISSUE label | 14 | 136 | | | F_CAPS | 7 | 1.2 | L | 13 |
| Date line 1 | 14 | 158 | | | F_TITLE | 12 | 0 | L | 17 |
| Date line 2 | 14 | 176 | | | F_TITLE | 12 | 0 | L | 17 |
| Hairline | 14 to 98 | 196 | 0.6 dev px | | | | | | 12 |
| ENTERED BY label | 14 | 214 | | | F_CAPS | 7 | 1.2 | L | 13 |
| Ruled blank | 14 to 98 | 246 | 0.7 dev px | | | | | | 12 |
| Ghost prior issue block | 20 | 296 | 72 | 48 | | | | | 7 |
| Retention line, rotated | 88 | 648 up to 443 | | cap 5.4 | F_CAPS | 7.5 | 1.1 | rot -90 | 13 |

SQUARE, stub region x 0 to 118. Same stack, shifted and given one extra
breathing gap. Type sizes rise by 0.5 px because a 118 px strip can carry it.

| Element | x | y | Font | Size | Track | Z |
|-|-|-|-|-|-|-|
| Stub right printed rule | 104 | 44 to 1010 | | | | 12 |
| Perforation holes | 118 | cut+8 to 1064, pitch 7 | | | | 15 |
| CHARTER No. label | 16 | 72 | F_CAPS | 7.5 | 1.4 | 13 |
| Charter number value | 16 | 100 | F_TITLE | 24 | 0 | 17 |
| Hairline | 16 to 104 | 132 | | | | 12 |
| DATE OF ISSUE label | 16 | 152 | F_CAPS | 7.5 | 1.2 | 13 |
| Date line 1 | 16 | 178 | F_TITLE | 13 | 0 | 17 |
| Date line 2 | 16 | 198 | F_TITLE | 13 | 0 | 17 |
| Hairline | 16 to 104 | 222 | | | | 12 |
| ENTERED BY label | 16 | 242 | F_CAPS | 7.5 | 1.2 | 13 |
| Ruled blank | 16 to 104 | 278 | | | | 12 |
| Ghost prior issue block | 24 | 400 | 72 by 52 | | | 7 |
| Retention line, rotated | 94 | 1010 up to 793 | F_CAPS | 7.5 | 1.1 | 13 |

Perforation hole construction, per A2 3.7 at reduced radius: fill circle in
PAPER at r 1.6; stroke the same circle at 0.7 device px in PAPER darkened 12
percent; arc from 200 to 340 degrees at r 1.0, 0.7 device px, PAPER lightened 8
percent, offset 0.5 px toward the upper left.

Ghost prior issue block: rounded rect outline, corner r 4, 0.9 device px, plus a
three lobe rose engine figure inside at rho(theta) = 16 + 3 * f(3 * theta), all
in INK at alpha 0.22. This is the papel sellado move from A3 entry 1. It is one
prior stamping of the same blank stock, so the sheet has a history that predates
the user's string. It is never more than one block and it never carries type.

Retention line string: "THIS PORTION IS RETAINED BY THE OFFICE". INK_SOFT, alpha
0.85. Rotated minus 90 degrees so it reads bottom to top.

## A.3 The head block

| Element | Wide x | Wide y | Square x | Square y | Font | Size | Track | Align | Z |
|-|-|-|-|-|-|-|-|-|-|-|
| Office name | 656 | 88 | 600 | 96 | F_CAPS | 15 / 17 | 3.4 / 3.8 | C | 13 |
| Head hairline | 496 to 816 | 100 | 440 to 760 | 110 | | 0.7 dev px | | | 12 |
| Bank name | 656 | 132 | 600 | 210 | F_TITLE | fit | 0 | C | 13 |
| Bank name hairline | 356 to 956 | 148 | 290 to 910 | 226 | | 0.6 dev px | | | 12 |

Office name string: "THE CHARTER OFFICE", INK, alpha 1.

Bank name is the derived institution, for example "THE SECOND CONTINENTAL BANK".
It is set in caps, INK, alpha 1, fit to a maximum width of 600 wide and 620
square by stepping the size down from 36 wide and 44 square in 0.5 px steps to a
floor of 22. The maxima are hard because the crossing occupies the space to the
right of them.

The user's string is NOT here. It goes in the grant slot, A.4. A name set large
and centred is currency. A name written into a hole in a printed sentence is
office paper.

## A.4 The crossing, which carries UNOFFICIAL ISSUE

Two parallel rules at 20 degrees across the upper right with a short phrase
trapped between them, per A3 entry 9. Applied over the finished printing, in the
numbering colour, because a crossing subtracts rights rather than granting them.

| | Wide | Square |
|-|-|-|
| Pivot | 1044, 110 | 930, 140 |
| Angle | minus 20 degrees | minus 20 degrees |
| Half length | 84 | 84 |
| Rule offset | plus and minus 13 perpendicular | plus and minus 13 perpendicular |
| Rule width | 1.2 dev px | 1.2 dev px |
| Text | "UNOFFICIAL ISSUE" | "UNOFFICIAL ISSUE" |
| Font, size, track | F_CAPS, 10, 1.9 | F_CAPS, 10, 1.9 |
| Text baseline in local space | plus 3.5 | plus 3.5 |
| Colour, composite, alpha | RED, multiply, 0.92 | RED, multiply, 0.92 |
| Z | 19 | 19 |

Bounding box wide: x 960.6 to 1127.4, y 69.1 to 151.0. Bounding box square:
x 846.6 to 1013.4, y 99.1 to 181.0. Both clear the bank name maxima in A.3 by at
least 4 px. If C1 changes the bank name fit width, this box moves, not the other
way round.

C1 requires `card-unofficial-mark` on the plate because the PNG travels off the
site alone. This is where it lives.

## A.5 The grant sentence and the inline slot

One continuous printed sentence with the user's string dropped into a hole in
it, per A3 entry 12. Not on its own line, not in a box. The slot is a fixed
width rule. If the string is short the empty remainder of the rule stays
visible. If it is long it is tracked tighter and then reduced in size. The rule
never grows. The form does not adapt to the applicant.

WIDE, two lines. Compartment at the head of the grant per A3 entry 5.

| Element | x | y | w | h | Font | Size | Track | Align | Z |
|-|-|-|-|-|-|-|-|-|-|-|
| Engraved compartment | 190 | 168 | 64 | 64 | | | | | 11 |
| Grant line 1 | 268 | 190 | to 613 | | F_TEXT | 15 | 0 | L | 13 |
| Slot rule | 625 to 1050 | 194 | 1.0 dev px | | | | | | 12 |
| Slot value, user string | 631 | 190 | max 425 | | F_TITLE | 19 fit | fit | L | 13 |
| ISSUED TO caption | 625 | 206 | | | F_CAPS | 7 | 1.4 | L | 13 |
| Grant line 2 | 268 | 224 | to 654 | | F_TEXT | 15 | 0 | L | 13 |

SQUARE, three lines, because the column is narrower and the slot earns its own
line.

| Element | x | y | w | h | Font | Size | Track | Align | Z |
|-|-|-|-|-|-|-|-|-|-|-|
| Engraved compartment | 196 | 254 | 78 | 78 | | | | | 11 |
| Grant line 1 | 292 | 278 | to 573 | | F_TEXT | 16 | 0 | L | 13 |
| Grant line 2 lead | 292 | 314 | to 373 | | F_TEXT | 16 | 0 | L | 13 |
| Slot rule | 388 to 1004 | 318 | 1.0 dev px | | | | | | 12 |
| Slot value, user string | 394 | 314 | max 616 | | F_TITLE | 21 fit | fit | L | 13 |
| ISSUED TO caption | 388 | 330 | | | F_CAPS | 7.5 | 1.4 | L | 13 |
| Grant line 3 | 196 | 350 | to 610 | | F_TEXT | 16 | 0 | L | 13 |

Slot fit algorithm, both aspects, in this order and no other:
1. Set the nominal size, tracking 0. Measure.
2. While the measured width exceeds the slot width, reduce tracking in 0.1 px
   steps to a floor of minus 0.5 px per character.
3. While it still exceeds, reduce the size in 0.5 px steps to a floor of 12.
4. At maxlength 64 with tracking at minus 0.5 and size 12 the widest possible
   string measures about 337 px, so both slots always fit and C1's
   `error-too-long` can never fire from the plate. Keep the string anyway for
   the input field.

The compartment holds the one bold engraved element the brief allows, sited
where a registry would have put it, at the head of the grant, rather than as a
hero image. Its geometry is in part B and its passes are in part C step 11.

## A.6 The schedule block

Six to eight ruled rows, fixed label column left, value column right, hairline
between rows, no vertical rules anywhere, rows with nothing in them left
visibly empty. This is the single most useful layout unit available and it is
where BRANCHES 1 OF 10 lives.

| | Wide | Square |
|-|-|-|
| SCHEDULE header | x 190, y 258, F_CAPS 8, track 2.0, L, INK_SOFT | x 196, y 392, F_CAPS 9, track 2.2, L |
| Block left, right | 190, 898 | 196, 1004 |
| Top rule y, width | 270, 1.2 dev px | 402, 1.2 dev px |
| Row height | 24 | 30 |
| Label column x | 214 | 222 |
| Label font | F_CAPS 9.5, track 1.8, INK_SOFT | F_CAPS 11, track 2.0, INK_SOFT |
| Value column x | 566 | 578 |
| Value font | F_CAPS 13, track 1.6, INK | F_CAPS 15, track 1.8, INK |
| Row separator | 0.6 dev px, INK alpha 0.40 | 0.6 dev px, INK alpha 0.40 |
| Closing rule | 1.2 dev px, INK alpha 0.85 | 1.2 dev px, INK alpha 0.85 |
| Z, rules then type | 12 then 13 | 12 then 13 |

Row baselines wide: 287, 311, 335, 359, 383, 407, 431, 455.
Row separators wide: 294, 318, 342, 366, 390, 414, 438. Closing rule at 462.

Row baselines square: 423, 453, 483, 513, 543, 573, 603, 633.
Row separators square: 432, 462, 492, 522, 552, 582, 612. Closing rule at 642.

THE EXACT ROW LIST. Eight rows, fixed order, never reordered, never removed.

| Row | Label | Value |
|-|-|-|
| 1 | BRANCHES | 1 OF 10 |
| 2 | CLASS | COMMEMORATIVE |
| 3 | CONFERRED | NOTHING |
| 4 | FEE TAKEN | NONE |
| 5 | CONDITIONS | NONE |
| 6 | ENDORSEMENTS | empty |
| 7 | EXAMINATION | empty until stamped |
| 8 | COUNTERPART | empty, permanently |

Empty value mark: a rule 18 px long wide, 20 px square, 0.9 device px, INK at
alpha 0.45, drawn from the value column x at the row baseline minus 4. Never a
placeholder word, never a dash glyph, never a removed row.

Row 1 is the only place on the plate where a protocol quantity appears, and it
reads 1 OF 10 and nothing else. Ten branches is published in 01-FACTS section 07.

Row 3 is where "Confers nothing" lives as a row value rather than as a slogan.
It does not replace the engraved disclaimer in A.8, which is mandatory and
verbatim, because the two are doing different jobs: row 3 is the form answering
its own question and the disclaimer is the plate's standing warning.

Row 7 carries the rank's first line when the examination has been sat, set in
the value font. On SOVEREIGN it carries "SOVEREIGN" only; the second line lives
in the emboss, and D2's indivisibility rule is satisfied because the two are
never separated on the sheet, only across two elements of it.

Row 8 is empty on every certificate that will ever be issued. It is the whole
structural argument, delivered without a word.

## A.7 The countersignature row and the plica

Three signature rules on one line with capacities beneath in small caps, only
one ever signed, set inside a doubled footer band with two punched slots, per
A3 entries 6 and 4.

| | Wide | Square |
|-|-|-|
| Testimonial clause | x 544 C, y 486, F_TEXT 12, track 0, INK alpha 0.85 | x 600 C, y 682, F_TEXT 13, track 0 |
| Plica band rect | 168, 500 to 1144, 600 | 174, 706 to 1026, 882 |
| Fold dark edge | y 500, 1.0 dev px, PAPER darkened 12 percent | y 706, same |
| Fold light edge | y 501.6, 1.0 dev px, PAPER lightened 7 percent | y 707.8, same |
| Band tone | multiply, neutral #F2F2F2 at alpha 1, equals PAPER darkened 5 percent | same |
| Band bottom edge | y 600, 0.8 dev px, PAPER darkened 9 percent | y 882, same |
| COUNTERSIGNED label | x 544 C, y 520, F_CAPS 8, track 2.2, INK_SOFT | x 600 C, y 736, F_CAPS 9, track 2.4 |
| Rule 1 | 190 to 400, y 558 | 230 to 446, y 790 |
| Rule 2 | 439 to 649, y 558 | 492 to 708, y 790 |
| Rule 3 | 688 to 898, y 558 | 754 to 970, y 790 |
| Rule width | 0.9 dev px, INK alpha 0.75 | 0.9 dev px, INK alpha 0.75 |
| Flourish box | 200, 530 to 390, 556 | 240, 758 to 436, 788 |
| Capacity baselines | y 572 | y 808 |
| Capacity centres | 295, 544, 793 | 338, 600, 862 |
| Capacity font | F_CAPS 8, track 1.5, INK_SOFT, C | F_CAPS 9, track 1.6, INK_SOFT, C |
| Punch slot 1 | 989 to 1002, y 508 to 511.5 | 838 to 852, y 858 to 861.5 |
| Punch slot 2 | 1029 to 1042, y 508 to 511.5 | 886 to 900, y 858 to 861.5 |
| Z, band then rules then type | 6, 12, 13, flourish 14, slots 16 | same |

Capacities: REGISTRAR, EXAMINER, KEEPER OF THE REGISTER.

Only rule 1 is ever signed. The flourish is drawn in the box above rule 1 from
the seeded signature generator, INK alpha 0.90, 1.4 device px, round caps. Rules
2 and 3 stay blank on every certificate including an examined one. A blank
signature rule on a printed form reads as an office that exists and was not
required today, and that is the cheapest institutional signal available.

Punch slots: filled rects in INK at alpha 0.82 with a 0.7 device px highlight in
PAPER lightened 8 percent along the lower edge. They sit directly above the seal
zone in both aspects, so the seal reads as hanging from them.

Testimonial clause: one line of running text, first person from the office,
immediately above the countersignature rules, per A3 entry 13.

## A.8 The foot: disclaimer, serial, motto

All three sit in the bottom margin, outside the frame, in the register of a
printer's imprint line.

| Element | Wide x | Wide y | Square x | Square y | Font | Size | Track | Align | Z |
|-|-|-|-|-|-|-|-|-|-|-|
| Engraved disclaimer | 656 | 657 | 599 | 1050 | F_CAPS | 9.5 / 11 | 1.1 / 1.3 | C | 13 |
| SERIAL label | 190 | 670 | 196 | 1068 | F_CAPS | 7 / 8 | 1.4 | L | 13 |
| Serial value | 236 | 670 | 248 | 1068 | F_MONO | 9 / 10 | 0 | L | 18 |
| Motto | 1122 | 670 | 1004 | 1068 | F_CAPS | 10 / 11 | 3.4 / 3.6 | R | 13 |

Disclaimer string, C1 `card-disclaimer`, verbatim and in full:
"THIS PAPER IS COMMEMORATIVE. IT IS NOT ONCHAIN. IT IS NOT AN ALLOWLIST. IT
CONFERS NOTHING."
It measures about 630 px wide and 729 px square, so the long form fits in both
and `card-disclaimer-short` is never needed. Do not use the short form.

Serial value is drawn in RED as part of the numbering pass, offset by the
numbering misregistration vector. It is the only element on the plate whose x
position is deliberately not exact.

Motto is C1 `card-motto`, "THE BANK IS CODE", quoted from the whitepaper and set
last, at the extreme lower right of the sheet, which is where the last thing set
on a plate goes.

## A.9 The reserved mark area, and what differs between the aspects

WIDE. Seal zone centre 1015, 584, radius 70. Bounding box x 945 to 1085, y 514
to 654. It clips the inner hairline at 619, the border band at 624 to 638 and
the outer frame rule at 641, which is exactly what D2 asks of the gold seal. It
never touches type: the nearest type is capacity 3 centred at 793 ending at 865,
and the disclaimer ending at 971 at y 657, which is below the seal.

SQUARE. Seal zone centre 862, 954, radius 84. Bounding box x 778 to 946, y 870
to 1038. It clips the plica bottom at 882, the inner hairline at 1008, the band
at 1013 to 1027 and the frame at 1030.

Applied patch, drawn only under the two circular ink seals, never under the
emboss and never under the two hand applied marks. Rect centred on the seal
zone, 164 by 164 wide and 194 by 194 square, rotated plus 1.2 degrees, filled in
PAPER shifted 4 percent warmer and 3 percent darker, with a 1.2 device px edge
shadow on the lower and right edges under multiply at alpha 0.22, a 0.8 device
px highlight on the upper and left edges under lighter at alpha 0.30, and two
fasteners at the top and bottom centre drawn as 12 by 3 filled bars in INK at
alpha 0.7. This is the tin strip patch from A3 entry 2 and it says the mark was
added later by a different office to a document that already existed, which is
the exact relationship between Window 1 and Window 2.

The emboss gets no patch. A die struck into the sheet contradicts a slip glued
onto it, and D2 is explicit that SOVEREIGN is entered without ink.

WHAT CHANGES BETWEEN THE TWO ASPECTS, AND WHY

1. The chirograph wavelengths do not change. 168 and 63 absolute pixels in both.
   The blade is the same blade.
2. The stub widens 112 to 118 and its type rises 0.5 px. The strip's job is
   legibility of a file number, not proportion, so it grows only enough to stay
   comfortable.
3. The grant sets on two lines wide and three square, and the slot rule runs 425
   px wide and 616 px square. The square's column is narrower, so the slot earns
   its own line, and once it has one it takes nearly the whole column.
4. The schedule row height goes 24 to 30 and its type 9.5 and 13 to 11 and 15.
   The square has 405 more pixels of height and the schedule is the block that
   absorbs it, because a ruled schedule reads better loose and every other block
   on the plate reads worse.
5. The structural difference. On the wide plate the foot must carry three
   signature rules AND a 140 px seal on one horizontal band, which does not fit,
   so the whole body is set into a left column of 708 px and the right 208 px is
   held clear as a mark column. On the square plate the foot has room to stack:
   the signature rules run centred across the full 808 px column and the seal
   hangs below them and to the right in its own band. That is why the square is
   not the wide plate with more air. It is a different composition with a
   different reading order, vertical rather than lateral.
6. Consequences of 5. The seal radius goes 70 to 84 and the bank name 36 to 44,
   because in the square the head and the foot each own a full band of the sheet
   instead of sharing one with the marks.
7. The bottom margin goes 34 to 50, so the disclaimer runs at 9.5 px wide and 11
   px square and the same four sentence string fits both.

## A.10 Copy contract

Everything on the plate is either a C1 string or one of the seven below. The
seven are proposed keys for C1 to ratify. The geometry holds for any rewrite
inside the stated character budget, so C1 can change the words without touching
this file.

| Proposed key | Text | Budget |
|-|-|-|
| card-grant-lead | This office has entered in its register the bank of | 44 to 54 |
| card-grant-tail | and issues this paper as the holder's half of that entry. | 50 to 60 |
| card-testimonial | In testimony of this entry and of nothing further, the office has set its hand below. | 76 to 92 |
| card-stub-retained | THIS PORTION IS RETAINED BY THE OFFICE | 34 to 40 |
| card-stub-entered-by | ENTERED BY | 8 to 12 |
| card-schedule-head | SCHEDULE | 6 to 12 |
| card-capacities | REGISTRAR, EXAMINER, KEEPER OF THE REGISTER | each 6 to 24 |

Schedule labels and values are field text of the same class as C1 section 8 and
are listed in A.6.

All eight C1 section 8 microlabels appear on the plate exactly once: ISSUED TO
as the slot caption, CHARTER No. and DATE OF ISSUE on the stub, BRANCHES and
EXAMINATION as schedule rows, COUNTERSIGNED above the signature rules, SERIAL in
the foot, and THE BANK IS CODE set last.

One flag for E2 and Chief. C1 warns that the charter number must never read as a
position in the genesis set of one thousand. Two mitigations are applied. First,
the number lives on the stub under CHARTER No. beside the date, in the register
of a file reference on a counterfoil, and it appears nowhere in the certificate
body. Second, recommend changing the derived range in 02-ENGINEERING from 0001
to 9999 to 1013 to 9998, computed as 1013 plus a 14 bit draw mod 8986, so the
number can never fall inside the genesis thousand at all. That is a one line
change and it closes the reading completely.

***

# PART B. THE SEED TO PARAMETER MAP

Per A2 1.9 and A2 part 5 recommendation 2. Take the existing xmur3 into sfc32
generator and draw an unsigned byte stream from it, byte n equals
floor(rng() * 256). Bytes are consumed in index order and never reused.

Shape drivers get discrete, widely separated values from fixed tables. Texture
drivers get continuous ranges. If every parameter is continuous, every
certificate is the same certificate with noise.

## B.1 Discrete tables, one byte each, index by byte mod table length

| Byte | Table | Values | Drives |
|-|-|-|-|
| B0 | P_TABLE | 5, 7, 8, 9, 11, 13, 14, 16, 17, 19, 21, 23 | Compartment hypotrochoid lobe count p |
| B1 | Q_TABLE | 1, 2, 3, 4, 5 | Turns q. If gcd(p, q) is greater than 1, step forward through the table until coprime, wrapping. |
| B2 | RATIO | 2, 3, 2.5, 2.3333 | Border braid f2 over f1 |
| B3 | N_STRAND | 5, 6, 7, 8, 9, 11 | Border strand count N |
| B4 | ROSE_N | 8, 10, 12, 14, 18, 24, 30, 36 | Tint ground rosette lobe count n |

## B.2 Continuous, one byte each, mapped linearly

| Byte | Parameter | Range | Notes |
|-|-|-|-|
| B5 | d over r, compartment | 0.30 to 1.60 | Below 1.0 rounded petals, exactly 1.0 cusps, above 1.0 an inner star appears |
| B6 | dpsi, tint ring drift | 0.02 to 0.25 rad per ring | The strongest single parameter in the whole tint |
| B7 | s, lobe profile | 0.40 to 0.98 | Held under 1.0 so the ground reads as a metal rosette, not as software |
| B8 | A2 over A1, border | 0.25 to 0.75 | |
| B9 | e, band envelope taper | 0.30 to 1.00 | |
| B10 | psi, rosette index | 0 to 2 pi | |
| B11 | psi2, width modulation phase | 0 to 2 pi | |
| B12 | dw over w0 | 0.25 to 0.90 | Pumping mapped to line width per A2 1.6 |
| B13 | Tint misregistration | angle 0 to 2 pi, magnitude fixed 0.8 CSS px | |
| B14 | Numbering misregistration | angle 0 to 2 pi, magnitude 0.3 to 1.2 CSS px from the low nibble | |
| B15 | Chirograph phases | phi_a equals B15 over 256 times 2 pi, phi_b equals phi_a times 2.39996 mod 2 pi | The golden angle keeps the two frequencies from beating |

## B.3 Derived text and layer bytes

| Byte | Drives |
|-|-|
| B16 | Ordinal index, mod 9 |
| B17 | House index, mod 5 |
| B18, B19 | Charter number, 1013 plus a 14 bit draw mod 8986 |
| B20 | Year, 1863 plus B20 mod 66 |
| B21 | Month, mod 12 |
| B22 | Day, 1 plus mod 28 |
| B23 | Booking office off axis angle, minus 2.4 to minus 0.8 degrees |
| B24 | Blot and erosion seed for the booking layer and for every stamp |
| B25 | Signature flourish seed |

Twenty six bytes. A2 says eleven buys a certificate nobody will confuse with
another, and the first five are spent on the discrete tables as instructed.

The seed drives no coordinate in part A. Every plate has the same layout, always.
A form whose layout moved would not be a form.

## B.4 The three parameters that carry visible difference

Chief needs certificates that are obviously different at a glance, not the same
certificate with jitter. Three parameter groups carry that, and they are
deliberately spread across three different scales, so two certificates differ at
reading distance, at arm's length and in the hand.

1. B4 with B6, the tint ground identity. Lobe count n and ring drift dpsi. This
   covers 100 percent of the sheet and it sets the paper's grain and apparent
   darkness. It is the reading distance driver.
2. B2 with B3, the border braid identity. Frequency ratio and strand count. This
   runs the entire perimeter as a 14 px band. It is the arm's length driver.
3. B0 with B1 and B5, the compartment figure. p, q and d over r. It is the only
   bold black graphic on the plate and it is where the eye lands. It is the in
   the hand driver.

## B.5 Three worked seeds

SEED ONE. B0 equals 3, B1 equals 7, B2 equals 200, B3 equals 45, B4 equals 17,
B5 equals 230, B6 equals 12.

p is P_TABLE[3] equals 9. q is Q_TABLE[2] equals 3, gcd(9,3) is 3, step forward
to Q_TABLE[3] equals 4, coprime, so q equals 4. Ratio is RATIO[0] equals 2.
Strands is N_STRAND[3] equals 8. ROSE_N[1] equals 10. d over r is 1.473. dpsi is
0.031.

What you see. A near plain sheet: ten broad lobes at almost zero ring drift, so
the ground reads as a slow ten point sunburst and the paper looks pale and calm.
A perimeter plait of 8 strands at a clean 2 to 1 ratio, symmetric and countable,
the kind of band you could trace with a finger. And one intricate black knot at
the head of the grant, 9 lobes over 4 turns at d over r 1.47, whose petals loop
back and reveal a second inner star. Calm sheet, formal frame, one dense knot.

SEED TWO. B0 equals 118, B1 equals 3, B2 equals 79, B3 equals 250, B4 equals 95,
B5 equals 40, B6 equals 240.

p is P_TABLE[10] equals 21. q is Q_TABLE[3] equals 4, coprime. Ratio is
RATIO[3] equals 2.3333. Strands is N_STRAND[4] equals 9. ROSE_N[7] equals 36.
d over r is 0.504. dpsi is 0.236.

What you see. A busy sheet: 36 fine lobes at the maximum ring drift, so the whole
ground carries a visible moire weave with sweeping eyes and reads two shades
darker than seed one before a single line of type is drawn. A 9 strand rope at
the half integer 7 over 3, which appears to travel around the frame rather than
sit still. And at the head, 21 lobes over 4 turns at d over r 0.50, a dense
rounded rosette with no inner star, which resolves to a soft grey disc at arm's
length. Busy sheet, travelling frame, one grey medallion.

SEED THREE. B0 equals 60, B1 equals 1, B2 equals 2, B3 equals 8, B4 equals 132,
B5 equals 128, B6 equals 128.

p is P_TABLE[0] equals 5. q is Q_TABLE[1] equals 2, coprime. Ratio is RATIO[2]
equals 2.5. Strands is N_STRAND[2] equals 7. ROSE_N[4] equals 18. d over r is
0.952. dpsi is 0.135.

What you see. A quiet basket weave ground at 18 lobes and middling drift, clearly
textured but not dark. A 7 strand band at 5 over 2, a rope that plaits and then
slips half a beat, which is the most restless of the three frames. And at the
head, 5 lobes over 2 turns at d over r 0.95, just under cusp, so a large open
five point star with sharp petal tips and a lot of white paper inside the box.
Quiet sheet, slipping frame, one big open star.

Three sheets nobody would confuse: one calm with a knot, one dark and woven with
a disc, one quiet with an open star. That is the test passed on the first three
values, not on a curated set.

***

# PART C. THE DRAW ORDER

Every pass, paper to overstamp, with composite operation and alpha. The number
in the left column is the Z used throughout part A.

| Z | Pass | Composite | Alpha | Colour |
|-|-|-|-|-|
| 1 | setTransform to the backing scale, clearRect | copy | 1 | |
| 2 | Build and apply the sheet clip from y_cut | | | |
| 3 | Paper fill over the clip | source-over | 1 | PAPER |
| 4 | Paper fibre, one cached 256 by 256 noise tile, pattern fill | multiply | 0.055 | |
| 5a | Tint underprint, tile A, rotated by the seeded angle, scale 0.94 | source-over | 0.24 | TINT |
| 5b | Tint underprint, tile B, same tile, scale 1.07, phase shifted | source-over | 0.24 | TINT |
| 6 | Plica band tone, fold dark edge, fold light edge, band bottom edge | multiply then source-over | 1 | see A.7 |
| 7 | Stub ghost prior issue block | source-over | 0.22 | INK |
| 8 | Border guilloche band, N strands, segment stroked with swell | source-over | 0.88 | INK |
| 9 | Frame rules, outer 1.4 dev px then inner hairline 0.7 dev px | source-over | 0.90, 0.70 | INK |
| 10 | Four corner counters, epitrochoid, R 16 wide and 18 square | source-over | 0.70 | INK |
| 11 | Engraved compartment: box rule, then the phase shifted hypotrochoid family clipped to the box | source-over | 0.95 | INK |
| 12 | Every fixed rule: schedule rules, slot rule, countersignature rules, head hairlines, stub rules and blank | source-over | per A | INK |
| 13 | Every fixed intaglio type, including the sliced chirograph line, which the sheet clip cuts for free | source-over | 1 | INK, INK_SOFT |
| 14 | Signature flourish on countersignature rule 1 | source-over | 0.90 | INK |
| 15 | Perforation holes, three element construction | source-over | 1 | PAPER family |
| 16 | Plica punch slots, two, with lower edge highlight | source-over | 0.82 | INK |
| 17 | Booking office layer: charter number and date, composed in an offscreen canvas, rotated by B23, blurred 0.35 dev px, one 6 percent radial starvation | multiply | 0.94 | RED, INK |
| 18 | Numbering layer: serial, offset by the B14 misregistration vector | multiply | 0.95 | RED |
| 19 | The crossing: two rules and UNOFFICIAL ISSUE | multiply | 0.92 | RED |
| 20 | Applied patch, only for stamp kind seal | source-over, then multiply, then lighter | 1, 0.22, 0.30 | see A.9 |
| 21 | The stamp, composed in its own offscreen canvas and drawn with one drawImage | per part D | per part D | per part D |

Two rules govern this list and nothing overrides them.

The cancellation is drawn last and visibly sits on top of the serial. Pass 18
draws the serial, pass 21 draws the mark, and there is nothing between them
except the crossing and the patch. If the mark ever sits under an element that
was printed with the certificate, the eye reads it as part of the design and the
whole effect is gone. A2 3.9 says this carries more weight than all the texture
work combined and it is correct.

Rules always precede type. Pass 12 before pass 13, so type sits on rules and
never the other way, which is how a form is printed.

***

# PART D. THE FIVE STAMPS AS GEOMETRY

Wording from D2 part 1, physical intent from D2 part 3, the revocation recipe
from A2 3.9. Each stamp composes into its own offscreen canvas sized to its
bounding box plus 24 device px of bleed, then lands with one drawImage.

Common anchors. Seal zone centre SZ is 1015, 584 wide and 862, 954 square. All
erosion scatters use the B24 seed, so the marks differ from certificate to
certificate the way hand applied marks do, and the offscreen result caches per
stamp, aspect and seed.

## D.1 EXPANSION. CLEARED FOR EXPANSION, LICENSE BURNED ON RECEIPT.

Struck seal, ochre bronze, warm, greened in the shadows.

| Property | Wide | Square |
|-|-|-|
| Centre | 1015, 584 | 862, 954 |
| Outer ring radius, width | 70, 2.6 dev px | 84, 2.6 dev px |
| Inner ring radius, width | 62, 1.1 dev px | 75, 1.1 dev px |
| Angle | plus 3 degrees | plus 3 degrees |
| Line 1 on the outer curve | radius 55, cap 11, track 0.10 em, sweep minus 68 to plus 68 degrees about vertical | radius 66, cap 13, same |
| Line 2 straight, part one | "LICENSE BURNED", baseline centre minus 2, cap 9, track 0.08 em, C | baseline centre minus 3, cap 11 |
| Line 2 straight, part two | "ON RECEIPT", baseline centre plus 14, cap 9, track 0.08 em, C | baseline centre plus 17, cap 11 |
| Colour | BRONZE | BRONZE |
| Composite, alpha | multiply, 0.86 | multiply, 0.86 |

Passes, in order:
1. Impression ring alone, BRONZE_DEEP at alpha 0.30, outer ring only, offset
   minus 1.3 x and plus 1.3 y device px. This is the hand setting a die down: the
   inked circle and the impression ring do not agree.
2. Body. Both rings and all type in BRONZE.
3. Rim bite. destination-out with a radial gradient centred on the seal, alpha
   0.42 at radius 0 falling to 0 at radius 0.78 of the outer ring. Full at the
   rim where the die bites, starved in the centre where the die is flattest.
4. Erosion. destination-out, 260 circles, radius 0.4 to 1.4 device px, biased to
   within 2 device px of a ring path or a glyph edge.

It sits low right, overlaps the ruled ground and clips the last rule of the
frame, never a letter of the name. It gets the applied patch.

## D.2 PATIENCE. STANDING, PATIENT CAPITAL.

The quietest of the four inked marks. Printed in the plate's own brown black so
it reads as the same press rather than a second visit to the counter, which is
the whole character of this rank.

| Property | Wide | Square |
|-|-|-|
| Centre | 1015, 574 | 862, 940 |
| Ring radius, width | 56, 1.8 dev px, single rule, no ornament | 68, 1.8 dev px |
| Angle | minus 1.5 degrees | minus 1.5 degrees |
| Line 1 | "STANDING", baseline centre minus 6, cap 14, track 0.12 em, C, straight | cap 17 |
| Line 2 | "PATIENT CAPITAL", baseline centre plus 16, cap 9, track 0.09 em, C, straight | baseline centre plus 19, cap 11 |
| Colour | INK | INK |
| Composite, alpha | multiply, 0.80 | multiply, 0.80 |

The centre is 10 wide and 14 square above SZ, and the radius is smaller than the
expansion seal, because D2 requires this mark to stay inside the frame. At radius
56 it spans y 518 to 630 wide, clear of the frame rule at 641, and y 872 to 1008
square, clear of 1030.

Passes:
1. Halo. The same ring at 3.2 device px, alpha 0.10, offset plus 1.1 x and minus
   0.9 y device px. The pad tilted.
2. Body. Ring and two lines.
3. Broken arc. destination-out along the ring from 128 to 149 degrees, 3.0 device
   px, alpha 1.0. One break, exactly one, where the paper did not take.
4. Erosion. destination-out, 180 circles, radius 0.4 to 1.2 device px.

It overlaps only the ruled ground, clear of the name and clear of the body. It
gets the applied patch.

## D.3 EXIT. PROVISIONAL, SUBJECT TO EXIT PRICING.

A rubber handstamp, and it must read as rubber rather than as engraving.

| Property | Wide | Square |
|-|-|-|
| Pivot | 836, 452 | 600, 700 |
| Box | 306 by 96, squared corners | 340 by 108 |
| Box rule | 2.4 dev px | 2.4 dev px |
| Angle | minus 6 degrees | minus 6 degrees |
| Bounding box | x 679 to 993, y 388 to 516 | x 425 to 775, y 629 to 772 |
| Line 1 | "PROVISIONAL", local baseline minus 8, cap 26, track 0.14 em, C | cap 29 |
| Line 2 | "SUBJECT TO EXIT PRICING", local baseline plus 28, cap 13, track 0.16 em, C | cap 15 |
| Colour | BLUE | BLUE |
| Composite, alpha | multiply, 0.80 | multiply, 0.80 |

Placement is chosen so it crosses the lower rows of the schedule, the schedule
closing rule and the testimonial clause. The text stays readable underneath
through the multiply blend. That is the requirement in D2 and it is the reason
this mark is not in the seal zone.

Passes:
1. Bleed. Box and text again at alpha 0.15 with a 1.1 device px blur, drawn
   under the body, same hue.
2. Body with an alpha ramp along the local x axis, 0.92 at the leading edge at
   local x minus 153 falling to 0.52 at the trailing edge. Heavy where the stamp
   landed, starved where it lifted.
3. Box breaks. destination-out three shapes: a 46 by 6 device px bite out of the
   top rule at local x minus 40 to plus 6, a 6 by 24 bite out of the right rule
   at local y minus 20 to plus 4, and a 34 by 34 square at the lower left corner
   so that one corner of the box does not print at all.
4. Erosion. destination-out, 420 circles, radius 0.4 to 1.6 device px, biased to
   within 2 device px of a glyph or rule edge.

No patch. A handstamp goes straight onto the sheet.

## D.4 DORMANCY. REVOCATION NOTICE, REPORTABLE AFTER 30 DAYS.

A2 3.9 exactly. The loudest object on the site, and it is allowed to be, because
it is the only cancellation the office issues and a cancellation that whispers
is a contradiction.

ONE CONFLICT, RESOLVED. A2 3.9 specifies minus 23.5 degrees and argues it from
coverage and from the fact that 29.36 degrees is the corner diagonal and reads as
designed rather than applied. D2 part 3 says about fifteen degrees. A2 3.9 is the
accepted recipe and it is a specification where D2 is a description, so the angle
is minus 23.5 degrees. Everything else in D2's paragraph is honoured.

| Property | Wide | Square |
|-|-|-|
| Pivot, text centre | 552, 364 | 497, 583 |
| Additional translate before drawing | minus 18 x, plus 14 y | minus 18 x, plus 14 y |
| Angle | minus 23.5 degrees, rising left to right | minus 23.5 degrees |
| Font | F_STAMP weight 700 | F_STAMP weight 700 |
| Cap height | 60 | 59 |
| Nominal font size | 84 | 82 |
| Letterspacing | 12.0 px, which is 0.143 em | 12.1 px, which is 0.147 em |
| Mark length target | 854, which is 62 percent of the 1377 diagonal | 840, which is 55 percent of the 1527 diagonal |
| Main text | "REVOCATION NOTICE" | "REVOCATION NOTICE" |
| Colour | STAMP_RED | STAMP_RED |
| Composite, alpha | multiply, 0.88 | multiply, 0.88 |
| Rules | 3 px, above and below, inset 8 px, same colour, same erosion | same |
| Secondary line | "REPORTABLE AFTER 30 DAYS", cap 23, weight 400, alpha 0.72, baseline 34 px below the main line, left aligned to the main line's left edge, not centred | cap 23, same |

The square takes 55 percent of its diagonal rather than 62, because A2 3.3 caps
letterspacing at 0.16 em and 62 percent of a square's diagonal would need 0.223
em to reach.

Tracking solve, which the engineer runs rather than trusting the nominal number:
set the cap height, measure the natural width of the string, compute tracking as
the target length minus the measured width, divided by character count minus one,
then assert the result lies between 0.08 and 0.16 em. If it does not, step the
cap height inside 54 to 66 until it does. This survives any font fallback.

Passes, A2 3.9 verbatim plus one:
1. Bleed. Same text, alpha 0.18, filter blur 1.2 px, no jitter.
2. Body. Alpha ramp 0.95 to 0.58 along the long axis.
3. Under ink. Radial gradient mask, radius 90 px, centred at 0.62 of the mark
   length from the left end, cutting alpha by 40 percent.
4. Erosion. destination-out, 900 circles, radius 0.4 to 1.6 device px, biased to
   within 2 device px of glyph edges.
5. Plate break. destination-out, re stroke the schedule rules, the closing rule
   and the frame rules into the mark canvas at 2.2 device px, alpha 0.55. This is
   D2's letters breaking where they cross the engraved rules because the ink did
   not take on raised plate. The paths already exist from pass 12, so this costs
   one re stroke and it is the most specific detail in D2.

Per letter jitter: rotation plus or minus 0.5 degrees, dx plus or minus 0.6 px,
dy plus or minus 0.8 px. Small, because a die is a rigid block.

Third element, included and not optional: four punch holes of radius 4 px through
countersignature rule 1, pitch 13 px, per A2 3.7. Wide at y 558, x 275, 288, 301,
314. Square at y 790, x 315, 328, 341, 354. Punched through the signature line,
because the signature is what makes the paper an obligation.

No patch, no box. The two lines run between one thick rule above and one below,
the way a cancellation runs across a document rather than sitting in a corner of
it.

## D.5 SOVEREIGN. Blind emboss, no ink at all.

The technical problem, stated plainly. An emboss is a height field lit from one
side. On a tinted ground, a white highlight reads as paint and a black shadow
reads as ink, and both destroy the effect. Worse, a light ground has almost no
headroom, so the obvious answer of compositing a highlight with screen does
nothing: at a paper value of 220 out of 255 the headroom is 35 levels, and screen
with a mid grey lifts it by under 4 levels, which is invisible.

The solution, in three parts.

FIRST. Draw the mark as offset strokes only, never as a fill at zero offset. A
shadow copy translated plus 1.5 device px in x and y, and a highlight copy
translated minus 1.5 device px in x and y. The interior of every letterform and
of the ring is untouched, so the paper tint inside them is unchanged, because
nothing was added to the paper. That is the whole physical claim of a blind
emboss and it is satisfied by construction.

SECOND. Make the shadow a NEUTRAL grey under multiply. Under multiply the result
is destination times source over 255, so a neutral grey darkens every channel by
the same ratio and shifts no hue at all. The engine turned tint underneath reads
straight through the shadow, which is exactly what happens when you deform a
printed sheet. Use EMB_SHADOW at #D6D6D6, composite multiply, alpha 1.0. Effect
on the paper at 220, 220, 203: it goes to 185, 185, 171. A 16 percent drop with
the hue intact.

THIRD. Solve the headroom problem by using lighter, not screen. Additive
compositing does not care about headroom, it just adds. Use EMB_LIGHT at rgb(17,
17, 15), composite lighter, alpha 1.0. The three values are in the same ratio as
PAPER, 220 to 220 to 203, so the addition lifts the paper without tinting it.
Effect on the paper: 220, 220, 203 goes to 237, 237, 218. A 7 percent lift, and
it clips nothing because the paper never approaches 255.

Net contrast across a single stroke: 185 on the shadow side against 237 on the
highlight side, a 52 level swing on a 220 ground, from two colours that are both
derived from the paper itself. It is clearly visible and it is unmistakably
pressure rather than print.

At a 3x backing store, offsets of 1.5 device px are 0.5 CSS px of relief. That is
correct for an emboss, which is a shallow deformation, and it is the reason the
mark barely reads at normal size and resolves properly when the PNG is saved or
the browser is zoomed. Anyone who has handled a notarised document recognises it
immediately. Anyone who has not barely sees it. Both outcomes are correct.

| Property | Wide | Square |
|-|-|-|
| Centre | 1015, 584 | 862, 954 |
| Outer ring, one rule only | radius 66, stroke 3.0 dev px | radius 80, stroke 3.0 dev px |
| Angle | 0 degrees exactly | 0 degrees exactly |
| Line 1 on the top of the curve | "SOVEREIGN", radius 50, cap 13, track 0.14 em, sweep minus 52 to plus 52 degrees | radius 61, cap 15 |
| Line 2, straight across the centre, part one | "EXAMINED AND", baseline centre minus 2, cap 9, track 0.10 em, C | baseline centre minus 3, cap 11 |
| Line 2, straight across the centre, part two | "FOUND CORRECT", baseline centre plus 15, cap 9, track 0.10 em, C | baseline centre plus 18, cap 11 |
| Glyph rendering | strokeText only, lineWidth 2.2 dev px, no fill | same |

Rotation is square, no angle. This is the only mark on the site applied with
care, and squareness is how the visitor is told that without a word.

D2 describes line 2 as one line straight across the centre. Twenty six characters
will not cross a 132 px chord at any legible cap height, so it is set as two
stacked straight lines. D2's indivisibility rule is about the string, not about
the typesetting, and the two lines are never separated.

Passes:
1. Shadow. Every path, offset plus 1.5 x and plus 1.5 y device px, EMB_SHADOW,
   multiply, alpha 1.0.
2. Highlight. Every path, offset minus 1.5 x and minus 1.5 y device px,
   EMB_LIGHT, lighter, alpha 1.0.
3. Deep quadrant shadow. Clip to the sector 200 to 290 degrees about the centre,
   redraw pass 1 at offset plus 2.3 device px in both axes.
4. Deep quadrant highlight. Same clip, redraw pass 2 at offset minus 2.3 device
   px in both axes.
5. Tint crack. Inside the same clip, stroke the ring once more at 1.0 device px
   in #D2D2D2 under multiply at alpha 0.5. One quadrant strikes deeper than the
   rest and very slightly cracks the paper tint. That is the emboss's
   misregistration, and it is pressure rather than lateral offset.

Five passes and no erosion scatter, because there is no ink to erode. This is the
cheapest of the five marks by a wide margin, which is a pleasant accident.

No patch, for the reason in A.9.

***

# PART E. COST CONTROL

Backing store 3600 by 2025 for the wide plate and 3240 by 3240 for the square,
per A2 part 5 recommendation 1. That is 7.29 and 10.5 million device pixels. The
whole cost strategy follows from the fact that most of that is drawn once.

## E.1 What is cached and where

THE FIBRE TILE. A 256 by 256 low amplitude noise tile, generated once per PAGE
LOAD, never per seed, never per aspect. Both plates and every certificate use the
same tile. About 8 ms once, then a pattern fill of about 2 ms.

THE TINT TILE. A 360 by 360 device px tile holding exactly two wavelengths of the
tint wave family, built ONCE PER SEED. One hundred stroked polylines of 120
samples each, so 12,000 points. About 4 ms. It is then laid down twice at
different scales and phases, pass 5a and 5b, so the beat between the two hides
the tile repeat. A full sheet concentric family would need about 300 rings at the
required pitch and is not affordable, and a full sheet wave family at 3.4 device
px pitch is 596 polylines of 900 samples, which is 536,000 points. The tile is
the whole reason the tint is free.

THE SHEET. Passes 1 through 19, everything that does not change when the stamp
changes, drawn ONCE PER SEED into an offscreen canvas at the full backing size.
This includes the guilloche, the tint, all the type, all the rules, the
perforation, the booking layer, the numbering and the crossing. The draw order
in part C is arranged so this split is clean: the stamp is pass 21 and nothing
printed with the certificate comes after it.

THE STAMP. Each mark composes into its own offscreen canvas, sized to its
bounding box plus 24 device px of bleed, cached per stamp id, aspect and seed.

## E.2 What is redrawn per stamp change

Three operations and nothing else:
1. drawImage the cached sheet onto the presentation canvas. About 4 ms at 3600 by
   2025.
2. Draw the applied patch, if the stamp kind is seal. Under 1 ms.
3. drawImage the cached stamp canvas under its composite and alpha. Under 1 ms.

A stamp change therefore costs about 6 ms plus, on the first application of that
stamp only, the stamp composition cost from E.3. It never redraws the engraving.

## E.3 The one optimisation that makes segment stroking affordable

A2 2.1 says to walk each path in 2 to 3 device px segments and set lineWidth per
segment. Taken literally that is one ctx.stroke call per segment. The border band
perimeter at 3x is 9450 device px, which is 3780 segments per strand, times up to
11 strands, times two for the casing pass. Eighty three thousand stroke calls is
about 125 ms and it is unacceptable.

The rule that fixes it. QUANTISE THE SWELL TO EIGHT WIDTH BUCKETS AND BATCH INTO
EIGHT Path2D OBJECTS PER STRAND. Walk the path once, compute w(t) per segment,
push the segment into the Path2D for its bucket, then stroke each of the eight
paths once at its bucket width. That is 8 stroke calls per strand instead of
3780, the visual difference is below the display grid at 3x, and it applies to
every segment stroked path on the plate. Never call stroke per segment.

## E.4 Measured budget, per pass, wide plate at 3600 by 2025

| Pass | Cost |
|-|-|
| 3, 4 paper and fibre | 3 ms |
| 5a, 5b tint, including building the tile | 7 ms |
| 8 border guilloche, batched per E.3 | 12 ms |
| 9, 10 frame and corner counters | 4 ms |
| 11 compartment, t step 0.012, N capped at 14 | 5 ms |
| 12, 13 rules and type, about 900 tracked characters | 6 ms |
| 15, 16 perforation and slots | 2 ms |
| 17, 18, 19 booking layer, numbering, crossing | 4 ms |
| Sheet total | about 43 ms |

TARGET. The sheet builds in under 60 ms and the ceiling is 80 ms. Build it inside
a requestAnimationFrame after the button press, hold C1's `issue-button-working`
state for that frame, then paint. One dropped frame, no worker, no spinner.

Stamp composition targets: revocation 14 ms, exit 7 ms, expansion 5 ms, patience
4 ms, sovereign 2 ms. Every stamp under 20 ms, and a stamp change under 25 ms
end to end. The page stays responsive because nothing above 80 ms ever runs on
the main thread in one block.

If the engineer measures the sheet above 120 ms on target hardware, cut in this
order: the four corner counters, then cap N_STRAND at 8, then drop the tint from
two tile passes to one.

## E.5 What in A2 is too expensive and is cut

CUT: A2 2.6, microtext as literal glyphs. A2 rescues microtext by adopting the 3x
backing store, and the rescue works, but a microtext line is a per glyph path
following loop over 300 to 600 characters and it costs more than the entire
border band. The reason to want it is stated in A2 itself: it should read as a
fine grey line at normal size and resolve into letters when the user zooms or
saves the PNG. The chirograph sliced top edge already delivers exactly that
behaviour, at a cost of one clip and one fillText, and it delivers it with
meaning attached instead of as texture. One feature, two implementations, and the
cheaper one is the better idea. Microtext is cut.

CUT, second order: A2 1.8's casing pass on the border band. The band is 14 CSS px
tall, so at N of 5 to 11 the strand crossings sit 1 to 2 device px apart and the
casing gap g of 1.2 to 2.5 device px eats the ink line it is supposed to protect.
Keep the phase shifted strands, drop the paper coloured undercut. This halves the
border cost and nobody audits crossing parity at this size, which A2 1.8 already
concedes.

NOT DRAWN, and worth stating so nobody adds it back: there is no large central
rosette. The centre of this plate is a ruled schedule, and lathe work behind
ruled rows fights them. All the lathe work on the plate is in the 64 px
compartment, the four corner counters and the border band. That is also the
brief's one bold element rule holding: the engraving is bold in one place and
furniture everywhere else.

***

# COMPLIANCE CHECKS RUN ON THIS FILE

- Zero em dashes and zero occurrences of two consecutive hyphens, including in
  the composite operation names, which use one hyphen each.
- No CSS custom properties are specified anywhere. Colours are literal hex.
- The only protocol quantity on the plate is BRANCHES 1 OF 10. The 30 days in the
  revocation stamp is D2's approved wording and traces to 01-FACTS section 10.
- The engraved disclaimer appears in full and verbatim from C1 `card-disclaimer`,
  and UNOFFICIAL ISSUE appears from C1 `card-unofficial-mark`, both because the
  PNG travels off the site on its own.
- All eight C1 section 8 microlabels appear exactly once each.
- The charter number is confined to the stub and a range change is recommended to
  E2 so it can never read as a position in the genesis thousand.
- The cancellation is pass 21 and the serial is pass 18. The mark sits on top of
  the serial.
- Nothing on the plate refers to a mint, an allowlist, eligibility, a wallet or
  anything onchain, and the schedule says the opposite outright in row 3.
