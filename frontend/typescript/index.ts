const loginForm = document.getElementById('login-form');
const userTypeInput = document.getElementById('user-type') as HTMLSelectElement | null;
const usernameInput = document.getElementById('username') as HTMLInputElement | null;
const passwordInput = document.getElementById('password') as HTMLInputElement | null;

if (loginForm) {
  loginForm.addEventListener('submit', function (event: Event) {
    event.preventDefault();

    if (userTypeInput && usernameInput && passwordInput) {
      const userType = userTypeInput.value;
      const username = usernameInput.value;
      const password = passwordInput.value;

      if (userType === '' || username === '' || password === '') {
        alert('Por favor, preencha todos os campos.');
      } else {
        window.location.href = "serviços.html";
      }
    }
  });
}
