const cursoForm = document.getElementById("cursoForm");
const cursosTableBody = document.getElementById("cursosTableBody");

cursoForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const id = document.getElementById("cursoId").value;
  const nome = document.getElementById("nomeCurso").value;
  const descricao = document.getElementById("descricaoCurso").value;
  const cargaHoraria = parseInt(document.getElementById("cargaHoraria").value);
  const payload = { nome, descricao, cargaHoraria };

  if (id) {
    await apiFetch(`/cursos/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } else {
    await apiFetch("/cursos", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }
  cursoForm.reset();
  loadCursos();
});

async function loadCursos() {
  const cursos = await apiFetch("/cursos");
  cursosTableBody.innerHTML = "";
  cursos.forEach((curso) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${curso.id}</td>
      <td>${curso.nome}</td>
      <td>${curso.descricao}</td>
      <td>${curso.cargaHoraria}</td>
      <td>
      <button class="btn btn-sm btn-primary me-1" onclick='editCurso(${JSON.stringify(
        curso
      )})'>Editar</button>
        <button class="btn btn-sm btn-danger" onclick="deleteCurso(${
          curso.id
        })">Excluir</button>
      </td>`;
    cursosTableBody.appendChild(tr);
  });
}

function editCurso(curso) {
  document.getElementById("cursoId").value = curso.id;
  document.getElementById("nomeCurso").value = curso.nome;
  document.getElementById("descricaoCurso").value = curso.descricao;
  document.getElementById("cargaHoraria").value = curso.cargaHoraria;
}

async function deleteCurso(id) {
  if (confirm("Deseja excluir este curso?")) {
    await apiFetch(`/cursos/${id}`, { method: "DELETE" });
    loadCursos();
  }
}

document.addEventListener("DOMContentLoaded", loadCursos);
