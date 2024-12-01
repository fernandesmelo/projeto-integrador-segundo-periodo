function toggleMenu() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";
}

document.querySelectorAll(".form-control").forEach((select) => {
  select.addEventListener("change", function () {
    const funcionarioSelecionado = this.options[this.selectedIndex].text;
    console.log("Funcionário selecionado:", funcionarioSelecionado);
  });
});

async function cancelarAgendamento(agendamentoId, cardElement) {
  const confirmacao = confirm('Tem certeza que deseja cancelar este agendamento?');

  if (!confirmacao) return;

  try {
    const response = await fetch(`http://localhost:8080/salaosenac/agendamento/${agendamentoId}/prc`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Agendamento cancelado com sucesso!');
      cardElement.remove();
    } else {
      alert('Erro ao cancelar o agendamento. Verifique o ID ou tente novamente.');
    }
  } catch (error) {
    console.error('Erro ao enviar requisição:', error);
    alert('Erro ao conectar ao servidor. Tente novamente mais tarde.');
  }
}

function carregarAgendamentos() {
  const cliente = JSON.parse(localStorage.getItem('cliente'));

  fetch(`http://localhost:8080/salaosenac/agendamentos/recentes`)
    .then((response) => response.json())
    .then((data) => {
      const agendamentos = data[0];

      if (!agendamentos || agendamentos.length === 0) {
        console.warn('Nenhum agendamento encontrado.');
        return;
      }

      console.log(agendamentos);

      const contentDiv = document.querySelector('.content .row');
      contentDiv.innerHTML = ''; // Limpa o conteúdo anterior

      agendamentos.forEach((agendamento) => {
        const cardHtml = `
          <div class="col-md-4">
            <div class="card">
              <div class="card-header">
                <span>Cliente: ${agendamento.nomeCliente}</span>
              </div>
              <div class="card-body">
                <div class="info-agendamento">
                  <strong>Data:</strong> ${new Date(agendamento.data).toLocaleDateString()}<br>
                  <strong>Horário:</strong> ${agendamento.horario}<br>
                  <strong>Profissional:</strong> ${agendamento.nomeFuncionario}<br>
                  <strong>Serviços:</strong>
                  <ul>
                    <li>${agendamento.servicosAssociados}</li>
                  </ul>
                  <strong>Total:</strong> R$ ${agendamento.valorTotal}
                </div>
                <div style="margin-top: 30px;">
                  <a href="#" class=" btn btn-primary -action reagendar-agendamento" data-id="${agendamento.idAgendamento}">Atualizar</a>
                  <a href="#" class="btn-action cancelar-agendamento" data-id="${agendamento.idAgendamento}">Cancelar</a>
                </div>
              </div>
            </div>
          </div>
        `;
        contentDiv.insertAdjacentHTML('beforeend', cardHtml);
      });

      // Adiciona evento para botão "Cancelar"
      document.querySelectorAll('.cancelar-agendamento').forEach((button) => {
        button.addEventListener('click', function (event) {
          event.preventDefault();
          const agendamentoId = this.getAttribute('data-id');
          const cardElement = this.closest('.col-md-4');
          cancelarAgendamento(agendamentoId, cardElement);
        });
      });

      // Adiciona evento para botão "Reagendar"
      document.querySelectorAll('.reagendar-agendamento').forEach((button) => {
        button.addEventListener('click', function (event) {
          event.preventDefault();
          const cardElement = this.closest('.card-body');
          mostrarFormularioReagendamento(cardElement, this.getAttribute('data-id'));
        });
      });
    })
    .catch((error) => {
      console.error('Erro ao carregar agendamentos:', error);
    });
}


async function mostrarFormularioReagendamento(cardElement, agendamentoId) {
  const infoAgendamento = cardElement.querySelector('.info-agendamento');
  infoAgendamento.style.display = 'none'; // Esconde as informações atuais

  const hoje = new Date();
  const dataMinima = hoje.toISOString().split('T')[0];
  const dataMaxima = new Date(hoje.setDate(hoje.getDate() + 30)).toISOString().split('T')[0];

  // Obtém a lista de profissionais do backend
  const profissionais = await buscarProfissionais();

  if (!profissionais || profissionais.length === 0) {
    alert('Nenhum profissional disponível para reagendamento.');
    return;
  }

  const formularioHtml = `
    <form class="form-reagendamento">
      <label for="data">Nova Data (opcional):</label>
      <input type="date" id="novaData" min="${dataMinima}" max="${dataMaxima}"><br>
      
      <label for="horario">Novo Horário (opcional):</label>
      <select id="novoHorario">
        <option value="">Selecione um horário</option>
        <option value="09:00">09:00</option>
        <option value="10:00">10:00</option>
        <option value="11:00">11:00</option>
        <option value="13:00">13:00</option>
        <option value="14:00">14:00</option>
        <option value="15:00">15:00</option>
        <option value="16:00">16:00</option>
      </select><br>

      <label for="profissional">Selecione o Profissional:</label>
      <select id="novoProfissional" required>
      <option value="">Selecione um profissional</option>
        ${profissionais.map(profissional => `<option value="${profissional.idFuncionario}">${profissional.nome}</option>`).join('')}
      </select><br><br>

      <button type="button" class="btn-confirmar-reagendamento" data-id="${agendamentoId}">Confirmar</button>
      <button type="button" class="btn-voltar-reagendamento">Voltar</button>
    </form>
  `;

  cardElement.insertAdjacentHTML('beforeend', formularioHtml);

  // Evento para botão "Confirmar"
  cardElement.querySelector('.btn-confirmar-reagendamento').addEventListener('click', async function () {
    const novaData = cardElement.querySelector('#novaData').value || null;
    const novoHorario = cardElement.querySelector('#novoHorario').value || null;
    const idProfissional = cardElement.querySelector('#novoProfissional').value || null;

    await confirmarReagendamento(agendamentoId, novaData, novoHorario, idProfissional);
  });

  // Evento para botão "Voltar"
  cardElement.querySelector('.btn-voltar-reagendamento').addEventListener('click', function () {
    cardElement.querySelector('.form-reagendamento').remove(); // Remove o formulário
    infoAgendamento.style.display = 'block'; // Mostra as informações originais
  });
}

async function confirmarReagendamento(agendamentoId, novaData, novoHorario, idProfissional) {
  // Monta o objeto de dados dinamicamente, incluindo apenas os campos preenchidos


  console.log(idProfissional, "funcionario")
  console.log(agendamentoId, "agendamento")
  const bodyData = {
    ...(novaData && { data: novaData }),
    ...(novoHorario && { horario: novoHorario }),
    ...(idProfissional && { idFuncionario: idProfissional })
  };
  console.log(bodyData);
  try {
    const response = await fetch(`http://localhost:8080/salaosenac/agendamento/${agendamentoId}/prc`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData),
    });

    if (response.ok) {
      alert('Agendamento reagendado com sucesso!');
      carregarAgendamentos(); // Recarrega os cartões após atualizar
    } else {
      alert('Erro ao reagendar. Tente novamente.');
    }
  } catch (error) {
    console.error('Erro ao enviar requisição:', error);
    alert('Erro ao conectar ao servidor.');
  }
}

async function buscarProfissionais() {
  try {
    const response = await fetch('http://localhost:8080/salaosenac/funcionarios');
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Erro ao buscar profissionais:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Erro ao conectar ao servidor para buscar profissionais:', error);
    return [];
  }
}


// Chamada da função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarAgendamentos);
