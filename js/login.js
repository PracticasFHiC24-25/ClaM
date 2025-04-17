document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded, initializing Vue app...');
    
    try {
        // Initialize Vue application
        const app = new Vue({
            el: '#auth-forms',
            data: {
                formType: 'signup', // Default form is signup
                showPassword: false,
                signupData: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    terms: false
                },
                loginData: {
                    email: '',
                    password: ''
                },
                errors: {
                    firstName: null,
                    lastName: null,
                    email: null,
                    password: null,
                    terms: null,
                    loginEmail: null,
                    loginPassword: null,
                    loginGeneral: null // For general login errors like invalid credentials
                },
                // Regex patterns for validation
                nameRegex: /^[a-zA-Zà-ÿÀ-Ÿ' -]{1,50}$/,
                emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                // Password: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
                passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
            },
            mounted() {
                console.log('Vue app mounted successfully');
                console.log('Form type is:', this.formType);
                // Add a direct click handler to the login button for debugging
                const loginBtn = document.querySelector('.btn-primary[type="submit"]');
                if (loginBtn) {
                    console.log('Found login button, adding extra click listener');
                    loginBtn.addEventListener('click', () => {
                        console.log('Login button clicked via direct event listener');
                    });
                } else {
                    console.log('Login button not found');
                }
            },
            computed: {
                isSignupFormValid() {
                    // Check if all fields are filled (except terms initially)
                    const fieldsFilled = this.signupData.firstName && 
                                         this.signupData.lastName && 
                                         this.signupData.email && 
                                         this.signupData.password;
                    // Check if there are no errors
                    const noErrors = Object.values(this.errors).every(error => error === null || error === '');
                    // Check if terms are agreed
                    const termsAgreed = this.signupData.terms;

                    return fieldsFilled && noErrors && termsAgreed;
                },
                isLoginFormValid() {
                    const fieldsFilled = this.loginData.email && this.loginData.password;
                    const noErrors = !this.errors.loginEmail && !this.errors.loginPassword;
                    return fieldsFilled && noErrors;
                }
            },
            methods: {
                // Switch between login and signup forms
                switchForm(type) {
                    this.formType = type;
                    this.showPassword = false;
                    this.clearErrors();
                    // Reset form data too
                    this.resetSignupForm();
                    this.resetLoginForm();
                },
                // Toggle password visibility
                togglePassword() {
                    this.showPassword = !this.showPassword;
                },
                // Validate a single field
                validateField(field) {
                    this.errors[field] = null; // Clear previous error
                    const value = this.signupData[field];

                    switch (field) {
                        case 'firstName':
                            if (!value) {
                                this.errors.firstName = 'First name is required.';
                            } else if (!this.nameRegex.test(value)) {
                                this.errors.firstName = 'Please enter a valid first name (1-50 chars).';
                            }
                            break;
                        case 'lastName':
                            if (!value) {
                                this.errors.lastName = 'Last name is required.';
                            } else if (!this.nameRegex.test(value)) {
                                this.errors.lastName = 'Please enter a valid last name (1-50 chars).';
                            }
                            break;
                        case 'email':
                            if (!value) {
                                this.errors.email = 'Email is required.';
                            } else if (value.length > 254) {
                                this.errors.email = 'Email cannot exceed 254 characters.';
                            } else if (!this.emailRegex.test(value)) {
                                this.errors.email = 'Please enter a valid email address.';
                            }
                            break;
                        case 'password':
                            if (!value) {
                                this.errors.password = 'Password is required.';
                            } else if (value.length < 8) {
                                this.errors.password = 'Password must be at least 8 characters long.';
                            } else if (!this.passwordRegex.test(value)) {
                                this.errors.password = 'Password must include uppercase, lowercase, number, and special character.';
                            }
                            break;
                        case 'terms':
                            if (!value) {
                                this.errors.terms = 'You must agree to the Terms & Conditions.';
                            } else {
                                this.errors.terms = null; // Clear error if checked
                            }
                            break;
                    }
                },
                // Validate a single login field
                validateLoginField(field) {
                    this.errors.loginGeneral = null; // Clear general error on field interaction
                    const value = this.loginData[field];
                    const errorKey = 'login' + field.charAt(0).toUpperCase() + field.slice(1);
                    this.errors[errorKey] = null; // Clear previous error

                    switch (field) {
                        case 'email':
                            if (!value) {
                                this.errors.loginEmail = 'Email is required.';
                            } else if (value !== 'master' && !this.emailRegex.test(value)) { // Allow 'master' or valid email format
                                this.errors.loginEmail = 'Please enter a valid email address.';
                            }
                            break;
                        case 'password':
                            if (!value) {
                                this.errors.loginPassword = 'Password is required.';
                            }
                            break;
                    }
                },
                // Validate all signup fields
                validateSignupForm() {
                    this.validateField('firstName');
                    this.validateField('lastName');
                    this.validateField('email');
                    this.validateField('password');
                    this.validateField('terms');
                    // Check computed property after validating all fields
                    return this.isSignupFormValid;
                },
                // Validate all login fields
                validateLoginForm() {
                    this.validateLoginField('email');
                    this.validateLoginField('password');
                    return this.isLoginFormValid;
                },
                // Handle signup form submission
                submitSignup() {
                    if (this.validateSignupForm()) {
                        console.log('Signup form is valid. Submitting data:', this.signupData);
                        // Should add actual form submission logic here, API call and response handling.
                        // In this example, we will just simulate a successful signup.
                        alert('Account creation successful!');
                        // TODO: Redirect to another page or show success message
                    } else {
                        console.log('Signup form is invalid.');
                        // Ensure terms error is shown if it's the only thing missing
                        if (!this.signupData.terms && !this.errors.terms) {
                             this.errors.terms = 'You must agree to the Terms & Conditions.';
                        }
                    }
                },
                // Handle login form submission
                submitLogin() {
                    console.log('SubmitLogin function entered'); 
                    this.errors.loginGeneral = null; // Clear previous general error
                    
                    console.log('Login data:', this.loginData);
                    console.log('Form validation result:', this.validateLoginForm());
                    
                    if (this.validateLoginForm()) {
                        // Check for superuser credentials
                        if (this.loginData.email === 'master' && this.loginData.password === '123') {
                            console.log('Superuser login successful!');
                            alert('Superuser login successful!');
                            // TODO: Redirect or perform superuser action
                        } else {
                            console.log('Invalid credentials.');
                            this.errors.loginGeneral = 'Invalid email or password.';
                            // Clear password field on invalid login 
                            this.loginData.password = '';
                        }
                        // TODO: Add actual non-superuser login logic here (e.g., API call)
                    } else {
                        console.log('Login form is invalid.');
                    }
                },
                // Clear all error messages
                clearErrors() {
                    this.errors = {
                        firstName: null,
                        lastName: null,
                        email: null,
                        password: null,
                        terms: null,
                        loginEmail: null,
                        loginPassword: null,
                        loginGeneral: null
                    };
                },
                // Reset signup form data
                resetSignupForm() {
                    this.signupData = {
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        terms: false
                    };
                    this.clearErrors();
                },
                // Reset login form data
                resetLoginForm() {
                    this.loginData = {
                        email: '',
                        password: ''
                    };
                    this.clearErrors(); // Also clear errors when resetting
                }
            }
        });
        
        console.log('Vue app initialized:', app);
    } catch (err) {
        console.error('Error initializing Vue:', err);
    }
});