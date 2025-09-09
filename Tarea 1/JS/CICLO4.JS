  let totalViajes = 0;
        let contador = 0;
        let resultados = '';
        let costoTotal = 0;
        
        function empezar() {
            totalViajes = parseInt(document.getElementById('totalViajes').value);
            if (!totalViajes) return;
            
            contador = 0;
            resultados = '';
            costoTotal = 0;
            
            // Habilitar campos
            document.getElementById('totalViajes').disabled = true;
            document.getElementById('tipo').disabled = false;
            document.getElementById('distancia').disabled = false;
            document.getElementById('personas').disabled = false;
            document.getElementById('btnCalc').disabled = false;
            
            actualizarEstado();
        }
        
        function calcular() {
            const tipo = document.getElementById('tipo').value;
            const distancia = parseFloat(document.getElementById('distancia').value);
            const personas = parseInt(document.getElementById('personas').value);
            
            if (!tipo || !distancia || !personas) {
                alert('Completa todos los datos del viaje');
                return;
            }
            
            contador++; // While: incrementar contador
            
            // Definir tarifa según tipo
            let tarifa;
            if (tipo === 'A') tarifa = 2.0;
            else if (tipo === 'B') tarifa = 2.5;
            else if (tipo === 'C') tarifa = 3.0;
            
            // Aplicar mínimo de 20 personas
            const personasCobro = personas < 20 ? 20 : personas;
            
            // Calcular costo del viaje
            const costoViaje = distancia * personasCobro * tarifa;
            const costoPorPersona = costoViaje / personas;
            costoTotal += costoViaje;
            
            // Mostrar resultado del viaje
            resultados += `
                <div class="viaje">
                    <strong>Viaje ${contador}:</strong><br>
                    Tipo ${tipo}, ${distancia}km, ${personas} personas<br>
                    Costo total: $${costoViaje.toFixed(2)}<br>
                    Por persona: $${costoPorPersona.toFixed(2)}
                    ${personas < 20 ? '<br><small>⚠️ Se cobró mínimo 20 personas</small>' : ''}
                </div>
            `;
            
            document.getElementById('resultado').innerHTML = resultados;
            
            // Limpiar campos
            document.getElementById('tipo').value = '';
            document.getElementById('distancia').value = '';
            document.getElementById('personas').value = '';
            
            // Verificar if terminar while
            if (contador >= totalViajes) {
                terminar();
            } else {
                actualizarEstado();
                document.getElementById('tipo').focus();
            }
        }
        
        function actualizarEstado() {
            document.getElementById('estado').innerHTML = 
                `Viaje ${contador + 1} de ${totalViajes}`;
        }
        
        function terminar() {
            // Deshabilitar campos
            document.getElementById('tipo').disabled = true;
            document.getElementById('distancia').disabled = true;
            document.getElementById('personas').disabled = true;
            document.getElementById('btnCalc').disabled = true;
            
            // Mostrar total final
            document.getElementById('resultado').innerHTML += `
                <div style="background-color: #28a745; color: white; padding: 15px; border-radius: 5px; margin-top: 10px; text-align: center;">
                    <strong>💰 COSTO TOTAL DE ${totalViajes} VIAJES: $${costoTotal.toFixed(2)}</strong>
                </div>
                <br>
                <button onclick="reiniciar()" style="background-color: #6c757d;">Nuevos Viajes</button>
            `;
        }
        
        function reiniciar() {
            document.getElementById('totalViajes').disabled = false;
            document.getElementById('totalViajes').value = '';
            document.getElementById('estado').innerHTML = '';
            document.getElementById('resultado').innerHTML = '';
            totalViajes = 0;
            contador = 0;
            resultados = '';
            costoTotal = 0;
        }
        
        // Enter events
        document.getElementById('totalViajes').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') empezar();
        });
        
        document.getElementById('personas').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') calcular();
        });