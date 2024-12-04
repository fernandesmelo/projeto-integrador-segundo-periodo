document.addEventListener("DOMContentLoaded", function () {
  // Toggle Menu
  function toggleMenu() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display =
      sidebar.style.display === "block" ? "none" : "block";
  }

  // Mostrar campo de matrícula
  const alunoSim = document.getElementById("alunoSim");
  const alunoNao = document.getElementById("alunoNao");
  const matriculaField = document.getElementById("matriculaField");

  alunoSim?.addEventListener("click", function () {
    matriculaField.style.display = "block";
  });

  alunoNao?.addEventListener("click", function () {
    matriculaField.style.display = "none";
  });

  $(document).ready(function () {
    $("#cpf").mask("000.000.000-00");
    $("#telefone").mask("(00) 00000-0000");
  });

  function limparFormulario() {
    document.getElementById("cadastro-form").reset();
  }
  

  document
    .getElementById("cadastro-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const nome = document.getElementById("nome").value;
      const data_nasc = document.getElementById("data_nasc").value;
      const cpf = document.getElementById("cpf").value;
      const sexo = document.getElementById("sexo").value;
      const telefone = document.getElementById("telefone").value;
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;
      const confirmarSenha = document.getElementById("confirmarSenha").value;
      // Verificar se o campo de matrícula existe antes de acessá-lo
      let matricula = null;
      if (document.getElementById("matricula")) {
        matricula = document.getElementById("matricula").value
      }

      // Validações básicas
      if (!nome || !email || !senha || !data_nasc) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
      }

      if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
      }

      // Estrutura do objeto de cadastro
      const formCadastrar = {
        nome,
        data_nasc,
        cpf,
        sexo,
        telefone,
        email,
        senha,
        matricula: matricula || null,
      };

      console.log(formCadastrar);

      try {
        const response = await fetch(
          "http://localhost:8080/salaosenac/cliente",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formCadastrar),
          }
        );

        if (response.status === 201) {
          alert("Cadastro realizado com sucesso!");
          limparFormulario();
        } else if (response.status === 409) {
          const data = await response.json();
          throw new Error(data.message);
        } else {
          throw new Error("Ocorreu um erro ao realizar o cadastro.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert(error.message);
      }
    });
});
