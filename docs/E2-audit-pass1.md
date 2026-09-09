# E2 AUDIT, PASS 1: 01-FACTS.md against the live whitepaper

Auditor: E2. Date: 2026-09-09.
Sources checked independently:
- Rendered document, https://www.standardreserve.xyz/whitepaper/ (browser, full text)
- Compiled source, https://www.standardreserve.xyz/assets/whitepaper-CWJ24W4_.js (313,690 bytes)
- https://www.standardreserve.xyz/app/protocol/ and its chunk ProtocolPage-CX0WyTHN.js
- https://www.standardreserve.xyz/app/mint/ and its chunk PrelaunchMintPage-CoYlM_AZ.js
- https://www.standardreserve.xyz/__whitelist/current.json
- Web search plus the X syndication JSON endpoint for status claims

Method note that matters for everything below. The renderer defines a component
`p0({w,i})` that emits `<span class="wp-redact" role="img" aria-label="Redacted until launch">`
sized `w` characters wide. Every redacted value in this document is that span. The
integers sitting in the data arrays are bar widths, not hidden values. I confirmed
there are no concealed numbers anywhere in the bundle. The redaction is real and it is
at source, not a CSS trick. This also gives us an exact, mechanical test for what is
redacted, which I use in section 3.

***

## 1. ERRORS

Chief's transcription is unusually clean. I checked all fifteen sections line by line,
including every equation, every table cell and every quoted string, against the
compiled source. Equations 3.1, 3.2, 4.1, 5.1, 7.1, 9.1 and 11.1 are transcribed
correctly. The net flow signal is correctly built from the two completed epochs
n-1 and n-2, not from n and n-1. The fee split sums to 100 and is attributed to the
right destinations. The 70 percent revocation fee and the 30 percent remainder are
attributed to the ghost and not to the informant. The 2 percent bounty and the
100,000 token cap are right. The buyback tick is correctly the lesser of 0.10 of vault
balance and 0.002 of pool reserves. Burn percentages, 100 / 100 / 50, are right.
I found no arithmetic error, no inverted percentage, no misattributed rule.

I found three defects. One is a hard stop.

**1.1 The per charter license limit is a redacted parameter and the ledger publishes it.**
Line 120 of 01-FACTS.md reads "at most three licenses per charter per day."

Section 07's own parameter table redacts this exact value. Source array:
`bs=[["Licenses per day",5],["Per-charter limit",8],["Payment","$STANDARD, 100% burned"],["Start price",26],["Floor price",20],["Decay",15]]`
Every one of those integers is a redaction bar. "Per-charter limit" renders blank on the
live page. The number three appears only in section 08 prose, in the Purchase step:
"Each charter can buy at most three licenses per day."

This is the identical failure mode Chief already ruled on for the licenses per day
count. The document redacts the value in its parameter table and then leaks it in
narrative prose one section later. Chief caught the first instance and missed the
second. The same ruling must apply.

Corrected wording for the ledger: "each charter may buy only a small, capped number of
licenses per day; the cap is a redacted launch parameter."
Whitepaper section: value defined and redacted in 07, leaked in 08 (Purchase).

**1.2 The section 06 bullet is presented as complete when most of it is redacted.**
Lines 91 of 01-FACTS.md read "After genesis: daily Dutch auctions in ETH. Proceeds enter
the fee engine."

The source for that bullet is:
`["After genesis: daily Dutch auctions in ETH.",[36," ",42," ",30," ",38," ",24," Auction proceeds enter the fee engine like every other ETH flow."]]`

Five consecutive redaction bars, roughly 170 characters of redacted sentence, sit
between the two halves Chief transcribed. The ledger stitches the surviving fragments
into what reads like a complete published bullet. Nothing in it is false, but a writer
working from the ledger has no way to know that the post genesis charter auction
cadence and sizing are withheld, and will be tempted to fill the gap from section 08.

Corrected wording: keep both fragments, and add "a redacted block describing the post
genesis charter auction schedule sits between these two sentences."
Whitepaper section: 06.

**1.3 The stated redaction rule is over broad and, applied literally, contradicts the
rest of the ledger.**
Line 237 of 01-FACTS.md bans "every number in the section 14 launch parameters table."

Section 14 blanks all fifteen rows. Verified:
`ks=[["Hard cap",16],["Genesis liquidity",26],["Base issuance",11],["Multiplier m",30],["Epoch",7],["Founding Charters",21],["Charter auctions",28],["Branches per charter",8],["Expansion licenses",24],["License floor",19],["Trading fee",14],["Fee split",18],["Resolution fee",25],["Dormancy",22],["Buyback execution",27]]`

Seven of those fifteen rows name parameters the whitepaper publishes in plain prose
elsewhere in the same document:

| Section 14 row, blank | Published elsewhere as | Section |
|-|-|-|
| Hard cap | 1,000,000,000 | 03 |
| Genesis liquidity | 100,000,000 | 03 |
| Founding Charters | 1,000 | 02, 06 |
| Branches per charter | 10 | 02, 07 |
| Fee split | 70 / 15 / 15 | 11 |
| Dormancy | 30 days, 2%, 100,000, 70%, 30% | 10 |
| Buyback execution | min(0.10V, 0.002R), near 5% of pool depth per day | 11 |

Taken at its word, Chief's rule bans the hard cap, the fee split and the ten branch
maximum from our site. The ledger then uses all three freely. The rule as written is
self contradicting and the team will resolve the contradiction by ignoring it, which is
worse than having no rule.

Corrected rule, and it is mechanically checkable: a value is redacted if and only if the
whitepaper renders a `wp-redact` span at the point where the document defines that
value. Section 14 is a blanket placeholder table, closed by its own note "Final
parameters will be announced closer to launch," not a per value redaction judgment. The
per section tables in 05, 07 and 09 are the real redaction judgments, and so are the
inline bars in the prose of 05, 06, 07 and 09.

***

## 2. MISSING

Published facts the ledger omits that a teaching site would want. Nothing here is
redacted; all of it is on the live page.

**Front matter, omitted entirely.** The document opens with a Notice the ledger never
records: it is a design overview and not an implementation specification, it does not
contain crucial implementation details, safeguards against edge cases exist only in the
deployed contracts, a protocol forked from this document alone will be missing those
safeguards and can result in loss of user funds, and the only canonical implementation
is the official deployment at standardreserve.xyz. For a site whose whole job is
teaching these mechanics, this is the single most important omission in the ledger. It
is also the protocol's own anti scam language and it belongs high on our site.

**Section 01, omitted.** "Capital flowing in loosens policy, increases $STANDARD
issuance, and stacks hard reserves (tokenized gold). Capital flowing out tightens
policy, triggers buybacks and burns, and prices the exits." This is the cleanest
one sentence statement of the whole system and the ledger drops it.

**Section 02.** The branch row's own gloss, "so more branches = a bigger cut." The
system diagram caption, "Every path through the economy either burns $STANDARD or brings
the central bank hard assets. Most do both."

**Section 03.** The gloss under the receipt line: "It equals value withdrawn from the
system minus everything the bank has clawed back and burned. One onchain number tells
you whether the economy is eating or bleeding." Also the parenthetical that the
900,000,000 issuance budget is defined as the cap minus the genesis liquidity, which is
what makes the ledger's two identities close.

**Section 05.** Equation 5.1 is I_n = [redacted base] x d x m_n, where d is the epoch
length in days. The ledger says "base rate per day scaled by a multiplier" and never
records that epoch issuance scales with epoch length. Also omitted: a single branch's
daily yield in a system of N branches is base x m / N, which is the formula a reader
most wants. Also omitted: the multiplier update rule, equation 5.2, is itself fully
redacted, so nobody should go looking for it.

**Section 08.** Four omissions.
- "so demand can never push a sale above the open, and each open is at most 2x
  yesterday's close." The ledger keeps the 2x cap but drops the consequence, which is
  the actual point.
- "A demand spike sells days out instantly while the opens double until price catches
  demand (~100x in a week)."
- The charter mirror of the same paragraph: "a seat gets cheap within a day of demand
  dying, and a demand spike triples the open each day until price catches it."
- Charter Close step: "the last sale sets tomorrow's open." The ledger records this rule
  for licenses and drops it for charters.

**Section 09.** Three omissions.
- "The released amount is minted to the banker's wallet, minus the resolution fee."
  The ledger describes retirement without ever saying the fee is netted at mint.
- "Minting has an equal and opposite reaction. Every withdrawal retires the branch that
  earned it, permanently reducing your share of all future yield."
- The exit pressure table has four named tiers: Quiet, Elevated, Heavy, Bank run. All
  eight cells are redacted, but the existence and the names of four tiers are published
  structure and are safe to teach. The ledger does not mention the table exists.

**Section 11.** "The genesis position plus every epoch's POL share compound into a floor
of exit liquidity that no one can pull." This is the sentence that explains why POL
matters and the ledger reduces it to "only grows."

**Section 13.** Four omissions, one per flywheel.
- Adoption: the ETH routes to "reserves, permanent liquidity, buybacks," the three
  named destinations.
- Expansion: "every license is paid in $STANDARD and burned," and "no lockups or
  incentives needed to align them."
- Fee flow: "In expansion regimes it accumulates as hard reserves and permanent
  liquidity; in contraction regimes it finances buybacks and burns."
- Monetary policy: the resolution fee rise is "half burned, half redistributed to
  remaining positions," and "Each mechanism independently raises the relative payoff of
  holding exactly when exit pressure peaks."

**Section 14 has no heading in the ledger.** The ledger jumps from 13 to 15. Section 14
exists, it is titled Launch parameters, it is a fifteen row table with every value
redacted, and it closes with "Final parameters will be announced closer to launch."
A reader of the ledger cannot tell that section 14 exists at all.

***

## 3. REDACTION SWEEP

### 3a. Section 14 launch parameters table, every row

Every one of the fifteen rows renders blank. There are no exceptions.

1. Hard cap
2. Genesis liquidity
3. Base issuance
4. Multiplier m
5. Epoch
6. Founding Charters
7. Charter auctions
8. Branches per charter
9. Expansion licenses
10. License floor
11. Trading fee
12. Fee split
13. Resolution fee
14. Dormancy
15. Buyback execution

See error 1.3 for why this table alone is not the redaction list.

### 3b. Every other redaction span in the document

Section 05: base rate (inline, in the sentence and again inside equation 5.1); the whole
right hand side of equation 5.2; all five parameter table rows (Multiplier range, Launch
value, Epoch length, Rate cut, Rate raise); five inline bars in the asymmetry paragraph
(days to full issue, the ceiling name, time to ceiling, time from ceiling to floor,
dilution cut); the regime table Exits row, both cells, which are
`["cheap, ",3," floor"]` and `["priced by the crowd, up to ",4]`; and four bars in the
multiplier chart (ceiling, floor, launch value, per epoch steps).

Section 06: the five bar block described in error 1.2.

Section 07: all five value rows (Licenses per day, Per-charter limit, Start price, Floor
price, Decay); the inline floor definition; the entire left side of equation 7.1; the
value of P_start; and two bars in the auction chart (P start, floor).

Section 09: the floor term inside equation 9.1; the entire fee expression in 9.1; the
fee floor, the fee ceiling and the saturation share in the prose; all eight cells of the
exit pressure table; and six bars in the fee curve chart.

### 3c. Prose leaks of redacted values

This is the part that matters. A leak is a value that the document redacts at its point
of definition and then states in plain prose somewhere else. I found four, of which
Chief caught one.

**LEAK 1, already ruled on. Licenses per day = 100. Section 08, license auction header.**
"Once per day, initially 100 expansion licenses go on sale." Redacted in the section 07
table and in section 14. Banned. Chief's substitute wording stands.

**LEAK 2, new, same value, second occurrence. Section 08, license Close step.**
"The day ends when 100 licenses sell or 24 hours pass, whichever comes first." Same
banned number, a second time, in a different sentence. Chief's ledger correctly wrote
around it at line 122, but the ban needs to name both occurrences so nobody quoting the
Close step reintroduces it.

**LEAK 3, new, and the ledger currently publishes it. Per charter limit = three.
Section 08, license Purchase step.** "Each charter can buy at most three licenses per
day." Redacted in the section 07 table as "Per-charter limit." This is error 1.1. Under
Chief's own ruling this number is banned from our site. Substitute wording: "a capped
number of licenses per charter per day."

**LEAK 4, new, qualitative rather than numeric, and the ledger currently publishes it.
The license floor. Section 08, license Decay step.** "by the end they approach the floor
(about two days of one branch's yield)." Both "Floor price" in section 07 and "License
floor" in section 14 are redacted. This parenthetical is not a raw number but it is a
quantified characterisation of the redacted floor, expressed in a unit the reader can
compute once the base rate is announced. It is carried into the ledger at lines 125 to
126. I recommend the same ban: it is the protocol's own withheld parameter restated in
different units.

**Borderline, reported and not banned. Charter auctions per day = zero at launch.
Section 08.** "the count per day starts at zero and is policy-controlled." The "Charter
auctions" row in section 14 is blank and the section 06 bullet describing the post
genesis auction schedule is a redaction block. So a value for this parameter is withheld
in two places and stated in a third. I am not calling this a leak on the same footing as
the other four, because "starts at zero" is a structural statement that charter auctions
are switched off at launch, it is reinforced by the phrase "When enabled" in the same
paragraph, and the STATUS story on our site depends on it. My ruling: keep the fact,
never present it as a row in any parameters table on our site, and never write it as a
number. Write "charter auctions are not enabled at launch and are policy controlled."
Chief should confirm or overrule.

**Everything else is clean.** I checked whether any of the seven parameters that are
blank in section 14 but published in prose elsewhere are redacted at their point of
definition. None of them are. The hard cap, the genesis liquidity, the 1,000 founding
charters, the 10 branch maximum, the 70/15/15 split, all five dormancy numbers and the
full buyback formula are published deliberately, with no redaction span anywhere near
them. They are safe.

***

## 4. STATUS, verified as of 2026-09-09

| Claim | Verdict | Source |
|-|-|-|
| No live token | Confirmed, negative evidence | No contract address anywhere. The strings "audit", "etherscan", "github", "0x0" and "contract address" return zero matches across whitepaper-CWJ24W4_.js. No token contract is referenced on any page. |
| No live NFT | Confirmed | Mint page: "The mint is not live yet." and "COMING SOON". Mint status field reads "Coming soon". |
| No live mint | Confirmed, first party | Same as above, plus PrelaunchMintPage-CoYlM_AZ.js has no mint transaction path at all, only an eligibility lookup. |
| Genesis mint is Coming Soon | Confirmed, first party | Protocol page card: "Coming Soon / The Genesis Mint". |
| Whitelist checker is live | Confirmed, first party, and functional | Protocol page: "The whitelist checker is live. Whitelist spots are still available." The checker really works: it fetches /__whitelist/current.json, which returns `{"kind":"standard-whitelist-index","schema":1,"version":"e2595d9048d895ca611f4c51"}`, then does a hashed membership lookup. It is not a placeholder. |
| Checking status does not reserve a mint | Confirmed, first party | Mint page, verbatim. |
| 350 of 1,000 genesis spots allocated | Confirmed, first party | PrelaunchMintPage-CoYlM_AZ.js: `const ee=1e3,se=350`, passed as total and minted to the supply meter labelled "spots currently allocated". Note: the rendered page shows 0 until a count up animation fires, so do not read the number off a screenshot. The ledger omits this figure entirely and it is the most current status fact available. |
| Genesis charters are free, 1,000, one per wallet | Confirmed | Whitepaper 06. |
| Selection criteria for the whitelist | Confirmed, first party | Mint page: "wallet activity alongside meaningful contributions across replies, quote tweets, and DMs," and "A portion of the supply will remain available for the open mint." |
| Audits are in progress | UNCONFIRMED | Search summaries attribute "second round of audits" and Uniswap Foundation audit funding to the team, but every retrievable link is a third party account, not @standard_rsv. I could not obtain a single tweet id from the official account, and X HTML is unscrapable from here. The word "audit" appears zero times across the whitepaper and both app bundles. Do not assert this. |
| "There will be no surprise launch" | UNCONFIRMED | Same problem. The phrasing recurs in third party summaries of the official account but I could not retrieve the official post. If we want it on the site it must be quoted as a paraphrase attributed to reporting, or dropped. |
| Any mint page, presale or $STANDARD contract that exists today is fake | Supported, not quoted | This is our inference, and a correct one given the three confirmed rows above. It is not a first party statement. The protocol's own nearest equivalent is the whitepaper front matter Notice naming standardreserve.xyz as the only canonical implementation. Cite that instead of implying the team said it. |

One third party data point, for calibration only, retrieved through the syndication
endpoint: tweet 2093390526364242291, author XNXX_EN, dated 2026-08-28, states "Only 125
of the 1,000 spots are allocated rn." The first party figure today is 350. The two are
consistent with an allocation list that grows, and the trajectory supports the ledger's
"whitelist checker is live" framing. Do not cite the third party number.

Ledger correction required: lines 250 to 251 assert audits in progress and a stated no
surprise launch as facts. Both are UNCONFIRMED. Mark them or drop them.

***

## 5. QUOTABLES

Twelve exact phrases, each verified character for character against the compiled source,
each under fifteen words.

1. "The bank is code." (front matter)
2. "Circulating supply is a receipt." (03)
3. "One onchain number tells you whether the economy is eating or bleeding." (03)
4. "Slow lever for issuance, fast lever for fees." (04)
5. "cuts are immediate, raises must be earned" (05)
6. "The bank turns defensive faster than it turns generous." (05)
7. "There are no revolving doors." (06)
8. "the most rational move inside the system, growing your bank, permanently shrinks the float" (07)
9. "Buyers set the price, not the protocol." (08)
10. "The floor exists only to prevent literal-zero sales." (08)
11. "You cannot extract value and keep the vehicle that produced it." (09)
12. "Downside conditions tighten the system rather than unwind it." (13)

All twelve are safe. None contains a redacted value. Quote with attribution to The
Standard Reserve whitepaper v0.1 and the section number.

***

## 6. VERDICT

01-FACTS.md is safe to build on once the three defects in section 1 are fixed, and not
before. Chief's transcription of the mechanics is accurate to a degree I did not expect:
every equation, every percentage, every fee split and every attribution survived a line
by line check against the compiled source, and I found no factual error of substance in
fifteen sections. The problem is not accuracy, it is the redaction boundary. Chief
correctly identified the licenses per day leak and correctly banned it, then applied the
insight only to that one number, so the same failure reaches our ledger twice more: the
per charter limit of three, which the ledger states outright, and the license floor
expressed as two days of one branch's yield, which the ledger also states outright. Both
are values the protocol chose to withhold in its own parameter tables. Worse, the rule
Chief wrote to prevent exactly this, "every number in the section 14 launch parameters
table," is over broad enough that following it would ban the hard cap and the fee split
that the rest of the ledger depends on, so in practice the team would have ignored it.
Replace it with the mechanical test in error 1.3 and the boundary becomes checkable
rather than a matter of judgment. Finally, two status claims, audits in progress and the
no surprise launch statement, are presented as facts and I could not source either to
the official account; they must be marked UNCONFIRMED or dropped before anything is
published. Fix those, add the front matter Notice, and the ledger is a solid foundation.
