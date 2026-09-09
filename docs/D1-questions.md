# D1. THE EXAMINATION. SEVEN QUESTIONS

Optional. It changes the stamp, not the paper. No question has a correct answer.
Every option is a defensible move. The reveal is the payload.

Every claim below is traced to 01-FACTS.md on the VERIFIED AGAINST line. Nothing
appears here that is not in that file.


## 1. buying-into-the-auction

Scenario. Your charter has one branch and a balance large enough to buy an
expansion license. The auction opened high this morning and decays toward a
floor across the day. Other bankers are reading the same board.

Options.
- `buy-at-the-open` Buy at the open and pay the premium for certainty.
- `wait-for-the-decay` Wait for the afternoon price and risk the licenses selling out.
- `hold-the-balance` Hold the balance and open no new branch today.

THE RULE. Charters and licenses use the same falling price auction. Buyers set
the price, not the protocol. The open is twice yesterday's closing sale, or
twice the floor if nothing sold. Payment is $STANDARD, burned on receipt. A per
charter daily cap applies, purchases fill first come first served, and unsold
licenses never roll over.

VERIFIED AGAINST. 08 How the auctions work, opening paragraph and the License
auction list. 07 Branches and expansion licenses, payment burned 100%. 08 Two
intentional consequences, "Buyers set the price, not the protocol." Per charter
daily cap stated without a number under the CHIEF'S RULING in the REDACTED
section.


## 2. flow-turns-negative

Scenario. Net flow has been negative for several epochs. Your balance ticks up
more slowly than it did last week, and the license board is showing its lowest
prices since you took the charter. Nothing else about the position has changed.

Options.
- `buy-cheap-licenses` Buy licenses now while they are cheap and add branches.
- `wait-for-the-turn` Wait for net flow to turn positive before spending anything.
- `retire-a-branch-now` Retire a branch now and take part of the balance out.
- `sit-still` Do nothing and let the balance accrue at the cut rate.

THE RULE. Contraction is net flow negative or zero. Issuance is cut immediately
and fee routing flips to the contraction vault for buyback and burn. Repricing
is asymmetric: in downturns the price decays to the floor faster, so expansion
is cheapest during contractions. The bank turns defensive faster than it turns
generous.

VERIFIED AGAINST. 05 Monetary policy, the two regime table and the asymmetry
quote. 08 Two intentional consequences, second bullet on asymmetric repricing.


## 3. crowded-exit-door

Scenario. Withdrawals over the trailing seven days are the heaviest you have
seen and the resolution fee is climbing with them. Your reason for holding has
not changed.

Options.
- `commit-now` Commit now and lock your rate before the fee climbs further.
- `wait-for-the-crowd` Wait for the crowd to clear and exit later at a lower fee.
- `stay-and-collect` Stay, and collect the half of every exit fee paid to holders.

THE RULE. The resolution fee is congestion pricing on the exit door. Pressure is
trailing seven day withdrawals against everything still held, and the curve is
quadratic between a floor and a ceiling. Your rate locks the moment you commit.
Half of every fee burns, half pays the bankers who stayed. Withdrawals are never
paused or queued.

VERIFIED AGAINST. 09 Earning and withdrawing, the resolution fee paragraph, the
quadratic curve, the rate lock, the half burn half paid split, and the line that
withdrawals are never paused or queued at any fee level.


## 4. retiring-a-branch

Scenario. Your charter runs ten branches and the balance is the largest it has
been. You want to take some of it out without closing the bank. Retirement is
the only way to move accrued balance into your wallet.

Options.
- `retire-one-of-ten` Retire one branch of ten and leave the rest earning.
- `retire-several` Retire several branches at once and take a larger share now.
- `retire-nothing` Retire nothing and let the balance keep accruing.
- `retire-everything` Retire all ten, take the whole balance, and buy back in later.

THE RULE. Retirement liquidates that branch's share of the accrued balance and
permanently retires the vehicle that produced it. Retiring one branch of ten
liquidates one tenth. Retiring all ten liquidates everything and burns the
charter. The only way back is buying a charter at auction. There are no
revolving doors.

VERIFIED AGAINST. 09 Earning and withdrawing, the pro rata rule and the quote
"You cannot extract value and keep the vehicle that produced it." 06 Charters,
lifecycle and "There are no revolving doors."


## 5. going-quiet

Scenario. You have the branches you want and no plan to touch the charter for a
season. The balance accrues on its own while you leave the wallet alone.

Options.
- `leave-it-alone` Leave the wallet untouched for the season and accept the quiet.
- `touch-it-periodically` Interact with the charter now and then, even with nothing to do.
- `retire-and-return` Retire everything now and buy a new charter when you return.

THE RULE. A wallet inactive for 30 days can be reported by anyone. The informant
takes 2% of the dormant balance, capped at 100,000 tokens. The dormant wallet
pays a 70% revocation fee, its branches shutter, its charter burns, and the
remaining 30% is sent on. A zero cost check in exists, so holding is free.

VERIFIED AGAINST. 10 Dormant bankers, the four published steps and the closing
paragraph on staying active being free.


## 6. one-hour-spike

Scenario. Someone moved the pool hard for an hour and the price is well off
where it sat this morning. Your balance is streaming second by second and you
are working out whether the bank has changed anything in response.

Options.
- `act-on-the-hour` Treat the hour as a rate change and buy a license now.
- `wait-for-epochs-to-close` Wait for the epochs to close before reading anything into it.
- `read-the-fee-routing` Watch where fees are landing rather than watching the issuance rate.

THE RULE. The issuance rate moves on the sum of the last two completed epochs,
so one manipulated hour cannot swing it. Fee routing moves on the sign of the
current epoch's net flow alone. Both are measured at the canonical pool and
denominated in ETH.

VERIFIED AGAINST. 04 The net flow signal, all four bullets. 05 Monetary policy,
issuance streamed second by second across the epoch.


## 7. where-the-fees-go

Scenario. Net flow is negative this epoch. Your ETH from the charter auction and
a trader's sell fee land in the same engine. Someone tells you the bank will
step in and defend. You are deciding how much to count on that.

Options.
- `wait-for-one-shot` Wait for a single large defensive buy and plan around that moment.
- `assume-small-steps` Assume defense comes in small repeated steps rather than one visible move.
- `count-on-nothing` Count on none of it and decide as though defense does not exist.

THE RULE. Protocol ETH splits the same way in either regime: 70% to the active
vault, 15% to protocol owned liquidity that only grows, 15% to the team. The expansion vault buys hard
reserve assets. The contraction vault buys $STANDARD and burns all of it in rate
limited hourly steps, so defense cannot be baited into one blockable shot.

VERIFIED AGAINST. 11 Fees, reserves, defense, the fee split, the expansion vault
reserve purchases, the contraction vault buying and burning in rate limited
steps, and protocol owned liquidity only growing. 02 The six entities, the
vaults row.


## Notes for C2 and E2

- The number of licenses per charter per day is named in 01-FACTS.md section 08
  prose and banned by the CHIEF'S RULING in the same file. Question 1 says
  "a per charter daily cap applies" and gives no figure.
- The resolution fee floor, ceiling and saturation point are redacted. Question 3
  says floor, ceiling and quadratic without values.
- The label "THE RULE" is a field name for the build, not site chrome. If it is
  rendered above the reveal block it should be set as ordinary text, since
  tracked out all caps labels are banned in 04-COPY-RULES.md.
