# D2, cold read

Conditions: fresh browser profile, no stored state, 1366x768 desktop first, then a
375px phone. I opened the site before reading a line of source, and only opened
index.html, engine.js and quiz.js afterwards to name things precisely.

***

## 1. The first five seconds

Everything visible before scrolling, in order: a nav wordmark with the word
UNOFFICIAL beside it in red, a dark skyline banner with the title **The Charter
Office**, two lines of subtitle, one paragraph headed WHAT THIS IS, and two boxed
notices side by side. The first box is headed WHERE THINGS STAND and says the
protocol has not launched, there is no live token, no live NFT, and anything
selling $STANDARD is fake. The second is headed WHAT THIS OFFICE IS and says
unofficial, connects no wallet, asks for nothing, issues nothing the protocol
recognises.

**My genuine guess:** a holding page. A status notice for a crypto project that
has not shipped, put up by a fan to stop people getting scammed. I assumed my job
was to read it and leave. I did not think there was anything here to get.

The word "commemorative" appears in the subtitle and it did not land. To a
stranger, commemorative means a plate your grandmother owns.

**What the fold should have told me and did not:** that there is an object, that
it is free, that it takes one word to get it, and what it looks like. The single
most persuasive asset this project owns is the engraving, and there is not one
pixel of it above the fold. What is there instead is a 2352x600 canvas of a
generic skyline, which is decoration, in the exact slot where the product should
be. Two of the four things a first time visitor reads are apologies.

The owner's complaint that the site "only ever said nothing is official, do not
mint anything" survived the rebuild. He cut five paragraphs of it; it is now
distributed across twelve smaller places, and two of them are still above the
fold.

***

## 2. The first action

**Not obvious.** The input sits 1253px down the page. On this laptop that is one
and a half full screens of reading before you can do the one thing the site
exists to do. Between the fold and the field there is a three step explainer
block ("1 issue paper, 2 sit examination, 3 post it") which restates the section
headings you are about to scroll past, which themselves restate the nav.

The nav has an ISSUE link that jumps straight there, but nothing suggests it is
the fast path, and "Skip to the counter" is a screen reader skip link, not an
offer.

**Once there it is fine.** The placeholder "Any name, handle, or address" is
exactly right. I typed a handle and pressed the button.

**The result is the best moment on the site.** The card appears instantly,
directly under the field, the page moves you to it, and the URL becomes
`?n=flxrnc`. No wallet, no email, no wait. That is a genuinely good first
transaction and nothing on the fold prepares you for it.

**What happens next is not obvious.** Below the card are three buttons, then six
explanatory entries about parts of the certificate, then a second text input
labelled "Look up a certificate", then the examination, then the posting desk.
The action you want is three sections away, behind a box that looks like a second
attempt at the box you just used.

Two things I hit that a stranger would hit:

- The register accepts a charter number. Typing `7254` silently issues a brand
  new certificate for the literal string "7254" rather than saying that is a
  charter number, not a serial. The serial lookup itself works and is genuinely
  clever: pasting `01K6 RY3J DSHG R0` returned the original name.
- `id="postQuiet"` is declared twice, at index.html lines 726 and 729.

***

## 3. The certificate

Judged as an image, at full resolution, both unstamped and stamped.

**It is not a certificate generator from 2011.** That needs saying plainly,
because it is the one thing here that is unambiguously good. Guilloche rosette,
torn top edge running microtext, retained stub down the left with counterfoil
punches, engraved double border, a red UNOFFICIAL ISSUE overprint on the
diagonal, a hand drawn clerk's signature. At full size it reads as a photograph
of a real nineteenth century bank charter. Whoever drew this knew what they were
copying.

**Would I post it? Not as it stands.** Three reasons, in order of damage.

**One: it brags about being worthless.** The schedule is the largest block of
type on the sheet and five of its seven rows are negations.

```
BRANCHES OPEN          1 OF 10
ISSUED BY              THE CHARTER OFFICE, UNOFFICIAL
AUTHORITY              NONE
ONCHAIN RECORD         NONE
TRANSFERABLE           NO
CONFERS                NOTHING
EXAMINATION            NOT SAT
COUNTERPART FILED      ...
```

Scanning that at timeline size, the eye lands on NONE, NONE, NO, NOTHING. The
one row that hints a game exists, BRANCHES OPEN 1 OF 10, is buried at the top and
is the only line with a number in it. The joke rows are good writing. There are
too many of them, and they are set in the position of the headline.

**Two: the paper carries no address.** The bottom microline, sitting exactly
where a printer's imprint belongs on a real note, reads UNOFFICIAL AND
COMMEMORATIVE. NOT ONCHAIN. NOT AN ALLOWLIST. CONFERS NOTHING. Four more
negations occupying the one strip of the object that survives a screenshot, a
crop and a repost. There is no domain anywhere on the card.

**Three: the payoff is invisible.** The examination stamp lands as a small grey
rubber ring under the rosette, fainter than the red serial number above it. And
SOVEREIGN, the rare seven of seven result, renders as a blind emboss: a
colourless pressed seal that is hard to read at 2x and will be pure noise in a
timeline thumbnail. The rarest outcome the project can produce is the least
visible mark on the sheet. That is a beautiful decision and a terrible one.

Secondary: two people's cards differ by name, charter number, serial and stamp.
Nothing else varies, nothing scales, nothing is earned in the drawing itself.

***

## 4. The examination

**Does the page make me want to take it? No, and the page is the reason.** The
invitation is two paragraphs of hedging: "every answer is defensible and the
office takes no view on which one you pick", then "the examination sets the
stamp, never the paper, and your certificate is already issued either way". Read
cold, that is a well written argument for not bothering. It removes the stake
before you have picked up the pen.

**The questions themselves are good.** Concrete situations, four plausible
options, written in character, no filler. They are better than the paragraph
selling them.

**The reveal after each answer is homework.** A block headed THE RULE AS WRITTEN
delivers sixty to seventy words of dense whitepaper mechanics, identical
regardless of what you picked. It never reacts to your choice. Seven of those in
a row is reading, not playing.

**Is the payoff worth seven questions? No, and the fix is already built.**
quiz.js marks one option per question with `key: true`, counts them, and returns
SOVEREIGN, "examined and found correct", only on seven out of seven. So there is
a right answer, a score out of seven, and a rare result. The page then tells you
to your face that there is no right answer, and never shows you your score. The
result feels arbitrary because the site deliberately withholds the one number
that would make it feel earned, and that number is the only thing two people
could compare, argue about, or reply to each other with.

**The modal looks like a different website.** Plain dark panel, plain body text,
outlined option buttons, a row of orange progress dashes. You leave an 1869
banking hall and walk into a generic quiz overlay. No paper, no rule, no ink.

***

## 5. The post step

Mechanically the clearest section on the page. Three numbered steps, download the
PNG, copy the text, open X, plus an honest sentence explaining why X will not
pull the picture off a link. A stranger can follow it.

**It breaks in one place and the break is fatal. The text the office writes for
you contains no link.** Verbatim, for the standing result:

> got [ standing / patient capital ], a bet on other people leaving, and the card
> says out loud it pays nothing in a quiet market. unofficial paper from the
> charter office, by @flxrnc

index.html line 1557 confirms it: the intent URL is built as
`https://twitter.com/intent/tweet?text=` and nothing else. There is no `url`
parameter.

**And the head has no og:image.** The full meta list is viewport, referrer,
description, og:title, og:description. So on the rare occasion someone does paste
the URL, X renders a bare grey preview card whose only copy is the og:description,
which opens with "Unofficial and unaffiliated. Nothing here is onchain."

Put together: a post made from this site is a picture with a handle and no route
back, and a link shared from this site previews as a disclaimer. The loop is
open at both ends.

**One more thing that breaks after the click.** The viewport meta is
`width=1288` with no initial scale. On a 375px phone the browser shrinks the
entire desktop layout to 0.29, body text renders around four pixels tall, the
certificate is a postage stamp, and the whole page sits in the top third of the
screen above a dead band. It is not merely cramped, it is unusable. X traffic is
mostly phones.

***

## 6. The one thing

**Print the address on the paper.**

On X the image is the only part of this that reliably travels. It gets
screenshotted out of context, quote tweeted, cropped, saved and reposted by
accounts that never touch the original tweet, and every one of those hops strips
the text, the handle and the link. The site currently owns three routes back to
itself, and all three are broken or downstream of a click that cannot happen: the
tweet text has no URL, the head has no og:image, and the card has no domain. That
means every unit of attention this project earns is multiplied by zero. Not
reduced. Zero.

One change closes it at the only surface that cannot be stripped. Replace the
bottom microline of the engraving, which is currently four negations, with the
site's URL, set in the same engraved small caps, positioned the way a real bank
note carries its printer's imprint. Anyone who sees the picture anywhere can
read it and type it.

Why not the alternatives. Fixing mobile is worse in raw severity, but it only
matters once someone clicks, and today almost nobody can. An og:image only fires
on link only posts, and X suppresses the link preview when an image is attached,
which is precisely the flow this site teaches in its three steps. Adding a `url`
parameter to the intent helps the first post and is lost by exactly the reposts
that spread furthest. The paper is the only thing that always arrives intact, so
the paper is where the address belongs.

***

## 7. The cut list

Delete outright.

1. **The cardlet "Where things stand".** A scam warning wearing a hat. The footer
   strip already says it, the nav says UNOFFICIAL in red, the card is overprinted
   UNOFFICIAL ISSUE, and the schedule says AUTHORITY NONE.
2. **The cardlet "What this office is".** Same content, different words. With
   item 1 gone, half the fold stops being an apology.
3. **The entire "How this works" three step block.** It says issue, examine,
   post. So do the three section headings immediately below it, which are
   literally labelled Step one, Step two, Step three. So does the nav, labelled
   ISSUE, EXAMINE, POST. Three tables of contents for a page with three sections.
   This block is a large slice of the 1253px sitting between the top of the page
   and the input.
4. **All three hand drawn arrow cues**: "start here", "then this", "then post
   it". Three arrows instructing a reader to keep going down a page they were
   already going down. They read as anxiety, not charm.
5. **The card legend, all six entries.** A museum placard explaining your own
   certificate back to you, wedged between the card and every action you might
   take, and three of its six entries are yet another pass of the negations
   ("nothing was filed", "authority none, onchain record none, confers nothing",
   "it stays blank ... and never will").
6. **One of the two privacy lines under the input.** "Nothing is checked, nothing
   is sent, nothing is kept" and "The plate is cut on this machine. Nothing
   leaves it." are the same sentence twice, eleven words apart. Keep the second.
7. **The second paragraph of the Examination section**, beginning "After each
   answer you are told what the protocol actually does." It exists to reassure
   you that the exam does not matter, immediately before asking you to spend two
   minutes on it.
8. **The bottom microline of the card.** Replace it with the URL, per section 6.
9. **The kicker "NO DATABASE"** above the register. To a stranger that is not a
   feature, it is a shrug.

Demote, not delete: **the register**. The serial lookup is the cleverest hidden
thing in the build, and a first time visitor has no serial to type. It currently
sits between step one and step two and breaks the count the page just taught.
Move it to the footnotes.

Do not cut: the negations on the engraving itself. "In witness of nothing at
all", CONFERS NOTHING, AUTHORITY NONE are wit, and they are on the object where
wit is the point. The problem is the prose around the card repeating the same
joke without the ink.
