document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const userType = document.getElementById('user-type').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (userType === '' || username === '' || password === '') {
    alert('Por favor, preencha todos os campos.');
  } else {
    window.location.href = "serviços.html"; 
  }
});
