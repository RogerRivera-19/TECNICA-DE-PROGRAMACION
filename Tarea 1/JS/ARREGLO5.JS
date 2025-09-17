let numerosCita = [];
        
        function obtenerCostoCita(numeroCita) {
            // Determinar costo según el número de cita
            if (numeroCita >= 1 && numeroCita <= 3) {
                return 200;
            } else if (numeroCita >= 4 && numeroCita <= 5) {
                return 150;
            } else if (numeroCita >= 6 && numeroCita <= 8) {
                return 100;
            } else { // 9 en adelante
                return 50;
            }
        }
        
        function calcularAcumulado(numeroCita) {
            // Calcular el acumulado hasta esta cita usando un bucle
            let acumulado = 0;
            
            for (let i = 1; i <= numeroCita; i++) {
                acumulado += obtenerCostoCita(i);
            }
            
            return acumulado;
        }
        
        function obtenerClaseCita(numeroCita) {
            if (numeroCita >= 1 && numeroCita <= 3) return 'cita-1-3';
            else if (numeroCita >= 4 && numeroCita <= 5) return 'cita-4-5';
            else if (numeroCita >= 6 && numeroCita <= 8) return 'cita-6-8';
            else return 'cita-9-mas';
        }
        
        function obtenerBadgeCita(costo) {
            if (costo === 200) return 'badge-200';
            else if (costo === 150) return 'badge-150';
            else if (costo === 100) return 'badge-100';
            else return 'badge-50';
        }
        
        function procesarCitas() {
            const input = document.getElementById('citas').value.trim();
            
            if (!input) {
                alert('Por favor ingresa los números de cita');
                return;
            }
            
            // Convertir el texto a un arreglo de números
            numerosCita = input.split(',').map(cita => parseInt(cita.trim()));
            
            // Validar que todos los números sean válidos
            for (let i = 0; i < numerosCita.length; i++) {
                if (isNaN(numerosCita[i]) || numerosCita[i] < 1) {
                    alert(`Error en el paciente ${i + 1}: "${numerosCita[i]}" no es un número de cita válido`);
                    return;
                }
            }
            
            // Actualizar visualización del arreglo
            actualizarArregloDisplay();
            
            // Procesar cada cita del arreglo
            let html = '<h3>🏥 Resultados por Paciente:</h3>';
            let totalGeneral = 0;
            let totalPacientes = numerosCita.length;
            
            // Procesar cada elemento del arreglo usando for
            for (let i = 0; i < numerosCita.length; i++) {
                const numeroCita = numerosCita[i];
                const costoActual = obtenerCostoCita(numeroCita);
                const acumulado = calcularAcumulado(numeroCita);
                const promedioPorCita = Math.round(acumulado / numeroCita);
                
                totalGeneral += acumulado;
                
                const claseCita = obtenerClaseCita(numeroCita);
                const badgeCita = obtenerBadgeCita(costoActual);
                
                // Mostrar resultado del paciente
                html += `
                    <div class="paciente ${claseCita}">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <strong>👤 Paciente ${i + 1}</strong>
                            <span class="badge ${badgeCita}">$${costoActual}</span>
                        </div>
                        <br>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <strong>📅 Número de cita:</strong> ${numeroCita}<br>
                                <span class="costo-actual">💰 Costo actual: $${costoActual}</span>
                            </div>
                            <div>
                                <span class="acumulado">📈 Total acumulado: $${acumulado}</span><br>
                                <strong>📊 Promedio por cita: $${promedioPorCita}</strong>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            // Calcular estadísticas generales
            const promedioGeneral = Math.round(totalGeneral / totalPacientes);
            const citaMasAlta = Math.max(...numerosCita);
            const citaMasBaja = Math.min(...numerosCita);
            const promedioCitas = (numerosCita.reduce((a, b) => a + b, 0) / numerosCita.length).toFixed(1);
            
            // Contar por rangos de citas
            let contadores = {citas1_3: 0, citas4_5: 0, citas6_8: 0, citas9_mas: 0};
            
            for (let i = 0; i < numerosCita.length; i++) {
                const cita = numerosCita[i];
                if (cita >= 1 && cita <= 3) contadores.citas1_3++;
                else if (cita >= 4 && cita <= 5) contadores.citas4_5++;
                else if (cita >= 6 && cita <= 8) contadores.citas6_8++;
                else contadores.citas9_mas++;
            }
            
            // Agregar totales y estadísticas
            html += `
                <div class="total-section">
                    🏥 RESUMEN GENERAL
                    <div class="stats">
                        <div class="stat-card">
                            <div class="stat-number">${totalPacientes}</div>
                            <div>Total Pacientes</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">$${totalGeneral.toLocaleString()}</div>
                            <div>Ingresos Totales</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">$${promedioGeneral}</div>
                            <div>Promedio por Paciente</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${promedioCitas}</div>
                            <div>Promedio # Citas</div>
                        </div>
                    </div>
                </div>
            `;
            
            // Agregar desglose detallado
            html += `
                <div style="margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                    <strong>📊 Análisis Detallado:</strong><br><br>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <strong>📈 Distribución por Rangos:</strong><br>
                            • Citas 1-3 ($200): ${contadores.citas1_3} pacientes<br>
                            • Citas 4-5 ($150): ${contadores.citas4_5} pacientes<br>
                            • Citas 6-8 ($100): ${contadores.citas6_8} pacientes<br>
                            • Citas 9+ ($50): ${contadores.citas9_mas} pacientes
                        </div>
                        <div>
                            <strong>🎯 Estadísticas:</strong><br>
                            • Cita más alta: ${citaMasAlta}<br>
                            • Cita más baja: ${citaMasBaja}<br>
                            • Arreglo procesado: ${numerosCita.length} elementos<br>
                            • Arreglo: [${numerosCita.join(', ')}]
                        </div>
                    </div>
                </div>
            `;
            
            // Mostrar resultado
            document.getElementById('resultado').innerHTML = 
                '<div class="resultado">' + html + '</div>';
        }
        
        function actualizarArregloDisplay() {
            let html = '<strong>🎯 ARREGLO DE CITAS:</strong><br>';
            html += 'numerosCita = [';
            
            if (numerosCita.length === 0) {
                html += '<em>(Vacío)</em>';
            } else {
                html += numerosCita.join(', ');
            }
            
            html += ']<br>';
            html += `<strong>Total elementos:</strong> ${numerosCita.length}`;
            
            document.getElementById('arregloCitas').innerHTML = html;
        }
        
        function limpiarTodo() {
            numerosCita = []; // Vaciar el arreglo
            document.getElementById('citas').value = '';
            document.getElementById('resultado').innerHTML = '';
            actualizarArregloDisplay();
        }
        
        // Permitir procesar con Enter
        document.getElementById('citas').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                procesarCitas();
            }
        });
        
        // Cargar automáticamente al abrir la página
        window.onload = function() {
            console.log('Arreglo de citas inicializado:', numerosCita);
            actualizarArregloDisplay();
        };