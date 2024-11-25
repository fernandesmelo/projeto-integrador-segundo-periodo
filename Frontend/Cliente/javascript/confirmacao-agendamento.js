document.getElementById('sair')

function getServicosIds() {
  const servicos = JSON.parse(localStorage.getItem('selectedServices')); // Recupera os serviços armazenados
  if (!servicos || !Array.isArray(servicos)) {
    return []; // Retorna uma lista vazia se não houver serviços armazenados
  }
  return servicos.map(servico => parseInt(servico.idServico)); // Extrai apenas os IDs dos serviços
}

function getServicosNomes() {
  const servicos = JSON.parse(localStorage.getItem('selectedServices')); // Recupera os serviços armazenados
  if (!servicos || !Array.isArray(servicos)) {
    return []; // Retorna uma lista vazia se não houver serviços armazenados
  }
  return servicos.map(servico => servico.nome); // Extrai apenas os IDs dos serviços
}
const dataSelecionada = localStorage.getItem('selectedDate');

function converterDataParaBanco(data) {
  const partes = data.split('-'); 
  if (partes.length === 3) {
      const [dia, mes, ano] = partes;
      return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }
  return null;  
}

const data = converterDataParaBanco(dataSelecionada);
console.log(data); // apagar dps



const dados = {
  idCliente: JSON.parse(localStorage.getItem('cliente')).idCliente, 
  data: data, 
  horario: localStorage.getItem('selectedTime'),
  valorTotal: parseFloat(localStorage.getItem('totalValue')),
  idFuncionario: JSON.parse(localStorage.getItem("selectedProfessional"))?.id
  ? parseInt(JSON.parse(localStorage.getItem("selectedProfessional")).id, 10) // especificando a base decimal para o parseint interpretar corretamente 
  : null,
  servicoIds: getServicosIds()
};

console.log(dados); 


        
function carregarDados() {
  const data = localStorage.getItem('selectedDate') || '--';
  const horario = localStorage.getItem('selectedTime') || '--';
  const total = parseFloat(localStorage.getItem('totalValue')) || 0;
  const servicos = getServicosNomes() || [];
  const profissional = JSON.parse(localStorage.getItem('selectedProfessional')) || { nome: 'Não selecionado' };

  // Preencher os elementos HTML com os dados recuperados
  document.getElementById('agendamento-data').textContent = data;
  document.getElementById('agendamento-horario').textContent = horario;
  document.getElementById('agendamento-total').textContent = total.toFixed(2).replace('.', ',');
  document.getElementById('agendamento-profissional').textContent = profissional.nome;

  // Alterando o título "Serviços" para singular ou plural
  const listaServicos = document.getElementById('lista-servicos');
  const servicosText = servicos.length > 1 ? 'Serviços' : 'Serviço';
  document.getElementById('servicos-title').textContent = servicosText; // Atualiza o título "Serviços" ou "Serviço"

  // Preenchendo a lista de serviços
  servicos.forEach(nome => {
      const li = document.createElement('li');
      li.textContent = nome; // Exibe apenas o nome do serviço
      listaServicos.appendChild(li);
  });
}

document.getElementById('sair').addEventListener('click', limparLocalStorage);

function limparLocalStorage() {
  localStorage.removeItem('selectedDate');
  localStorage.removeItem('selectedTime');
  localStorage.removeItem('selectedServices');
  localStorage.removeItem('selectedProfessional');
  localStorage.removeItem('totalValue');
  // Opcional: Pode-se adicionar também a remoção de outros itens relacionados ao agendamento
}


function confirmarAgendamento() {
  // Definir a URL da API
  const url = "http://localhost:8080/salaosenac/agendamento";
  
  // Configurações da requisição
  const configuracoes = {
    method: 'POST', // Método de envio da requisição
    headers: {
      'Content-Type': 'application/json' // Tipo de conteúdo sendo enviado (JSON)
    },
    body: JSON.stringify(dados) // Dados que serão enviados, convertidos para JSON
  };

  // Realizar a requisição quando o modal for confirmado
  const confirmarBtn = document.getElementById('confirmar-agendamento-btn');
  if (confirmarBtn) {
    confirmarBtn.addEventListener('click', function() {
      // Impede múltiplos cliques ou chamadas simultâneas
      confirmarBtn.disabled = true;
      
      // Inicia a requisição
      fetch(url, configuracoes)
        .then(response => response.json()) // Converter a resposta para JSON
        .then(data => {
          // Verificar a resposta corretamente
          if (data.mensagem === 'Agendamento criado com sucesso') {
            // Exibir o modal de confirmação apenas quando a resposta for bem-sucedida
            $("#confirmacaoModal").modal("show");
            limparLocalStorage();
            console.log("ok")
            
            // Adiciona um evento ao botão "Fechar" do modal para redirecionar
            const fecharBtn = document.getElementById('fechar');
            fecharBtn.addEventListener('click', function() {
              // Redireciona para a página de serviços
              window.location.href = "/Frontend/Cliente/html/servicos.html";
            });

          } else {
            // Exibe o erro caso a resposta não seja a esperada
            console.error("Erro na resposta da API:", data);
            alert("Houve um erro ao realizar o agendamento. Tente novamente.");
          }
        })
        .catch(error => {
          // Tratar erros de rede ou falhas na requisição
          console.error("Erro ao enviar os dados:", error);
          alert("Houve um erro ao tentar realizar o agendamento.");
        })
        .finally(() => {
          // Reabilitar o botão caso a requisição tenha sido completada ou falhada
          confirmarBtn.disabled = false;
        });
    });
  }
}



document.addEventListener("DOMContentLoaded", function() {
  // Chamar a função para mostrar o modal de confirmação
  confirmarAgendamento();
});

        
console.log(dados);


