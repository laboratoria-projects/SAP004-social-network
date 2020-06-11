import registerGmail from '../../scripts/auth.js';

function success() {
  location.hash = 'home';
}

function error(erro) {
  console.log(error);
  alert('Algo aconteceu de errado.');
}

async function registerEmailAndPassword(e) {
  try {
    e.preventDefault();

    const form = e.target.elements;
    const email = form.email.value;
    const password = form.password.value;

    await firebase.auth().createUserWithEmailAndPassword(email, password);

    success();
  } catch (e) {
    error(e);
  }
}

function controllerRegister(template) {
  const container = document.createElement('section');
  container.innerHTML = template;

  const form = container.querySelector('#form-register');
  const gmail = container.querySelector('#gmail-auth');

  form.addEventListener('submit', registerEmailAndPassword);

  gmail.addEventListener('click', (e) => registerGmail(e));

  return container;
}

export default controllerRegister;