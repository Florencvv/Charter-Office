# C2 EDIT LOG. Four files, edited in place.

Authority: 04-COPY-RULES.md. Voice: 00-BRIEF.md. Every key name, id and heading
was preserved. Strings that were already correct were left alone.


# 1. MECHANICAL COUNTS

Scanned per file: em dash U+2014, en dash U+2013 used as an em dash, two
consecutive hyphens, exclamation marks, arrow characters on buttons and links,
middle dots joining meta strings, tracked out all caps eyebrow labels, and every
banned word and construction in 04-COPY-RULES.md.

| Check | C1 | D1 | D2 | D3 |
| - | - | - | - | - |
| em dash | 0 | 0 | 0 | 0 |
| en dash as em dash | 0 | 0 | 0 | 0 |
| double hyphen | 0 | 0 | 0 | 0 |
| exclamation mark | 0 | 0 | 0 | 0 |
| arrow on button or link | 0 | 0 | 0 | 0 |
| middle dot | 0 | 0 | 0 | 8 found, 8 fixed |
| banned vocabulary | 0 | 0 | 0 | 0 |
| banned construction | 0 | 0 | 0 | 0 |

Notes on the two checks that needed judgement rather than a count.

- Banned vocabulary. One regex hit, D2 line 439, is D2 quoting the rule "not
  just X but Y" inside its own compliance list. Not a violation. Nothing else in
  any of the four files touches the list.
- Tracked out all caps. Every block of caps in the four files is a mark on the
  plate, not an eyebrow label over interface: the eight card microlabels and
  THE BANK IS CODE in C1 section 8, the engraved disclaimer in C1 section 3, and
  the five stamps in D2 Part 1. All permitted. D1's "THE RULE." and "VERIFIED
  AGAINST." are document field names, and D1's own closing note already directs
  that THE RULE is never rendered as chrome. The shipping label is C1's
  `exam-rule-label`, which is sentence case. No fix needed.
- The eight middle dots were all in D3 and all in tweets. Replaced with a slash
  inside a bracketed stamp name and a full stop between clauses. Two stray
  closing brackets with no opener, D3 expansion recommended and dormancy spare b,
  were removed in the same pass.


# 2. SUBSTANTIVE CHANGES

Format is before, after, reason. Every replacement is shorter than or equal to
what it replaced except where a reason for the extra length is stated.

## C1-copy.md

**scam-no-wallet**
Before: "This office never connects a wallet. It has no wallet button and asks for no signature, no seed phrase, no payment, and no email. ..."
After: "This office never connects a wallet. It asks for no signature, no seed phrase, no payment, and no email. ..."
Reason: "has no wallet button" restates "never connects a wallet" in different words.

**lookup-explainer**
Before: "... the same text always cuts the same card, on any machine, for anyone."
After: "... the same text always cuts the same card, on any machine."
Reason: "for anyone" and "on any machine" are the same claim twice.

**exam-note**
Before: "Your certificate is already issued. Nothing in here can add to it or take it back."
After: "Your certificate is already issued. Nothing in here changes that."
Reason: the old second sentence was `exam-optional` reworded, and those two
strings sit near each other. This one now does one job, the past tense
reassurance, and stops competing with the approved line.

**exam-closing**
Before: "Examined and stamped. The paper is the same paper it was before."
After: "Examined and stamped. The paper is unchanged."
Reason: the paper repetition is the writer enjoying a cadence. A clerk states it
once. Matches the register of "Confers nothing."

**error-noscript**
Before: "... this office cannot cut the plate and no certificate can be issued."
After: "... this office cannot cut the plate."
Reason: second clause is the first clause restated.

**Note in section 5** replaced with the C2 ruling, so the file no longer carries
an open question. The compliance line in the self audit was pointed at the
ruling. No string changed.

## D1-questions.md

**Q1 THE RULE, opening**
Before: "One falling price auction serves both sales."
After: "Charters and licenses use the same falling price auction."
Reason: "both sales" has no antecedent on the page, so the reader has to stop and
work out which two. Nine characters longer, and the length buys the referent.

**Q1 option `wait-for-the-decay`**
Before: "Wait for the afternoon price and accept the risk of selling out."
After: "Wait for the afternoon price and risk the licenses selling out."
Reason: "the risk of selling out" reads first as the reader selling. Names the
subject. One character shorter.

**Q2 THE RULE**
Before: "Issuance is cut immediately, fee routing flips to the contraction vault for buyback and burn, and licenses cost less. Repricing is asymmetric: ... so expansion is cheapest during contractions."
After: "Issuance is cut immediately and fee routing flips to the contraction vault for buyback and burn. Repricing is asymmetric: ... so expansion is cheapest during contractions."
Reason: "licenses cost less" and "expansion is cheapest during contractions" are
the same fact, and the second one is the precise version.

**Q3 Scenario, opening sentence cut**
Before: "A lot of the bank is trying to leave in the same week. Withdrawals over the trailing seven days are the heaviest you have seen ..."
After: "Withdrawals over the trailing seven days are the heaviest you have seen ..."
Reason: "in the same week" and "trailing seven days" are one fact stated twice,
and the second sentence is the one that carries the mechanism.

**Q5 Scenario, second sentence cut**
Before: "... no plan to touch the charter for a season. No purchases, no retirements, no reason to sign anything. The balance accrues on its own while you leave the wallet alone."
After: "... no plan to touch the charter for a season. The balance accrues on its own while you leave the wallet alone."
Reason: a three item list used as rhythm, not information. All three items are
already inside "no plan to touch the charter."

**Q6 THE RULE, summary line cut**
Before: "... Slow lever for issuance, fast lever for fees. Both are measured at the canonical pool ..."
After: "... Both are measured at the canonical pool ..."
Reason: the line restates the two sentences immediately above it in a neater
shape. Neatness is not a second fact.

**Q7 THE RULE, opening**
Before: "Protocol ETH splits one way: 70% to the active vault ..."
After: "Protocol ETH splits the same way in either regime: 70% to the active vault ..."
Reason: "one way" reads as direction rather than invariance, which inverts the
point of the question. Twenty two characters longer, and the length is the
answer to the question the stem asks.

## D2-ranks.md

**Expansion description**
Before: "... and pays for each one at the daily falling price auction. The protocol answers by taking payment in $STANDARD and burning all of it ..."
After: "... at the daily falling price auction. The protocol answers by taking payment in $STANDARD and burning all of it ..."
Reason: payment named twice in consecutive clauses. The parallel "The protocol
answers" opening, which runs across all five ranks, is preserved.

**Expansion description, second paragraph**
Before: "The published counterweight sits in the same paragraph. Total issuance per day is capped ..."
After: "Total issuance per day is capped ..."
Reason: the visitor is not holding the whitepaper. A sentence about where a fact
sits in another document is a second job on a card that has one.

**Patience description**
Before: "The protocol answers with the half of every resolution fee that is not burned, which is paid to the positions that stayed, and with the same half of every revocation fee."
After: "The protocol answers by paying the unburned half of every resolution and revocation fee to the positions that stayed."
Reason: a sentence that has to be read twice, because the recipient arrives in a
relative clause and the second fee arrives after it. Fifty one characters shorter.

**Patience description, closing**
Before: "In a quiet market it pays nothing, and that is the honest description of it."
After: "In a quiet market it pays nothing."
Reason: the cut clause is the writer awarding himself credit for honesty. The
sentence is already honest without the certificate.

**Exit description**
Before: "Withdrawals are never paused or queued at any fee level, the rate rises with how much has left the bank over the trailing 7 days, and it locks the moment you commit."
After: "Withdrawals are never paused or queued at any fee level. The rate rises with how much has left the bank over the trailing seven days, and locks the moment you commit."
Reason: three unrelated facts on one comma run. Split at the natural break. "7"
set as "seven" to match D1 and the surrounding prose.

**Exit description, closing**
Before: "... pays most in exactly the week it most wants to leave. That is the trade, stated once, without a verdict on it."
After: "... pays most in exactly the week it most wants to leave."
Reason: same fault as the patience closing. Announcing that you have withheld a
verdict is a verdict.

**Dormancy description, closing**
Before: "... so going dark is never the cheap way out. The full note is in Part 4, and it is the one card that ends with a free remedy."
After: "... so going dark is never the cheap way out."
Reason: a document cross reference plus the designer admiring his own structure.
Part 4 prints directly underneath, so the pointer is furniture.

**Dormancy verdict line**
Before: "No interaction on file. Reportable by anyone after 30 days, and curable at no cost today."
After: "No interaction on file. Reportable by anyone after 30 days. The remedy costs nothing."
Reason: "curable" is a clinic and not a registry, and "today" imports an urgency
the office does not have. Three characters shorter.

**Sovereign description**
Before: "This is a reading of the document rather than a description of behaviour, so it replaces the four profiles instead of sitting on top of them as a higher grade."
After: "This is a reading of the document, not a description of behaviour."
Reason: the cut half is scoring engine internals explained to a visitor who
cannot see the scoring engine, and it protests the tier reading loudly enough to
plant it. The distinction survives on its own.

**Part 4 dormancy note, second line**
Before: "The wallet then pays a 70% revocation fee, half burned and half paid to the bankers still at their desks, its branches are shuttered, its charter burns, and the remaining 30% is sent to it."
After: "The wallet then pays a 70% revocation fee, half burned and half paid to the bankers who stayed. Its branches are shuttered, its charter burns, and the remaining 30% is sent on."
Reason: five clauses in one breath. Split, and "still at their desks" traded for
"who stayed", which is the wording the patience card and D1 already use.

**Part 4 dormancy note, third line**
Before: "Any interaction resets the clock and a zero cost check in exists for bankers who only want to hold, so what is charged here is silence, not holding."
After: "Any interaction resets the clock, and a zero cost check in exists for bankers who only want to hold. What is charged here is silence, not holding."
Reason: split only. No substance removed, per D2's own instruction that
shortening this line is a factual error rather than an edit.

## D3-tweets.md

**Expansion, recommended**
Before: "... 🏦🔥 / ... burn the $standard for it / by @flxrnc ]"
After: "... 🏦 / ... burn the $standard for it. by @flxrnc"
Reason: unopened bracket, and the fire emoji is the one piece of brand account
punctuation in the file. The rationale under it claimed a shrug at the end that
was not in the tweet; the rationale was corrected to describe the tweet.

**Patience, recommended**
Before: "it is a bet on other people getting bored, and the card says out loud that it pays nothing in a quiet market."
After: "a bet on other people leaving, and the card admits it pays nothing in a quiet market."
Reason: "says out loud" is a flourish. "getting bored" also drifts from the card,
which says leaving. Aligned to the card. Twenty four characters shorter.

**Sovereign, recommended**
Before: "... to see that anything happened at all."
After: "... to see that anything happened."
Reason: "at all" carries nothing.

Middle dots and dead clauses removed from the six spares are listed under VETOED
and in the mechanical table. Character counts under each recommended tweet were
recomputed and corrected, including the exit tweet, whose stated 180 was already
179 before I touched anything.


# 3. VETOED

Three strings I refused rather than trimmed. Replacements are in the files.

1. D3, expansion spare b: "apparently my entire personality is opening another
   branch." Vetoed. This is a quiz result meme, it is the loudest brand account
   sentence in the project, and it is the only line in four files that would tell
   0xbeans he is being farmed. Replaced with "seven questions and i bought a
   license in every one of them", which reports the same finding and is shorter.

2. D3, patience spare b: "i think that is the whole joke." Vetoed. Explaining
   your own joke inside the joke. The observation about the ink lands without it.
   Clause removed, nothing added.

3. D3, dormancy spare b: "the fix costs nothing, which is the part that stings."
   Vetoed. It stages an emotional reaction for the reader, and the sting is the
   opposite of the flat register the recommended dormancy tweet gets right.
   Replaced with "the fix costs nothing." Same fact, no performance.


# 4. RULING ON THE WORD SEVEN

`exam-progress` keeps "Question {n} of seven". Rule number one bans numbers
invented about the protocol, and seven counts our own questions, a fact of this
page that the reader verifies by sitting the exam rather than a claim about the
bank. Recorded in C1-copy.md section 5.


# 5. STILL WRONG

Four things I cannot fix alone. All four are content decisions, not copy.

1. **D1 and D2 disagree about whether the examination has right answers.** D1's
   opening line is "No question has a correct answer. Every option is a
   defensible move." D2 Part 2 marks exactly one KEY per question, and SOVEREIGN
   requires seven of seven. Both cannot ship. This also decides whether D2's
   Sovereign card can keep the sentence "All seven answers match the mechanics as
   published", which I left standing pending the call. Chief.

2. **D1 and D2 disagree about the shape of every question.** D2 specifies four
   options per question with ids a to d, and gives its own wording for all
   twenty eight. D1 ships slug ids and gives three options for questions 1, 3, 5,
   6 and 7. The two files also fix different stems for question 6: D1 sets a one
   hour price spike, D2 sets one completed epoch turning positive after a
   negative run. The engineer cannot wire either file until D1 and D2 agree
   which one owns the option text. I did not edit around this, because editing
   options that may be deleted is churn.

3. **D2 dormancy: "a revocation fee set deliberately worse than the worst case
   exit."** The resolution fee ceiling is redacted per D2's own compliance note,
   so this is a comparison against a number the site refuses to publish, and
   "deliberately" asserts intent the whitepaper may not state. E2 should verify
   it against section 10 or the clause should go.

4. **C1 `scam-where-real` names the protocol's X account, which 01-FACTS.md does
   not record.** C1 already flagged it for E2 and supplied the fallback. Still
   open, and it sits in the scam block, which is the one place on the site where
   an unverified claim is a real cost. E2.
