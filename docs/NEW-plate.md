# NEW plate, the unsat examination

The certificate now answers the examination question in both places it is asked:
in the schedule, where row 7 reads NOT SAT, and in the reserved area, where a
ruled panel says the examination has not been sat and is left dry.

Row 7 is set at the same weight as the other refusals in the block, because
AUTHORITY NONE, TRANSFERABLE NO and CONFERS NOTHING are already there and a form
states its negatives plainly. The three dots now belong to row 8 alone, which is
the only row on this plate meant to stay open forever, so the dots have stopped
meaning two different things at once.

The reserve is a box and not a ghost stamp. It carries no colour, no skew, no
erosion and no multiply pass, which are the four things drawStamp does to look
struck. Its panel is filled with PAPER rather than knocked out, so on the square
plate, where L.stampCx and L.stampCy sit inside the engine turned compartment,
the lathe work still reads faintly through it and the caption is legible. Every
dimension is taken from L.stampR, so the wide and square layouts set the same
drawing at their own two sizes with no branch on mode.

## 1. JS

```js
function drawSchedule(ctx, L, card, stampLabel) {
  var x = L.schedX, w = L.schedW, y = L.schedY;
  ctx.save();
  ctx.fillStyle = INK_SOFT;
  ctx.font = "9px " + F_CAPS;
  tracked(ctx, "SCHEDULE OF WHAT THIS PAPER GRANTS", x, y - 14, 1.8, "left");

  for (var i = 0; i < SCHEDULE.length; i += 1) {
    var ry = y + i * L.schedRow;
    ctx.strokeStyle = INK_MID;
    ctx.globalAlpha = 0.42;
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(x, ry + 7);
    ctx.lineTo(x + w, ry + 7);
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.fillStyle = INK_SOFT;
    ctx.font = "9.5px " + F_CAPS;
    tracked(ctx, SCHEDULE[i][0], x, ry, 1.5, "left");

    /* Row 7 answers either way. A rank when the examination has been sat, and
       NOT SAT when it has not, set at the same weight as the other refusals in
       the block because a form states its negatives plainly. The three dots
       are left to row 8, which is the only row on this plate that is meant to
       stay open, and the dots now say that and nothing else. */
    var val = SCHEDULE[i][1];
    if (SCHEDULE[i][0] === "EXAMINATION") { val = stampLabel || "NOT SAT"; }
    ctx.textAlign = "right";
    if (val) {
      ctx.fillStyle = INK;
      ctx.font = "12px " + F_TEXT;
      ctx.fillText(val, x + w, ry);
    } else {
      ctx.fillStyle = INK_SOFT;
      ctx.globalAlpha = 0.55;
      ctx.font = "12px " + F_TEXT;
      ctx.fillText("·  ·  ·", x + w, ry);
      ctx.globalAlpha = 1;
    }
    ctx.textAlign = "left";
  }
  ctx.restore();
}

function drawUnstamped(ctx, L) {
  /* The space kept for a mark that was never applied. A printed form rules
     the box whether or not the die ever comes down, so this belongs to the
     plate and not to the strike: hairlines in INK_SOFT at low alpha, no
     erosion, no skew, no multiply pass, no colour. Everything drawStamp does
     to look struck is deliberately absent, because the drawing has to read as
     an absence rather than as a faint stamp.

     The panel is filled with paper rather than knocked out, so on the square
     plate, where this reserve sits inside the engine turned compartment, the
     lathe work still shows faintly through it and the caption can be read.
     On the wide plate the ground is already paper and only the rules show. */
  var cx = L.stampCx, cy = L.stampCy, R = L.stampR;
  var pw = R * 1.78, ph = R * 0.78;
  var px = cx - pw / 2, py = cy - ph / 2;

  ctx.save();
  ctx.textAlign = "center";

  ctx.globalAlpha = 0.8;
  ctx.fillStyle = PAPER;
  ctx.fillRect(px, py, pw, ph);

  ctx.strokeStyle = INK_SOFT;
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 0.8;
  ctx.strokeRect(px, py, pw, ph);
  ctx.globalAlpha = 0.24;
  ctx.lineWidth = 0.6;
  ctx.strokeRect(px + 4, py + 4, pw - 8, ph - 8);

  /* The plain thing, in small caps, on two lines, sized off the reserve so
     both layouts set it from the same rule. */
  ctx.fillStyle = INK_SOFT;
  ctx.globalAlpha = 0.82;
  var maxW = pw - 24;
  var track = R * 0.014;
  var s1 = trackedFit(ctx, "THE EXAMINATION", F_CAPS, maxW, R * 0.108, 6, track);
  tracked(ctx, "THE EXAMINATION", cx, cy - 5, track, "center");
  trackedFit(ctx, "HAS NOT BEEN SAT", F_CAPS, maxW, R * 0.108, 6, track);
  tracked(ctx, "HAS NOT BEEN SAT", cx, cy + s1 + 1, track, "center");

  ctx.restore();
}
function drawPlate(ctx, card, mode, stampId, scale) {
  var L = LAYOUT[mode];
  var g = card.g;
  var W = L.W, H = L.H;
  var i;

  ctx.save();
  ctx.scale(scale, scale);
  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";

  drawPaper(ctx, W, H, g, 0);

  /* The tint underprint. A2 2.3 puts it at 8 to 14 percent of the paper to ink
     range, A2 2.5 keeps the pitch clear of the aliasing band, and A2 2.7 gives
     it its own misregistration because it is a separate press pass. */
  ctx.save();
  clipToPaper(ctx, W, H, g);
  ctx.translate(g.misTint[0], g.misTint[1]);
  drawSheetTint(ctx, W, H, g, TINT, 0.55);
  ctx.restore();

  drawChirographLine(ctx, L, g);
  drawStub(ctx, L, card);

  drawBorderBand(ctx, L.bodyX, L.bodyY, L.bodyW, L.bodyH, L.band, g, true);

  ctx.save();
  ctx.strokeStyle = INK;
  ctx.globalAlpha = 0.85;
  ctx.lineWidth = 1.2;
  ctx.strokeRect(L.bodyX - 10, L.bodyY - 10, L.bodyW + 20, L.bodyH + 20);
  ctx.globalAlpha = 0.7;
  ctx.lineWidth = 0.7;
  ctx.strokeRect(L.bodyX + L.band, L.bodyY + L.band, L.bodyW - 2 * L.band, L.bodyH - 2 * L.band);
  ctx.restore();

  var cIn = L.band + 30;
  var corners = [
    [L.bodyX + cIn, L.bodyY + cIn],
    [L.bodyX + L.bodyW - cIn, L.bodyY + cIn],
    [L.bodyX + cIn, L.bodyY + L.bodyH - cIn],
    [L.bodyX + L.bodyW - cIn, L.bodyY + L.bodyH - cIn]
  ];
  for (i = 0; i < 4; i += 1) {
    drawCorner(ctx, corners[i][0], corners[i][1], L.counterR, g, card, i);
  }

  /* The compartment. A rose engine ground under a phase shifted hypotrochoid
     family, A2 1.3 second variant, which twists the family like rope rather
     than rotating the whole figure. This is the one bold element on the site. */
  drawEngineTurnedGround(ctx, L.medCx, L.medCy, L.medR * 0.30, L.medR * 0.92, g, INK, 0.32);
  var fam = Math.min(g.strands, 8);
  for (i = 0; i < fam; i += 1) {
    var pts = hypoPoints(L.medCx, L.medCy, L.medR * 0.74, g.p, g.q, g.dOverR,
      (Math.PI * 2 * i) / fam, g.psi);
    strokeEngraved(ctx, pts, INK, 0.42, 0.6, 2, 0.6);
  }
  ctx.save();
  ctx.strokeStyle = INK;
  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 1.1;
  ctx.beginPath();
  ctx.arc(L.medCx, L.medCy, L.medR * 0.99, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  ctx.font = "12px " + F_CAPS;
  tracked(ctx, "THE CHARTER OFFICE", L.colCx, L.houseY - 44, 3.4, "center");
  ctx.font = "22px " + F_TITLE;
  ctx.fillText(card.house, L.colCx, L.houseY);
  ctx.textAlign = "left";

  var ts = fitFont(ctx, card.subject, F_TITLE, L.nameMax, mode === "square" ? 84 : 74, 18);
  ctx.fillStyle = INK;
  ctx.textAlign = "center";
  ctx.font = ts + "px " + F_TITLE;
  ctx.fillText(card.subject, L.colCx, L.nameY);
  ctx.textAlign = "left";

  ctx.save();
  ctx.strokeStyle = INK;
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 0.7;
  ctx.beginPath();
  ctx.moveTo(L.colCx - L.nameMax / 2, L.nameY + 18);
  ctx.lineTo(L.colCx + L.nameMax / 2, L.nameY + 18);
  ctx.stroke();
  ctx.restore();

  drawSchedule(ctx, L, card, STAMP_SHORT[stampId] || "");
  drawBookingLayer(ctx, L, card);

  /* A3 entry 13. A fixed testimonial clause, first person, from the office,
     immediately above the countersignature rules. A protest form printed the
     closing formula before the event it described had happened. */
  ctx.fillStyle = INK_MID;
  ctx.textAlign = "center";
  ctx.font = "13px " + F_TEXT;
  ctx.fillText("In witness of nothing at all, this office has set its hand and issued the paper.",
    L.clauseCx, L.clauseY);
  ctx.textAlign = "left";

  drawSignatureRow(ctx, L, card);

  ctx.fillStyle = INK;
  ctx.font = "15px " + F_CAPS;
  ctx.textAlign = "center";
  tracked(ctx, "THE BANK IS CODE", L.colCx, L.mottoY, 5, "center");

  /* E3: the motto is the protocol's line, not this office's. Set unattributed
     in the largest caps on the sheet, it reads on a shared PNG as the issuing
     body's own motto. The credit turns it back into a quotation, and that
     courtesy is what the whole project rests on. */
  ctx.fillStyle = INK_SOFT;
  ctx.font = "8px " + F_CAPS;
  tracked(ctx, "THE STANDARD RESERVE, WHITEPAPER V0.1", L.colCx, L.creditY, 1.6, "center");

  /* The numbering pass. A2 2.2: a separate letterpress run, its own colour and
     its own misregistration, never sharing a path with the lathe work. It sits
     in the bottom margin, outside the frame, where E3 can read it: this line
     used to be set over the guilloche band and was invisible at six times
     magnification even though every pixel of it was being drawn. */
  ctx.save();
  ctx.translate(g.misNum[0], g.misNum[1]);
  ctx.fillStyle = RED;
  ctx.textAlign = "center";
  var serialLine = "SERIAL  " + groupSerial(card.serial);
  fitFont(ctx, serialLine, F_NUM, W - 120, 11, 5);
  ctx.fillText(serialLine, W / 2, L.serialY);
  ctx.restore();

  ctx.fillStyle = INK;
  ctx.font = "9px " + F_CAPS;
  ctx.textAlign = "center";
  tracked(ctx, "UNOFFICIAL AND COMMEMORATIVE. NOT ONCHAIN. NOT AN ALLOWLIST. CONFERS NOTHING.",
    W / 2, L.discY, 1.5, "center");
  ctx.textAlign = "left";

  drawCrossing(ctx, L, g);

  if (stampId && Object.prototype.hasOwnProperty.call(STAMPS, stampId)) {
    drawStamp(ctx, stampId, L, card);
  } else {
    drawUnstamped(ctx, L);
  }

  ctx.restore();
}
```

## 2. What each block replaces

```text
drawSchedule(ctx, L, card, stampLabel)
    replaces the existing drawSchedule. One behavioural line changed:
    the EXAMINATION row now falls back to NOT SAT instead of falling
    through to the empty value branch. COUNTERPART FILED is untouched
    and still renders the three middle dots.

drawUnstamped(ctx, L)
    NEW. No existing function. Draws the ruled reserve and its caption
    at L.stampCx, L.stampCy, L.stampR. Nothing else calls it.

drawPlate(ctx, card, mode, stampId, scale)
    replaces the existing drawPlate. One change, at the end of the body:
    the stamp test gains an else branch that calls drawUnstamped(ctx, L).
    Everything above it is byte for byte the current function.
```

## Wording, exactly

Schedule row 7 value, when no stamp exists: `NOT SAT`

Reserve caption, two lines of small caps: `THE EXAMINATION` / `HAS NOT BEEN SAT`

Neither states or implies a failure. NOT SAT is the register the site already
uses for the act, since the button that opens window two says Sit the
examination, and the negative of sitting an examination is not sitting it.

## Verified

Rendered at 1200 by 675 and at 1080 by 1080 in headless Chrome and read back as
PNG, with stampId null and with all five of expansion, patient, provisional,
revocation and sovereign. Row 7 shows NOT SAT for null and the rank wording for
each of the five. Row 8 shows the three dots in all six. The reserve is drawn on
the null plates only and does not appear under any of the five marks.

No two consecutive hyphens in this file or in the code above it.
