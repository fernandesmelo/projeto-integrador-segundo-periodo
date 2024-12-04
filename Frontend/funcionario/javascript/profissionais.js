function toggleMenu() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";
}

async function exibirProfissionais() {
  const tabela = document.getElementById("professionalsTable");

  try {
    const response = await fetch("http://localhost:8080/salaosenac/funcionarios/especialidade");
    if (response.ok) {
      const data = await response.json();

      // Extrai apenas a primeira parte da resposta
      const profissionais = data[0];

      // Agrupa categorias por idFuncionario
      const profissionaisAgrupados = {};

      profissionais.forEach((prof) => {
        if (!profissionaisAgrupados[prof.idFuncionario]) {
          profissionaisAgrupados[prof.idFuncionario] = {
            nome: prof.nome,
            categorias: [],
          };
        }
        profissionaisAgrupados[prof.idFuncionario].categorias.push(prof.categoria);
      });

      // Itera sobre o objeto de profissionais agrupados
      Object.values(profissionaisAgrupados).forEach((prof) => {
        const row = `
          <tr>
            <td>${prof.nome}</td>
            <td>${prof.categorias.join(", ")}</td>
          </tr>
        `;
        tabela.innerHTML += row;
      });
    } else {
      console.error("Erro ao buscar profissionais:", response.statusText);
      tabela.innerHTML = `<tr><td colspan="2">Erro ao carregar profissionais</td></tr>`;
    }
  } catch (error) {
    console.error("Erro ao conectar ao servidor para buscar profissionais:", error);
    tabela.innerHTML = `<tr><td colspan="2">Erro ao conectar ao servidor</td></tr>`;
  }
}

document.addEventListener("DOMContentLoaded", exibirProfissionais);

