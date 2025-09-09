function verificarNumero() {
            // Obtener el valor del input
            const numero = document.getElementById('numero').value;
            const resultado = document.getElementById('resultado');
            
            // Verificar si se ingresó un número
            if (numero === '') {
                resultado.textContent = 'Por favor, ingresa un número';
                resultado.className = 'resultado';
                return;
            }
            
            // Convertir a número
            const num = parseFloat(numero);
            
            // Verificar si es positivo, negativo o cero
            if (num > 0) {
                resultado.textContent = `El número ${num} es POSITIVO`;
                resultado.className = 'resultado positivo';
            } else if (num < 0) {
                resultado.textContent = `El número ${num} es NEGATIVO`;
                resultado.className = 'resultado negativo';
            } else {
                resultado.textContent = `El número es CERO (ni positivo ni negativo)`;
                resultado.className = 'resultado cero';
            }
        }
        
        // Permitir verificar presionando Enter
        document.getElementById('numero').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                verificarNumero();
            }
        });
