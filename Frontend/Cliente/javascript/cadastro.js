function toggleMatriculaField() {
  const matriculaGroup = document.getElementById("matricula-group");
  const alunoSimChecked = document.getElementById("aluno-sim").checked;
  matriculaGroup.style.display = alunoSimChecked ? "block" : "none";
}

$("#cpf").mask("000.000.000-00");

$('#telefone').mask('(00) 00000-0000');

document.getElementById("name").addEventListener("input", function (e) {
  let regex = /^[A-Za-zÀ-ÿ\s]*$/;
  if (!regex.test(this.value)) {
    this.value = this.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
  }
});

document.getElementById('cadastro-form').addEventListener('submit', function (e) {
  const senha = document.getElementById('password').value;
  const confirmarSenha = document.getElementById('confirm-password').value;
  if (senha !== confirmarSenha) {
    e.preventDefault();
    alert('As senhas não coincidem!');
    return;
  }
});

document.getElementById('matricula').addEventListener('input', function () {
  this.value = this.value.replace(/\D/g, ''); 
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('cadastro-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const nome = document.getElementById('name').value;
    const data_nasc = document.getElementById('data_nasc').value;
    const cpf = document.getElementById('cpf').value;
    const sexo = document.getElementById('sexo').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;
    const matricula = document.getElementById('matricula').value;

    if (nome === '' || email === '' || senha === '' || data_nasc === '') {
      alert('Por favor, preencha todos os campos obrigatórios.');
    } else if (senha !== document.getElementById('confirm-password').value) {
      alert('As senhas não coincidem!');
    } else {
      const formCadastrar = {
        nome: nome,
        data_nasc: data_nasc,
        cpf: cpf,
        sexo: sexo,
        telefone: telefone,
        email: email,
        senha: senha,
        matricula: matricula || null
      };

      fetch('http://localhost:8080/salaosenac/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formCadastrar)
      })
      .then(response => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 409) {
          return response.json().then(data => { throw new Error(data.message); });
        } else {
          throw new Error('Ocorreu um erro ao realizar o cadastro.');
        }
      })
      .then(cadastro => {
        console.log('Success:', cadastro);
        alert('Cadastro realizado com sucesso!');
        window.location.href = "../index.html";
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(error.message);
      });
    }
  });
});


