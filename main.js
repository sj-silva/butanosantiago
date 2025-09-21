// Função para cambiar idioma
let currentLanguage = "gl";

function actualizarMetaTags(idioma) {
  const metaDescription = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');

  if (idioma === "es") {
    metaDescription.setAttribute(
      "content",
      "Reparto de gas butano y propano en Santiago de Compostela. Entregas a domicilio rápidas y seguras. Teléfono: 981 673 208"
    );
    ogTitle.setAttribute("content", "Gas Butano Santiago - Gas Abegondo");
  } else if (idioma === "gl") {
    metaDescription.setAttribute(
      "content",
      "Reparto de gas butano e propano en Santiago de Compostela. Entregas a domicilio rápidas e seguras. Teléfono: 981 673 208"
    );
    ogTitle.setAttribute("content", "Gas Butano Santiago - Gas Abegondo");
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

  // Atualizar botões
  document.querySelectorAll(".language-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-lang") === currentLanguage) {
      btn.classList.add("active");
    }
  });

  // Atualizar título do botão flutuante
  const floatingBtn = document.querySelector(".phone-floating");
  if (floatingBtn) {
    floatingBtn.title = idioma === "gl" ? "Chamar agora" : "Llamar ahora";
  }

  actualizarMetaTags(idioma);
}

// Inicialização quando o DOM está pronto
document.addEventListener("DOMContentLoaded", function () {
  // Garantir que só o galego está visível inicialmente
  document.getElementById("gl").style.display = "block";
  document.getElementById("es").style.display = "none";

  // Marcar botão galego como ativo
  document.querySelectorAll(".language-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-lang") === "gl") {
      btn.classList.add("active");
    }
  });

  actualizarMetaTags("gl");
});
