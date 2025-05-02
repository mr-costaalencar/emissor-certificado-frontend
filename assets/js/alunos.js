const form = document.getElementById("alunoForm");
const alunosTableBody = document.getElementById("alunosTableBody");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const id = document.getElementById("alunoId").value;
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const payload = { nome, cpf, email };

  if (id) {
    await apiFetch(`/alunos/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } else {
    await apiFetch("/alunos", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
  form.reset();
  loadAlunos();
});

async function loadAlunos() {
  const alunos = await apiFetch("/alunos");
  alunosTableBody.innerHTML = "";
  alunos.forEach((aluno) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${aluno.id}</td>
      <td>${aluno.nome}</td>
      <td>${aluno.cpf}</td>
      <td>${aluno.email}</td>
      <td>
        <button class="btn btn-sm btn-primary me-1" onclick='editAluno(${JSON.stringify(
          aluno
        )})'>Editar</button>
        <button class="btn btn-sm btn-danger" onclick="deleteAluno(${
          aluno.id
        })">Excluir</button>
      </td>`;
    alunosTableBody.appendChild(tr);
  });
}

function editAluno(aluno) {
  document.getElementById("alunoId").value = aluno.id;
  document.getElementById("nome").value = aluno.nome;
  document.getElementById("cpf").value = aluno.cpf;
  document.getElementById("email").value = aluno.email;
}

async function deleteAluno(id) {
  if (confirm("Deseja excluir este aluno?")) {
    await apiFetch(`/alunos/${id}`, { method: "DELETE" });
    loadAlunos();
  }
}

document.addEventListener("DOMContentLoaded", loadAlunos);
