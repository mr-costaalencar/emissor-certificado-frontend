const alunoSelect = document.getElementById("alunoSelect");
const cursoSelect = document.getElementById("cursoSelect");
const certificadoForm = document.getElementById("certificadoForm");
const certificadoGerado = document.getElementById("certificadoGerado");

async function loadAlunosCursos() {
  const alunos = await apiFetch("/alunos");
  const cursos = await apiFetch("/cursos");

  alunos.forEach((aluno) => {
    const opt = document.createElement("option");
    opt.value = aluno.id;
    opt.textContent = aluno.nome;
    alunoSelect.appendChild(opt);
  });

  cursos.forEach((curso) => {
    const opt = document.createElement("option");
    opt.value = curso.id;
    opt.textContent = curso.nome;
    cursoSelect.appendChild(opt);
  });
}

certificadoForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const alunoId = alunoSelect.value;
  const cursoId = cursoSelect.value;

  const payload = { alunoId: parseInt(alunoId), cursoId: parseInt(cursoId) };
  const data = await apiFetch("/certificados", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  certificadoGerado.classList.remove("d-none");
  certificadoGerado.innerHTML = `
      <h1 style="font-size: 2.5rem; font-weight: bold;">Certificado</h1>
      <p class="text-uppercase mb-4" style="letter-spacing: 1px;">de conclusão de curso</p>
      <p style="font-size: 1.2rem;">Certificamos que <strong>${
        data.nomeAluno
      }</strong> concluiu com êxito o curso de <strong>${
    data.nomeCurso
  }</strong> com carga horária de <strong>${
    data.cargaHoraria
  } horas</strong>, realizado em <strong>${new Date().toLocaleDateString(
    "pt-BR"
  )}</strong>.</p>
      <div class="assinaturas">
        <div>Assinatura do Professor</div>
        <div>Assinatura da Coordenação</div>
      </div>
      <div class="mt-4">
        <a href="validacao.html?codigo=${
          data.autenticacao
        }" target="_blank">Código de validação: <code>${
    data.autenticacao
  }</code></a>
      </div>
    `;
  mostrarBotoesCertificado();
});

document.addEventListener("DOMContentLoaded", loadAlunosCursos);
