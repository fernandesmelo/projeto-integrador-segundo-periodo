function toggleMenu() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";
}

document.addEventListener("DOMContentLoaded", function () {
  const alunoSim = document.getElementById("alunoSim");
  const alunoNao = document.getElementById("alunoNao");
  const matriculaField = document.getElementById("matriculaField");

  alunoSim.addEventListener("click", function () {
    matriculaField.style.display = "block";
  });

  alunoNao.addEventListener("click", function () {
    matriculaField.style.display = "none";
  });
});
