// ===== PRODUCTS DATA =====
const products = [
  {
    name: "Naranja Valencia",
    category: "Cítricos",
    price: "$35 / kg",
    tag: "Más vendido",
    img: "https://images.unsplash.com/photo-1587735243475-37517fd9ef86?w=600&q=80",
    desc: "Jugosa y dulce, la Naranja Valencia es perfecta para jugos naturales o consumo directo. Rica en vitamina C y antioxidantes que fortalecen tu sistema inmune.",
    benefits: ["Vitamina C", "Antioxidante", "Hidratante", "Energizante"]
  },
  {
    name: "Mango Ataulfo",
    category: "Tropicales",
    price: "$48 / kg",
    tag: "Temporada",
    img: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&q=80",
    desc: "El rey de los mangos. Suave, sin fibra, con un sabor cremoso e incomparable. Ideal para smoothies, postres o disfrutarse solo en su punto exacto de madurez.",
    benefits: ["Vitamina A", "Fibra", "Antioxidante", "Sabor intenso"]
  },
  {
    name: "Fresa Orgánica",
    category: "Berries",
    price: "$55 / 500g",
    tag: "Orgánico",
    img: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=600&q=80",
    desc: "Fresas cultivadas sin pesticidas, en suelo fértil y bajo el sol mexicano. Su aroma y dulzura natural las hace irresistibles. Perfectas para postres y ensaladas.",
    benefits: ["Ácido fólico", "Vitamina C", "Antioxidante", "Sin pesticidas"]
  },
  {
    name: "Piña Golden",
    category: "Tropicales",
    price: "$45 / pieza",
    tag: "Popular",
    img: "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?w=600&q=80",
    desc: "La variedad Golden es más dulce y aromática que la convencional. Con menos acidez, es perfecta para jugos refrescantes, marinados y aguas frescas del día.",
    benefits: ["Bromelina", "Digestiva", "Vitamina C", "Anti-inflamatoria"]
  },
  {
    name: "Uva Morada",
    category: "Uvas",
    price: "$60 / kg",
    tag: "Especial",
    img: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600&q=80",
    desc: "Dulces, carnosas y llenas de resveratrol. Las uvas moradas son un superfood elegante, ideal para picoteo saludable, tablas de quesos y licuados energéticos.",
    benefits: ["Resveratrol", "Antioxidante", "Corazón sano", "Energía natural"]
  },
  {
    name: "Kiwi Importado",
    category: "Exóticos",
    price: "$70 / 6 pzas",
    tag: "Importado",
    img: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=600&q=80",
    desc: "El kiwi aporta más vitamina C que una naranja en menor cantidad. Con su sabor agridulce único, es perfecto para ensaladas de frutas, yogurt y licuados.",
    benefits: ["Vitamina C", "Vitamina K", "Digestivo", "Bajo en calorías"]
  }
];

// ===== RENDER PRODUCTS =====
const grid = document.getElementById('productsGrid');

products.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'product-card reveal';
  card.style.transitionDelay = `${i * 0.08}s`;
  card.innerHTML = `
    <img src="${p.img}" alt="${p.name}" loading="lazy"/>
    <div class="product-card-info">
      <span class="product-card-name">${p.name}</span>
      <span class="product-card-cat">${p.category}</span>
      <span class="product-card-price">${p.price}</span>
    </div>
  `;
  card.addEventListener('click', () => openModal(i));
  grid.appendChild(card);
});

// ===== MODAL =====
const overlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalImg = document.getElementById('modalImg');
const modalTag = document.getElementById('modalTag');
const modalName = document.getElementById('modalName');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalBenefits = document.getElementById('modalBenefits');
const qtyNum = document.getElementById('qtyNum');
let qty = 1;

function openModal(i) {
  const p = products[i];
  modalImg.src = p.img;
  modalImg.alt = p.name;
  modalTag.textContent = p.tag + ' · ' + p.category;
  modalName.textContent = p.name;
  modalDesc.textContent = p.desc;
  modalPrice.textContent = p.price;
  modalBenefits.innerHTML = p.benefits.map(b => `<span class="benefit-tag">${b}</span>`).join('');
  qty = 1;
  qtyNum.textContent = qty;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

document.getElementById('qtyMinus').addEventListener('click', () => {
  if (qty > 1) { qty--; qtyNum.textContent = qty; }
});
document.getElementById('qtyPlus').addEventListener('click', () => {
  qty++;
  qtyNum.textContent = qty;
});

document.getElementById('addToCart').addEventListener('click', () => {
  showToast(`${modalName.textContent} × ${qty} agregado`);
  closeModal();
});

// ===== TOAST =====
const toast = document.getElementById('cartToast');
const toastMsg = document.getElementById('toastMsg');

function showToast(msg) {
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// Observe sections too
document.querySelectorAll('.about-inner, .products-header, .info-inner, .juice-center').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});
