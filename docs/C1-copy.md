# C1 COPY. Every string on the site.
Flat key and value pairs, kebab case, grouped by area. Paste each block into the
copy object. Values are final text. Anything in prose outside a code block is a
note to the engineer or to C2, not a string.

Conventions used here:
- ENGRAVED CAPS are marked in each block. Everywhere else is sentence case.
- `{n}` is the only interpolation. The engineer substitutes it.
- No em dashes, no double hyphens, no exclamation marks, no arrows.
- No numbers appear in any string except those in 01-FACTS.md. Exceptions are
  flagged and argued below.

***

## 1. MASTHEAD

Three alternatives for the masthead line, one recommendation.

- A. "The protocol issues licenses. This office issues the paper."
  Recommended, because it states the division of labour in two clauses, claims
  nothing, and is the only version a stranger understands before scrolling.
- B. "A registry office for The Standard Reserve. It issues paper and nothing else."
  Honest but flat, and "nothing else" reads as an apology instead of a boundary.
- C. "The bank writes the code. This office writes the paper."
  The rhyme is pleasing and wrong, because it puts us in a pair with the protocol
  rather than at a respectful distance from it.

```js
"masthead-office-name": "The Charter Office",
"masthead-line": "The protocol issues licenses. This office issues the paper.",
"masthead-unofficial": "Unofficial. This office is not the protocol, does not speak for it, and issues nothing the protocol recognises.",
```

`masthead-unofficial` sits above the fold and is never shortened, softened, or
moved below the scam block. The word unofficial is the first word.

***

## 2. THE SCAM AND STATUS BLOCK

The most important text on the site. It sits directly under the masthead. Plain,
short sentences, no humour of any kind in this block.

Three alternatives for the heading, one recommendation.

- A. "Read this before you buy anything"
  Recommended, because it speaks to the one action that can actually hurt the
  person reading, and it stops a confused arrival mid scroll.
- B. "Nothing is live yet"
  True and calm, but a reader who already believes they found a mint page reads
  it as our opinion and keeps going.
- C. "The protocol has not launched"
  Accurate and dull in the right way, though it warns nobody about the fakes,
  which is the entire purpose of the block.

```js
"scam-heading": "Read this before you buy anything",
"scam-status": "The Standard Reserve has not launched. There is no live token and no live NFT.",
"scam-genesis": "The genesis mint has not happened. The protocol's own site still says Coming Soon.",
"scam-fakes": "Any mint page, presale, or $STANDARD contract that exists today is fake. All of them. There is nothing to buy and nothing to claim.",
"scam-no-wallet": "This office never connects a wallet. It asks for no signature, no seed phrase, no payment, and no email. If a page carrying this name asks you for any of those, it is not this page.",
"scam-where-real": "The protocol is at standardreserve.xyz and the whitepaper is at standardreserve.xyz/whitepaper. Believe those two pages and the protocol's own account on X. Believe nothing else.",
"scam-footer-line": "Nothing is live. No token, no NFT, no mint. Any $STANDARD sale you see today is fake.",
```

Note to E2: `scam-where-real` names two URLs from 01-FACTS.md and one account
that the fact ledger does not record. Verify the protocol's X handle against the
protocol site before publish, or cut the final clause down to "Believe those two
pages and nothing else."

***

## 3. WINDOW ONE, ISSUANCE

```js
"issue-title": "Window one, issuance",
"issue-instruction": "Type any name or wallet address. Nothing is checked, nothing is kept.",
"issue-field-label": "Name to be entered",
"issue-field-placeholder": "Any name, handle, or address",
"issue-button-rest": "Issue the certificate",
"issue-button-working": "Engraving",
"issue-button-done": "Issued",
"issue-download-standard": "Download PNG",
"issue-download-large": "Download large PNG",
"issue-copy-link": "Copy the link",
"issue-copy-link-done": "Link copied",
```

Sizes are named by weight, not by pixels, because pixel dimensions would be
invented numbers. Standard and large is all a reader needs.

### The engraved disclaimer, cut into the card itself

ENGRAVED CAPS. This is the one place caps are correct, because it is set on the
plate and not in the interface. It travels with the PNG once the file leaves the
site, so it carries the whole warning on its own.

```js
"card-disclaimer": "THIS PAPER IS COMMEMORATIVE. IT IS NOT ONCHAIN. IT IS NOT AN ALLOWLIST. IT CONFERS NOTHING.",
"card-unofficial-mark": "UNOFFICIAL ISSUE",
```

Short variant if the plate runs out of room, same four facts, no loss:
`"card-disclaimer-short": "COMMEMORATIVE. NOT ONCHAIN. NOT AN ALLOWLIST. CONFERS NOTHING."`

`card-unofficial-mark` is not optional. The download is the only part of this
site that can be screenshotted into a scam, so the word unofficial is engraved
on it as well as printed above the fold.

***

## 4. THE REGISTRY LOOKUP

```js
"lookup-title": "Look up a certificate",
"lookup-explainer": "This office keeps no database and no server. The card is cut from the text itself, so the same text always cuts the same card, on any machine.",
"lookup-field-label": "Name or serial",
"lookup-field-placeholder": "A name already issued, or its serial",
"lookup-button": "Look it up",
"lookup-empty-result": "No entry matches that serial. Enter the name itself and the same card is issued again.",
```

***

## 5. WINDOW TWO, EXAMINATION

```js
"exam-title": "Window two, examination",
"exam-optional": "The examination is optional. It changes the stamp, not the paper.",
"exam-note": "Your certificate is already issued. Nothing in here changes that.",
"exam-button-start": "Sit the examination",
"exam-progress": "Question {n} of seven",
"exam-rule-label": "The rule as written",
"exam-button-next": "Next question",
"exam-closing": "Examined and stamped. The paper is unchanged.",
```

C2 RULING on `exam-progress`. Seven stays. Rule number one bans invented numbers
about the protocol, and seven counts our own questions, which the reader verifies
by sitting the exam. It is a fact of this page, not a claim about the bank.

`exam-rule-label` sits above the whitepaper's own wording after each answer. The
label describes the source, so the reveal itself can be quoted straight from the
paper without a frame around it.

***

## 6. EMPTY AND ERROR STATES

```js
"error-empty": "Nothing entered. The clerk needs a name.",
"error-whitespace": "Only spaces entered. There is nothing there to engrave.",
"error-too-long": "That name runs past the edge of the plate. Shorten it and present it again.",
"error-noscript": "The engraving is drawn in your browser. With JavaScript switched off, this office cannot cut the plate.",
```

`error-too-long` names no character limit on purpose. The limit is a layout fact,
not a published one, and the sentence works at any limit the engineer sets.

***

## 7. FOOTER

```js
"footer-attribution": "An unofficial office, published by @flxrnc.",
"footer-link-whitepaper": "The whitepaper, v0.1",
"footer-link-protocol": "The Standard Reserve",
"footer-link-protocol-x": "The Standard Reserve on X",
"footer-credit-author": "The protocol and the whitepaper are the work of @0xbeans.",
"footer-license": "The code for this office is MIT licensed.",
"footer-gift": "If the protocol team wants any part of this, it is already theirs, with no credit needed and no reply expected.",
"footer-scam-line": "Nothing is live. No token, no NFT, no mint. Any $STANDARD sale you see today is fake.",
```

`footer-gift` is one sentence and stays one sentence. It hands the thing over and
closes the door behind it. Any added clause about collaboration, contact, or
reach turns a gift into a pitch, which is the failure the brief names at sign
off. `footer-scam-line` repeats `scam-footer-line` so the warning is the last
thing on the page as well as the first.

***

## 8. CERTIFICATE MICROLABELS

ENGRAVED CAPS, all eight. These are field labels cut into the plate, not
interface labels, and they are the only tracked out caps permitted anywhere.

```js
"card-label-issued-to": "ISSUED TO",
"card-label-charter-number": "CHARTER No.",
"card-label-branches": "BRANCHES",
"card-label-date": "DATE OF ISSUE",
"card-label-serial": "SERIAL",
"card-label-countersigned": "COUNTERSIGNED",
"card-label-examination": "EXAMINATION",
"card-motto": "THE BANK IS CODE",
```

Notes for D and the engineer:

- `CHARTER No.` keeps its lowercase abbreviation, which is how engravers set it.
  The value beside it is derived from the typed text and must never be presented
  as a position in the genesis set of one thousand. If the layout risks that
  reading, drop the field rather than explain it.
- `BRANCHES` may show one to ten, which the whitepaper publishes. Nothing else.
- `EXAMINATION` is blank until the exam is sat, then carries the stamp. Blank is
  a correct state and needs no placeholder text.
- `THE BANK IS CODE` is the protocol's own line from the whitepaper. It is
  quoted, not claimed, and it is the last thing set on the plate.

***

## COMPLIANCE CHECK, SELF AUDIT

- No em dashes and no double hyphens in any string or note.
- No exclamation marks, no arrow characters, no middle dot meta strings, no
  rhetorical question headings, no weighty colons.
- Banned vocabulary list checked word by word against every value. Clean.
- Numbers appearing in strings: v0.1 and standardreserve.xyz paths, both from
  01-FACTS.md, plus seven in `exam-progress`, ruled on by C2 in section 5.
- No string implies the certificate or the examination affects a mint, an
  allowlist, eligibility, or anything onchain. Four strings say the opposite
  outright: `card-disclaimer`, `exam-optional`, `exam-note`, `issue-instruction`.
- The word unofficial appears above the fold in `masthead-unofficial`, is
  engraved on the downloadable card, and opens the footer. It is never softened.
