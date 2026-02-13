// js/main.js
const CROSS_DONE = "ammu_crossword_done";
const HEART_DONE = "ammu_hiddenheart_done";

function qs(sel, root=document){ return root.querySelector(sel); }

export function initHearts(){
  const layer = qs(".hearts");
  if(!layer) return;

  for(let i=0;i<18;i++){
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = ["❤","💗","💖","💘","✨"][Math.floor(Math.random()*5)];
    h.style.left = Math.random()*100 + "vw";
    h.style.animationDuration = (10 + Math.random()*12) + "s";
    h.style.animationDelay = (Math.random()*6) + "s";

    const big = Math.random() < 0.30;
    h.style.fontSize = big ? (34 + Math.random()*26) + "px" : (14 + Math.random()*14) + "px";
    h.style.opacity = big ? "0.40" : "0.75";

    layer.appendChild(h);
  }
}

export function initPageFade(){
  document.body.classList.add("fade-in");
}

export function getUnlockState(){
  const crosswordDone = localStorage.getItem(CROSS_DONE) === "true";
  const heartDone = localStorage.getItem(HEART_DONE) === "true";
  return { crosswordDone, heartDone, finalUnlocked: crosswordDone && heartDone };
}

export function setCrosswordDone(){
  localStorage.setItem(CROSS_DONE, "true");
}

export function setHeartDone(){
  localStorage.setItem(HEART_DONE, "true");
}

export function wireDashboardLocks(){
  const finalCard = qs("[data-final-card]");
  if(!finalCard) return;

  const state = getUnlockState();
  if(state.finalUnlocked){
    finalCard.classList.remove("locked");
    finalCard.classList.add("glow");
    finalCard.setAttribute("href", "final-surprise.html");
    const msg = qs("[data-final-msg]");
    if(msg) msg.textContent = "Unlocked ✨";
  } else {
    finalCard.classList.add("locked");
    finalCard.setAttribute("href", "games.html");
    const msg = qs("[data-final-msg]");
    if(msg) msg.textContent = "Complete Ammu Arcade 💘";
  }
}
