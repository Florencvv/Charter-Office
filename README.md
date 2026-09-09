# The Charter Office

An unofficial registry office built around the protocol The Standard Reserve.
The protocol issues licenses. This office issues the paper.

Unofficial and unaffiliated. Nothing it prints is onchain.

## Run it

```
python -m http.server 8787
```

Then open http://localhost:8787/index.html

No build step, no dependencies, no server logic. The file also opens straight
from disk with a double click, and works with the network switched off.

## What it does

**Window one, issuance.** Type any name or wallet address and the certificate is
engraved immediately. No wallet, no signup, no conditions, no quiz. Downloads as
PNG at 1200 by 675 and 1080 by 1080.

**Window two, examination.** Seven optional questions about protocol mechanics.
The examination never gates the paper. It stamps the certificate that was
already issued, and the reveal after each answer is the point of the site.

## How it holds together

**Determinism.** The bank name, the charter number, the date, the serial and
every curve on the plate come from a hash of the typed string. No Math.random
and no clock anywhere in card generation, so one string draws one plate on any
machine and a year from now.

**A registry with no database.** The serial along the bottom edge is a Crockford
base32 encoding of the input itself, so pasting it into the lookup redraws the
card with no server and no stored state. Crockford drops I, L, O and U, so a
serial read off a card by eye cannot be mistyped into a different valid one.
Wallet addresses are packed as twenty raw bytes rather than forty two text
characters, so an address gives a serial of ordinary length.

**Generative engraving.** The border is a travelling wave family off a straight
line engine, two frequencies, cased for interlace. The compartment is a rose
engine ground under a phase shifted hypotrochoid family, closed by p and q
rather than by guessing the rolling radius. The tint is two crossing straight
line families. Every one of them is driven by the same seed, so no two
certificates carry the same pattern.

**State in the URL.** `?n=beans&e=revocation` opens a specific stamped card.

## The shape of the certificate

It is half of a pair, not a banknote. Currency is whole and anonymous because it
has to work in the hand of a stranger. Office paper is a fragment that means
something only because a matching fragment is filed under a number somewhere. So
the sheet is deliberately incomplete: a torn chirograph top edge with a line of
text sliced through it, a perforated stub that says it was retained by an office
that never retained it, a schedule with rows nobody filled, and three
countersignature rules with one signature on them.

The row reading COUNTERPART FILED is blank on purpose.

## Files

```
index.html      the whole site, one file, zero dependencies
tweets.txt      five tweet texts, one per rank
LICENSE         MIT
docs/           the working papers the site was built from
```

`docs/engine.source.js` and `docs/quiz.source.js` are the plate engine and the
examination data as separate files, which is how they were written before being
inlined. They are reference copies. index.html is the only thing that runs, and
editing them changes nothing.

`docs/01-FACTS.md` is the fact ledger. Every claim on the site traces to it, and
it records which whitepaper parameters are redacted and therefore never appear
here in any form, including in words rather than digits.

## Two things the owner should decide

1. The page carries an `og:title` and an `og:description` carrying the unofficial
   statement and the not live warning. The brief reserved social previews to you.
   They are two lines in the head and deleting them changes nothing else.
2. The footer credits @0xbeans as the author of the protocol and the whitepaper.
   That credit comes from your brief. It is not sourced from the protocol's own
   site, unlike @standard_rsv, which is linked from standardreserve.xyz itself
   and was verified in its published bundle before being named on the page.

## Licence

MIT. If the protocol team wants any part of this, it is already theirs, with no
credit needed and no reply expected.
