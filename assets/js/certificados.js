const alunoSelect = document.getElementById("alunoSelect");
const cursoSelect = document.getElementById("cursoSelect");
const certificadoForm = document.getElementById("certificadoForm");
const certificadoInfo = document.getElementById("certificadoInfo");

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

  certificadoInfo.classList.remove("d-none");
  certificadoInfo.innerHTML = `<strong>Certificado Emitido:</strong><br>Aluno: ${data.nomeAluno}<br>Curso: ${data.nomeCurso}<br>Carga Horária: ${data.cargaHoraria}h<br>Código de Autenticação: <code>${data.autenticacao}</code>`;
});

document.addEventListener("DOMContentLoaded", loadAlunosCursos);
