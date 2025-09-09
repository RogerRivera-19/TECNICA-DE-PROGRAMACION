function calcular() {
            const numeroCita = parseInt(document.getElementById('numeroCita').value);
            
            if (!numeroCita || numeroCita < 1) {
                document.getElementById('resultado').innerHTML = 'Ingresa un número de cita válido';
                return;
            }
            
            // Determinar el costo de la cita actual
            let costoActual;
            if (numeroCita >= 1 && numeroCita <= 3) {
                costoActual = 200;
            } else if (numeroCita >= 4 && numeroCita <= 5) {
                costoActual = 150;
            } else if (numeroCita >= 6 && numeroCita <= 8) {
                costoActual = 100;
            } else { // 9 en adelante
                costoActual = 50;
            }
            
            // Calcular el acumulado hasta esta cita
            let acumulado = 0;
            
            for (let i = 1; i <= numeroCita; i++) {
                if (i >= 1 && i <= 3) {
                    acumulado += 200;
                } else if (i >= 4 && i <= 5) {
                    acumulado += 150;
                } else if (i >= 6 && i <= 8) {
                    acumulado += 100;
                } else {
                    acumulado += 50;
                }
            }
            
            // Mostrar resultado
            document.getElementById('resultado').innerHTML = `
                <div class="resultado">
                    <div>Cita número: <strong>${numeroCita}</strong></div>
                    <div class="costo-actual">Costo de esta cita: $${costoActual}</div>
                    <div class="acumulado">Total acumulado: $${acumulado}</div>
                </div>
            `;
        }
        
        // Permitir calcular con Enter
        document.getElementById('numeroCita').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                calcular();
            }
        });