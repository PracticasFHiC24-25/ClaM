document.addEventListener('DOMContentLoaded', function() {
    try {
        const app = new Vue({
            el: '#config-form',
            data: {
                username: '',
                email: '',
                newPassword: '',
                language: 'ca',
                showPassword: false,
                isLoading: false,
                isSaved: false,
                errors: {
                    username: null,
                    email: null,
                    newPassword: null,
                    general: null
                },
                nameRegex: /^[a-zA-Zà-ÿÀ-Ÿ' -]{1,50}$/,
                emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/
            },
            created() {
                // Load user data when component is created
                this.loadUserData();
            },
            computed: {
                isFormValid() {
                    const fieldsFilled = this.username && this.email;
                    const noErrors = !this.errors.username && !this.errors.email;
                    // Only check password if it's been modified
                    if (this.newPassword) {
                        return fieldsFilled && noErrors && !this.errors.newPassword;
                    }
                    return fieldsFilled && noErrors;
                },
                saveButtonText() {
                    return this.isLoading ? 'Desant...' : 'Desar canvis';
                }
            },
            methods: {
                async loadUserData() {
                    try {
                        // Simulate API call to load user data
                        const mockUserData = {
                            username: localStorage.getItem('username') || '',
                            email: localStorage.getItem('email') || '',
                            language: localStorage.getItem('language') || 'ca'
                        };
                        
                        this.username = mockUserData.username;
                        this.email = mockUserData.email;
                        this.language = mockUserData.language;
                    } catch (error) {
                        console.error('Error loading user data:', error);
                        this.errors.general = 'Error carregant les dades del usuari';
                    }
                },
                togglePassword() {
                    this.showPassword = !this.showPassword;
                },
                validateField(field) {
                    this.errors.general = null;
                    this.errors[field] = null;
                    const value = this[field];

                    if (field === 'newPassword' && !value) {
                        // Skip validation if password field is empty (not being changed)
                        return true;
                    }

                    const validations = {
                        username: {
                            required: "Nom d'usuari és requerit.",
                            pattern: {
                                test: this.nameRegex,
                                message: "Nom d'usuari ha de tenir entre 3 i 50 caràcters alfanumèrics."
                            }
                        },
                        email: {
                            required: 'Email és requerit.',
                            pattern: {
                                test: this.emailRegex,
                                message: 'Si us plau, introdueix una adreça de correu electrònica vàlida.'
                            },
                            maxLength: {
                                value: 254,
                                message: 'Email no pot excedir 254 caràcters.'
                            }
                        },
                        newPassword: {
                            pattern: {
                                test: this.passwordRegex,
                                message: 'La contrasenya ha d\'incloure majúscules, minúscules, números i caràcters especials.'
                            },
                            minLength: {
                                value: 8,
                                message: 'La contrasenya ha de tenir almenys 8 caràcters.'
                            }
                        }
                    };

                    const fieldValidation = validations[field];
                    
                    if (fieldValidation.required && !value) {
                        this.errors[field] = fieldValidation.required;
                        return false;
                    }

                    if (fieldValidation.maxLength && value.length > fieldValidation.maxLength.value) {
                        this.errors[field] = fieldValidation.maxLength.message;
                        return false;
                    }

                    if (fieldValidation.minLength && value.length < fieldValidation.minLength.value) {
                        this.errors[field] = fieldValidation.minLength.message;
                        return false;
                    }

                    if (fieldValidation.pattern && !fieldValidation.pattern.test.test(value)) {
                        this.errors[field] = fieldValidation.pattern.message;
                        return false;
                    }

                    return true;
                },
                validateConfigForm() {
                    const usernameValid = this.validateField('username');
                    const emailValid = this.validateField('email');
                    const passwordValid = !this.newPassword || this.validateField('newPassword');
                    return usernameValid && emailValid && passwordValid;
                },
                async submitConfig() {
                    this.errors.general = null;
                    
                    if (this.validateConfigForm()) {
                        this.isLoading = true;
                        try {
                            // Simulate API call
                            await new Promise(resolve => setTimeout(resolve, 1000));
                            
                            // Save to localStorage for demo
                            localStorage.setItem('username', this.username);
                            localStorage.setItem('email', this.email);
                            localStorage.setItem('language', this.language);
                            
                            if (this.newPassword) {
                                // Handle password update in real implementation
                                console.log('Password would be updated in real implementation');
                            }
                            
                            this.isSaved = true;
                            this.newPassword = ''; // Clear password field after save
                            
                            // Show success message briefly
                            setTimeout(() => {
                                this.isSaved = false;
                            }, 1500);
                            
                        } catch (error) {
                            console.error('Error saving config:', error);
                            this.errors.general = 'Error desant els canvis. Si us plau, torna-ho a provar.';
                        } finally {
                            this.isLoading = false;
                        }
                    } else {
                        this.errors.general = 'Si us plau, corregeix els errors del formulari.';
                    }
                },
                clearErrors() {
                    this.errors = {
                        username: null,
                        email: null,
                        newPassword: null,
                        general: null
                    };
                }
            }
        });

        // Initialize contact button functionality
        const contactButton = document.getElementById('contactButton');
        if (contactButton) {
            contactButton.addEventListener('click', () => {
                window.location.href = 'mailto:support@clam.com';
            });
        }
    } catch (err) {
        console.error('Error initializing Vue for config:', err);
    }
});
