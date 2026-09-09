# E3. SAFETY AND REPUTATION. PASS 1

Officer: E3. Date: 2026-09-09.
Checked against the running build, not against the brief. Server at
localhost:8787, three shipping files: index.html, engine.js, quiz.js.
Network, console and canvas measurements were taken in a browser and are quoted
below as numbers rather than as impressions.

Note on timing. index.html and engine.js were rebuilt by other agents while this
audit was running, twice. Everything below describes the build as it stands
after that rebuild and after my fixes. Where the rebuild dropped something I had
already fixed, I say so and I put it back.

***

## VERDICT

The site is safe to publish once three blockers clear. All three are
verification tasks for Chief, not build work. Everything I found in the build
itself is fixed and verified.

**BLOCKER 1. The X handle @standard_rsv is nowhere in 01-FACTS.md.**
index.html links it as "The Standard Reserve on X". E2 used the handle
throughout its own audit as the official account but explicitly could not
retrieve a single post from it, and E2 recorded that X is unscrapable from this
machine. So no document in this project sources that handle to a first party
page. We are pointing an audience selected for being scam vulnerable at an X
account nobody verified. Verify it against standardreserve.xyz and record it in
01-FACTS.md, or cut the link. I did not remove it myself, because removing the
route to the real account has its own cost and the handle is probably right.
C1 anticipated this and its fallback wording, "Believe those two pages and
nothing else", is already what ships in the notice, so the block itself does not
endorse the account. Only the footer link does.

**BLOCKER 2. @0xbeans as the protocol author is not sourced either.**
The footer states "The protocol and the whitepaper are the work of @0xbeans" and
links the account. 01-FACTS.md does not name an author anywhere and E2 never
mentions him. The only source is Chief's brief. Attribution to the wrong person
is both an error and a discourtesy to two people at once. Same fix: source it or
cut it.

**BLOCKER 3. The five tweets in D3 are the worst object in the package.**
Detail in section 6. They must not be posted as drafted.

***

## 1. IMPERSONATION SURFACE

### The site

Fine, with two things restored.

The title, the description and the og description all carry the word unofficial
or the phrase "Not affiliated with The Standard Reserve", so a search result and
a pasted link both declare it before anyone clicks. The two column footer
separates "the protocol" from "this office" cleanly. No protocol branding is
imitated anywhere.

Two regressions from the rebuild, both fixed:

- The masthead line had been cut to "Unofficial and unaffiliated. Nothing here
  is onchain." C1 wrote that line to be "never shortened, softened, or moved"
  and the full version does a different job, because it says what the office
  does not do rather than only what it is not. Restored to C1's text: "This
  office is not the protocol, does not speak for it, and issues nothing the
  protocol recognises." It had also been set in tracked caps at 12px, which C1
  did not mark as an engraved caps string. Set in sentence case at 14px.
- The notice heading had been softened to "Read this before anything else",
  which warns about nothing. Restored to C1's recommendation A, "Read this
  before you buy anything", which names the action that can hurt the reader.

### The PNG, which is the object that matters

I walked the plate as a stranger and as someone looking for material. The
rebuild is a different card from the one I first read and it is far stronger:
the schedule block alone does more anti impersonation work than any warning
sentence on the site. A stranger reading the card is told, in the card's own
register voice, in a ruled table:

    ISSUED BY          THE CHARTER OFFICE, UNOFFICIAL
    AUTHORITY          NONE
    ONCHAIN RECORD     NONE
    TRANSFERABLE       NO
    CONFERS            NOTHING

That is the right instrument. It answers the four questions a confused person
actually has, and it answers them without a disclaimer voice.

Five defects found on the plate. All five fixed.

**1.1 The one mark carrying the word unofficial ran off the edge of the image.**
`drawCrossing` was positioned at `bodyX + bodyW - 132` and rotated by 0.35
radians. Measured in the page: the rotated rules reached x 1196 on a 1200 pixel
plate and x 1072 on a 1080 pixel plate. Four pixels and eight pixels of margin.
Any rounded corner, any avatar crop, any platform that trims edges clips the
only red mark on the sheet. I moved it inboard, and D then generalised the fix
into layout parameters, `crossCx`, `crossCy` and `crossW`, with the rule written
into the comment: the crossing is applied by the holder after issue, so it sits
on top of the plate work and inside the frame and never bleeds off the sheet.
Re-measured on the current build: the rotated extremes reach x 1029 against an
inner border at 1158 on the wide plate, and x 923 against 1032 on the square,
with the top edge at y 86 against an inner border at 64. Comfortably inside the
printed area in both layouts. Resolved, and better than my version.

**1.2 The plate's own disclaimer was drawn and could not be read.**
This is the one I would have missed by reading the file. The line was set at 9px
in INK_SOFT centred on `discY`, which sits in the middle of the guilloche border
band. I rendered the plate at three times scale and magnified that strip six
times: nothing but lathe work, no letterforms at all. I then drew the identical
call onto a white canvas and counted pixels: 1,590 ink pixels landing in x 431
to 903, y 649 to 655. So the glyphs were being drawn correctly and the border
was swallowing every one of them. A warning that renders invisibly is worse than
no warning, because everyone downstream believes the card is covered.

Fixed with a reserved panel, which is what a security printer does with a legal
line that has to sit inside ornament: the band is knocked back to paper behind
the text, hairline ruled, and the text is set in full INK. Verified legible in
the browser.

**1.3 The word unofficial appeared exactly once on the whole plate.**
Now three times, in three places that cannot all be removed by one crop:
- the chirograph line at the torn top edge, which repeats across the full width
  and now reads "THE CHARTER OFFICE UNOFFICIAL REGISTER OF COMMEMORATIVE PAPER"
- the red crossing
- the bottom disclaimer, which now opens "UNOFFICIAL AND COMMEMORATIVE"
plus the schedule's ISSUED BY row, which I changed to "THE CHARTER OFFICE,
UNOFFICIAL". To strip the word a cropper now has to remove the top edge, the
bottom edge and the middle of the sheet, and what is left is not a certificate.

**1.4 The protocol's own line was quoted without credit.**
"THE BANK IS CODE" was set in the largest tracked caps on the sheet, directly
above the numbering, with nothing attributing it. On a PNG travelling alone that
is not a quotation, it is this office adopting the protocol's motto. Added a
citation beneath it at 8px: "THE STANDARD RESERVE, WHITEPAPER V0.1". Layout
checked: 208 pixels wide, 14 pixels below the motto, 16 above the serial, clear
in both layouts. This is a gift test item as much as an impersonation item.

**1.5 The download filename carried nothing.**
It was `charter 5262.png`, which reads as an export of a real charter, and it is
what appears in a downloads folder and in every upload dialog. Now
`charter-office-unofficial-5262.png`. The rebuild had reverted an earlier fix of
mine here, so this is the second time it has been set.

### Ruling on the PNG

**It carries enough on its face, now, and it did not before.** Four independent
carriers of the word unofficial, a legible commemorative line, a schedule that
says AUTHORITY NONE and CONFERS NOTHING in plain twelve point, and a credit
naming the real source of the motto. A scammer who crops this card down to
something usable has to destroy it to do it. Before the five fixes above my
answer would have been no, on the strength of 1.1 and 1.2 alone.

One residual I am not asking anyone to change: the stub reads "THIS PORTION IS
RETAINED BY THE OFFICE" and the schedule has a "COUNTERPART FILED" row, which
together imply records exist somewhere. It is nineteenth century office fiction
sitting two rows above ONCHAIN RECORD NONE, and the site says plainly that the
office keeps no register. Fine.

### Ruling on the bank naming pattern

"The Fourth Sovereign Bank of BEANS" is **not a claim** and it stays. It is
obviously fictional Victorian furniture, the subject is whatever the visitor
typed, and the schedule directly beneath it answers the only question the name
could raise. Nobody reads it as an assertion that a bank exists or that the
visitor runs one.

The table it was drawn from was a different matter. HOUSES was
`["Reserve", "Standard", "Continental", "Sovereign", "Charter"]`. Two of those
five are the two words of the protocol's name. Two cards in five could read
"The Second Standard Bank of X" or "The First Reserve Bank of X", set above an
unattributed "THE BANK IS CODE". That is the one place the pattern crossed from
pastiche into something that could be read as an issuing claim, and it would
have done it on roughly forty percent of every card ever shared. Removed both.
The table is now `["Continental", "Mercantile", "Provincial", "Sovereign",
"Charter"]`, all ordinary nineteenth century bank vocabulary, and the user's own
example still generates.

### On the charter number

I changed the draw to five digits because a zero padded four digit number
between 0001 and 1000 is indistinguishable from a position in the genesis set of
1,000 Founding Charters, and about one card in ten landed there. Chief overruled
with `1001 + rng() * 8999`, which keeps four digits and makes the collision
impossible. That is the better fix and I accept it. Verified: the range is 1001
to 9999 and the field never pads.

***

## 2. THE SCAM BLOCK

Judged against one test: does a confused person who arrived believing they found
a mint page leave un-scammed.

**Against C1's draft the answer was partly. Against the build as I found it the
answer was no.** The rebuild had reduced the block to five sentences and dropped
most of what protects people.

Measured against the five things that actually happen:

| Attack | C1 draft | Build as found | Now |
|-|-|-|-|
| Fake mint pages | covered | covered | covered |
| Fake contract addresses | covered | covered | covered |
| Drainer behind a connect button | not covered | not covered | covered |
| Fake support in replies and DMs | not covered | not covered | covered |
| Seed phrase requests | as a property of this office only | same | covered as a rule |

C1's `scam-no-wallet` says this office asks for no seed phrase. That protects
someone on this page and nobody anywhere else. The reader needs the rule, not
the exception. Same with the connect button: telling someone that this office
has no wallet button does not tell them what the button on the fake page will
do to them.

Restored and added to the broadside, five paragraphs:

- "There is nothing to connect a wallet to. A connect button on any $STANDARD
  page today is either broken or a drainer, and one signature is enough to empty
  the wallet that signs it."
- "Nobody legitimate ever asks for a seed phrase or a private key. Not support,
  not a moderator, not a verification step, not a wallet migration. Anyone who
  asks is stealing."
- "Nobody official messages you first. Treat every account offering help in your
  replies or your direct messages as a fake, including any account using the
  name of this office."
- "The only whitelist checker is on the protocol's own site, and that page says
  checking does not reserve a mint. Any other page asking for your address to
  check eligibility is collecting addresses." Both halves are E2 CONFIRMED first
  party. This matters because a live whitelist checker is the single most
  copyable thing the protocol currently has, and an address harvesting clone of
  it is the likeliest fake in the next few weeks.
- "If you have already connected a wallet or typed a seed phrase into a
  $STANDARD page, treat that wallet as lost. Move what is in it to a wallet
  whose key has never been entered into a website." Nothing else on the site
  speaks to the reader who is already caught, and that reader is the one with
  most to lose.

C1's impostor clause, "If a page carrying this name asks you for any of those,
it is not this page", is kept and is the most valuable sentence in the block,
because a clone of this office with a connect button bolted on is the specific
attack this site invites by existing.

The block now runs five paragraphs per column and is the longest thing above the
fold. That is correct. It is the only place on this site where length beats
restraint.

**Nothing material is still missing.** One thing I deliberately did not add: any
line about what the protocol team will or will not do before launch. See
section 3.

***

## 3. THE UNCONFIRMED CLAIMS

**Zero instances. The site is clean and so is C1.**

Swept index.html, engine.js, quiz.js, C1-copy.md and D3-tweets.md for audit,
surprise, stealth, promised, pledge, in progress, underway, will announce,
advance notice. Two hits, both false positives:

- C1-copy.md line 213, the heading "COMPLIANCE CHECK, SELF AUDIT". C1's own
  process, not a claim about the protocol.
- quiz.js line 151, "the sign of the epoch in progress". Protocol mechanics from
  01-FACTS.md section 04, not a status claim.

Nowhere does the site say audits are in progress. Nowhere does it say the team
promised no surprise launch. Nowhere does it imply either by paraphrase, and
nowhere does it offer a reassurance of that shape in different words, which is
the way this failure usually arrives.

The related exposure is the two unsourced identity claims in blockers 1 and 2.
They are the same class of error as the audit claim: comforting, probably true,
not sourced to a first party page, and printed on a site whose whole authority
comes from refusing to do that.

***

## 4. DATA AND TRACKING

Measured in a browser, not read off the brief.

**Network.** Loading the page produced exactly three requests, all to the site's
own origin: the document, quiz.js, engine.js. No fonts, no CDN, no analytics, no
beacon, no third party of any kind. Grep confirms the absence of fetch,
XMLHttpRequest, sendBeacon, WebSocket, EventSource, serviceWorker, link
elements, img elements, iframes and @import across all three files. The six
outbound links in the notice and the footer are anchors the reader clicks, not
requests the page makes.

**Storage.** No localStorage, no sessionStorage, no IndexedDB, no cookies.
Nothing persists between visits.

**Wallet.** No ethereum, no web3, no walletconnect, no eth_ methods, no
requestAccounts, no signature path. There is no address collection anywhere. The
typed string never leaves the machine.

**Offline.** The page works with the machine offline. Every font is a local
family stack ending in a generic serif or sans, every mark on the card is drawn
with canvas primitives, and there is no image asset in the project. The three
files are classic scripts, so it also opens from file:// with no server.

**Console.** No errors, no warnings, on a normal load and on a crafted one.

**Ruling on clipboard use: fine.** `navigator.clipboard.writeText(location.href)`
runs on a click, reaches no network, and the build already guards it behind a
feature check with a fallback that prints the URL for the reader to copy by
hand, and only reports "Link copied." from inside the resolved promise. It does
not claim success it did not have. There is no catch handler, so a rejection is
silent rather than wrong, which is the acceptable direction.

**Ruling on history.replaceState: fine, with one hardening change already made.**
It issues no request, so nothing is transmitted. It does put whatever the visitor
typed into the address bar and into browser history, and a visitor is invited by
the placeholder to type a wallet address. Two consequences worth naming. The
address is then visible in any screenshot that includes browser chrome, which is
the visitor's own choice and is the whole point of a shareable card. And the
query string would be exposed to standardreserve.xyz and to x.com in a Referer
header if a host ever set a permissive referrer policy. The browser default
would have truncated it to the origin, but that is a default and not a
guarantee. I added `<meta name="referrer" content="no-referrer">` so it does not
depend on how the site is eventually hosted. Nothing in a query string now
leaves the machine under any host configuration.

**Two further items found in the rebuilt code.**

- `renderExam` assembles markup with string concatenation and assigns it to
  `innerHTML`. I traced every interpolated value: all of them come from the
  static QUIZ object in quiz.js or from loop counters. quiz.js reads no input
  and no URL. The typed name and the URL parameters never reach that string, so
  there is no injection today. Recording it as a standing rule rather than a
  finding: nothing derived from the input field or from `location` may ever be
  concatenated into that markup. This is a link shareable page, so the day it is,
  a crafted link injects a connect button onto the office's real domain.
- `if (e && STAMPS[e])` was not an own property check. `?e=constructor` passed
  the guard off Object.prototype and then threw inside stamp drawing, so a
  crafted link made the office look broken to whoever opened it. Changed to
  `Object.prototype.hasOwnProperty.call`. Verified: the parameter is now
  rejected, the card renders, the console is clean.

***

## 5. THE HISTORICAL DATE

The year is drawn as `1863 + rng() * 63`, so cards read from 1863 to 1925 and a
card can say 24 MAY 1874.

**Ruling: charm. It stays, and no alternative is needed.**

It is not a forgery risk. Forgery requires a document that could be mistaken for
a real one, and this one names a bank that has never existed, carries a modern
base32 serial, and prints its own commemorative line. Nobody passes a PNG off as
paper.

More to the point, the date is doing protective work, and the argument for it
becomes obvious the moment you consider the alternative. A card dated today,
carrying a four digit number, a branch count and a serial, reads as a receipt
for something that happened today. That is exactly the artefact a scammer wants
and exactly the confusion the whole site exists to prevent. 1874 cannot be
mistaken for a record of anything current. It puts the object in the world of
defunct paper on sight, before any warning text is read, and it does that work
in every crop and at every thumbnail size where the 9px disclaimer fails.

The one honest objection is that DATE OF ISSUE is the field a confused reader
uses to locate the document in time, and this document was issued today. I
considered relabelling it. I am not recommending that, because the fix for the
objection is the fix already made in section 1: on a plate that declares itself
UNOFFICIAL AND COMMEMORATIVE in a legible reserved panel and prints AUTHORITY
NONE in its schedule, an 1874 date is unambiguously part of the costume. It is
only a problem on a plate that does not otherwise declare itself, which is the
plate we had this morning and not the one we have now.

The narrow residual misuse, generating a card for a real defunct bank name and
passing it into the collectors market as a scan, is answered by the same fixes
and by the repeated microtext at the torn edge. I am not treating it as live.

***

## 6. THE GIFT TEST

**As the site stands: a gift, clearly, and it would read that way to him in
about ten seconds.** The reasons are structural rather than decorative. The
office is subordinate by construction, an office that issues paper about someone
else's licenses. Every mechanic taught comes from his document and is credited to
it. The site publishes no number he redacted. It sells nothing, collects
nothing, and connects to nothing. The one line of his it quotes is now credited
on the artefact itself. And the schedule on the card, AUTHORITY NONE, ONCHAIN
RECORD NONE, CONFERS NOTHING, is the site refusing to accumulate any of the
value it could have taken from proximity to his work. An author reads that
table and understands immediately that nobody is trying to stand next to him.

**As the package stands: the tweets tip it to farming, and they are the only
thing that does.**

What is fine and needs no change:

- **The naming.** "The Charter Office" takes his noun for a thing that is
  plainly downstream of him. It avoids both words of the protocol's name. Fine.
- **The attribution.** Two footer columns, his protocol in one, this office in
  the other, with the authorship sentence present. Correct shape, subject to
  blocker 2.
- **The owner's handle placement on the site.** One line in a footer list, no
  emphasis, nowhere near the masthead. Fine.
- **The licence.** MIT plus an explicit waiver is the most permissive normal
  thing available and it costs him nothing to take. Section 7.

What tips toward farming, and what to change:

**6.1 The tweets, and this is blocker 3.** All fifteen drafts in D3 end with "by
@flxrnc", in the exact position a credit farming call to action sits. The
account posting them is @flxrnc, so the credit is redundant and its only
remaining function is branding. Worse: **@0xbeans and @standard_rsv appear in
none of the fifteen.** Five posts explaining his protocol's mechanics, each
signed by the builder, none naming the author or the project account. Read at
speed, on the timeline where it will actually be read, that is a person using
someone else's protocol as content and signing it. It is the single clearest
farming signal anywhere in this project, and it sits in the one artefact he is
most likely to see first.

Change: cut "by @flxrnc" from every tweet. Where a tweet needs a source, name
the whitepaper or @standard_rsv. The account is the credit.

**6.2 The cashtag, same blocker.** The drafts write `$standard`. X links
cashtags, so these five posts would be delivered into the $STANDARD cashtag
feed, which today contains nothing but fake presales, next to a picture of a
certificate with a four digit number on it. That is the highest risk placement
this PNG could possibly have, it is self inflicted, and it undoes a good deal of
what section 1 achieves. Drop the dollar sign. Write "standard" or "the token".

**6.3 The footer gift sentence.** Handled in section 7. C1's version leaves the
MIT attribution condition standing, which makes "no conditions" not quite true.

Nothing else. The engraving, the copy, the quiz and the card are a gift.

***

## 7. LICENCE

Written to `C:\Users\shelu\Desktop\standardbank\LICENSE`. The repository carried
none, while the footer already claimed the code was MIT licensed, so the site
was asserting a licence the project did not have.

The copyright line names the handle, since no legal name is known. Copyright
subsists in the code regardless of the name used, and a handle identifies the
holder well enough for a project of this kind.

Exact text of the file:

```
MIT License

Copyright (c) 2026 @flxrnc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


ADDITIONAL GRANT

This is an unofficial fan project. It is not affiliated with, endorsed by, or
connected to The Standard Reserve.

The attribution requirement above is waived for The Standard Reserve and for
anyone working on it. If the protocol team wants any of this, the code, the
copy, or the engraving, it is theirs to take, change, ship, or bin, with no
credit and no reply expected.
```

The MIT text itself is unmodified, which is the only correct way to ship MIT.
The additional grant sits below it as a separate permission rather than as an
edit to the licence, which is how extra permissions are granted without
producing a licence nobody recognises.

### The footer sentence

C1 drafted: "If the protocol team wants any part of this, it is already theirs,
with no credit needed and no reply expected."

**Ruling: improve it, and the improvement keeps C1's ending intact.** C1's
sentence is close and its last clause is the best thing in it. "No reply
expected" is what stops a gift reading as a pitch, and it should never be cut.

Two problems. It does not say what "this" is, so a reader has to guess whether
the offer covers the code, the design or the words. And the site says MIT one
line above, and MIT does impose a condition: keep the notice. A sentence
promising no conditions sitting under a licence that has one is exactly the sort
of small inconsistency a careful author notices, and the author of a whitepaper
that redacts its own parameter tables is a careful author.

Shipped text, now live in the footer and matching the additional grant in the
LICENSE file word for word:

> If the protocol team wants any of this, the code, the copy, or the engraving,
> it is theirs to take, change, ship, or bin, with no credit and no reply
> expected.

It names the three things, it waives attribution explicitly so the licence and
the sentence now agree, and it keeps "bin" because naming the outcome he is most
likely to choose is what makes the offer read as a gift rather than as a
proposal. One sentence, as C1 required.

***

## CHANGES MADE

index.html
- referrer meta set to no-referrer; og title and description added, text only,
  no og image
- masthead unofficial line restored to C1's full text, set in sentence case
- notice heading restored to "Read this before you buy anything"
- five scam paragraphs restored to the broadside: drainer, seed phrase, fake
  support in replies and DMs, whitelist checker, remedy for the already caught
- footer gift sentence replaced
- download filename now carries the word unofficial
- `?e=` guard changed to an own property check

engine.js
- HOUSES: Reserve and Standard removed
- crossing moved inboard off the image edge, since generalised by D into
  crossCx, crossCy and crossW layout parameters
- chirograph microtext now carries the word unofficial
- schedule ISSUED BY value now carries the word unofficial
- bottom disclaimer reworded and given a reserved panel, set in INK
- motto credited to the whitepaper, with creditY added to both layouts

LICENSE
- created

Not changed by me: the charter number range, which Chief overruled to
`1001 + rng() * 8999`. Better than my version. Accepted.
