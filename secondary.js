document.getElementById("calcular").addEventListener("click", function () {
  const totalVendidas = parseFloat(
    document.getElementById("totalVendidas").value
  );
  const totalMontante = parseFloat(
    document.getElementById("totalMontante").value
  );

  const prezo1 = 16.46;
  const prezo2 = 18.46;

  const saida = document.getElementById("saida");

  if (isNaN(totalVendidas) || isNaN(totalMontante)) {
    saida.innerHTML =
      '<span class="erro">Por favor, enche ambos os valores.</span>';
    return;
  }

  // Sistema:
  // x + y = totalVendidas
  // 16.46x + 18.46y = totalMontante

  const a1 = 1,
    b1 = 1,
    c1 = totalVendidas;
  const a2 = prezo1,
    b2 = prezo2,
    c2 = totalMontante;

  const D = a1 * b2 - a2 * b1;

  if (D === 0) {
    saida.innerHTML =
      '<span class="erro">O sistema non ten solución única.</span>';
    return;
  }

  const x = (c1 * b2 - c2 * b1) / D;
  const y = (a1 * c2 - a2 * c1) / D;

  if (x < 0 || y < 0) {
    saida.innerHTML =
      '<span class="erro">Os valores non son coherentes.</span>';
    return;
  }

  saida.innerHTML = `<strong>Resultado:</strong><br>
        Bombonas de 16,46 €: <b>${x.toFixed(0)}</b><br>
        Bombonas de 18,46 €: <b>${y.toFixed(0)}</b><br><br>
        <span style="font-size:0.9rem;color:#555;">
          Total e o importe son correctos.
        </span>`;
});
