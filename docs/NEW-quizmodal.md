# NEW quiz modal. B2.

Three blocks, and the paste position of two of them matters.

- CSS: anywhere in the existing style element.
- HTML: immediately ABOVE the first script tag, not at the closing body tag.
  boot runs while the parser is still inside that script element, so the panel
  has to already exist in the DOM or getElementById("examToPost") returns null
  and boot throws on the line that wires it.
- JS: immediately ABOVE the final boot() call. openExam is assigned when the
  block executes, so the block has to run before boot asks for it. It attaches
  nothing at that point. Nothing binds until openExam is called.

Parent wiring, two lines, inside boot:

    document.getElementById("examStart").addEventListener("click", function () { openExam(); });
    document.getElementById("examToPost").addEventListener("click", function () { yourTweetComposer(); });

The old renderExam function, the old examBody div and the old examStart click
handler come out. Everything else in the page is untouched.

## 1. HTML shell

```html
<div class="exWrap" id="exWrap" hidden>
  <div class="exVeil" id="exVeil"></div>
  <div class="exPanel" id="exPanel" role="dialog" aria-modal="true" aria-labelledby="exTitle">

    <div class="exHead">
      <p class="exTitle exCaps" id="exTitle">Examination</p>
      <p class="exProg exCaps" id="exProg">1 of 7</p>
      <span class="exMarks" id="exMarks" aria-hidden="true"><span class="exMark"></span><span class="exMark"></span><span class="exMark"></span><span class="exMark"></span><span class="exMark"></span><span class="exMark"></span><span class="exMark"></span></span>
      <button class="exClose" id="exClose" type="button" aria-label="Close the examination">Close</button>
    </div>

    <div class="exBody" id="exBody" tabindex="-1"></div>

    <div class="exFoot" id="exNav">
      <button class="exQuiet" id="exBack" type="button">Back</button>
      <span class="exGap"></span>
      <button class="exPaper" id="exNext" type="button">Next</button>
    </div>

    <div class="exFoot" id="exEnd" hidden>
      <button class="exQuiet" id="exToCert" type="button">Return to the certificate</button>
      <button class="exPaper" id="examToPost" type="button">Post it on X</button>
      <button class="exAgain" id="exAgain" type="button">Sit it again</button>
    </div>

  </div>
</div>
```

## 2. CSS

```css
.exWrap {
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  z-index: 90;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 56px 0;
  overflow: auto;
  color: #D9D3C7;
  font: 17px/28px "Palatino Linotype", Palatino, "Book Antiqua", "URW Palladio L", "Iowan Old Style", Georgia, "Times New Roman", serif;
}
.exWrap[hidden] { display: none; }

.exVeil {
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  background: rgba(28, 23, 18, 0.88);
}

.exPanel {
  position: relative;
  z-index: 1;
  width: 640px;
  max-height: 84vh;
  display: flex;
  flex-direction: column;
  background: #1C1712;
  border: 1px solid #4A4034;
  border-radius: 0;
  box-shadow: none;
}

.exWrap button {
  font-family: Copperplate, "Copperplate Gothic Light", "Engravers MT", "Perpetua Titling MT", Optima, Candara, "Gill Sans MT", "Trebuchet MS", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 11px;
  cursor: pointer;
  border-radius: 0;
}
.exWrap button:disabled { cursor: default; }
.exCaps {
  font-family: Copperplate, "Copperplate Gothic Light", "Engravers MT", "Perpetua Titling MT", Optima, Candara, "Gill Sans MT", "Trebuchet MS", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}

.exHead {
  flex: none;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 16px 28px;
  border-bottom: 1px solid #4A4034;
}
.exTitle { font-size: 11px; line-height: 18px; color: #A89C89; margin: 0; }
.exProg { font-size: 11px; line-height: 18px; color: #D9D3C7; margin: 0; }
.exMarks { display: flex; gap: 5px; align-items: center; }
.exMark { display: block; width: 14px; height: 2px; background: #4A4034; }
.exMark.exOn { background: #A89C89; }
.exMark.exNow { background: #A63A1C; }

.exClose {
  margin-left: auto;
  background: transparent;
  color: #A89C89;
  border: 1px solid #4A4034;
  padding: 7px 13px;
}
.exClose:hover { color: #D9D3C7; border-color: #A89C89; }

.exBody { flex: 1 1 auto; overflow: auto; padding: 28px; }
.exBody:focus { outline: none; }

.exScene { font-size: 19px; line-height: 30px; margin: 0 0 24px; color: #F0EBDF; }

.exOpts { display: flex; flex-direction: column; gap: 10px; }
/* Scoped past .exWrap button on purpose. An option is a sentence the visitor
   reads, not a control label, so it keeps the body serif and its own case. */
.exWrap button.exOpt {
  display: block;
  width: 100%;
  text-align: left;
  text-transform: none;
  letter-spacing: 0;
  font-family: "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif;
  font-size: 17px;
  line-height: 26px;
  color: #D9D3C7;
  background: transparent;
  border: 1px solid #4A4034;
  border-left: 2px solid #A89C89;
  padding: 10px 16px;
}
.exWrap button.exOpt:hover { background: #241C14; border-left-color: #F0EBDF; }
.exWrap button.exOpt.exChosen { color: #F0EBDF; background: #241C14; border-left-color: #A63A1C; }
.exWrap button.exOpt.exOther { color: #A89C89; }

.exRule { border-top: 1px solid #4A4034; margin: 24px 0 0; padding: 14px 0 0; }
.exRuleLabel { font-size: 11px; line-height: 18px; color: #A89C89; margin: 0 0 6px; }
.exRule p { margin: 0; font-size: 16px; line-height: 26px; }

.exStamp1 {
  font-family: Didot, "Didot LT Std", "Bodoni 72", "Bodoni MT", "Hoefler Text", Constantia, Georgia, "Times New Roman", serif;
  font-weight: 400;
  font-size: 26px;
  line-height: 32px;
  margin: 0 0 6px;
  color: #F0EBDF;
}
.exStamp2 { font-size: 11px; line-height: 18px; color: #A89C89; margin: 0 0 20px; }
.exResult p { margin: 0 0 14px; }
.exVerdict { color: #F0EBDF; border-top: 1px solid #4A4034; padding-top: 14px; margin: 0; }

.exFoot {
  flex: none;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 28px;
  border-top: 1px solid #4A4034;
}
.exFoot[hidden] { display: none; }
.exGap { margin-left: auto; }

.exQuiet {
  background: transparent;
  color: #D9D3C7;
  border: 1px solid #A89C89;
  padding: 11px 18px;
}
.exQuiet:hover { background: #4A4034; }
.exPaper {
  color: #241C14;
  background: #E2DCC8;
  border: 0;
  border-top: 2px solid #A63A1C;
  padding: 12px 20px;
}
.exWrap button:disabled {
  color: #A89C89;
  background: transparent;
  border: 1px solid #4A4034;
}
.exAgain {
  margin-left: auto;
  background: transparent;
  color: #A89C89;
  border: 0;
  border-bottom: 1px solid #4A4034;
  padding: 4px 0;
}
.exAgain:hover { color: #D9D3C7; border-bottom-color: #A89C89; }

.exWrap a:focus-visible,
.exWrap button:focus-visible {
  outline: 2px solid #D9D3C7;
  outline-offset: 3px;
}
```

## 3. JS

```js
/* The examination, in a modal. Two globals, openExam and closeExam.
   Nothing is attached until openExam is called for the first time, because
   the page wires its own buttons. scoreExam, renderScreen, setUrl,
   STAMP_SHORT and QUIZ are all used as found and none is redefined. */
var openExam, closeExam;

(function () {
  var W, VEIL, PANEL, BODY, PROG, MARKS, CLOSEB, NAV, BACK, NEXT, END, TOCERT, AGAIN;
  var wired = false, live = false, idx = 0, showingResult = false, opener = null;
  var heldHtml = "", heldBody = "";

  function el(name) { return document.getElementById(name); }

  function questions() {
    return (window.QUIZ && QUIZ.questions) ? QUIZ.questions : [];
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function chosenId(q) {
    return Object.prototype.hasOwnProperty.call(state.answers, q.id)
      ? state.answers[q.id] : null;
  }

  function firstUnanswered() {
    var qs = questions(), i;
    for (i = 0; i < qs.length; i += 1) {
      if (!chosenId(qs[i])) { return i; }
    }
    return qs.length ? qs.length - 1 : 0;
  }

  function grab() {
    W = el("exWrap"); VEIL = el("exVeil"); PANEL = el("exPanel");
    BODY = el("exBody"); PROG = el("exProg"); MARKS = el("exMarks");
    CLOSEB = el("exClose"); NAV = el("exNav"); BACK = el("exBack");
    NEXT = el("exNext"); END = el("exEnd"); TOCERT = el("exToCert");
    AGAIN = el("exAgain");
  }

  /* The result is written to the page the moment the seventh answer lands,
     not when the visitor presses on. The stamp on the paper and the value in
     the EXAMINATION row have to agree with the sheet at all times. */
  function applyResult() {
    var rank = (typeof scoreExam === "function") ? scoreExam() : null;
    state.stamp = rank;
    var row = el("examSchedVal");
    if (row) {
      var word = "";
      if (rank && window.STAMP_SHORT &&
          Object.prototype.hasOwnProperty.call(STAMP_SHORT, rank)) {
        word = STAMP_SHORT[rank];
      }
      row.textContent = word || "Not sat";
      row.className = word ? "v" : "v empty";
    }
    if (state.card) { renderScreen(); setUrl(); }
    return rank;
  }

  function paintMarks(current) {
    var qs = questions(), kids = MARKS.children, i;
    for (i = 0; i < kids.length; i += 1) {
      var cls = "exMark";
      if (qs[i] && chosenId(qs[i])) { cls += " exOn"; }
      if (i === current) { cls += " exNow"; }
      kids[i].className = cls;
    }
  }

  function renderQuestion(keepFocusOn) {
    var qs = questions();
    if (!qs.length) { return; }
    if (idx < 0) { idx = 0; }
    if (idx > qs.length - 1) { idx = qs.length - 1; }
    showingResult = false;

    var q = qs[idx], picked = chosenId(q), html, i;
    PROG.textContent = (idx + 1) + " of " + qs.length;
    paintMarks(idx);

    html = '<p class="exScene">' + esc(q.scene) + "</p>";
    html += '<div class="exOpts">';
    for (i = 0; i < q.options.length; i += 1) {
      var o = q.options[i];
      var cls = "exOpt";
      if (picked) { cls += (picked === o.id) ? " exChosen" : " exOther"; }
      html += '<button type="button" class="' + cls + '" data-o="' + esc(o.id) +
        '" aria-pressed="' + (picked === o.id ? "true" : "false") + '">' +
        esc(o.text) + "</button>";
    }
    html += "</div>";
    if (picked) {
      html += '<div class="exRule"><p class="exRuleLabel exCaps">The rule as written</p><p>' +
        esc(q.rule) + "</p></div>";
    }
    BODY.innerHTML = html;
    BODY.scrollTop = 0;
    /* The reveal is the whole point of the examination, so when it appears it
       must not sit below the fold of the panel. */
    var shown = BODY.querySelector(".exRule");
    if (shown) { BODY.scrollTop = Math.max(0, shown.offsetTop - 120); }

    END.hidden = true;
    NAV.hidden = false;
    BACK.hidden = idx === 0;
    NEXT.hidden = !picked;
    NEXT.textContent = (idx === qs.length - 1) ? "See the result" : "Next";

    if (keepFocusOn) {
      var again = BODY.querySelector('.exOpt[data-o="' + keepFocusOn + '"]');
      if (again) { again.focus(); return; }
    }
    BODY.focus();
  }

  function renderResult() {
    var qs = questions();
    var rank = (typeof scoreExam === "function") ? scoreExam() : null;
    if (!rank || !QUIZ.ranks[rank]) { renderQuestion(); return; }
    showingResult = true;

    var r = QUIZ.ranks[rank];
    PROG.textContent = qs.length + " of " + qs.length;
    paintMarks(-1);

    BODY.innerHTML = '<div class="exResult">' +
      '<h2 class="exStamp1">' + esc(r.stamp1) + "</h2>" +
      '<p class="exStamp2 exCaps">' + esc(r.stamp2) + "</p>" +
      "<p>" + esc(r.body) + "</p>" +
      '<p class="exVerdict">' + esc(r.verdict) + "</p></div>";
    BODY.scrollTop = 0;

    NAV.hidden = true;
    END.hidden = false;
    BODY.focus();
  }

  function choose(oid) {
    var qs = questions();
    if (!qs.length) { return; }
    state.answers[qs[idx].id] = oid;
    applyResult();
    renderQuestion(oid);
  }

  function goNext() {
    var qs = questions();
    if (idx >= qs.length - 1) { renderResult(); return; }
    idx += 1;
    renderQuestion();
  }

  function goBack() {
    if (showingResult) { idx = questions().length - 1; renderQuestion(); return; }
    idx -= 1;
    renderQuestion();
  }

  function sitAgain() {
    state.answers = {};
    applyResult();
    idx = 0;
    renderQuestion();
  }

  function toCertificate() {
    closeExam();
    var box = el("platebox");
    var target = (box && !box.hidden) ? box : el("examSchedVal");
    if (target && target.scrollIntoView) { target.scrollIntoView({ block: "center" }); }
  }

  function tabbable() {
    var all = PANEL.querySelectorAll("button, a[href], input, select, textarea");
    var out = [], i;
    for (i = 0; i < all.length; i += 1) {
      var n = all[i];
      if (n.disabled) { continue; }
      if (n.getAttribute("tabindex") === "-1") { continue; }
      if (!n.getClientRects().length) { continue; }
      out.push(n);
    }
    return out;
  }

  function onKey(e) {
    if (e.key === "Escape") { e.preventDefault(); closeExam(); return; }
    if (e.key !== "Tab") { return; }
    var list = tabbable();
    if (!list.length) { return; }
    var last = list.length - 1;
    var at = list.indexOf(document.activeElement);
    var to;
    if (e.shiftKey) { to = (at <= 0) ? list[last] : list[at - 1]; }
    else { to = (at < 0 || at === last) ? list[0] : list[at + 1]; }
    e.preventDefault();
    to.focus();
  }

  function wireOnce() {
    if (wired) { return; }
    wired = true;
    CLOSEB.addEventListener("click", function () { closeExam(); });
    VEIL.addEventListener("click", function () { closeExam(); });
    BACK.addEventListener("click", goBack);
    NEXT.addEventListener("click", goNext);
    AGAIN.addEventListener("click", sitAgain);
    TOCERT.addEventListener("click", toCertificate);
    /* One delegated listener stands in for four buttons a question, seven
       questions, redrawn every time an answer changes. */
    BODY.addEventListener("click", function (ev) {
      var t = ev.target;
      while (t && t !== BODY && !t.getAttribute("data-o")) { t = t.parentNode; }
      if (t && t !== BODY) { choose(t.getAttribute("data-o")); }
    });
  }

  openExam = function () {
    if (live) { return; }
    grab();
    if (!W || !questions().length) { return; }
    wireOnce();

    opener = document.activeElement;
    live = true;
    state.open = true;

    heldHtml = document.documentElement.style.overflow;
    heldBody = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    W.hidden = false;
    document.addEventListener("keydown", onKey, true);

    /* A sheet already examined reopens on its result. Question one is a
       choice the visitor makes, not one the office makes for them. */
    var done = (typeof scoreExam === "function") ? scoreExam() : null;
    if (done) { renderResult(); return; }
    idx = firstUnanswered();
    renderQuestion();
  };

  closeExam = function () {
    if (!live) { return; }
    live = false;
    state.open = false;
    document.removeEventListener("keydown", onKey, true);
    if (W) { W.hidden = true; }
    document.documentElement.style.overflow = heldHtml;
    document.body.style.overflow = heldBody;
    if (opener && opener.focus && document.contains(opener)) { opener.focus(); }
    opener = null;
  };
}());
```
