const validacaoForm = document.getElementById("validacaoForm");
const resultadoValidacao = document.getElementById("resultadoValidacao");

validacaoForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const codigo = document.getElementById("codigoValidacao").value.trim();

  const response = await fetch(`${API_BASE}/certificado/${codigo}`);
  if (!response.ok) {
    resultadoValidacao.className = "alert alert-danger";
    resultadoValidacao.textContent = "Certificado não encontrado.";
    resultadoValidacao.classList.remove("d-none");
    return;
  }

  const data = await response.json();
  resultadoValidacao.className = "alert alert-success";
  resultadoValidacao.innerHTML = `<strong>Certificado Válido:</strong><br>Aluno: ${data.nomeAluno}<br>Curso: ${data.nomeCurso}<br>Carga Horária: ${data.cargaHoraria}h<br>Código: <code>${data.autenticacao}</code>`;
  resultadoValidacao.classList.remove("d-none");
});
