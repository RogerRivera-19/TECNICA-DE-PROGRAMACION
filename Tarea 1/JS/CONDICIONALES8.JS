function calcular() {
            const peso = parseFloat(document.getElementById('peso').value);
            const zona = document.getElementById('zona').value;
            const resultado = document.getElementById('resultado');
            
            if (!peso || !zona) {
                resultado.innerHTML = 'Ingresa el peso y selecciona el destino';
                resultado.className = 'resultado error';
                return;
            }
            
            // Verificar restricción de peso
            if (peso > 5) {
                resultado.innerHTML = ' Error: El peso no puede ser mayor a 5 kg';
                resultado.className = 'resultado error';
                return;
            }
            
            if (peso <= 0) {
                resultado.innerHTML = ' Error: El peso debe ser mayor a 0';
                resultado.className = 'resultado error';
                return;
            }
            
            // Tarifas por zona (por kg)
            let tarifaPorKg;
            let nombreZona;
            
            if (zona === 'nacional') {
                tarifaPorKg = 30;
                nombreZona = 'Nacional';
            } else if (zona === 'america') {
                tarifaPorKg = 50;
                nombreZona = 'América';
            } else if (zona === 'europa') {
                tarifaPorKg = 60;
                nombreZona = 'Europa';
            } else if (zona === 'asia') {
                tarifaPorKg = 70;
                nombreZona = 'Asia';
            } else if (zona === 'oceania') {
                tarifaPorKg = 80;
                nombreZona = 'Oceanía';
            }
            
            // Calcular costo total
            const costoTotal = peso * tarifaPorKg;
            
            // Mostrar resultado
            resultado.innerHTML = `
                 Peso: ${peso} kg<br>
                 Destino: ${nombreZona}<br>
                 Costo envío: $${costoTotal.toFixed(0)}
            `;
            resultado.className = 'resultado exito';
        }
        
        // Permitir calcular con Enter
        document.getElementById('peso').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                calcular();
            }
        });