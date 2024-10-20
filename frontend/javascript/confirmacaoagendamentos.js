const confirmedDate =
  localStorage.getItem("confirmedDate") || "Data não definida";
const confirmedTime =
  localStorage.getItem("confirmedTime") || "Horário não definido";

document.getElementById("confirmed-date").textContent = confirmedDate;
document.getElementById("confirmed-time").textContent = confirmedTime;
