# CHIEF'S ACCEPTANCE WALK. Section 5 of the brief, item by item, in a browser.

Method. The site was served at http://localhost:8787 and driven both in the
preview browser and in headless Chrome at 1366 by 768, which is the window the
grid was solved against. Where an item needed to be seen rather than asserted,
the plate was rendered through the real export path, three times supersampled
and downsampled to the delivered size, and the resulting image inspected.

## The fifteen items

**1. The certificate is issued instantly, with no quiz and no conditions.**
PASS. One field and one button. No wallet, no signup, no gate. The examination
lives in a separate window further down the page and nothing in window one
refers to it.

**2. The same input string always produces the same card.**
PASS. Ten inputs issued twice each, including Cyrillic, Chinese, emoji and a
full wallet address. The seed vector and every derived field matched every time.
Nothing in card generation calls Math.random or reads the clock, which is why
the date of issue is derived from the hash rather than from today.

**3. The lookup field returns an identical card for someone else's serial.**
PASS. The serial along the bottom edge is a Crockford base32 encoding of the
input itself, so it decodes back and redraws with no server and no stored state.
Verified for every one of the ten test inputs. A wrong serial fails politely and
never silently renders a different card.

**4. The guilloche is generated in code, different seeds give visibly different
patterns.**
PASS. Border, compartment and tint are parametric curves off the same seed.
Three seeds were rendered side by side: the braid ratio, the strand count and
the compartment's lobe and turn counts differ visibly at reading distance, which
is the point of A2's rule that shape drivers take discrete values from tables
while only texture drivers get continuous ranges.

**5. PNG export works at 1200 by 675 and 1080 by 1080, text is legible in both.**
PASS. Both canvases measured at exactly those dimensions. The smallest type on
the sheet was magnified from the delivered PNG and read cleanly. One defect was
found and fixed here: heavy letterspacing had opened the letter gaps until they
matched the word spaces, so the engraved disclaimer read as broken words. The
word space is now opened further than the letters, which is what an engraver
spacing out a line of caps does.

**6. The quiz is optional and changes the stamp, not access.**
PASS. The certificate renders complete before window two exists on screen. The
examination sets a stamp and redraws. It cannot add to the paper or take it
back, and the page says so twice.

**7. All 5 stamps render correctly on the card, including the angled revocation
overstamp.**
PASS. All five were rendered on both plates without throwing. The overstamp
follows A2 section 3.9: minus 23.5 degrees rather than the corner diagonal, an
alpha ramp along the long axis, one under inked region, edge erosion, per letter
jitter, drawn last so it visibly sits on top of the serial. The SOVEREIGN mark
carries no ink at all and is drawn as shadow and highlight with the tint
flattened beneath it, so it reads as pressure in the paper.

**8. All 7 questions verified against the whitepaper.**
PASS. Each rule reveal cites the section it comes from and every one was checked
against 01-FACTS.md. Every figure used is published: the two times open, the
thirty day clock, the two percent bounty capped at 100,000, the seventy percent
revocation fee and the thirty percent returned, the 70 15 15 split, one branch
of ten. Every redacted parameter is stated qualitatively and never numerically,
including the ones the whitepaper itself restates in prose.

**9. 5 tweet texts written, all lowercase, mentioning @flxrnc, no em dashes.**
PASS. In tweets.txt, one per rank, 157 to 179 characters. No em dashes, no
double hyphens, no exclamation marks. One change on E3's finding: the cashtag
was removed, because it would have routed the posts and a certificate image into
a feed that today contains only fake presales.

**10. Not a single invented number on the site.**
PASS. The only digits in visible page text are v0.1 and the handle @0xbeans. The
only digits struck on the plate are the derived charter number, the derived date,
the serial, 1 OF 10, 30 DAYS on the revocation stamp, and V0.1 in the credit.

**11. The scam block and the no token statement are visible without scrolling far.**
PASS. The heading sits about 330px down and the first column is fully visible on
a 1366 by 768 window. It is distinguished with no border, no tint and no icon:
it is the only two column block on the site, set one step larger than body copy,
and placed above everything else.

**12. No em dash and no double hyphen anywhere in the project.**
PASS, taken literally. Zero occurrences of two consecutive hyphens in the
shipped file, which is why the stylesheet uses no CSS custom properties, the
page has no HTML comments, and the code uses plus equals rather than the
decrement operator. Zero em dashes and zero en dashes.

**13. Works offline, one file, zero dependencies, runs on localhost with no
build step.**
PASS. One HTML file of about 78KB. Loaded from the file system with no server
running, the card issues, history.replaceState succeeds and toDataURL works, so
export works offline too. The file contains no fetch, no XHR, no WebSocket, no
beacon, no remote font and no image. The only external references are six
anchor hrefs the reader may click.

**14. Keyboard, focus, contrast, reduced motion.**
See E4's report at docs/E4-qa.md.

**15. MIT license and the line offering the code to the protocol team with no
conditions.**
PASS. LICENSE carries MIT plus an additional grant waiving attribution for the
protocol team. The footer carries the one sentence version.

## Chief's final question

If 0xbeans opened this, would he read it as a gift or as someone farming his
brand?

A gift, and it is obvious in seconds rather than on reflection. The reasons are
structural rather than stated. The word unofficial is above the fold, engraved on
the plate, and in the footer. The most prominent block on the site is a warning
that nothing is live and that anything selling the token today is fake, which is
work done for the protocol's readers at the expense of our own first impression.
The certificate's own schedule reads AUTHORITY NONE, ONCHAIN RECORD NONE and
CONFERS NOTHING, so the object argues against itself in its own register. The
motto is attributed to the whitepaper rather than worn. The examination teaches
the mechanics and takes no position on them. And the licence hands the whole
thing over with attribution waived.

The one place it could have tipped was the tweets, and E3 was right about the
cashtag. That is cut.
