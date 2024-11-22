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
