# E1 ENGINEERING DECISIONS. Chief and E1. Everyone builds against this.

## The double hyphen problem, and the rule that falls out of it

The acceptance checklist says no double hyphen anywhere in the project. Taken
literally that bans CSS custom properties, since every one of them starts with
two hyphens, and it bans HTML comments, since both delimiters carry them, and it
bans the decrement operator.

Chief's ruling: take it literally. The file will contain zero occurrences of two
consecutive hyphens, so a plain grep proves the rule rather than arguing about
intent. Consequences for E1:

- no CSS custom properties, colours are written literally, the file has one theme
- no HTML comments at all
- no decrement operator, write minus equals one
- no arrow function bodies that could produce a stray sequence, checked by grep

## Determinism

Input normalisation: NFC, trim, collapse internal whitespace to one space, cap
at 64 characters. Case is preserved, because the name is printed on the face and
two spellings that render differently must not claim the same paper.

Seed: xmur3 over the normalised string, then sfc32 as the generator. Nothing in
card generation touches Math.random or Date.now. The date of issue is derived
from the seed, not from the clock, or the same string would draw a different
card tomorrow.

## The registry with no database

The problem: a serial cannot be looked up if it is a one way hash of the name.
The solution: the certificate carries two identifiers, each doing one job, and
the reversible one is the lookup key.

1. CHARTER No. NNNN, 0001 to 9999, hash derived, set twice on the face in red
   the way a National Bank Note set its federal charter number. Not reversible,
   not meant to be.
2. SERIAL, along the bottom margin in small engraved type, a Crockford base32
   encoding of the input itself. Registry paper carries a file reference and
   that reference is what the office reads back. Paste it into the lookup and
   the card is redrawn from it with no server and no stored state.

Wallet addresses are detected and packed as 20 raw bytes rather than 42 text
characters, so an address produces a serial of ordinary length.

Crockford base32 is chosen because it drops I, L, O and U, so a serial read off
a card by eye cannot be mistyped into a different valid serial.

## URL state

?n= carries the exact input string, ?e= carries the examination result id. Both
are optional. Reading the URL redraws the card and applies the stamp.

## Rendering

Two plates, 1200 by 675 and 1080 by 1080, drawn by the same routine from one
layout table keyed by aspect. Screen rendering uses devicePixelRatio. Export
renders at 2x then downsamples, so hairlines survive.

Everything on the plate is drawn, nothing is an image. Fonts are system stacks
only, because a webfont is a network dependency and the file must work offline.
Titling uses a didone stack, which is the correct historical class for banknote
titling and is present on both platforms.

## Rendering budget

The guilloche is the expensive part. It draws once per card into an offscreen
canvas and is reused for both plate sizes and every stamp change, so applying a
stamp does not redraw the engraving. Under prefers reduced motion nothing
animates, and the card still renders in full.
