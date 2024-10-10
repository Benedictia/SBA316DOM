
// import "./styles.css";

    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    const countryInput = document.getElementById('countryInput');
    const termsCheckbox = document.getElementById('termsCheckbox');
    const signupBtn = document.getElementById('signupBtn');
    const signupMessage = document.getElementById('signupMessage');
    const userList = document.getElementById('userList');
    const users = JSON.parse(window.localStorage.getItem('users')) || [];



    function isValidEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    function isValidUsername(username) {
        const uniqueChars = new Set(username);
        return username.length >= 4 &&
               uniqueChars.size >= 2 &&
               /^[a-zA-Z0-9]+$/.test(username);
    }

    function isValidPassword(password, username) {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={};':"<>?,./\\|`~]).{12,}$/;
        return passwordPattern.test(password) && 
               !password.includes('password') && 
               !password.includes(username);
    }

    signupBtn.addEventListener('click', (event) => {
        event.preventDefault();
        
        // Clear previous messages
        signupMessage.innerHTML = '';
        signupMessage.style.display = 'none';

        // Get user input and use trip() to remove whitespace from both ends of a string
        const username = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const country = countryInput.value.trim();
        
        let errorMessage = '';

        // Validate inputs
        if (!username) {
            errorMessage += 'Username cannot be blank.<br>';
        } else if (!isValidUsername(username)) {
            errorMessage += 'Username must be at least 4 characters long, contain at least 2 unique characters, and cannot contain special characters or whitespace.<br>';
        }

        if (!email) {
            errorMessage += 'Email cannot be blank.<br>';
        } else if (!isValidEmail(email)) {
            errorMessage += 'Please enter a valid email address.<br>';
        }

        if (!password) {
            errorMessage += 'Password is required.<br>';
        } else if (!isValidPassword(password, username)) {
            errorMessage += 'Password must be at least 12 characters long, contain at least one uppercase letter, one lowercase letter, one number, one special character, and cannot include "password" or the username.<br>';
        }

        if (password !== confirmPassword) {
            errorMessage += 'Passwords must match.<br>';
        }

        if (!termsCheckbox.checked) {
            errorMessage += 'You must accept the terms and conditions.<br>';
        }

        if (!country) {
            errorMessage += 'Country is required.<br>';
        }

        // Show error messages if there are any
        if (errorMessage) {
            signupMessage.innerHTML = errorMessage.trim();
            signupMessage.className = 'error'; 
            signupMessage.style.display = 'block'; 
        } else {
            signupMessage.innerHTML = `Welcome, ${username}! You have successfully signed up.`;
            signupMessage.className = 'success'; 
            signupMessage.style.display = 'block'; 

            // Clear inputs after successful signup
            nameInput.value = '';
            emailInput.value = '';
            passwordInput.value = '';
            confirmPasswordInput.value = '';
            countryInput.value = '';
            termsCheckbox.checked = false;
        }
    });

  // Add the new user to the users array
  users.push({ name, email });

   // Store users in localStorage
   window.localStorage.setItem('users', JSON.stringify(users));

  // Display confirmation message
  confirmationMessage.innerHTML = `Thank you for signing up, <strong>${name}</strong>!`;
  confirmationMessage.classList.remove('hidden');

  // Clear the current user list and repopulate it
  userList.innerHTML = '';
  users.forEach(user => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `${user.name} (${user.email})`;
      userList.appendChild(listItem);
  });

signupForm.addEventListener('submit', handleFormSubmit);

emailInput.addEventListener('focus', handleEmailFocus);

function handleFormSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Reset the form fields
    userForm.reset();
}
    
function handleEmailFocus() {
    emailMessage.innerHTML = 'Please enter a valid email address.';
    emailMessage.classList.remove('hidden');

    setTimeout(() => {
        emailMessage.classList.add('hidden');
    }, 3000);
}
// Email blur handler
function handleEmailBlur() {
    // Reset the placeholder attribute when the input loses focus
    emailInput.setAttribute('placeholder', 'Email');
}


  //login
  function log(emailId, pinId) {
    const yourEmail = document.getElementById(emailId).value;
    const pin = document.getElementById(pinId).value;
    const errorMessageElement = document.getElementById("login-error-message");

    
    errorMessageElement.textContent = '';

    // Basic validation
    if (yourEmail === '') {
        errorMessageElement.textContent = 'Please enter your email.';
        return;
    }
    
    if (pin === '') {
        errorMessageElement.textContent = 'Please enter your PIN.';
        return;
    }

    // Simple email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(yourEmail)) {
        errorMessageElement.textContent = 'Please enter a valid email address.';
        return;
    }

    // PIN validation: must contain at least one letter and one number
    const pinPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
    if (!pinPattern.test(pin)) {
        errorMessageElement.textContent = 'Your PIN must contain at least one letter and one number.';
        return;
    }

    // Simulating a successful login
    errorMessageElement.textContent = 'Login successful!'; 
  
    document.getElementById(emailId).value = '';
    document.getElementById(pinId).value = '';
}

// I tried to write a code to track user sign up and log in but could not figure it out right.
// function addSignupName(name) {
//     const signupList = document.getElementById('signupList');
//     const listItem = document.createElement('li');
//     listItem.textContent = name;
//     signupList.appendChild(listItem);
// }

// function onSignupSuccess(name) {
//     showSuccess("Sign up successful!");
//     addSignupName(name);
// }

// function handleSignup() {
//     const userName = document.getElementById('usernameInput').value;

//     // Here you would normally check for successful signup
//     onSignupSuccess(userName);
// }
