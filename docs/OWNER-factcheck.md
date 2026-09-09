# OWNER FACT CHECK, The Charter Office

Audited against the whitepaper itself, read in the browser at
https://www.standardreserve.xyz/whitepaper/ on 2026-09-09, not against
docs/01-FACTS.md. 01-FACTS was read second and agrees with the source on every
point checked below.

Scope: the seven examination questions in QUIZ.questions, the five entries in
QUIZ.ranks, the page prose, and the text engraved on the certificate canvas.
Nothing here is about design, layout or copy.

Ordered worst first.



## 1. The charter auction open is stated as 2x. It is 3x.

Question one, `buying-into-the-auction`, rule reveal:

> "Charters and licenses use the same falling price auction. Buyers set the
> price, not the protocol. The open is twice yesterday's closing sale, or twice
> the floor if nothing sold."

**MISLEADING, and the worst item on the site.**

The first sentence puts charters and licenses under one subject. The next
sentence then gives one open multiple. A reader finishes that paragraph
believing both auctions open at twice yesterday's close. Only the license
auction does.

Section 08, step 01, gives the two separately: the license day opens at
`P_start = 2 x P_last`, and the charter day "opens at 3x the previous day's
closing sale. If nothing sold, it opens at 3x the floor; the floor is the
admin-set reserve price." Section 08 then spends a sentence on why the numbers
differ: charters open higher than licenses "because scarce seats should reprice
into demand faster than a daily commodity."

The word "3x" does not appear anywhere in index.html. The site's only statement
about auction opens is the wrong one for charters, and the asymmetry it erases
is a deliberate design choice I wrote a justification for.

Correction: either scope the sentence to licenses, or state both. Suggested:
"The license day opens at twice yesterday's closing sale, the charter day at
three times, or at twice and three times the floor if nothing sold."



## 2. Exit pressure is described as a ratio it is not.

Question three, `crowded-exit-door`, rule reveal:

> "Pressure is trailing seven day withdrawals against everything still held."

**MISLEADING.**

Section 09 defines exit pressure as `P = W / max(D + W, floor term)`, where W is
tokens withdrawn system wide over the trailing 7 days and D is everything still
held at the bank. The withdrawals appear in the denominator as well as the
numerator. The site's phrasing, W "against" D, describes `W / D`, a different
quantity with different behaviour: it is unbounded above, while the real P is a
share of the bank and is what makes the sentence "saturating when a redacted
share of the bank tries to leave in a week" mean anything.

A reader who takes this literally will compute exit pressure wrong and will
expect the fee to run away in a heavy week rather than approach a ceiling.

Correction: "Pressure is trailing seven day withdrawals measured against those
withdrawals plus everything still held at the bank, so it is a share of the bank
heading for the door." Nothing in that sentence is redacted. Neither D + W nor
the 7 day window is withheld.



## 3. The regime is presented as what sets the exit fee. Exit pressure sets it.

QUIZ.ranks.provisional, body:

> "Under expansion the exit sits at the floor, and under contraction it is priced
> by the crowd, so this profile pays most in the week it most wants to leave."

**MISLEADING.**

The resolution fee is a function of exit pressure and of nothing else. It has no
regime term. Section 05's regime table says "Exits: cheap, floor" under
expansion and "priced by the crowd" under contraction, but that is a description
of what usually happens, not a rule: capital flowing in usually means few people
leaving. Section 09 is the mechanism, and it reads only W and D.

A reader will conclude that as long as net flow is positive their exit is
cheap. It is not. A positive net flow epoch with heavy withdrawals prices exits
high, because the pool and the exit door are two different queues.

Correction: attach the fee to exit pressure, then note the regimes as a
tendency. "The fee follows how much of the bank is leaving, not the regime.
Inflows usually mean a quiet door and a fee near the floor; outflows usually
mean a crowded one."

I accept that my own section 05 table invites this compression. That is why I am
flagging it rather than calling it wrong.



## 4. "In a quiet market it pays nothing" overstates the case.

QUIZ.ranks.patient, body:

> "It is a bet on other people leaving, and in a quiet market it pays nothing."

**MISLEADING.**

Two mechanisms pay a stayer, and neither switches off in a quiet market.

The resolution fee curve runs from a floor to a ceiling. The floor is above zero
and applies to every withdrawal, so any exit at all pays the stayers half of
something. Section 09's own table names a "Quiet" band as a band with a fee in
it, not as a null.

Separately, section 10's revocation fee is 70 percent, half burned and half paid
to the bankers still at their desks. That pays out on dormancy reports, which do
not correlate with exit volume at all.

The honest version is "in a quiet market it pays little", not "nothing". A
reader told it pays nothing will not understand why their balance moves.



## 5. TRANSFERABLE NO, on the certificate schedule, with no time qualifier.

`SCHEDULE` in index.html, row five, engraved under the heading
"SCHEDULE OF WHAT THIS PAPER GRANTS":

> ["TRANSFERABLE", "NO"]

**MISLEADING, mildly, and the heading is most of the defence.**

Read as a row about the PNG, it is correct and unremarkable. But the row above
it reads "BRANCHES OPEN, 1 OF 10", which is a protocol fact, not a fact about
the paper. Once one row is about the charter the reader maps the rest onto the
charter too, and the flat NO then says charters can never move.

Section 06 says "initially soulbound". Section 12 exists for this: a one way
switch enables transfers later, and once it is thrown a seat sale becomes a
second exit path, one with zero sell pressure on $STANDARD because the buyer
replaces the seller one for one. That is a whole mechanism the site's only word
on transferability forecloses.

Correction: "NOT AT LAUNCH" or "SOULBOUND AT LAUNCH" costs nothing and is true
of both the paper and the charter.



## 6. Authorship, stated flatly with no first party source.

Footnotes:

> "The protocol and the whitepaper are the work of @0xbeans."

**Unverified.** No author is named on standardreserve.xyz, in the whitepaper, or
in the site bundles. I am not ruling this WRONG, because I am not the party who
can settle it from the outside, but the site states it without hedge and it is
the one claim on the page that cannot be checked against the document. The
publisher should either source it or soften it.

The X handle next to it, @standard_rsv, is correct: it is the handle in the
protocol's own compiled bundle and it is the one that renders in the footer of
standardreserve.xyz.



## Correct, one line each

Question one, `buying-into-the-auction`. Buyers set the price, payment in
$STANDARD burned on receipt, a per charter daily cap applies, first come first
served, unsold licenses never roll over. All correct against sections 07 and 08,
and the cap is named without its number, which is right. Everything in this
question is correct except item 1 above.

Question two, `flow-turns-negative`. Contraction is net flow negative or zero,
issuance cut immediately, fee routing to the contraction vault for buyback and
burn, downturns decay the price to the floor faster so expansion is cheapest
during contractions, and the bank turns defensive faster than it turns generous.
Correct, sections 05 and 08.

Question three, `crowded-exit-door`. The curve is quadratic between a floor and
a ceiling, the rate locks the moment you commit, half of every fee burns and
half pays the bankers who stayed, and withdrawals are never paused or queued.
All four correct, section 09, and all four stated without a single redacted
number. This is the paragraph I would have been most worried about and it holds.

Question four, `retiring-a-branch`. Retirement liquidates that branch's share of
the accrued balance and permanently retires the vehicle that produced it, one of
ten liquidates one tenth, all ten liquidates everything and burns the charter,
and the only way back is a charter at auction. Correct, sections 06 and 09. It
does not repeat that the released amount arrives minus the resolution fee, but
question three carries that and the two sit three screens apart.

Question five, `going-quiet`. Reportable after 30 days by anyone, 2 percent
bounty capped at 100,000 tokens, 70 percent revocation fee, branches shuttered,
charter burned, remaining 30 percent sent on, zero cost check in exists so
holding is free. Every number correct and every number published. Section 10.

Question six, `one-hour-spike`. "The issuance rate moves on the sum of the last
two completed epochs, so one manipulated hour cannot swing it. Fee routing moves
on the sign of the current epoch's net flow alone." Correct, section 04, and it
is the one thing on this site I would have bet a careless writer would get
wrong. The site keeps the slow lever and the fast lever apart, and the key
option is the only one that reads both.

Question seven, `where-the-fees-go`. 70 percent to the active vault, 15 percent
to protocol owned liquidity, 15 percent to the team, the same in either regime;
expansion vault buys hard reserve assets; contraction vault buys and burns all
of it in rate limited hourly steps so defense cannot be baited into one
blockable shot. Correct, section 11.

QUIZ.ranks.expansion. Up to the ten branches a charter can hold, payment in
$STANDARD burned in full so growth is paid out of float, total issuance per day
capped so a new branch changes how the issue is divided and not how much exists.
Correct, sections 07 and 13.

QUIZ.ranks.patient, other than item 4. The unburned half of every resolution and
revocation fee is paid to the positions that stayed. Correct, sections 09 and 10.

QUIZ.ranks.provisional, other than item 3. Congestion pricing rather than a
gate, never paused or queued at any fee level, rate locks on commitment.
Correct, section 09.

QUIZ.ranks.revocation. 30 days, reportable by anyone, bounty paid, 70 percent
revocation fee half burned and half to those who stayed, staying active free,
any interaction resets the clock, a zero cost check in exists, "What is charged
here is silence, not holding." Correct, section 10, and the last sentence is the
single best line on the site. Dormancy is not presented as punitive here. The
red overstrike is on the certificate, the text under it says the remedy is free,
and the tweet copy repeats "reportable after 30 days, and the remedy is free".
That is the right reading of the mechanism.

QUIZ.ranks.sovereign. Makes no protocol claim.

Certificate, "BRANCHES OPEN, 1 OF 10". Correct. Every charter opens with its
first branch and can grow to 10 maximum, section 07.

Certificate, "AUTHORITY NONE", "ONCHAIN RECORD NONE", "CONFERS NOTHING", and the
footer line "UNOFFICIAL AND COMMEMORATIVE. NOT ONCHAIN, NOT AN ALLOWLIST,
CONFERS NOTHING." Correct, and they are claims about the paper rather than about
the protocol.

Certificate motto, "THE BANK IS CODE", credited in small caps to "THE STANDARD
RESERVE, WHITEPAPER V0.1". Correct and verbatim. It is the closing line of the
whitepaper's opening frame and the credit is accurate.

Page prose. "The Standard Reserve is a protocol where holding a charter makes
you a banker" is section 06 almost word for word. "It has not launched. There is
no live token and no live NFT, so anything selling $STANDARD today is fake" is
correct as of this date.

Charter numbers on the certificate are drawn from 1001 upward, so no card can
be mistaken for one of the 1,000 Founding Charters. That is a real trap avoided
and I note it because most fan sites would have walked into it.



## Redacted parameters: no leaks found

I checked the site against every parameter withheld from v0.1, in digits and in
words, including paraphrase.

Base issuance per day: absent. The multiplier range and its launch value:
absent, and the word multiplier does not appear. Epoch length: absent; the site
says "epochs" and "the current epoch" without ever giving a duration. Rate cut
step and rate raise step: absent. Licenses per day: absent, and the site says
"the licenses" and "the daily falling price auction" where a number would have
sat. Per charter daily license cap: named as "A per charter daily cap applies"
with no figure, which is exactly right. License start price and floor price:
absent, and, importantly, so is any gloss on how low the floor sits. Decay rate:
absent. Trading fee: absent. Resolution fee floor and ceiling: absent, and
question three says "quadratic between a floor and a ceiling" without either
end. Saturation point of the exit curve: absent.

Two near misses that are not leaks. "The curve is quadratic between a floor and
a ceiling" names the shape, which section 09 publishes in prose, and no value.
"Total issuance per day is capped" is section 13's own wording for the flywheel
and carries no rate.

The site publishes only what the document publishes in prose: the hard cap, the
genesis liquidity, the fee split, the ten branch maximum, the 30 day dormancy
clock, the 2 percent bounty and its 100,000 cap, the 70 and 30 percent
revocation split, and the 2x license open. That is the correct line and the site
holds it on every one of the fifteen redacted parameters.



## What a stranger would believe that is not true

Someone who learned my protocol entirely from this site would come away with the
mechanics substantially right, which is more than I expected. They would
correctly understand that issuance answers to the last two completed epochs
while fee routing answers to the sign of the epoch in progress, that retirement
is a trade of the vehicle for the value it earned, that the exit is priced
rather than gated and the rate locks on commitment, that half of what leavers
pay goes to those who stayed, and that dormancy charges silence and not holding
and that the remedy costs nothing. They would leave with four wrong beliefs.
They would believe both auctions open at twice yesterday's close, and so would
not understand why a charter seat reprices into demand faster than a license
does. They would believe exit pressure is withdrawals divided by what remains,
and so would expect the fee to run away in a heavy week instead of approaching a
ceiling. They would believe the regime sets the exit fee, and so would think a
positive net flow epoch guarantees them a cheap exit, which is the one wrong
belief here that could cost them money. And they would believe a charter can
never be transferred, and so would not know that section 12 holds a second exit
path, a seat sale that moves branches and balance whole with no sell pressure on
$STANDARD at all. Three of those four are one clause each to fix.
