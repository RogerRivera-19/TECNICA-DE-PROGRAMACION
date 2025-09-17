let clientes = [];
        
        // Configuración de tipos de tarjeta
        const configuracionTipos = {
            1: { aumento: 25, nombre: 'Tipo 1' },
            2: { aumento: 35, nombre: 'Tipo 2' },
            3: { aumento: 40, nombre: 'Tipo 3' },
            4: { aumento: 50, nombre: 'Otro tipo' }
        };
        
        function procesarClientes() {
            const input = document.getElementById('clientes').value.trim();
            
            if (!input) {
                alert('Por favor ingresa los clientes');
                return;
            }
            
            // Limpiar arreglo
            clientes = [];
            
            // Convertir el texto a arreglo de tuplas
            const tuplas = input.split(';');
            
            for (let i = 0; i < tuplas.length; i++) {
                const tupla = tuplas[i].trim();
                if (!tupla) continue;
                
                const partes = tupla.split(',');
                if (partes.length !== 2) {
                    alert(`Error en la tupla ${i + 1}: "${tupla}" debe tener formato tipo,credito_actual`);
                    return;
                }
                
                const tipo = parseInt(partes[0].trim());
                const creditoActual = parseFloat(partes[1].trim());
                
                // Validar tipo
                if (isNaN(tipo) || tipo < 1 || tipo > 4) {
                    alert(`Error en la tupla ${i + 1}: el tipo "${tipo}" debe ser un número del 1 al 4`);
                    return;
                }
                
                // Validar crédito actual
                if (isNaN(creditoActual) || creditoActual <= 0) {
                    alert(`Error en la tupla ${i + 1}: el crédito "${creditoActual}" debe ser un número mayor a 0`);
                    return;
                }
                
                // Agregar tupla al arreglo
                clientes.push([tipo, creditoActual]);
            }
            
            if (clientes.length === 0) {
                alert('No se encontraron clientes válidos');
                return;
            }
            
            // Actualizar visualización del arreglo
            actualizarArregloDisplay();
            
            // Procesar cada tupla del arreglo
            let html = '<h3> Cálculo de Nuevos Límites por Cliente:</h3>';
            let estadisticas = {
                totalLimiteActual: 0,
                totalNuevoLimite: 0,
                totalAumento: 0,
                clientesPorTipo: {1: 0, 2: 0, 3: 0, 4: 0},
                limiteMaximo: 0,
                limiteMinimo: Infinity
            };
            
            // Procesar cada elemento del arreglo usando for
            for (let i = 0; i < clientes.length; i++) {
                const [tipo, creditoActual] = clientes[i]; // Desestructurar tupla
                
                // Obtener configuración del tipo
                const config = configuracionTipos[tipo];
                
                // Calcular nuevo límite
                const aumento = creditoActual * (config.aumento / 100);
                const nuevoLimite = creditoActual + aumento;
                const mejora = ((nuevoLimite / creditoActual - 1) * 100);
                
                // Actualizar estadísticas
                estadisticas.totalLimiteActual += creditoActual;
                estadisticas.totalNuevoLimite += nuevoLimite;
                estadisticas.totalAumento += aumento;
                estadisticas.clientesPorTipo[tipo]++;
                
                if (nuevoLimite > estadisticas.limiteMaximo) {
                    estadisticas.limiteMaximo = nuevoLimite;
                }
                if (nuevoLimite < estadisticas.limiteMinimo) {
                    estadisticas.limiteMinimo = nuevoLimite;
                }
                
                // Mostrar resultado del cliente
                html += `
                    <div class="cliente tipo-${tipo}">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <strong> Cliente ${i + 1}</strong>
                            <span class="badge badge-${tipo}">${config.nombre} (+${config.aumento}%)</span>
                        </div>
                        <br>
                        <div class="credito-info">
                            <div class="info-card">
                                <div class="info-label"> Límite Actual</div>
                                <div class="info-value limite-actual">$${creditoActual.toFixed(2)}</div>
                            </div>
                            <div class="info-card">
                                <div class="info-label"> Aumento</div>
                                <div class="info-value aumento">+$${aumento.toFixed(2)}</div>
                            </div>
                            <div class="info-card">
                                <div class="info-label"> Nuevo Límite</div>
                                <div class="info-value limite-nuevo">$${nuevoLimite.toFixed(2)}</div>
                            </div>
                            <div class="info-card">
                                <div class="info-label"> Mejora</div>
                                <div class="info-value">${mejora.toFixed(1)}%</div>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            // Calcular estadísticas generales
            const totalClientes = clientes.length;
            const promedioActual = estadisticas.totalLimiteActual / totalClientes;
            const promedioNuevo = estadisticas.totalNuevoLimite / totalClientes;
            const incrementoPromedio = ((promedioNuevo / promedioActual - 1) * 100);
            
            
            
            // Agregar análisis por tipos
            html += `
                <div style="margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                    <strong> Distribución por Tipo de Tarjeta:</strong><br><br>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
            `;
            
            for (let tipo = 1; tipo <= 4; tipo++) {
                if (estadisticas.clientesPorTipo[tipo] > 0) {
                    const porcentaje = (estadisticas.clientesPorTipo[tipo] / totalClientes * 100);
                    const config = configuracionTipos[tipo];
                    html += `
                        <div class="stat-card">
                            <div class="stat-number">${estadisticas.clientesPorTipo[tipo]}</div>
                            <div>${config.nombre}</div>
                            <div style="font-size: 12px; color: #666;">${porcentaje.toFixed(1)}% del total</div>
                        </div>
                    `;
                }
            }
            
            html += `
                    </div>
                    <br>
                    <strong> Análisis del Arreglo:</strong><br>
                    • Total tuplas procesadas: ${clientes.length}<br>
                    • Límite más bajo: $${estadisticas.limiteMinimo.toFixed(0)}<br>
                    • Límite más alto: $${estadisticas.limiteMaximo.toFixed(0)}<br>
                    • Formato: [[tipo, credito], [tipo, credito], ...]
                </div>
            `;
            
            // Mostrar resultado
            document.getElementById('resultado').innerHTML = 
                '<div class="resultado">' + html + '</div>';
        }
        
        function actualizarArregloDisplay() {
            let html = '<strong> ARREGLO DE CLIENTES (TUPLAS):</strong><br>';
            html += 'clientes = [<br>';
            
            if (clientes.length === 0) {
                html += '  <em>(Vacío)</em><br>';
            } else {
                for (let i = 0; i < clientes.length; i++) {
                    const [tipo, credito] = clientes[i];
                    html += `  [${tipo}, ${credito}]`; // Tupla
                    if (i < clientes.length - 1) html += ',';
                    html += '<br>';
                }
            }
            
            html += ']<br>';
            html += `<strong>Total tuplas:</strong> ${clientes.length}`;
            
            document.getElementById('arregloClientes').innerHTML = html;
        }
        
        function limpiarTodo() {
            clientes = []; // Vaciar el arreglo
            document.getElementById('clientes').value = '';
            document.getElementById('resultado').innerHTML = '';
            actualizarArregloDisplay();
        }
        
        // Permitir procesar con Enter
        document.getElementById('clientes').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                procesarClientes();
            }
        });
        
        // Cargar automáticamente al abrir la página
        window.onload = function() {
            console.log('Arreglo de clientes inicializado:', clientes);
            actualizarArregloDisplay();
        };