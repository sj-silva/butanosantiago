// Función para cambiar idioma
let currentLanguage = "gl";


function actualizarMetaTags(idioma) {
  const metaDescription = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');

  if (idioma === 'es') {
    metaDescription.setAttribute("content", "Reparto de gas butano y propano en Santiago de Compostela. Entregas a domicilio rápidas, seguras y sin complicaciones. WhatsApp: +34 650 459 701");
    ogTitle.setAttribute("content", "Gas Butano Santiago - Gas Abegondo");
    ogDescription.setAttribute("content", "Reparto de gas butano y propano a domicilio en Santiago. Servicio rápido, directo por WhatsApp o llamada.");
  } else if (idioma === 'gl') {
    metaDescription.setAttribute("content", "Reparto de gas butano e propano en Santiago de Compostela. Entregas a domicilio rápidas e seguras. WhatsApp: +34 650 459 701");
    ogTitle.setAttribute("content", "Gas Butano Santiago - Gas Abegondo");
    ogDescription.setAttribute("content", "Reparto de gas butano e propano a domicilio en Santiago. Servizo rápido, directo por WhatsApp ou chamada.");
  }
}

// Função para alternar idioma
function cambiarIdioma(idioma) {
  currentLanguage = idioma;

  // Ocultar ambos conteúdos
  document.getElementById("gl").style.display = "none";
  document.getElementById("es").style.display = "none";

  // Mostrar conteúdo selecionado
  document.getElementById(currentLanguage).style.display = "block";

  // Resetar seções internas
  resetSectionsForNewLanguage();

  document.querySelectorAll(".language-btn").forEach((btn) => {
    btn.classList.remove("active");
    // Se o botão tem o data-lang igual ao idioma, ativa
    if (btn.getAttribute("data-lang") === currentLanguage) {
      btn.classList.add("active");
    }
  });

   actualizarMetaTags(idioma);
}

// Função para resetar seções ao mudar de idioma
function resetSectionsForNewLanguage() {
  // Primeiro oculta todas as seções
  const allSections = [
    "products-section",
    "coverage-section",
    "products-section-es",
    "coverage-section-es",
  ];

  allSections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) section.style.display = "none";
  });

  // Reseta ícones de toggle
  document.querySelectorAll(".toggle-icon").forEach((icon) => {
    icon.classList.remove("rotated");
  });
}

function hideAllSections() {
  const sections = [
    "products-section",
    "coverage-section",
    "products-section-es",
    "coverage-section-es",
  ];

  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) section.style.display = "none";
  });

  document.querySelectorAll(".toggle-icon").forEach((icon) => {
    icon.classList.remove("rotated");
  });
}

function toggleProducts() {
  const sectionId =
    currentLanguage === "gl" ? "products-section" : "products-section-es";
  toggleSection(sectionId, "toggleProducts()");
}

function toggleCoverage() {
  const sectionId =
    currentLanguage === "gl" ? "coverage-section" : "coverage-section-es";
  toggleSection(sectionId, "toggleCoverage()");
}

function toggleSection(sectionId, onclickString) {
  const section = document.getElementById(sectionId);
  const icon = document.querySelector(
    `#${currentLanguage} [onclick="${onclickString}"] .toggle-icon`
  );

  if (section && icon) {
    if (section.style.display === "none" || section.style.display === "") {
      section.style.display = "block";
      icon.classList.add("rotated");
    } else {
      section.style.display = "none";
      icon.classList.remove("rotated");
    }
  }
}

// Lightbox mejorado con navegación entre imágenes
function setupLightbox() {
  const productImages = document.querySelectorAll(".product-image");
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("expandedImage");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  if (
    !modal ||
    !modalImg ||
    !captionText ||
    !closeBtn ||
    !prevBtn ||
    !nextBtn
  ) {
    console.warn("Elementos do lightbox não encontrados");
    return;
  }

  let currentImageIndex = 0;
  const images = Array.from(productImages);

  // Muestra la imagen en el lightbox
  function showImage(index) {
    // Permite navegação circular
    if (index < 0) {
      index = images.length - 1;
    } else if (index >= images.length) {
      index = 0;
    }

    currentImageIndex = index;
    modalImg.src = images[currentImageIndex].src;
    captionText.innerHTML =
      images[currentImageIndex].alt ||
      (currentLanguage === "gl" ? "Imaxe do produto" : "Imagen del producto");
  }

  // Configura navegação
  prevBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    showImage(currentImageIndex - 1);
  });

  nextBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    showImage(currentImageIndex + 1);
  });

  // Configura eventos para cada imagen
  productImages.forEach((img, index) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", function () {
      currentImageIndex = index;
      modal.style.display = "block";
      showImage(currentImageIndex);
    });
  });

  // Cierra el lightbox
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Cierra al hacer clic fuera de la imagen
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Controles de teclado
  document.addEventListener("keydown", function (e) {
    if (modal.style.display === "block") {
      switch (e.key) {
        case "Escape":
          modal.style.display = "none";
          break;
        case "ArrowLeft":
          showImage(currentImageIndex - 1);
          break;
        case "ArrowRight":
          showImage(currentImageIndex + 1);
          break;
      }
    }
  });
}

// Inicialização quando o DOM esté pronto
document.addEventListener("DOMContentLoaded", function () {
  // Garantir que só o galego está visível inicialmente
 
  document.getElementById("gl").style.display = "block";
  document.getElementById("es").style.display = "none";

  // Marcar botão galego como ativo usando data-lang
  document.querySelectorAll(".language-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-lang") === "gl") {
      btn.classList.add("active");
    }
  });

  resetSectionsForNewLanguage();
  setupLightbox(); // Configura el lightbox para las imágenes
  actualizarMetaTags("gl");
});
