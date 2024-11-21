$(document).ready(function () {
  let selectedDate = null;
  let selectedTime = null;

  const bookedDates = [
    moment().add(2, "days").format("DD-MM-YYYY"),
    moment().add(5, "days").format("DD-MM-YYYY"),
  ];

  // Inicializa o calendário
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
        document.getElementById("summary-date").textContent = selectedDate;
        document.getElementById("summary").style.display = "block";
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

  // aqui atualiza os horários pra a data selecionada
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
  }

  // seleção de horarios
  function selectTime(time) {
    const buttons = document.querySelectorAll(".time-button");
    buttons.forEach((button) => button.classList.remove("selected-time"));
    event.target.classList.add("selected-time");
    selectedTime = time;

    document.getElementById("summary-date").textContent = selectedDate;
    document.getElementById("summary-time").textContent = selectedTime;
    document.getElementById("summary").style.display = "block";
    document.getElementById("finalize-button").style.display = "block";
  }

  // finaliza o agendamento
  document.getElementById("finalize-button").onclick = function () {
    window.location.href = "./confirmacaoagendamento.html";
  };

  // Fecha o modal
  document.getElementById("closeModal").onclick = function () {
    document.getElementById("eventModal").style.display = "none";
  };

  // Adiciona eventos
  document.getElementById("addEventButton").onclick = function () {
    const title = document.getElementById("eventTitle").value;
    if (title) {
      $("#calendar").fullCalendar(
        "renderEvent",
        {
          title: title,
          start: selectedDate,
          allDay: true,
        },
        true
      );
      document.getElementById("eventModal").style.display = "none";
    }
  };
});
