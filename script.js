const scriptURL = 'https://script.google.com/macros/s/AKfycbwf5SZ6eFAvs7ZIAiY-ok5jyDCLaqswGtWn1_1mEexiH7DGtE0dWDjjvjY4S9_GxFaF4g/exec';
const form = document.forms['submit-to-google-sheet'];
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(form);

  // Check if user has already submitted
  if (localStorage.getItem('submitted')) {
    alert('You have already submitted a response.');
    return;
  }

  // Disable the submit button and display loading text
  submitButton.disabled = true;
  submitButton.innerHTML = 'Loading...';

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => {
      if (response.ok) {
        console.log('Success!', response);
        // Redirect to thankyou.html
        window.location.href = 'thankyou.html';
        // Mark user as submitted
        localStorage.setItem('submitted', true);
      } else {
        console.error('Error!', response.statusText);
        throw new Error('Failed to submit form');
      }
    })
    .catch(error => {
      console.error('Error!', error.message);
    })
    .finally(() => {
      // Re-enable the submit button with original text and clear form inputs
      submitButton.disabled = false;
      submitButton.innerHTML = 'Send';
      form.reset();
    });
});
