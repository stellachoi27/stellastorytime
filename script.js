// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Floating facts quick check
const myths = {
  "Goldfish have a 3-second memory.": {truth:false, why:"Goldfish can remember for months. This myth sticks around online."},
  "Not everything you read online is true.": {truth:true, why:"That’s why we compare sources and ask trusted adults!"},
  "You should ask a trusted adult before sharing personal info.": {truth:true, why:"Protect your privacy: avoid sharing full name, address, school, etc."}
};
document.querySelectorAll('.fact').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const s = btn.dataset.statement;
    const r = myths[s];
    alert(`${s}\n\n${r.truth ? "✅ True" : "⚠️ Needs a second source"} — ${r.why}`);
  });
});

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
