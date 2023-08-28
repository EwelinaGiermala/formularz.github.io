const form = document.getElementById('registrationform'); 
const termsCheckbox = document.getElementById('terms'); 
const submitButton = document.getElementById('submitButton');
const errorMessagesDiv = document.getElementById('errorMessages');

termsCheckbox.addEventListener('change', function() {
    submitButton.disabled = !this.checked;
});

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let errors = [];

    if (!/^[a-zA-Z]*$/.test(firstname)) {
        errors.push("Imię może zawierać tylko litery!");
    }

    if (!/^[a-zA-Z]*$/.test(lastname)) {
        errors.push("Nazwisko może zawierać tylko litery!");
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        errors.push("Nieprawidłowy adres e-mail!");
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    if (!passwordPattern.test(password)) {
        errors.push("Hasło musi zawierać min. 7 znaków, wielką literę, małą literę i znak specjalny.");
    }

    if (errors.length > 0) {
        errorMessagesDiv.innerHTML = errors.join('<br>');
    } else {
        errorMessagesDiv.innerHTML = '';
        console.log('Formularz poprawnie wypełniony!');
    }
});