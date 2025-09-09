function calcular() {
            const tipo = document.getElementById('tipo').value;
            const limiteActual = parseFloat(document.getElementById('limiteActual').value);
            
            if (!tipo || !limiteActual || limiteActual <= 0) {
                document.getElementById('resultado').innerHTML = 'Selecciona el tipo de tarjeta e ingresa el límite actual';
                return;
            }
            
            // Determinar el porcentaje de aumento según el tipo
            let porcentaje;
            let nombreTipo;
            
            if (tipo === '1') {
                porcentaje = 25;
                nombreTipo = 'Tipo 1';
            } else if (tipo === '2') {
                porcentaje = 35;
                nombreTipo = 'Tipo 2';
            } else if (tipo === '3') {
                porcentaje = 40;
                nombreTipo = 'Tipo 3';
            } else {
                porcentaje = 50;
                nombreTipo = 'Otro tipo';
            }
            
            // Calcular el aumento y nuevo límite
            const aumento = limiteActual * (porcentaje / 100);
            const nuevoLimite = limiteActual + aumento;
            
            // Mostrar resultado
            document.getElementById('resultado').innerHTML = `
                <div class="resultado">
                    <div>Tarjeta: <strong>${nombreTipo}</strong></div>
                    <div class="limite-actual">Límite actual: $${limiteActual.toFixed(2)}</div>
                    <div class="aumento">Aumento (${porcentaje}%): +$${aumento.toFixed(2)}</div>
                    <div class="limite-nuevo">Nuevo límite: $${nuevoLimite.toFixed(2)}</div>
                </div>
            `;
        }
        
        // Permitir calcular con Enter
        document.getElementById('limiteActual').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                calcular();
            }
        });