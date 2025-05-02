const validacaoForm = document.getElementById("validacaoForm");
const resultadoValidacao = document.getElementById("resultadoValidacao");

validacaoForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const codigo = document.getElementById("codigoValidacao").value.trim();
  buscarCertificado(codigo);
});

async function buscarCertificado(codigo) {
  const response = await fetch(`${API_BASE}/certificado/${codigo}`);
  if (!response.ok) {
    resultadoValidacao.className = "alert alert-danger";
    resultadoValidacao.textContent = "Certificado não encontrado.";
    resultadoValidacao.classList.remove("d-none");
    return;
  }

  const data = await response.json();
  resultadoValidacao.className = "certificado";
  resultadoValidacao.innerHTML = `
      <h1 style="font-size: 2.5rem; font-weight: bold;">Certificado</h1>
      <p class="text-uppercase mb-4" style="letter-spacing: 1px;">de conclusão de curso</p>
      <p style="font-size: 1.2rem;">Certificamos que <strong>${data.nomeAluno}</strong> concluiu com êxito o curso de <strong>${data.nomeCurso}</strong> com carga horária de <strong>${data.cargaHoraria} horas</strong>.</p>
      <div class="assinaturas">
        <div>Assinatura do Professor</div>
        <div>Assinatura da Coordenação</div>
      </div>
      <div class="mt-4">
        Código de validação: <code>${data.autenticacao}</code>
      </div>
    `;
  mostrarBotoesCertificado();
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const codigo = params.get("codigo");
  if (codigo) {
    document.getElementById("codigoValidacao").value = codigo;
    buscarCertificado(codigo);
  }
});
