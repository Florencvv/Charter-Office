# Window three. The notice board.

A tweet composer for the certificate. Three blocks: HTML, CSS, JS.

The honest constraint, stated on the page and not hidden: an intent link cannot
carry a picture, and X will not accept an attached file from a URL. So the
section is three numbered steps and it says so in one line, once, without
apologising for it.

Placement: after the Examination block, before the Footnotes block, with an
`<hr class="score">` above it in the usual way.

Integration, three call sites in the parent, all of them one line:

1. at the end of `boot()`, after the `?n=` restore, call `refreshPost.init()`
   and then `refreshPost()`;
2. inside `issue()`, immediately after `setUrl()`, call `refreshPost()`;
3. inside the option click handler in `renderExam()`, immediately after
   `setExamRow(state.stamp)`, call `refreshPost()`.

One note on the global. The brief asks for exactly one global and also for an
`initPost()` the parent calls once. Both are honoured by declaring `initPost()`
inside the closure and hanging it off the single exported name, so the parent
calls `refreshPost.init()`. Nothing else is added to `window`. `refreshPost()`
also initialises itself on its first call, so a parent that forgets the init
line still works.

Step three is an anchor styled as a button, because `rel="noopener"` is an
attribute of a link and a `<button>` cannot carry one. It looks and reads as a
button, and it middle clicks like a link.

## HTML

```html
<hr class="score">

<div class="block" id="post">
  <div class="rail"><p class="railLabel caps">Window three<br>The notice board</p></div>
  <div class="main">
    <h2 class="head titling">Post the certificate</h2>

    <p class="measure" id="postLede">A link cannot carry a picture, so X will not take the card from this page. Three steps: take the card down, open X with the words already written, attach the card in the composer.</p>

    <p class="postQuiet" id="postQuiet" hidden>No certificate yet. Type a name at window one and this desk opens.</p>

    <ol class="postSteps">
      <li class="postStep postOne">
        <p class="postNum caps">Step one</p>
        <p class="postSay">Take the card down as a PNG. It goes to your downloads.</p>
        <button class="paper" id="postDl">Download the card</button>
      </li>

      <li class="postStep postTwo">
        <p class="postNum caps">Step two</p>
        <label class="postSay" for="postText">The office has written this for you. Change any of it.</label>
        <textarea class="postText" id="postText" rows="6" maxlength="280" spellcheck="false"></textarea>
        <p class="postCount caps" id="postCount"><span id="postN">0</span> of 280 characters</p>
        <button class="quiet" id="postCopy">Copy the text</button>
      </li>

      <li class="postStep postThree">
        <p class="postNum caps">Step three</p>
        <p class="postSay">X opens with the text in it. Attach the card yourself, in the composer.</p>
        <a class="postGo" id="postOpen" href="https://twitter.com/intent/tweet" target="_blank" rel="noopener noreferrer">Open X</a>
      </li>
    </ol>

    <p class="hint postSaid" id="postSaid" role="status"></p>
  </div>
</div>
```

## CSS

```css
.postSteps {
  display: flex;
  gap: 28px;
  list-style: none;
  width: 1008px;
  margin: 28px 0 0;
  padding: 0;
}
.postStep {
  flex: none;
  border-top: 1px solid #4A4034;
  padding: 14px 0 0;
}
.postOne { width: 266px; }
.postTwo { width: 420px; }
.postThree { width: 266px; }

.postNum { font-size: 11px; line-height: 18px; color: #A89C89; margin: 0 0 6px; }
.postSay { display: block; font-size: 15px; line-height: 24px; color: #D9D3C7; margin: 0 0 14px; }

.postText {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font: 15px/24px "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif;
  color: #241C14;
  background: #E2DCC8;
  border: 0;
  border-radius: 0;
  padding: 13px 16px;
  margin: 0;
  resize: vertical;
  min-height: 156px;
}
.postText:focus-visible { outline: 2px solid #D9D3C7; outline-offset: 3px; }
.postText:disabled { color: #A89C89; background: transparent; border: 1px solid #4A4034; }

.postCount { font-size: 11px; line-height: 18px; color: #A89C89; margin: 6px 0 14px; }
.postLong { color: #A63A1C; }

.postGo {
  display: inline-block;
  font-family: Copperplate, "Copperplate Gothic Light", "Engravers MT", "Perpetua Titling MT", Optima, Candara, "Gill Sans MT", "Trebuchet MS", sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 11px;
  color: #241C14;
  background: #E2DCC8;
  border: 0;
  border-top: 2px solid #A63A1C;
  border-bottom: 0;
  border-radius: 0;
  padding: 13px 22px;
  cursor: pointer;
}
.postGo:hover { border-bottom: 0; }
.postGo.postOff {
  color: #A89C89;
  background: transparent;
  border: 1px solid #4A4034;
  cursor: default;
}

.postQuiet { width: 660px; font-size: 17px; line-height: 28px; color: #A89C89; margin: 0; }
.postSaid { min-height: 22px; }
```

## JS

```js
(function () {
  "use strict";

  /* Window three. The composer.
     One global, refreshPost. initPost hangs off it as refreshPost.init, so the
     parent can wire the handlers once without a second name on window.

     The tails name the office and the publisher. No cashtag, because the
     $STANDARD feed today holds nothing but fakes and these posts carry a
     picture of a certificate. Nothing here says the paper counts for anything.
     It does not. */

  var POST_CAP = 280;
  var POST_TAIL = " unofficial paper from the charter office, by @flxrnc";

  var POST_BODY = {
    expansion: "got [ cleared for expansion ], every answer i gave was buy the cheap license and burn the token for it.",
    patient: "got [ standing / patient capital ], a bet on other people leaving, and the card says out loud it pays nothing in a quiet market.",
    provisional: "got [ provisional / subject to exit pricing ], a crooked blue stamp saying my rate depends on how many other people are at the door.",
    revocation: "they stamped [ revocation notice ] across the whole of my paper in red, reportable after 30 days, and the remedy is free.",
    sovereign: "[ sovereign / examined and found correct ], no ink on it anywhere, you have to tilt the sheet to see that anything happened."
  };

  var POST_UNSAT = "i took the paper and walked out before the examination, so the sheet is clean and there is no stamp on it to read.";

  var wired = false;
  var lastMade = "";

  function el(id) { return document.getElementById(id); }

  function heldCard() { return window.state ? window.state.card : null; }

  function heldStamp() {
    var s = window.state ? window.state.stamp : null;
    return s && Object.prototype.hasOwnProperty.call(POST_BODY, s) ? s : null;
  }

  function makeText(stampId) {
    return (stampId ? POST_BODY[stampId] : POST_UNSAT) + POST_TAIL;
  }

  function countOf(s) { return Array.from(s).length; }

  function intentHref(text) {
    return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text);
  }

  function syncOut() {
    var box = el("postText");
    var n = countOf(box.value);
    el("postN").textContent = String(n);
    el("postCount").className = n > POST_CAP - 20 ? "postCount caps postLong" : "postCount caps";
    var go = el("postOpen");
    if (!go.classList.contains("postOff")) { go.href = intentHref(box.value); }
  }

  function setLive(on) {
    el("postLede").hidden = !on;
    el("postQuiet").hidden = on;
    el("postDl").disabled = !on;
    el("postCopy").disabled = !on;
    el("postText").disabled = !on;
    var go = el("postOpen");
    if (on) {
      go.classList.remove("postOff");
      go.removeAttribute("aria-disabled");
      go.removeAttribute("tabindex");
    } else {
      go.classList.add("postOff");
      go.setAttribute("aria-disabled", "true");
      go.setAttribute("tabindex", "-1");
      go.removeAttribute("href");
    }
  }

  function initPost() {
    if (wired) { return; }
    wired = true;

    var box = el("postText");
    box.addEventListener("input", syncOut);

    var dl = el("postDl");
    dl.addEventListener("click", function () {
      if (dl.disabled || typeof window.exportPng !== "function") { return; }
      var label = dl.textContent;
      dl.textContent = "Engraving";
      dl.disabled = true;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          try {
            window.exportPng("wide");
          } finally {
            dl.textContent = label;
            dl.disabled = false;
          }
          el("postSaid").textContent = "The card is in your downloads. It is attached by hand at step three.";
        });
      });
    });

    var cp = el("postCopy");
    cp.addEventListener("click", function () {
      var say = el("postSaid");
      if (cp.disabled) { return; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(box.value).then(function () {
          say.textContent = "The text is copied.";
        }, function () {
          box.focus();
          box.select();
          say.textContent = "The clipboard refused. The text is selected, take it from there.";
        });
      } else {
        box.focus();
        box.select();
        say.textContent = "The text is selected. Take it from there.";
      }
    });

    var go = el("postOpen");
    go.addEventListener("click", function (ev) {
      if (go.classList.contains("postOff")) { ev.preventDefault(); return; }
      go.href = intentHref(box.value);
      el("postSaid").textContent = "X opens in a new tab with the words in it. The card is not attached, attach it there.";
    });
  }

  function refreshPost() {
    if (!wired) { initPost(); }
    var box = el("postText");
    var say = el("postSaid");

    if (!heldCard()) {
      setLive(false);
      box.value = "";
      lastMade = "";
      say.textContent = "";
      syncOut();
      return;
    }

    setLive(true);
    var next = makeText(heldStamp());
    if (next !== lastMade) {
      var edited = box.value !== "" && box.value !== lastMade;
      box.value = next;
      lastMade = next;
      say.textContent = edited ? "The stamp changed, so the office wrote the text out again." : "";
    }
    syncOut();
  }

  window.refreshPost = refreshPost;
  window.refreshPost.init = initPost;
})();
```
