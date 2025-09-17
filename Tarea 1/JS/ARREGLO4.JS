let viajes = [];
        
        function agregarViaje() {
            const tipo = document.getElementById('tipo').value;
            const distancia = parseFloat(document.getElementById('distancia').value);
            const personas = parseInt(document.getElementById('personas').value);
            
            // Validaciones
            if (!tipo) {
                alert('Selecciona el tipo de autobús');
                return;
            }
            if (!distancia || distancia <= 0) {
                alert('Ingresa una distancia válida');
                return;
            }
            if (!personas || personas <= 0) {
                alert('Ingresa un número válido de personas');
                return;
            }
            
            // Crear objeto viaje y agregarlo al arreglo
            const viaje = {
                id: viajes.length + 1,
                tipo: tipo,
                distancia: distancia,
                personas: personas
            };
            
            viajes.push(viaje); // Agregar al arreglo
            
            // Actualizar visualización del arreglo
            actualizarArregloDisplay();
            
            // Limpiar campos
            document.getElementById('tipo').value = '';
            document.getElementById('distancia').value = '';
            document.getElementById('personas').value = '';
            
            // Enfocar en tipo para siguiente viaje
            document.getElementById('tipo').focus();
            
            alert(`Viaje ${viaje.id} agregado al arreglo!`);
        }
        
        function actualizarArregloDisplay() {
            let html = '<strong> ARREGLO DE VIAJES:</strong><br>';
            html += 'viajes = [<br>';
            
            if (viajes.length === 0) {
                html += '  <em>(Vacío)</em><br>';
            } else {
                for (let i = 0; i < viajes.length; i++) {
                    const viaje = viajes[i];
                    html += `  {id: ${viaje.id}, tipo: "${viaje.tipo}", distancia: ${viaje.distancia}, personas: ${viaje.personas}}`;
                    if (i < viajes.length - 1) html += ',';
                    html += '<br>';
                }
            }
            
            html += ']<br>';
            html += `<strong>Total elementos:</strong> ${viajes.length}`;
            
            document.getElementById('arregloViajes').innerHTML = html;
        }
        
        function calcularTodos() {
            if (viajes.length === 0) {
                alert('El arreglo está vacío. Agrega algunos viajes primero.');
                return;
            }
            
            let html = '<h3>🚌 Resultados de Todos los Viajes:</h3>';
            let costoTotal = 0;
            let totalPersonas = 0;
            let contadorTipos = {A: 0, B: 0, C: 0};
            
            // Procesar cada viaje del arreglo usando for
            for (let i = 0; i < viajes.length; i++) {
                const viaje = viajes[i];
                
                // Definir tarifa según tipo
                let tarifa;
                if (viaje.tipo === 'A') tarifa = 2.0;
                else if (viaje.tipo === 'B') tarifa = 2.5;
                else if (viaje.tipo === 'C') tarifa = 3.0;
                
                // Aplicar mínimo de 20 personas para el cálculo
                const personasCobro = viaje.personas < 20 ? 20 : viaje.personas;
                
                // Calcular costos
                const costoViaje = viaje.distancia * personasCobro * tarifa;
                const costoPorPersona = costoViaje / viaje.personas;
                
                costoTotal += costoViaje;
                totalPersonas += viaje.personas;
                contadorTipos[viaje.tipo]++;
                
                // Mostrar resultado del viaje
                html += `
                    <div class="viaje tipo-${viaje.tipo}">
                        <strong>Viaje ${viaje.id}:</strong>
                        <span class="badge badge-${viaje.tipo}">Tipo ${viaje.tipo}</span>
                        <br><br>
                        <strong>Datos:</strong> ${viaje.distancia}km, ${viaje.personas} personas<br>
                        <strong>Tarifa:</strong> $${tarifa.toFixed(2)} por km por persona<br>
                        <strong>Costo total:</strong> $${costoViaje.toFixed(2)}<br>
                        <strong>Por persona:</strong> $${costoPorPersona.toFixed(2)}
                        ${viaje.personas < 20 ? '<div class="warning"> Se cobró mínimo 20 personas</div>' : ''}
                    </div>
                `;
            }
            
            // Calcular promedios
            const promedioPersonas = totalPersonas / viajes.length;
            const promedioCosto = costoTotal / viajes.length;
            
            // Agregar totales y estadísticas
            html += `
                <div class="total-section">
                     RESUMEN TOTAL
                    <div class="stats">
                        <div class="stat-card">
                            <div class="stat-number">${viajes.length}</div>
                            <div>Total Viajes</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">$${costoTotal.toFixed(2)}</div>
                            <div>Costo Total</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${totalPersonas}</div>
                            <div>Total Personas</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">$${promedioCosto.toFixed(2)}</div>
                            <div>Promedio por Viaje</div>
                        </div>
                    </div>
                </div>
            `;
            
            // Agregar desglose por tipo
            html += `
                <div style="margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                    <strong> Desglose por Tipo de Autobús:</strong><br>
                    • Tipo A: ${contadorTipos.A} viaje(s)<br>
                    • Tipo B: ${contadorTipos.B} viaje(s)<br>
                    • Tipo C: ${contadorTipos.C} viaje(s)<br><br>
                    <strong> Arreglo procesado:</strong> ${viajes.length} elementos
                </div>
            `;
            
            // Mostrar resultado
            document.getElementById('resultado').innerHTML = 
                '<div class="resultado">' + html + '</div>';
        }
        
        function limpiarTodo() {
            viajes = []; // Vaciar el arreglo
            document.getElementById('tipo').value = '';
            document.getElementById('distancia').value = '';
            document.getElementById('personas').value = '';
            document.getElementById('resultado').innerHTML = '';
            actualizarArregloDisplay();
            alert('Arreglo limpiado');
        }
        
        // Permitir agregar con Enter
        document.getElementById('personas').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                agregarViaje();
            }
        });
        
        // Cargar automáticamente al abrir la página
        window.onload = function() {
            console.log('Arreglo de viajes inicializado:', viajes);
            actualizarArregloDisplay();
        };