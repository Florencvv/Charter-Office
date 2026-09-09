# Ornament pass

Append the CSS block to the end of the stylesheet. It wins by being last. No markup is needed.

```css
/* Ornament pass. Printed form furniture only: doubled rules, hairline panels,
   ledger ruling. No colour, no shadows, no radii, no motion. */

/* Section rules stop being one plain line: thick over thin, as a form prints. */
hr.score { height: 0; background: none; padding: 3px 0 0; border-top: 2px solid #4A4034; border-bottom: 1px solid #4A4034; }

/* Rail labels and section kickers take a compositor's tick. */
.railLabel::before, .a2head .a2kick::before {
  content: ""; display: inline-block; width: 1px; height: 9px;
  background: #A89C89; margin: 0 9px 0 0; vertical-align: 0;
}

/* Every heading block opens on the same doubled rule. */
.a2head { border-top-width: 2px; padding-top: 3px; }
.a2head::before { content: ""; display: block; border-top: 1px solid #4A4034; margin: 0 0 16px; }

/* The three steps set as a printed panel: numeral in the titling face, ruled foot. */
.a2step { border-bottom: 1px solid #4A4034; padding-bottom: 14px; }
.a2step .a2n {
  width: 34px;
  font-family: Didot, "Bodoni MT", "Hoefler Text", Constantia, Georgia, serif;
  font-size: 38px; line-height: 34px; color: #A89C89;
}

/* Cardlets get an inset hairline frame, open at the corners. */
.cardlet { position: relative; }
.cardlet::before, .cardlet::after { content: ""; position: absolute; pointer-events: none; border: 0 solid #4A4034; }
.cardlet::before { top: 5px; bottom: 5px; left: 9px; right: 9px; border-top-width: 1px; border-bottom-width: 1px; }
.cardlet::after { top: 9px; bottom: 9px; left: 5px; right: 5px; border-left-width: 1px; border-right-width: 1px; }
.cardlet.a2paper::before, .cardlet.a2paper::after { border-color: #A89C89; }

/* Ledger ground at the body leading, kept at the edge of visibility. */
.cardlet, .noscript {
  background-image: repeating-linear-gradient(to bottom, rgba(217, 211, 199, 0.04) 0 1px, transparent 1px 24px);
}
.cardlet.a2paper { background-image: repeating-linear-gradient(to bottom, rgba(36, 28, 20, 0.06) 0 1px, transparent 1px 24px); }

/* Buttons printed rather than drawn: a hairline set inside the edge. */
button.paper, button.quiet, .postGo { position: relative; }
button.paper::before, button.quiet::before, .postGo::before {
  content: ""; position: absolute; top: 3px; right: 3px; bottom: 3px; left: 3px;
  border: 1px solid #A89C89; pointer-events: none;
}
button.quiet::before, button:disabled::before, .postGo.postOff::before { border-color: #4A4034; }

/* Footnotes close the sheet on a doubled ledger rule. */
footer { border-top: 2px solid #4A4034; padding-top: 3px; }
footer .cols { border-top: 1px solid #4A4034; padding-top: 20px; }

/* The one long paragraph reads as the lead. */
.lede { color: #E2DCC8; }

/* The last red rules and marks off the certificate, retired to ledger colour. */
.postGo, .exPaper { border-top-color: #4A4034; }
.exMark.exNow { background: #D9D3C7; }
.exWrap button.exOpt.exChosen { border-left-color: #F0EBDF; }
.postLong { color: #E2DCC8; }
```

```html
```
