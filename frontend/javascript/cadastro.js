  function toggleMatriculaField() {
    const matriculaGroup = document.getElementById('matricula-group');
    const alunoSimChecked = document.getElementById('aluno-sim').checked;
    matriculaGroup.style.display = alunoSimChecked ? 'block' : 'none';
  }

  $('#cpf').mask('000.000.000-00');

  $('#telefone').mask('+00 (00) 00000-0000');

  document.getElementById('name').addEventListener('input', function (e) {
    let regex = /^[A-Za-zÀ-ÿ\s]*$/;
    if (!regex.test(this.value)) {
      this.value = this.value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
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

  document.getElementById('cadastro-form').addEventListener('submit', function (event) {
    event.preventDefault(); 
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const alunoSenac = document.querySelector('input[name="aluno-senac"]:checked').value;
    const matricula = document.getElementById('matricula').value;

    if (name === '' || email === '' || password === '' || dob === '') {
      alert('Por favor, preencha todos os campos obrigatórios.');
    } else {
      alert(`Cadastro realizado com sucesso!\nNome: ${name}\nData de Nascimento: ${dob}\nE-mail: ${email}\nAluno Senac: ${alunoSenac}${alunoSenac === "sim" ? `\nMatrícula: ${matricula}` : ''}`);
    }
  });
