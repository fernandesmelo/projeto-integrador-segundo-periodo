document.addEventListener("DOMContentLoaded", carregarClientes);

async function carregarClientes() {
  try {
    const response = await fetch("http://localhost:8080/salaosenac/clientes");
    const clientes = await response.json();
    const clientesList = document.querySelector("#clientes-list");
    clientesList.innerHTML = "";

    clientes.forEach(cliente => {
      const dataNascimentoFormatada = formatarDataBrasileira(cliente.data_nasc);
      const clienteHtml = `
        <div class="col-md-4">
          <div class="card">
            <div class="card-header">
              <span>Nome: ${cliente.nome}</span>
            </div>
            <div class="card-body">
              <p><strong>CPF:</strong> ${cliente.cpf}</p>
              <p><strong>Telefone:</strong> ${cliente.telefone}</p>
              <p><strong>E-mail:</strong> ${cliente.email}</p>
              <p><strong>Data de Nascimento:</strong> ${dataNascimentoFormatada}</p>
              <p><strong>Aluno SENAC:</strong> ${cliente.matricula ? cliente.matricula : 'Não'}</p>
              <button class="btn-edit btn btn-warning" data-id="${cliente.idCliente}">Editar</button>
              <button class="btn-action btn btn-danger" data-id="${cliente.idCliente}">Excluir</button>
            </div>
          </div>
        </div>
      `;
      clientesList.insertAdjacentHTML("beforeend", clienteHtml);
    });

    document.querySelectorAll('.btn-edit').forEach((button) => {
      button.addEventListener('click', mostrarFormularioEdicao);
    });

    document.querySelectorAll('.btn-action').forEach((button) => {
      button.addEventListener('click', excluirCliente);
    });
  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
  }
}

function formatarDataBrasileira(data) {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

async function mostrarFormularioEdicao(event) {
  const clienteId = event.target.getAttribute("data-id");
  console.log(clienteId);
  const response = await fetch(`http://localhost:8080/salaosenac/cliente/${clienteId}`);
  const cliente = await response.json();

  const formularioHtml = `
    <form id="form-editar-cliente">
      <div class="form-group">
        <label>Nome</label>
        <input type="text" class="form-control" id="nome" value="${cliente.nome}">
      </div>
      <div class="form-group">
        <label>CPF</label>
        <input type="text" class="form-control" id="cpf" value="${cliente.cpf}">
      </div>
      <div class="form-group">
        <label>Telefone</label>
        <input type="text" class="form-control" id="telefone" value="${cliente.telefone}">
      </div>
      <div class="form-group">
        <label>E-mail</label>
        <input type="email" class="form-control" id="email" value="${cliente.email}">
      </div>
      <div class="form-group">
        <label>Data de Nascimento</label>
        <input type="date" class="form-control" id="data_nasc" value="${cliente.data_nasc}">
      </div>
      <div class="form-group">
        <label>Matrícula</label>
        <input type="text" class="form-control" id="matricula" value="${cliente.matricula}">
      </div>
      <button type="submit" class="btn btn-primary">Salvar</button>
      <button type="button" class="btn btn-secondary" id="btn-voltar">Voltar</button>
    </form>
  `;
  event.target.closest(".card-body").innerHTML = formularioHtml;

  document.querySelector("#form-editar-cliente").addEventListener("submit", function (e) {
    e.preventDefault();
    editarCliente(clienteId);
  });

  document.querySelector("#btn-voltar").addEventListener("click", function () {
    carregarClientes();
  });
}

async function editarCliente(clienteId) {
  const nome = document.querySelector("#nome").value;
  const cpf = document.querySelector("#cpf").value;
  const telefone = document.querySelector("#telefone").value;
  const email = document.querySelector("#email").value;
  const data_nasc = document.querySelector("#data_nasc").value;
  const matricula = document.querySelector("#matricula").value;

  try {
    const response = await fetch(`http://localhost:8080/salaosenac/cliente/${clienteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, cpf, telefone, email, data_nasc, matricula }),
    });

    if (response.ok) {
      alert("Cliente editado com sucesso!");
      carregarClientes();
    } else {
      alert("Erro ao editar o cliente.");
    }
  } catch (error) {
    console.error("Erro ao editar cliente:", error);
  }
}

async function excluirCliente(event) {
  const clienteId = event.target.getAttribute("data-id");

  if (confirm("Tem certeza que deseja excluir este cliente?")) {
    try {
      const response = await fetch(`http://localhost:8080/salaosenac/cliente/${clienteId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Cliente excluído com sucesso!");
        carregarClientes();
      } else {
        alert("Erro ao excluir cliente.");
      }
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  }
}