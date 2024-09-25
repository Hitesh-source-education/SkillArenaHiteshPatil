document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const loginBtn = document.querySelector('.login-btn');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username.length < 3 || password.length < 6) {
            showError('Invalid username or password');
            return;
        }
        
        simulateLogin(username, password);
    });

    function simulateLogin(username, password) {
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<span>Authenticating...</span><div class="btn-highlight"></div>';

        setTimeout(() => {
            if (username === 'demo' && password === 'password') {
                showSuccess('Access granted. Welcome, user.');
            } else {
                showError('Access denied. Invalid credentials.');
            }
            loginBtn.disabled = false;
            loginBtn.innerHTML = '<span>Sign In</span><div class="btn-highlight"></div>';
        }, 2000);
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.color = 'var(--error-color)';
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 3000);
    }

    function showSuccess(message) {
        errorMessage.textContent = message;
        errorMessage.style.color = 'var(--primary-color)';
        errorMessage.classList.add('show');
        setTimeout(() => {
            errorMessage.classList.remove('show');
            errorMessage.style.color = '';
        }, 3000);
    }

    // Futuristic cursor effect
    document.addEventListener('mousemove', (e) => {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-trail';
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
        document.body.appendChild(cursor);

        setTimeout(() => {
            cursor.remove();
        }, 1000);
    });
});