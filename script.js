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

/* ===== Single Birdie tip on #book ===== */
(function(){
  const layer = document.getElementById('tips-layer');
  const section = document.getElementById('book');
  if (!layer || !section) return;

  let shown = false;

  function buildTip(){
    const tip = document.createElement('div');
    tip.id = 'birdie-tip';
    tip.className = 'tip';

    const img = document.createElement('img');
    img.className = 'char-img';
    img.src = '/assets/img/birdie.png';
    img.alt = 'Birdie';

    const speech = document.createElement('div');
    speech.className = 'speech';
    speech.innerHTML = `
      <div class="speech-inner">
        <p>Test message!</p>
        <button type="button" class="gotit">Got it!</button>
      </div>
    `;

    tip.append(img, speech);
    layer.appendChild(tip);

    speech.querySelector('.gotit').addEventListener('click', ()=> tip.remove());
  }

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting && !shown){
        shown = true;     // show only once
        buildTip();
      }
    });
  }, { threshold: 0.35 });

  io.observe(section);
})();
