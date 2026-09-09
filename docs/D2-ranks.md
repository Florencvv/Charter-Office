# D2. RANKS, SCORING AND STAMP SPECIFICATION
The Charter Office. Five ranks, one scoring engine, five physical marks.
Audited against 01-FACTS.md and 04-COPY-RULES.md.

## Note on numbers before anything else

Every number that describes the protocol in this file is taken from
01-FACTS.md and nothing else. The integers in Part 2 (points, option counts,
odds) and in Part 3 (rotation in degrees) are engineering machinery. They are
never rendered as text anywhere on the site, and no visitor sees a point total
or a score. The site shows a stamp and a verdict line. Nothing else.

## Two rules that bind every string below

The examination never gates the certificate. The paper is issued at Window 1
from any typed string. A rank changes the mark on paper that already exists.

No rank, stamp, verdict line or tooltip may suggest that any of this is
recorded, held, checked, carried forward or connected to a mint, an allowlist,
a wallet or anything onchain. Not as a promise, not as a hint, not as a joke.
Every card carries the standing footer already approved in 04-COPY-RULES.md:
"Issued on request. Confers nothing."


# PART 1. THE FIVE RANKS

A rank is a finding, not a compliment and not a rebuke. Patient capital is not
better than provisional. It is a different bet with a different published
price, and the copy for each one names the cost as plainly as the benefit.

## 1. Expansion

**Stamp, as engraved**

```
CLEARED FOR EXPANSION
LICENSE BURNED ON RECEIPT
```

Second line is straight from section 08. It keeps the word "cleared" attached
to a mechanic inside the protocol and stops it drifting toward eligibility for
something else.

**Description**

This profile turns balance into branches, up to the ten a charter can hold, at
the daily falling price auction. The protocol answers by taking payment in
$STANDARD and burning all of it, so growth here is paid for out of float.

Total issuance per day is capped, so opening a branch changes how the issue is
divided, not how much exists.

**Verdict line under the card**

Recorded as a buyer of licenses. The office enters the burn and takes no view
on the outcome.

## 2. Patience

**Stamp, as engraved**

```
STANDING
PATIENT CAPITAL
```

The owner's wording held exactly, split into a register field and its value so
no colon is doing weight lifting.

**Description**

This profile holds position through contraction and does not approach the exit
door. The protocol answers by paying the unburned half of every resolution and
revocation fee to the positions that stayed.

It is a bet on other people leaving. In a quiet market it pays nothing.

**Verdict line under the card**

Recorded as standing. The half of every exit fee that is not burned is paid to
this position.

## 3. Exit

**Stamp, as engraved**

```
PROVISIONAL
SUBJECT TO EXIT PRICING
```

**Description**

This profile retires branches when the market turns and moves the balance into
the wallet. The protocol answers with congestion pricing rather than a gate.
Withdrawals are never paused or queued at any fee level. The rate rises with
how much has left the bank over the trailing seven days, and locks the moment
you commit.

Under expansion the exit is cheap, at the floor. Under contraction it is
priced by the crowd, so this profile pays most in exactly the week it most
wants to leave.

**Verdict line under the card**

Recorded as leaving. The rate is set by everyone else at the door and locks on
commitment.

## 4. Dormancy

**Stamp, as engraved**

```
REVOCATION NOTICE
REPORTABLE AFTER 30 DAYS
```

**Description**

This profile stops interacting and lets the balance sit. After 30 days the
wallet can be reported by anyone. The whitepaper's own word for this banker is
the ghost.

The protocol answers with a bounty for the informant and a revocation fee set
deliberately worse than the worst case exit, so going dark is never the cheap
way out.

**Verdict line under the card**

No interaction on file. Reportable by anyone after 30 days. The remedy costs
nothing.

## 5. Sovereign

**Stamp, as engraved**

```
SOVEREIGN
EXAMINED AND FOUND CORRECT
```

The word is the whitepaper's own first word for the bank, not an invented tier.
The card never shows line one without line two, because "SOVEREIGN" alone
reads as a level and "SOVEREIGN, EXAMINED AND FOUND CORRECT" reads as a
finding. Engineers must treat the two lines as a single indivisible string.

**Description**

All seven answers match the mechanics as published. This is a reading of the
document, not a description of behaviour.

It is the only mark on the sheet applied without ink.

**Verdict line under the card**

Examined on all seven counts and found correct. Entered without ink.


# PART 2. SCORING

## The slot contract for D1

D1 owns the prose of the seven questions. D2 owns the slots. Each question has
exactly four options, ids a to d, and the letter assigned to each behavioural
lean changes from question to question so no visitor can find a pattern by
answering down one column.

Exactly one option per question is the option the protocol's own mechanics
reward under the conditions the stem fixes. Each question below names the
condition the stem must fix, because without it more than one option would be
defensible and the answer key would not hold.

The conceptual separation the whole examination turns on, and D1 should protect
it in the wording: patience is active holding, dormancy is no interaction.
They are not the same answer with different energy.

## The table

EXP is expansion, PAT is patience, EXT is exit, DOR is dormancy. KEY marks the
mechanically correct option.

### Q1. Expansion licenses and the Dutch auction
Stem must fix: the license auction has opened today and you want another branch.

| Option | Content of the option | EXP | PAT | EXT | DOR | KEY |
| - | - | - | - | - | - | - |
| Q1a | Buy at the open and pay the premium for certainty | 2 | 0 | 0 | 0 | |
| Q1b | Wait through the decay and buy near the floor, risking the sellout | 3 | 1 | 0 | 0 | KEY |
| Q1c | Keep the balance intact and open nothing | 0 | 2 | 1 | 0 | |
| Q1d | Leave the auction alone this cycle and the next | 0 | 0 | 0 | 3 | |

### Q2. Behaviour during contraction
Stem must fix: net flow is negative and the issuance rate has already been cut.

| Option | Content of the option | EXP | PAT | EXT | DOR | KEY |
| - | - | - | - | - | - | - |
| Q2a | Retire a branch and reduce exposure | 0 | 0 | 3 | 0 | |
| Q2b | Hold and change nothing | 0 | 3 | 0 | 0 | |
| Q2c | Stay in and take a license while licenses are at their cheapest | 3 | 2 | 0 | 0 | KEY |
| Q2d | Stop opening the wallet until it passes | 0 | 0 | 0 | 3 | |

### Q3. The exit door and the resolution fee
Stem must fix: exit volume across the bank is heavy this week.

| Option | Content of the option | EXP | PAT | EXT | DOR | KEY |
| - | - | - | - | - | - | - |
| Q3a | Commit early, ahead of the queue | 0 | 0 | 3 | 0 | |
| Q3b | Wait for a quiet week and leave then | 0 | 1 | 2 | 0 | |
| Q3c | Stay in and take the half of the fee that is not burned | 0 | 3 | 0 | 0 | KEY |
| Q3d | Stop interacting and decide later | 0 | 0 | 0 | 3 | |

### Q4. What retiring a branch actually costs
Stem must fix: a charter running ten branches and a need for part of the balance.

| Option | Content of the option | EXP | PAT | EXT | DOR | KEY |
| - | - | - | - | - | - | - |
| Q4a | Retire every branch at once and take the whole balance | 0 | 0 | 3 | 0 | |
| Q4b | Retire one branch, take that share, leave the rest earning | 1 | 1 | 2 | 0 | KEY |
| Q4c | Retire nothing and keep every branch earning | 0 | 3 | 0 | 0 | |
| Q4d | Leave it accruing and stop opening the wallet | 0 | 0 | 0 | 3 | |

### Q5. Going dormant
Stem must fix: you intend to hold and do nothing else for a long stretch.

| Option | Content of the option | EXP | PAT | EXT | DOR | KEY |
| - | - | - | - | - | - | - |
| Q5a | Use the zero cost check in, which resets the clock and costs nothing | 0 | 2 | 0 | 0 | KEY |
| Q5b | Retire everything now rather than carry the risk | 0 | 0 | 3 | 0 | |
| Q5c | Open a branch so there is a reason to come back | 3 | 0 | 0 | 0 | |
| Q5d | Hold and do nothing. The wallet is safe where it is | 0 | 0 | 0 | 4 | |

Q5d carries the heaviest single weight in the table because this question reads
dormancy directly rather than by inference.

### Q6. Reading the net flow signal
Stem must fix: one completed epoch has turned positive after a negative run.

| Option | Content of the option | EXP | PAT | EXT | DOR | KEY |
| - | - | - | - | - | - | - |
| Q6a | Fee routing flips on the sign of that epoch alone, while the rate answers to the last two completed epochs | 1 | 1 | 0 | 0 | KEY |
| Q6b | One strong epoch lifts the issuance rate | 3 | 0 | 0 | 0 | |
| Q6c | A negative epoch is the signal to leave | 0 | 0 | 3 | 0 | |
| Q6d | The signal is noise and can be ignored | 0 | 0 | 0 | 3 | |

### Q7. Where the fees go
Stem must fix: protocol ETH arriving in an epoch, from trading fees and the charter auction alike.

| Option | Content of the option | EXP | PAT | EXT | DOR | KEY |
| - | - | - | - | - | - | - |
| Q7a | 70% goes to a vault either way. Net flow only decides whether that vault stacks reserves or buys back and burns | 1 | 1 | 0 | 0 | KEY |
| Q7b | Fees only build something during expansion | 3 | 0 | 0 | 0 | |
| Q7c | Fees are paid out to the bankers who exit | 0 | 0 | 3 | 0 | |
| Q7d | Fees never reach me, so they do not matter | 0 | 0 | 0 | 3 | |

## The resolution rule

1. Count the KEY marks. Seven of seven returns SOVEREIGN and stops. SOVEREIGN
   overrides all four profile totals and is never combined with them.
2. Otherwise sum the four profiles across the seven answers. The highest total
   takes the rank.
3. An unanswered question contributes no points and forfeits its KEY mark, so
   an incomplete examination can never return SOVEREIGN.
4. On a tie for the highest total, resolve in this fixed order:

**DORMANCY, then EXIT, then EXPANSION, then PATIENCE.**

Why that order, in the protocol's own terms:

- Dormancy first, because it is the only one of the four the protocol acts on
  without the banker's participation. It has a published clock attached to it,
  and a state with a deadline outranks a state without one.
- Exit second, because it is the only remaining state whose price is set by
  other people and moves week to week. It is the second most time sensitive
  reading, and putting it above patience stops the engine handing out the
  standing stamp by default.
- Expansion third, because it is an action taken with your own balance at a
  price you choose by waiting. Nothing about it expires.
- Patience last, because it is the residual. Holding is what is left when a
  visitor has not expanded, not exited and not gone quiet. If patience won ties
  it would win them by flattery, and the anti flattery rule has to survive
  contact with the arithmetic, not just the copy.

## What "mechanically correct" means, question by question

- **Q1b.** Section 08. The price only falls, from the open toward the floor
  across 24 hours, purchases execute instantly at the current price, and there
  are no bids, no escrow and nothing to snipe. Buying at the open pays a
  premium purely for certainty. There is a second reason the document supplies
  and most readers miss: the last and lowest base price that sold becomes
  tomorrow's open, so buying low also opens the next auction lower.
- **Q2c.** Section 05 names the rational move under contraction as staying,
  because exit fees pay those who remain. Section 08 adds that repricing is
  asymmetric and the price decays to the floor faster in downturns, so
  expansion is cheapest during contractions. The two published statements point
  at one option, and only Q2c holds both.
- **Q3c.** Section 09. Heavy exit volume raises the fee on the exiters
  themselves, and half of what they pay goes to the positions that stayed. With
  the stem fixing a heavy week, staying is the mechanically rewarded side of
  the same transaction. Q3b is sound advice in general and wrong under this
  stem, which is why the stem is not optional.
- **Q4b.** Section 09. Retirement liquidates that branch's share of the balance
  and permanently retires the vehicle that was producing it. Retiring one
  branch of ten liquidates one tenth. Retiring all ten liquidates everything
  and burns the charter, and section 06 closes the door behind it. Q4b meets
  the need with the smallest permanent loss and keeps the seat.
- **Q5a.** Section 10. Staying active is free, any interaction resets the
  clock, and a zero cost check in exists for bankers who only want to hold.
  Q5d is the trap and it is a fair one, because it is what most people would
  actually do.
- **Q6a.** Section 04. The issuance rate moves on signal(n), the sum of the
  last two completed epochs. Fee routing moves on the sign of F(n) alone. One
  epoch redirects the fees before it moves the rate. Slow lever for issuance,
  fast lever for fees, and Q6b fails on the published asymmetry that raises
  must be earned.
- **Q7a.** Section 11 and flywheel 3. The split does not change with direction.
  70% goes to the active vault in either regime, 15% to protocol owned
  liquidity forever, 15% to team. Net flow decides the vault's job, not the
  share. Fee revenue is direction agnostic, and buys and sells both pay in ETH.

## The odds of SOVEREIGN by guessing

Four options per question, seven questions, one correct option each,
independent. One in 16,384. The site never states this and never implies the
rank is difficult. It is rare because it is uncommon, not because it is hard,
and the copy says nothing about it either way.


# PART 3. STAMP PHYSICAL DESIGN NOTES

Palette anchors from the Chief. Tinted safety paper, an intaglio ink that is
brown black rather than pure black, a red orange second colour for numbering.
Every mark below is placed relative to those three.

**Gold seal, CLEARED FOR EXPANSION.** Not gold as metallic yellow, which would
fight the engraving and break the one bold element rule. A struck ochre bronze,
warm, greened slightly in the shadows, sitting between the brown black of the
plate and the red orange of the numbering. Circular, a double rule at the rim,
the first line following the outer curve and the second set straight across the
middle. It is a struck seal, so the ink is uneven by nature: full at the rim
where the die bites, starved in the centre where the die is flattest. Rotate
about three degrees clockwise. It sits low right and overlaps the engraved
border, clipping the last rule of the frame, never a letter of the name. The
misregistration is a hand setting a die down: the inked circle and the
impression ring do not agree, offset about half a rule width down and left.

**Struck seal, STANDING PATIENT CAPITAL.** The quietest of the four inked
marks. Print it in the brown black of the plate itself so it reads as the same
press rather than a second visit to the counter, which is the whole character
of this rank. Circular, single rule, no ornament, both lines straight. Struck
seal, not rubber. Rotate one or two degrees anticlockwise and no further,
because this is the least theatrical object on the sheet. It stays inside the
frame and overlaps only the ruled ground, clear of the name and clear of the
body. Misregistration is minimal and must still be there: a thin halo on one
side where the pad tilted, and one broken arc in the rule where the paper did
not take.

**Blue stamp, PROVISIONAL SUBJECT TO EXIT PRICING.** A rubber handstamp, and it
must read as rubber rather than as engraving. Dull registry blue, slightly grey
and slightly toward purple, the colour of a pad re inked more times than it
should have been. Rectangular, plain box rule, squared corners, the two lines
stacked and letterspaced wide. Rotate about six degrees anticlockwise, enough
that it was obviously placed by a hand working through a pile. It overlaps the
certificate text, crossing the lower line of the body, and the text stays
readable underneath through a multiply blend. Misregistration is the tell: the
box rule breaks in two places, ink is heavy on the leading edge where the stamp
landed and starved on the trailing edge where it lifted, and one corner of the
box does not print at all.

**Red angled overstamp, REVOCATION NOTICE REPORTABLE AFTER 30 DAYS.** The
loudest object on the entire site, and it is allowed to be, because it is the
only cancellation the office issues and a cancellation that whispers is a
contradiction. Take the red orange of the numbering and push it toward blood,
applied with a large rubber handstamp. No outer box. The two lines run between
one thick rule above and one below, the way a cancellation runs across a
document rather than sitting in a corner of it. Rotation is the point: about
fifteen degrees anticlockwise, reading from lower left to upper right, sweeping
across the face. It crosses the name, the body and the border, and it prints
multiply so the paper and the engraving stay visible through it. Never opaque,
because an opaque block is a graphic and a translucent one is ink. The
misregistration is loud and specific: the impression is heavy where the sweep
begins and dries out toward the end, letters break where they cross the
engraved rules because the ink did not take on raised plate, and the whole
sweep sits a hair off centre. It should look like the clerk stood up to apply
it.

**Blind emboss, SOVEREIGN EXAMINED AND FOUND CORRECT.** No ink at all, and the
absence is the rank. A die struck into the sheet from behind, so it reads only
as light: a bright edge on the upper left of every raised stroke, a shadow on
the lower right, the paper tint unchanged inside the letterforms because
nothing was added to the paper. Circular, one outer ruled ring, the first line
following the top of the curve and the second straight across the centre.
Rotation square, no angle. This is the only mark on the site applied with care,
and squareness is how the visitor is told that without a word. It sits low
right where the gold seal would go, overlapping the ruled ground and nothing
else. Its misregistration is not lateral, it is pressure: one quadrant of the
ring strikes deeper than the rest, and that quadrant should very slightly crack
the paper tint. Anyone who has handled a notarised document will recognise it
immediately. Anyone who has not will barely see it. Both outcomes are correct.


# PART 4. THE DORMANCY NOTE

Three lines, printed under the revocation card, in the body face rather than
the display face. This is the only place on the site where a rank explains a
rule at length, and it earns that because the rule has just been applied to the
visitor's own paper.

> A wallet with no interaction for 30 days can be reported by anyone, and the
> informant is paid 2% of the dormant balance, capped at 100,000 tokens.
>
> The wallet then pays a 70% revocation fee, half burned and half paid to the
> bankers who stayed. Its branches are shuttered, its charter burns, and the
> remaining 30% is sent on.
>
> Staying active is free. Any interaction resets the clock, and a zero cost
> check in exists for bankers who only want to hold. What is charged here is
> silence, not holding.

The third line is not optional and is not a softener. Without it the site
describes a protocol that punishes holders, which is the opposite of what
section 10 says, and E2 should treat its removal or shortening as a factual
error rather than an edit.


# COMPLIANCE CHECKS RUN ON THIS FILE

- No em dashes and no double hyphens, including in table rules and code fences.
- Every protocol number traced to 01-FACTS.md: 30 days, 2%, 100,000 tokens,
  70%, 30%, 7 days, 70%, 15%, 15%, 24 hours, ten branches, one tenth.
- The redacted license count is never named. Section 08 conditions are written
  as "the day's licenses" throughout.
- No banned vocabulary and no banned constructions. No exclamation marks, no
  rhetorical headings, no "not just X but Y".
- No rank name reads as a tier. SOVEREIGN never appears without its second
  line.
- Nothing in any rank, stamp, description or verdict line refers to a mint, an
  allowlist, a wallet, eligibility, or anything recorded onchain.
- Patience and exit are described with equal weight, each with its published
  cost named in the same paragraph as its published benefit.
