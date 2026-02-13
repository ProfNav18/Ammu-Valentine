// js/gallery.js
export function initGallery(){
  const grid = document.getElementById("galleryGrid");
  const shuffleBtn = document.getElementById("shuffleBtn");

  // Put your images here (one by one)
  // Example paths — change to your real file names
  const photos = [
    { src: "assets/images/f1.JPG", cap: "Memory #1 💗" },
    { src: "assets/images/f2.jpg", cap: "Memory #2 💗" },
    { src: "assets/images/f3.jpg", cap: "Memory #3 💗" },
    // ...
    { src: "assets/images/30.jpg", cap: "Memory #30 💗" },
  ];

  function render(list){
    grid.innerHTML = "";

    list.forEach((p, idx)=>{
      const card = document.createElement("div");
      card.className = "photo-tile";
      card.innerHTML = `
        <img class="photo-img" src="${p.src}" alt="photo ${idx+1}">
        <div class="photo-cap">${p.cap}</div>
      `;
      card.addEventListener("click", ()=> openLightbox(idx, list));
      grid.appendChild(card);
    });
  }

  // Lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCaption = document.getElementById("lbCaption");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const closeBtn = document.getElementById("closeBtn");

  let current = 0;
  let currentList = photos;

  function openLightbox(i, list){
    current = i;
    currentList = list;
    show();
    lb.classList.add("show");
    lb.setAttribute("aria-hidden","false");
  }

  function close(){
    lb.classList.remove("show");
    lb.setAttribute("aria-hidden","true");
  }

  function show(){
    const p = currentList[current];
    lbImg.src = p.src;
    lbCaption.textContent = p.cap;
  }

  prevBtn.addEventListener("click", ()=>{
    current = (current - 1 + currentList.length) % currentList.length;
    show();
  });

  nextBtn.addEventListener("click", ()=>{
    current = (current + 1) % currentList.length;
    show();
  });

  closeBtn.addEventListener("click", close);
  lb.addEventListener("click", (e)=>{ if(e.target === lb) close(); });

  // Shuffle (optional)
  shuffleBtn.addEventListener("click", ()=>{
    const shuffled = [...photos].sort(()=> Math.random() - 0.5);
    render(shuffled);
  });

  render(photos);
}
