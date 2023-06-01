import throttle from 'lodash.throttle';

const CURRENT_FORM_STATE = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

let formState = {};

form.addEventListener('input', throttle(onTextInput, 500));
updateOutput();
form.addEventListener('submit', saveMessage);

function onTextInput(evt) {
  formState[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(CURRENT_FORM_STATE, JSON.stringify(formState));
}

function saveMessage(evt) {
  evt.preventDefault();
  console.log('formState', formState);
  localStorage.removeItem(CURRENT_FORM_STATE);
  formState = {};
  evt.target.reset();
}

function updateOutput() {
  try {
    const data = localStorage.getItem(CURRENT_FORM_STATE);
    if (!data) return;
    formState = JSON.parse(data);
    Object.entries(formState).forEach(([key, val]) => {
      form.elements[key].value = val;
    });
  } catch (error) {
    console.log(error.message);
  }
}
