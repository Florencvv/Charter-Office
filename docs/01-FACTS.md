# WHITEPAPER V0.1 FACT LEDGER
Transcribed by Chief from https://www.standardreserve.xyz/whitepaper/ on 2026-09-09.
This is the only source of truth. E2 audits every site claim against this file.

## Frame

"The sovereign onchain central bank. It sets its own rate, defends its own
currency, and stacks its own hard reserve. It answers to no board, committee, or
government. Because it's 4,000 lines of immutable code. The bank is code."

One currency ($STANDARD), one market (ETH to $STANDARD pool on Uniswap v4), one
signal that affects policy (net ETH flow through that market), one authority
(the central bank, 4,000 lines of immutable code).

Bankers hold charters, charters operate bank branches, branches earn issuance.

## 02 The six entities

| Entity | What it is |
|---|---|
| $STANDARD | ERC-20, 1B hard cap. Minted at exactly one moment, a withdrawal. Burned constantly. |
| The pool | ETH to $STANDARD on a hooked Uniswap v4 pool. Every swap feeds the bank ETH. Net flow is measured here. |
| The central bank | The issuing authority. Reads net flow, sets the issuance rate, routes fees. |
| A charter | Initially soulbound NFT that makes you a banker. One charter is one bank holding 1 to 10 branches. 1,000 at genesis. New ones minted only at the daily ETH auction. |
| A branch | The yield accrual vehicle inside a charter. Each branch accrues a pro rata share of daily issuance. Open new ones by burning $STANDARD. Cash out by burning the vehicle. |
| The vaults | Where fees land. Expansion vault stacks reserves, contraction vault buys back and burns. |

Official mental model, quotable: a charter is a company, branches are its
stores. The company earns through its stores, reinvests earnings to open more,
and pays its owner by closing stores, one at a time or all at once. Closing the
last store dissolves the company.

Flows: traders trade the pool with no charter needed; the v4 hook reports net
flow to the bank; the bank issues to branches pro rata each epoch; bankers burn
$STANDARD on expansion licenses; bankers retire branches to realise earnings;
new charters are bought at a daily ETH auction whose ETH enters the same fee
engine as trading fees.

## 03 The currency, published numbers

- Hard cap 1,000,000,000 $STANDARD, 18 decimals
- Genesis 100,000,000 as protocol owned liquidity locked into the v4 pool. The
  only pre mint. Full range, owned by the protocol, can never be withdrawn.
- Issuance budget 900,000,000. When cumulative issuance reaches the budget, base
  issuance stops permanently and the economy runs closed loop on recycled fees.

Minted on demand. Issuance credits a balance as a ledger entry; tokens are
minted only on withdrawal. Burned by expansion licenses (100%), open market
buybacks (100%), resolution fees (50%).

Identity 3.1: circulating supply = 100,000,000 + withdrawal mints - cumulative burns
Identity 3.2: max supply ever = 1,000,000,000 - cumulative burns, strictly non increasing

Quotable: "Circulating supply is a receipt."

## 04 The net flow signal

- F(n) = gross ETH in from buys minus gross ETH out from sells, per epoch
- signal(n) = F(n-1) + F(n-2), the sum of the last two completed epochs
- The issuance rate moves on signal(n). Fee routing moves on the sign of F(n) alone.
- Measured at the canonical pool, denominated in real capital (ETH), so one
  manipulated hour cannot swing the rate. Slow lever for issuance, fast lever
  for fees.

## 05 Monetary policy

Issuance runs at a base rate per day scaled by a policy multiplier m, split pro
rata and streamed second by second across the epoch. Balances tick up in real
time and a new branch earns from the moment it opens.

The asymmetry, quotable and safe: "cuts are immediate, raises must be earned"
and "The bank turns defensive faster than it turns generous."

Two regimes, expansion (net flow positive) and contraction (net flow negative
or zero):

| | Expansion | Contraction |
|---|---|---|
| Issuance | climbing if sustained | cut immediately |
| Fee routing | expansion vault, hard reserve assets | contraction vault, buyback and burn |
| Licenses | cost more, floor scales with the rate | cost less |
| Exits | cheap, at the floor | priced by the crowd, up to the ceiling |
| Rational move | expand, every new branch burns supply | stay, exit fees pay those who remain |

## 06 Charters

- Initially soulbound NFT. Holding one makes you a banker.
- Genesis: 1,000 Founding Charters, free. An allowlist portion and a public
  portion, limit one per wallet. No sale and no proceeds; the team seeds the
  genesis liquidity itself.
- After genesis: daily Dutch auctions in ETH. Proceeds enter the fee engine.
- Lifecycle: a charter lives until its last branch is retired, then the NFT
  burns. The only way back in is buying a new charter at auction.
- Quotable: "There are no revolving doors."

## 07 Branches and expansion licenses

- Every charter opens with its first branch and can grow to 10 branches maximum.
- Each branch is one share of every epoch's issue.
- Additional branches require an expansion license sold at a daily Dutch auction.
- Payment: $STANDARD, 100% burned.
- Price decays exponentially from the open to the floor across 24 hours.
- The floor only prevents literal zero sales.
- A branch begins earning the second it opens.
- Quotable: "the most rational move inside the system, growing your bank,
  permanently shrinks the float."

## 08 How the auctions work

One mechanism for both sales: a daily falling price Dutch auction. Price opens
high, decays toward a floor over 24 hours, purchases execute instantly at the
current price, first come first served. No bids, no escrow, no refunds, nothing
to snipe.

Licenses are paid in $STANDARD and burned. Charters are paid in ETH that flows
to the fee engine.

License auction:
- opens at 2x yesterday's closing sale price; if nothing sold, 2x the floor
- a per charter daily cap applies. The number is REDACTED, never write it.
- payment burned on receipt
- the day ends when the day's licenses sell or 24 hours pass
- unsold licenses do not roll over; the last and lowest base price that sold
  becomes tomorrow's open
- late in the day the price approaches the floor. The whitepaper's gloss on how
  low the floor sits is a restatement of a redacted parameter. REDACTED, do not
  paraphrase it either.

Charter auction:
- the count per day starts at zero and is policy controlled
- opens at 3x the previous day's closing sale; if nothing sold, 3x the floor,
  and the floor is the admin set reserve price
- the charter mints to the buyer in the same transaction, first branch included
- unsold charters are never minted and do not roll over

Two intentional consequences, both quotable:
- "Buyers set the price, not the protocol." Buy early and pay a premium for
  certainty, or wait for a lower price and risk the daily supply selling out.
- Repricing is asymmetric. In downturns the price decays to the floor faster, so
  expansion is cheapest during contractions. In upturns the license series can
  rise at most 2x per day. Charters open at 3x rather than 2x "because scarce
  seats should reprice into demand faster than a daily commodity."

## 09 Earning and withdrawing

- Issuance accrues to a charter's balance continuously.
- To take profits a banker retires branches. Retirement liquidates that branch's
  share of the accrued balance into the wallet AND permanently retires the
  vehicle that was producing the yield.
- Pro rata rule: retiring one branch of ten liquidates one tenth of the balance.
  Retiring all ten liquidates everything and burns the charter.
- Quotable: "You cannot extract value and keep the vehicle that produced it."
- The resolution fee is congestion pricing on the exit door. W is tokens
  withdrawn system wide over the trailing 7 days, D is everything still held at
  the bank. Exit pressure P = W / max(D + W, floor term).
- The curve is quadratic between a floor and a ceiling and saturates when a
  redacted share of the bank tries to leave in a week.
- Your rate locks the moment you commit.
- Half of every fee is burned. The other half is paid to every banker who stayed.
- Withdrawals are never paused or queued at any fee level. The cost of leaving
  is the only control mechanism.
- Quotable, the whole point: "In a traditional run, whoever exits first is made
  whole and whoever waits absorbs the loss, so running first is always correct.
  Here, heavy exit volume raises the fee on the exiters themselves, and half of
  what they pay goes to the positions that stayed, so mass exits transfer value
  from the impatient to the patient."

## 10 Dormant bankers

Four published steps, all numbers safe:
1. Report. A wallet inactive for 30 days can be reported by anyone.
2. Bounty. The informant earns 2% of the dormant balance, capped at 100,000 tokens.
3. Revocation. The dormant wallet pays a 70% revocation fee, deliberately worse
   than the worst case resolution fee, so going dark is never the cheap way out.
   Half the fee burns, half pays the bankers still at their desks.
4. Shutdown. Their branches are shuttered, their charter burns, and the
   remaining 30% is sent to their wallet.

Staying active is free: any interaction resets the clock, and a zero cost check
in exists for bankers who simply want to hold. Lost keys, abandoned wallets and
tourists dilute no one.

The whitepaper's own word for a dormant banker is "the ghost".

## 11 Fees, reserves, defense

Fee split of all protocol ETH, trading fees and charter auctions alike, per epoch:
- 70% to the active vault, expansion or contraction by that epoch's net flow
- 15% to protocol owned liquidity, half swapped to $STANDARD, paired, added forever
- 15% to team

Expansion vault accumulates ETH and purchases hard reserve assets, tokenized
gold and comparable assets. Reserves are held by the bank.

Contraction vault buys $STANDARD on the open market and burns everything it
buys, in small rate limited steps "so defense cannot be baited into one
blockable shot". Each hourly tick spends the lesser of 10% of the vault balance
and 0.2% of pool reserves, bounding buybacks near 5% of pool depth per day at
launch settings. Unspent balance rolls forward. The vault can never sell.

Protocol owned liquidity only grows. Trading fees earned in $STANDARD are always
burned.

## 12 Transferable charters, future

Charters launch soulbound. A one way switch enables transfers later, at which
point selling a charter becomes a second exit path: the seat moves whole,
branches and balance included. A seat sale is an exit with zero sell pressure on
$STANDARD; the buyer replaces the seller one for one.

## 13 Flywheels

1. Adoption. New charters sell for ETH into the same engine as trading fees.
   Each entrant strengthens the balance sheet that made entry worth bidding on.
   Total issuance is capped per day, so a new banker changes how the issue is
   divided, not how much exists.
2. Expansion. The highest expected value action for an incumbent, adding
   branches, is also the largest supply sink. Self interest and supply reduction
   point the same way by construction, with no lockups needed.
3. Fee flow. Fee revenue is direction agnostic: buys and sells both pay in ETH.
   The protocol converts volatility itself into balance sheet.
4. Monetary policy. On exit, three defenses compound in the same moment:
   issuance cuts within one epoch, fee routing flips to buybacks, and the
   resolution fee rises with aggregate exit volume. "Downside conditions tighten
   the system rather than unwind it."

## 15 Disclaimer, official wording, paraphrase only

STANDARD is an experimental onchain protocol. It is not a bank, holds no
customer funds, offers no accounts, and is not a regulated financial institution
of any kind. Nothing here is investment advice. Participate at your own risk.

## REDACTED IN V0.1. Never appears on our site in any form.

THE TEST, from E2, and it is mechanical rather than a matter of judgement. A
value is redacted if and only if the whitepaper renders a redaction bar where
that value would sit. It stays redacted everywhere, including any place the
prose happens to restate it in words instead of digits.

By that test the redacted set is: base issuance per day, multiplier range,
multiplier launch value, epoch length, rate cut step, rate raise step, licenses
per day, the per charter daily license cap, license start price, license floor
price and any gloss on how low the floor sits, decay rate, trading fee,
resolution fee floor, resolution fee ceiling, the saturation point of the exit
curve, contract addresses, repository, audit status.

The section 14 table renders every one of its fifteen rows as a bar, but seven
of those parameters are published in prose elsewhere in the document. A blank
row in section 14 is therefore not on its own proof of redaction. The hard cap,
the genesis liquidity, the fee split, the ten branch maximum, the thousand
founding charters, the thirty day dormancy clock and the buyback rate limit are
all published in prose and all stay.

CHIEF'S RULING on one edge case: section 08 prose does name a number of licenses
per day in one sentence, while the section 14 table redacts it. The document
contradicts itself, and a site that publishes a number the protocol chose to
redact in its own summary table is the exact failure mode we are avoiding. The
number is banned. Write "the day's licenses" instead.

## Protocol status at build time, 2026-09-09

CONFIRMED first party, safe to publish: the genesis mint has not happened and
the protocol's own site says Coming Soon. No token contract and no NFT set are
live. A whitelist checker is live on the protocol's mint page.

UNCONFIRMED, and therefore banned from the site: that audits are in progress,
and that the team has promised no surprise launch. E2 could source neither to a
first party statement. We do not repeat claims we cannot source, however
reassuring they sound.

What the site does say, because it follows from the confirmed facts alone: any
mint page, presale or "$STANDARD" contract that exists today is fake. That line
is high on the page and is not softened.
