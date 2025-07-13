function cambiarIdioma(idioma) {
  document.getElementById("gl").style.display =
    idioma === "gl" ? "block" : "none";
  document.getElementById("es").style.display =
    idioma === "es" ? "block" : "none";

  // Update active button
  document.querySelectorAll(".language-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document
    .querySelector(`[onclick="cambiarIdioma('${idioma}')"]`)
    .classList.add("active");
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  cambiarIdioma("gl");
});
