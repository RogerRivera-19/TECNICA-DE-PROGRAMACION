const preciosTrajes = [2800, 1500, 3200, 2200, 4500, 1800, 2600, 3500, 1200, 2900];
        
        function obtenerArregloActual() {
            // Obtener el arreglo desde el input
            const input = document.getElementById('arregloInput').value.trim();
            
            if (!input) {
                alert('Por favor ingresa los precios de los trajes');
                return null;
            }
            
            // Convertir a arreglo de números
            const precios = input.split(',').map(precio => parseFloat(precio.trim()));
            
            // Validar números
            for (let i = 0; i < precios.length; i++) {
                if (isNaN(precios[i]) || precios[i] <= 0) {
                    alert(`Error en posición ${i + 1}: "${precios[i]}" no es un precio válido`);
                    return null;
                }
            }
            
            return precios;
        }
        
        function calcularPrecios() {
            // Obtener el arreglo actual
            const precios = obtenerArregloActual();
            if (!precios) return;
            
            // Mostrar qué arreglo estamos usando
            console.log('Arreglo de precios actual:', precios);
            
            // Calcular precio final de cada traje
            let html = '<h3> Resultados por Traje:</h3>';
            let totalOriginal = 0;
            let totalFinal = 0;
            let trajesConDescuento15 = 0;
            let trajesConDescuento8 = 0;
            
            for (let i = 0; i < precios.length; i++) {
                const precioOriginal = precios[i];
                totalOriginal += precioOriginal;
                
                // Determinar descuento
                let porcentajeDescuento;
                let claseDescuento;
                let badgeDescuento;
                
                if (precioOriginal >= 2500) {
                    porcentajeDescuento = 15;
                    claseDescuento = 'descuento-alto';
                    badgeDescuento = 'descuento-15';
                    trajesConDescuento15++;
                } else {
                    porcentajeDescuento = 8;
                    claseDescuento = 'descuento-normal';
                    badgeDescuento = 'descuento-8';
                    trajesConDescuento8++;
                }
                
                // Calcular precio final
                const montoDescuento = precioOriginal * (porcentajeDescuento / 100);
                const precioFinal = precioOriginal - montoDescuento;
                totalFinal += precioFinal;
                
                // Mostrar resultado del traje
                html += `
                    <div class="traje ${claseDescuento}">
                        <strong>Traje ${i + 1}:</strong>
                        <span class="descuento-badge ${badgeDescuento}">${porcentajeDescuento}% OFF</span>
                        <br><br>
                        <span class="precio-original">Precio original: $${precioOriginal.toFixed(2)}</span><br>
                        <span style="color: #dc3545;">Descuento: -$${montoDescuento.toFixed(2)}</span><br>
                        <span class="precio-final">Precio final: $${precioFinal.toFixed(2)}</span>
                    </div>
                `;
            }
            
            // Calcular estadísticas
            const ahorroTotal = totalOriginal - totalFinal;
            const porcentajeAhorroPromedio = (ahorroTotal / totalOriginal * 100);
            
            // Agregar totales y estadísticas
            html += `
                <div class="total-section">
                     RESUMEN TOTAL
                    <div class="stats">
                        <div class="stat-card">
                            <div class="stat-number">$${totalOriginal.toFixed(2)}</div>
                            <div>Total Original</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">$${totalFinal.toFixed(2)}</div>
                            <div>Total Final</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">$${ahorroTotal.toFixed(2)}</div>
                            <div>Ahorro Total</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-number">${porcentajeAhorroPromedio.toFixed(1)}%</div>
                            <div>Ahorro Promedio</div>
                        </div>
                    </div>
                </div>
            `;
            
            // Agregar desglose de descuentos
            html += `
                <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 8px;">
                    <strong> Desglose de Descuentos:</strong><br>
                    • ${trajesConDescuento15} traje(s) con 15% de descuento (≥$2500)<br>
                    • ${trajesConDescuento8} traje(s) con 8% de descuento (<$2500)<br>
                    • Total de trajes procesados: ${precios.length}<br><br>
                    <strong> Arreglo procesado:</strong> [${precios.join(', ')}]
                </div>
            `;
            
            // Mostrar resultado
            document.getElementById('resultado').innerHTML = 
                '<div class="resultado">' + html + '</div>';
        }
        
        function limpiar() {
            document.getElementById('resultado').innerHTML = '';
        }
        
        // Permitir calcular con Enter
        document.getElementById('arregloInput').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                calcularPrecios();
            }
        });
        
        // Cargar automáticamente al abrir la página
        window.onload = function() {
            console.log('Arreglo cargado:', preciosTrajes);
        };