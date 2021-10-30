import throttle from 'lodash/throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

const savedFeedbackFormStateJSON = localStorage.getItem('feedback-form-state');

if (savedFeedbackFormStateJSON) {
  const savedFeedbackFormState = JSON.parse(savedFeedbackFormStateJSON);
  if (savedFeedbackFormState.email) {
    refs.email.value = savedFeedbackFormState.email;
  }
  if (savedFeedbackFormState.message) {
    refs.message.value = savedFeedbackFormState.message;
  }
}

refs.form.addEventListener('submit', onFormSubmit);
refs.email.addEventListener('input', throttle(onEmailInput, 500));
refs.message.addEventListener('input', throttle(onMessageInput, 500));

function onFormSubmit(e) {
  e.preventDefault();

  if (!refs.email.value || !refs.message.value) {
    return alert('All fields must be filled!');
  }

  const submitFeedbackFormStateJSON = localStorage.getItem('feedback-form-state');
  const submitFeedbackFormState = JSON.parse(submitFeedbackFormStateJSON);

  console.log(`Email: ${submitFeedbackFormState.email}`);
  console.log(`Message: ${submitFeedbackFormState.message}`);
  localStorage.removeItem('feedback-form-state');
  e.currentTarget.reset();
}

function onEmailInput(e) {
  const feedbackFormState = {};
  feedbackFormState.message = refs.message.value;
  feedbackFormState[e.target.name] = e.target.value;
  const feedbackFormStateJSON = JSON.stringify(feedbackFormState);
  localStorage.setItem('feedback-form-state', feedbackFormStateJSON);
}

function onMessageInput(e) {
  const feedbackFormState = {};
  feedbackFormState[e.target.name] = e.target.value;
  feedbackFormState.email = refs.email.value;
  const feedbackFormStateJSON = JSON.stringify(feedbackFormState);
  localStorage.setItem('feedback-form-state', feedbackFormStateJSON);
}
