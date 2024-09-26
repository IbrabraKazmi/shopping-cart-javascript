// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('Login Form Submitted');
    console.log('Email:', email);
    console.log('Password:', password);

    // Here, you'd typically make an API request to verify the login credentials.
    alert('Login successful! (For demo purposes)');
});

// Handle signup form submission
document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementBy
    .getElementById('password').value;

    console.log('Sign Up Form Submitted');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);

    // Here, you'd typically make an API request to register the new user.
    alert('Sign-up successful! (For demo purposes)');
});

