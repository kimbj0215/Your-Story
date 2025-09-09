const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const SignupButton = document.getElementById("signup-form-submit");


loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
        console.log(location.href);
        location.href= 'http:\\localhost\dashboard\kimproject\compare.php';
});
SignupButton.addEventListener("click", (event) => {
    event.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    console.log(location.href);
        location.href= 'signup-page.html';
});
