const registerFrom = document.getElementById('registerForm');

registerFrom.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(registerFrom);
  const obj = {};
  data.forEach((value, key) => obj[key] = value);
  fetch('/api/session/register', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(result => result.json()).then(json => console.log(json))
  window.location.replace('/users/login')
});