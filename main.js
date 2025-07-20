// Función para cambiar idioma
let currentLanguage = "gl";

// Função para alternar idioma
function cambiarIdioma(idioma) {
  console.log("Cambiando idioma a:", idioma); // Debug
  currentLanguage = idioma;

  // Primeiro reseta todas as seções expansíveis
  resetSectionsForNewLanguage();

  // Oculta ambos os conteúdos primeiro
  const galicianContent = document.getElementById("gl");
  const spanishContent = document.getElementById("es");

  if (galicianContent) {
    galicianContent.style.display = "none";
    galicianContent.style.opacity = "0";
    galicianContent.style.visibility = "hidden";
  }

  if (spanishContent) {
    spanishContent.style.display = "none";
    spanishContent.style.opacity = "0";
    spanishContent.style.visibility = "hidden";
  }

  // Força um reflow
  document.body.offsetHeight;

  // Mostra o conteúdo do idioma selecionado
  const selectedContent = document.getElementById(idioma);
  if (selectedContent) {
    console.log("Mostrando conteúdo para:", idioma); // Debug
    selectedContent.style.display = "block";
    selectedContent.style.visibility = "visible";
    selectedContent.style.opacity = "1";

    // Remove qualquer estilo inline que possa estar interferindo
    selectedContent.removeAttribute("style");
    selectedContent.style.display = "block";
    selectedContent.style.opacity = "1";
  }

  // Atualiza o botão ativo
  document.querySelectorAll(".language-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  const activeButton = document.querySelector(
    `[onclick="cambiarIdioma('${idioma}')"]`
  );
  if (activeButton) {
    activeButton.classList.add("active");
    console.log("Botão ativo atualizado para:", idioma); // Debug
  }
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
  // Define galego como idioma padrão
  currentLanguage = "gl";

  // Garante que apenas o conteúdo galego seja visível inicialmente
  const galicianContent = document.getElementById("gl");
  const spanishContent = document.getElementById("es");

  if (galicianContent) {
    galicianContent.style.display = "block";
    galicianContent.style.opacity = "1";
  }

  if (spanishContent) {
    spanishContent.style.display = "none";
    spanishContent.style.opacity = "0";
  }

  // Marca o botão galego como ativo
  const galicianButton = document.querySelector(
    `[onclick="cambiarIdioma('gl')"]`
  );
  if (galicianButton) {
    galicianButton.classList.add("active");
  }

  resetSectionsForNewLanguage();
  setupLightbox(); // Configura el lightbox para las imágenes
});
