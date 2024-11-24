$(document).ready(function () {
  let selectedDate = null;
  let selectedTime = null;
  let selectedProfessional = null;
  let chooseProfessional = false;

  const bookedDates = [
    moment().add(2, "days").format("DD-MM-YYYY"),
    moment().add(5, "days").format("DD-MM-YYYY"),
  ];
  //inicia o calendario
  $("#calendar").fullCalendar({
    locale: "pt-br",
    selectable: true,
    selectHelper: true,
    select: function (start) {
      const newDate = start;
      const today = moment();
    
      if (newDate.isBefore(today, "day")) {
        alert("Não é permitido selecionar uma data anterior a hoje.");
        return;
      }

      if (selectedDate) {
        $("#calendar").fullCalendar("removeEvents", function (event) {
          return event.title === "Pré-agendado";
        });
      }

      const formattedDate = newDate.format("DD-MM-YYYY");
      //logica para pre agendar
      if (!bookedDates.includes(formattedDate)) {
        $("#calendar").fullCalendar(
          "renderEvent",
          {
            title: "Pré-agendado",
            start: newDate,
            allDay: true,
            color: "#F39C21",
          },
          true
        );

        selectedDate = formattedDate;
        updateAvailableTimes(formattedDate);
        updateSummary();
      } else {
        alert("Esta data já está agendada!");
      }
    },
    events: bookedDates.map((date) => ({
      title: "Agendado",
      start: date,
      allDay: true,
      color: "red",
    })),
    dayRender: function (date, cell) {
      const formattedDate = date.format("DD-MM-YYYY");
      if (bookedDates.includes(formattedDate)) {
        cell.css("background-color", "rgba(255, 0, 0, 0.2)");
      } else {
        cell.css("background-color", "rgba(0, 255, 0, 0.2)");
      }
    },
    eventClick: function (event) {
      alert("Você clicou em: " + event.title);
    },
  });

  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  function updateAvailableTimes(date) {
    const timesList = document.getElementById("times-list");
    timesList.innerHTML = "";

    const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00"];

    availableTimes.forEach(function (time) {
      const button = document.createElement("button");
      button.className = "time-button";
      button.textContent = time;
      button.onclick = function () {
        selectTime(time);
      };
      timesList.appendChild(button);
    });
    saveToLocalStorage("selectedDate", date);

    document.getElementById("available-times").style.display = "block";
    document.getElementById("available-professionals-container").style.display = "block";
  }
  //escolhe a hora
  function selectTime(time) {
    const buttons = document.querySelectorAll(".time-button");
    buttons.forEach((button) => button.classList.remove("selected-time"));
    event.target.classList.add("selected-time");
    selectedTime = time;
    saveToLocalStorage("selectedTime", selectedTime);
    updateSummary();
  }

  // lógica do botão "sim"
  document.getElementById("choose-professional-yes").onclick = function () {
    chooseProfessional = true;
    fetchProfessionals(); // Agora a função está acessível globalmente

    // adiciona a classe "active" do botão "Sim" e remove do "Não"
    this.classList.add("active");
    document.getElementById("choose-professional-no").classList.remove("active");

    document.getElementById("professional-dropdown").style.display = "block";
    updateSummary();
};

  // lógica do botão não
  document.getElementById("choose-professional-no").onclick = function () {
    chooseProfessional = false;

    // adiciona a classe "active" no botão "Não" e remove do "Sim"
    this.classList.add("active");
    document.getElementById("choose-professional-yes").classList.remove("active");

    document.getElementById("professional-dropdown").style.display = "none";
    selectedProfessional = null; // limpa a escolha do profissional
    updateSummary();
  };

 // Função para buscar os profissionais
 async function fetchProfessionals() {
  try {
      const response = await fetch("http://localhost:8080/salaosenac/funcionarios");
      console.log('ok');
      if (!response.ok) {
          throw new Error("Erro ao buscar os profissionais. Código: " + response.status);
      }
      const professionals = await response.json();

      // Salvar os profissionais no localStorage
      const professionalsCache = {};
      professionals.forEach((professional) => {
          professionalsCache[professional.idFuncionario] = professional.nome; // ID como chave, nome como valor
      });
      localStorage.setItem("professionals", JSON.stringify(professionalsCache));

      // Atualizar o dropdown
      updateDropdown(professionals);
  } catch (error) {
      console.error("Erro ao carregar profissionais:", error);
      alert("Não foi possível carregar a lista de profissionais. Tente novamente mais tarde.");
  }
}

// Função para atualizar o dropdown com os profissionais
function updateDropdown(professionals) {
  const professionalsList = document.getElementById("professionals-list");
  professionalsList.innerHTML = `
      <option value="" disabled selected>Selecione um profissional</option>
  `;

  professionals.forEach((professional) => {
      const option = document.createElement("option");
      option.value = professional.idFuncionario; // Use o ID do profissional
      option.textContent = professional.nome; // Use o nome do profissional
      professionalsList.appendChild(option);
  });

  // Adiciona evento para capturar a seleção do profissional
  professionalsList.addEventListener("change", (event) => {
      const selectedId = event.target.value;
      const selectedName = event.target.options[event.target.selectedIndex].text;

      selectedProfessional = { id: selectedId, nome: selectedName };
      localStorage.setItem("selectedProfessional", JSON.stringify(selectedProfessional)); // Armazena o profissional selecionado
      updateSummary(); 
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const chooseProfessionalYesButton = document.getElementById("choose-professional-yes");
  chooseProfessionalYesButton.addEventListener("click", () => {
      // Exibir o dropdown de profissionais e buscar os dados
      document.getElementById("professional-dropdown").style.display = "block";
      fetchProfessionals();
  });
});

// Função para atualizar o resumo
function updateSummary() {
  const summaryElement = document.getElementById("summary");
  const finalizeButton = document.getElementById("finalize-button");
  const selectedServices = JSON.parse(localStorage.getItem("selectedServices")) || [];
  const totalValue = localStorage.getItem("totalValue") || 0;


  
  let summaryHtml = `
      <h2>Resumo do Agendamento</h2>
      <p><strong>Data:</strong> ${selectedDate || "Não selecionada"}</p>
      <p><strong>Horário:</strong> ${selectedTime || "Não selecionado"}</p>
  `;
  if (selectedServices.length > 0) {
    summaryHtml += `
      <p><strong>${selectedServices.length > 1 ? "Serviços Escolhidos" : "Serviço Escolhido"}:</strong></p>
      <ul>
        ${selectedServices.map(service => `<li>${service.nome}</li>`).join("")}
      </ul>
    `;
    summaryHtml += `<p><strong>Valor Total:</strong> R$ ${parseFloat(totalValue).toFixed(2)}</p>`;
  } else {
    summaryHtml += `<p><strong> Serviços Escolhidos:</strong> Nenhum serviço selecionado</p>`;
  }

  if (selectedProfessional) {
      summaryHtml += `<p><strong>Profissional:</strong> ${selectedProfessional.nome}</p>`;
  }
  summaryElement.innerHTML = summaryHtml;

  // Exibe ou oculta o botão de agendar
  if (selectedDate && selectedTime) {
      summaryElement.style.display = "block";
      finalizeButton.style.display = "block";
  } else {
      finalizeButton.style.display = "none";
  }
}


  document.getElementById("finalize-button").onclick = function () {
    window.location.href = "./confirmacaoagendamento.html";
  };
});
