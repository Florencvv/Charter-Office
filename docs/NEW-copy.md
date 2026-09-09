# NEW copy for The Charter Office

```
hero-line: The Charter Office
hero-subline: Type a name and this office engraves you a commemorative bank charter for The Standard Reserve, a protocol that has not opened yet.

what-this-is: The Standard Reserve is a protocol where holding a charter makes you a banker. It has not launched. This office prints a commemorative version of that charter with your name on it, and an optional examination about how the protocol works decides its stamp.

notice-heading: Where things stand
notice-body: The Standard Reserve has not launched. There is no live token and no live NFT, so anything selling $STANDARD today is fake. This office is unofficial, connects no wallet, and issues nothing the protocol recognises.

step-issue-label: Issue
step-issue-line: Type any name. The office cuts the plate in your browser and hands you the picture.
step-examine-label: Examine
step-examine-line: Sit the examination and your answers decide which stamp the paper carries.
step-post-label: Post
step-post-line: Download the card or copy the link. The same name cuts the same card for anyone.

section-issuance-heading: Issuance
section-issuance-intro: Type any name, handle, or wallet address. Nothing is checked, nothing is sent, nothing is kept.

section-register-heading: Look up a certificate
section-register-intro: There is no database here. The card is cut from the text itself, so the same name always cuts the same card, on any machine, for anyone.

section-exam-heading: Examination
section-exam-intro: Seven situations the protocol puts a banker in, where every answer is defensible and the office takes no view on which one you pick.
exam-after-each: After each answer you are told what the protocol actually does. The examination sets the stamp, never the paper, and your certificate is already issued either way.

card-strip-heading: What the card says
card-stub: The stub. A registry tore this half off and kept it. Yours stays attached, because nothing was filed.
card-charter-number: Charter number. Drawn from your name, printed in the corners, and a position in nothing.
card-schedule: The schedule. The rows setting out what the paper grants. Authority none, onchain record none, confers nothing.
card-examination-row: Examination. Blank until you sit it, then it carries whatever the office stamped.
card-counterpart: Counterpart filed. It stays blank. The office filed no counterpart and never will.
card-serial: The serial. Your name, encoded. Paste it into the register and the same card comes back.
card-stamp: The stamp. Struck across the sheet after the examination, in the ink your answers earned.
card-crossing: Unofficial issue. A red crossing sitting inside the frame, where a screenshot cannot crop it off.

footer-last: Nothing is live. No token, no NFT, no mint. Any $STANDARD sale you see today is fake.
```

Step labels are sentence case here; the existing `.caps` class sets ISSUE, EXAMINE, POST on the strip.

## DELETIONS

Remove from the notice block, right column, all five paragraphs:

1. "There is nothing to connect a wallet to. A connect button on any $STANDARD page today is either broken or a drainer, and one signature is enough to empty the wallet that signs it."
2. "Nobody legitimate ever asks for a seed phrase or a private key..."
3. "Nobody official messages you first..."
4. "This office never connects a wallet. It has no wallet button and asks for no signature..."
5. "If you have already connected a wallet or typed a seed phrase into a $STANDARD page, treat that wallet as lost..."

Remove from the footer:

6. "If the protocol team wants any of this, the code, the copy, or the engraving, it is theirs to take, change, ship, or bin, with no credit and no reply expected."

Replace, do not merely delete:

7. The notice block left column, all five paragraphs, and the heading "Read this before you buy anything". `notice-body` and `notice-heading` stand in for the lot. The three first party links in that column already appear in the footer, so no source is lost.
8. The lede "The protocol issues licenses. This office issues the paper." and the unofficial line under it, replaced by `hero-line`, `hero-subline`, and `what-this-is`.
9. The two paragraphs under Examination, replaced by `section-exam-intro` and `exam-after-each`.
