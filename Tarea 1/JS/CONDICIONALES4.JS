function calcular() {
            const tipo = document.getElementById('tipo').value;
            const distancia = parseFloat(document.getElementById('distancia').value);
            const personas = parseInt(document.getElementById('personas').value);
            
            if (!tipo || !distancia || !personas) {
                document.getElementById('resultado').innerHTML = 'Completa todos los campos';
                return;
            }
            
            // Tarifas por tipo
            let tarifa;
            if (tipo === 'A') tarifa = 2.0;
            else if (tipo === 'B') tarifa = 2.5;
            else if (tipo === 'C') tarifa = 3.0;
            
            // Mínimo 20 personas para cobro
            const personasCobro = personas < 20 ? 20 : personas;
            
            // Calcular costos
            const costoTotal = distancia * personasCobro * tarifa;
            const costoPorPersona = costoTotal / personas;
            
            // Mostrar resultado
            document.getElementById('resultado').innerHTML = `
                <div class="resultado">
                    Costo total: $${costoTotal.toFixed(2)}<br>
                    Costo por persona: $${costoPorPersona.toFixed(2)}
                </div>
            `;
        }