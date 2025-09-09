function mostrarDia() {
            const numero = parseInt(document.getElementById('numero').value);
            const resultado = document.getElementById('resultado');
            
            if (!numero) {
                resultado.innerHTML = 'Ingresa un número';
                resultado.className = 'resultado error';
                return;
            }
            
            let dia;
            
            if (numero === 1) {
                dia = 'Lunes';
            } else if (numero === 2) {
                dia = 'Martes';
            } else if (numero === 3) {
                dia = 'Miércoles';
            } else if (numero === 4) {
                dia = 'Jueves';
            } else if (numero === 5) {
                dia = 'Viernes';
            } else if (numero === 6) {
                dia = 'Sábado';
            } else if (numero === 7) {
                dia = 'Domingo';
            } else {
                resultado.innerHTML = 'Número inválido. Ingresa del 1 al 7';
                resultado.className = 'resultado error';
                return;
            }
            
            // Mostrar resultado
            resultado.innerHTML = `El día es: ${dia}`;
            resultado.className = 'resultado dia';
        }
        
        // Permitir mostrar con Enter
        document.getElementById('numero').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                mostrarDia();
            }
        });