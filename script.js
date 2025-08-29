// Year
document.getElementById('year').textContent = new Date().getFullYear();

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

/* ===== Research list toggle ===== */
(function(){
  const btn   = document.getElementById('toggle-research');
  const block = document.getElementById('research-block');
  if (!btn || !block) return;

  function setOpen(open){
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Hide the list' : 'View the list';
    block.hidden = !open;
    if (open) block.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    setOpen(!open);
  });

  // If someone visits with #research in the URL, open the list automatically
  if (location.hash === '#research') setOpen(true);
})();
