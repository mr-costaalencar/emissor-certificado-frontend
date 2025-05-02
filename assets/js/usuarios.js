const usuarioForm = document.getElementById("usuarioForm");
const usuariosTableBody = document.getElementById("usuariosTableBody");

usuarioForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const id = document.getElementById("usuarioId").value;
  const email = document.getElementById("emailUsuario").value;
  const senha = document.getElementById("senhaUsuario").value;
  const payload = { email, senha };

  if (id) {
    await apiFetch(`/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } else {
    await apiFetch("/users", { method: "POST", body: JSON.stringify(payload) });
  }
  usuarioForm.reset();
  loadUsuarios();
});

async function loadUsuarios() {
  const usuarios = await apiFetch("/users");
  usuariosTableBody.innerHTML = "";
  usuarios.forEach((usuario) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${usuario.id}</td>
      <td>${usuario.email}</td>
      <td>
      <button class="btn btn-sm btn-primary me-1" onclick='editUsuario(${JSON.stringify(
        usuario
      )})'>Editar</button>
        <button class="btn btn-sm btn-danger" onclick="deleteUsuario(${
          usuario.id
        })">Excluir</button>
      </td>`;
    usuariosTableBody.appendChild(tr);
  });
}

function editUsuario(usuario) {
  document.getElementById("usuarioId").value = usuario.id;
  document.getElementById("emailUsuario").value = usuario.email;
  document.getElementById("senhaUsuario").value = "";
}

async function deleteUsuario(id) {
  if (confirm("Deseja excluir este usuário?")) {
    await apiFetch(`/users/${id}`, { method: "DELETE" });
    loadUsuarios();
  }
}

document.addEventListener("DOMContentLoaded", loadUsuarios);
