// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Quiz (can be replaced with your statements later)
const QUIZ = [
  {q:"If a website looks fancy, its information must be true.", a:false, why:"Design can be nice, but we still check who wrote it and what sources they used."},
  {q:"Two trustworthy sources that agree make a claim stronger.", a:true, why:"Corroboration helps! Especially from credible, independent sources."},
  {q:"It's safe to post my full name and school online on public pages.", a:false, why:"Keep personal details private unless a trusted adult says it's OK."},
  {q:"AI tools sometimes make mistakes or 'hallucinate' facts.", a:true, why:"Always double‑check important info with reliable sources."},
  {q:"Asking a trusted adult is a good step when you're unsure online.", a:true, why:"Adults can help evaluate sources and keep you safe."}
];

const dialog = document.getElementById('quiz');
const qText = document.getElementById('quiz-q');
const aText = document.getElementById('quiz-a');
const nextBtn = document.getElementById('quiz-next');
let i = 0;

function loadQ(){
  const item = QUIZ[i % QUIZ.length];
  qText.textContent = item.q;
  aText.hidden = true;
  nextBtn.hidden = true;
}
loadQ();

document.querySelectorAll('[data-open-quiz]').forEach(el=>{
  el.addEventListener('click', ()=>{
    dialog.showModal();
    loadQ();
  });
});

dialog.addEventListener('close', ()=>{
  i = 0;
});

dialog.addEventListener('click', (e)=>{
  const rect = dialog.getBoundingClientRect();
  if(e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom){
    dialog.close();
  }
});

dialog.addEventListener('submit', (e)=>{
  e.preventDefault();
  const val = e.submitter?.value === 'true';
  const item = QUIZ[i % QUIZ.length];
  aText.textContent = (val === item.a ? "✅ Correct! " : "🟡 Good guess. ") + item.why;
  aText.hidden = false;
  nextBtn.hidden = false;
});

nextBtn.addEventListener('click', ()=>{
  i++;
  loadQ();
});

/* ===== Meet the Characters (modal) ===== */
(function () {
  const cards = document.querySelectorAll(".char-card");
  const modal = document.getElementById("char-modal");
  if (!cards.length || !modal) return;

  const imgEl  = modal.querySelector("#cm-img");
  const nameEl = modal.querySelector("#cm-name");
  const descEl = modal.querySelector("#cm-desc");
  const tipEl  = modal.querySelector("#cm-tip");

  let lastTrigger = null; // return focus to the clicked card after close

  // Apply focus crop to each card image from data-pos
  cards.forEach((card) => {
    const pos = card.dataset.pos || "50% 50%";
    const cardImg = card.querySelector(".pic img");
    if (cardImg) {
      cardImg.style.objectPosition = pos;     // focus inside the circle
      cardImg.style.objectFit = "cover";      // just in case
    }

    // Open modal with this card's data
    card.addEventListener("click", () => {
      lastTrigger = card;

      const src = card.dataset.img || "";
      const posForModal = card.dataset.pos || "50% 50%";

      nameEl.textContent = card.dataset.name || "Character";
      descEl.textContent = card.dataset.desc || "";
      tipEl.textContent  = card.dataset.tip  || "";

      if (src) {
        imgEl.src = src;
        imgEl.alt = card.dataset.name || "";
        imgEl.style.display = "block";
        imgEl.style.objectFit = "cover";
        imgEl.style.objectPosition = posForModal; // focus in the modal
      } else {
        imgEl.removeAttribute("src");
        imgEl.alt = "";
        imgEl.style.display = "none";
      }

      if (typeof modal.showModal === "function") {
        modal.showModal();
      } else {
        // graceful fallback if <dialog> isn't supported
        modal.setAttribute("open", "");
      }
    });
  });

  // Close when clicking outside the dialog panel
  modal.addEventListener("click", (e) => {
    const rect = modal.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!inside) {
      modal.close ? modal.close() : modal.removeAttribute("open");
    }
  });

  // Return focus to the last-triggering card when the dialog closes
  modal.addEventListener("close", () => {
    if (lastTrigger) lastTrigger.focus();
  });
})();
