let edades = [];
        
        // Configuración de categorías
        const categorias = [
            { nombre: 'Infante', min: 1, max: 3, clase: 'infante' },
            { nombre: 'Niño', min: 4, max: 13, clase: 'nino' },
            { nombre: 'Adolescente', min: 14, max: 17, clase: 'adolescente' },
            { nombre: 'Joven', min: 18, max: 35, clase: 'joven' },
            { nombre: 'Adulto', min: 36, max: 64, clase: 'adulto' },
            { nombre: 'Adulto Mayor', min: 65, max: 120, clase: 'adulto-mayor' }
        ];
        
        function obtenerCategoria(edad) {
            // Buscar la categoría correspondiente usando for
            for (let i = 0; i < categorias.length; i++) {
                const categoria = categorias[i];
                if (edad >= categoria.min && edad <= categoria.max) {
                    return categoria;
                }
            }
            return null; // Edad fuera de rango
        }
        
        function clasificarEdades() {
            const input = document.getElementById('edades').value.trim();
            
            if (!input) {
                alert('Por favor ingresa las edades');
                return;
            }
            
            // Convertir el texto a arreglo de números
            const edadesTexto = input.split(',');
            edades = [];
            
            for (let i = 0; i < edadesTexto.length; i++) {
                const edad = parseInt(edadesTexto[i].trim());
                if (isNaN(edad)) {
                    alert(`Error en posición ${i + 1}: "${edadesTexto[i].trim()}" no es una edad válida`);
                    return;
                }
                edades.push(edad);
            }
            
            if (edades.length === 0) {
                alert('No se encontraron edades válidas');
                return;
            }
            
            // Actualizar visualización del arreglo
            actualizarArregloDisplay();
            
            // Procesar cada edad del arreglo
            let html = '<h3>👥 Clasificación por Persona:</h3>';
            let estadisticas = {
                personasValidas: 0,
                personasInvalidas: 0,
                edadMinima: Infinity,
                edadMaxima: 0,
                sumaEdades: 0,
                categorias: {
                    'infante': 0,
                    'nino': 0,
                    'adolescente': 0,
                    'joven': 0,
                    'adulto': 0,
                    'adulto-mayor': 0
                }
            };
            
            // Procesar cada elemento del arreglo usando for
            for (let i = 0; i < edades.length; i++) {
                const edad = edades[i];
                
                // Validar rango de edad (1-120)
                if (edad < 1 || edad > 120) {
                    // Edad inválida
                    estadisticas.personasInvalidas++;
                    
                    html += `
                        <div class="persona edad-invalida">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <strong> Persona ${i + 1}</strong>
                                <span class="badge badge-error">EDAD INVÁLIDA</span>
                            </div>
                            <br>
                            <div class="error-message">
                                 Edad ${edad} años está fuera del rango válido (1-120 años)
                            </div>
                        </div>
                    `;
                    continue;
                }
                
                // Edad válida - clasificar
                const categoria = obtenerCategoria(edad);
                
                // Actualizar estadísticas
                estadisticas.personasValidas++;
                estadisticas.sumaEdades += edad;
                estadisticas.categorias[categoria.clase]++;
                
                if (edad < estadisticas.edadMinima) {
                    estadisticas.edadMinima = edad;
                }
                if (edad > estadisticas.edadMaxima) {
                    estadisticas.edadMaxima = edad;
                }
                
                // Mostrar resultado de la persona
                html += `
                    <div class="persona ${categoria.clase}">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <strong> Persona ${i + 1}</strong>
                            <span class="badge badge-${categoria.clase}">${categoria.nombre}</span>
                        </div>
                        <br>
                        <div class="persona-info">
                            <div class="info-card">
                                <div class="info-label"> Edad</div>
                                <div class="info-value">${edad} años</div>
                            </div>
                            <div class="info-card">
                                <div class="info-label"> Categoría</div>
                                <div class="info-value">${categoria.nombre}</div>
                            </div>
                            <div class="info-card">
                                <div class="info-label"> Rango</div>
                                <div class="info-value">${categoria.min}-${categoria.max} años</div>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            // Calcular estadísticas generales
            const totalPersonas = edades.length;
            const edadPromedio = estadisticas.personasValidas > 0 ? 
                (estadisticas.sumaEdades / estadisticas.personasValidas) : 0;
            const porcentajeValidas = (estadisticas.personasValidas / totalPersonas) * 100;
            
            // Encontrar categoría más común
            let categoriaMasComun = '';
            let maxCantidad = 0;
            
            for (let i = 0; i < categorias.length; i++) {
                const categoria = categorias[i];
                const cantidad = estadisticas.categorias[categoria.clase];
                if (cantidad > maxCantidad) {
                    maxCantidad = cantidad;
                    categoriaMasComun = categoria.nombre;
                }
            }
            
            // Agregar totales y estadísticas
            html += `
                <div class="total-section">
                    👥 ANÁLISIS DEMOGRÁFICO
                    <div class="stats">
                        <div class="stat-card">
                            <div class="stat-number">${totalPersonas}</div>
                            <div>Personas Procesadas</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${estadisticas.personasValidas}</div>
                            <div>Edades Válidas</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${estadisticas.personasInvalidas}</div>
                            <div>Edades Inválidas</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${porcentajeValidas.toFixed(1)}%</div>
                            <div>Tasa de Validez</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${edadPromedio.toFixed(1)} años</div>
                            <div>Edad Promedio</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${estadisticas.edadMinima} años</div>
                            <div>Edad Mínima</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${estadisticas.edadMaxima} años</div>
                            <div>Edad Máxima</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${categoriaMasComun}</div>
                            <div>Categoría Predominante</div>
                        </div>
                    </div>
                </div>
            `;
            
            // Agregar distribución por categorías
            html += `
                <div style="margin-top: 20px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
                    <strong> Distribución por Categorías:</strong><br><br>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 15px;">
            `;
            
            for (let i = 0; i < categorias.length; i++) {
                const categoria = categorias[i];
                const cantidad = estadisticas.categorias[categoria.clase];
                if (cantidad > 0) {
                    const porcentaje = (cantidad / estadisticas.personasValidas * 100);
                    html += `
                        <div class="stat-card">
                            <div class="stat-number">${cantidad}</div>
                            <div>${categoria.nombre}</div>
                            <div style="font-size: 12px; color: #666;">${porcentaje.toFixed(1)}% del total</div>
                        </div>
                    `;
                }
            }
            
            html += `
                    </div>
                    <br>
                    <strong> Análisis del Arreglo:</strong><br>
                    • Total elementos procesados: ${edades.length}<br>
                    • Elementos válidos: ${estadisticas.personasValidas}<br>
                    • Elementos inválidos: ${estadisticas.personasInvalidas}<br>
                    • Arreglo: [${edades.join(', ')}]
            `;
            
            if (estadisticas.personasInvalidas > 0) {
                html += `
                    <div style="background: rgba(231, 76, 60, 0.1); padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #e74c3c;">
                        <strong style="color: #e74c3c;"> Edades Fuera de Rango:</strong><br>
                        ${estadisticas.personasInvalidas} edad(es) fuera del rango válido (1-120 años)
                    </div>
                `;
            }
            
            html += `</div>`;
            
            // Mostrar resultado
            document.getElementById('resultado').innerHTML = 
                '<div class="resultado">' + html + '</div>';
        }
        
        function actualizarArregloDisplay() {
            let html = '<strong> ARREGLO DE EDADES:</strong><br>';
            html += 'edades = [';
            
            if (edades.length === 0) {
                html += '<em>(Vacío)</em>';
            } else {
                html += edades.join(', ');
            }
            
            html += ']<br>';
            html += `<strong>Total elementos:</strong> ${edades.length}`;
            
            document.getElementById('arregloEdades').innerHTML = html;
        }
        
        function limpiarTodo() {
            edades = []; // Vaciar el arreglo
            document.getElementById('edades').value = '';
            document.getElementById('resultado').innerHTML = '';
            actualizarArregloDisplay();
        }
        
        // Permitir clasificar con Enter
        document.getElementById('edades').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                clasificarEdades();
            }
        });
        
        // Cargar automáticamente al abrir la página
        window.onload = function() {
            console.log('Arreglo de edades inicializado:', edades);
            actualizarArregloDisplay();
        };