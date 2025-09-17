let paquetes = [];
        
        // Configuración de zonas
        const configuracionZonas = {
            1: { nombre: 'Nacional', tarifa: 30 },
            2: { nombre: 'América', tarifa: 50 },
            3: { nombre: 'Europa', tarifa: 60 },
            4: { nombre: 'Asia', tarifa: 70 },
            5: { nombre: 'Oceanía', tarifa: 80 }
        };
        
        function procesarPaquetes() {
            const input = document.getElementById('paquetes').value.trim();
            
            if (!input) {
                alert('Por favor ingresa los paquetes');
                return;
            }
            
            // Limpiar arreglo
            paquetes = [];
            
            // Convertir el texto a arreglo de tuplas
            const tuplas = input.split(';');
            
            for (let i = 0; i < tuplas.length; i++) {
                const tupla = tuplas[i].trim();
                if (!tupla) continue;
                
                const partes = tupla.split(',');
                if (partes.length !== 2) {
                    alert(`Error en la tupla ${i + 1}: "${tupla}" debe tener formato peso,zona`);
                    return;
                }
                
                const peso = parseFloat(partes[0].trim());
                const zona = parseInt(partes[1].trim());
                
                // Validar peso
                if (isNaN(peso) || peso <= 0) {
                    alert(`Error en la tupla ${i + 1}: el peso "${peso}" debe ser un número mayor a 0`);
                    return;
                }
                
                // Validar zona
                if (isNaN(zona) || zona < 1 || zona > 5) {
                    alert(`Error en la tupla ${i + 1}: la zona "${zona}" debe ser un número del 1 al 5`);
                    return;
                }
                
                // Agregar tupla al arreglo
                paquetes.push([peso, zona]);
            }
            
            if (paquetes.length === 0) {
                alert('No se encontraron paquetes válidos');
                return;
            }
            
            // Actualizar visualización del arreglo
            actualizarArregloDisplay();
            
            // Procesar cada tupla del arreglo
            let html = '<h3>📦 Procesamiento de Paquetes:</h3>';
            let estadisticas = {
                paquetesValidos: 0,
                paquetesRechazados: 0,
                pesoTotal: 0,
                costoTotal: 0,
                paquetesPorZona: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
                erroresPeso: 0
            };
            
            // Procesar cada elemento del arreglo usando for
            for (let i = 0; i < paquetes.length; i++) {
                const [peso, zona] = paquetes[i]; // Desestructurar tupla
                
                // Verificar restricción de peso ≤ 5 kg
                if (peso > 5) {
                    // Paquete rechazado
                    estadisticas.paquetesRechazados++;
                    estadisticas.erroresPeso++;
                    
                    html += `
                        <div class="paquete paquete-rechazado">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <strong>📦 Paquete ${i + 1}</strong>
                                <span class="badge badge-error">RECHAZADO</span>
                            </div>
                            <br>
                            <div class="error-message">
                                RECHAZADO: Peso ${peso} kg excede el límite de 5 kg
                            </div>
                        </div>
                    `;
                    continue;
                }
                
                // Paquete válido - calcular costo
                const config = configuracionZonas[zona];
                const costo = peso * config.tarifa;
                
                // Actualizar estadísticas
                estadisticas.paquetesValidos++;
                estadisticas.pesoTotal += peso;
                estadisticas.costoTotal += costo;
                estadisticas.paquetesPorZona[zona]++;
                
                // Mostrar resultado del paquete
                html += `
                    <div class="paquete paquete-valido zona-${zona}">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <strong>📦 Paquete ${i + 1}</strong>
                            <span class="badge badge-${zona}">${config.nombre}</span>
                        </div>
                        <br>
                        <div class="envio-info">
                            <div class="info-card">
                                <div class="info-label">Peso</div>
                                <div class="info-value peso-value">${peso} kg</div>
                            </div>
                            <div class="info-card">
                                <div class="info-label">Destino</div>
                                <div class="info-value">${config.nombre}</div>
                            </div>
                            <div class="info-card">
                                <div class="info-label">Tarifa/kg</div>
                                <div class="info-value">$${config.tarifa}</div>
                            </div>
                            <div class="info-card">
                                <div class="info-label">Costo Total</div>
                                <div class="info-value costo-value">$${costo.toFixed(0)}</div>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            // Calcular estadísticas generales
            const totalPaquetes = paquetes.length;
            const pesoPromedio = estadisticas.paquetesValidos > 0 ? 
                estadisticas.pesoTotal / estadisticas.paquetesValidos : 0;
            const costoPromedio = estadisticas.paquetesValidos > 0 ? 
                estadisticas.costoTotal / estadisticas.paquetesValidos : 0;
            const porcentajeExito = (estadisticas.paquetesValidos / totalPaquetes) * 100;
            
            // Agregar totales y estadísticas
            html += `
                <div class="total-section">
                    📦 RESUMEN DE PAQUETERÍA
                    <div class="stats">
                        <div class="stat-card">
                            <div class="stat-number">${totalPaquetes}</div>
                            <div>Paquetes Procesados</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${estadisticas.paquetesValidos}</div>
                            <div>Envíos Exitosos</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${estadisticas.paquetesRechazados}</div>
                            <div>Paquetes Rechazados</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${porcentajeExito.toFixed(1)}%</div>
                            <div>Tasa de Éxito</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${estadisticas.pesoTotal.toFixed(1)} kg</div>
                            <div>Peso Total Enviado</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">$${estadisticas.costoTotal.toFixed(0)}</div>
                            <div>Ingresos Totales</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${pesoPromedio.toFixed(1)} kg</div>
                            <div>Peso Promedio</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">$${costoPromedio.toFixed(0)}</div>
                            <div>Costo Promedio</div>
                        </div>
                    </div>
                </div>
            `;
            
            // Agregar análisis por zonas
            html += `
                <div style="margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                    <strong>Distribución por Zona de Destino:</strong><br><br>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 15px;">
            `;
            
            for (let zona = 1; zona <= 5; zona++) {
                const cantidad = estadisticas.paquetesPorZona[zona];
                if (cantidad > 0) {
                    const porcentaje = (cantidad / estadisticas.paquetesValidos * 100);
                    const config = configuracionZonas[zona];
                    html += `
                        <div class="stat-card">
                            <div class="stat-number">${cantidad}</div>
                            <div>${config.nombre}</div>
                            <div style="font-size: 12px; color: #666;">${porcentaje.toFixed(1)}% del total</div>
                        </div>
                    `;
                }
            }
            
            html += `
                    </div>
                    <br>
                    <strong>Análisis del Arreglo:</strong><br>
                    • Total tuplas procesadas: ${paquetes.length}<br>
                    • Tuplas válidas (≤ 5kg): ${estadisticas.paquetesValidos}<br>
                    • Tuplas rechazadas (> 5kg): ${estadisticas.paquetesRechazados}<br>
                    • Formato: [[peso, zona], [peso, zona], ...]
            `;
            
            if (estadisticas.erroresPeso > 0) {
                html += `
                    <div style="background: rgba(231, 76, 60, 0.1); padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #e74c3c;">
                        <strong style="color: #e74c3c;">Restricción de Peso:</strong><br>
                        ${estadisticas.erroresPeso} paquete(s) rechazado(s) por exceder 5 kg
                    </div>
                `;
            }
            
            html += `</div>`;
            
            // Mostrar resultado
            document.getElementById('resultado').innerHTML = 
                '<div class="resultado">' + html + '</div>';
        }
        
        function actualizarArregloDisplay() {
            let html = '<strong>ARREGLO DE PAQUETES (TUPLAS):</strong><br>';
            html += 'paquetes = [<br>';
            
            if (paquetes.length === 0) {
                html += '  <em>(Vacío)</em><br>';
            } else {
                for (let i = 0; i < paquetes.length; i++) {
                    const [peso, zona] = paquetes[i];
                    html += `  [${peso}, ${zona}]`; // Tupla
                    if (i < paquetes.length - 1) html += ',';
                    html += '<br>';
                }
            }
            
            html += ']<br>';
            html += `<strong>Total tuplas:</strong> ${paquetes.length}`;
            
            document.getElementById('arregloPaquetes').innerHTML = html;
        }
        
        function limpiarTodo() {
            paquetes = []; // Vaciar el arreglo
            document.getElementById('paquetes').value = '';
            document.getElementById('resultado').innerHTML = '';
            actualizarArregloDisplay();
        }
        
        // Permitir procesar con Enter
        document.getElementById('paquetes').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                procesarPaquetes();
            }
        });
        
        // Cargar automáticamente al abrir la página
        window.onload = function() {
            console.log('Arreglo de paquetes inicializado:', paquetes);
            actualizarArregloDisplay();
        };