// contact-us.js
        // Form Validation
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function showError(fieldId, message) {
            const input = document.getElementById(fieldId);
            const errorDiv = document.getElementById(fieldId + '-error');
            
            input.classList.add('error');
            input.setAttribute('aria-invalid', 'true');
            errorDiv.textContent = message;
            errorDiv.classList.add('show');
        }

        function clearError(fieldId) {
            const input = document.getElementById(fieldId);
            const errorDiv = document.getElementById(fieldId + '-error');
            
            input.classList.remove('error');
            input.setAttribute('aria-invalid', 'false');
            errorDiv.textContent = '';
            errorDiv.classList.remove('show');
        }

        function handleSubmit() {
            let isValid = true;

            // Clear all previous errors
            ['name', 'email', 'subject', 'message'].forEach(clearError);

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validate name
            if (!name) {
                showError('name', 'Full name is required');
                isValid = false;
            }

            // Validate email
            if (!email) {
                showError('email', 'Email is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate subject
            if (!subject) {
                showError('subject', 'Subject is required');
                isValid = false;
            }

            // Validate message
            if (!message) {
                showError('message', 'Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Message must be at least 10 characters long');
                isValid = false;
            }

            // If valid, show success message
            if (isValid) {
                document.getElementById('contactForm').style.display = 'none';
                document.getElementById('successMessage').classList.add('show');

                // Reset form and return to form view after 5 seconds
                setTimeout(() => {
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('subject').value = '';
                    document.getElementById('message').value = '';
                    document.getElementById('contactForm').style.display = 'block';
                    document.getElementById('successMessage').classList.remove('show');
                }, 5000);
            }
        }

        // Clear error on input
        document.getElementById('name').addEventListener('input', () => clearError('name'));
        document.getElementById('email').addEventListener('input', () => clearError('email'));
        document.getElementById('subject').addEventListener('input', () => clearError('subject'));
        document.getElementById('message').addEventListener('input', () => clearError('message'));

        // Handle Enter key submission (except in textarea)
        document.querySelectorAll('input').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit();
                }
            });
        });
