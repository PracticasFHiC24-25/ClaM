document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM content loaded, initializing Vue app for config...');

    try {
        const app = new Vue({
            el: '#config-form',
            data: {
                username: '',
                email: '',
                newPassword: '',
                language: 'ca', // Default language
                showPassword: false, // Added for password toggle
                errors: {
                    username: null,
                    email: null,
                    newPassword: null,
                    general: null
                },
                // Regex patterns (similar to login.js)
                nameRegex: /^[a-zA-Zà-ÿÀ-Ÿ' -]{1,50}$/,
                emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                // Password: 8+ chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
                passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
            },
            computed: {
                isFormValid() {
                    const fieldsFilled = this.username && this.email && this.newPassword;
                    const noErrors = !this.errors.username && !this.errors.email && !this.errors.newPassword;
                    return fieldsFilled && noErrors;
                }
            },
            methods: {
                // Added method to toggle password visibility
                togglePassword() {
                    this.showPassword = !this.showPassword;
                },
                // Validate a single field
                validateField(field) {
                    this.errors.general = null; // Clear general error on field interaction
                    this.errors[field] = null; // Clear previous error for this field
                    const value = this[field]; // Access data property directly

                    switch (field) {
                        case 'username':
                            if (!value) {
                                this.errors.username = "Nom d'usuari és requerit.";
                            } else if (!this.nameRegex.test(value)) {
                                this.errors.username = "Nom d'usuari ha de tenir entre 3 i 50 caràcters alfanumèrics.";
                            }
                            break;
                        case 'email':
                            if (!value) {
                                this.errors.email = 'Email és requerit.';
                            } else if (value.length > 254) {
                                this.errors.email = 'Email no pot excedir 254 caràcters.';
                            } else if (!this.emailRegex.test(value)) {
                                this.errors.email = 'Si us plau, introdueix una adreça de correu electrònic vàlida.';
                            }
                            break;
                        case 'newPassword':
                            if (!value) {
                                this.errors.newPassword = 'Nova contrasenya és requerida.';
                            } else if (value.length < 8) {
                                this.errors.newPassword = 'La contrasenya ha de tenir almenys 8 caràcters.';
                            } else if (!this.passwordRegex.test(value)) {
                                this.errors.newPassword = 'La contrasenya ha d\'incloure majúscules, minúscules, números i caràcters especials.';
                            }
                            break;
                    }
                },
                // Validate all config fields
                validateConfigForm() {
                    this.validateField('username');
                    this.validateField('email');
                    this.validateField('newPassword');
                    return this.isFormValid;
                },
                // Handle config form submission
                submitConfig() {
                    console.log('submitConfig function entered');
                    this.errors.general = null; // Clear previous general error

                    if (this.validateConfigForm()) {
                        console.log('Config form is valid. Submitting data:', {
                            username: this.username,
                            email: this.email,
                            newPassword: this.newPassword,
                            language: this.language
                        });
                        // TODO: Add actual form submission logic here (e.g., API call)
                        // Simulate success for now
                        alert('Canvis desats correctament!');
                        this.username = '';
                        this.email = '';
                        this.newPassword = '';
                        this.language = 'ca'; // Reset to default language
                        this.clearErrors();
                    } else {
                        console.log('Config form is invalid.');
                        this.errors.general = 'Si us plau, corregeix els errors del formulari.';
                    }
                },
                // Clear all error messages
                clearErrors() {
                    this.errors = {
                        username: null,
                        email: null,
                        newPassword: null,
                        general: null
                    };
                },
            },
            mounted() {
                console.log('Vue app for config mounted successfully');
            }
        });

        console.log('Vue config app initialized:', app);
    } catch (err) {
        console.error('Error initializing Vue for config:', err);
    }
});
