let articulos = [];
        
        // Configuración de porcentajes por clave
        const configuracionClaves = {
            1: { manoObra: 80, gastos: 40, utilidad: 50 },
            2: { manoObra: 70, gastos: 30, utilidad: 40 },
            3: { manoObra: 75, gastos: 35, utilidad: 45 },
            4: { manoObra: 85, gastos: 45, utilidad: 55 },
            5: { manoObra: 65, gastos: 25, utilidad: 35 },
            6: { manoObra: 90, gastos: 50, utilidad: 60 }
        };
        
        function procesarArticulos() {
            const input = document.getElementById('articulos').value.trim();
            
            if (!input) {
                alert('Por favor ingresa los artículos');
                return;
            }
            
            // Limpiar arreglo
            articulos = [];
            
            // Convertir el texto a arreglo de tuplas
            const tuplas = input.split(';');
            
            for (let i = 0; i < tuplas.length; i++) {
                const tupla = tuplas[i].trim();
                if (!tupla) continue;
                
                const partes = tupla.split(',');
                if (partes.length !== 2) {
                    alert(`Error en la tupla ${i + 1}: "${tupla}" debe tener formato clave,materia_prima`);
                    return;
                }
                
                const clave = parseInt(partes[0].trim());
                const materiaPrima = parseFloat(partes[1].trim());
                
                // Validar clave
                if (isNaN(clave) || clave < 1 || clave > 6) {
                    alert(`Error en la tupla ${i + 1}: la clave "${clave}" debe ser un número del 1 al 6`);
                    return;
                }
                
                // Validar materia prima
                if (isNaN(materiaPrima) || materiaPrima <= 0) {
                    alert(`Error en la tupla ${i + 1}: la materia prima "${materiaPrima}" debe ser un número mayor a 0`);
                    return;
                }
                
                // Agregar tupla al arreglo
                articulos.push([clave, materiaPrima]);
            }
            
            if (articulos.length === 0) {
                alert('No se encontraron artículos válidos');
                return;
            }
            
            // Actualizar visualización del arreglo
            actualizarArregloDisplay();
            
            // Procesar cada tupla del arreglo
            let html = '<h3> Cálculo de Precios por Artículo:</h3>';
            let estadisticas = {
                totalCostoProduccion: 0,
                totalPrecioVenta: 0,
                totalUtilidad: 0,
                articulosPorClave: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0}
            };
            
            // Procesar cada elemento del arreglo usando for
            for (let i = 0; i < articulos.length; i++) {
                const [clave, materiaPrima] = articulos[i]; // Desestructurar tupla
                
                // Obtener configuración de la clave
                const config = configuracionClaves[clave];
                
                // Calcular costos
                const manoObra = materiaPrima * (config.manoObra / 100);
                const gastosFabricacion = materiaPrima * (config.gastos / 100);
                const costoProduccion = materiaPrima + manoObra + gastosFabricacion;
                const utilidad = costoProduccion * (config.utilidad / 100);
                const precioVenta = costoProduccion + utilidad;
                
                // Actualizar estadísticas
                estadisticas.totalCostoProduccion += costoProduccion;
                estadisticas.totalPrecioVenta += precioVenta;
                estadisticas.totalUtilidad += utilidad;
                estadisticas.articulosPorClave[clave]++;
                
                // Mostrar resultado del artículo
                html += `
                    <div class="articulo clave-${clave}">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <strong> Artículo ${i + 1}</strong>
                            <span class="badge badge-${clave}">Clave ${clave}</span>
                        </div>
                        <br>
                        <div class="desglose">
                            <div> Materia Prima: $${materiaPrima.toFixed(2)}</div>
                            <div> Mano de Obra (${config.manoObra}%): $${manoObra.toFixed(2)}</div>
                            <div> Gastos Fab. (${config.gastos}%): $${gastosFabricacion.toFixed(2)}</div>
                            <div> Utilidad (${config.utilidad}%): $${utilidad.toFixed(2)}</div>
                        </div>
                        <div style="border-top: 1px solid #eee; padding-top: 10px; margin-top: 10px;">
                            <div class="costo-produccion"> Costo de Producción: $${costoProduccion.toFixed(2)}</div>
                            <div class="precio-venta"> Precio de Venta: $${precioVenta.toFixed(2)}</div>
                        </div>
                    </div>
                `;
            }
            
            // Calcular estadísticas generales
            const totalArticulos = articulos.length;
            const promedioProduccion = estadisticas.totalCostoProduccion / totalArticulos;
            const promedioVenta = estadisticas.totalPrecioVenta / totalArticulos;
            const promedioUtilidad = estadisticas.totalUtilidad / totalArticulos;
            const margenUtilidad = (estadisticas.totalUtilidad / estadisticas.totalCostoProduccion) * 100;
            
            // Agregar totales y estadísticas
            html += `
                <div class="total-section">
                     RESUMEN DE PRODUCCIÓN
                    <div class="stats">
                        <div class="stat-card">
                            <div class="stat-number">${totalArticulos}</div>
                            <div>Artículos</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">$${estadisticas.totalCostoProduccion.toFixed(2)}</div>
                            <div>Costo Total</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">$${estadisticas.totalPrecioVenta.toFixed(2)}</div>
                            <div>Venta Total</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">$${estadisticas.totalUtilidad.toFixed(2)}</div>
                            <div>Utilidad Total</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${margenUtilidad.toFixed(1)}%</div>
                            <div>Margen Utilidad</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">$${promedioVenta.toFixed(2)}</div>
                            <div>Promedio Venta</div>
                        </div>
                    </div>
                </div>
            `;
            
            // Agregar análisis por claves
            html += `
                <div style="margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                    <strong> Distribución por Claves:</strong><br><br>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px;">
            `;
            
            for (let clave = 1; clave <= 6; clave++) {
                if (estadisticas.articulosPorClave[clave] > 0) {
                    html += `
                        <div class="stat-card">
                            <div class="stat-number">${estadisticas.articulosPorClave[clave]}</div>
                            <div>Clave ${clave}</div>
                        </div>
                    `;
                }
            }
            
            html += `
                    </div>
                    <br>
                    <strong> Arreglo procesado:</strong> ${articulos.length} tuplas<br>
                    <strong> Formato:</strong> [[clave, materia_prima], [clave, materia_prima], ...]
                </div>
            `;
            
            // Mostrar resultado
            document.getElementById('resultado').innerHTML = 
                '<div class="resultado">' + html + '</div>';
        }
        
        function actualizarArregloDisplay() {
            let html = '<strong> ARREGLO DE ARTÍCULOS (TUPLAS):</strong><br>';
            html += 'articulos = [<br>';
            
            if (articulos.length === 0) {
                html += '  <em>(Vacío)</em><br>';
            } else {
                for (let i = 0; i < articulos.length; i++) {
                    const [clave, materiaPrima] = articulos[i];
                    html += `  [${clave}, ${materiaPrima}]`; // Tupla
                    if (i < articulos.length - 1) html += ',';
                    html += '<br>';
                }
            }
            
            html += ']<br>';
            html += `<strong>Total tuplas:</strong> ${articulos.length}`;
            
            document.getElementById('arregloArticulos').innerHTML = html;
        }
        
        function limpiarTodo() {
            articulos = []; // Vaciar el arreglo
            document.getElementById('articulos').value = '';
            document.getElementById('resultado').innerHTML = '';
            actualizarArregloDisplay();
        }
        
        // Permitir procesar con Enter
        document.getElementById('articulos').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                procesarArticulos();
            }
        });
        
        // Cargar automáticamente al abrir la página
        window.onload = function() {
            console.log('Arreglo de artículos inicializado:', articulos);
            actualizarArregloDisplay();
        };