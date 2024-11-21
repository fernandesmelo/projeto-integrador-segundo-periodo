

document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const senha = document.getElementById('password').value;

  if (email === '' || senha === '') {
    alert('Por favor, preencha todos os campos.');
  } else {
    const login = {
      email: email,
      senha: senha
    };
    fetch('http://localhost:8080/salaosenac/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    })
    .then(response => {
      if (response.status === 200) 
        {
          return response.json();
          
        } else if ( response.status === 401){
          throw new Error('Email ou senha inválidos');
        } else {
          throw new Error('Erro ao tentar realizar login');
        }
    })
    .then(data => {
      localStorage.setItem('cliente', JSON.stringify(data));
      console.log('Objeto armazenado no localStorage:', JSON.parse(localStorage.getItem('cliente')));
      const clienteSalvo = JSON.parse(localStorage.getItem('cliente'));
      console.log('Cliente salvo:', clienteSalvo);

      console.log('Sucesso: ', data)
      alert('Login realizado com sucesso!')
      window.location.href = "html/servicos.html";
    })
    .catch(error => {
      console.error('Erro: ', error);
      alert(error.messege);
    });
  }
});
