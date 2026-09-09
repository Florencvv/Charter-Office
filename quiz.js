/* The Charter Office. Examination data.
   Seven questions, four options each, one key option per question.
   Every claim traced to 01-FACTS.md. No redacted value appears here.
   The interface never marks an option right or wrong. The key field is a
   reading of the mechanism, not a judgement on the person answering. */

var QUIZ = {
  questions: [
    {
      id: "buying-into-the-auction",
      scene: "Your charter has one branch and a balance large enough to buy an expansion license. The auction opened high this morning and decays toward a floor across the day. Other bankers are reading the same board.",
      options: [
        { id: "a", text: "Buy at the open and pay the premium for certainty.", key: false, score: { expansion: 2, patience: 0, exit: 0, dormancy: 0 } },
        { id: "b", text: "Wait for the afternoon price and risk the licenses selling out.", key: true, score: { expansion: 3, patience: 1, exit: 0, dormancy: 0 } },
        { id: "c", text: "Hold the balance and open no new branch today.", key: false, score: { expansion: 0, patience: 2, exit: 1, dormancy: 0 } },
        { id: "d", text: "Step away from the board for a stretch and let the balance accrue untouched.", key: false, score: { expansion: 0, patience: 0, exit: 0, dormancy: 3 } }
      ],
      rule: "Charters and licenses use the same falling price auction. Buyers set the price, not the protocol. The open is twice yesterday's closing sale, or twice the floor if nothing sold. Payment is $STANDARD, burned on receipt. A per charter daily cap applies, purchases fill first come first served, and unsold licenses never roll over.",
      source: "08 How the auctions work, opening paragraph, the license auction list and the two intentional consequences. 07 Branches and expansion licenses, payment burned."
    },
    {
      id: "flow-turns-negative",
      scene: "Net flow has been negative for several epochs. Your balance ticks up more slowly than it did last week, and the license board is showing its lowest prices since you took the charter. Nothing else about the position has changed.",
      options: [
        { id: "a", text: "Retire a branch now and take part of the balance out.", key: false, score: { expansion: 0, patience: 0, exit: 3, dormancy: 0 } },
        { id: "b", text: "Wait for net flow to turn positive before spending anything.", key: false, score: { expansion: 0, patience: 3, exit: 0, dormancy: 0 } },
        { id: "c", text: "Buy licenses now while they are cheap and add branches.", key: true, score: { expansion: 3, patience: 2, exit: 0, dormancy: 0 } },
        { id: "d", text: "Do nothing and let the balance accrue at the cut rate.", key: false, score: { expansion: 0, patience: 0, exit: 0, dormancy: 3 } }
      ],
      rule: "Contraction is net flow negative or zero. Issuance is cut immediately and fee routing flips to the contraction vault for buyback and burn. Repricing is asymmetric: in downturns the price decays to the floor faster, so expansion is cheapest during contractions. The bank turns defensive faster than it turns generous.",
      source: "05 Monetary policy, the two regime table and the asymmetry quote. 08 Two intentional consequences, second bullet."
    },
    {
      id: "crowded-exit-door",
      scene: "Withdrawals over the trailing seven days are the heaviest you have seen and the resolution fee is climbing with them. Your reason for holding has not changed.",
      options: [
        { id: "a", text: "Commit now and lock your rate before the fee climbs further.", key: false, score: { expansion: 0, patience: 0, exit: 3, dormancy: 0 } },
        { id: "b", text: "Wait for the crowd to clear and exit later at a lower fee.", key: false, score: { expansion: 0, patience: 1, exit: 2, dormancy: 0 } },
        { id: "c", text: "Stay, and collect the half of every exit fee paid to holders.", key: true, score: { expansion: 0, patience: 3, exit: 0, dormancy: 0 } },
        { id: "d", text: "Leave the wallet closed this week and take no view while the door is crowded.", key: false, score: { expansion: 0, patience: 0, exit: 0, dormancy: 3 } }
      ],
      rule: "The resolution fee is congestion pricing on the exit door. Pressure is trailing seven day withdrawals against everything still held. The curve is quadratic between a floor and a ceiling. Your rate locks the moment you commit. Half of every fee burns, half pays the bankers who stayed. Withdrawals are never paused or queued.",
      source: "09 Earning and withdrawing, the resolution fee paragraph, the quadratic curve, the rate lock, the half burn half paid split, and withdrawals never paused or queued."
    },
    {
      id: "retiring-a-branch",
      scene: "Your charter runs ten branches and the balance is the largest it has been. You want to take some of it out without closing the bank. Retirement is the only way to move accrued balance into your wallet.",
      options: [
        { id: "a", text: "Retire several branches at once and take a larger share now.", key: false, score: { expansion: 0, patience: 0, exit: 3, dormancy: 0 } },
        { id: "b", text: "Retire one branch of ten and leave the rest earning.", key: true, score: { expansion: 1, patience: 1, exit: 2, dormancy: 0 } },
        { id: "c", text: "Retire nothing and let the balance keep accruing.", key: false, score: { expansion: 0, patience: 3, exit: 0, dormancy: 0 } },
        { id: "d", text: "Retire all ten, take the whole balance, and buy back in later.", key: false, score: { expansion: 0, patience: 0, exit: 3, dormancy: 0 } }
      ],
      rule: "Retirement liquidates that branch's share of the accrued balance and permanently retires the vehicle that produced it. Retiring one branch of ten liquidates one tenth. Retiring all ten liquidates everything and burns the charter. The only way back is buying a charter at auction. There are no revolving doors.",
      source: "09 Earning and withdrawing, the pro rata rule and the line on extracting value. 06 Charters, lifecycle and no revolving doors."
    },
    {
      id: "going-quiet",
      scene: "You have the branches you want and no plan to touch the charter for a season. The balance accrues on its own while you leave the wallet alone.",
      options: [
        { id: "a", text: "Interact with the charter now and then, even with nothing to do.", key: true, score: { expansion: 0, patience: 2, exit: 0, dormancy: 0 } },
        { id: "b", text: "Retire everything now and buy a new charter when you return.", key: false, score: { expansion: 0, patience: 0, exit: 3, dormancy: 0 } },
        { id: "c", text: "Open another branch so the charter gives you a reason to come back.", key: false, score: { expansion: 3, patience: 0, exit: 0, dormancy: 0 } },
        { id: "d", text: "Leave the wallet untouched for the season and accept the quiet.", key: false, score: { expansion: 0, patience: 0, exit: 0, dormancy: 4 } }
      ],
      rule: "A wallet inactive for 30 days can be reported by anyone. The informant takes 2% of the dormant balance, capped at 100,000 tokens. The dormant wallet pays a 70% revocation fee, its branches shutter, its charter burns, and the remaining 30% is sent on. A zero cost check in exists, so holding is free.",
      source: "10 Dormant bankers, the four published steps and the closing paragraph on staying active being free."
    },
    {
      id: "one-hour-spike",
      scene: "Someone moved the pool hard for an hour and the price is well off where it sat this morning. Your balance is streaming second by second and you are working out whether the bank has changed anything in response.",
      options: [
        { id: "a", text: "Treat the hour as a rate change and buy a license now.", key: false, score: { expansion: 3, patience: 0, exit: 0, dormancy: 0 } },
        { id: "b", text: "Wait for the epochs to close before reading anything into it.", key: false, score: { expansion: 0, patience: 3, exit: 0, dormancy: 0 } },
        { id: "c", text: "Watch where fees are landing rather than watching the issuance rate.", key: true, score: { expansion: 1, patience: 1, exit: 0, dormancy: 0 } },
        { id: "d", text: "Retire a branch while the price is where it is and take that share out.", key: false, score: { expansion: 0, patience: 0, exit: 3, dormancy: 0 } }
      ],
      rule: "The issuance rate moves on the sum of the last two completed epochs, so one manipulated hour cannot swing it. Fee routing moves on the sign of the current epoch's net flow alone. Both are measured at the canonical pool and denominated in ETH.",
      source: "04 The net flow signal, all four bullets. 05 Monetary policy, issuance streamed second by second across the epoch."
    },
    {
      id: "where-the-fees-go",
      scene: "Net flow is negative this epoch. Your ETH from the charter auction and a trader's sell fee land in the same engine. Someone tells you the bank will step in and defend. You are deciding how much to count on that.",
      options: [
        { id: "a", text: "Assume defense comes in small repeated steps rather than one visible move.", key: true, score: { expansion: 1, patience: 1, exit: 0, dormancy: 0 } },
        { id: "b", text: "Wait for a single large defensive buy and plan around that moment.", key: false, score: { expansion: 3, patience: 0, exit: 0, dormancy: 0 } },
        { id: "c", text: "Count on none of it and decide as though defense does not exist.", key: false, score: { expansion: 0, patience: 0, exit: 3, dormancy: 0 } },
        { id: "d", text: "Leave the vaults to the bank and stop checking on them for a while.", key: false, score: { expansion: 0, patience: 0, exit: 0, dormancy: 3 } }
      ],
      rule: "Protocol ETH splits the same way in either regime: 70% to the active vault, 15% to protocol owned liquidity, 15% to the team. The expansion vault buys hard reserve assets. The contraction vault buys $STANDARD and burns all of it in rate limited hourly steps, so defense cannot be baited into one blockable shot.",
      source: "11 Fees, reserves, defense, the fee split, the reserve purchases and the rate limited buyback. 02 The six entities, the vaults row."
    }
  ],
  ranks: {
    expansion: {
      stamp1: "CLEARED FOR EXPANSION",
      stamp2: "LICENSE BURNED ON RECEIPT",
      title: "Expansion",
      body: "This profile turns balance into branches, up to the ten a charter can hold, at the daily falling price auction. The protocol answers by taking payment in $STANDARD and burning all of it, so growth here is paid for out of float. Total issuance per day is capped, so opening a branch changes how the issue is divided, not how much exists.",
      verdict: "Recorded as a buyer of licenses. The office enters the burn and takes no view on the outcome."
    },
    patient: {
      stamp1: "STANDING",
      stamp2: "PATIENT CAPITAL",
      title: "Patience",
      body: "This profile holds position through contraction and does not approach the exit door. The protocol answers by paying the unburned half of every resolution and revocation fee to the positions that stayed. It is a bet on other people leaving, and in a quiet market it pays nothing.",
      verdict: "Recorded as standing. The half of every exit fee that is not burned is paid to this position."
    },
    provisional: {
      stamp1: "PROVISIONAL",
      stamp2: "SUBJECT TO EXIT PRICING",
      title: "Exit",
      body: "This profile retires branches when the market turns and moves the balance into the wallet. The protocol answers with congestion pricing rather than a gate, so withdrawals are never paused or queued at any fee level and the rate locks the moment you commit. Under expansion the exit sits at the floor, and under contraction it is priced by the crowd, so this profile pays most in the week it most wants to leave.",
      verdict: "Recorded as leaving. The rate is set by everyone else at the door and locks on commitment."
    },
    revocation: {
      stamp1: "REVOCATION NOTICE",
      stamp2: "REPORTABLE AFTER 30 DAYS",
      title: "Dormancy",
      body: "This profile stops interacting and lets the balance sit. After 30 days the wallet can be reported by anyone, the informant is paid a bounty, and the wallet pays a 70% revocation fee, half burned and half paid to the bankers who stayed. Staying active is free. Any interaction resets the clock, and a zero cost check in exists for bankers who only want to hold. What is charged here is silence, not holding.",
      verdict: "No interaction on file. Reportable by anyone after 30 days. The remedy costs nothing."
    },
    sovereign: {
      stamp1: "SOVEREIGN",
      stamp2: "EXAMINED AND FOUND CORRECT",
      title: "Sovereign, examined and found correct",
      body: "All seven answers match the mechanics as published. This is a reading of the document, not a description of behaviour. It is the only mark on the sheet applied without ink.",
      verdict: "Examined on all seven counts and found correct. Entered without ink."
    }
  },
  profileRank: { expansion: "expansion", patience: "patient", exit: "provisional", dormancy: "revocation" },
  tiebreak: ["dormancy", "exit", "expansion", "patience"],
  sovereign: "sovereign"
};

/* NOTES FOR THE ENGINEER

   Profile totals map to rank ids like this, because the profile names and the
   rank ids are not the same words:
   expansion goes to expansion, patience goes to patient, exit goes to
   provisional, dormancy goes to revocation.

   Resolution, in order. Count the key options. Seven of seven returns the rank
   named in the sovereign field and stops, overriding all four profile totals.
   Otherwise sum the four profiles and take the highest. On a tie, walk the
   tiebreak array in order and take the first profile still level at the top.
   An unanswered question scores nothing and forfeits its key mark.

   Question six keeps D1's one hour spike stem, so its key is option c. Under
   that stem the rate cannot answer to a single hour, while fee routing answers
   to the sign of the epoch in progress. Option c is the only one that reads
   both levers correctly. Option b is sound about the rate and silent about the
   fees, which is why it is not the key.

   TRACES, scored by hand against the table above.

   Trace 1. Answers b, c, c, b, a, c, a.
   Key marks seven of seven, so the sovereign rule fires and stops.
   Unused profile totals: expansion 9, patience 11, exit 2, dormancy 0.
   RANK sovereign.

   Trace 2. Answers a, c, b, b, c, a, b. Key marks two of seven.
   expansion 2 plus 3 plus 0 plus 1 plus 3 plus 3 plus 3 equals 15.
   patience 0 plus 2 plus 1 plus 1 plus 0 plus 0 plus 0 equals 4.
   exit 0 plus 0 plus 2 plus 2 plus 0 plus 0 plus 0 equals 4.
   dormancy 0. Highest is expansion at 15.
   RANK expansion.

   Trace 3. Answers c, a, a, a, b, d, c. Key marks none.
   expansion 0.
   patience 2 plus 0 plus 0 plus 0 plus 0 plus 0 plus 0 equals 2.
   exit 1 plus 3 plus 3 plus 3 plus 3 plus 3 plus 3 equals 19.
   dormancy 0. Highest is exit at 19.
   RANK provisional.

   Trace 4. Answers d, d, d, c, d, b, d. Key marks none.
   expansion 0.
   patience 0 plus 0 plus 0 plus 3 plus 0 plus 3 plus 0 equals 6.
   exit 0.
   dormancy 3 plus 3 plus 3 plus 0 plus 4 plus 0 plus 3 equals 16.
   Highest is dormancy at 16.
   RANK revocation.

   Trace 5, the tie. Answers d, b, c, c, d, c, d. Key marks two of seven.
   expansion 0 plus 0 plus 0 plus 0 plus 0 plus 1 plus 0 equals 1.
   patience 0 plus 3 plus 3 plus 3 plus 0 plus 1 plus 0 equals 10.
   exit 0.
   dormancy 3 plus 0 plus 0 plus 0 plus 4 plus 0 plus 3 equals 10.
   Patience and dormancy are level at 10. The tiebreak array reads dormancy
   first, so dormancy takes it.
   RANK revocation.

   Trace 6. Answers c, b, c, c, a, b, a. Key marks three of seven.
   expansion 0 plus 0 plus 0 plus 0 plus 0 plus 0 plus 1 equals 1.
   patience 2 plus 3 plus 3 plus 3 plus 2 plus 3 plus 1 equals 17.
   exit 1 plus 0 plus 0 plus 0 plus 0 plus 0 plus 0 equals 1.
   dormancy 0. Highest is patience at 17.
   RANK patient.

   All five ranks are reachable and the tiebreak order is exercised by trace 5. */
