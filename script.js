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

/* ===== Scroll-triggered character tips (persist until closed) ===== */
(function(){
  const tipsLayer = document.getElementById('tips-layer');
  if(!tipsLayer) return;

  const TIPS = [
    { section:'book',    side:'right', vert:'at-30', title:'Birdie says…',  text:'AI can sound confident and still be wrong. Double-check important facts!', char:{ img:null, initial:'B' } },
    { section:'author',  side:'left',  vert:'at-60', title:'Leif’s tip',    text:'Fancy websites aren’t always trustworthy—look for who wrote it and their sources.', char:{ img:null, initial:'L' } },
    { section:'activities', side:'right', vert:'at-60', title:'Squirrel zoom!', text:'Two trustworthy sources that agree make a claim stronger.', char:{ img:null, initial:'S' } },
    { section:'events',  side:'left',  vert:'at-30', title:'Wisdom Tree',   text:'Ask a trusted adult before sharing personal info online.', char:{ img:null, initial:'W' } },
    { section:'contact', side:'right', vert:'at-30', title:'Before you go…', text:'Be curious, kind, and careful with what you post. The internet remembers.', char:{ img:null, initial:'💬' } }
  ];

  const HIDE_KEY = 'tips_hide_all';
  if (sessionStorage.getItem(HIDE_KEY) === '1') return;

  const shown = new Set(); // only one tip per section

  function buildTip(tip){
    const el = document.createElement('div');
    el.className = `tip ${tip.side} ${tip.vert}`;
    el.setAttribute('role','status');

    const char = document.createElement('div');
    char.className = 'char';
    if(tip.char?.img){
      const img = document.createElement('img');
      img.src = tip.char.img;
      img.alt = tip.title || 'Character';
      char.appendChild(img);
    } else {
      char.textContent = tip.char?.initial || '';
      char.setAttribute('aria-hidden','true');
    }

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const h4 = document.createElement('h4'); h4.textContent = tip.title || 'Tip';
    const p  = document.createElement('p');  p.textContent  = tip.text  || '';
    const actions = document.createElement('div'); actions.className = 'actions';
    const closeBtn = document.createElement('button'); closeBtn.className='close'; closeBtn.type='button'; closeBtn.textContent='Close';
    const hideAll  = document.createElement('button'); hideAll.className='hide-all'; hideAll.type='button'; hideAll.textContent='Hide tips';
    actions.append(closeBtn, hideAll);
    bubble.append(h4, p, actions);

    el.append(char, bubble);

    closeBtn.addEventListener('click', () => dismiss(el));
    hideAll.addEventListener('click', () => {
      sessionStorage.setItem(HIDE_KEY, '1');
      document.querySelectorAll('#tips-layer .tip').forEach(t => t.remove());
    });

    return el;
  }

  function dismiss(el){
    el.classList.remove('show');
    setTimeout(()=> el.remove(), 180);
  }

  function showTip(tip){
    const el = buildTip(tip);
    tipsLayer.appendChild(el);
    requestAnimationFrame(()=> el.classList.add('show'));
    // NOTE: no auto-hide — tips persist until user closes/hides
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const id = entry.target.id;
      const tip = TIPS.find(t => t.section === id);
      if(!tip || shown.has(id)) return;
      shown.add(id);
      showTip(tip);
    });
  }, { threshold: 0.5 });

  ['book','author','activities','events','contact'].forEach(id => {
    const el = document.getElementById(id);
    if(el) observer.observe(el);
  });
})();

