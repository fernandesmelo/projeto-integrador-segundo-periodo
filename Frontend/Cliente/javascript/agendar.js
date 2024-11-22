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

    document.getElementById("available-times").style.display = "block";
    document.getElementById("available-professionals-container").style.display = "block";
  }
  //escolhe a hora
  function selectTime(time) {
    const buttons = document.querySelectorAll(".time-button");
    buttons.forEach((button) => button.classList.remove("selected-time"));
    event.target.classList.add("selected-time");
    selectedTime = time;
    updateSummary();
  }

  // lógica do botão "sim"
  document.getElementById("choose-professional-yes").onclick = function () {
    chooseProfessional = true;

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

  // capturar seleção do profissional
  document.getElementById("professionals-list").addEventListener("change", function () {
    selectedProfessional = this.options[this.selectedIndex].text;
    updateSummary();
  });

  // atualiza resumo do agendamento
  function updateSummary() {
    const summaryElement = document.getElementById("summary");
    const finalizeButton = document.getElementById("finalize-button");

    // atualiza conteúdo do resumo
    let summaryHtml = `
      <h2>Resumo do Agendamento</h2>
      <p><strong>Data:</strong> ${selectedDate || "Não selecionada"}</p>
      <p><strong>Horário:</strong> ${selectedTime || "Não selecionado"}</p>
    `;
    if (chooseProfessional && selectedProfessional) {
      summaryHtml += `<p><strong>Profissional:</strong> ${selectedProfessional}</p>`;
    }
    summaryElement.innerHTML = summaryHtml;

    // exibi ou oculta o botão de agendar
    if (selectedDate && selectedTime && (!chooseProfessional || selectedProfessional)) {
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
