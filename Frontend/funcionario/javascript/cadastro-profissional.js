document.getElementById('cadastroProfissional').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const cpf = document.getElementById('cpf').value;
    const sexo = document.getElementById('sexo').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const especialidades = Array.from(document.getElementById('especialidades').selectedOptions).map(option => option.value);

    console.log({
        nome,
        endereco,
        cpf,
        sexo,
        dataNascimento,
        especialidades
    });

    alert('Profissional cadastrado com sucesso!');
    this.reset();
});