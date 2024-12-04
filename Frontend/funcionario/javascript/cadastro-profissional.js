function toggleMenu() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";
  
}

async function carregarEspecialidades() {
  try {
    const response = await fetch("http://localhost:8080/salaosenac/categorias");
    if (response.ok) {
      const especialidades = await response.json();
      const selectEspecialidades = document.getElementById("especialidades");

      // Preenche as opções no select
      especialidades.forEach((especialidade) => {
        const option = document.createElement("option");
        option.value = especialidade.idCategoria;
        option.textContent = especialidade.nome;
        selectEspecialidades.appendChild(option);
      });
    } else {
      console.error("Erro ao carregar especialidades:", response.statusText);
    }
  } catch (error) {
    console.error("Erro ao conectar ao servidor para buscar especialidades:", error);
  }
}

document.addEventListener("DOMContentLoaded", carregarEspecialidades);


document
  .getElementById("cadastroProfissional")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const sexo = document.getElementById("sexo").value.trim();
    const email = document.getElementById("email").value.trim();
    const especialidades = Array.from(
      document.getElementById("especialidades").selectedOptions
    ).map((option) => parseInt(option.value)); // Convertendo para números

    // Validação simples
    if (!nome || !cpf || !sexo || !email || especialidades.length === 0) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Dados do profissional a serem enviados
    const profissional = {
      nome,
      cpf,
      sexo,
      email,
      categorias: especialidades
    };

    console.log(profissional);

    try {
      // Enviar os dados para o backend
      const response = await fetch("http://localhost:8080/salaosenac/funcionario/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(profissional)
      });

      if (response.ok) {
        alert("Profissional cadastrado com sucesso!");
        this.reset(); // Limpa o formulário após o cadastro
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar profissional: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Erro ao conectar ao servidor:", error);
      alert("Erro ao conectar ao servidor. Por favor, tente novamente.");
    }
  });
