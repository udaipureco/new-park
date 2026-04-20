// ================= DATA =================
const galleryData = [
  {
    category: "birds",
    title: "Birds",
    images: [
      {
        thumb:"../../images/gallery/bird/bird1.webp",
        full:"../../images/gallery/bird/bird1.webp"
      },
      {
        thumb:"../../images/gallery/bird/bird2.webp",
        full:"../../images/gallery/bird/bird2.webp"
      }
    ]
  },
  {
    category: "wildlife",
    title: "Wildlife",
    images: [
      {
        thumb:"../../images/gallery/wildlife/wild1.webp",
        full:"../../images/gallery/wildlife/wild1.webp"
      },
      {
        thumb:"../../images/gallery/wildlife/wild2.webp",
        full:"../../images/gallery/wildlife/wild2.webp"
      }
    ]
  },
  {
    category: "forest",
    title: "Forest",
    images: [
      {
        thumb:"../../images/gallery/forest/forest1.webp",
        full:"../../images/gallery/forest/forest1.webp"
      },
      {
        thumb:"../../images/gallery/forest/forest2.webp",
        full:"../../images/gallery/forest/forest2.webp"
      }
    ]
  }
];

// ================= ELEMENTS =================
const galleryContainer = document.getElementById("galleryContainer");
const filterContainer = document.getElementById("filterContainer");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

// ================= STATE =================
let images = [];
let currentIndex = 0;

// ================= FILTER =================
function createFilters(){

  filterContainer.innerHTML = "";

  const allBtn = document.createElement("div");
  allBtn.innerText = "All";
  allBtn.className = "filter-btn active";

  allBtn.onclick = () => {
    setActive(allBtn);
    renderGallery("all");
  };

  filterContainer.appendChild(allBtn);

  galleryData.forEach(cat=>{
    const btn = document.createElement("div");
    btn.innerText = cat.title;
    btn.className = "filter-btn";

    btn.onclick = () => {
      setActive(btn);
      renderGallery(cat.category);
    };

    filterContainer.appendChild(btn);
  });
}

function setActive(btn){
  document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
}

// ================= RENDER =================
function renderGallery(filter){

  galleryContainer.innerHTML = "";
  images = []; // reset images

  galleryData.forEach(cat => {

    if(filter !== "all" && filter !== cat.category) return;

    // SECTION
    const section = document.createElement("div");
    section.className = "gallery-section";

    // TITLE
    const title = document.createElement("h2");
    title.className = "section-title";
    title.innerText = cat.title + " ⤵";

    // GRID
    const grid = document.createElement("div");
    grid.className = "gallery-grid";

    cat.images.forEach(img => {

      const item = document.createElement("div");
      item.className = "gallery-item";

      const image = document.createElement("img");
      image.src = img.thumb;
      image.loading = "lazy";

      // 🔥 IMPORTANT FIX
      const index = images.length;
      images.push(img.full);

      image.onclick = () => {
        currentIndex = index;
        openLightbox();
      };

      item.appendChild(image);
      grid.appendChild(item);

    });

    section.appendChild(title);
    section.appendChild(grid);
    galleryContainer.appendChild(section);

  });
}

// ================= LIGHTBOX =================
function openLightbox(){
  lightbox.style.display = "flex";
  showImage();
}

function showImage(){
  lightboxImg.src = images[currentIndex];
}

// ================= BUTTONS =================

// CLOSE
document.getElementById("closeLightbox").onclick = ()=>{
  lightbox.style.display = "none";
};

// NEXT
document.getElementById("nextBtn").onclick = ()=>{
  if(images.length === 0) return;
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
};

// PREVIOUS
document.getElementById("prevBtn").onclick = ()=>{
  if(images.length === 0) return;
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
};

// BACK TO GALLERY
document.getElementById("backGallery").onclick = ()=>{
  lightbox.style.display = "none";
};

// ================= INIT =================
createFilters();
renderGallery("all");