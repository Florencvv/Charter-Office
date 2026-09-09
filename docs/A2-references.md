# A2 REFERENCES. Security printing, curve mathematics, cancellation marks.

Scope note. Target surface is a single canvas at 1200x675 CSS pixels. Every
technique below is judged against that surface. Techniques that cannot survive
it are marked CUT with a reason. No banknote images enter the repository, per
00-BRIEF. These are techniques and numbers only.

Convention used throughout. W = 1200, H = 675, DPR = device pixel ratio of the
backing store. "px" means CSS pixel unless it says device px.

***

# PART 1. CURVE MATHEMATICS

## 1.1 The hypotrochoid. The central rosette.

A point at distance d from the centre of a circle of radius r rolling inside a
fixed circle of radius R.

    x(t) = (R - r) * cos(t) + d * cos( ((R - r) / r) * t )
    y(t) = (R - r) * sin(t) - d * sin( ((R - r) / r) * t )

Closure. Write R / r = p / q in lowest terms. The curve has p lobes and closes
after q turns, so sweep t over [0, 2 * pi * q]. Never set r by hand. Set
p and q, then r = R * q / p.

| Parameter | Range | What it does visually |
|-|-|-|
| p (lobes) | 5 to 23 | The dominant identity of the figure. Prime p gives one clean star. Composite p gives nested sub symmetry that reads as a different machine. This is seed driver number one. |
| q (turns) | 1 to 7, gcd(p, q) = 1 | q = 1 is a plain flower. q >= 2 makes the lobes cross each other and the figure reads as woven rather than drawn. Seed driver number two. |
| d / r | 0.30 to 1.60 | Below 1.0 rounded petals. Exactly 1.0 cusps. Above 1.0 the petals loop back and a second inner star appears. Seed driver number three. |
| R | 150 to 260 px | Scale only. Not a seed driver. |
| t step | 0.004 to 0.012 rad | Below 0.004 you pay for nothing. Above 0.015 the crossings visibly chord. |

Ranking matters. Changing p, q or d/r changes what the pattern *is*. Changing R,
line width or step count changes only how noisy it looks. Seeds must be spent on
the first three.

## 1.2 The epitrochoid. Outer bands and corner counters.

Rolling circle on the outside.

    x(t) = (R + r) * cos(t) - d * cos( ((R + r) / r) * t )
    y(t) = (R + r) * sin(t) - d * sin( ((R + r) / r) * t )

Same closure rule with R / r = p / q. Lobes point outward, so the silhouette is
a gear or a sun rather than a flower. Use epitrochoid for anything that touches
the edge of a panel and hypotrochoid for anything that fills the middle of one.
Mixing both in the same rosette is what real lathe work did.

| Parameter | Range | Visual |
|-|-|-|
| p | 8 to 32 | Tooth count of the outer silhouette. Higher p suits a thin border band. |
| d / r | 0.5 to 1.2 | Above 1.0 the outer teeth split into paired spikes. |

## 1.3 Guilloche is a family, not a curve.

The single most important fact in this document. One trochoid drawn once looks
like a spirograph doodle. Guilloche is N phase shifted copies of the same
trochoid, drawn as one object.

    for k = 0 .. N-1:
        phi_k = 2 * pi * k / N
        draw curve(t + phi_k)

| Parameter | Range | Visual |
|-|-|-|
| N | 6 to 48 | Texture, not shape. N below 12 reads as ornament with countable strands. N above 30 reads as a tint, and the individual line stops being legible. Pick a side and commit. |

A second variant shifts phase only inside the epicycle term, which twists the
band like rope rather than rotating the whole figure:

    x_k(t) = (R - r) * cos(t) + d * cos( ((R - r) / r) * t + phi_k )
    y_k(t) = (R - r) * sin(t) - d * sin( ((R - r) / r) * t + phi_k )

## 1.4 The straight line band. Borders and the panel rule.

The border ribbon is not a trochoid. It came off a straight line engine, which
is a planer, not a lathe. The correct model is a travelling wave family. Two
frequencies, not one, or it looks like a heart monitor.

    y_k(x) = y0 + env(x) * [ A1 * sin(2*pi*f1*x + phi_k)
                           + A2 * sin(2*pi*f2*x + 2*phi_k) ]
    phi_k  = 2 * pi * k / N
    env(x) = sin(pi * x / L) ^ e

| Parameter | Range | Visual |
|-|-|-|
| f2 / f1 | 2, 3, 5/2, 7/3 | The braid identity. Integer ratios give a symmetric plait. Half integer ratios give a rope that appears to travel. Seed driver. |
| A2 / A1 | 0.25 to 0.75 | Below 0.25 the second frequency is invisible. Above 0.8 the band self intersects into a mess. |
| N | 4 to 12 | Strand count. Above 12 in a band under 30 px tall the strands merge. |
| A1 | 6 to 18 px | Band half height. |
| f1 | 1 / 40 to 1 / 90 cycles per px | Wavelength 40 to 90 px. Shorter than 35 px and the band reads as hatching. |
| e | 0.30 to 1.00 | Taper at the band ends. e near 0.3 gives the engraved look where the ribbon fades into the corner ornament. |

For a closed border running the full perimeter, parameterise by arc length along
a rounded rectangle path rather than by x, and keep f1 constant in arc length so
the corners do not stretch.

## 1.5 Lissajous. Cartouche and oval fills.

    x(t) = A * sin(a * t + delta)
    y(t) = B * sin(b * t)

| Parameter | Range | Visual |
|-|-|-|
| a : b | 3:2, 4:3, 5:4, 7:5, 5:2 | Lobe topology. Low ratios read as an ornamental knot. Ratios above about 9 read as scribble at this size. |
| delta | 0 to pi / 2 | Opens the figure from a folded line to a full loop. delta near 0 collapses it. Use 0.35 to 1.2 rad. |
| A : B | 1.4 to 2.6 | Oval eccentricity for a cartouche. |

Phase shifted family as in 1.3 with N of 5 to 16.

## 1.6 The rose engine proper. Radial cam, not epicycle.

A rose engine is not a spirograph. The headstock rocks or pumps against a lobed
cam called a rosette while the spindle turns. That is a polar radius function,
and it produces a different family than any trochoid.

    rho(theta) = R0 + A * f(n * theta + psi)
    f(u)       = sign(sin u) * |sin u| ^ s

| Parameter | Range | Visual |
|-|-|-|
| n | 6 to 36 | Rosette lobe count. Seed driver. |
| s | 0.40 to 2.50 | Lobe profile. s below 1 gives flat topped square lobes, which is what a metal rosette actually cuts. s = 1 is a pure sine and looks like software. s above 1.6 gives thin spikes. Set s below 1 for the historical look. |
| A / R0 | 0.03 to 0.18 | Cut depth. Above 0.2 the lobes swallow the ring spacing. |
| psi | 0 to 2*pi | Index. Free seed byte. |

Two separate machine motions map to two separate canvas properties, and this is
the part people get wrong:

- Rocking modulates the radius. Map to rho above.
- Pumping modulates the depth of cut, which is ink volume, which is line width.
  Map to stroke width, not to position:

    w(theta) = w0 + dw * f(m * theta + psi2)

  with m an independent lobe count 2 to 12 and dw / w0 in 0.25 to 0.9.

Pumping mapped to line width is the single cheapest change that makes canvas
lines stop looking plotted.

## 1.7 The engine turned tint ground. Concentric family with drift.

    rho_k(theta) = R0 + k * dR + A * f(n * theta + k * dpsi)
    k = 0 .. K-1

| Parameter | Range | Visual |
|-|-|-|
| dpsi | 0.02 to 0.25 rad per ring | The strongest parameter in the whole tint. Small dpsi gives clean concentric rings. Larger dpsi rotates each ring against the last and the crossing points sweep out the moire eyes that make an engine turned ground look alive. Seed driver. |
| dR | 2.5 to 6.0 device px | Ring pitch. See the hatching rule in 2.5. |
| K | 20 to 90 | Ring count. Bounded by dR and the panel radius. |

## 1.8 Interlaced band ornament. A draw order rule, not a formula.

True over and under weaving needs per crossing clipping and is not worth the
cost. Use casing, the technique road maps use for bridges:

1. For each strand k, stroke the path in paper colour at width w + 2g.
2. Immediately stroke the same path in ink colour at width w.
3. Iterate k in a fixed order. Later strands sit on top.

g of 1.2 to 2.5 device px. At 1200x675 the eye reads a woven band and does not
audit crossing parity. Alternating parity per crossing is CUT as not worth the
code.

## 1.9 Seed to parameter mapping. The rule that makes seeds look different.

Take the hash as a byte stream. The failure mode is mapping every parameter to a
continuous range, which produces one hundred certificates that all look like the
same certificate with jitter.

Rule. Shape drivers get discrete, widely separated values from fixed tables.
Texture drivers get continuous ranges.

Discrete tables, one hash byte each, index by byte mod table length:

    P_TABLE  = [5, 7, 8, 9, 11, 13, 14, 16, 17, 19, 21, 23]   # rosette lobes
    Q_TABLE  = [1, 2, 3, 4, 5]                                 # turns, reject gcd > 1
    RATIO    = [2/1, 3/1, 5/2, 7/3]                            # border braid
    N_STRAND = [5, 6, 7, 8, 9, 11]                             # band strands
    ROSE_N   = [8, 10, 12, 14, 18, 24, 30, 36]                 # rose engine lobes

Continuous, one byte each, mapped linearly into the ranges in the tables above:
d/r, dpsi, s, A2/A1, e, psi, psi2, dw/w0, misregistration vector.

Budget. Eleven bytes buys a certificate nobody will confuse with another. Spend
the first five on the discrete tables.

***

# PART 2. SURFACE AND TEXTURE

## 2.1 Intaglio line swell.

What the machine did. The engraved line varies in width and in depth along its
length. A deeper cut holds more ink, so the printed line is both wider and
darker where it is deep, and the ink stands above the paper. That variation is
the visual signature of intaglio and it is the reason a photocopy of a note
looks wrong even when the geometry is right.

Canvas has no variable width stroke. Two implementations:

- Offset polygon. Compute left and right offsets of the centreline at each
  sample and fill the resulting ribbon. Correct, and about ten times the code.
- Segment stroking. Walk the path in short segments and set lineWidth per
  segment. At segment length of 2 to 3 device px the join artefacts are below
  the display grid.

Use segment stroking. Swell law:

    w(t) = w0 * (1 + kappa * |cos(omega * t + phi)|)

| Parameter | Range | Visual |
|-|-|-|
| w0 | 0.5 to 1.4 device px | Base line weight. |
| kappa | 0.30 to 1.10 | Swell depth. Below 0.3 invisible. Above 1.2 the line reads as a tapered brush, which is calligraphy, not engraving. |
| omega | 1 to 4 cycles per full path | Slow. Real swell serves tonal modelling, so it changes over the length of a stroke, not every few pixels. |

lineCap must be round. Engraved lines end in a point, never a square.

## 2.2 Ink colour and the two colour numbering.

Intaglio ink on nineteenth century work is a brown black, not a pure black. In
the range #241C14 to #2B2119.

The serial number is a different colour because it is a different process. The
face was intaglio printed from the engraved plate, then the sheet went to a
letterpress numbering machine that added a unique number to each note, after the
plate work was already dry. Because it was a separate pass with its own ink
train, it could be and was a different colour, most often a red orange or a
green. The BEP's last coloured United States note before 2003, the 1905 twenty
dollar Gold Certificate, carried a golden tint with a red seal and red serial
number, and that combination is the exact historical anchor for the palette in
00-BRIEF.

Suggested numbering colour: #B1361E to #C2451F.

Consequence for our render order. The number is drawn after the engraving, in a
second colour, with its own slight misregistration. It must never share a path
or a colour with the lathe work.

## 2.3 Border, frame and tint underprint. Three different things.

Three terms that get used interchangeably and are not the same:

- Tint underprint. A low contrast background printed first, under everything,
  usually by a flatter process than intaglio. Its job is to make erasure and
  photographic copying visible. It is a field, it has no edge of its own, and it
  extends under the type.
- Border. The repeating ornamental band that runs along the edge of the paper.
  It is a linear pattern with a direction and a wavelength. Section 1.4.
- Frame. The closed rectangle or panel outline that separates one region from
  another, often carrying a counter at each corner. It is a shape, not a
  pattern, and it terminates the design.

Tint contrast rule. The tint should sit at 8 to 14 percent of the paper to ink
range. Above about 18 percent it competes with the engraving and violates the
one bold element rule in 00-BRIEF.

## 2.4 The counter, the value panel, and cartouches.

The counter is the small circular lathe work medallion that carries the
denomination numeral, anchored in a corner of the frame. Geometrically it is a
small epitrochoid rosette, R of 28 to 44 px, with the numeral knocked out of it
or overprinted on it.

Lathe work ovals and cartouches. An oval boundary generated as a Lissajous or as
a hypotrochoid with p = 2, filled with a phase shifted family at higher N, with
a clear centre for text. The clear centre is made by masking the family against
an inset oval, not by not drawing the lines. Real plates cut the lines and then
burnished the centre, and the tell is that the pattern lines terminate at the
oval edge rather than fading.

Monograms. Two or three overlapping letterforms, stroked in the same weight as
the surrounding lathe work, set inside a counter or cartouche. Historically
these were cut by hand and sit inside machine cut ornament, so a slight weight
mismatch is correct rather than a mistake.

## 2.5 Fine line hatching and the moire trap.

Hatching frequency on real work runs roughly 3 to 9 lines per millimetre. At
1200 px standing for about 180 mm of certificate, that is 6.7 px per mm, so the
historical range is 0.7 to 2.2 px spacing. That is directly on top of the
display grid.

Hard rule. Never let hatch or ring spacing fall between 1.0 and 2.0 device px.
That band produces aliasing beat patterns against the pixel grid that look like
a JPEG artefact, not like engraving. Use 2.5 to 6.0 device px, or render at
higher DPR and let the downscale do the work.

## 2.6 Microtext. Mostly CUT, with one route that works.

At 1200x675 with DPR 1, a historically correct microtext cap height of 0.1 to
0.3 mm lands at 0.7 to 2.0 px. It is unreadable and it aliases. As literal
glyphs at DPR 1 this is CUT.

The route that works. Render the canvas backing store at 3x, that is 3600x2025
device px, and present it at 1200x675 CSS px. Microtext then has 2 to 6 device
px of cap height. At normal viewing it reads as a fine grey line, and when the
user zooms the browser or saves the PNG the letters resolve. That is exactly the
behaviour of the real feature, and it is the reason to adopt 3x anyway.

Do not fake microtext with a dotted line. Dots are evenly spaced and glyphs are
not, and the difference is visible even when the letters are not.

## 2.7 Misregistration.

Multi colour security work is printed in separate passes and the passes never
line up perfectly. Offset the tint layer and the numbering layer from the
intaglio layer by a seeded vector of 0.3 to 1.2 px, different vector per layer.
Costs two lines of code and removes the machine perfect look that gives away a
generated image.

## 2.8 The void pantograph, for reference only.

Worth knowing because it is the ancestor of the modern VOID overprint. The word
VOID is set in coarse dots and the surrounding field in fine dots at a matched
apparent grey. The eye integrates both to one tone. A copier acts as a low pass
filter, drops the fine dots and keeps the coarse ones, and returns a sheet with
VOID across it. Reproducible in canvas at 3x, but it only pays off if someone
photocopies the output. CUT for our purposes, but the coarse dot and fine dot
construction is a good texture idea for the tint ground.

***

# PART 3. CANCELLATION AND REVOCATION MARKS

## 3.1 Taxonomy of the real marks.

From the numismatic, scripophily and philatelic sources in Part 4:

| Mark | What it is | Where it sits |
|-|-|-|
| Pen or manuscript cancel | "Cancelled" plus the date written across the face and signed by the officer | Across the face, over the vignette, signed near the signature block |
| Handstamp | Rubber or metal die on an ink pad, applied by hand, purple or red ink | Angled across the face, usually over the value and the signatures |
| Punch cancel | Small holes punched through the signatures specifically | Through the signature line |
| Punch out or hole cancel | One large hole taken out of the note | Centre or over the portrait |
| Perfin | Holes spelling SPECIMEN or CANCELLED | Across the middle of the face |
| Cut cancel | Struck with a bladed tool, producing a single line X or a double line cross | Centre of the face |
| Corner cuts and halving | Treasury redemption practice. Four holes punched, lower corners cut off, then the note cut in half before maceration | Corners and the vertical centre |
| Overprint | Text applied by the issuing authority after the note is printed, as a production step | Diagonal across obverse and reverse |

Note the distinction that matters for us. A cancellation is applied to one
individual sheet by hand, so it is uneven, angled and off centre. An overprint is
a production step applied to a whole run, so it is even, repeatable and
registered to the plate. They look different, and choosing the wrong one is the
main way this element fails.

## 3.2 Why cancellation marks were placed at an angle.

Four real reasons, all of which we should honour:

1. Coverage per strike. The diagonal of a rectangle is the longest line through
   it. On a 1200x675 face the corner to corner diagonal is 1377 px against 1200
   horizontal, and the diagonal passes through more of the interior.
2. It crosses the three things that make the paper negotiable in a single pass:
   the value counter, the vignette and the signature block. This is the same
   logic as the philatelic obliterator or killer, a heavy handstamp whose whole
   purpose is to cover enough of the face that the item cannot be presented
   again.
3. It reads as a later addition. Every printed element on a certificate sits on
   a horizontal baseline. An angled mark is unmistakably not part of the plate,
   which is the entire message.
4. It cannot be trimmed off. A horizontal band near an edge can be cut away. A
   diagonal through the centre cannot.

Angle ranges. Production overprints on specimen notes typically run about 20 to
35 degrees from horizontal. Hand applied cancellations are looser, 15 to 45
degrees, and are rarely on the exact corner to corner diagonal because the clerk
did not measure.

Do not use 29.36 degrees on our surface. That is exactly atan(675 / 1200), the
corner to corner diagonal, and a mark that lands on it reads as designed rather
than applied. Use 22 to 26 degrees.

## 3.3 Letterforms.

Historic handstamps and overprints use heavy condensed sans capitals, what the
period called gothic, or a slab serif Egyptian. Some fancier dies used shaded or
outlined Tuscan faces. Letterspacing is generous because a die cutter needed
clearance between characters and because thin gaps clog with ink.

For us:

| Property | Value | Why |
|-|-|-|
| Case | Uppercase only | No historic cancel handstamp used lowercase |
| Family | Condensed grotesque, weight 700 to 800 | Reads at an angle over busy lathe work |
| Letterspacing | 0.08 to 0.16 em | Die cutter clearance |
| Cap height | 4.5 to 5.5 percent of W, so 54 to 66 px | Big enough to dominate, small enough to leave the engraving legible |
| Mark length | 55 to 70 percent of the diagonal | Full width reads as a graphic band, not a stamp |
| Rules | Optional 3 px rule above and below, inset 8 px | Common on official dies. Include or omit, never outline the letters |

## 3.4 Ink density and the hand applied signature.

The forensic literature on rubber stamp impressions lists the observable
features of a hand applied strike: uneven ink saturation within and between
characters, feathering and bleeding at letter edges, rounded beginnings and
endings, partial impressions caused by uneven pressure and angle of
application, and defects specific to the individual die from manufacture or
wear.

Reproduce those in this order. The list is ranked by how much each one buys.

1. Non uniform alpha across the mark. One low frequency gradient along the long
   axis, alpha from 0.95 at one end to 0.55 at the other. This alone does most
   of the work.
2. Edge erosion. Render the text to an offscreen canvas, then composite a
   scatter of small circles with globalCompositeOperation set to
   destination-out. 700 to 1200 circles, radius 0.4 to 1.6 device px, biased to
   within 2 px of a glyph edge.
3. Bleed. A first pass of the same text at alpha 0.15 to 0.22 with a 1.0 to 1.5
   px blur, drawn under the main pass, same hue, lighter. This is ink wicking
   into paper fibre.
4. One under inked region. A soft radial mask cutting 30 to 50 percent of alpha,
   radius about 90 px, placed off centre along the mark. This is the corner of
   the die that did not touch the pad.
5. Per letter jitter. Rotation plus or minus 0.5 degrees, x plus or minus 0.6
   px, y plus or minus 0.8 px. Keep it small. A die is a rigid block, so large
   per letter jitter reads as a joke rather than as a stamp.
6. Position offset. Never centre the mark on the composition centre. Offset by
   15 to 25 px in one axis and 10 to 20 px in the other.

## 3.5 What not to do.

- No pure red. Use the red orange of a historic overprint, near #A8321C, or the
  purple red of an aniline stamp pad, near #7A2246.
- No drop shadow. Ink does not cast one.
- No outline or stroke on the letters.
- Do not apply multiply at full strength or the engraving under it turns to mud.
  Multiply at 0.85 to 0.92 global alpha.
- Do not make it straight, centred or complete. All three are printing, not
  stamping.
- Do not put it under the serial number. It goes on top of everything.

## 3.6 SPECIMEN practice, for the commemorative disclaimer.

Documented practice for invalidating a sample note or certificate:

- The word SPECIMEN, or SPECIMEN NO VALUE, or CANCELLED, overprinted diagonally
  across both faces, most often in red.
- Serial numbers set to all zeros or all nines rather than a real number.
- Holes punched or perforated through the paper, sometimes spelling out the word
  SPECIMEN as a perfin.
- A printer's archive control number added separately from the serial.
- Stock and bond specimens from the American Bank Note Company carry the same
  three tells: a SPECIMEN stamp, punched holes spelling specimen, and a serial
  of zeros.

Waterlow and Sons and De La Rue were the principal producers of specimen notes
in this tradition. Waterlow was acquired by De La Rue in 1961.

For our certificate the honest analogue is a SPECIMEN overprint plus an all zero
serial. Adding a zero serial is stronger than adding more words, because it is
the tell a collector actually looks for.

## 3.7 Punch, perfin and cut cancel in canvas.

Punch hole. Do not draw a plain paper coloured circle. Three elements:

    1. Fill circle, paper colour, radius r.
    2. Stroke circle, radius r, 0.8 device px, colour 12 percent darker than
       paper. This is the torn fibre edge.
    3. Arc from 200 to 340 degrees, radius r - 0.6, 0.8 device px, colour 8
       percent lighter than paper, offset 0.5 px toward the light. This is the
       debossed lip.

r of 3.5 to 4.5 px at W = 1200. Pitch 1.6 * diameter. Perfin letters on a 5 by 7
grid, so the word VOID at 4 letters plus gaps needs about 26 columns, which at
pitch 11 px is 286 px of width. That fits.

Cut cancel. A single line X or a double line cross, struck with a blade. Draw as
a paper coloured line of 2.5 to 4 px flanked by two hairlines of 0.6 px at 20
percent darker than paper, with a small non straightness of 1 to 2 px lateral
deviation over the length. Blades wander.

Punch through the signatures, not through the middle of the vignette. That is
where redemption clerks punched, because the signature is what makes the paper
an obligation.

## 3.8 Charter revocation and receivership, the document tradition.

Bond and coupon cancellation practice, which is the closest legal analogue to
revoking a charter, is consistent across statutes: the officer writes or stamps
CANCELLED and the date across the face of the instrument and signs the
endorsement, and the cancelled instrument is retained for a statutory period
before destruction. Redeemed United States national bank notes went further:
four holes punched, lower corners cut off, cut in half, then destroyed in a
macerator that ground them to pulp sold as bookbinders board.

Two things to steal from that tradition:

- The mark carries a date and an endorsement, not only a word. CANCELLED alone
  is a rubber stamp. CANCELLED plus a date plus initials is a record.
- Cancellation and destruction are separate acts. A cancelled document still
  exists and is still filed. That is the right register for a certificate that
  confers nothing but is still on file.

## 3.9 The recipe. Our revocation overstamp.

Exact numbers for W = 1200, H = 675, backing store at 3x.

    Layer order:   engraving, tint, serial number, THEN this mark. Last.
    Angle:         -23.5 degrees, rising left to right. Not 29.36.
    Pivot:         text centre at (0.46 * W, 0.54 * H) = (552, 364)
    Offset:        additionally translate by (-18, +14) px before drawing
    Text:          one line of 2 or 3 words, uppercase
    Font:          condensed grotesque, weight 700, cap height 58 px
    Letterspacing: 0.12 em
    Mark length:   target 62 percent of the diagonal, about 854 px
    Colour:        #A8321C
    Composite:     multiply, globalAlpha 0.88
    Rules:         3 px, above and below, inset 8 px, same colour, same erosion

    Pass 1, bleed:     same text, alpha 0.18, filter blur 1.2px, no jitter
    Pass 2, body:      alpha ramp 0.95 to 0.58 along the long axis
    Pass 3, under ink: radial gradient mask, r = 90 px, centred at 0.62 of the
                       mark length, cuts alpha by 30 to 50 percent
    Pass 4, erosion:   destination-out, 900 circles, r 0.4 to 1.6 device px,
                       biased within 2 px of glyph edges
    Per letter jitter: rotation +/- 0.5 deg, dx +/- 0.6 px, dy +/- 0.8 px

    Secondary line, optional: date and clerk initials at the same angle, cap
    height 23 px, weight 400, alpha 0.72, baseline 34 px below the main line,
    left aligned to the main line's left edge, not centred.

    Optional third element: four punch holes of r = 4 px through the signature
    line, pitch 13 px, per 3.7.

The one rule that makes this work. The mark is drawn last, on its own layer, and
it visibly sits on top of the serial number. Everything else is polish. If the
mark sits under any element that was printed with the certificate, the eye reads
it as part of the design and the effect is gone.

***

# PART 4. REFERENCES

Rights column states reuse status of the source text or images. We reproduce no
images from any of these. Techniques and numbers only, per 00-BRIEF.

## Curve mathematics and machines

1. Epitrochoid, Wolfram MathWorld.
   https://mathworld.wolfram.com/Epitrochoid.html
   Parametric equations and the rational ratio closure condition. Rights:
   Wolfram, reference only, formulas are not copyrightable.

2. Hypotrochoid, Wolfram MathWorld.
   https://mathworld.wolfram.com/Hypotrochoid.html
   Parametric equations, the a = 2b ellipse case, the h = b hypocycloid case,
   the h = a - b rose case, cusp count rule. Rights as above.

3. Lissajous Curve, Wolfram MathWorld.
   https://mathworld.wolfram.com/LissajousCurve.html
   Frequency ratio and phase delta as the two governing parameters. Rights as
   above.

4. Geometric lathe, Wikipedia.
   https://en.wikipedia.org/wiki/Geometric_lathe
   The machine that cut banknote and postage plates, also called a guilloche
   lathe, developed early in the nineteenth century as an anti forgery measure,
   adapted from an ornamental turning lathe. Rights: CC BY-SA 4.0.

5. Rose engine lathe, Wikipedia.
   https://en.wikipedia.org/wiki/Rose_engine_lathe
   Rosette as a cam on the spindle, rocking versus pumping motion, rubber as
   cam follower. Rights: CC BY-SA 4.0.

6. Straight line engine turning, Wikipedia.
   https://en.wikipedia.org/wiki/Straight_line_engine_turning
   Upright slide, cross slide, slide rest and pattern bar. Closer to a planer
   than to a lathe, which is why border bands are wave families and not
   trochoids. Rights: CC BY-SA 4.0. Stub quality, use for the mechanism only.

7. Ornamental Turning Institute Book of Knowledge, rose engine section.
   http://otbok.info/index.php?n=Main.RoseEngineLathe
   and https://www.otbok.info/index.php?n=Main.ApproachesForImplementingTheRoseEngineLathesMovement
   Practitioner detail on implementing rose engine movement, amplitude, phasing
   and index. The strongest machinist source found for parameter intuition.
   Rights: community wiki, reference only.

8. Guilloche, part 2, Society of North American Goldsmiths technical article.
   https://snagmetalsmith.org/wp-content/uploads/2016/04/GuillochePart2SNAG.pdf
   Metalsmith facing account of rosette selection and machine setup. Note: the
   PDF is image only, so it does not machine read. Human read required.
   Rights: SNAG, reference only.

9. Bank of England Museum, Plates and dies.
   https://www.bankofengland.co.uk/museum/online-collections/banknotes/plates-and-dies
   Describes the rose engine as a lathe with a hinged headstock pivoting against
   a rosette to cut wave patterns, and holds dated examples: an 1855 Britannia
   vignette die by Daniel Maclise, a circa 1900 "I promise to pay" die, and a
   circa 1900 intaglio sum block plate for a five pound note. Rights: Bank of
   England copyright. Reference only, no image reuse.

10. Metropolitan Museum of Art, banknote motifs associated with Cyrus Durand,
    American, 1787 to 1868, and A. B. and C. Durand and Company, active 1824 to
    1832. Roughly 1824 to 1842.
    https://www.metmuseum.org/art/collection/search/393989 (oval lathe work
    ornament resembling a lace ruff)
    https://www.metmuseum.org/art/collection/search/393965 (panel of lathe work
    composed of tiny 2s each set in a diamond surrounded by a star)
    https://www.metmuseum.org/art/collection/search/393958 (band of lathe work
    ornament with two monograms using the letters U.S.)
    https://www.metmuseum.org/art/collection/search/393954 (band of lathe work)
    The single best primary corpus for what geometric lathe ornament actually
    looked like, including monograms inside lathe work and the numeral in
    diamond in star construction described in 2.4. Rights: many Met collection
    images are Open Access CC0, check each object page. We still reproduce none.

## Printing, surface and terminology

11. Bureau of Engraving and Printing, History.
    https://www.bep.gov/currency/history
    1862 authorisation of fine line engraving and geometric lathe work patterns
    plus Treasury seal and engraved signatures as counterfeit deterrents. Spencer
    Clark's presses for overprinting seals, 1862. The 1905 twenty dollar Gold
    Certificate as the last coloured note before 2003, with a golden tint and a
    red seal and red serial number. Dry intaglio rotary presses from 1957.
    Rights: United States government work, public domain.

12. National Archives, Record Group 318, Records of the Bureau of Engraving and
    Printing.
    https://www.archives.gov/research/guide-fed-records/groups/318.html
    Finding aid: https://www.archives.gov/findingaid/stat/discovery/318
    Rights: United States government work, public domain.

13. Banknote glossary, NumisAsia.
    https://numisasia.com/banknote-glossary/
    Definitions used in Part 2: guilloche as lathe produced interlocking
    geometry, rosette as the circular lathe work element that frames the
    denomination numeral or anchors a corner of the frame, underprint as the
    background tints laid before the intaglio, vignette as the pictorial
    engraving with soft edges, overprint as anything added by the issuing
    authority after printing, intaglio as ink forced into recessed grooves
    producing tactile ridges, letterpress as the relief process used for serial
    numbers and seals, microprinting as text reading as an unbroken line to the
    eye. Rights: site copyright, reference only.

14. Void pantograph, Wikipedia.
    https://en.wikipedia.org/wiki/Void_pantograph
    The big dot little dot construction, and the copier as a low pass filter
    that aliases the hidden word into view. Rights: CC BY-SA 4.0.

## Cancellation, revocation and specimen

15. Punch Cancellation, Society of Paper Money Collectors.
    https://www.spmc.org/collector/punch-cancellation
    Notes redeemed for gold or silver were normally destroyed, and were
    sometimes spared by cancelling instead. Small hole punches through the
    signatures were one means. Rights: SPMC, reference only.

16. Punch Out Cancellation, or Hole Cancellation, SPMC.
    https://www.spmc.org/collector/punch-out-cancellation-or-hole-cancellation
    A large hole removed from the note to show it is cancelled. Rights: SPMC.

17. Office of the Comptroller of the Currency, Life of a Banknote.
    https://www.occ.gov/about/who-we-are/history/managing-nations-currency/life-of-a-banknote.html
    Redemption Division practice: four holes punched, lower corners cut off,
    notes cut in half by machine, then destroyed in a macerator that produced
    pulp rolled into bookbinders board and sold at forty dollars a ton. Largest
    single day of destruction 27 June 1894 at 151 million dollars. Expert
    counters and a destruction committee. Rights: United States government work,
    public domain.

18. Grading Standards, Scripophily USA.
    https://scripophilyusa.org/collector-info/faq/grading-standards/
    Four cancellation families: stamps of varying colours and sizes, punches,
    pen or manuscript, and cuts. Cancellation severity varies widely for the
    same method and heavy cancellation lowers grade. Written cancellations
    superimposed over the vignette are described directly. Rights: Scripophily
    USA, reference only.

19. Fiscal cancel, Wikipedia.
    https://en.wikipedia.org/wiki/Fiscal_cancel
    Cancel types: pen crosses and initials, handstamps in purple or red ink,
    perforations, serrated roller marks, parallel cuts, embossing, deliberate
    tearing. Establishes purple and red as the fiscal convention against black
    for postal. Rights: CC BY-SA 4.0.

20. Killer, philately, Wikipedia.
    https://en.wikipedia.org/wiki/Killer_(philately)
    The obliterator or killer as a heavy handstamp of bars, cork or crude
    devices whose purpose is to obscure almost the whole face so the item cannot
    be reused. The design rationale behind our angle and coverage numbers.
    Rights: CC BY-SA 4.0.
    Related: https://en.wikipedia.org/wiki/Cancellation_(mail)

21. Specimen banknote, Wikipedia.
    https://en.wikipedia.org/wiki/Specimen_banknote
    Specimens are deformed by overprinting and by perfin punching with SPECIMEN,
    SPECIMEN NO VALUE or CANCELLED, and carry serials of repeated zeros or nines
    plus separate control numbers. Rights: CC BY-SA 4.0.

22. Stack's Bowers, Specimen World Banknotes.
    https://stacksbowers.com/specimen-world-banknotes/
    Waterlow and Sons and De La Rue as the principal specimen producers,
    Waterlow acquired by De La Rue in 1961, and the perforated, punch cancelled
    and overprinted combination as the standard treatment. Rights: Stack's
    Bowers, reference only.

23. SWGDOC Standard for Examination of Rubber Stamp Impressions.
    https://www.swgdoc.org/documents/SWGDOC%20Standard%20for%20Examination%20of%20Rubber%20Stamp%20Impressions.pdf
    The forensic feature list behind section 3.4: even or uneven ink saturation,
    feathering and bleeding at letter edges, rounded beginnings and endings,
    over inked and under inked impressions, partial impressions, variation with
    pressure and angle of application, and die specific defects from manufacture
    or wear. The most useful single source in Part 3. Rights: SWGDOC, freely
    distributed standard.

24. American Bank Note Company Records, Smithsonian National Museum of American
    History, NMAH.AC.1285.
    https://sova.si.edu/record/nmah.ac.1285
    Client files for companies that contracted ABN to engrave stock
    certificates. The institutional record behind the specimen conventions in
    3.6. Rights: Smithsonian, in person research by appointment.

25. Bills of exchange, noting and protest, Cheeswrights notaries.
    https://cheeswrights.com/protesting-bills-of-exchange/
    Noting is the notary recording the reason for dishonour on the instrument
    itself. Protest is the formal notarial certificate. Included because the
    protest tradition is the one place where an official mark is legitimately
    written across the face of a negotiable instrument by a third party, which
    is the register our overstamp is borrowing. Rights: firm site, reference
    only.

***

# PART 5. CHIEF, READ THIS FIRST

Five recommendations, ranked by how much each changes the result.

## 1. Render the certificate canvas at 3x and present it at 1200x675.

Backing store 3600x2025, CSS size 1200x675. Everything else in this document
depends on it. It is what makes sub pixel intaglio line swell possible, it moves
hatching out of the 1.0 to 2.0 px moire trap in 2.5, and it is the only way
microtext works, because at 3x the glyphs read as a fine line at normal size and
resolve into letters when zoomed, which is exactly what the real feature does.
Without this the engraving will look like a plotted SVG and no amount of
parameter tuning will save it.

## 2. Split seed parameters into discrete shape drivers and continuous texture.

Section 1.9. Five hash bytes into fixed tables for lobe count, turn count,
braid ratio, strand count and rosette lobes. The rest continuous. If every
parameter is continuous, every certificate looks like the same certificate with
noise, and the whole premise of seeding from a hash quietly fails. This costs
almost nothing to implement and it is the difference between a hundred distinct
documents and one document rendered a hundred times.

## 3. Map pumping to line width, not to position.

Section 1.6 and 2.1. Segment stroke every path at 2 to 3 device px per segment
and vary lineWidth along it. Round line caps. This is the single change that
makes canvas lines stop reading as software and start reading as engraving,
because ink volume varying with cut depth is the actual visual signature of
intaglio. Cheaper than any other authenticity trick in this document.

## 4. The revocation overstamp, per 3.9.

Angle -23.5 degrees, not the 29.36 degree corner diagonal. Cap height 58 px,
condensed grotesque 700, letterspacing 0.12 em, mark length about 62 percent of
the diagonal. Colour #A8321C, multiply at 0.88. Four passes: blurred bleed
underneath at 0.18, body with an alpha ramp 0.95 to 0.58 along the long axis,
one off centre under inked blob, then 900 destination-out circles eroding the
glyph edges. Per letter jitter kept small at half a degree. Offset the whole
mark 18 px left and 14 px down from centre. Drawn last, on top of the serial
number. That last point carries more weight than all the texture work combined.

## 5. Add a date and initials, and a zero serial.

Section 3.8 and 3.6. Statutory bond cancellation was never a bare word. It was
CANCELLED plus the date plus a signed endorsement, and the cancelled instrument
stayed on file. A second smaller line under the overstamp carrying a date and
clerk initials at the same angle does more for credibility than any amount of
additional ornament, and it lands exactly on the register in 04-COPY-RULES.
Pair it with an all zero serial number, which is the specimen tell a collector
actually looks for.

## Cut list, so nobody spends a day on these

- Microtext as literal glyphs at DPR 1. Sub 2 px cap height, unreadable, aliases
  into noise. Only works via recommendation 1.
- Per crossing over and under weave parity in interlaced bands. Use the casing
  trick in 1.8. Nobody audits parity at this size.
- Void pantograph as a working copy evident feature. The construction is
  interesting as a texture, the function is pointless on a screen.
- Hatch or ring spacing between 1.0 and 2.0 device px, ever. Hard rule.
- Pure black intaglio and pure red numbering. Both are wrong and both look
  synthetic. Brown black near #241C14 and red orange near #B1361E.
