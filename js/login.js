document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded, initializing Vue app...');
    
    try {
        // Initialize Vue application
        const app = new Vue({
            el: '#auth-forms',
            data: {
                formType: 'login',
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
                                this.errors.firstName = 'El nom és obligatori.';
                            } else if (!this.nameRegex.test(value)) {
                                this.errors.firstName = 'Si us plau, introdueix un nom vàlid (1-50 caràcters).';
                            }
                            break;
                        case 'lastName':
                            if (!value) {
                                this.errors.lastName = 'Els cognoms són obligatoris.';
                            } else if (!this.nameRegex.test(value)) {
                                this.errors.lastName = 'Si us plau, introdueix uns cognoms vàlids (1-50 caràcters).';
                            }
                            break;
                        case 'email':
                            if (!value) {
                                this.errors.email = 'El correu electrònic és obligatori.';
                            } else if (value.length > 254) {
                                this.errors.email = 'El correu electrònic no pot superar els 254 caràcters.';
                            } else if (!this.emailRegex.test(value)) {
                                this.errors.email = 'Si us plau, introdueix un correu electrònic vàlid.';
                            }
                            break;
                        case 'password':
                            if (!value) {
                                this.errors.password = 'La contrasenya és obligatòria.';
                            } else if (value.length < 8) {
                                this.errors.password = 'La contrasenya ha de tenir almenys 8 caràcters.';
                            } else if (!this.passwordRegex.test(value)) {
                                this.errors.password = 'La contrasenya ha d\'incloure majúscules, minúscules, números i caràcters especials.';
                            }
                            break;
                        case 'terms':
                            if (!value) {
                                this.errors.terms = 'Has d\'acceptar els Termes i Condicions.';
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
                                this.errors.loginEmail = 'El correu electrònic és obligatori.';
                            } else if (value !== 'master' && !this.emailRegex.test(value)) { // Allow 'master' or valid email format
                                this.errors.loginEmail = 'Si us plau, introdueix un correu electrònic vàlid.';
                            }
                            break;
                        case 'password':
                            if (!value) {
                                this.errors.loginPassword = 'La contrasenya és obligatòria.';
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
                        alert('Compte creat amb èxit!');
                        // Reset the form after successful signup
                        this.resetSignupForm();
                        // redirect to login page
                        window.location.href = '/pages/index.html';
                    } else {
                        console.log('Signup form is invalid.');
                        // Ensure terms error is shown if it's the only thing missing
                        if (!this.signupData.terms && !this.errors.terms) {
                             this.errors.terms = 'Has d\'acceptar els Termes i Condicions.';
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
                            window.location.href = '/pages/home.html';
                        } else {
                            console.log('Invalid credentials.');
                            this.errors.loginGeneral = 'Correu electrònic o contrasenya incorrectes.';
                            // Clear password field on invalid login 
                            this.loginData.password = '';
                        }
                        // TODO: Add actual non-superuser login logic here (e.g., API call)
                    } else {
                        console.log('Login form is invalid.');
                    }
                },
                // Handle Google login
                handleGoogleLogin() {
                    alert('No Implementat login amb Google');
                },
                
                // Handle Apple login
                handleAppleLogin() {
                    alert('No Implementat login amb Apple');
                },
                
                // Handle forgot password click
                handleForgotPassword() {
                    alert('No implementat funcionalitat de recuperar la contraseña');
                },
                
                // Handle terms and conditions click
                handleTermsAndConditions() {
                    alert('La pàgina termes i condicions no está creada.');
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