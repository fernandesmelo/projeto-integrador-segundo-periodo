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
  

  function carregarAgendamentos() {
    const cliente = JSON.parse(localStorage.getItem('cliente'));
    console.log(cliente);

    fetch(`http://localhost:8080/salaosenac/agendamentos/cliente/${cliente.idCliente}`)
      .then((response) => response.json())
      .then((data) => {
        // Extrai apenas o primeiro elemento da resposta, que é o array com os agendamentos
        const agendamentos = data[0]; 
  
        // Verifica se há agendamentos retornados
        if (!agendamentos || agendamentos.length === 0) {
          console.warn('Nenhum agendamento encontrado.');
          return;
        }
  
        const contentDiv = document.querySelector('.content .row');
        contentDiv.innerHTML = ''; // Limpa o conteúdo anterior
  
        agendamentos.forEach((agendamento, index) => {
          // Cria dinamicamente cada card
          const cardHtml = `
          <div class="col-md-4">
            <div class="card">
              <div class="card-header">
                <span>Cliente: ${agendamento.nomeCliente}</span>
              </div>
              <div class="card-body">
                <div>
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
                  <a href="#" class="btn-secondary-action">Reagendar</a>
                  <a href="#" class="btn-action">Cancelar</a>
                </div>
              </div>
            </div>
          </div>

          `;
          contentDiv.insertAdjacentHTML('beforeend', cardHtml);
        });
      })
      .catch((error) => {
        console.error('Erro ao carregar agendamentos:', error);
      });
  }




// Chamada da função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarAgendamentos);