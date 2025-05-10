document.addEventListener('DOMContentLoaded', () => {
    // Configurações de validação
    const validationConfig = {
        nome: {
            pattern: /^[A-ZÀ-Ÿ][a-zà-ÿ]+ [A-ZÀ-Ÿ][a-zà-ÿ]+$/,
            message: {
                valid: "Nome válido!",
                invalid: "Formato inválido. Exemplo: Maria Silva"
            },
            examples: "Válidos: João Silva, Ana Paula | Inválidos: joão, Maria123"
        },
        email: {
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.br$/,
            message: {
                valid: "E-mail válido!",
                invalid: "Formato inválido. Deve terminar com .br"
            },
            examples: "Válidos: usuario@exemplo.br | Inválidos: usuario@exemplo.com"
        },
        // Configurações para outros campos...
    };

    // Inicialização dos eventos
    initValidation();
    
    function initValidation() {
        const form = document.getElementById('validation-form');
        
        // Adiciona eventos para todos os campos com data-pattern
        document.querySelectorAll('[data-pattern]').forEach(input => {
            const fieldName = input.getAttribute('data-pattern');
            const examplesDiv = input.nextElementSibling;
            const feedbackDiv = examplesDiv.nextElementSibling;
            
            // Preenche exemplos
            examplesDiv.textContent = validationConfig[fieldName].examples;
            
            // Evento de input
            input.addEventListener('input', () => {
                validateField(input, fieldName, feedbackDiv);
            });
        });
        
        // Evento de submit
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Formulário validado com sucesso!');
        });
    }
    
    function validateField(input, fieldName, feedbackDiv) {
        const value = input.value.trim();
        const config = validationConfig[fieldName];
        
        if (value === '') {
            resetField(input, feedbackDiv);
            return;
        }
        
        const isValid = config.pattern.test(value);
        
        input.classList.toggle('valid', isValid);
        input.classList.toggle('invalid', !isValid);
        
        feedbackDiv.textContent = isValid ? config.message.valid : config.message.invalid;
        feedbackDiv.className = isValid ? 'feedback valid-feedback' : 'feedback invalid-feedback';
    }
    
    function resetField(input, feedbackDiv) {
        input.classList.remove('valid', 'invalid');
        feedbackDiv.textContent = '';
        feedbackDiv.className = 'feedback';
    }
});
