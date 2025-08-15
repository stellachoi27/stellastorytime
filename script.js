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
(function(){
  const cards = document.querySelectorAll('.char-card');
  const modal = document.getElementById('char-modal');
  if (!cards.length || !modal) return;

  const img = modal.querySelector('#cm-img');
  const name = modal.querySelector('#cm-name');
  const desc = modal.querySelector('#cm-desc');
  const tip = modal.querySelector('#cm-tip');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.dataset.img;
      name.textContent = card.dataset.name || 'Character';
      desc.textContent = card.dataset.desc || '';
      tip.textContent  = card.dataset.tip  || '';
      // show image if present, else fall back to a generated initial bubble
      if (src && !src.endsWith('undefined')) {
        img.src = src;
        img.alt = card.dataset.name || '';
        img.style.display = 'block';
      } else {
        img.src = '';
        img.alt = '';
        img.style.display = 'none';
      }
      modal.showModal();
    });
  });

  // close on click-outside
  modal.addEventListener('click', (e)=>{
    const rect = modal.getBoundingClientRect();
    const inDialog = (e.clientX >= rect.left && e.clientX <= rect.right &&
                      e.clientY >= rect.top  && e.clientY <= rect.bottom);
    if (!inDialog) modal.close();
  });
})();
