import throttle from 'lodash.throttle';

const CURRENT_FORM_STATE = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

let formState = JSON.parse(localStorage.getItem(CURRENT_FORM_STATE)) || {};

form.addEventListener('input', throttle(onTextInput, 500));
updateOutput();
form.addEventListener('submit', saveMessage);

function onTextInput(evt) {
  formState[evt.target.name] = evt.target.value;
  localStorage.setItem(CURRENT_FORM_STATE, JSON.stringify(formState));
}

function saveMessage(evt) {
  evt.preventDefault();
  formState.email = form.elements.email.value;
  formState.message = form.elements.message.value;
  console.log('formState', formState);

  updateOutput();
  localStorage.removeItem(CURRENT_FORM_STATE);
  formState = {};
  form.reset();
}

function updateOutput() {
  const data = JSON.parse(localStorage.getItem(CURRENT_FORM_STATE));
  if (data) {
    form.elements.email.value = data.email || '';
    form.elements.message.value = data.message || '';
  }
  return;
}
