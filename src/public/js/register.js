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
  }).then(result => {
    if (result.status === 200) {
      result.json();
      alert('User created successfully');
      window.location.replace('/users/login');
    } else {
      alert('Failed to create the new user')
    }
  }).then(json => console.log(json));
});